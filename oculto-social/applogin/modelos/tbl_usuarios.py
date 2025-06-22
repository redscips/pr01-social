#importacoes: django       
from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
#modelos
from applogin.modelos.tbl_usuarios_admin import tbl_usuarios_admin

class tbl_usuarios(AbstractBaseUser, PermissionsMixin):
    #
    objects = tbl_usuarios_admin()
    
    #atributos do django: ID | db_column especifica o nome do atributo no banco
    id = models.AutoField(primary_key=True, editable=True, db_column='cod_tab', blank=True)  #auto incrementado
    #login
    des_nome = models.CharField(max_length=200, blank=True)
    username = models.EmailField(max_length=200, unique=True, db_column='des_login')
    password = models.CharField(max_length=500, db_column='des_senha')      #django
    #data em que o registro foi criado
    dta_criacao = models.DateTimeField(default=timezone.now)
    #data da ultima atualizacao
    dta_atualizacao = models.DateTimeField(auto_now=True)
    
    is_active = models.BooleanField(default=True, db_column='flg_ativo')
    is_staff = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['password']

    #configuracoes
    campos = ['id', 'des_nome', 'username', 'password', 'dta_criacao', 'dta_atualizacao', 'is_active', 'is_staff']
    extra_kwargs = {
        'password': {'write_only': True}  #write_only => nao  retorna as senhas nas respostas
    }

    class Meta:
        #nome da tabela
        db_table = 'tbl_usuarios'
    
    def set_password(self, raw_password):
        self.password = make_password(raw_password)