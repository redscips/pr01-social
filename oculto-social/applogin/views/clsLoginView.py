#importacoes: rest framework
from django.db import DatabaseError
from ocultosocial.DAL.clsDAL import ClsDAL
from ocultosocial.comuns.clsComuns import ClsComuns
from ocultosocial.serializador.clsSerial import ClsSerial
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
#serializador
from applogin.serializador import clsLoginSerial
#calsses
from ocultosocial.modelo_der import TblUsuarios

class ClsLoginViewSet(viewsets.ModelViewSet):
    #
    queryset = TblUsuarios.objects.all()
    serializer_class = clsLoginSerial
    permission_classes = [IsAuthenticated]
    
    #region metodos
    #GET (varios registros): nome fixo do framework => list
    def list(self, request, *args, **kwargs):
        #retorna os dados serializados
        serialUsuarios = ClsSerial.serializa(self.get_queryset(), self.serializer_class, true)
        #retorna resposta
        return Response(serialUsuarios, status=status.HTTP_200_OK)

    
    #POSTAR/POST: nome fixo do framework => create
    def create(self, request, *args, **kwargs):
        #desserializa os dados
        login = ClsSerial.desserializa(request.data, self.serializer_class)
        try:
            #valida duplicidade.
            login.is_valid(raise_exception=True)
            #CASO: nao lancou excecao: salva no banco novo cadastro
            login.save()
            #sucesso
            resposta = Response("Usuario cadastrado", status=status.HTTP_201_CREATED)
        except DatabaseError as e:
            resposta = ClsComuns.trataExcecoesReq(str(e))
        #def retorno
        return resposta
    #
    #endregion