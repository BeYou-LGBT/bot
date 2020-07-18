module.exports.run = async (Client, message, args) => {

    if(message.member.voiceChannel == undefined) {
        message.channel.send("Vous n'êtes pas pas dans un salon vocal")
    }
    if (Client.voiceConnections == undefined){
        message.channel.send('je ne suis pas dans un salon vocal')
    }

    if (message.guild.voiceConnection.channel.connection.dispatcher.paused) {
        message.guild.voiceConnection.channel.connection.dispatcher.resume()
        message.channel.send('Le son a été relancé')
    } else {
        message.guild.voiceConnection.channel.connection.dispatcher.pause()
        message.channel.send('Le son a été mis en pause')
    }
}