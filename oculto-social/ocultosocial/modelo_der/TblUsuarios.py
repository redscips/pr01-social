#importacoes: django       
from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password

class TblUsuarios(models.Model):
    #atributos do banco: ID | db_column especifica o nome do atributo no banco
    cod_tab = models.AutoField(primary_key=True, editable=True)  #auto-incrementado
    #login
    des_nome = models.CharField(max_length=200, blank=True)
    des_login = models.EmailField(max_length=200, unique=True)
    des_senha = models.CharField(max_length=500)
    #data em que o registro foi criado
    dta_criacao = models.DateTimeField(default=timezone.now)
    #data da ultima atualizacao
    dta_atualizacao = models.DateTimeField(auto_now=True)
    
    #configuracoes
    campos = ['cod_tab', 'des_nome', 'des_login', 'des_senha', 'dta_criacao', 'dta_atualizacao']
    extra_kwargs = {
        'des_senha': {'write_only': True}  #write_only => nao  retorna as senhas nas respostas
    }

    class Meta:
        #nome da tabela
        db_table = 'tbl_usuarios'
        app_label = 'applogin'

    def __str__(self):
        #retorna o email
        return self.strEmail
    
    def set_password(self, raw_password):
        #criptografa a senha
        self.des_senha = make_password(raw_password)
