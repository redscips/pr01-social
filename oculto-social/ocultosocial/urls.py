"""
URL configuration for ocultosocial project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework.authtoken.views import obtain_auth_token
# debug
from debug_toolbar.toolbar import debug_toolbar_urls
#paginas
from ocultosocial import views

urlpatterns = [
    path("", views.ola_mundo, name="ola_mundo"),      #pagina inicial
    path('admin/', admin.site.urls),
    #urls
    re_path("ocultosocial/", include("applogin.urls")),
    #token
    path('api/token/', obtain_auth_token, name='api_token_auth'),
]
