const config = require("config/config")
const { MessageEmbed } = require("discord.js")

module.exports.init = (message) => {
    if (message.channel.id === config.channels.suggestions.id) suggestions(message)
    commandeHandler(message)
}
function commandeHandler(message) {
    if(message.content.toLowerCase().slice(0,1) !== config.prefix) return;
    let args = message.content.toLowerCase().split(' ');
    Commandes.forEach(function (commande) {
        let cmdsplit = commande.split('/').pop()
        if (cmdsplit == args[0].replace(config.prefix, '') + '.js') {
            //message.channel.send('Commande existante');
            try {
                let cmdfile = require(commande)
                const cmd = new cmdfile()
                cmd.execute(message, args)
            } catch (err) {
                console.log(err)
            }
        }
    })
}
function suggestions(message)  {
    if (message.deletable) message.delete().catch(e => console.log(e))
    const embed = new MessageEmbed().setColor('#de2414').setAuthor(`${message.author.username}#${message.author.discriminator}`)
        .setDescription(message.content.replace(`${config.prefix}suggestion `, ''));
    return config.channels.suggestions.send(embed);
}
