const { RichEmbed } = require('discord.js')
const config = require('../../config.json')
module.exports.run = async (Client, message, args) => {
    if(message.channel.type == 'dm') return;
    if (message.deletable) message.delete().catch(erreur => console.log(erreur))
    let staffrole = message.guild.roles.find(r => r.name === config.staffrole);
    if(message.member.roles.has(staffrole.id) == false) return message.reply("Vous n'avez pas la permission de faire cette commande");
    if(args[1] == undefined) {
        return message.channel.send("Commande invalide, ${config.prefix}clear <nombre>")
        
    } else {
        try {
            message.delete()
            message.channel.fetchMessages({limit: parseInt(args[1])}).then(messages => message.channel.bulkDelete(messages)).then()
            message.channel.send(args[1] + ' message(s) supprimé(s)').then(msg => setTimeout(function() {
                msg.delete()
            }, 3000))
            let embed = new RichEmbed().setAuthor(`L'utilisateur ${message.author.tag} a supprimé ${args[1]} messages avec la commande ${config.prefix}clear`, `https://discordapp.com/channels/499597838636810251/580852810439196673/588397408392839180`)
            message.client.channels.get(config.log_channel).send(embed)
        } catch(err){
            console.log(err)
        }
    }


}

module.exports.description = "Koala"