#importacoes: django
from django.db import DatabaseError
#rest_framework
from rest_framework import serializers, status
from rest_framework.response import Response
#classes
from ocultosocial.comuns.clsComuns import ClsComuns
# classe
from ocultosocial.modelo_der import TblUsuarios

class clsLoginSerial(serializers.ModelSerializer):
    #
    class Meta:
        model = TblUsuarios
        fields = TblUsuarios.campos
        extra_kwargs = TblUsuarios.extra_kwargs
    #
    #region metodos
    #GET (varios registros): nome fixo do framework => list
    def list(self, request, *args, **kwargs):
        #def retorno
        return Response({"detalhes": "Endpoint GET implementado"}, status=status.HTTP_200_OK)

    #GET (unico registro): nome fixo do framework => retrieve
    def retrieve(self, validated_data, pk=None, *args, **kwargs):
        #cria uma instancia de um usuario
        usuario = TblUsuarios(validated_data)
        #def retorno
        return Response({"detalhes_ID": "Endpoint GET ID implementado"}, status=status.HTTP_200_OK)
    
    #POSTAR/POST: nome fixo do framework => create
    def create(self, validated_data, *args, **kwargs):
        try:
            #cria uma instancia de um usuario
            usuario = TblUsuarios(**validated_data)
            #criptografa a senha
            if 'des_senha' in validated_data:
                usuario.set_password(validated_data['des_senha'])
            #efetiva no banco
            usuario.save()
            #sucesso
            resposta = Response("Usuario cadastrado", status=status.HTTP_201_CREATED)
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