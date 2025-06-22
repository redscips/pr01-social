#importacoes: rest framework
from typing import Tuple
from django.db import DatabaseError
from django.contrib.auth.hashers import check_password
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
#serializador
from applogin.serializador import clsLoginSerial
#pandas
import pandas as pd
#calsses
from applogin.modelos import tbl_usuarios
from ocultosocial.comuns.clsComuns import ClsComuns
from ocultosocial.serializador.clsSerial import ClsSerial
from ocultosocial.DAL import ClsDAL

class ClsLoginViewSet(viewsets.ModelViewSet):
    #
    queryset = tbl_usuarios.objects.all()
    serializer_class = clsLoginSerial
    permission_classes = [IsAuthenticated]
    #campos que seria usado como se fosse 'pk'
    lookup_field = 'des_login'
    #lookup_value_regex = '[^/]+'  # permite qualquer caractere, exceto a barra
    
    #region metodos
    def get_permissions(self):
        """_summary_
            Retorna o tipo de autorizacao da acao, onde somente a acao de 'criar' um novo usuario nao exige autorizacao.
        Returns:
            _type_: IsAuthenticated/AllowAny.
            Tipo de autorizacao da acao sendo requisitada.
        """
        # libera qualquer um para criar usuario
        if self.action == 'create':
            return [AllowAny()]
        else:
            # demais acoes continuam exigindo IsAuthenticated
            return super().get_permissions()
        
    @staticmethod
    def pesquisaLogin(strLogin: str) -> Tuple[pd.DataFrame, str]:
        #script
        sql_query = f'''
        select cod_tab, des_login, des_senha
        from tbl_usuarios a
        where lower(des_login) like %s
        order by des_login; 
        '''
        try:
            valores = [f'%{strLogin.lower()}%']
            #consulta script
            dados = ClsDAL.consultaScript(sql_query, valores)
            #retorna a senha hash salva
            senhaHash = dados.loc[0, 'des_senha']
            #def retorno
            return (dados, senhaHash)
        except Exception as e:
            raise e
    
    #GET (varios registros): nome fixo do framework => list
    def list(self, request, *args, **kwargs):
        #valida se foi passado parametros URL
        if len(request.query_params) > 0:
            return self.retrieve(request)
        else:
            # Busca o usuário pelo login (case‐insensitive, se preferir)
            usuarios = get_object_or_404(tbl_usuarios.objects.all())
            #serializa em classe
            _, usuariosRet = ClsSerial.serializa(usuarios, self.serializer_class, True)
            #retorna resposta
            return Response(usuariosRet, status=status.HTTP_200_OK)
    
    #GET (unico registro): nome fixo do framework => retrieve
    def retrieve(self, request, pk=None, *args, **kwargs) -> Response:
        try:
            #pega o login + senha que foi passada no parametros URL
            strLogin = request.query_params.get('des_login')
            strSenha = request.query_params.get('des_senha')
            #valida se este login existe no banco
            _, senhaHash = ClsLoginViewSet.pesquisaLogin(strLogin)
            #compara os dois hash p/ ver se a senha nos parametros da URl eh igual a senha salva no banco
            if check_password(strSenha, senhaHash) :
                #busca o usuario pelo login => case‐insensitive
                usuario = get_object_or_404(tbl_usuarios.objects.all(), username__iexact=strLogin)
                # serializa como objeto único
                _, usuarioRet = ClsSerial.serializa(usuario, self.serializer_class, True)
                #def retorno
                return Response(usuarioRet, status=status.HTTP_200_OK)
            else:
                raise DatabaseError('Senha errada')
        except Exception as e:
            return ClsComuns.trataExcecoesReq(str(e))

    #POSTAR/POST: nome fixo do framework => create
    def create(self, request, *args, **kwargs):
        #desserializa os dados
        serial, login = ClsSerial.desserializa(request.data, self.serializer_class)
        try:
            #verifica se foi passado um nome
            if ClsComuns.validaCampoExiste(login, 'des_nome') :
                #valida duplicidade.
                serial.is_valid(raise_exception=True)
                #CASO: nao lancou excecao: salva no banco novo cadastro
                serial.save()
                #cria ou retorna o token
                token, _ = Token.objects.get_or_create(user=login)
                #sucesso
                return Response({
                    'token': token,
                    'usuario': login
                }, status=status.HTTP_201_CREATED)
        except DatabaseError as e:
            return ClsComuns.trataExcecoesReq(str(e))
    #
    #endregion