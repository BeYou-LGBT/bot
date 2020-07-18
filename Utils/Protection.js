const config = require('../config.json');
const lastmessage = new Map();
const msgstimer = new Map();
const Client = require('../index.js').Client
/*const Modclass = require('./Utils/Moderation.js')
const Moderation = new Modclass()*/
module.exports.init = function init(members) {
    members.forEach(function (member) {
        if (lastmessage.get(member.id) == undefined) {
            lastmessage.set(member.id, "aucun anciens messages");
        }

        if (msgstimer.get(member.id) == undefined) {
            msgstimer.set(member.id, 0);
        }
    })
}

module.exports.antipub = async (message) => {
    if (message.member.roles.has(config.staff_role)) return;
    message.content.split(' ').forEach(function (arg) {
        if (arg.includes('https://discord.gg')) {
            const invitecode = arg.replace('https://discord.gg/', '').substring(0, 6).replace(/</g, '').replace(/>/g, '')
            message.guild.fetchInvites().then(invites => {
                if (!invites.has(invitecode)) {
                    if(message.deletable) message.delete().catch(e => message.channel.send(`<@&415559211838341121> <@&415558441361211405> <@${message.author.id}> à envoyé un lien vers un discord que je n'ai pas pu supprimer`))
                    //Moderation.warn(message.member);
                    return;
                }
            })
        }
    })
}
module.exports.antispam = async (message) => {
    //AntiSpam pur eviter le spam de mêmes messages
    try {
        if (message.content == lastmessage.get(message.author.id)) {
            if(message.deletable) message.delete().catch(err => console.log(err))
            //warn(message.member);
            message.reply(' Spam pas !');
            return;
        } else {
            lastmessage.set(message.author.id, message.content)
        }
    } catch (e) {
        console.log('e : ' + e)
    }
    //AntiSpam pour éviter que l'utilisateur envoi trop de messages en peu de temps
    const promise = new Promise(function () {
        //console.log(msgstimer.get(message.member.id))
        if (msgstimer.get(message.member.id) > 2) {
            //warn(message.member.id)
            msgstimer.set(message.member.id, 0)
            message.channel.fetchMessages({limit: 4}).then(messages => message.channel.bulkDelete(messages.filter(msg => msg.author.id === message.author.id))).then()

            return;
        } else {
            msgstimer.set(message.member.id, msgstimer.get(message.member.id) + 1)
        }


    })
    promise.then(setTimeout(function () {
        msgstimer.set(message.member.id, 0)
    }, 5000))
}

module.exports.antispammentions = async (message) => {
    if (message.mentions.everyone && !message.member.roles.has(config.staff_role)) return message.delete().catch(err => console.log(`Erreur lors de la suppression d'un message tagggant everyone: ${err}`)).then(message.channel.send(message.author + " a tenté de tag everyone ou here"))
    //AntiSpam pour éviter que l'ont puisse spam mention rôles
    if (lastmessage.get(message.author.id).includes('<@&') && message.content.includes('<@&')) {
            if(message.deletable) message.delete().catch(err => console.log(err))
            //warn(message.member)
            message.reply(' Doucement sur les mentions !');
        }

}



