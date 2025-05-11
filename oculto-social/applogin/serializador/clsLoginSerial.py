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
    #endregion