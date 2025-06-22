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
from django.views.generic.base import RedirectView
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter
# debug
from debug_toolbar.toolbar import debug_toolbar_urls
#views
from applogin.views import ClsLoginViewSet
from appposts.views import ClsPostsViewSet

#roteador do django
roteador = DefaultRouter()
#rotas: apps
roteador.register(r"login", ClsLoginViewSet, basename="login")
roteador.register(r"posts", ClsPostsViewSet, basename="posts")

urlpatterns = [
    path("", RedirectView.as_view(url="/ocultosocial/", permanent=False), name="inicial"),
    path('admin/', admin.site.urls),
    #urls
    re_path("ocultosocial/", include(roteador.urls)),
    #token
    path('api/token/', obtain_auth_token, name='api_token_auth'),
]