const { MessageEmbed }= require("discord.js")
const config = require("config/config")
const date = new Date()
const mois = new Intl.DateTimeFormat('fr-FR', { month: '2-digit'}).format(date)
module.exports.log = (oldmsg, newmsg) => {
    const guild = oldmsg.client.guilds.cache.get(config.servers.log.id)
    const log_channel = guild.channels.cache.find(r => r.name === oldmsg.channel.name)

    if(oldmsg.author.bot) return;
    if (!log_channel) return console.log("Aucun salon de logs pour le salon " + newmsg.channel.name)
    let embed = new MessageEmbed().setAuthor(`${oldmsg.author.tag}`)
        .addField("Message avant modification", oldmsg.content)
        .addField("Message modifié", newmsg.content)
    embed.setFooter(`${(date.getDate() < 10 ? '0' : '') + date.getDate()}/${mois}/${date.getFullYear()}`)
    if(oldmsg.attachments.size > 0) {
        let attachs_link;
        oldmsg.attachments.forEach(attachment => {
            attachs_link = attachment.url + '\n';
        })
        embed.addField("Fichier(s) intégré(s) au message", attachs_link);
    }
    return log_channel.send(embed)
}