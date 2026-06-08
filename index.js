require('dotenv').config();
const tmi = require('tmi.js');
const { Client: DiscordClient, GatewayIntentBits } = require('discord.js');
const discord = new DiscordClient({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.DirectMessages] });
discord.login(process.env.DISCORD_TOKEN);
const Database = require('better-sqlite3');
const OBSWebSocket = require('obs-websocket-js').default;
const obs = new OBSWebSocket();
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
     'https://usbsivjrputwwrohezwk.supabase.co',
     process.env.SUPABASE_KEY
   );
 
// Connexion OBS
obs.connect('ws://localhost:4455', process.env.OBS_PASSWORD).catch(err => {
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
  'perospero': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\perospero.png',
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
const codesTemp = {};
const COOLDOWN_TOPPRIME = 120000;
let dernierFruitGlobal = 0;
const COOLDOWN_FRUIT_GLOBAL = 10000; // 10 secondes (animation globale)
const COOLDOWN_FRUIT_USER = 300000; // 5 minutes par personne
const cooldownsFruit = {};
let dernierDispo = 0;
const COOLDOWN_DISPO = 300000; // 5 minutes
 
// Vidéos
const videos = {
  'onepiece': 'C:\\Users\\sdeni\\Downloads\\PERSO OP OBS\\onepiece.mp4',
};
 
// Configuration
const config = {
  BOT_USERNAME: 'JoyBoy_Bot',
  BOT_TOKEN: process.env.BOT_TOKEN,
  CHANNEL: 'NeyLaBrise',
  STREAMER: 'NeyLaBrise'
};
 
// Base de données
const db = new Database('joyboy.db');
db.exec(`CREATE TABLE IF NOT EXISTS membres (username TEXT PRIMARY KEY, personnage TEXT, faction TEXT, niveau INTEGER)`);
db.exec(`CREATE TABLE IF NOT EXISTS compteur (username TEXT PRIMARY KEY, subs INTEGER DEFAULT 0)`);
db.exec(`CREATE TABLE IF NOT EXISTS primes (username TEXT PRIMARY KEY, berrys INTEGER DEFAULT 0, dernierMessage INTEGER DEFAULT 0, dernierePrime INTEGER DEFAULT 0)`);

db.exec(`CREATE TABLE IF NOT EXISTS primes (username TEXT PRIMARY KEY, berrys INTEGER DEFAULT 0, dernierMessage INTEGER DEFAULT 0, dernierePrime INTEGER DEFAULT 0)`);
db.exec(`CREATE TABLE IF NOT EXISTS fruits_stream (username TEXT PRIMARY KEY, fruit TEXT, timestamp INTEGER DEFAULT 0)`);

// Personnages par niveau
 
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

// ==================== SYSTEME BOSS COMMUNAUTAIRE ====================
const expressBoss = require('express');
const pathBoss = require('path');
const bossApp = expressBoss();
bossApp.use('/persos', expressBoss.static(pathBoss.join(__dirname, 'persos')));

// Definition des 4 boss (PV / recompense ajustables ici)
const BOSS_TIERS = {
  commun:     { nom: 'Ducapol',       img: 'wapolduc',      pv: 1000,  reward: 500,  couleur: '#2ecc71', emoji: '🟢', label: 'Commun' },
  epique:     { nom: 'Ducakuri',    img: 'katakuriduc',   pv: 2500,  reward: 1000, couleur: '#9b59b6', emoji: '💜', label: 'Epique' },
  legendaire: { nom: 'Kaiduc',       img: 'kaidoduc',      pv: 5000,  reward: 2500, couleur: '#ffd700', emoji: '⭐', label: 'Legendaire' },
  ultime:     { nom: 'Barbe Duc Noire', img: 'barbenoireduc', pv: 10000, reward: 5000, couleur: '#ffffff', emoji: '👑', label: 'Ultime' }
};

// Reglages de combat (a tuner si trop dur/facile)
const DEGATS_MIN = 25, DEGATS_MAX = 60;
const CRIT_CHANCE = 0.15, CRIT_MULT = 2;
const ULTIME_CHANCE = 0.03, ULTIME_MIN = 150, ULTIME_MAX = 300;
const ATTACK_COOLDOWN = 10000;   // 10 sec par personne
const HAKI_MIN = 1500, HAKI_MAX = 2500; // attaque speciale du capitaine
const BOSS_DUREE = 60000;        // 1 min avant que le boss s'enfuie

let boss = null;
const attackCooldowns = {};

function calculerDegats() {
  const r = Math.random();
  if (r < ULTIME_CHANCE) return { degats: Math.floor(Math.random()*(ULTIME_MAX-ULTIME_MIN+1))+ULTIME_MIN, type: 'ultime' };
  const base = Math.floor(Math.random()*(DEGATS_MAX-DEGATS_MIN+1))+DEGATS_MIN;
  if (r < ULTIME_CHANCE + CRIT_CHANCE) return { degats: base*CRIT_MULT, type: 'crit' };
  return { degats: base, type: 'normal' };
}

async function activerOverlayBoss() {
  try {
    await obs.call('SetInputSettings', { inputName: 'boss_overlay', inputSettings: { url: 'http://localhost:3001/boss/overlay?t=' + Date.now() } });
    const id = await obs.call('GetSceneItemId', { sceneName: 'Alertes', sourceName: 'boss_overlay' }).then(r => r.sceneItemId);
    await obs.call('SetSceneItemEnabled', { sceneName: 'Alertes', sceneItemId: id, sceneItemEnabled: true });
  } catch (err) { console.log('Erreur OBS boss:', err.message); }
}
async function desactiverOverlayBoss() {
  try {
    const id = await obs.call('GetSceneItemId', { sceneName: 'Alertes', sourceName: 'boss_overlay' }).then(r => r.sceneItemId);
    await obs.call('SetSceneItemEnabled', { sceneName: 'Alertes', sceneItemId: id, sceneItemEnabled: false });
  } catch (err) { console.log('Erreur OBS boss off:', err.message); }
}

function spawnBoss(tier, channel) {
  if (boss) { client.say(channel, '⚠️ Un boss est deja sur le terrain ! Battez-le d\'abord avec !attack !'); return; }
  const def = BOSS_TIERS[tier];
  boss = { tier, nom: def.nom, img: def.img, couleur: def.couleur, label: def.label, emoji: def.emoji,
    pvMax: def.pv, pv: def.pv, reward: def.reward, participants: {}, channel, fini: null,
    dernierCoup: { id: 0, degats: 0, type: 'normal' } };
  activerOverlayBoss();
  client.say(channel, `${def.emoji} BOSS ${def.label.toUpperCase()} : ${def.nom} APPARAIT avec ${def.pv.toLocaleString()} PV ! Tapez !attack pour l'affronter ! Recompense : ${def.reward.toLocaleString()} Brise chacun ! 🏴‍☠️`);
  boss.interval = setInterval(() => { if (boss && !boss.fini) client.say(boss.channel, `${boss.emoji} ${boss.nom} : ${boss.pv.toLocaleString()}/${boss.pvMax.toLocaleString()} PV restants ! Continuez !`); }, 15000);
  boss.timeout = setTimeout(() => fuiteBoss(), BOSS_DUREE);
  boss.expire = Date.now() + BOSS_DUREE;
}

function attaquerBoss(username, channel) {
  if (!boss || boss.fini) return;
  const u = username.toLowerCase();
  const now = Date.now();
  if (attackCooldowns[u] && now - attackCooldowns[u] < ATTACK_COOLDOWN) return;
  attackCooldowns[u] = now;
  const { degats, type } = calculerDegats();
  boss.pv = Math.max(0, boss.pv - degats);
  boss.participants[u] = (boss.participants[u] || 0) + degats;
  boss.dernierCoup = { id: boss.dernierCoup.id + 1, degats, type };
  if (type === 'ultime') client.say(channel, `💥💥 ${username} declenche une ATTAQUE ULTIME de ${degats} degats sur ${boss.nom} ! 🔥`);
  if (boss.pv <= 0) victoireBoss();
}
function hakiBoss(username, channel) {
  if (!boss || boss.fini) { client.say(channel, 'Aucun boss a achever pour le moment, capitaine !'); return; }
  const degats = Math.floor(Math.random()*(HAKI_MAX-HAKI_MIN+1))+HAKI_MIN;
  boss.pv = Math.max(0, boss.pv - degats);
  boss.participants[username.toLowerCase()] = (boss.participants[username.toLowerCase()] || 0) + degats;
  boss.dernierCoup = { id: boss.dernierCoup.id + 1, degats, type: 'haki' };
  client.say(channel, `⚡🔥 ${username} libere son HAKI DES ROIS ! ${degats} degats foudroyants sur ${boss.nom} ! 🔥⚡`);
  if (boss.pv <= 0) victoireBoss();
}

function victoireBoss() {
  if (!boss || boss.fini) return;
  boss.fini = 'victoire';
  clearInterval(boss.interval); clearTimeout(boss.timeout);
  const gagnants = Object.keys(boss.participants);
  const reward = boss.reward, nom = boss.nom, ch = boss.channel;
  gagnants.forEach(u => {
    db.prepare('INSERT OR IGNORE INTO primes (username, berrys, dernierMessage, dernierePrime) VALUES (?, 0, 0, 0)').run(u);
    db.prepare('UPDATE primes SET berrys = berrys + ? WHERE username = ?').run(reward, u);
    const p = db.prepare('SELECT berrys FROM primes WHERE username = ?').get(u);
    supabase.from('primes').upsert({ username: u, berrys: p.berrys, derniermessage: 0, derniereprime: 0 }).then();
  });
  let top = null, topDmg = 0;
  for (const [u, d] of Object.entries(boss.participants)) { if (d > topDmg) { topDmg = d; top = u; } }
  if (gagnants.length > 0) client.say(ch, `🎉 ${nom} est VAINCU ! ${gagnants.length} pirate(s) gagnent ${reward.toLocaleString()} Brise chacun ! 🏆 Top attaquant : ${top} (${topDmg} degats) ! 🏴‍☠️`);
  else client.say(ch, `${nom} est tombe... mais personne ne l'a touche ! Aucune recompense.`);
  setTimeout(() => { desactiverOverlayBoss(); boss = null; }, 5000);
}

function fuiteBoss() {
  if (!boss || boss.fini) return;
  boss.fini = 'fuite';
  clearInterval(boss.interval); clearTimeout(boss.timeout);
  client.say(boss.channel, `💨 ${boss.nom} s'est enfui ! Vous ne l'avez pas vaincu a temps... Aucune recompense cette fois. 🏴‍☠️`);
  setTimeout(() => { desactiverOverlayBoss(); boss = null; }, 4000);
}

bossApp.get('/boss/state', (req, res) => {
  res.set('Cache-Control', 'no-store');
  if (!boss) return res.json({ active: false });
  res.json({ active: true, nom: boss.nom, img: boss.img, couleur: boss.couleur, label: boss.label, emoji: boss.emoji, pv: boss.pv, pvMax: boss.pvMax, fini: boss.fini, dernierCoup: boss.dernierCoup, restant: Math.max(0, boss.expire - Date.now()), duree: BOSS_DUREE });
});

bossApp.get('/boss/overlay', (req, res) => {
  res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:transparent;font-family:'Arial Black',Arial,sans-serif;overflow:hidden;}
#boss-wrap{display:none;position:fixed;inset:0;align-items:center;justify-content:center;flex-direction:column;}
#boss-card{background:rgba(5,5,16,0.55);border:3px solid #fff;border-radius:24px;padding:30px 50px;text-align:center;}
#boss-label{display:inline-block;border:2px solid #fff;border-radius:20px;padding:4px 18px;font-size:18px;letter-spacing:3px;margin-bottom:10px;color:#fff;}
#boss-name{font-size:30px;letter-spacing:2px;margin-bottom:14px;color:#fff;text-shadow:0 2px 8px #000;}
#boss-img{width:650px;height:650px;object-fit:contain;filter:drop-shadow(0 10px 25px rgba(0,0,0,0.6));animation:idle 1.3s ease-in-out infinite;}
@keyframes idle{0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-10px) scale(1.04);}}
#hp-wrap{margin-top:16px;width:480px;margin-left:auto;margin-right:auto;}
#timer-text{margin-top:12px;color:#fff;font-size:38px;font-weight:bold;letter-spacing:2px;text-shadow:0 2px 6px #000,0 0 15px currentColor;}
#hp-bar{background:rgba(0,0,0,0.6);border:3px solid #fff;border-radius:14px;height:44px;overflow:hidden;}
#hp-fill{height:100%;width:100%;background:#2ecc71;transition:width 0.3s ease,background 0.3s;}
#hp-text{margin-top:8px;color:#fff;font-size:20px;text-shadow:0 1px 3px #000;}
.shake{animation:shake 0.25s !important;}
@keyframes shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-12px) translateY(-4px);}75%{transform:translateX(12px) translateY(-4px);}}
#flash{position:fixed;inset:0;background:#fff;opacity:0;transition:opacity 0.1s;pointer-events:none;}
.dmg{position:absolute;top:40%;font-size:28px;font-weight:bold;color:#fff;text-shadow:0 2px 6px #000;animation:floatUp 1.1s ease-out forwards;pointer-events:none;}
.dmg.crit{font-size:38px;color:#ffd700;}
.dmg.ultime{font-size:50px;color:#ff3b3b;text-shadow:0 0 20px #ff0000;}
.dmg.haki{font-size:60px;color:#ffd700;text-shadow:0 0 25px #ff6600,0 0 40px #ffea00;}
#haki-fx{position:fixed;inset:0;pointer-events:none;opacity:0;background:radial-gradient(circle,rgba(255,200,0,0.5),rgba(255,80,0,0.3),transparent 70%);}
#haki-fx.go{animation:hakiFlash 1s ease-out;}
@keyframes hakiFlash{0%{opacity:0;}10%{opacity:1;}30%{opacity:0.6;}50%{opacity:1;}100%{opacity:0;}}
#haki-bolt{position:fixed;top:0;left:50%;transform:translateX(-50%);font-size:200px;opacity:0;}
#haki-bolt.go{animation:hakiBolt 0.9s ease-out;}
@keyframes hakiBolt{0%{opacity:0;transform:translateX(-50%) scale(0.3);}20%{opacity:1;transform:translateX(-50%) scale(1.3);}60%{opacity:1;}100%{opacity:0;transform:translateX(-50%) scale(1);}}
@keyframes floatUp{0%{opacity:1;transform:translateY(0);}100%{opacity:0;transform:translateY(-90px);}}
.explode{animation:explode 0.8s forwards !important;}
@keyframes explode{0%{transform:scale(1);filter:brightness(1);}40%{transform:scale(1.4);filter:brightness(3);}100%{transform:scale(0);opacity:0;}}
.flee{animation:flee 0.8s forwards !important;}
@keyframes flee{0%{transform:translateX(0);opacity:1;}100%{transform:translateX(400px);opacity:0;}}
#big-msg{margin-top:18px;font-size:44px;letter-spacing:4px;opacity:0;transform:scale(0.5);transition:all 0.4s;text-shadow:0 0 20px currentColor;}
#big-msg.show{opacity:1;transform:scale(1);}
</style></head><body>
<div id="flash"></div>
<div id="haki-fx"></div>
<div id="haki-bolt">⚡🔥⚡</div>
<div id="boss-wrap">
  <div id="boss-card">
    <div id="boss-label">BOSS</div>
    <div id="boss-name"></div>
    <img id="boss-img" src="">
    <div id="hp-wrap"><div id="hp-bar"><div id="hp-fill"></div></div><div id="hp-text"></div><div id="timer-text"></div></div>
  </div>
  <div id="big-msg"></div>
</div>
<audio id="bossMusic" src="/persos/bossspawn.mp3" loop></audio>
<script>
var lastHitId=-1, prevFini=null, musicStarted=false, curImg='';
function startMusic(){ if(musicStarted) return; var m=document.getElementById('bossMusic'); if(m){ m.volume=0.5; m.play().catch(function(){}); } musicStarted=true; }
function stopMusic(){ var m=document.getElementById('bossMusic'); if(m){ m.pause(); try{m.currentTime=0;}catch(e){} } musicStarted=false; }
function effetCoup(c){
if(c.type==='haki'){ var fx=document.getElementById('haki-fx'); var bo=document.getElementById('haki-bolt'); fx.classList.remove('go'); bo.classList.remove('go'); void fx.offsetWidth; fx.classList.add('go'); bo.classList.add('go'); }
  var img=document.getElementById('boss-img');
  img.classList.remove('shake'); void img.offsetWidth; img.classList.add('shake');
  var fl=document.getElementById('flash'); fl.style.opacity='0.8'; setTimeout(function(){fl.style.opacity='0';},80);
  var dn=document.createElement('div'); dn.className='dmg '+c.type;
  dn.textContent=(c.type==='ultime'?'ULTIME -':c.type==='crit'?'CRIT -':'-')+c.degats;
  dn.style.left=(40+Math.random()*20)+'%';
  document.getElementById('boss-wrap').appendChild(dn);
  setTimeout(function(){ dn.remove(); },1100);
}
function explosion(){ document.getElementById('boss-img').classList.add('explode'); var b=document.getElementById('big-msg'); b.textContent='💥 VAINCU !'; b.style.color='#ffd700'; b.classList.add('show'); var fl=document.getElementById('flash'); fl.style.opacity='1'; setTimeout(function(){fl.style.opacity='0';},400); }
function fuite(){ document.getElementById('boss-img').classList.add('flee'); var b=document.getElementById('big-msg'); b.textContent='💨 ENFUI !'; b.style.color='#888'; b.classList.add('show'); }
function render(s){
  var wrap=document.getElementById('boss-wrap');
  if(!s.active){ wrap.style.display='none'; stopMusic(); prevFini=null; lastHitId=-1; curImg=''; return; }
  wrap.style.display='flex';
  if(curImg!==s.img){ curImg=s.img; document.getElementById('boss-img').src='/persos/'+s.img+'.png'; document.getElementById('boss-img').className=''; document.getElementById('big-msg').className=''; }
  var nm=document.getElementById('boss-name'); nm.textContent=s.emoji+' '+s.nom; nm.style.color=s.couleur;
  var lb=document.getElementById('boss-label'); lb.textContent='BOSS '+s.label.toUpperCase(); lb.style.color=s.couleur; lb.style.borderColor=s.couleur;
  var card=document.getElementById('boss-card'); card.style.borderColor=s.couleur; card.style.boxShadow='0 0 40px '+s.couleur+'88';
  var ratio=Math.max(0,s.pv/s.pvMax);
  var bar=document.getElementById('hp-fill'); bar.style.width=(ratio*100)+'%';
  bar.style.background= ratio>0.5 ? '#2ecc71' : ratio>0.2 ? '#f39c12' : '#e74c3c';
  document.getElementById('hp-text').textContent=Math.round(s.pv).toLocaleString()+' / '+s.pvMax.toLocaleString()+' PV';
  if(s.fini){ document.getElementById('timer-text').textContent=''; }
  else { var sec=Math.ceil((s.restant||0)/1000); var tr=Math.max(0,(s.restant||0)/(s.duree||60000)); var tt=document.getElementById('timer-text'); tt.style.color= tr>0.5 ? '#87ceeb' : tr>0.25 ? '#f39c12' : '#e74c3c'; tt.textContent='⏱️ '+sec+'s'; }
  startMusic();
  if(s.dernierCoup && s.dernierCoup.id!==lastHitId){ if(lastHitId!==-1) effetCoup(s.dernierCoup); lastHitId=s.dernierCoup.id; }
  if(s.fini!==prevFini){ prevFini=s.fini; if(s.fini==='victoire'){ explosion(); stopMusic(); } else if(s.fini==='fuite'){ fuite(); stopMusic(); } }
}
function poll(){ fetch('/boss/state?t='+Date.now(),{cache:'no-store'}).then(function(r){return r.json();}).then(render).catch(function(){}); }
setInterval(poll,500); poll();
</script></body></html>`);
});

bossApp.listen(3001, () => console.log('Serveur boss local sur http://localhost:3001 🏴‍☠️'));
 
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
 
  // Gagner des Brise en chattant
  const now = Date.now();
  db.prepare('INSERT OR IGNORE INTO primes (username, berrys, dernierMessage, dernierePrime) VALUES (?, 0, 0, 0)').run(username.toLowerCase());
const userPrime = db.prepare('SELECT * FROM primes WHERE username = ?').get(username.toLowerCase());
  if (!userPrime) {
    db.prepare('INSERT OR IGNORE INTO primes (username, berrys, dernierMessage, dernierePrime) VALUES (?, 0, 0, 0)').run(username.toLowerCase());
  }
  if (now - userPrime.dernierMessage > COOLDOWN_MESSAGE_BERRY && !exempts.includes(username.toLowerCase())) {
    db.prepare('UPDATE primes SET berrys = berrys + 50, dernierMessage = ? WHERE username = ?').run(now, username.toLowerCase());
    const updatedPrime = db.prepare('SELECT * FROM primes WHERE username = ?').get(username.toLowerCase());
    supabase.from('primes').upsert({ username: username.toLowerCase(), berrys: updatedPrime.berrys, derniermessage: now, derniereprime: updatedPrime.dernierePrime }).then(({ error }) => {
      if (error) console.log('Erreur Supabase:', error.message);
    });
  }
 
// ==================== COMMANDES BOSS ====================
  if (msg === '!bosscommun' || msg === '!bossepique' || msg === '!bosslegendaire' || msg === '!bossultime') {
    if (username.toLowerCase() !== config.STREAMER.toLowerCase()) return; // reserve au streamer
    const tierMap = { '!bosscommun': 'commun', '!bossepique': 'epique', '!bosslegendaire': 'legendaire', '!bossultime': 'ultime' };
    spawnBoss(tierMap[msg], channel);
    return;
  }
  if (msg === '!attack') {
    attaquerBoss(username, channel);
    return;
  }
  if (msg === '!haki') {
    if (username.toLowerCase() !== config.STREAMER.toLowerCase()) return; // reserve au capitaine
    hakiBoss(username, channel);
    return;
  }

  // !paliers
  if (msg === '!paliers') {
    client.say(channel, `⚓ Paliers One Piece | Niveau 1: 10 subs | Niveau 2: 25 subs | Niveau 3: 50 subs | Niveau 4: 80 subs | Tape !dispo pour voir les personnages disponibles !`);
    return;
  }
 
  // !dispo
  if (msg === '!dispo') {
if (Date.now() - dernierDispo < COOLDOWN_DISPO) {
  const restant = Math.ceil((COOLDOWN_DISPO - (Date.now() - dernierDispo)) / 60000);
  client.say(channel, `⏳ Attends encore ${restant} minute(s) avant de revoir les personnages disponibles !`);
  return;
}
dernierDispo = Date.now();
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
  const { data: rowSupabase } = await supabase.from('compteur').select('subs').eq('username', username.toLowerCase()).single();
  const subs = rowSupabase ? rowSupabase.subs : 0;
  if (subs === 0) {
    client.say(channel, `${username} tu n'as pas encore de subs !`);
  } else {
    const prochainPalier = [10, 25, 50, 80].find(p => p > subs);
    if (prochainPalier) {
      client.say(channel, `⚔️ ${username} tu as ${subs} sub(s) ! Il te manque ${prochainPalier - subs} sub(s) pour atteindre le palier ${prochainPalier} !`);
    } else {
      client.say(channel, `👑 ${username} tu as ${subs} sub(s) ! Tu es au niveau maximum !`);
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
    client.say(channel, `💰 ${username} ta prime est de ${prime.berrys.toLocaleString()} Brise ! 🏴‍☠️`);
    return;
  }
 
// !lierdiscord
if (msg.startsWith('!lierdiscord')) {
  const discordId = msg.split(' ')[1];
  if (!discordId) {
    client.say(channel, `${username} tape !lierdiscord [ton_id_discord] ! Pour trouver ton ID : Discord → Paramètres → Avancés → Mode développeur → Clic droit sur ton pseudo → Copier l'identifiant !`);
    return;
  }
  await supabase.from('discord_links').upsert({ username: username.toLowerCase(), discord_id: discordId });
  client.say(channel, `✅ ${username} ton compte Discord est lié ! Tape maintenant !moncode pour recevoir ton code en DM Discord !`);
  return;
}

// !moncode
if (msg === '!moncode') {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const expire = Date.now() + 300000;
  await supabase.from('codes_temp').upsert({ username: username.toLowerCase(), code, expire });
  
  let envoyeDiscord = false;
  try {
    const { data: linkData } = await supabase.from('discord_links').select('discord_id').eq('username', username.toLowerCase()).single();
    if (linkData) {
      const discordUser = await discord.users.fetch(linkData.discord_id);
      await discordUser.send(`🔑 Ton code secret JoyBoy : **${code}** (valable 5 minutes) ! Entre le sur le site pour vendre tes doublons !`);
      envoyeDiscord = true;
    }
  } catch (err) {
    console.log('Erreur Discord DM:', err.message);
  }

  if (envoyeDiscord) {
    client.say(channel, `🔑 ${username} ton code secret t'a été envoyé en DM Discord !`);
  } else {
    client.say(channel, `🔑 ${username} tape d'abord !lierdiscord [ton_id_discord] pour lier ton compte Discord !`);
  }
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
    const liste = top.map((r, i) => `${medals[i]} ${r.username}: ${r.berrys.toLocaleString()} Brise`).join(' | ');
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
    client.say(channel, `💰 ${targetUser} reçoit ${nombre.toLocaleString()} Brise ! Sa prime est maintenant de ${primeActuelle.berrys.toLocaleString()} Brise ! 🏴‍☠️`);
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
    client.say(channel, `💸 ${targetUser} perd ${nombre.toLocaleString()} Brise ! Sa prime est maintenant de ${prime.berrys.toLocaleString()} Brise !`);
    return;
  }

// !fruit
if (msg === '!fruit') {
if (Date.now() - dernierFruitGlobal < COOLDOWN_FRUIT_GLOBAL) {
  const restant = Math.ceil((COOLDOWN_FRUIT_GLOBAL - (Date.now() - dernierFruitGlobal)) / 1000);
  client.say(channel, `⏳ Une animation est en cours ! Attends encore ${restant} seconde(s) ! 🍎`);
  return;
}
if (cooldownsFruit[username] && Date.now() - cooldownsFruit[username] < COOLDOWN_FRUIT_USER) {
  const restant = Math.ceil((COOLDOWN_FRUIT_USER - (Date.now() - cooldownsFruit[username])) / 60000);
  client.say(channel, `⏳ ${username}, tu dois attendre encore ${restant} minute(s) avant de relancer !fruit ! 🍎`);
  return;
}
dernierFruitGlobal = Date.now();
cooldownsFruit[username] = Date.now();
    const fruits = {
    'Ultime':     { chance: 1,  liste: ['Nika-Nika', 'Oni-Oni', 'Roger-Roger', 'Aka-Aka'] },
    'Mythique':   { chance: 2,  liste: ['Mochi-Mochi', 'Gum-Gum', 'Goro-Goro', 'Inu-Inu', 'Uo-Uo', 'Ope-Ope', 'Neko-Neko', 'Soru-Soru', 'Yami-Yami'] },
    'Légendaire': { chance: 5,  liste: ['Mera-Mera', 'Toshi-Toshi', 'Mero-Mero', 'Jiki-Jiki', 'Magu-Magu', 'Hie-Hie', 'Pika-Pika', 'Gura-Gura', 'Nikyu-Nikyu'] },
    'Épique':     { chance: 10, liste: ['Moku-Moku', 'Uta-Uta', 'Suna-Suna', 'Hana-Hana', 'Ito-Ito', 'Hito-Hito', 'Tsuchi-Tsuchi', 'Ushi-Ushi'] },
    'Rare':       { chance: 27, liste: ['Yomi-Yomi', 'Hobi-Hobi', 'Bara-Bara', 'Horo-Horo', 'Doru-Doru', 'Clank-Clank', 'Hito-Hito'] },
    'Commun':     { chance: 55, liste: ['Bomu-Bomu', 'Seiryu', 'Sube-Sube', 'Baku-Baku'] }
  };

  // Vérifier si assez de Brise
  const primeRow = db.prepare('SELECT berrys FROM primes WHERE username = ?').get(username.toLowerCase());
  if (!primeRow || primeRow.berrys < 500) {
    client.say(channel, `❌ ${username} tu n'as pas assez de Brise ! Il faut 500 Brise pour tenter ta chance ! 🍎`);
    return;
  }

  // Vérifier si déjà utilisé ce stream
  const dernierFruit = db.prepare('SELECT fruit, timestamp FROM fruits_stream WHERE username = ?').get(username.toLowerCase());
if (dernierFruit && Date.now() - dernierFruit.timestamp < 0) {
  const restant = Math.ceil((300000 - (Date.now() - dernierFruit.timestamp)) / 60000);
  client.say(channel, `⏳ ${username} attends encore ${restant} minute(s) avant de retenter ta chance ! 🍎`);
  return;
}

  // Tirer la rareté
  const rand = Math.random() * 100;
  let rarete = 'Commun';
  if (rand < 0.5) rarete = 'Ultime';
  else if (rand < 2) rarete = 'Mythique';
  else if (rand < 7) rarete = 'Légendaire';
  else if (rand < 17) rarete = 'Épique';
  else if (rand < 40) rarete = 'Rare'; 

  // Tirer le fruit
  const liste = fruits[rarete].liste;
  const fruit = liste[Math.floor(Math.random() * liste.length)];

  // Déduire les Brise
  db.prepare('UPDATE primes SET berrys = berrys - 500 WHERE username = ?').run(username.toLowerCase());
  const newPrime = db.prepare('SELECT berrys FROM primes WHERE username = ?').get(username.toLowerCase());
  supabase.from('primes').upsert({ username: username.toLowerCase(), berrys: newPrime.berrys, derniermessage: 0, derniereprime: 0 }).then();

  // Sauvegarder dans la collection
  db.prepare('INSERT OR REPLACE INTO fruits_stream (username, fruit, timestamp) VALUES (?, ?, ?)').run(username.toLowerCase(), fruit, Date.now());
  supabase.from('collection').insert({ username: username.toLowerCase(), fruit, rarete }).then();

  // Emojis par rareté
  const emojis = { 'Ultime': '👑', 'Mythique': '🔱', 'Légendaire': '⭐', 'Épique': '💜', 'Rare': '💙', 'Commun': '🟢' };

// Animation OBS fruit
try {
  await obs.call('SetInputSettings', {
    inputName: 'fruit_animation',
   inputSettings: { url: `https://joyboybot-web.onrender.com/animation?fruit=${encodeURIComponent(fruit)}&rarete=${encodeURIComponent(rarete.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))}` }
  });
  const itemId = await obs.call('GetSceneItemId', { sceneName: 'Alertes', sourceName: 'fruit_animation' }).then(r => r.sceneItemId);
  await obs.call('SetSceneItemEnabled', { sceneName: 'Alertes', sceneItemId: itemId, sceneItemEnabled: true });

// Son machine à sous
try {
  const sonId = await obs.call('GetSceneItemId', { sceneName: 'Alertes', sourceName: 'son_fruit' }).then(r => r.sceneItemId);
  await obs.call('TriggerMediaInputAction', { inputName: 'son_fruit', mediaAction: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_RESTART' });
  await obs.call('SetSceneItemEnabled', { sceneName: 'Alertes', sceneItemId: sonId, sceneItemEnabled: true });
  setTimeout(async () => {
    const id = await obs.call('GetSceneItemId', { sceneName: 'Alertes', sourceName: 'son_fruit' }).then(r => r.sceneItemId);
    await obs.call('SetSceneItemEnabled', { sceneName: 'Alertes', sceneItemId: id, sceneItemEnabled: false });
  }, 6000);
} catch (err) {
  console.log('Erreur son:', err.message);
}

  setTimeout(async () => {
    const id = await obs.call('GetSceneItemId', { sceneName: 'Alertes', sourceName: 'fruit_animation' }).then(r => r.sceneItemId);
    await obs.call('SetSceneItemEnabled', { sceneName: 'Alertes', sceneItemId: id, sceneItemEnabled: false });
  }, 8000);
} catch (err) {
  console.log('Erreur OBS fruit:', err.message);
}

  const chances = { 'Ultime': '0.5%', 'Mythique': '1.5%', 'Légendaire': '5%', 'Épique': '10%', 'Rare': '23%', 'Commun': '60%' };
client.say(channel, `🍎 ${username} croque dans un fruit mystérieux... ${emojis[rarete]} ${fruit} no Mi ! Rareté : ${rarete} (${chances[rarete]} de chance) ! Il reste ${newPrime.berrys.toLocaleString()} Brise dans ta poche ! 🏴‍☠️`);
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
  client.say(channel, `🏴‍☠️ ${username} a rejoint le Grand Line ! +10 000 Brise ! Total : ${row.subs} sub(s) !`);
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
  client.say(channel, `🎁 ${username} a offert un sub à ${recipient} ! +10 000 Brise pour ${username} ! Total : ${row.subs} sub(s) !`);
  if ([10, 25, 50, 80].includes(row.subs)) {
    client.say(channel, `🎉 ${username} atteint le palier ${row.subs} subs ! Tape !dispo pour choisir ton personnage !`);
  }
});
 
console.log('JoyBoyBot est en ligne ! 🏴‍☠️');
 