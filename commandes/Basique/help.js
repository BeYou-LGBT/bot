const { RichEmbed } = require('discord.js')
const fs = require('fs')
const path = require("path")
const config = require('../../config.json')
const Commande = require("../../Classes/Commande")
const Categories = new Map()
function loadCategories(loadPath) {
    fs.readdir(loadPath, (erreur, fichiers) => {
        if (erreur) console.log(`Erreur lors de la lecture des commandes pour l'aide: ${erreur}`)
        //console.log(fichiers[1])
        fichiers.forEach(async (fichier) => {
            if (fs.statSync(`${loadPath}/${fichier}`).isDirectory()) return loadCategories(`${loadPath}/${fichier}`)
            if (fichier.split(".").pop() == "js") {
                let parentFile = path.resolve(loadPath, fichier).toString().replace("\\" + fichier, "").split("\\").pop()
                if(Categories.get(parentFile) == undefined) Categories.set(parentFile, "")
                Categories.set(parentFile, Categories.get(parentFile) + " `" + fichier.slice(0, -3) + "`")

            }
        })

    })

}
loadCategories("./commandes")

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