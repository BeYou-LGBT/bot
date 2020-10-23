const fs = require('fs')
const Path = require('path')
const Commands = new Array();
let i = 0;
const db = require("./Utils/sql").db
const Categories = new Array()
function loadCommands(path) {
    fs.readdir(path, (erreur, fichiers) => {
        if (erreur) console.log(`Erreur lors de la lecture des commandes: ${erreur}`)
        fichiers.forEach(function (fichier) {
            if (fs.statSync(`${path}/${fichier}`).isDirectory()) return loadCommands(`${path}/${fichier}`)
            if (fichier.split(".").pop() == "js") {
                let cmd = require(`${path}/${fichier}`)
                cmd = new cmd()
                cmd.category = path.split("/").pop()
                Commands.push(cmd)
                i++
                if (!Categories.includes(cmd.category)) Categories.push(cmd.category)
            }
        })
    })
}

function SQLTestConnexion() {

    db.connect(function(err) {
        if (err) return console.error('error connecting: ' + err.stack)
        console.log("Connection à la base de donnée réussit, avec l'id de connexion : " + db.threadId);
    });
}
exports.loadCommands = loadCommands
exports.SQLTestConnexion = SQLTestConnexion
exports.Commands = Commands;
exports.Categories = Categories
