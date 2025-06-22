#importacoes
from ocultosocial.comuns.clsComuns import ClsComuns
from rest_framework import serializers, status
from rest_framework.response import Response
from django.db import DatabaseError
#modelo
from appposts.models import tbl_posts

class ClsPostSerial(serializers.ModelSerializer):
    
    class Meta:
        model = tbl_posts
        fields = tbl_posts.campos
    
    #region metodos  
    #POSTAR/POST: nome fixo do framework => create
    def create(self, validated_data, *args, **kwargs):
        try:
            #cria uma instancia de um usuario
            post = tbl_posts(**validated_data)
            #efetiva no banco
            post.save()
            #sucesso
            resposta = Response(post, status=status.HTTP_201_CREATED)
        except DatabaseError as e:
            resposta = ClsComuns.trataExcecoesReq(str(e))
        #def retorno
        return resposta
    #
    #endregion