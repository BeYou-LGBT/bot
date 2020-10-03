const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const fs = require('fs');
const config = require("config/config")
const login = require('./config/login')
Client = new Discord.Client();
let Commandes = new Array();
const Categories = new Map()
const Path = require("path")
Client.login(login.token).catch(e => console.log(`Erreur lors de la connexion à Discord: ${e}`))

const sql = require("./Utils/sql")
sql.SQLTestConnexion()
console.log("Chargement des commandes");
let i = 0;

function loadcommandes(path) {
    fs.readdir(path, (erreur, fichiers) => {
        if (erreur) console.log(`Erreur lors de la lecture des commandes: ${erreur}`)
        fichiers.forEach(function (fichier) {
            if (fs.statSync(`${path}/${fichier}`).isDirectory()) return loadcommandes(`${path}/${fichier}`)
            if (fichier.split(".").pop() == "js") {
                Commandes.push(`${path}/${fichier}`)
                i++

                //chargement des infos pour la commande help
                const parentFile = Path.resolve(path, fichier).toString().replace("\\" + fichier, "").split("\\").pop()
                if(Categories.get(parent:qile) == undefined) Categories.set(parentFile, "")
                Categories.set(parentFile, Categories.get(parentFile) + " `" + fichier.slice(0, -3) + "`")

            }
        })
    })

}
loadcommandes('./commandes')

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

Client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.id === config.messages.access && reaction.emoji.name === '✅') {
        if (!reaction.message.member.roles.cache.has(config.roles.membre)) {
            reaction.message.member.roles.add(config.roles.membre).catch(e => console.log(`Impossible de donner le role <@${config.roles.membre.id}> à <@${reaction.message.member.id}>`
            + `\n ${e}`))
        }
    }
    if (reaction.message.id == config.messages.help_noctif_role && reaction.emoji.name == '🔔') {
        if (!reaction.message.member.roles.cache.has(config.roles.help_noctif)) {
            reaction.message.member.roles.add(config.roles.help_noctif).catch(e => console.log(`Impossible de donner le role <@${config.roles.membre.id}> à <@${reaction.message.member.id}>`
                + `\n ${e}`))
        }
    }
})

Client.on('messageReactionRemove', (client, data, reaction) => {
    //reaction.message.channel.send(reaction.emoji.name)
    if (reaction.message.id == config.messages.access && reaction.emoji.name == '✅') {
        if (reaction.message.member.roles.cache.has(config.roles.membre)) {
            reaction.message.member.roles.add(config.roles.membre).catch(e => console.log(`Impossible de donner le role <@${config.roles.membre.id}> à <@${reaction.message.member.id}>`
                + `\n ${e}`))
        }
    }
    if (reaction.message.id == config.messages.help_noctif_role && reaction.emoji.name == '🔔') {
        if (!reaction.message.member.roles.has(config.roles.help_noctif)) {
            reaction.message.member.roles.add(config.roles.help_noctif).catch(e => console.log(`Impossible de donner le role <@${config.roles.membre.id}> à <@${reaction.message.member.id}>`
                + `\n ${e}`))
        }
    }
})

module.exports.Commandes = Commandes;
module.exports.Categories = Categories;
module.exports.Client = Client;