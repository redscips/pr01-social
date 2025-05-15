from django.db import DatabaseError, connection
import pandas as pd


class ClsDAL():
    #
    #region metodos
    #
    @staticmethod 
    def retornaUltimoID(nomeTabela: str) -> int:
        """Retorna o ultimo ID de uma tabela do banco.
        Args:
            nomeTabela (str): Nome da tabela alvo
        Returns:
            int: Codigo do ultimo ID acrescido de 1.
        """
        #var retorno
        codigo: int = 0
        #script
        sql_query = f'''
        SELECT max(cod_tab) + 1 as novo_id
        FROM {nomeTabela}
        '''
        #consulta
        try:
            dados = ClsDAL.consultaScript(sql_query)
            #pega o ID
            codigo = int(dados.loc[0, 'novo_id'])
        except DatabaseError as e:
            raise e
        #def retorno
        return codigo
    
    @staticmethod
    def consultaScript(vSQL: str, valores: list = []) -> pd.DataFrame:
        """Retorna uma lista contendo os dados da consulta SQL
        Args:
            vSQL (str): Script.
            valores (list, optional): Campos de valores
        Returns:
            list: Uma lista com informacoes do banco.
        """
        try:
            with connection.cursor() as cursor:
                #executa script
                cursor.execute(vSQL, valores)
                #recupera todas as linhas retornadas pela query
                dados = cursor.fetchall()
                #retorna as colunas da consulta
                colunas = [coluna[0] for coluna in cursor.description]
        except DatabaseError as e:
            raise e
        #def retorno: uma datatable
        return pd.DataFrame(dados, columns=colunas)
    
    def executaScript(vSQL: str, valores: list) -> bool:
        #var retorno
        ctrl: bool = False
        try:
            with connection.cursor() as cursor:
                cursor.execute(vSQL, valores)
                #script executado
                ctrl = True
        except DatabaseError as e:
            raise e
        #def retorno
        return ctrl
    #
    #endregion