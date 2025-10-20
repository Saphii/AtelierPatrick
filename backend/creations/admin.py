from django.contrib import admin
from .models import Creation, ContactMessage

@admin.register(Creation)
class CreationAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'price', 'is_available', 'created_at']
    list_filter = ['category', 'is_available', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['is_available']
    ordering = ['-created_at']

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject']
    list_editable = ['is_read']
    ordering = ['-created_at']
