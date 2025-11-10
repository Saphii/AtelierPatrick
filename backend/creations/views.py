from rest_framework import viewsets, status
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Creation, ContactMessage
from .serializers import CreationSerializer, ContactMessageSerializer


class CreationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Creation.objects.filter(is_available=True)
    serializer_class = CreationSerializer
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        category = request.query_params.get('category', None)
        if category:
            creations = self.queryset.filter(category=category)
        else:
            creations = self.queryset
        serializer = self.get_serializer(creations, many=True)
        return Response(serializer.data)


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'Votre message a été envoyé avec succès !'},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminCreationViewSet(viewsets.ModelViewSet):
    queryset = Creation.objects.all()
    serializer_class = CreationSerializer
    permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            creation = serializer.save()
            return Response(
                {
                    'message': 'Création ajoutée avec succès !',
                    'creation': self.get_serializer(creation).data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            creation = serializer.save()
            return Response(
                {
                    'message': 'Création mise à jour avec succès !',
                    'creation': self.get_serializer(creation).data
                },
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(
            {'message': 'Création supprimée avec succès !'},
            status=status.HTTP_200_OK
        )
