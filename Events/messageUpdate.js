const { MessageEmbed }= require("discord.js")
const Client = require("index").Client
const config = require("config/config")
module.exports.log = (oldmsg, newmsg) => {
    if(oldmsg.author.bot) return;
    //WaillProtect.antipub(newmsg);
    let embed = new MessageEmbed().setAuthor(`Message de ${oldmsg.author.username}#${oldmsg.author.discriminator} édité`)
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
    return config.channels.log.send(embed)
}