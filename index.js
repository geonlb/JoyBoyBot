const tmi = require('tmi.js');
const Database = require('better-sqlite3');
const OBSWebSocket = require('obs-websocket-js').default;
const obs = new OBSWebSocket();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://usbsivjrputwwrohezwk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzYnNpdmpycHV0d3dyb2hlendrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDExOTM1MSwiZXhwIjoyMDk1Njk1MzUxfQ.UNf-rdDBD0MocGrQW4tzNAW3ksqgR__Zg3b1PwsDlPs'
);
 
// Connexion OBS
obs.connect('ws://localhost:4455', 'XsTEosj4q37LH4nF').catch(err => {
  console.log('OBS non connecté:', err.message);
});
 
// Images des personnages
const images = {
  'yamato': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\yamato.png',
  'zoro': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\zoro.png',
  'nami': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\nami.png',
  'usopp': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\usopp.png',
  'chopper': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\chopper.png',
  'carrot': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\carrot.png',
  'bartolomeo': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\bartolomeo.png',
  'brulee': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\brulee.png',
  'daifuku': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\daifuku.png',
  'oven': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\oven.png',
  'montdor': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\montdor.png',
  'robin': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\robin.png',
  'mihawk': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\mihawk.png',
  'koby': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\koby.png',
  'smoker': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\smoker.png',
  'hancock': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\hancock.png',
  'kaido': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\kaido.png',
  'vivi': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\vivi.png',
  'jinbe': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\jinbe.png',
  'doflamingo': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\doflamingo.png',
  'sanji': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\sanji.png',
  'garp': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\garp.png',
  'kuma': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\kuma.png',
  'brook': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\brook.png',
  'bonney': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\bonney.png',
  'shanks': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\shanks.png',
  'sabo': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\sabo.png',
  'law': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\law.png',
  'franky': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\franky.png',
  'baggy': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\baggy.png',
  'katakuri': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\katakuri.png',
  'barbeblanche': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\barbeblanche.png',
  'ace': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\ace.png',
  'raileigh': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\raileigh.png',
  'akainu': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\akainu.png',
  'kizaru': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\kizaru.png',
  'aokiji': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\aokiji.png',
  'compote': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\compote.png',
  'smoothie': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\smoothie.png',
  'fujitora': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\fujitora.png',
  'ryokugyu': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\ryokugyu.png',
  'cracker': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\cracker.png',
  'goldroger': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\goldroger.png',
  'weevil': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\weevil.png',
  'sengoku': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\sengoku.png',
  'bigmom': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\bigmom.png',
  'luffy': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\luffy.png',
  'cheater': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\cheater.png',
  'barbenoire': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\barbenoire.png',
  'sugar': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\sugar.png',
  'hawkins': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\hawkins.png',
  'urouge': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\urouge.png',
  'apoo': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\apoo.png',
  'drake': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\drake.png',
  'moria': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\moria.png',
  'perona': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\perona.png',
  'kid': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\kid.png',
  'killer': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\killer.png',
  'crocodile': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\crocodile.png',
  'roblucci': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\roblucci.png',
  'enel': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\enel.png',
  'otama': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\otama.png',
  'hiyori': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\hiyori.png',
  'marco': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\marco.png',
  'uta': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\uta.png',
  'shirahoshi': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\shirahoshi.png',
  'oden': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\oden.png',
  'momonosuke': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\momonosuke.png',
};
 
// Cooldowns
let dernierVideo = 0;
const COOLDOWN_VIDEO = 60000;
const COOLDOWN_MESSAGE_BERRY = 30000;
const COOLDOWN_MAPRIME = 600000;
let dernierTopPrime = 0;
const COOLDOWN_TOPPRIME = 120000;
 
// Vidéos
const videos = {
  'onepiece': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\onepiece.mp4',
};
 
// Configuration
const config = {
  BOT_USERNAME: 'JoyBoy_Bot',
  BOT_TOKEN: 'oauth:tu316qr4o2dsrjjxsqk4amjuwjs9we',
  CHANNEL: 'NeyLaBrise',
  STREAMER: 'NeyLaBrise'
};
 
