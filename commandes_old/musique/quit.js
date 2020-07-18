module.exports.run = async (Client, message, args) => {
    if(message.member.voiceChannel == undefined) {
        message.channel.send("Vous n'êtes pas pas dans un salon vocal")
    }
    if (Client.voiceConnections == undefined){
        message.channel.send('je ne suis pas dans un salon vocal')
    } else {
        message.member.voiceChannel.connection.dispatcher.end()
        message.member.voiceChannel.leave()
    }
}

module.exports.description = "Me faire quitter le salon vocal"