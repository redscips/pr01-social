#importacoes: django
from rest_framework import serializers
# classe
from applogin.atributos import clsLogin

class clsLoginSerial(serializers.Serializer):
    
    def __init__(self):
        serializers.SerializerMethodField()