// Base de données
const db = new Database('joyboy.db');
db.exec(`CREATE TABLE IF NOT EXISTS membres (username TEXT PRIMARY KEY, personnage TEXT, faction TEXT, niveau INTEGER)`);
db.exec(`CREATE TABLE IF NOT EXISTS compteur (username TEXT PRIMARY KEY, subs INTEGER DEFAULT 0)`);
db.exec(`CREATE TABLE IF NOT EXISTS primes (username TEXT PRIMARY KEY, berrys INTEGER DEFAULT 0, dernierMessage INTEGER DEFAULT 0, dernierePrime INTEGER DEFAULT 0)`);
 
// Personnages par niveau
const personnages = {
  1: {
    'equipage': ['Usopp','Chopper','Carrot','Bartolomeo'],
    'bigmom': ['Perospero','Daifuku','Oven','Brulee','Montdor'],
    'empereurs': [],
    'grandscorsaires': [],
    'marine': ['Koby'],
    'antagonistes': ['Sugar','Hawkins','Urouge'],
    'allies': ['Otama']
  },
  2: {
    'equipage': ['Nami','Robin','Franky','Brook','Vivi','Bonney'],
    'bigmom': ['Smoothie','Cracker','Compote'],
    'empereurs': [],
    'grandscorsaires': ['Baggy','Kuma','Weevil'],
    'marine': ['Sengoku','Garp','Smoker'],
    'antagonistes': ['Apoo','Drake','Moria'],
    'allies': ['Hiyori','Perona','Shirahoshi']
  },
  3: {
    'equipage': ['Sanji','Jinbe','Yamato','Sabo','Rayleigh','Law','Ace'],
    'bigmom': ['Katakuri'],
    'empereurs': [],
    'grandscorsaires': ['Mihawk','Hancock','Doflamingo'],
    'marine': ['Fujitora','Ryokugyu','Aokiji','Kizaru'],
    'antagonistes': ['Kid','Killer','Crocodile','RobLucci'],
    'allies': ['Marco','Uta','Momonosuke']
  },
  4: {
    'equipage': ['Zoro','Luffy'],
    'bigmom': ['BigMom'],
    'empereurs': ['Shanks','Kaido','BarbeBlanche','BarbeNoire'],
    'grandscorsaires': [],
    'marine': ['Akainu'],
    'antagonistes': ['Enel','Kuma'],
    'allies': ['Oden'],
    'special': ['GoldRoger']
  }
};
 
const paliers = { 1: 10, 2: 25, 3: 50, 4: 80 };
 
