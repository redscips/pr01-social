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
    #
    #region metodos  
    #POSTAR/POST: nome fixo do framework => create
    def create(self, validated_data, *args, **kwargs):
        try:
            #cria uma instancia de um usuario
            usuario = tbl_usuarios(**validated_data)
            #criptografa a senha
            if 'password' in validated_data:
                usuario.set_password(validated_data['password'])
            #efetiva no banco
            usuario.save()
            #sucesso
            resposta = Response(usuario, status=status.HTTP_201_CREATED)
        except DatabaseError as e:
            resposta = ClsComuns.trataExcecoesReq(str(e))
        #def retorno
        return resposta
    
    #ATUALIZAR/PUT: nome fixo do framework => update
    def update(self, validated_data):
        #def retorno
        return Response({"detalhes_ID": "Endpoint PUT ID implementado"}, status=status.HTTP_200_OK)

    #ATUALIZAR/PATCH: nome fixo do framework => partial_update
    def partial_update(self, request, pk=None, *args, **kwargs):
       #def retorno
        return Response({"detalhes_ID": "Endpoint PATCH ID implementado"}, status=status.HTTP_200_OK)

    #DELETAR/DELETE: nome fixo do framework => destroy
    def destroy(self, request, pk=None, *args, **kwargs):
        #def retorno
        return Response({"detalhes_ID": "Endpoint DELETE ID implementado"}, status=status.HTTP_200_OK)
    #
    #endregion