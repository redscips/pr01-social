#importacoes: django
from django.db import DatabaseError, connection
from django.contrib.auth.hashers import make_password
#rest framework
from rest_framework import viewsets, status
from rest_framework.response import Response
#----------------
import json
#serializador
from applogin.serializador import clsLoginSerial
from ocultosocial.serializador import ClsSerial

class ClsLoginViewSet(viewsets.ViewSet):
    #
    serializer_class = clsLoginSerial
    
    #id inicial
    id = 1

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
            hashed_senha = make_password(senha)
           
            try:
                #insere novo registro
                with connection.cursor() as cursor:
                    cursor.execute(
                        "INSERT INTO tbl_usuarios (cod_tab, des_nome, des_login, des_senha, dta_criacao, dta_atualizacao) VALUES (%s, %s, %s, %s, now(), now())",
                        [self.id, None, email, hashed_senha]
                    )
                #incrementa o id
                self.id += 1
                
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
