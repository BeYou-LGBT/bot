const fs = require('fs');

const Commands = [];
const { db } = require('./Utils/sql');

const Categories = [];
function loadCommands(path) {
  fs.readdir(path, (erreur, fichiers) => {
    if (erreur) console.log(`Erreur lors de la lecture des commandes: ${erreur}`);
    fichiers.forEach((fichier) => {
      if (fs.statSync(`${path}/${fichier}`).isDirectory()) return loadCommands(`${path}/${fichier}`);
      if (fichier.split('.').pop() === 'js') {
        const CmdRequire = require(`${path}/${fichier}`); // eslint-disable-line import/no-dynamic-require, global-require
        const cmd = new CmdRequire();
        cmd.category = path.split('/').pop();
        Commands.push(cmd);
        if (!Categories.includes(cmd.category)) Categories.push(cmd.category);
      }
    });
  });
}

function SQLTestConnexion() {
  db.connect((err) => {
    if (err) return console.error(`error connecting: ${err.stack}`);
    console.log(`Connection à la base de donnée réussit, avec l'id de connexion : ${db.threadId}`);
  });
}
exports.loadCommands = loadCommands;
exports.SQLTestConnexion = SQLTestConnexion;
exports.Commands = Commands;
exports.Categories = Categories;
