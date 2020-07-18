const { RichEmbed } = require("discord.js")
const Moderation = require('../../Classes/Moderation.js')
module.exports.run = async (client, message, args) => {
    //if (message.deletable) message.delete().catch(erreur => console.log(erreur))
    const mod = new Moderation(message.member, message.mentions.members.first(), message)

    if (mod.checkPermission == 1) return message.reply(" tu n'as pas la permission de sanctionner")
    if (mod.checkPermission == 2) return message.reply(" tu ne peux pas sanctionner cette personne")
    mod.


}

module.exports.help = {
    name: "warn"
}
