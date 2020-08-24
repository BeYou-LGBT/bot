const { MessageEmbed } = require("discord.js")
const Client = require("index").Client
const config = require("config/config")
module.exports.log = (msg) => {
    if(msg.author.bot || msg.system) return;
    let embed = new MessageEmbed().setAuthor(`Message de ${msg.author.username}#${msg.author.discriminator} supprimé`)
        .addField("Dans le salon", "<#" + msg.channel.id + ">")
    if(msg.content.length > 0 ) embed.addField("Message", msg.content)
    if(msg.attachments.size > 0) {
        let attachs_link;
        msg.attachments.forEach(attachment => {
            attachs_link = attachment.url + '\n';
        })
        embed.addField("Fichier(s) intégré(s) au message", attachs_link);
    }
    config.channels.log.send(embed)
}