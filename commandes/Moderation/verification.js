const Commande = require("Classes/Commande")
const MessageEmbed = require("discord.js").MessageEmbed
const config = require("config/config")
const message_after_verif = `Bienvenue (membre) ! <:grenouilleLGBT:553325426643173376> \nPour choisir tes rôles, va voir dans <#${config.role_channel}> ,` +
    `si tu as des questions n'hésites pas à en poser au staff dans <#${config.aide_question}> , mais pour avoir toutes les infos, fais la commande` +
    "`!help` ^^`" + "\nNous te recommandons de mettre ton/tes pronoms dans ton nom sur le serveur"
const embed = new MessageEmbed()
class Verification extends Commande {

    constructor() {
        super();
        this.name = "vérification"
        this.description = "Valider la présentation d'entrée d'un membre"
        this.usage = "validation @lapersonne"
        this.exemple = "v @WeeskyBDW#6172"
        this.alias = ["v", "verif", "vérif"]
        this.requiredRoles = config.roles.staff
    }
    execute(message, args) {
        if(message.mentions.members.first() == undefined) return message.channel.send("Tu dois préciser une personne à valider en la mentionnant");
        if(message.mentions.members.first().roles.cache.get(config.roles.communaute.id)) return message.channel.send("Ce membre est déjà validé");

        //actions
        message.mentions.members.first().roles.add(config.roles.communaute);
        message.channel.send(`Tu viens de valider <@${message.mentions.members.first().id}>`)
        embed.setTitle(`${message.mentions.members.first().user.username}#${message.mentions.members.first().user.discriminator} a été validé`)
        embed.setDescription(`Validé par ${message.member.nickname}`);
        embed.setColor("#000000")
        config.channels.log.send(embed);
        return config.channels["general-1"].send(message_after_verif.replace("(membre)", `<@${message.mentions.members.first().id}>`))
    }
}

module.exports = Verification