#importacoes: rest framework
from django.db import DatabaseError
from django.contrib.auth.hashers import check_password
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
#serializador
from applogin.serializador import clsLoginSerial
#calsses
from ocultosocial.modelo_der import TblUsuarios
from ocultosocial.comuns.clsComuns import ClsComuns
from ocultosocial.serializador.clsSerial import ClsSerial

class ClsLoginViewSet(viewsets.ModelViewSet):
    #
    queryset = TblUsuarios.objects.all()
    serializer_class = clsLoginSerial
    permission_classes = [IsAuthenticated]
    #campos que seria usado como se fosse 'pk'
    lookup_field = 'des_login'
    lookup_value_regex = '[^/]+'  # permite qualquer caractere, exceto a barra
    
    #region metodos
    #GET (varios registros): nome fixo do framework => list
    def list(self, request, *args, **kwargs):
        #retorna os dados serializados
        serialUsuarios = ClsSerial.serializa(self.get_queryset(), self.serializer_class, True)
        #retorna resposta
        return Response(serialUsuarios, status=status.HTTP_200_OK)
    
    #GET (unico registro): nome fixo do framework => retrieve
    def retrieve(self, request, pk=None, *args, **kwargs):
        try:
          #retorna o usuario caso for encontrado
          usuario = self.get_object()
          #pega a senha que foi passada no parametros URL
          strSenha = request.query_params.get('des_senha')
          #compara os dois hash p/ ver se a senha nos parametros da URl eh igual a senha salva no banco
          if check_password(strSenha, usuario.des_senha) :
              #def retorno
              return Response('Usuario encontrado', status=status.HTTP_200_OK)
          else:
              return Response('Senha errada', status=status.HTTP_401_UNAUTHORIZED)
        except DatabaseError as e:
            pass

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
    #
    #endregion