function trouverPersonnage(nom) {
  for (const [niveau, factions] of Object.entries(personnages)) {
    for (const [faction, liste] of Object.entries(factions)) {
      if (liste.map(p => p.toLowerCase()).includes(nom.toLowerCase())) {
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
 
// Fonction afficher personnage dans OBS
async function afficherPersonnage(personnage) {
  try {
    await obs.call('SetInputSettings', {
      inputName: 'perso',
      inputSettings: { file: images[personnage.toLowerCase()] }
    });
    const itemId = await obs.call('GetSceneItemId', { sceneName: 'Alertes', sourceName: 'perso' }).then(r => r.sceneItemId);
    await obs.call('SetSceneItemEnabled', { sceneName: 'Alertes', sceneItemId: itemId, sceneItemEnabled: true });
    setTimeout(async () => {
      const id = await obs.call('GetSceneItemId', { sceneName: 'Alertes', sourceName: 'perso' }).then(r => r.sceneItemId);
      await obs.call('SetSceneItemEnabled', { sceneName: 'Alertes', sceneItemId: id, sceneItemEnabled: false });
    }, 5000);
  } catch (err) {
    console.log('Erreur OBS:', err.message);
  }
}
 
// Client Twitch
const client = new tmi.Client({
  identity: { username: config.BOT_USERNAME, password: config.BOT_TOKEN },
  channels: [config.CHANNEL]
});
 
client.connect();
 
client.on('message', async (channel, tags, message, self) => {
  if (self) return;
 
  const username = tags['display-name'];
  const msg = message.trim().toLowerCase();
  const isMod = tags.mod || username.toLowerCase() === config.STREAMER.toLowerCase();
  const exempts = ['neylabrise', 'louiiise_la_brise'];
 
  // Détection récompenses points de chaîne
  if (tags['custom-reward-id']) {
    const user = username.toLowerCase();
    let row = db.prepare('SELECT * FROM compteur WHERE username = ?').get(user);
    if (!row) {
      db.prepare('INSERT INTO compteur (username, subs) VALUES (?, 1)').run(user);
      row = { subs: 1 };
    } else {
      db.prepare('UPDATE compteur SET subs = subs + 1 WHERE username = ?').run(user);
      row.subs += 1;
    }
    supabase.from('compteur').upsert({ username: user, subs: row.subs }).then();
    client.say(channel, `🏴‍☠️ ${username} a converti ses points ! Total : ${row.subs} sub(s). Paliers : 10/25/50/80 subs !`);
    if ([10, 25, 50, 80].includes(row.subs)) {
      client.say(channel, `🎉 ${username} atteint le palier ${row.subs} subs ! Tape !dispo pour voir les personnages disponibles !`);
    }
    return;
  }
 
  // Gagner des Berrys en chattant
  const now = Date.now();
  db.prepare('INSERT OR IGNORE INTO primes (username, berrys, dernierMessage, dernierePrime) VALUES (?, 0, 0, 0)').run(username.toLowerCase());
  const userPrime = db.prepare('SELECT * FROM primes WHERE username = ?').get(username.toLowerCase());
  if (now - userPrime.dernierMessage > COOLDOWN_MESSAGE_BERRY && !exempts.includes(username.toLowerCase())) {
    db.prepare('UPDATE primes SET berrys = berrys + 50, dernierMessage = ? WHERE username = ?').run(now, username.toLowerCase());
    const updatedPrime = db.prepare('SELECT * FROM primes WHERE username = ?').get(username.toLowerCase());
    supabase.from('primes').upsert({ username: username.toLowerCase(), berrys: updatedPrime.berrys, derniermessage: now, derniereprime: updatedPrime.dernierePrime }).then(({ error }) => {
      if (error) console.log('Erreur Supabase:', error.message);
    });
  }
 
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
 
  // Commandes personnages OBS
  if (msg.startsWith('!') && images[msg.slice(1).toLowerCase()]) {
    const perso = msg.slice(1).toLowerCase();
    afficherPersonnage(perso);
    client.say(channel, `🏴‍☠️ ${username} invoque ${perso} !`);
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
 
  // !messubs
  if (msg === '!messubs') {
    const row = db.prepare('SELECT * FROM compteur WHERE username = ?').get(username.toLowerCase());
    if (!row || row.subs === 0) {
      client.say(channel, `${username} tu n'as pas encore de subs !`);
    } else {
      const prochainPalier = [10, 25, 50, 80].find(p => p > row.subs);
      if (prochainPalier) {
        client.say(channel, `⚔️ ${username} tu as ${row.subs} sub(s) ! Il te manque ${prochainPalier - row.subs} sub(s) pour atteindre le palier ${prochainPalier} !`);
      } else {
        client.say(channel, `👑 ${username} tu as ${row.subs} sub(s) ! Tu es au niveau maximum !`);
      }
    }
    return;
  }
 
  // !maprime
  if (msg === '!maprime') {
    const now2 = Date.now();
    const row = db.prepare('SELECT * FROM primes WHERE username = ?').get(username.toLowerCase());
    if (row && now2 - row.dernierePrime < COOLDOWN_MAPRIME) {
      const restant = Math.ceil((COOLDOWN_MAPRIME - (now2 - row.dernierePrime)) / 60000);
      client.say(channel, `⏳ ${username} attend encore ${restant} minute(s) pour checker ta prime !`);
      return;
    }
    db.prepare('INSERT OR IGNORE INTO primes (username, berrys, dernierMessage, dernierePrime) VALUES (?, 0, 0, 0)').run(username.toLowerCase());
    db.prepare('UPDATE primes SET dernierePrime = ? WHERE username = ?').run(now2, username.toLowerCase());
    const prime = db.prepare('SELECT berrys FROM primes WHERE username = ?').get(username.toLowerCase());
    client.say(channel, `💰 ${username} ta prime est de ${prime.berrys.toLocaleString()} Berrys ! 🏴‍☠️`);
    return;
  }
 
  // !topprime
  if (msg === '!topprime') {
    const now3 = Date.now();
    if (now3 - dernierTopPrime < COOLDOWN_TOPPRIME) {
      const restant = Math.ceil((COOLDOWN_TOPPRIME - (now3 - dernierTopPrime)) / 1000);
      client.say(channel, `⏳ Attends encore ${restant} secondes pour le classement !`);
      return;
    }
    dernierTopPrime = now3;
    const top = db.prepare("SELECT username, berrys FROM primes WHERE username NOT IN ('neylabrise', 'louiiise_la_brise') ORDER BY berrys DESC LIMIT 5").all();
    if (top.length === 0) {
      client.say(channel, 'Aucune prime pour le moment !');
      return;
    }
    const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
    const liste = top.map((r, i) => `${medals[i]} ${r.username}: ${r.berrys.toLocaleString()} Berrys`).join(' | ');
    client.say(channel, `🏆 Top primes: ${liste}`);
    return;
  }
 
  // !equipage
  if (msg.startsWith('!equipage')) {
    const faction = msg.split(' ')[1];
    if (!faction) {
      client.say(channel, 'Usage: !equipage [equipage/bigmom/empereurs/grandscorsaires/marine/antagonistes/allies]');
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
    if (dejamembre) {
      client.say(channel, `${username} tu es déjà ${dejamembre.personnage}, le choix est définitif !`);
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
    db.prepare('INSERT OR REPLACE INTO membres (username, personnage, faction, niveau) VALUES (?, ?, ?, ?)').run(targetUser.toLowerCase(), personnage.toLowerCase(), info.faction, info.niveau);
    supabase.from('membres').upsert({ username: targetUser.toLowerCase(), personnage: personnage.toLowerCase(), faction: info.faction, niveau: info.niveau }).then();
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
    supabase.from('membres').delete().eq('username', targetUser.toLowerCase()).then();
    client.say(channel, `${targetUser} a été retiré de l'équipage.`);
    return;
  }
 
  // !addsub (streamer + mod autorisé)
  if (msg.startsWith('!addsub') && (username.toLowerCase() === config.STREAMER.toLowerCase() || username.toLowerCase() === 'biig_maama')) {
    const parts = msg.split(' ');
    const targetUser = parts[1];
    const nombre = parseInt(parts[2]) || 1;
    if (!targetUser) {
      client.say(channel, 'Usage: !addsub [username] [nombre]');
      return;
    }
    let row = db.prepare('SELECT * FROM compteur WHERE username = ?').get(targetUser.toLowerCase());
    if (!row) {
      db.prepare('INSERT INTO compteur (username, subs) VALUES (?, ?)').run(targetUser.toLowerCase(), nombre);
      row = { subs: nombre };
    } else {
      db.prepare('UPDATE compteur SET subs = subs + ? WHERE username = ?').run(nombre, targetUser.toLowerCase());
      row.subs += nombre;
    }
    supabase.from('compteur').upsert({ username: targetUser.toLowerCase(), subs: row.subs }).then();
    client.say(channel, `🏴‍☠️ ${targetUser} a maintenant ${row.subs} sub(s) ! Paliers : 10/25/50/80 !`);
    if ([10, 25, 50, 80].includes(row.subs)) {
      client.say(channel, `🎉 ${targetUser} atteint le palier ${row.subs} subs ! Tape !dispo pour voir les personnages disponibles !`);
    }
    return;
  }
 
  // !removesub (streamer seulement)
  if (msg.startsWith('!removesub') && username.toLowerCase() === config.STREAMER.toLowerCase()) {
    const parts = msg.split(' ');
    const targetUser = parts[1];
    const nombre = parseInt(parts[2]) || 1;
    if (!targetUser) {
      client.say(channel, 'Usage: !removesub [username] [nombre]');
      return;
    }
    let row = db.prepare('SELECT * FROM compteur WHERE username = ?').get(targetUser.toLowerCase());
    if (!row) {
      client.say(channel, `${targetUser} n'a pas de subs !`);
      return;
    }
    const newSubs = Math.max(0, row.subs - nombre);
    db.prepare('UPDATE compteur SET subs = ? WHERE username = ?').run(newSubs, targetUser.toLowerCase());
    supabase.from('compteur').upsert({ username: targetUser.toLowerCase(), subs: newSubs }).then();
    client.say(channel, `✅ ${targetUser} a maintenant ${newSubs} sub(s) !`);
    return;
  }
 
  // !addberrys (streamer seulement)
  if (msg.startsWith('!addberrys') && username.toLowerCase() === config.STREAMER.toLowerCase()) {
    const parts = msg.split(' ');
    const targetUser = parts[1];
    const nombre = parseInt(parts[2]) || 0;
    if (!targetUser || nombre <= 0) {
      client.say(channel, 'Usage: !addberrys [username] [nombre]');
      return;
    }
    db.prepare('INSERT OR IGNORE INTO primes (username, berrys, dernierMessage, dernierePrime) VALUES (?, 0, 0, 0)').run(targetUser.toLowerCase());
    db.prepare('UPDATE primes SET berrys = berrys + ? WHERE username = ?').run(nombre, targetUser.toLowerCase());
    const primeActuelle = db.prepare('SELECT * FROM primes WHERE username = ?').get(targetUser.toLowerCase());
    supabase.from('primes').upsert({ username: targetUser.toLowerCase(), berrys: primeActuelle.berrys, derniermessage: primeActuelle.dernierMessage, derniereprime: primeActuelle.dernierePrime }).then(({ error }) => {
      if (error) console.log('Erreur Supabase addberrys:', error.message);
    });
    client.say(channel, `💰 ${targetUser} reçoit ${nombre.toLocaleString()} Berrys ! Sa prime est maintenant de ${primeActuelle.berrys.toLocaleString()} Berrys ! 🏴‍☠️`);
    return;
  }
 
  // !removeberrys (streamer seulement)
  if (msg.startsWith('!removeberrys') && username.toLowerCase() === config.STREAMER.toLowerCase()) {
    const parts = msg.split(' ');
    const targetUser = parts[1];
    const nombre = parseInt(parts[2]) || 0;
    if (!targetUser || nombre <= 0) {
      client.say(channel, 'Usage: !removeberrys [username] [nombre]');
      return;
    }
    db.prepare('INSERT OR IGNORE INTO primes (username, berrys, dernierMessage, dernierePrime) VALUES (?, 0, 0, 0)').run(targetUser.toLowerCase());
    db.prepare('UPDATE primes SET berrys = MAX(0, berrys - ?) WHERE username = ?').run(nombre, targetUser.toLowerCase());
    const prime = db.prepare('SELECT * FROM primes WHERE username = ?').get(targetUser.toLowerCase());
    supabase.from('primes').upsert({ username: targetUser.toLowerCase(), berrys: prime.berrys, derniermessage: prime.dernierMessage, derniereprime: prime.dernierePrime }).then();
    client.say(channel, `💸 ${targetUser} perd ${nombre.toLocaleString()} Berrys ! Sa prime est maintenant de ${prime.berrys.toLocaleString()} Berrys !`);
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
 
  // Commande !onepiece vidéo
  if (msg === '!onepiece') {
    const maintenant = Date.now();
    if (maintenant - dernierVideo < COOLDOWN_VIDEO) {
      const restant = Math.ceil((COOLDOWN_VIDEO - (maintenant - dernierVideo)) / 1000);
      client.say(channel, `⏳ Attends encore ${restant} secondes !`);
      return;
    }
    dernierVideo = maintenant;
    try {
      await obs.call('SetInputSettings', { inputName: 'video', inputSettings: { local_file: videos['onepiece'] } });
      const itemId = await obs.call('GetSceneItemId', { sceneName: 'Alertes', sourceName: 'video' }).then(r => r.sceneItemId);
      await obs.call('SetSceneItemEnabled', { sceneName: 'Alertes', sceneItemId: itemId, sceneItemEnabled: true });
      setTimeout(async () => {
        const id = await obs.call('GetSceneItemId', { sceneName: 'Alertes', sourceName: 'video' }).then(r => r.sceneItemId);
        await obs.call('SetSceneItemEnabled', { sceneName: 'Alertes', sceneItemId: id, sceneItemEnabled: false });
      }, 10000);
      client.say(channel, `🏴‍☠️ ${username} invoque OnePiece !`);
    } catch (err) {
      console.log('Erreur OBS vidéo:', err.message);
    }
    return;
  }
});
 
// Détection des subs automatiques
client.on('subscription', (channel, username, method, message, userstate) => {
  const user = username.toLowerCase();
  let row = db.prepare('SELECT * FROM compteur WHERE username = ?').get(user);
  if (!row) {
    db.prepare('INSERT INTO compteur (username, subs) VALUES (?, 1)').run(user);
    row = { subs: 1 };
  } else {
    db.prepare('UPDATE compteur SET subs = subs + 1 WHERE username = ?').run(user);
    row.subs += 1;
  }
  supabase.from('compteur').upsert({ username: user, subs: row.subs }).then();
  db.prepare('INSERT OR IGNORE INTO primes (username, berrys, dernierMessage, dernierePrime) VALUES (?, 0, 0, 0)').run(user);
  db.prepare('UPDATE primes SET berrys = berrys + 10000 WHERE username = ?').run(user);
  const prime = db.prepare('SELECT berrys FROM primes WHERE username = ?').get(user);
  supabase.from('primes').upsert({ username: user, berrys: prime.berrys, derniermessage: 0, derniereprime: 0 }).then();
  client.say(channel, `🏴‍☠️ ${username} a rejoint le Grand Line ! +10 000 Berrys ! Total : ${row.subs} sub(s) !`);
  if ([10, 25, 50, 80].includes(row.subs)) {
    client.say(channel, `🎉 ${username} atteint le palier ${row.subs} subs ! Tape !dispo pour choisir ton personnage !`);
  }
});
 
// Détection des subs offerts
client.on('subgift', (channel, username, streakMonths, recipient, methods, userstate) => {
  const user = username.toLowerCase();
  let row = db.prepare('SELECT * FROM compteur WHERE username = ?').get(user);
  if (!row) {
    db.prepare('INSERT INTO compteur (username, subs) VALUES (?, 1)').run(user);
    row = { subs: 1 };
  } else {
    db.prepare('UPDATE compteur SET subs = subs + 1 WHERE username = ?').run(user);
    row.subs += 1;
  }
  supabase.from('compteur').upsert({ username: user, subs: row.subs }).then();
  db.prepare('INSERT OR IGNORE INTO primes (username, berrys, dernierMessage, dernierePrime) VALUES (?, 0, 0, 0)').run(user);
  db.prepare('UPDATE primes SET berrys = berrys + 10000 WHERE username = ?').run(user);
  const prime = db.prepare('SELECT berrys FROM primes WHERE username = ?').get(user);
  supabase.from('primes').upsert({ username: user, berrys: prime.berrys, derniermessage: 0, derniereprime: 0 }).then();
  client.say(channel, `🎁 ${username} a offert un sub à ${recipient} ! +10 000 Berrys pour ${username} ! Total : ${row.subs} sub(s) !`);
  if ([10, 25, 50, 80].includes(row.subs)) {
    client.say(channel, `🎉 ${username} atteint le palier ${row.subs} subs ! Tape !dispo pour choisir ton personnage !`);
  }
});
 
console.log('JoyBoyBot est en ligne ! 🏴‍☠️');
 