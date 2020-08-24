const config = require('config/config')
const timespan = require('../Utils/timespan.js')
const { MessageEmbed } = require('discord.js')
class ModerationVerification {

    constructor(moderator, bandit, msg) {
        this.moderator = moderator
        this.bandit = bandit
        this.message = msg
        if (moderator.id == bandit.id) return this.message.client.channels.cache.get(this.message.channel.id).send("Vous ne pouvez pas vous sanctionner vous-même")
        if(this.moderator.roles.has(config.roles.staff) === false || this.bandit.roles.cache.has(config.roles.staff) === false) return this.message.channel.send("Vous n'avez pas la permission de sanctionner cette personne")
     }

    isValid(sanction_type, cmd_syntax) {
        const args = this.message.content.split(" ")
        cmd_syntax = "Commande invalide, " + cmd_syntax
        if (args[1] == undefined || ((sanction_type == 2 || sanction_type == 4) )) return this.message.channel.send(cmd_syntax)

        if (args[2] == undefined) return this.message.channel.send(cmd_syntax)
        const time = timespan.toTimestamp(args[2])
        if (time == -1) return this.message.channel.send(cmd_syntax)


        if (bandit == undefined) return this.message.channel.send(cmd_syntax)
    }

    sendMessage(sanction_msg) {
        let embed = new MessageEmbed().setAuthor(`L'utilisateur ${this.bandit.user.username}#${this.bandit.user.discriminator} a été ${sanction_msg}`)
            .addField("Modérateur", `${this.moderator.user.username}#${this.moderator.user.discriminator}`)
            .addField("Raison", this.message.content.slice(5).replace(args[1], ''))
        this.message.client.channels.cache.get(config.channels.log).send(embed)
        this.message.channel.send(`L'utilisateur ${bandit.user.username}#${bandit.user.discriminator} a été ${sanction_msg} :white_check_mark:`)
        this.bandit.user.send(embed.setAuthor(`Vous avez été ${sanction_msg}`))
    }
    
    saveSanction(sanction_type) {
        try {
            sql.sanction(sanction_type, moderator.id, bandit.user.id, 128563200, `${this.message.content.slice(5).replace(args[1], '')}`)
            sendMessage('averti', this.msg)
        } catch(e){ throw e}
    }
}

module.exports = ModerationVerification