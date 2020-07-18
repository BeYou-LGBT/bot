const Client = require("../index").Client;

class Commande {

    constructor() {

        this.name = "Nom par défaut";

        this.description = "Description par défaut";

        this.usage = "defaut <mention> <message>";

        this.exemple = "defaut WeeskyBDW#6172 test"

        this.requiredRole = ["Visiteur"]

        this.forbidenChannels = []
    }

    execute(message, args) {}
}

module.exports.Commande = Commande;

