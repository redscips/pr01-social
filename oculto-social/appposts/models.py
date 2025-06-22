#importacoes
from django.utils import timezone
from django.db import models
#modelos
from applogin.modelos import tbl_usuarios

class tbl_posts(models.Model):
    #atributos do banco: ID | db_column especifica o nome do atributo no banco
    cod_tab = models.AutoField(primary_key=True, editable=True)  #auto-incrementado
    #usuario que eh o autor do post/comentario
    cod_usuario = models.ForeignKey(tbl_usuarios, on_delete=models.RESTRICT, db_column="cod_usuario")
    dta_criacao = models.DateTimeField(default=timezone.now,)
    #login
    des_mensagem = models.CharField(max_length=1000, blank=True)
    flg_comentario = models.EmailField(max_length=1, blank=True)
    #p/ quando comentario faz a referencia ao post
    cod_post = models.ForeignKey('self', on_delete=models.RESTRICT, db_column="cod_post")
    #data da ultima atualizacao
    dta_atualizacao = models.DateTimeField(auto_now=True)
    
    #configuracoes
    campos = ['cod_tab', 'cod_usuario', 'dta_criacao', 'des_mensagem', 'flg_comentario', 'cod_post', 'dta_atualizacao']
    
    class Meta:
        #nome da tabela
        db_table = 'tbl_posts'