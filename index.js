// Author: Felipe Dasr#5246
// PXL bot

const { Client, Intents, MessageEmbed, TextChannel } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config()     // environment config

const PxlClient = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

PxlClient.on('ready', () => {
    console.clear();
    console.log('PXL BOT STARTED');
});

PxlClient.on('userUpdate', async (oldUser, newUser) => {
    
    if (oldUser.avatarURL() != newUser.avatarURL()) {

        const avatarURL = newUser.displayAvatarURL({dynamic: true, size: 2048});
        
        if(avatarURL.includes('.gif')){
            const msgEmbed = new MessageEmbed()
            .setAuthor(PxlClient.user.username, PxlClient.user.avatarURL())
            .setImage(avatarURL)
            .setColor('#05D2F8')
            .setFooter(
                `${newUser.id} trocou de avatar`, 
                oldUser.displayAvatarURL({dynamic: true, size: 2048})
            );
    
            const channel = PxlClient.channels.cache.get(process.env.AVATAR_LOG_CHANNEL_ID);
    
            if (channel) {
                channel.send({
                    embeds: [msgEmbed]
                })
            }
        }
    }
});

PxlClient.login(process.env.BOT_TOKEN);