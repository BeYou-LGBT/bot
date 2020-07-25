const { RichEmbed } = require('discord.js')
const Categories = require("../../index").Categories
const config = require('../../config.json')
const Commande = require("../../Classes/Commande")
class Help extends Commande {
    constructor() {
        super()
        this.name = "help"
        this.description = "Obtenir des informations sur les commandes du bot"
        this.usage = "help"
        this.exemple = "help"
    }

    async execute(message, args) {

        setTimeout(() => {
            let embed = new RichEmbed().setAuthor("Commande d'aide").setDescription(`Préfix: ${config.prefix}`)
            embed.setFooter(`Executé par ${message.author.username}#${message.author.discriminator}`)
            Array.from(Categories.keys()).forEach(key => {
                embed.addField(key, Categories.get(key))
            })
            message.channel.send(embed)
        }, 500)

    }
}

module.exports = Help