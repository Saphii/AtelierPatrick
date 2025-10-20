# Atelier de Patrick - Site Web

## Description
Site web pour l'Atelier de Patrick, spécialisé dans les créations en bois et les impressions 3D.

## Technologies utilisées
- **Frontend**: React 18 avec styled-components
- **Backend**: Django 4.2 avec Django REST Framework
- **Base de données**: SQLite (développement)

## Installation et démarrage

### Prérequis
- Python 3.8+
- Node.js 16+
- npm ou yarn

### Backend (Django)

1. Naviguer vers le dossier backend :
```bash
cd backend
```

2. Créer un environnement virtuel :
```bash
python -m venv venv
```

3. Activer l'environnement virtuel :
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. Installer les dépendances :
```bash
pip install -r ../requirements.txt
```

5. Effectuer les migrations :
```bash
python manage.py makemigrations
python manage.py migrate
```

6. Créer un superutilisateur :
```bash
python manage.py createsuperuser
```

7. Démarrer le serveur de développement :
```bash
python manage.py runserver
```

Le backend sera accessible sur http://localhost:8000

### Frontend (React)

1. Naviguer vers le dossier frontend :
```bash
cd frontend
```

2. Installer les dépendances :
```bash
npm install
```

3. Démarrer le serveur de développement :
```bash
npm start
```

Le frontend sera accessible sur http://localhost:3000

## Structure du projet

```
AtelierPatrick/
├── backend/
│   ├── atelier_patrick/          # Configuration Django
│   ├── creations/                # App Django pour les créations
│   └── manage.py
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/           # Composants React réutilisables
│   │   ├── pages/               # Pages principales
│   │   └── App.js
│   └── package.json
├── requirements.txt
└── README.md
```

## Fonctionnalités

### Backend
- API REST pour les créations
- Gestion des messages de contact
- Interface d'administration Django
- Upload d'images pour les créations

### Frontend
- Page d'accueil avec présentation
- Galerie des créations avec filtres
- Formulaire de contact
- Design responsive et moderne

## API Endpoints

- `GET /api/creations/` - Liste des créations
- `GET /api/creations/by_category/?category=bois` - Créations par catégorie
- `POST /api/contact/` - Envoi d'un message de contact

## Personnalisation

### Couleurs
Les couleurs principales peuvent être modifiées dans les fichiers styled-components :
- Couleur principale : #8B4513 (marron)
- Couleur secondaire : #A0522D (marron clair)

### Contenu
- Modifier les textes dans les composants React
- Ajouter des créations via l'interface d'administration Django
- Personnaliser les informations de contact

## Déploiement

### Backend
1. Configurer une base de données PostgreSQL pour la production
2. Modifier les paramètres dans `settings.py`
3. Déployer sur Heroku, DigitalOcean, ou autre plateforme

### Frontend
1. Build de production : `npm run build`
2. Déployer les fichiers du dossier `build/` sur Netlify, Vercel, ou autre

## Support

Pour toute question ou problème, contactez le développeur.
