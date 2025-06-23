#importacoes: django
from django.db import DatabaseError
#rest_framework
from rest_framework import serializers, status
from rest_framework.response import Response
#classes
from ocultosocial.comuns.clsComuns import ClsComuns
# classe
from applogin.modelos import tbl_usuarios

class clsLoginSerial(serializers.ModelSerializer):
    #
    class Meta:
        model = tbl_usuarios
        fields = tbl_usuarios.campos
        extra_kwargs = tbl_usuarios.extra_kwargs
        read_only_fields = ['des_nome', 'username', 'dta_criacao', 'is_active', 'is_staff']
    #
    
    #region metodos  
    #POSTAR/POST: nome fixo do framework => create
    def create(self, validated_data, *args, **kwargs):
        try:        
            #usa a classe gerente p/ criar e settar a senha
            senha = validated_data.pop('password', None)
            #----------------
            if senha:
                #cria uma instancia p/ o usuario
                usuario = tbl_usuarios.objects.create(**validated_data)
                #cria a senha: criptografa
                usuario.set_password(senha)
                #salva novo usuario
                usuario.save()
                #retorno: usuario recem criado
                return usuario
        except DatabaseError as e:
            return ClsComuns.trataExcecoesReq(str(e))
    #
    #endregion