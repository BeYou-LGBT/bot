const { RichEmbed } = require('discord.js')
module.exports.run = async (client, message, args) => {
    if (args[1] == undefined)  {
        message.channel.send("commade invalide, /wiki <recherche>");
    } else {
        const requete = require('request');
        console.log(args + " " + args.toString().replace(/,/g, " ").slice(5));
        const requetelink = `https://fr.wikipedia.org/w/api.php?action=opensearch&search=${args.toString().slice(6)}&limit=1&namespace=0&format=json`
        console.log(requetelink)
        requete(requetelink, function (erreur, reponse, body){
            if (!erreur == null) console.error((`Erreur dans l'execution de la commande : ${erreur}`));
            if (!reponse.statusCode == 200 || !reponse.statusCode == 301 || !reponse.statusCode == 302) return message.channel.send("Erreur lors de l'execution de la reqûet ")
            const json = JSON.parse(body)
            console.log(json[1] + " " + json[2]);
            if (json[1] == '')  {
                console.log("you'r mome");
                return message.channel.send('Aucun article trouvé sur Wikipédia à propos de votre recherche');
            } else {
                if (json[2] == '') json[2] = 'Aucune description trouvé';
                if (json[3] == '') json[3] = `https://www.google.fr/search?&q=${args.toString().replace(/,/g, " ").slice(5)}`
                const embed = new RichEmbed().setTitle(`Article Wikipédia sur ${json[1].toString()}`).setDescription(json[2]).setURL(json[3].toString());
                message.channel.send(embed);
            }
            /*Object.keys(json.query.pages).forEach(function (f) {
                console.log(json.query.pages[f].extract)
                console.log(Object.getPrototypeOf(f))
                const embed = new RichEmbed().setTitle(`Article Wikipédia consernant ${json.query.pages[f].title}`)
                    .setDescription(json.query.pages[f].extract)
                message.channel.send(embed)
            })*/





        })
    }
}