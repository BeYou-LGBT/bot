/* eslint no-unused-vars: "off" */
const config = require('config/config');
const sql = require('../Utils/sql');

module.exports.init = (Client) => {
  console.log('Chargement du bot terminé');
  Client.user.setActivity(`${config.prefix}help`);
  config.channels.presentation.messages.fetch({ limit: 50 });
  // checkSanctions()
};

/*
function checkSanctions() {

  if (!sql.db) return;
  setInterval(() => {
    sql.checkMute(config.servers.beyou).catch((e) => { console.log(`Impossible d'unmute ${member} \n${e}`); });
    sql.checkBan(config.servers.beyou).catch((e) => console.log(`Impossible de deban ${ban.user.id}`));
  }, 5000);
}
*/
