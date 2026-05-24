const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// ID du salon vocal à surveiller (à configurer dans .env)
const TARGET_VOICE_CHANNEL_ID = process.env.VOICE_CHANNEL_ID;

client.once('ready', () => {
    console.log(`Bot connecté en tant que ${client.user.tag}!`);
    console.log(`Surveillance du salon vocal: ${TARGET_VOICE_CHANNEL_ID}`);
});

client.on('voiceStateUpdate', async (oldState, newState) => {
    // Vérifier si l'utilisateur rejoint le salon vocal cible
    if (newState.channelId === TARGET_VOICE_CHANNEL_ID && oldState.channelId !== TARGET_VOICE_CHANNEL_ID) {
        const member = newState.member;
        
        if (!member) return;
        
        console.log(`${member.user.tag} a rejoint le salon vocal ${newState.channel.name}`);
        
        try {
            // Démute l'utilisateur (enlève le mute rouge fait par un modérateur)
            // Fonctionne même si l'utilisateur est en sourdine
            await member.voice.setMute(false, 'Démute automatique');
            console.log(`${member.user.tag} a été démuté`);
            
            // Déconnecter l'utilisateur après 3 secondes
            setTimeout(async () => {
                try {
                    await member.voice.disconnect('Déconnexion automatique après démutage');
                    console.log(`${member.user.tag} a été déconnecté`);
                } catch (error) {
                    console.error(`Erreur lors de la déconnexion de ${member.user.tag}:`, error);
                }
            }, 3000);
            
        } catch (error) {
            console.error(`Erreur lors du traitement de ${member.user.tag}:`, error);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);

