const tmi = require('tmi.js');
const Database = require('better-sqlite3');

// Configuration
const config = {
  BOT_USERNAME: process.env.JoyBoyBot,
  BOT_TOKEN: process.env.oauth:9w76c932djulze7uhrqdwjbk4d5fnn,
  CHANNEL: process.env.NeyLaBrise,
  STREAMER: process.env.NeyLaBrise
};

// Base de données
const db = new Database('joyboy.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS membres (
    username TEXT PRIMARY KEY,
    personnage TEXT,
    faction TEXT,
    niveau INTEGER
  )
`);

// Personnages par niveau
const personnages = {
  1: {
    'equipage': ['Usopp','Chopper','Carrot','Bartolomeo'],
    'bigmom': ['Perospero','Daifuku','Oven','Brulee','Montdor'],
    'empereurs': [],
    'grandscorsaires': [],
    'marine': ['Koby']
  },
  2: {
    'equipage': ['Nami','Robin','Franky','Brook','Vivi'],
    'bigmom': ['Smoothie','Cracker','Compote'],
    'empereurs': [],
    'grandscorsaires': ['Baggy','Kuma','Weevil'],
    'marine': ['Sengoku','Garp','Smoker']
  },
  3: {
    'equipage': ['Sanji','Jinbe','Yamato','Sabo','Rayleigh','Law'],
    'bigmom': ['Katakuri'],
    'empereurs': [],
    'grandscorsaires': ['Mihawk','Hancock','Doflamingo'],
    'marine': ['Fujitora','Ryokugyu','Aokiji','Kizaru']
  },
  4: {
    'equipage': ['Zoro'],
    'bigmom': [],
    'empereurs': ['Shanks','Kaido','BarbeBlanche','BarbeNoire'],
    'grandscorsaires': [],
    'marine': ['Akainu'],
    'special': ['GoldRoger']
  }
};

const paliers = { 1: 10, 2: 25, 3: 50, 4: 80 };

function trouverPersonnage(nom) {
  for (const [niveau, factions] of Object.entries(personnages)) {
    for (const [faction, liste] of Object.entries(factions)) {
      if (liste.includes(nom.toLowerCase())) {
        return { niveau: parseInt(niveau), faction };
      }
    }
  }
  return null;
}

function estPris(personnage) {
  const row = db.prepare('SELECT username FROM membres WHERE personnage = ?').get(personnage.toLowerCase());
  return row ? row.username : null;
}

// Client Twitch
const client = new tmi.Client({
  identity: {
    username: config.BOT_USERNAME,
    password: config.BOT_TOKEN
  },
  channels: [config.CHANNEL]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  if (self) return;
  const username = tags['display-name'];
  const msg = message.trim().toLowerCase();
  const isMod = tags.mod || username.toLowerCase() === config.STREAMER.toLowerCase();

  // !paliers
  if (msg === '!paliers') {
    client.say(channel, `⚓ Paliers One Piece | Niveau 1: 10 subs | Niveau 2: 25 subs | Niveau 3: 50 subs | Niveau 4: 80 subs | Tape !dispo pour voir les personnages disponibles !`);
    return;
  }

  // !dispo
  if (msg === '!dispo') {
    const pris = db.prepare('SELECT personnage FROM membres').all().map(r => r.personnage);
    let rep = '🏴‍☠️ Personnages disponibles | ';
    for (const [niveau, factions] of Object.entries(personnages)) {
      const tous = Object.values(factions).flat();
      const dispos = tous.filter(p => !pris.includes(p));
      if (dispos.length > 0) rep += `Niv${niveau}(${paliers[niveau]}subs): ${dispos.join(', ')} | `;
    }
    client.say(channel, rep);
    return;
  }

  // !monrole
  if (msg === '!monrole') {
    const row = db.prepare('SELECT * FROM membres WHERE username = ?').get(username.toLowerCase());
    if (row) {
      client.say(channel, `⚔️ ${username} est ${row.personnage} (${row.faction}) - Niveau ${row.niveau} !`);
    } else {
      client.say(channel, `${username} tu n'as pas encore de personnage ! Tape !dispo pour voir les disponibles.`);
    }
    return;
  }

  // !equipage
  if (msg.startsWith('!equipage')) {
    const faction = msg.split(' ')[1];
    if (!faction) {
      client.say(channel, 'Usage: !equipage [EquipageLuffy/BigMom/Empereurs/GrandsCorsaires/Marine]');
      return;
    }
    const membres = db.prepare('SELECT username, personnage FROM membres WHERE faction = ?').all(faction);
    if (membres.length === 0) {
      client.say(channel, `Aucun membre dans la faction ${faction} pour le moment !`);
    } else {
      const liste = membres.map(m => `${m.username}(${m.personnage})`).join(', ');
      client.say(channel, `🏴‍☠️ Faction ${faction}: ${liste}`);
    }
    return;
  }

  // !rejoindre
  if (msg.startsWith('!rejoindre')) {
    const personnage = msg.split(' ')[1];
    if (!personnage) {
      client.say(channel, `${username} tape !rejoindre [nom du personnage] !`);
      return;
    }
    const dejamembre = db.prepare('SELECT personnage FROM membres WHERE username = ?').get(username.toLowerCase());
    if (dejaembre) {
      client.say(channel, `${username} tu es déjà ${dejaembre.personnage}, le choix est définitif !`);
      return;
    }
    const info = trouverPersonnage(personnage);
    if (!info) {
      client.say(channel, `${username} ce personnage n'existe pas ! Tape !dispo pour voir la liste.`);
      return;
    }
    const dejaPris = estPris(personnage);
    if (dejaPris) {
      client.say(channel, `${username} ${personnage} est déjà pris par ${dejaPris} !`);
      return;
    }
    client.say(channel, `${username} veut rejoindre en tant que ${personnage} (Niveau ${info.niveau} - ${paliers[info.niveau]} subs requis). En attente de validation du streamer ! 🏴‍☠️`);
    return;
  }

  // !valider (mod seulement)
  if (msg.startsWith('!valider') && isMod) {
    const parts = msg.split(' ');
    const targetUser = parts[1];
    const personnage = parts[2];
    if (!targetUser || !personnage) {
      client.say(channel, 'Usage: !valider [username] [personnage]');
      return;
    }
    const info = trouverPersonnage(personnage);
    if (!info) {
      client.say(channel, `Personnage ${personnage} introuvable !`);
      return;
    }
    const dejaPris = estPris(personnage);
    if (dejaPris) {
      client.say(channel, `${personnage} est déjà pris par ${dejaPris} !`);
      return;
    }
    db.prepare('INSERT OR REPLACE INTO membres (username, personnage, faction, niveau) VALUES (?, ?, ?, ?)')
      .run(targetUser.toLowerCase(), personnage.toLowerCase(), info.faction, info.niveau);
    client.say(channel, `⚔️ ${targetUser} rejoint officiellement l'équipage en tant que ${personnage} ! Bienvenue dans le Grand Line ! 🏴‍☠️`);
    return;
  }

  // !retirer (mod seulement)
  if (msg.startsWith('!retirer') && isMod) {
    const targetUser = msg.split(' ')[1];
    if (!targetUser) {
      client.say(channel, 'Usage: !retirer [username]');
      return;
    }
    db.prepare('DELETE FROM membres WHERE username = ?').run(targetUser.toLowerCase());
    client.say(channel, `${targetUser} a été retiré de l'équipage.`);
    return;
  }

  // !equipagecomplet (mod seulement)
  if (msg === '!equipagecomplet' && isMod) {
    const tous = db.prepare('SELECT * FROM membres').all();
    if (tous.length === 0) {
      client.say(channel, 'Aucun membre pour le moment !');
    } else {
      const liste = tous.map(m => `${m.username}=${m.personnage}`).join(', ');
      client.say(channel, `📜 Équipage complet: ${liste}`);
    }
    return;
  }
});

console.log('JoyBoyBot est en ligne ! 🏴‍☠️');