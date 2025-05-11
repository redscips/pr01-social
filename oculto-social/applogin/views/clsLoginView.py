#importacoes: django
from rest_framework import viewsets, status
from rest_framework.response import Response
#serializador
from applogin.serializador import clsLoginSerial

class ClsLoginViewSet(viewsets.ViewSet):
    #
    serializer_class = clsLoginSerial

    #region viewsets.ViewSet
    def create(self, request):
        #retorna os dados serializados
        serial = self.serializer_class(data=request.data)
        #validacao
        if serial.is_valid():
            #salvar os dados inputados na instancia
            serial.save()
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
