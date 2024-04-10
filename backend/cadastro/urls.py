# No arquivo urls.py do aplicativo
from django.urls import path
from . import views

urlpatterns = [
    path('usuarios/', views.UsuarioListCreate.as_view(), name='usuario-list-create'),
]
