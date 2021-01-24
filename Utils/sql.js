/*
const mysql = require("mysql")
const config = require("config/config")
let sql = require("../config/login").sql
let db = mysql.createConnection({
    host: sql.host,
    user: sql.user,
    password: sql.password,
    database: sql.database,
    supportBigNumbers : true
})

module.exports.sanction = async (sanction_type, moderator_id, user_id, date_expiration, reason) => {
    // eslint-disable max-len
    sql = `INSERT INTO sanctions (sanction_type, moderator_id, user_id, date, date_expiration, reason)
    VALUES (${sanction_type}, ${moderator_id}, ${user_id}, ${Date.now()}, ${Date.now() + date_expiration}, ${db.escape(reason)});`
    db.query(sql, function(error) {if (error) throw error})
}

module.exports.checkMute = async (members) => {
    let mute_role = config.roles.mute
    sql = `SELECT * FROM sanctions WHERE sanction_type = 2 AND date_expiration <= ${Date.now()}`
    db.query(sql, (err, result) => {
        if(err) throw err
        //console.log(result)
        result.forEach(sanction => {
            const member = members.get(sanction.user_id)
            if(member == undefined) return //console.log(sanction.user_id)
            try {
                if(member.roles.cache.get(config.roles.mute.id)) member.roles.delete(mute_role)
            } catch (e) {
                //console.log(`Impossible de demute l'utilisateur avec l'id ${member.id}`)
            }

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
                guild.members.unban(ban.user.id, "A purger sa peine")
            }).catch(e => {
                //return console.log(`Erreur: impossible de deban l'utilisateur avec l'id ${sanction.user_id} `)
            })
        });
    })
}

module.exports.db = db
*/
