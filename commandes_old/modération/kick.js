const config = require("../../config.json")
const { RichEmbed } = require('discord.js')
const sql = require("../../Utils/sql")
module.exports.run = async (bot, message, args) => {
    if (message.deletable) message.delete().catch(erreur => console.log(erreur))
    let staffrole = message.guild.roles.find(r => r.name === config.staffrole);
    if(message.member.roles.has(staffrole.id) == false) {
        message.channel.send("Vous n'avez pas la permission d'éjecter un utilisateur")
        return;
    }
    if(args[1] == undefined){
        message.channel.send(`Commande invalide, ${config.prefix}kick @utilisateur raison`)
        return
    }
    if(message.mentions.members.first() == undefined){
        message.channel.send("Utilisateur introuvable")
        return
    }
	if(message.mentions.members.first().roles.has(staffrole.id) == true) return message.channel.send("Vous n'avez pas la permission d'éjecter cette utilisateur")
		
    else if(args[1] !== undefined || message.mentions !== undefined){
        if(message.author.id == message.mentions.members.first().id) return;
        if(message.mentions.members.first().hasPermission("KICK_MEMBERS")) {
            message.channel.send("Vous ne pouvez pas éjecter cet utilisateur.")
            return;
        }
        if(args[2] === undefined){
            message.mentions.members.first().kick()
            message.channel.send(`Utilisateur ${message.mentions.members.first().user.username}#${message.mentions.members.first().user.discriminator} ejecté pour: ${message.content.slice(5).replace(args[1], '')}`)
            let embed = new RichEmbed().setAuthor(`L'utilisateur ${message.mentions.members.first().user.username}#${message.mentions.members.first().user.discriminator} a été éjecter du serveur`, `https://i.imgur.com/BdIyZlB.png`)
            embed.addField("Modérateur qui a sanctionné", `${message.author.username}#${message.author.discriminator}`)
            embed.addField("Raison de la sanction", 'Aucune raison précisé')
            message.client.channels.get(config.log_channel).send(embed)
        } else {
            message.mentions.members.first().kick(message.content.slice(2).replace(args[0] + " " + args[1] + " ", ""))
            message.channel.send(`Utilisateur ${message.mentions.members.first().user.username}#${message.mentions.members.first().user.discriminator} ejecté pour: ${message.content.slice(5).replace(args[1], '')}`)
            let embed = new RichEmbed().setAuthor(`L'utilisateur ${message.mentions.members.first().user.username}#${message.mentions.members.first().user.discriminator} a été éjecter du serveur`, `https://i.imgur.com/BdIyZlB.png`)
            embed.addField("Modérateur qui a sanctionné", `${message.author.username}#${message.author.discriminator}`)
            embed.addField("Raison de la sanction", message.content.slice(5).replace(args[1], ''))
            message.client.channels.get(config.log_channel).send(embed)
            try {
                sql.sanction(3, message.author.id, message.mentions.members.first().user.id, -1, `${message.content.slice(5).replace(args[1], '')}`)
            } catch(e){ throw e}
        }
    }

}

module.exports.help = {
    name: "kick"
}