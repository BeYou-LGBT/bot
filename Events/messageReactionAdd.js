const config = require('config/config');
const { MessageEmbed } = require('discord.js');
const { messageAfterVerif } = require('../commandes/Moderation/verification');

async function presentationReaction(reaction, user) {
  const member = await reaction.message.guild.members.fetch(reaction.message.author).catch(() => { });
  const validator = await reaction.message.guild.members.fetch(user).catch(() => { });
  if (member === undefined || validator === undefined) return;
  if (reaction.emoji.name !== '✅') return;
  if (!validator.roles.cache.find((r) => r.id === config.roles.staff.id || r.id === config.roles.stagiaire.id)) return;
  if (member.roles.cache.has(config.roles.communaute.id)) return; // Si la personne est déjà validé

  // Actions après vérifications
  await member.roles.add(config.roles.communaute);
  reaction.message.channel.send(`Tu viens de valider ${member}`).then((msg) => {
    if (msg !== undefined && msg.deletable) setTimeout(() => msg.delete(), 10000);
  });
  const embed = new MessageEmbed();
  embed.setTitle(`${member.user.tag} a été validé`);
  embed.setDescription(`Validé par ${validator.user.tag}`);
  embed.setColor('#000000');
  config.channels.log.send(embed);
  return config.channels['general-1'].send(messageAfterVerif.replace('(membre)', `<@${member.id}>`));
}

function init(reaction, user) {
  if (user.bot) return;
  if (reaction.message.channel.id === config.channels.presentation.id) presentationReaction(reaction, user);
}

exports.init = init;
