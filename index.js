const Discord = require('discord.js');
const { RichEmbed } = require('discord.js')
const fs = require('fs');
const config = require('./dependencies').config
const login = require('./login')
const Client = new Discord.Client();
let Commandes = new Array();
const Categories = new Map()
const Path = require("path")
try {
    Client.login(login.token);
} catch (e) {
    console.log(`Erreur lors de la connexion à Discord: ${e}`)
}
/*const sql = require("./sql")
sql.SQLTestConnexion()*/
module.exports.Client = Client;
//const WaillProtect = require('./Protection.js')
console.log("Chargement des commandes_old");
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
                if(Categories.get(parentFile) == undefined) Categories.set(parentFile, "")
                Categories.set(parentFile, Categories.get(parentFile) + " `" + fichier.slice(0, -3) + "`")

            }
        })
    })

}
loadcommandes('./commandes')

Client.on('ready', function(){
    //WaillProtect.init(Client.guilds.get('415557491326320641').members)
    console.log("Chargement du bot terminé");
    Client.user.setActivity(`${config.prefix}help`)
    //Client.channels.get('579270101724037140').fetchMessage(config.acces_message).then(msg => msg.react('✅'))
    //Client.channels.get('579270101724037140').fetchMessage(config.help_noctif_role_message).then(msg => msg.react('🔔'))

    setInterval(() => {
        //sql.checkMute(config.server)
        //sql.checkBan(config.server)
    
    }, 5000)
})

Client.on('message', message => {
    if(message.author.bot) return;
    /*WaillProtect.antipub(message);
    WaillProtect.antispammentions(message);
    WaillProtect.antispam(message);*/
    //if(message.channel.type == 'dm') Client.channels.get('584845598931550221').send(`de: ${message.author.username} \n \n Message: ${message.content}`)
    if(message.content.toLowerCase().slice(0,1) !== config.prefix) return;
    let args = message.content.toLowerCase().split(' ');
    Commandes.forEach(function (commande) {
		let cmdsplit = commande.split('/').pop()
        if (cmdsplit == args[0].replace(config.prefix, '') + '.js') {
            //message.channel.send('Commande existante');
            try {
                let cmdfile = require(commande)
                const cmd = new cmdfile()
                cmd.execute(message, args)
            } catch (err) {
                console.log(err)
            }
        }
    })





})

Client.on('guildMemberAdd', membre => {
    membre.guild.channels.get(config.channels.join).send(`Bienvenue <@${membre.id}> sur Pewed, je t'invite à aller lire les <#445271324999417856> du serveur et à les valider pour avoir accès au reste du discord`)

})

Client.on('messageUpdate', (oldmsg, newmsg) => {
    if(oldmsg.author.bot) return;
    //WaillProtect.antipub(newmsg);
    let embed = new RichEmbed().setAuthor(`Message de ${oldmsg.author.username}#${oldmsg.author.discriminator} édité`)
        .addField("Dans le salon", "<#" + oldmsg.channel.id + ">")
        .addField("Avant", oldmsg.content)
        .addField("Après", newmsg.content)
	if(oldmsg.attachments.size > 0) {
        let attachs_link;
        oldmsg.attachments.forEach(attachment => {
            attachs_link = attachment.url + '\n';
        })
        embed.addField("Fichier(s) intégré(s) au message", attachs_link);
    }
    Client.channels.get(config.channels.log).send(embed)
    return;
})

Client.on('messageDelete', msg => {
    if(msg.author.bot) return;
    let embed = new RichEmbed().setAuthor(`Message de ${msg.author.username}#${msg.author.discriminator} supprimé`)
        .addField("Dans le salon", "<#" + msg.channel.id + ">")
    if(msg.content.length > 0 ) embed.addField("Message", msg.content)
	if(msg.attachments.size > 0) {
        let attachs_link;
        msg.attachments.forEach(attachment => {
            attachs_link = attachment.url + '\n';
        })
        embed.addField("Fichier(s) intégré(s) au message", attachs_link);
    }
    Client.channels.get(config.channels.log).send(embed)
})

Client.on('messageReactionAdd', (reaction, user) => {
    //reaction.message.channel.send(reaction.emoji.name)
    if (reaction.message.id == config.messages.access && reaction.emoji.name == '✅') {
        if (!reaction.message.member.roles.has(config.roles.membre)) {
            reaction.message.member.addRole(config.roles.membre);
        }
    }
    if (reaction.message.id == config.messages.help_noctif_role && reaction.emoji.name == '🔔') {
        if (!reaction.message.member.roles.has(config.roles.help_noctif)) {
            reaction.message.member.addRole(config.roles.help_noctif);
        }
    }
})

Client.on('messageReactionRemove', (reaction, user) => {
    //reaction.message.channel.send(reaction.emoji.name)
    if (reaction.message.id == config.messages.access && reaction.emoji.name == '✅') {
        if (reaction.message.member.roles.has(config.roles.membre)) {
            reaction.message.member.addRole(config.roles.membre);
        }
    }
    if (reaction.message.id == config.messages.help_noctif_role && reaction.emoji.name == '🔔') {
        if (!reaction.message.member.roles.has(config.roles.help_noctif)) {
            reaction.message.member.addRole(config.roles.help_noctif);
        }
    }
})

module.exports = Commandes;
module.exports.Categories = Categories;

