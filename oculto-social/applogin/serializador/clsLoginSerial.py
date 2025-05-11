#importacoes: django
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
#------------
import json
# classe
from applogin.atributos import clsLogin

class clsLoginSerial(serializers.Serializer):
    #
    #region atributos
    strEmail = serializers.CharField(max_length=150)
    strSenha = serializers.CharField(max_length=300)
    #endregion
    #
    #region metodos
    #
    #region serializers.Serializer
    def create(self, validated_data):
        #cria um objeto login
        return clsLogin(**validated_data)

    def update(self, instance, validated_data):
        #atualizacao
        instance.strEmail = validated_data.get('strEmail', instance.strEmail)
        instance.strSenha = validated_data.get('strSenha', instance.strSenha)
        #def retorno
        return instance
    #endregion
    #
    @staticmethod
    def serializa(logins: list[clsLogin] | clsLogin) -> str:
        # se for passado uma instancia unica, encapsula em uma lista.
        if not isinstance(logins, list):
            logins = [logins]
        # cria uma instancia do serializer passando a lista de objetos p/ serem serializados
        dados_serial = clsLoginSerial(logins, many=True)
        # converte p/ bytes
        json_bytes = JSONRenderer().render(dados_serial.data)
        # def retorno: bytes decodificados em 'uft-8'
        return json_bytes.decode("utf-8")

    @staticmethod
    def desserializa(dados: str) -> list[clsLogin]:
        # converte string p/ json
        data_json = json.loads(dados)
        #valida se foi passado uma lista p/ conversao
        if not isinstance(data_json, list):
            data_json = [data_json]
        # instancia o serializador p/ deserializar os dados, many=True porque esperamos uma lista de itens
        dados_desserial = clsLoginSerial(data=data_json, many=True)
        # valida os dados, se houver erro, uma excecao eh lancada
        dados_desserial.is_valid(raise_exception=True)
        # def retorno
        return dados_desserial.save()
    #
    #endregion