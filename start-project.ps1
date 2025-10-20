# Script de démarrage pour l'Atelier de Patrick
# Ce script démarre le backend Django et le frontend React

Write-Host "🚀 Démarrage de l'Atelier de Patrick..." -ForegroundColor Green

# Vérifier que Python est installé
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Python détecté: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python n'est pas installé ou pas dans le PATH" -ForegroundColor Red
    exit 1
}

# Vérifier que Node.js est installé
try {
    $nodeVersion = node --version 2>&1
    Write-Host "✅ Node.js détecté: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js n'est pas installé ou pas dans le PATH" -ForegroundColor Red
    exit 1
}

# Créer l'environnement virtuel s'il n'existe pas
if (-not (Test-Path "backend\venv")) {
    Write-Host "📦 Création de l'environnement virtuel Python..." -ForegroundColor Yellow
    python -m venv backend\venv
}

# Activer l'environnement virtuel
Write-Host "🔧 Activation de l'environnement virtuel..." -ForegroundColor Yellow
& "backend\venv\Scripts\Activate.ps1"

# Installer les dépendances Python
Write-Host "📥 Installation des dépendances Python..." -ForegroundColor Yellow
pip install -r requirements.txt

# Effectuer les migrations Django
Write-Host "🗄️ Configuration de la base de données..." -ForegroundColor Yellow
Set-Location backend
python manage.py makemigrations
python manage.py migrate

# Créer l'utilisateur administrateur
Write-Host "👤 Création de l'utilisateur administrateur..." -ForegroundColor Yellow
python create_admin.py

# Installer les dépendances Node.js
Write-Host "📦 Installation des dépendances Node.js..." -ForegroundColor Yellow
Set-Location ..\frontend
npm install

# Démarrer les serveurs
Write-Host "🎉 Démarrage des serveurs..." -ForegroundColor Green
Write-Host "Backend Django: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Frontend React: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Admin Django: http://localhost:8000/admin" -ForegroundColor Cyan
Write-Host "" -ForegroundColor White
Write-Host "Appuyez sur Ctrl+C pour arrêter les serveurs" -ForegroundColor Yellow

# Démarrer Django en arrière-plan
Set-Location ..\backend
Start-Process powershell -ArgumentList "-Command", "python manage.py runserver" -WindowStyle Minimized

# Démarrer React
Set-Location ..\frontend
npm start
