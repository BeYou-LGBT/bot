const { RichEmbed } = require('discord.js')
const config = require('../../config.json')
module.exports.run = async (client, message, args) => {
    if(args[1] == undefined) {
        message.channel.send("Commande invalide, /suggestion <votre suggestion>")
        return;
    } else {
        const embed = new RichEmbed().setColor('#de2414').setAuthor(`${message.author.username}#${message.author.discriminator}`)
            .setDescription(message.content.replace(`${config.prefix}suggestion `, ''));
        config.channels.suggestions.send(embed)
    }
}

