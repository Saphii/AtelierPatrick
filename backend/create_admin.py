#!/usr/bin/env python
"""
Script pour créer un utilisateur administrateur pour l'Atelier de Patrick
"""

import os
import sys
import django

# Configuration Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'atelier_patrick.settings')
django.setup()

from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

def create_admin_user():
    """Crée un utilisateur administrateur avec un token d'authentification"""
    
    # Informations par défaut
    username = 'patrick'
    email = 'patrick@atelier-patrick.fr'
    password = 'atelier2024'
    
    print("🔧 Création de l'utilisateur administrateur...")
    
    # Vérifier si l'utilisateur existe déjà
    if User.objects.filter(username=username).exists():
        user = User.objects.get(username=username)
        print(f"✅ L'utilisateur '{username}' existe déjà")
    else:
        # Créer l'utilisateur
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            is_staff=True,
            is_superuser=True
        )
        print(f"✅ Utilisateur '{username}' créé avec succès")
    
    # Créer ou récupérer le token
    token, created = Token.objects.get_or_create(user=user)
    
    print("\n" + "="*50)
    print("📋 INFORMATIONS DE CONNEXION")
    print("="*50)
    print(f"Nom d'utilisateur: {username}")
    print(f"Mot de passe: {password}")
    print(f"Email: {email}")
    print(f"Token d'authentification: {token.key}")
    print("="*50)
    print("\n🌐 Accès au site:")
    print("• Site web: http://localhost:3000")
    print("• Administration: http://localhost:3000/admin")
    print("• Admin Django: http://localhost:8000/admin")
    print("\n💡 Vous pouvez maintenant vous connecter à l'interface d'administration !")

if __name__ == '__main__':
    create_admin_user()
