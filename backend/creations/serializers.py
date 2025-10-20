from rest_framework import serializers
from .models import Creation, ContactMessage


class CreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Creation
        fields = ['id', 'title', 'description', 'category', 'image', 'price', 'is_available', 'created_at']
        read_only_fields = ['id', 'created_at']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'subject', 'message']
