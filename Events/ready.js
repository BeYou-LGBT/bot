const sql = require("../Utils/sql")
const config = require("config/config")
module.exports.init = (Client) => {
    console.log("Chargement du bot terminé");
    Client.user.setActivity(`${config.prefix}help`)
    checkSanctions()
}

function checkSanctions() {
    if (!sql.db) return
    setInterval(() => {
        sql.checkMute(config.server).catch(e => { console.log(`Impossible d'unmute ${member} \n${e}`) })
        sql.checkBan(config.server).catch(e => console.log("Impossible de deban " + ban.user.id))

    }, 5000)
}
