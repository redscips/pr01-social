from rest_framework.renderers import JSONRenderer
import json
from typing import Any, Type, List, TypeVar, Union, Tuple

#variavel generica que pode representar qualquer tipo
T = TypeVar('T')

class ClsSerial:
    #region metodos
    #
    @staticmethod
    def serializa(data: Union[List[T], T], serializer_class: Type, flgSerialDados: bool = False) -> Tuple[List[T], Any]:
        """Serializa um objeto ou uma lista de objetos utilizando o serializer informado.
        Args:
            data (Union[List[T], T]): Objeto singular ou lista de objetos a serem serializados.
            serializer_class (Type): Classe do serializer a ser usada (por exemplo, uma subclasse de serializers.Serializer).
        Returns:
            Tuple[List[T], Any]: Dados serializados no formato JSON/str.
        """
        #cria uma instancia do serializer passando a lista de objetos p/ serem serializados
        serial = serializer_class(data, many=True if isinstance(data, list) else False)
        #retorna a serializacao                     / converte p/ bytes utilizando o JSONRenderer e decodificada em UTF-8
        return [serial, serial.data if flgSerialDados else JSONRenderer().render(serial.data).decode("utf-8")]

    @staticmethod
    def desserializa(dados: str, serializer_class: Type) -> Tuple[List[T], Any]:
        """Desserializa uma string JSON p/ uma lista de objetos utilizando o serializer informado.
        Args:
            dados (str): String JSON a ser desserializada.
            serializer_class (Type): Classe do serializer a ser usada p/ validar e salvar os dados.
        Returns:
            Tuple[List[T], Any]: Lista de objetos resultantes da desserializacao e validacao dos dados.
        """
        #CASO 1: converte a string p/ uma estrutura JSON (lista ou dict)
        #CASO 2: informacoes ja estao como json
        data_json = json.loads(dados) if isinstance(dados, str) else dados   
        #se nao for uma lista, encapsula em uma lista
        if not isinstance(data_json, list):
            data_json = [data_json]
        #instancia o serializer p/ desserializar os dados; many=True porque esperamos uma lista.
        serial = serializer_class(data=data_json, many=True)
        #def retorno
        return [serial, serial.initial_data]
    #
    #endregion
