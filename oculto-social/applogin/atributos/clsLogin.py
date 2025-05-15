#importacoes: django
from django.db import DatabaseError, connection
from django.contrib.auth.hashers import make_password
#classes
from ocultosocial.DAL import ClsDAL


class clsLogin():
    
    #campos
    def __init__(self, strEmail: str = '', strSenha: str = ''):
        self.strEmail = strEmail
        self.strSenha = strSenha
        
    @staticmethod
    def inserir(email: str, senha: str) -> bool:
        #variavel retorno
        ctrl: bool = False
        try:
            #cria um hash da senha
            hashed_senha = make_password(senha)
            #novo id
            id = ClsDAL.retornaUltimoID('tbl_usuarios')
            #script
            vSQL = '''
            insert into tbl_usuarios
            (cod_tab, des_nome, des_login, des_senha, dta_criacao, dta_atualizacao)
            values (%s, null, %s, %s, now(), now())
            '''
            valores = [id, email, hashed_senha]
            #insere novo registro
            ctrl = ClsDAL.executaScript(vSQL, valores)
        except DatabaseError as e:
            raise e
        #def retorno
        return ctrl