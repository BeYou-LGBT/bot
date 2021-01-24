/* eslint consistent-return: "off" */
const { MessageEmbed } = require('discord.js');
const config = require('config/config');

const date = new Date();
const month = new Intl.DateTimeFormat('fr-FR', { month: '2-digit' }).format(date);
module.exports.log = (oldMsg, newMsg) => {
  const guild = oldMsg.client.guilds.cache.get(config.servers.log.id);
  const logChannel = guild.channels.cache.find((r) => r.name === oldMsg.channel.name);

  if (oldMsg.author.bot) return;
  if (!logChannel) return console.log(`Aucun salon de logs pour le salon ${newMsg.channel.name}`);
  const embed = new MessageEmbed().setAuthor(`${oldMsg.author.tag}`)
    .addField('Message avant modification', oldMsg.content)
    .addField('Message modifié', newMsg.content);
  embed.setFooter(`${(date.getDate() < 10 ? '0' : '') + date.getDate()}/${month}/${date.getFullYear()}`);
  if (oldMsg.attachments.size > 0) {
    let attachsLink;
    oldMsg.attachments.forEach((attachment) => {
      attachsLink = `${attachment.url}\n`;
    });
    embed.addField('Fichier(s) intégré(s) au message', attachsLink);
  }
  return logChannel.send(embed);
};
