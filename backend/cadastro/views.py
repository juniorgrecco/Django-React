# No arquivo views.py do aplicativo
from rest_framework import generics
from .models import Usuario
from .serializers import UsuarioSerializer

class UsuarioListCreate(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
