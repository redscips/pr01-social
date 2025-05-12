from django.db import connection


class ClsDAL():
    #
    #region metodos
    #
    @staticmethod 
    def retornaUltimoID(nomeTabela: str) -> int:
        #script
        sql_query = f'''
        SELECT max(cod_tab) + 1 as novo_id
        FROM {nomeTabela}
        '''
        #busca se ja existe um registro com este email no banco
        with connection.cursor() as cursor:
            #executa a query
            cursor.execute(sql_query)
            #recupera todas as linhas retornadas pela query
            dados = cursor.fetchall()
        #def retorno
        return dados[0][0]
    #
    #endregion