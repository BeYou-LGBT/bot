const Commande = require("../Classes/Commande")
class Choix extends Commande {

    constructor() {
        super();
        this.name = "choix"
        this.description = "Demander au bot de faire un choix pour soi"
        this.usage = "choix <choix 1> ou <choix 2>"
        this.exemple = "choix Manger ou Dormir"
    }
    execute(message, args) {
        if (args[1] == undefined){
            message.channel.send(`Commande incorrecte, /choix <texte> ou <texte>`)
            return;
        }
        const choix = message.content.toLowerCase().split('ou')
        choix[0] = choix[0].toLowerCase().replace('/choix ', '')
        message.channel.send(`Je choisis: ` + choix[Math.floor(Math.random() * choix.length)])

    }
}

module.exports.Choix = Choix





/*

 */