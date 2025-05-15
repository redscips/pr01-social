#importacoes: rest framework
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
#django
from django.db import DatabaseError
#serializador
from applogin.serializador import clsLoginSerial
from ocultosocial.serializador import ClsSerial
#calsses
from applogin.atributos import clsLogin
from ocultosocial.DAL.clsDAL import ClsDAL
from ocultosocial.comuns.clsComuns import ClsComuns

class ClsLoginViewSet(viewsets.ViewSet):
    #
    serializer_class = clsLoginSerial
    permission_classes = [IsAuthenticated]

    @staticmethod 
    def valida(email: str) -> bool:
        #var retorno
        ctrl: bool = False
        #script
        sql_query = '''
        SELECT count(1) as qtd
        FROM tbl_usuarios
        WHERE des_login = %s
        '''
        linhas = ClsDAL.consultaScript(sql_query, [email])
        #validacao
        if linhas.loc[0, 'qtd'] == 0:
            ctrl = True
        else:
            raise DatabaseError('Erro: ja existe um usuario com este email!')
        #def retorno
        return ctrl

    #region viewsets.ViewSet
    def create(self, request):
        #desserializa os dados
        login = ClsSerial.desserializa(request.data, self.serializer_class)
        try:
            #validacao
            if ClsLoginViewSet.valida(login[0].strEmail):
                #insere novo registro
                if clsLogin.inserir(login[0].strEmail, login[0].strSenha):             
                    #sucesso
                    resposta = Response("Usuario cadastrado", status=status.HTTP_201_CREATED)
        except DatabaseError as e:
            resposta = ClsComuns.trataExcecoesReq(str(e))
        #def retorno
        return resposta
      
    #metodo GET
    def list(self, request):
        #def retorno
        return Response({"detalhes": "Endpoint GET implementado"}, status=status.HTTP_200_OK)      
    #endregion
