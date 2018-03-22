const Discord = require('discord.js');
const bot = new Discord.Client();

PREFIX = "-";

var dispatcher;

function sendError(message, description) {
    message.channel.send({embed: {
        color: 15158332,
        title: '**Erreur commande :**',
        description: ':x:' + description
    }});
}

bot.on('ready', function(){
    console.log("bot pret");
});

bot.on('message', message => {
    if(message.content[0] === PREFIX){
        let splitMessage = message.content.split(" ");
        if(splitMessage[0] === PREFIX + 'ping') {
            message.channel.send('pong')
        }

        else if(splitMessage[0] === PREFIX + 'split') {
            if(splitMessage.length === 2)
                message.channel.send('Param : ' + splitMessage[1]);
            else
                sendError(message, 'Problème de paramètres')
            
        }

        else  if(splitMessage[0] === PREFIX + 'ban') {
            if(splitMessage.length === 2) 
                message.guild.ban(message.mentions.users.first());
            else 
                sendError(message, 'Il doit manquer la mention')
        }

        else if(splitMessage[0] === PREFIX + 'play'){
            if(splitMessage.length === 2) {
                if(message.member.voiceChannel){
                    message.member.voiceChannel.join().then(connection => {
                        dispatcher = connection.playArbitraryInput(splitMessage[1]);

                        dispatcher.on('error', e =>{
                            console.log(e);
                        });

                        dispatcher.on('end', e => {
                            dispatcher = undefined;
                            console.log('Fin du son');
                        });

                    }).catch(console.log);           
                }
                else {
                    sendError(message, 'Il faut rejoindre un canal vocal !')
                }
            }
            else {
                if(splitMessage.length < 2)
                    sendError(message, 'Il manque un parametre');
                else 
                    sendError(message, 'Il y a trop de parametres');
            }
        }

        else  if(splitMessage[0] === PREFIX + 'pause') {
            if(dispatcher !== undefined)
                dispatcher.pause();
        }
   
        else  if(splitMessage[0] === PREFIX + 'resume') {
            if(dispatcher !== undefined)
                dispatcher.pause();
        }

        else  if(splitMessage[0] === PREFIX + 'stop') {
            if(dispatcher !== undefined)
                message.member.voiceChannel.leave();
        }
        
        else if(splitMessage[0] === PREFIX + 'prefix') {
            if(splitMessage.length === 2){
                 PREFIX = splitMessage[1];
                message.channel.send('Prefix changé !');
            }   
            else
                sendError(message, 'Problème de paramètres');
        }
        
    }
});

bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
        return channel.send('Bienvenue sur mon serveur discord' + member.displayName);
    }).catch(console.error)
});

bot.login('Mzk2NjcxNTUxNDg0ODU0Mjc0.DY3jBw.e8q03i5ImbN6E0HSI3e4Xm5jRVU') //TOKEN