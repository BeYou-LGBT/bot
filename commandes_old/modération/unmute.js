const config = require("../../config.json")
const { RichEmbed } = require("discord.js")
module.exports.run = async (bot, message, args) => {
    if (message.deletable) message.delete().catch(erreur => console.log(erreur))
    if(message.member.hasPermission("MUTE_MEMBERS") == false) {
        message.channel.send("Vous n'avez pas la permission de rendre la parole a un utilisateur")
        return;
    }
    if(args[1] == undefined){
        message.channel.send("Commande invalide, ${config.prefix}unmute @utilisateur raison")
        return
    }
    if(message.mentions.members.first() == undefined){
        message.channel.send("Utilisateur introuvable")
        return
    }
    else if(args[1] !== undefined || message.mentions !== undefined){
        if(message.author.id == message.mentions.members.first().id) return;
        if(message.mentions.members.first().hasPermission("MUTE_MEMBERS")) {
            message.channel.send("Vous ne pouvez rendre la parole a cet utilisateur.")
            return;
        }
        else {
            message.guild.channels.forEach(function(channel) {
                if (channel.type == "text") {
                    channel.overwritePermissions(message.mentions.members.first(), {
                        SEND_MESSAGES: null
                    })
                }
                if (channel.type == "voice") {
                    channel.overwritePermissions(message.mentions.members.first(), {
                        CONNECT: null
                    })
                }
            })
            message.channel.send(`Utilisateur ${message.mentions.members.first().user.username}#${message.mentions.members.first().user.discriminator} peut de nouveau parler.`)
            let embed = new RichEmbed().setAuthor(`L'utilisateur ${message.mentions.members.first().user.username}#${message.mentions.members.first().user.discriminator} peut de nouveau parler sur le serveur`, `https://i.imgur.com/BdIyZlB.png`)
            embed.addField("Modérateur qui a sanctionné", `${message.author.username}#${message.author.discriminator}`)
            message.client.channels.get(config.log_channel).send(embed)
        }
    }

}

module.exports.help = {
    name: "unmute"
}