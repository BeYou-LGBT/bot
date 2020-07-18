const config = require("../../config.json")
const { RichEmbed } = require("discord.js")
module.exports.run = async (bot, message, args) => {
    if (message.deletable) message.delete().catch(erreur => console.log(erreur))
    if(message.member.hasPermission("BAN_MEMBERS") == false) {
        message.channel.send("Vous n'avez pas la permission de débannir un utilisateur")
        return;
    }

    if(args[1] == undefined || args[1].length !== 18){
        message.channel.send(`Commande invalide, ${config.prefix}unban <id de l'utilisateur> raison`)
        return;
    }
    let user = await message.client.fetchUser(args[1])

    try {
        await message.guild.fetchBan(user)
        message.guild.unban(user)
        message.channel.send(`Utilisateur ${user.username}#${user.discriminator} débanni`)
        let embed = new RichEmbed().setAuthor(`L'utilisateur ${user.username}#${user.discriminator} a été débanni du serveur`, `https://i.imgur.com/BdIyZlB.png`)
        embed.addField("Modérateur qui a retiré la sanction", `${message.author.username}#${message.author.discriminator}`)
        message.client.channels.get(config.log_channel).send(embed)
        return;
    } catch(e) {
        message.channel.send("Utilisateur non banni")
        console.log(e)
        return;
    }
}

module.exports.help = {
    name: "unban"
}