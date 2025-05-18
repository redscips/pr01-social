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
    
    def validaCampoExiste(objeto: dict, strCampo: str) -> bool:
        #var retorno
        ctrl = False
        try:
            try:
                #1) validacao: objeto simples
                if objeto[strCampo]:
                    ctrl = True
            except Exception as e:
                pass
            #caso falso
            if ctrl == False:
                #2) validacao: objeto lista
                if objeto[0][strCampo]:
                    ctrl = True
        except Exception as e:
            pass
        #def retorno
        return ctrl
    #
    #endregion