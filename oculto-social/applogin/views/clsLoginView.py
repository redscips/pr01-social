#importacoes: django
from django.db import DatabaseError, connection
from django.contrib.auth.hashers import make_password
#rest framework
from rest_framework import viewsets, status
from rest_framework.response import Response
#serializador
from applogin.serializador import clsLoginSerial
from ocultosocial.serializador import ClsSerial
from applogin.atributos import clsLogin

class ClsLoginViewSet(viewsets.ViewSet):
    #
    serializer_class = clsLoginSerial

    #region viewsets.ViewSet
    def create(self, request):
        #retorna os dados serializados
        json_data = ClsSerial.serializa(request.data, self.serializer_class)
        #validacao
        if json_data:
            #desserializa os dados
            login = ClsSerial.desserializa(json_data, self.serializer_class)
            #objeto desserializado
            email = login[0].strEmail
            senha = login[0].strSenha
            try:
                #insere novo registro
                clsLogin.inserir(email, senha)             
                #sucesso
                resposta = Response(json_data, status=status.HTTP_201_CREATED)
            except DatabaseError as e:
                resposta = Response({"erro": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        else:
            #erro
            resposta = Response(json_data, status=status.HTTP_400_BAD_REQUEST)
        #def retorno
        return resposta
      
    #metodo GET
    def list(self, request):
        #def retorno
        return Response({"detalhes": "Endpoint GET implementado"}, status=status.HTTP_200_OK)      
    #endregion
