const config = require("config/config")
const { MessageEmbed } = require("discord.js")
const Commands = require("../setup").Commands
module.exports.init = (message) => {
    if (message.channel.id === config.channels.suggestions.id) suggestions(message)
    commandeHandler(message)
}

function commandeHandler(message) {
    if (message.content.toLowerCase().slice(0,1) !== config.prefix) return;
    let args = message.content.toLowerCase().split(' ');
    args[0] = args[0].slice(1)
    let cmd = Commands.find(command => command.name == args[0] || command.alias.includes(args[0]))
    if (!cmd) return message.channel.send(`La commande n'existe pas. Faites la commande \`${config.prefix}help\` pour voir les commandes disponibles`)

    if (!message.member.roles.cache.some(role => cmd.requiredRoles.includes(role) || cmd.requiredRoles.includes(role.name) || cmd.requiredRoles.includes(role.id)))
    {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Désolé mais vous n'avez pas la permission de faire cette commande")
    }

    try {
        cmd.execute(message, args)
    } catch (err) {
        console.log(err)
    }
}



function suggestions(message)  {
    if (message.deletable) message.delete().catch(e => console.log(e))
    const embed = new MessageEmbed().setColor('#de2414').setAuthor(`${message.author.username}#${message.author.discriminator}`)
        .setDescription(message.content.replace(`${config.prefix}suggestion `, ''));
    return config.channels.suggestions.send(embed);
}
