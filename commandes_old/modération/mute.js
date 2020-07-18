const config = require("../../config.json")
const { RichEmbed } = require("discord.js")
const sql = require("../../Utils/sql")
const timespan = require('../../Utils/timespan.js')
module.exports.run = async (bot, message, args) => {
    const time = timespan.toTimestamp(args[2])
    if (message.deletable) message.delete().catch(erreur => console.log(erreur))
    if(message.member.hasPermission("MUTE_MEMBERS") == false) {
        message.channel.send("Vous n'avez pas la permission de rendre muet un utilisateur")
        return;
    }
    if(args[1] == undefined || args[2] == undefined || args[3] == undefined){
        message.channel.send(`Commande invalide, ${config.prefix}mute @utilisateur temps raison`)
        return
    }
    if(message.mentions.members.first() == undefined){
        message.channel.send("Utilisateur introuvable")
        return
    }
    if(time == -1) return message.channel.send("Erreur: la durée est invalide")
    if(message.author.id == message.mentions.members.first().id) return;
    else if(message.mentions !== undefined ){
        if(message.author.id == message.mentions.members.first().id) return;
        if(message.mentions.members.first().hasPermission("MUTE_MEMBERS")) return message.channel.send("Vous ne pouvez pas rendre muet cet utilisateur.")

        message.mentions.members.first().addRole(config.mute_role).then(() => {
            let time_show = time === -1 ? -1 : time / 1000;
            bot.channels.get("474711850886627330").send(`Bonjour <@${message.mentions.members.first().id}> \nVous êtes ici pour la raison suivante : ${args[3]} \n Vous serez libre dans : ${timespan.secondToDuration(time_show)}`)
        })
        const raison = args[3] == undefined ? "Aucune raison spécifié" : message.content.slice(5).replace(`${args[1]} ${args[2]}`, '')
        message.channel.send(`Utilisateur ${message.mentions.members.first().user.username}#${message.mentions.members.first().user.discriminator} rendu muet`)
        let embed = new RichEmbed().setAuthor(`L'utilisateur ${message.mentions.members.first().user.username}#${message.mentions.members.first().user.discriminator} a été rendu muet sur le serveur`, bot.user.avatarURL)
        embed.addField("Modérateur qui a sanctionné", `${message.author.username}#${message.author.discriminator}`)
        embed.addField("Pendant", timespan.formatDate(time))
        embed.addField("Raison de la sanction", raison)
        message.client.channels.get(config.log_channel).send(embed)
        try {
            sql.sanction(2, message.author.id, message.mentions.members.first().user.id, time, raison)
        } catch(e){ throw e}
    }

}

module.exports.description = "Pour rendre muet un utilisateur"