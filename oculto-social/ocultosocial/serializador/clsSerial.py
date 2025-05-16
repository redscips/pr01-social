from rest_framework.renderers import JSONRenderer
import json
from typing import Type, List, TypeVar, Union

#variavel generica que pode representar qualquer tipo
T = TypeVar('T')

class ClsSerial:
    #region metodos
    #
    @staticmethod
    def serializa(data: Union[List[T], T], serializer_class: Type) -> str:
        """Serializa um objeto ou uma lista de objetos utilizando o serializer informado.
        Args:
            data (Union[List[T], T]): Objeto singular ou lista de objetos a serem serializados.
            serializer_class (Type): Classe do serializer a ser usada (por exemplo, uma subclasse de serializers.Serializer).
        Returns:
            str: Dados serializados no formato JSON.
        """
        #se foi passado um objeto unico, encapsula em uma lista.
        if not isinstance(data, list):
            data = [data]
        #cria uma instancia do serializer passando a lista de objetos p/ serem serializados
        serial = serializer_class(data, many=True)
        #converte p/ bytes utilizando o JSONRenderer
        json_bytes = JSONRenderer().render(serial.data)
        #retorna a string decodificada em UTF-8
        return json_bytes.decode("utf-8")

    @staticmethod
    def desserializa(dados: str, serializer_class: Type, flgRetornaDados: bool = False) -> List[T]:
        """Desserializa uma string JSON p/ uma lista de objetos utilizando o serializer informado.
        Args:
            dados (str): String JSON a ser desserializada.
            serializer_class (Type): Classe do serializer a ser usada p/ validar e salvar os dados.
        Returns:
            List[T]: Lista de objetos resultantes da desserializacao e validacao dos dados.
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
        return serial.initial_data if flgRetornaDados else serial
    #
    #endregion
