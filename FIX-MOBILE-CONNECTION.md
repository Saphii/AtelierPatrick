# Correction des problèmes de connexion sur mobile

## Problèmes identifiés

1. **CORS** : Les requêtes depuis mobile peuvent être bloquées
2. **URL de l'API** : Détection automatique améliorée
3. **Gestion des erreurs** : Messages plus clairs pour les erreurs réseau

## Solutions appliquées

### 1. Frontend (`frontend/src/services/api.js`)

✅ Détection automatique de l'URL de l'API
✅ Gestion améliorée des erreurs réseau
✅ Timeout de 30 secondes pour les requêtes
✅ Messages d'erreur plus clairs

### 2. Backend - Configuration CORS

Sur le serveur, vous devez mettre à jour le fichier `.env` :

```bash
cd /var/www/app/backend
nano .env
```

Ajoutez ou modifiez cette ligne :

```env
# Autoriser toutes les origines (pour faciliter les tests mobiles)
# En production, vous pouvez spécifier des domaines exacts
CORS_ALLOW_ALL_ORIGINS=True
```

**OU** si vous préférez spécifier les domaines exacts :

```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,http://217.154.172.35,https://votre-domaine.netlify.app
```

### 3. Redémarrer le backend

```bash
# Redémarrer Gunicorn
pkill -f gunicorn
cd /var/www/app/backend
source .venv/bin/activate
gunicorn --workers 3 --bind unix:/var/www/app/backend/app.sock atelier_patrick.wsgi:application -D
```

## Vérifications

### Tester depuis mobile

1. Ouvrez l'application sur votre mobile
2. Essayez de vous connecter
3. Vérifiez la console du navigateur (si possible) pour voir les erreurs

### Tester depuis PC (simulation mobile)

Dans Chrome DevTools :
1. F12 pour ouvrir les outils développeur
2. Cliquez sur l'icône de téléphone (Toggle device toolbar)
3. Sélectionnez un appareil mobile
4. Testez la connexion

### Vérifier les logs du serveur

```bash
# Voir les logs Gunicorn
tail -f /var/log/atelier-patrick/gunicorn.log

# Voir les logs Nginx
tail -f /var/log/nginx/error.log
```

## Problèmes courants

### Erreur "Network Error"

- Vérifiez que le serveur est accessible depuis votre mobile
- Vérifiez que le pare-feu autorise les connexions
- Vérifiez que CORS_ALLOW_ALL_ORIGINS est activé

### Erreur CORS

- Vérifiez la configuration CORS dans `.env`
- Redémarrez le backend après modification
- Vérifiez les logs pour voir quelle origine est bloquée

### Timeout

- Augmentez le timeout dans `api.js` si nécessaire
- Vérifiez la vitesse de connexion mobile
- Vérifiez que le serveur répond rapidement

## Configuration recommandée pour la production

Pour la production, il est recommandé de spécifier les domaines exacts plutôt que d'autoriser toutes les origines :

```env
CORS_ALLOW_ALL_ORIGINS=False
CORS_ALLOWED_ORIGINS=https://votre-domaine.com,https://www.votre-domaine.com,http://217.154.172.35
```

## Note importante

Si votre frontend est déployé sur Netlify avec HTTPS, mais que votre backend utilise HTTP, certains navigateurs mobiles peuvent bloquer les requêtes mixtes (HTTPS vers HTTP). Dans ce cas, vous devriez :

1. Configurer HTTPS sur votre serveur (avec Let's Encrypt)
2. Ou utiliser les redirects Netlify (déjà configurés dans `netlify.toml`)

