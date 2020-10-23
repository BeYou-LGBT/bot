const Discord = require('discord.js');
const config = require("config/config")
const login = require('./config/login')
Client = new Discord.Client();
Client.login(login.token).catch(e => console.log(`Erreur lors de la connexion à Discord: ${e}`))


console.log("Chargement des commandes");
const setup = require("./setup.js")
setup.loadCommands('./commandes')
//setup.SQLTestConnexion()
Client.on('ready', function(){
    config.init(Client)
    require("./Events/ready").init(Client)
})

Client.on('message', message => {
    if(message.author.bot || message.system) return;
    try {
        require("./Events/message").init(message)
    } catch (e) {
        console.log("Erreur lors de l'event message: " + e)
    }


})


Client.on('messageUpdate', (oldmsg, newmsg) => {
    try {
        require("./Events/messageUpdate").log(oldmsg, newmsg)
    } catch (e) {
        console.log("Erreur lors de l'event message: " + e)
    }
})



