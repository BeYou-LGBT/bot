const env = process.argv[2] ? process.argv[2] : "dev"

const config = env == "prod" ? require("config/config.prod") : require("config/config.dev")

function init(client) {
    config.server = client.guilds.cache.get(config.server)
    for (let i in config.channels) {
        config.channels[i] = client.channels.cache.get(config.channels[i])
        if (!config.channels[i]) console.log(`Impossible de récupéré ${i} !`)
    }


    for (let i in config.roles) {
        config.roles[i] = config.server.roles.cache.get(config.roles[i])
        if (!config.roles[i]) console.log(`Impossible de récupéré ${i} !`)
    }
}
module.exports = config
module.exports.init = init