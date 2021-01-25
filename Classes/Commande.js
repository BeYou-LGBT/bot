/* eslint no-unused-vars: "off" */
class Commande {
  constructor() {
    this.name = 'Nom par défaut';

    this.description = 'Description par défaut';

    this.usage = 'defaut <mention> <message>';

    this.exemple = 'defaut WeeskyBDW#6172 test';

    this.alias = [];

    this.category = undefined;

    this.requiredRoles = ['Visiteur'];

    this.forbidenChannels = [];
  }

  execute(message, args) {}
}

module.exports = Commande;
