/* eslint consistent-return: "off" */
const config = require('config/config');
const { MessageEmbed } = require('discord.js');
const { Commands } = require('../setup');

function commandeHandler(message) {
  /* eslint-disable-line max-len */
  if (message.content.toLowerCase().slice(0, 1) !== config.prefix) return;
  const args = message.content.toLowerCase().split(' ');
  args[0] = args[0].slice(1);
  const cmd = Commands.find((command) => command.name === args[0] || command.alias.includes(args[0]));
  if (!cmd) return message.channel.send(`La commande n'existe pas. Faites la commande \`${config.prefix}help\` pour voir les commandes disponibles`);

  if (!message.member.roles.cache.some((role) => cmd.requiredRoles.includes(role) || cmd.requiredRoles.includes(role.name) || cmd.requiredRoles.includes(role.id))) { /* eslint max-len: "off" */
    if (!message.member.hasPermission('ADMINISTRATOR')) {
      return message.channel.send("Désolé mais vous n'avez pas la permission de faire cette commande");
    }
  }

  try {
    cmd.execute(message, args);
  } catch (err) {
    console.log(err);
  }
}

function suggestions(message) {
  if (message.deletable) message.delete().catch((e) => console.log(e));
  const embed = new MessageEmbed().setColor('#de2414')
    .setAuthor(`${message.author.username}#${message.author.discriminator}`) /* eslint no-shadow: "off" */
    .setDescription(message.content.replace(`${config.prefix}suggestion `, ''));
  config.channels.suggestions.send(embed).then((message) => {
    message.react('✅').catch((e) => console.log(e));
    message.react('<:Neutral:785984262523977768>').catch((e) => console.log(e));
    message.react('❌').catch((e) => console.log(e));
  });
}
const date = new Date();
const mois = new Intl.DateTimeFormat('fr-FR', { month: '2-digit' }).format(date);
function log(msg) {
  const guild = msg.client.guilds.cache.get(config.servers.log.id);
  const logChannel = guild.channels.cache.find((r) => r.name === msg.channel.name);

  if (msg.author.bot) return;
  if (!logChannel) return console.log(`Aucun salon de logs pour le salon ${msg.channel.name}`);
  const embed = new MessageEmbed().setAuthor(`${msg.author.tag}`)
    .setDescription(msg.content);
  embed.setFooter(`${(date.getDate() < 10 ? '0' : '') + date.getDate()}/${mois}/${date.getFullYear()}`);
  if (msg.attachments.size > 0) {
    let attachsLink;
    msg.attachments.forEach((attachment) => {
      attachsLink = `${attachment.url}\n`;
    });
    embed.addField('Fichier(s) intégré(s) au message', attachsLink);
  }
  return logChannel.send(embed);
}

module.exports.init = (message) => {
  log(message);
  if (message.channel.id === config.channels.suggestions.id) suggestions(message);
  if (message.channel.id === config.channels.presentation.id) message.react('✅');
  commandeHandler(message);
};
