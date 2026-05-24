# Bot Discord - Join = Unmute

Bot Discord qui démette automatiquement et déconnecte les utilisateurs qui rejoignent un salon vocal spécifique.

## Fonctionnalités

- Détecte quand un utilisateur rejoint le salon vocal configuré
- Démette automatiquement l'utilisateur (enlève le mute rouge fait par un modérateur)
- Déconnecte l'utilisateur 3 secondes après avoir été démuté

## Installation

1. Installez les dépendances :
```bash
npm install
```

2. Copiez le fichier `.env.example` vers `.env` :
```bash
copy .env.example .env
```

3. Configurez votre `.env` :
   - `DISCORD_TOKEN` : Token de votre bot Discord (obtenu sur https://discord.com/developers/applications)
   - `VOICE_CHANNEL_ID` : ID du salon vocal à surveiller (activez le mode développeur sur Discord, puis clic droit sur le salon > Copier l'ID)

4. Lancez le bot :
```bash
npm start
```

## Permissions requises

Le bot doit avoir les permissions suivantes :
- Se connecter (Connect)
- Parler (Speak) - pour gérer le mute
- Déplacer les membres (Move Members) - pour déconnecter

## Note

Pour obtenir l'ID d'un salon vocal :
1. Activez le mode développeur dans Discord (Paramètres > Avancé > Mode développeur)
2. Clic droit sur le salon vocal
3. Sélectionnez "Copier l'ID"



