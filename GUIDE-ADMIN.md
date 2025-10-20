# Guide d'utilisation - Interface d'Administration
## L'Atelier de Patrick

### 🚀 Démarrage du site

1. **Lancer le script de démarrage** :
   ```powershell
   .\start-project.ps1
   ```

2. **Attendre que les serveurs démarrent** :
   - Backend Django : http://localhost:8000
   - Frontend React : http://localhost:3000

### 🌐 Accès au site

**Site vitrine principal :** http://localhost:3000

Le site s'affiche normalement avec :
- Page d'accueil
- Galerie des créations
- Formulaire de contact
- **Bouton "Admin" discret** en haut à droite

### 🔐 Accès à l'administration

1. **Cliquer sur le bouton "Admin"** en haut à droite du site
2. **Une fenêtre s'ouvre** avec le formulaire de connexion
3. **Se connecter** avec :
   - Nom d'utilisateur : `patrick`
   - Mot de passe : `atelier2024`

### 📸 Ajouter une création

1. **Se connecter** à l'administration (voir ci-dessus)
2. **Cliquer sur "Ajouter une création"**
3. **Remplir le formulaire** :
   - **Titre** : Nom de votre création (ex: "Table en chêne")
   - **Description** : Détails de la création
   - **Catégorie** : Choisir entre "Bois", "3D" ou "Mixte"
   - **Prix** : Prix en euros (optionnel)
   - **Disponible** : Cocher si la création est à vendre
   - **Image** : Cliquer pour ajouter une photo

4. **Sauvegarder** la création

### ✏️ Modifier une création

1. **Dans l'interface d'administration**
2. **Survoler** une création pour voir les boutons d'action
3. **Cliquer sur l'icône crayon** pour modifier
4. **Modifier** les informations souhaitées
5. **Sauvegarder** les modifications

### 🗑️ Supprimer une création

1. **Survoler** la création à supprimer
2. **Cliquer sur l'icône poubelle**
3. **Confirmer** la suppression

### 🎨 Interface utilisateur

- **Modal d'administration** : S'ouvre par-dessus le site
- **Bouton discret** : "Admin" en haut à droite, devient vert quand connecté
- **Upload d'images** : Glisser-déposer ou clic pour ajouter des photos
- **Aperçu en temps réel** : Voir les modifications avant de sauvegarder
- **Gestion des catégories** : Organiser par type de création
- **Statut disponible** : Marquer si une création est à vendre ou non

### 🔧 Fonctionnalités

- **Interface simple** : Conçue pour être facile à utiliser
- **Restez sur le site** : L'administration s'ouvre dans une fenêtre
- **Déconnexion facile** : Bouton "Déconnexion" dans l'interface admin
- **Sauvegarde automatique** : Les modifications sont immédiatement visibles

### 🔧 Personnalisation

**Changer les identifiants :**
1. Aller sur http://localhost:8000/admin
2. Se connecter avec les identifiants actuels
3. Modifier le mot de passe dans "Utilisateurs"

**Modifier les informations de contact :**
- Éditer le fichier `frontend/src/pages/Contact.js`
- Changer l'adresse, téléphone, email, horaires

### 🆘 Aide

**Problèmes courants :**
- **Site ne démarre pas** : Vérifier que Python et Node.js sont installés
- **Erreur de connexion** : Vérifier que les serveurs sont démarrés
- **Image ne s'affiche pas** : Vérifier le format (JPG, PNG recommandés)
- **Modal ne s'ouvre pas** : Vérifier que JavaScript est activé

**Support :**
- Consulter le fichier README.md pour plus de détails techniques
- Contacter le développeur en cas de problème

### 📋 Checklist quotidienne

- [ ] Ouvrir le site vitrine
- [ ] Cliquer sur "Admin" pour se connecter
- [ ] Vérifier les nouvelles créations
- [ ] Ajouter les photos des nouvelles créations
- [ ] Mettre à jour les prix si nécessaire
- [ ] Marquer les créations vendues comme non disponibles
- [ ] Se déconnecter quand terminé

### 💡 Avantages de cette approche

- **Site vitrine prioritaire** : Les visiteurs voient d'abord le site
- **Admin discret** : Pas d'interface séparée, tout reste cohérent
- **Facile à utiliser** : Interface simple et intuitive
- **Sécurisé** : Connexion protégée par mot de passe
- **Flexible** : Peut être utilisé sur mobile et desktop

---

**Bon travail avec votre site web ! 🎉**
