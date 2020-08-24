const { MessageEmbed } = require('discord.js')
const config = require('config/config')
const Commande = require("Classes/Commande")

class Suggestion extends Commande {

    constructor() {
        super()
        this.name = "help"
        this.description = "Obtenir des informations sur les commandes du bot"
        this.usage = "help"
        this.exemple = "help"
    }

    execute(message, args) {
        if(args[1] == undefined) {
            message.channel.send("Commande invalide, /suggestion <votre suggestion>")
            return;
        } else {
            const embed = new MessageEmbed().setColor('#de2414').setAuthor(`${message.author.username}#${message.author.discriminator}`)
                .setDescription(message.content.replace(`${config.prefix}suggestion `, ''));
            config.channels.suggestions.send(embed)
        }
    }
}

module.exports = Suggestion