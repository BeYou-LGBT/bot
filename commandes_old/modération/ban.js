const { RichEmbed} = require('discord.js');
const config = require("../../config.json")
const sql = require("../../Utils/sql")
const timespan = require('../../Utils/timespan.js')
module.exports.run = async (bot, message, args) => {
    //if (message.deletable) message.delete().catch(erreur => console.log(erreur))
    let staffrole = message.guild.roles.find(r => r.name === config.staffrole);
    if(message.member.roles.has(staffrole.id) == false) return message.channel.send("Vous n'avez pas la permission de bannir un utilisateur")
    const time = timespan.toTimestamp(args[2])

    if(args[1] == undefined || args[2] == undefined) {
        message.channel.send(`Commande invalide, ${config.prefix}ban @utilisateur temps raison`)
        return
    }
    if(message.mentions.members.first() == undefined){
        message.channel.send("Utilisateur introuvable")
        return
    }
    if(message.author.id == message.mentions.members.first().id) return message.reply("yolo");
	if(message.mentions.members.first().roles.has(staffrole.id) == true) return message.channel.send("Vous n'avez pas la permission de bannir cette utilisateur")
    const raison = args[3] == undefined ? "Aucune raison spécifié" : message.content.slice(5).replace(`${args[1]} ${args[2]}`, '')
    try {
        let time_show = time < 31536000 * 1000 ? timespan.secondToDuration(time / 1000) : "Définitif";
        console.log(time + " : " + time_show)
        message.mentions.users.first().send(`Vous avez été banni du discord pour : ${raison} \n` + `Durée: ${time_show}`)
        message.mentions.members.first().ban(raison)
    } catch(e) {console.log(e)}
    message.channel.send(`Utilisateur ${message.mentions.members.first().user.username}#${message.mentions.members.first().user.discriminator} banni`)
    let embed = new RichEmbed().setAuthor(`L'utilisateur ${message.mentions.members.first().user.username}#${message.mentions.members.first().user.discriminator} a été banni du serveur`, bot.user.avatarURL)
    embed.addField("Modérateur qui a sanctionné", `${message.author.username}#${message.author.discriminator}`)
    embed.addField("Jusqu'au", timespan.formatDate(Date.now() + time))
    embed.addField("Raison de la sanction", raison)
    message.client.channels.get(config.log_channel).send(embed)
    try {
         sql.sanction(4, message.author.id, message.mentions.members.first().user.id, time, raison)
    } catch(e){ console.log(e)}
    

}

