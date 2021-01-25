const Commande = require('Classes/Commande');
const { MessageEmbed } = require('discord.js');
const config = require('config/config');

const messageAfterVerif = 'Bienvenue (membre) ! <:grenouilleLGBT:553325426643173376> \nPour choisir tes rôles, va voir dans <#563715739920498703> ,'
    + 'si tu as des questions n\'hésites pas à en poser au staff dans <#576789044474806281> , mais pour avoir toutes les infos, fais la commande'
    + '`!help` ^^'
    + '\nNous te recommandons de mettre ton/tes pronoms dans ton nom sur le serveur';
const embed = new MessageEmbed();
class Verification extends Commande {
  constructor() {
    super();
    this.name = 'vérification';
    this.description = "Valider la présentation d'entrée d'un membre";
    this.usage = 'validation @lapersonne';
    this.exemple = 'v @WeeskyBDW#6172';
    this.alias = ['v', 'verif', 'vérif'];
    this.requiredRoles = [config.roles.staff, config.roles.stagiaire];
  }

  execute(message) {
    if (!message.mentions.members.first()) return message.channel.send('Tu dois préciser une personne à valider en la mentionnant');
    if (message.mentions.members.first().roles.cache.get(config.roles.communaute.id)) return message.channel.send('Ce membre est déjà validé');

    // actions
    message.mentions.members.first().roles.add(config.roles.communaute);
    message.channel.send(`Tu viens de valider <@${message.mentions.members.first().id}>`);
    embed.setTitle(`${message.mentions.members.first().user.username}#${message.mentions.members.first().user.discriminator} a été validé`);
    embed.setDescription(`Validé par ${message.member.nickname}`);
    embed.setColor('#000000');
    config.channels.log.send(embed);
    return config.channels['general-1'].send(messageAfterVerif.replace('(membre)', `<@${message.mentions.members.first().id}>`));
  }
}

module.exports = Verification;
module.exports.messageAfterVerif = messageAfterVerif;
