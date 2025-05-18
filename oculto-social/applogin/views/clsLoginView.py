#importacoes: rest framework
from typing import Tuple
from django.db import DatabaseError
from django.contrib.auth.hashers import check_password
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
#serializador
from applogin.serializador import clsLoginSerial
#pandas
import pandas as pd
#calsses
from ocultosocial.modelo_der import TblUsuarios
from ocultosocial.comuns.clsComuns import ClsComuns
from ocultosocial.serializador.clsSerial import ClsSerial
from ocultosocial.DAL import ClsDAL

class ClsLoginViewSet(viewsets.ModelViewSet):
    #
    queryset = TblUsuarios.objects.all()
    serializer_class = clsLoginSerial
    permission_classes = [IsAuthenticated]
    #campos que seria usado como se fosse 'pk'
    #lookup_field = 'des_login'
    #lookup_value_regex = '[^/]+'  # permite qualquer caractere, exceto a barra
    
    #region metodos
    #GET (varios registros): nome fixo do framework => list
    def list(self, request, *args, **kwargs):
        #valida se foi passado parametros URL
        if len(request.query_params) > 0:
            resposta = self.retrieve(request)
            return resposta
        else:
            #retorna os dados serializados
            serialUsuarios = ClsSerial.serializa(self.get_queryset(), self.serializer_class, True)
            #retorna resposta
            return Response(serialUsuarios, status=status.HTTP_200_OK)
    
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
                #def retorno
                return Response('Usuario encontrado', status=status.HTTP_200_OK)
            else:
                return Response('Senha errada', status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response('Usuario nao encontrado', status=status.HTTP_404_NOT_FOUND)

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
                #sucesso
                resposta = Response('Usuario cadastrado', status=status.HTTP_201_CREATED)
        except DatabaseError as e:
            resposta = ClsComuns.trataExcecoesReq(str(e))
        #def retorno
        return resposta
    
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
    #
    #endregion