module.exports.run = async (Client, message, args) => {
    if (message.member.voiceChannel == undefined){
        message.channel.send(`Vous n'êtes pas dans un salon vocal`)
        return;
    } else {
        try {
            message.member.voiceChannel.join()
            message.channel.send("J'ai rejoins votre salon vocal")
        } catch(e){
            console.log(e)
            message.channel.send('Erreur lors de la tentative de vous rejoindre en vocal :' + e)
        }
    }

}

module.exports.description = "Me faire rejoindre le salon vocal"