let str = ""
const { RichEmbed } = require('discord.js')
const fs = require('fs')
const config = require('../../config.json')
module.exports.run = async (Client, message, args)  => {
    let commandes = require('../../index.js')
    let embed = new RichEmbed().setAuthor("Commande d'aide").setDescription(`Préfix: ${config.prefix}`)
    commandes.forEach(function(file) {
        const cmd = file.replace('./commandes_old', '..')
        let commande = require(cmd)
        if (commande.description == undefined) commande.description = 'Aucune description défini'
        str = cmd.split('/')
        embed.addField(str[str.length - 1].replace('.js', ''), commande.description)
    })
    embed.setFooter(`Executé par ${message.author.username}#${message.author.discriminator}`)
    message.channel.send(embed)
}