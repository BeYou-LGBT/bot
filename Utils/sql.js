const mysql = require("mysql")
const config = require("../dependencies").config
let db = mysql.createConnection({
    host: config.sql.host,
    user: config.sql.user,
    password: config.sql.password,
    database: config.sql.database,
    supportBigNumbers : true
})
let sql


module.exports.SQLTestConnexion = function SQLTestConnexion() {

    db.connect(function(err) {
        if (err) return console.error('error connecting: ' + err.stack)
        console.log("Connection à la base de donnée réussit, avec l'id de connexion : " + db.threadId);
    });
}

module.exports.sanction = async (sanction_type, moderator_id, user_id, date_expiration, reason) => {
    sql = `INSERT INTO sanctions (sanction_type, moderator_id, user_id, date, date_expiration, reason) VALUES (${sanction_type}, ${moderator_id}, ${user_id}, ${Date.now()}, ${Date.now() + date_expiration}, ${db.escape(reason)});`
    db.query(sql, function(error) {if (error) throw error})
}

module.exports.checkMute = async (members) => {
    let mute_role = this.message.client.guilds.get(config.server).roles.find(r => r.name === config.roles.mute);
    sql = `SELECT * FROM sanctions WHERE sanction_type = 2 AND date_expiration <= ${Date.now()}`
    db.query(sql, (err, result) => {
        if(err) throw err
        //console.log(result)
        result.forEach(sanction => {
            member = members.get(sanction.user_id)
            if(member == undefined) return //console.log(sanction.user_id)
            if(member.roles.get(config.roles.mute)) member.removeRole(mute_role).catch(e => { throw(e) })
        });
    })
}

module.exports.checkBan = async (guild) => {
    sql = `SELECT * FROM sanctions WHERE sanction_type = 4 AND date_expiration <= ${Date.now()}`
    db.query(sql, (err, result) => {
        if(err) throw err
        //console.log(result)
        result.forEach(sanction => {
            
            guild.fetchBan(sanction.user_id).then(ban => {
                //console.log(sanction.user_id)
                console.log(ban.user.id) 
                if(ban == undefined) return //console.log(sanction.user_id)
                if(ban.user)
                guild.unban(ban.user.id, "A purger sa peine")
            })
        });
    })
}