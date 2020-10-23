const { MessageEmbed } = require('discord.js')
const setup = require("../../setup")
const Commandes = setup.Commands
const Categories = setup.Categories
const config = require("config/config")
const Commande = require('Classes/Commande')
const fs = require("fs")
const path = "../"
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
            let embed = new MessageEmbed().setAuthor("Commande d'aide").setDescription(`Préfix: ${config.prefix}`)
            embed.setFooter(`Executé par ${message.author.username}#${message.author.discriminator}`)
            Categories.forEach(category => {
                const commands = Commandes.filter(command => command.category == category)
                let name = ""
                commands.forEach(cmd => {
                    if (!name.includes(cmd.name)) name = name + cmd.name + " "
                })
                embed.addField(category, name)
            })
            message.channel.send(embed)
        }, 500)

    }
}

module.exports = Help