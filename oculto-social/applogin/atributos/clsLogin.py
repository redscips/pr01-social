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
    def valida(email: str) -> bool:
        #var retorno
        ctrl: bool = False
        #script
        sql_query = '''
        SELECT count(1) as qtd
        FROM tbl_usuarios
        WHERE des_login = %s
        '''
        #busca se ja existe um registro com este email no banco
        with connection.cursor() as cursor:
            #executa a query
            cursor.execute(sql_query,[email])
            #recupera todas as linhas retornadas pela query
            rows = cursor.fetchall()
            #processa os resultados (cada linha é uma tupla)
            dados = []
            for row in rows:
                dado = { "qtd": row[0] }
                dados.append(dado)
            #validacao
            if dados[0]['qtd'] == 0:
                ctrl = True
            else:
                raise DatabaseError('Erro: ja existe um usuario com este email!')
        #def retorno
        return ctrl
        
    @staticmethod
    def inserir(email: str, senha: str) -> bool:
        #variavel retorno
        ctrl: bool = False
        try:
            if clsLogin.valida(email) :
                #cria um hash da senha
                hashed_senha = make_password(senha)
                #novo id
                id = ClsDAL.retornaUltimoID('tbl_usuarios')
                #insere novo registro
                with connection.cursor() as cursor:
                    cursor.execute(
                        "INSERT INTO tbl_usuarios (cod_tab, des_nome, des_login, des_senha, dta_criacao, dta_atualizacao) VALUES (%s, %s, %s, %s, now(), now())",
                        [id, None, email, hashed_senha]
                    )
                #insercao executada
                ctrl = True
        except DatabaseError as e:
            raise e
        #def retorno
        return ctrl