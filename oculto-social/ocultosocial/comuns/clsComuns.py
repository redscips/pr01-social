#importacoes: rest_framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer

class ClsComuns():
    #
    #region metodos
    #
    def trataExcecoesReq(mensagemErro: dict) -> Response:
        #erro interno do servidor
        resposta = Response(mensagemErro, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        #mensagem de envio da api formato json
        resposta.accepted_renderer = JSONRenderer()
        resposta.accepted_media_type = 'application/json'
        #def retorno
        return resposta
    #
    #endregion