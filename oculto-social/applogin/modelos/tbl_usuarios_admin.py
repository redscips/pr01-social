#importacoes: django
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.hashers import make_password
from django.db import DataError
#projeto
from ocultosocial.comuns.clsComuns import ClsComuns

class tbl_usuarios_admin(BaseUserManager):
    #
    #region metodos:
    #metodos obrigatorio p/ criar um classe que controla usuario django admin
    def create_user(self, username, password, **extra_fields):
        try:
            #email/login
            usuario = self.model(username=username, **extra_fields)
            #senha
            usuario.set_password(make_password(password))
            #CASO: nao lancou excecao: salva no banco novo cadastro
            usuario.save()
            #retorna usuario recem criado
            return usuario
        except DataError as e:
            return ClsComuns.trataExcecoesReq(str(e))        

    def create_superuser(self, username, password, **extra_fields):
        try:
            #adiciona campos extras: controle superusuario
            extra_fields.setdefault('is_staff', True)           #gerente
            extra_fields.setdefault('is_superuser', True)       #super
            #cria usuario
            return self.create_user(username, password, **extra_fields)
        except DataError as e:
            return ClsComuns.trataExcecoesReq(str(e))  
        
    def get_by_natural_key(self, username):
        """_summary_
            Permite ao createsuperuser e ao authenticate() buscarem o usuario pelo USERNAME_FIELD.
        """
        #retorno
        return self.get(**{self.model.USERNAME_FIELD: username})
    #endregion