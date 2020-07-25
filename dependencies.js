module.exports.config = process.env.NODE_ENV ? require("./config/config.dev") : require("./config/config.prod")

module.exports.Commande = require("./Classes/Commande")

module.exports.RichEmbed = require("discord.js").RichEmbed