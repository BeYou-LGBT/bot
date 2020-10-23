const env = process.argv[2] ? process.argv[2] : "dev"

const config = env == "prod" ? require("config/config.json") : require("config/config.dev")

function init(client) {
    config.servers.beyou = client.guilds.cache.get(config.servers.beyou)
    config.servers.log = client.guilds.cache.get(config.servers.log)
    for (let i in config.channels) {
        config.channels[i] = client.channels.cache.find(channel => channel.name == config.channels[i] || channel.id == config.channels[i])
        if (!config.channels[i]) console.log(`Impossible de récupéré ${i} !`)
    }


    for (let i in config.roles) {
        config.roles[i] = config.servers.beyou.roles.cache.find(role => role.name == config.roles[i] || role.id == config.roles[i])
        if (!config.roles[i]) console.log(`Impossible de récupéré ${i} !`)
    }
}
module.exports = config
module.exports.init = init