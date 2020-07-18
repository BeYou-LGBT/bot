module.exports.run = async (client, message, args) => {
    if (message.author.id !== '173542833364533249') return;
    if(message.deletable) message.delete().catch(err => console.log(err))
    let str = ""
    message.guild.roles.forEach(function (role) {
        str = str + `${role.name} : ${role.id} \n`
    })
    message.channel.send("```" + str + "```")
}

module.exports.description = "Commande de dev, utilisable que par WeeskyBDW"