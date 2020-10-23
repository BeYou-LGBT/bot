const Discord = require('discord.js');
const config = require("config/config")
const login = require('./config/login')
Client = new Discord.Client();
Client.login(login.token).catch(e => console.log(`Erreur lors de la connexion à Discord: ${e}`))


console.log("Chargement des commandes");
const setup = require("./setup.js")
setup.loadCommands('./commandes')
setup.SQLTestConnexion()
Client.on('ready', function(){
    config.init(Client)
    require("./Events/ready").init(Client)
})

Client.on('message', message => {
    if(message.author.bot || message.system) return;
    require("./Events/message").init(message)

})

Client.on('guildMemberAdd', membre => {
    config.channels.join.send(`Bienvenue <@${membre.id}> sur Pewed, je t'invite à aller lire les <#445271324999417856> du serveur et à les valider pour avoir accès au reste du discord`)
})
Client.on('guildMemberRemove', membre => {
    config.channels.join.send(`<@${membre.user.tag}> a quitté le serveur`)
})

Client.on('messageUpdate', (oldmsg, newmsg) => {
    require("./Events/messageUpdate").log(oldmsg, newmsg)
})

Client.on('messageDelete', msg => {
    require("./Events/messageDelete").log(msg)
})

