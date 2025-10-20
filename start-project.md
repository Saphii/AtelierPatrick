# Atelier de Patrick - Script de démarrage

Ce script permet de démarrer facilement le projet complet.

## Utilisation

### Windows (PowerShell)
```powershell
.\start-project.ps1
```

### macOS/Linux
```bash
chmod +x start-project.sh
./start-project.sh
```

## Ce que fait le script

1. Vérifie que Python et Node.js sont installés
2. Crée et active l'environnement virtuel Python
3. Installe les dépendances backend
4. Effectue les migrations Django
5. Installe les dépendances frontend
6. Démarre les deux serveurs en parallèle

## Arrêt des serveurs

Appuyez sur `Ctrl+C` pour arrêter les serveurs.
