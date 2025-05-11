#importacoes: django
from django.db import connection
from django.contrib.auth.hashers import make_password
#rest framework
from rest_framework import viewsets, status
from rest_framework.response import Response
#----------------
import json
#serializador
from applogin.serializador import clsLoginSerial

class ClsLoginViewSet(viewsets.ViewSet):
    #
    serializer_class = clsLoginSerial
    
    #id inicial
    id = 1

    #region viewsets.ViewSet
    def create(self, request):
        #retorna os dados serializados
        serial = self.serializer_class(data=request.data)
        #validacao
        if serial.is_valid():
            #dados inputados
            login = serial.desserializa(json.dumps(serial.data))
            email = login[0].strEmail
            senha = login[0].strSenha
            hashed_senha = make_password(senha)
           
            #insere novo registro
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO tbl_usuarios (des_login, des_senha, dta_criacao, dta_atualizacao) VALUES (%s, %s, %s, %s, now(), now())",
                    [id, None, email, hashed_senha]
                )
            #incrementa o id
            self.id += 1
            
            #sucesso
            resposta = Response(serial.data, status=status.HTTP_201_CREATED)
        else:
            #erro
            resposta = Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)
        #def retorno
        return resposta
      
    #metodo GET
    def list(self, request):
        #def retorno
        return Response({"detalhes": "Endpoint GET implementado"}, status=status.HTTP_200_OK)      
    #endregion
