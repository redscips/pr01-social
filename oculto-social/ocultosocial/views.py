#imortacoes: django
from django.http import HttpResponse
from django.template import loader

#pagina inicial
def ola_mundo(request):
    #carrega pagina
    template = loader.get_template('inicial/ola_mundo.html')
    #envia pagina como resposta
    return HttpResponse(template.render())
