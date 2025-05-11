#importacoes: django
from django.urls import path, include
from rest_framework.routers import DefaultRouter
#views
from applogin.views import ClsLoginViewSet

#controlador de rotas
rotasControle = DefaultRouter()
#registra as views
rotasControle.register(r"login", ClsLoginViewSet, basename="login")
# rotas
urlpatterns = [path("", include(rotasControle.urls))]
