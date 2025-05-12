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
from applogin.atributos import clsLogin

class ClsLoginViewSet(viewsets.ViewSet):
    #
    serializer_class = clsLoginSerial
    permission_classes = [IsAuthenticated]

    #region viewsets.ViewSet
    def create(self, request):
        #retorna os dados serializados
        json_data = ClsSerial.serializa(request.data, self.serializer_class)
        #validacao
        if json_data:
            #desserializa os dados
            login = ClsSerial.desserializa(json_data, self.serializer_class)
            try:
                #insere novo registro
                clsLogin.inserir(login[0].strEmail, login[0].strSenha)             
                #sucesso
                resposta = Response(json_data, status=status.HTTP_201_CREATED)
            except DatabaseError as e:
                erro = {"erro": str(e)}
                resposta = Response(erro, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                resposta.accepted_renderer = JSONRenderer()
                resposta.accepted_media_type = 'application/json'
                resposta.renderer_context = {} 
            
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
