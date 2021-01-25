/* eslint-disable */
// TODO : Retirer le eslint-disable quand la classe sera refaite
/*
    Code venant du repo github de Swan
    https://github.com/Skript-MC/Swan/blob/master/src/utils/padNumber.js
    https://github.com/Skript-MC/Swan/blob/master/src/utils/toTimespan.js
 */
function padNumber(x) {
  return (x.toString().length < 2 ? `0${x}` : x).toString();
}

/*
Utilisation :

const timestamp
const votrevar = timestamp();
a = Année
mo = Mois
s = semaine
j = jour
h = heure
m = minute

Nota: les lettres peuvent être en majuscule, ça sera pareil (le code fait pas la différence entre minuscule et majuscule)

 */
module.exports.toTimestamp = function toTimestamp(str) {
  str = String(str);

  if (str == 'def') return 128563200 * 1000;
  const regexes = new Map();
  regexes.set(/a/i, 29030400);
  regexes.set(/mo/i, 2419200);
  regexes.set(/sem/i, 604800);
  regexes.set(/j/i, 86400);
  regexes.set(/h/i, 3600);
  regexes.set(/min/i, 60);
  regexes.set(/m/i, 60);
  regexes.set(/s/i, 1);

  str.replace(/\s*/g, '');
  for (const [regex, value] of regexes) {
    str = str.replace(regex, `*${value}+`);
  }

  // On regarde s'il reste des lettres
  if (str.match(/[a-zA-Z]+/g)) return -1;

  let result;
  try {
    result = eval(str.slice(0, -1));
  } catch (e) {
    result = -1;
  }
  return result * 1000;
};

module.exports.secondToDuration = function secondToDuration(ms) {
  if (ms === -1) return 'Définitif';

  const day = Math.floor(ms / (24 * 3600));
  ms %= 86400; // 24 * 3600
  const hour = Math.floor(ms / 3600);
  ms %= 3600;
  const minutes = Math.floor(ms / 60);
  ms %= 60;
  const seconds = Math.floor(ms);

  const results = [];
  if (day !== 0) results.push(`${day} jour${day > 1 ? 's' : ''}`);
  if (hour !== 0) results.push(`${hour} heure${hour > 1 ? 's' : ''}`);
  if (minutes !== 0) results.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
  if (seconds !== 0) results.push(`${seconds} seconde${seconds > 1 ? 's' : ''}`);
  return results.join(', ');
};

module.exports.formatDate = function formatDate(d) {
  const date = new Date(d);
  const now = new Date(Date.now());
  // Même jour, mois, année
  if (date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
    return `aujourd'hui à ${padNumber(date.getHours())}h${padNumber(date.getMinutes())}'${padNumber(date.getSeconds())}`;
  }
  // Jours suivants, même mois, même année (pour éviter que 04/05/2015 soit "demain" quand on est le 03/08/2019)
  if (date.getDate() - 1 === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
    return `demain à ${padNumber(date.getHours())}h${padNumber(date.getMinutes())}'${padNumber(date.getSeconds())}`;
  }
  if (date.getDate() - 2 === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
    return `après-demain à ${padNumber(date.getHours())}h${padNumber(date.getMinutes())}'${padNumber(date.getSeconds())}`;
  }
  // Jours précédents, même mois, même année (pour éviter que 04/05/2015 soit "hier" quand on est le 05/08/2019)
  if (date.getDate() + 1 === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
    return `hier à ${padNumber(date.getHours())}h${padNumber(date.getMinutes())}'${padNumber(date.getSeconds())}`;
  }
  if (date.getDate() + 2 === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
    return `avant-hier à ${padNumber(date.getHours())}h${padNumber(date.getMinutes())}'${padNumber(date.getSeconds())}`;
  }
  // Date par défaut.
  return `le ${padNumber(date.getDate())}/${padNumber(date.getMonth() + 1)}/${padNumber(date.getFullYear())} à ${padNumber(date.getHours())}h${padNumber(date.getMinutes())}'${padNumber(date.getSeconds())}`;
};
