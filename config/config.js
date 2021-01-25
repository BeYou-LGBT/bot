/* eslint-disable no-restricted-syntax, guard-for-in */
const env = process.argv[2] ? process.argv[2] : 'prod';

const config = env === 'prod' ? require('config/config.json') : require('config/config.dev'); /* eslint import/no-extraneous-dependencies: "off" */

function init(client) {
  config.servers.beyou = client.guilds.cache.get(config.servers.beyou);
  config.servers.log = client.guilds.cache.get(config.servers.log);
  for (const c in config.channels) {
    config.channels[c] = client.channels.cache.find((channel) => channel.name === config.channels[c] || channel.id === config.channels[c]);
    if (!config.channels[c]) console.log(`Impossible de récupéré ${c} !`);
  }

  for (const r in config.roles) {
    config.roles[r] = config.servers.beyou.roles.cache.find((role) => role.name === config.roles[r] || role.id === config.roles[r]);
    if (!config.roles[r]) console.log(`Impossible de récupéré ${r} !`);
  }
}
module.exports = config;
module.exports.init = init;
