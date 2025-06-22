#importacoes
from ocultosocial.comuns.clsComuns import ClsComuns
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
#serializadores
from applogin.serializador import clsLoginSerial
from ocultosocial.serializador import ClsSerial

class ClsAutenticacaoView(ObtainAuthToken):
    #
    #region metodos: post
    def post(self, request, *args, **kwargs):
        try:
             #serializa o corpo da requisicao
            serial = AuthTokenSerializer(
                data=request.data,
                context={'request': request}
            )
            #valida o request com as regras da autenticacao token
            if serial.is_valid(raise_exception=True):
                #retorna o usuario
                usuario = serial.validated_data['user']
                #serializa usuario
                _, usuarioSerialiazado = ClsSerial.serializa(usuario, clsLoginSerial, True)
                #retorna ou cria um token
                token, _ = Token.objects.get_or_create(user=usuario)
                #retorna resposta: token + usuario
                return Response({
                    'token': token.key,
                    'usuario': usuarioSerialiazado
                })
        except Exception as e:
            return ClsComuns.trataExcecoesReq(str(e))
    #endregion