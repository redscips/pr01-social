#importacoes: django
from django.db import DatabaseError
from django.shortcuts import get_object_or_404
#rest framework
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
#--------------------
from typing import Tuple
#apps
from applogin.views import ClsLoginViewSet
from appposts.models import tbl_posts
from appposts.serializadores import ClsPostSerial
#projeto
from ocultosocial.DAL.clsDAL import ClsDAL
from ocultosocial.comuns.clsComuns import ClsComuns
from ocultosocial.serializador.clsSerial import ClsSerial
#dataframes
import pandas as pd

class ClsPostsViewSet(viewsets.ModelViewSet):
    #
    queryset = tbl_posts.objects.all()
    serializer_class = ClsPostSerial
    permission_classes = [IsAuthenticated]
    
        #region metodos
    #GET (varios registros): nome fixo do framework => list
    def list(self, request, *args, **kwargs):
        #valida se foi passado parametros URL
        if len(request.query_params) > 0:
            resposta = self.retrieve(request)
            return resposta
        else:
            #retorna os dados serializados
            serialPosts = ClsSerial.serializa(self.get_queryset(), self.serializer_class, True)
            #retorna resposta
            return Response(serialPosts, status=status.HTTP_200_OK)
    
    #GET (unico registro): nome fixo do framework => retrieve
    def retrieve(self, request, pk=None, *args, **kwargs) -> Response:
        try:
            #pega o login + senha que foi passada no parametros URL
            strCodigo = request.query_params.get('cod_tab')
            #valida se este login existe no banco
            _, codigoBanco = ClsLoginViewSet.pesquisaLogin(strCodigo)
            #compara os dois hash p/ ver se a senha nos parametros da URl eh igual a senha salva no banco
            if codigoBanco :
                # Busca o usuário pelo login (case‐insensitive, se preferir)
                post = get_object_or_404(
                    tbl_posts.objects.all(),
                    cod_tab__iexact=codigoBanco
                )
                # serializa como objeto único
                _, postRet = ClsSerial.serializa(post, self.serializer_class, True)
                #def retorno
                return Response(postRet, status=status.HTTP_200_OK)
        except Exception as e:
            return Response('Usuario nao encontrado', status=status.HTTP_404_NOT_FOUND)

    #POSTAR/POST: nome fixo do framework => create
    def create(self, request, *args, **kwargs):
        #desserializa os dados
        serial, codUsuario = ClsSerial.desserializa(request.data, self.serializer_class)
        try:
            #verifica se foi passado um nome
            if ClsComuns.validaCampoExiste(codUsuario, 'cod_usuario') :
                #valida duplicidade.
                serial.is_valid(raise_exception=True)
                #CASO: nao lancou excecao: salva no banco novo cadastro
                serial.save()
                #sucesso
                resposta = Response(codUsuario, status=status.HTTP_201_CREATED)
        except DatabaseError as e:
            resposta = ClsComuns.trataExcecoesReq(str(e))
        #def retorno
        return resposta
    
    @staticmethod
    def pesquisaPost(strCodigo: str) -> Tuple[pd.DataFrame, str]:
        #script
        sql_query = f'''
        select cod_tab
        from tbl_posts a
        where lower(des_mensagem) like %s
        '''
        try:
            valores = [f'%{strCodigo.lower()}%']
            #consulta script
            dados = ClsDAL.consultaScript(sql_query, valores)
            #retorna a senha hash salva
            codigo = dados.loc[0, 'cod_tab']
            #def retorno
            return (dados, codigo)
        except Exception as e:
            raise e
    #
    #endregion