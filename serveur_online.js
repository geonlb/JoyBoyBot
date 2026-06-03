require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const REWARD_ID = '5b62a20f-6679-402f-b5de-f307c3224eb8';
const BROADCASTER_ID = '122593539';
const TWITCH_CLIENT_ID = '4wl3wc4mnurd77ctzhl8s8v6gak6yl';

const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname)));
app.use('/fruits', express.static(path.join(__dirname, 'fruits')));
app.use('/persos', express.static(path.join(__dirname, 'persos')));

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://usbsivjrputwwrohezwk.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzYnNpdmpycHV0d3dyb2hlendrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDExOTM1MSwiZXhwIjoyMDk1Njk1MzUxfQ.UNf-rdDBD0MocGrQW4tzNAW3ksqgR__Zg3b1PwsDlPs';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const CLIENT_ID = process.env.CLIENT_ID || '4wl3wc4mnurd77ctzhl8s8v6gak6yl';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || '9w76c932djulze7uhrqdwjbk4d5fnn';

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JoyBoy Bot - NeyLaBrise</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Exo+2:wght@300;400;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #050510; min-height: 100vh; font-family: 'Exo 2', sans-serif; color: white; overflow-x: hidden; background-image: url('/persos/fond_site.png'); background-size: cover; background-position: center; background-attachment: fixed; }
    body::before { content: ''; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(5,5,16,0.75); pointer-events: none; }
    .container { max-width: 1000px; margin: 0 auto; padding: 50px 20px; position: relative; z-index: 1; }
.header { text-align: center; margin-bottom: 60px; }
.logo { width: 200px; height: 200px; object-fit: contain; margin-bottom: 20px; filter: drop-shadow(0 0 20px rgba(138,43,226,0.8)); }
.title { font-family: 'Cinzel', serif; font-size: 42px; font-weight: 900; color: #ffffff; letter-spacing: 6px; text-shadow: 0 0 30px rgba(138,43,226,0.8); line-height: 1.2; }
.subtitle { font-size: 14px; color: #87ceeb; letter-spacing: 5px;
.divider { width: 300px; height: 1px; background: linear-gradient(to right, transparent, #8a2be2, #87ceeb, #8a2be2, transparent); margin: 20px auto; }
.search-bar { display: flex; justify-content: center; gap: 10px; margin-bottom: 50px; }
.search-input { background: rgba(0,0,0,0.7); border: 1px solid #8a2be2; color: white; padding: 12px 20px; border-radius: 25px; font-size: 14px; width: 280px; outline: none; font-family: 'Exo 2', sans-serif; backdrop-filter: blur(10px); }
.search-input::placeholder { color: #666; }
.search-input:focus { border-color: #87ceeb; box-shadow: 0 0 15px rgba(135,206,235,0.3); }
.search-btn { background: linear-gradient(135deg, #8a2be2, #4169e1); color: white; border: none; padding: 12px 25px; border-radius: 25px; font-size: 14px; font-weight: bold; cursor: pointer; font-family: 'Exo 2', sans-serif; letter-spacing: 1px; transition: all 0.3s; }
.search-btn:hover { box-shadow: 0 0 25px rgba(138,43,226,0.6); transform: scale(1.05); }
.cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin-bottom: 40px; }
.card { background: rgba(0,0,0,0.75); border: 1px solid rgba(138,43,226,0.4); border-radius: 16px; padding: 30px 25px; text-align: center; cursor: pointer; transition: all 0.3s; text-decoration: none; color: white; display: block; position: relative; overflow: hidden; backdrop-filter: blur(10px); }
.card:hover { transform: translateY(-8px); border-color: #8a2be2; box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 0 25px rgba(138,43,226,0.4); }
.card-icon { font-size: 50px; margin-bottom: 15px; }
.card-title { font-family: 'Cinzel', serif; font-size: 20px; letter-spacing: 3px; margin-bottom: 10px; color: #87ceeb; }
.card-desc { font-size: 13px; color: #aaa; line-height: 1.6; }
.card-badge { position: absolute; top: 15px; right: 15px; background: linear-gradient(135deg, #8a2be2, #4169e1); color: white; font-size: 10px; font-weight: bold; padding: 3px 8px; border-radius: 10px; letter-spacing: 1px; }
.footer { text-align: center; font-size: 12px; color: #87ceeb; letter-spacing: 3px; margin-top: 40px; opacity: 0.6; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="/persos/teamnlb.png" class="logo" alt="NLB">
      <div class="subtitle">Team NLB — Grand Line</div>
      <div class="divider"></div>
    </div>

    <div class="search-bar">
      <input type="text" class="search-input" id="pseudo" placeholder="Entre ton pseudo Twitch...">
      <button class="search-btn" onclick="goCollection()">&#x1F50D; Ma Collection</button>
    </div>

    <div class="cards-grid">
      <a href="/leaderboard" class="card" style="--color:#f39c12;--glow:rgba(243,156,18,0.3);">
        <div class="card-badge">TOP 20</div>
        <div class="card-icon">&#x1F3C6;</div>
        <div class="card-title">CLASSEMENT</div>
        <div class="card-desc">Découvre les meilleurs collectionneurs de la Grand Line !</div>
      </a>
      <a href="/grandline" class="card" style="--color:#e74c3c;--glow:rgba(231,76,60,0.3);">
        <div class="card-icon">&#x1F5FA;</div>
        <div class="card-title">GRAND LINE</div>
        <div class="card-desc">Explore les factions et les équipages de NeyLaBrise !</div>
      </a>
      <a href="#" onclick="goWanted()" class="card" style="--color:#d4b896;--glow:rgba(212,184,150,0.3);">
        <div class="card-icon">&#x1F3F4;</div>
        <div class="card-title">WANTED</div>
        <div class="card-desc">Consulte ton avis de recherche et ta prime en Berrys !</div>
      </a>
    </div>

    <div class="footer">
      <p>&#x1F3F4; NeyLaBrise — Mis a jour en temps reel &#x1F3F4;</p>
    </div>
  </div>

  <script>
    function goCollection() {
      const pseudo = document.getElementById('pseudo').value.trim();
      if (!pseudo) { alert('Entre ton pseudo Twitch !'); return; }
      window.location = '/collection/' + pseudo;
    }
    function goWanted() {
      const pseudo = document.getElementById('pseudo').value.trim();
      if (!pseudo) { alert('Entre ton pseudo Twitch !'); return; }
      window.location = '/prime/' + pseudo;
    }
    document.getElementById('pseudo').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') goCollection();
    });
  </script>
</body>
</html>`);
});

app.get('/prime/:username', async (req, res) => {
  const username = req.params.username.toLowerCase();
  const { data: primeData } = await supabase.from('primes').select('berrys').eq('username', username).single();
  const { data: membreData } = await supabase.from('membres').select('personnage').eq('username', username).single();
  const { data: compteurData } = await supabase.from('compteur').select('subs').eq('username', username).single();
  let avatar = 'https://static-cdn.jtvnw.net/user-default-pictures-uv/ebe4cd89-b4f4-4cd9-adac-2f30151b4209-profile_image-300x300.png';
  try {
    const r = await axios.get('https://api.twitch.tv/helix/users?login=' + username, { headers: { 'Client-ID': CLIENT_ID, 'Authorization': 'Bearer ' + ACCESS_TOKEN } });
    if (r.data.data.length > 0) avatar = r.data.data[0].profile_image_url;
  } catch (e) {}
  const berrys = primeData ? primeData.berrys : 0;
  const personnage = membreData ? membreData.personnage : 'Aucun';
  const subs = compteurData ? compteurData.subs : 0;
  res.send('<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Wanted - ' + username + '</title><style>@import url(\'https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap\');*{margin:0;padding:0;box-sizing:border-box;}body{background:#1a1a2e;display:flex;justify-content:center;align-items:center;min-height:100vh;}.wanted{background:linear-gradient(135deg,#e8d5a3,#d4b896,#c9a97d,#d4b896,#e8d5a3);width:400px;padding:25px 20px;text-align:center;position:relative;box-shadow:0 0 50px rgba(0,0,0,.9),inset 0 0 80px rgba(0,0,0,.25);border:4px solid #1a1a1a;}.wanted::before{content:\'\';position:absolute;top:8px;left:8px;right:8px;bottom:8px;border:2px solid #1a1a1a;pointer-events:none;}.texture{position:absolute;top:0;left:0;right:0;bottom:0;background-image:radial-gradient(ellipse at 20% 30%,rgba(0,0,0,.08) 0%,transparent 50%);pointer-events:none;z-index:1;}.content{position:relative;z-index:2;}.corner{position:absolute;font-size:22px;color:#1a1a1a;opacity:.6;}.corner.tl{top:14px;left:14px;}.corner.tr{top:14px;right:14px;}.corner.bl{bottom:14px;left:14px;}.corner.br{bottom:14px;right:14px;}.title{font-family:\'Oswald\',sans-serif;font-size:72px;color:#0d0d0d;letter-spacing:6px;line-height:1;}.subtitle{font-size:13px;color:#1a1a1a;letter-spacing:6px;margin-bottom:15px;border-top:2px solid #1a1a1a;border-bottom:2px solid #1a1a1a;padding:5px 0;font-family:Georgia,serif;}.avatar{width:210px;height:210px;border:4px solid #1a1a1a;object-fit:cover;display:block;margin:0 auto 12px;filter:sepia(20%) contrast(105%);}.username{font-family:\'Oswald\',sans-serif;font-size:30px;color:#0d0d0d;margin:8px 0 4px;letter-spacing:4px;text-transform:uppercase;}.personnage{font-size:12px;color:#2a1a0a;margin-bottom:12px;font-style:italic;font-family:Georgia,serif;}.divider{border:none;border-top:2px solid #1a1a1a;margin:8px 30px;}.bounty-label{font-size:11px;color:#1a1a1a;letter-spacing:6px;text-transform:uppercase;margin-top:8px;font-family:Georgia,serif;}.bounty{font-family:\'Oswald\',sans-serif;font-size:42px;color:#0d0d0d;letter-spacing:2px;}.bounty-unit{font-size:13px;color:#2a1a0a;letter-spacing:5px;margin-bottom:10px;font-family:Georgia,serif;}.footer{font-size:10px;color:#1a1a1a;letter-spacing:3px;border-top:2px solid #1a1a1a;padding-top:8px;margin-top:5px;font-family:Georgia,serif;text-transform:uppercase;}</style></head><body><div class="wanted"><div class="texture"></div><span class="corner tl">&#9875;</span><span class="corner tr">&#9875;</span><span class="corner bl">&#9875;</span><span class="corner br">&#9875;</span><div class="content"><div class="title">WANTED</div><div class="subtitle">DEAD OR ALIVE</div><img class="avatar" src="' + avatar + '" alt="' + username + '"><div class="username">' + username + '</div><div class="personnage">' + personnage + ' - ' + subs + ' sub(s)</div><hr class="divider"><div class="bounty-label">Prime</div><div class="bounty">' + berrys.toLocaleString() + '</div><div class="bounty-unit">BERRYS</div><div class="footer">NeyLaBrise - Grand Line</div></div></div></body></html>');
});

app.get('/grandline', async (req, res) => {
  const { data: membres } = await supabase.from('membres').select('*');
  const { data: primes } = await supabase.from('primes').select('*');
  const avatars = {};
  for (const m of (membres || [])) {
    try {
      const r = await axios.get('https://api.twitch.tv/helix/users?login=' + m.username, { headers: { 'Client-ID': CLIENT_ID, 'Authorization': 'Bearer ' + ACCESS_TOKEN } });
      if (r.data.data.length > 0) avatars[m.username] = r.data.data[0].profile_image_url;
    } catch (e) { avatars[m.username] = 'https://static-cdn.jtvnw.net/user-default-pictures-uv/ebe4cd89-b4f4-4cd9-adac-2f30151b4209-profile_image-300x300.png'; }
  }
  const factions = [
    { id: 'equipage', nom: 'Equipage de Luffy', couleur: '#e74c3c', bg: '#2c0a0a' },
    { id: 'bigmom', nom: 'Equipage de Big Mom', couleur: '#e91e8c', bg: '#2c0a1f' },
    { id: 'empereurs', nom: 'Les Empereurs', couleur: '#f39c12', bg: '#2c1a00' },
    { id: 'grandscorsaires', nom: 'Les Grands Corsaires', couleur: '#9b59b6', bg: '#1a0a2c' },
    { id: 'marine', nom: 'La Marine', couleur: '#3498db', bg: '#0a1a2c' },
    { id: 'antagonistes', nom: 'Les Antagonistes', couleur: '#e74c3c', bg: '#1a0000' },
    { id: 'allies', nom: 'Les Allies', couleur: '#2ecc71', bg: '#0a2c1a' }
  ];
  const factionCards = factions.map(f => {
    const fm = (membres || []).filter(m => m.faction === f.id);
    const cards = fm.map(m => {
      const prime = (primes || []).find(p => p.username === m.username);
      const b = prime ? prime.berrys.toLocaleString() : '0';
      const av = avatars[m.username] || '';
      return '<div class="member-card"><img src="' + av + '" alt="' + m.username + '" class="member-avatar"><div class="member-info"><div class="member-name">' + m.username + '</div><div class="member-perso">' + m.personnage + '</div><div class="member-prime">&#x1F4B0; ' + b + ' Berrys</div></div></div>';
    }).join('');
    return '<div class="faction-card" style="border-color:' + f.couleur + ';background:' + f.bg + ';"><div class="faction-title" style="color:' + f.couleur + ';">' + f.nom + '</div><div class="faction-count">' + fm.length + ' membre(s)</div><div class="members-grid">' + (cards || '<div class="empty">Aucun membre</div>') + '</div></div>';
  }).join('');
  res.send('<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Grand Line</title><style>@import url(\'https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto:wght@300;400&display=swap\');*{margin:0;padding:0;box-sizing:border-box;}body{background:#0a0a1a;min-height:100vh;padding:30px 20px;font-family:\'Roboto\',sans-serif;color:white;}.header{text-align:center;margin-bottom:40px;}.header h1{font-family:\'Oswald\',sans-serif;font-size:48px;letter-spacing:8px;color:#f39c12;text-shadow:0 0 30px rgba(243,156,18,.5);}.divider{width:200px;height:2px;background:linear-gradient(to right,transparent,#f39c12,transparent);margin:15px auto;}.header p{font-size:14px;color:#888;letter-spacing:3px;}.factions-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:25px;max-width:1400px;margin:0 auto;}.faction-card{border:2px solid;border-radius:12px;padding:20px;}.faction-title{font-family:\'Oswald\',sans-serif;font-size:22px;letter-spacing:3px;margin-bottom:5px;}.faction-count{font-size:12px;color:#888;letter-spacing:2px;margin-bottom:15px;border-bottom:1px solid rgba(255,255,255,.1);padding-bottom:10px;}.members-grid{display:flex;flex-direction:column;gap:10px;}.member-card{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.05);border-radius:8px;padding:10px;}.member-avatar{width:50px;height:50px;border-radius:50%;border:2px solid rgba(255,255,255,.2);object-fit:cover;}.member-info{flex:1;}.member-name{font-family:\'Oswald\',sans-serif;font-size:16px;}.member-perso{font-size:12px;color:#aaa;font-style:italic;}.member-prime{font-size:12px;color:#f39c12;}.empty{font-size:13px;color:#555;font-style:italic;text-align:center;padding:20px;}.footer{text-align:center;margin-top:40px;font-size:12px;color:#555;letter-spacing:3px;}</style></head><body><div class="header"><h1>GRAND LINE</h1><div class="divider"></div><p>CARTE DES EQUIPAGES - NEYLABRISE</p></div><div class="factions-grid">' + factionCards + '</div><div class="footer"><p>NeyLaBrise - Grand Line</p></div></body></html>');
});

app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));

app.post('/eventsub', async (req, res) => {
  const messageType = req.headers['twitch-eventsub-message-type'];
  if (messageType === 'webhook_callback_verification') return res.send(req.body.challenge);
  if (messageType === 'notification') {
    const event = req.body.event;
    if (event.reward.id === REWARD_ID) {
      const username = event.user_login.toLowerCase();
      const { data: c } = await supabase.from('compteur').select('subs').eq('username', username).single();
      const newSubs = c ? c.subs + 1 : 1;
      await supabase.from('compteur').upsert({ username, subs: newSubs });
      const { data: p } = await supabase.from('primes').select('berrys').eq('username', username).single();
      const newBerrys = p ? p.berrys + 5000 : 5000;
      await supabase.from('primes').upsert({ username, berrys: newBerrys, derniermessage: 0, derniereprime: 0 });
    }
  }
  res.sendStatus(200);
});

async function enregistrerEventSub() {
  try {
    const t = await axios.post('https://id.twitch.tv/oauth2/token', null, { params: { client_id: TWITCH_CLIENT_ID, client_secret: 'pher47e2e37jw51ygtxphw5dyjo5rq', grant_type: 'client_credentials' } });
    await axios.post('https://api.twitch.tv/helix/eventsub/subscriptions', { type: 'channel.channel_points_custom_reward_redemption.add', version: '1', condition: { broadcaster_user_id: BROADCASTER_ID, reward_id: REWARD_ID }, transport: { method: 'webhook', callback: 'https://joyboybot-web.onrender.com/eventsub', secret: 'joyboybotsecret123' } }, { headers: { 'Client-ID': TWITCH_CLIENT_ID, 'Authorization': 'Bearer ' + t.data.access_token, 'Content-Type': 'application/json' } });
    console.log('EventSub enregistre !');
  } catch (err) { console.log('EventSub erreur:', err.response?.data || err.message); }
}
enregistrerEventSub();

app.get('/auth/twitch', (req, res) => {
  const username = req.query.username;
  res.redirect('https://id.twitch.tv/oauth2/authorize?client_id=' + CLIENT_ID + '&redirect_uri=https://joyboybot-web.onrender.com/auth/callback&response_type=code&scope=user:read:email&state=' + username);
});

app.get('/auth/callback', async (req, res) => {
  const { code, state } = req.query;
  try {
    const t = await axios.post('https://id.twitch.tv/oauth2/token', null, { params: { client_id: CLIENT_ID, client_secret: 'pher47e2e37jw51ygtxphw5dyjo5rq', code, grant_type: 'authorization_code', redirect_uri: 'https://joyboybot-web.onrender.com/auth/callback' } });
    const u = await axios.get('https://api.twitch.tv/helix/users', { headers: { 'Client-ID': CLIENT_ID, 'Authorization': 'Bearer ' + t.data.access_token } });
    const twitchUsername = u.data.data[0].login;
    res.redirect('/collection/' + twitchUsername + '?verified=true&owner=' + twitchUsername);
  } catch (err) { res.redirect('/collection/' + state + '?error=auth'); }
});

async function verifierAchievements(username, collection, fruitsGroupes) {
  const { data: existing } = await supabase.from('achievements').select('achievement').eq('username', username);
  const dejaobtenu = new Set((existing || []).map(a => a.achievement));
  const nouveaux = [];

  const tousLesFruits = {
    'Ultime':     ['Nika-Nika', 'Oni-Oni', 'Roger-Roger', 'Aka-Aka'],
    'Mythique':   ['Mochi-Mochi', 'Gum-Gum', 'Goro-Goro', 'Inu-Inu', 'Uo-Uo', 'Ope-Ope', 'Neko-Neko', 'Soru-Soru', 'Yami-Yami'],
    'Legendaire': ['Mera-Mera', 'Toshi-Toshi', 'Mero-Mero', 'Jiki-Jiki', 'Magu-Magu', 'Hie-Hie', 'Pika-Pika', 'Gura-Gura', 'Nikyu-Nikyu'],
    'Epique':     ['Moku-Moku', 'Uta-Uta', 'Suna-Suna', 'Hana-Hana', 'Ito-Ito', 'Tsuchi-Tsuchi', 'Ushi-Ushi'],
    'Rare':       ['Yomi-Yomi', 'Hobi-Hobi', 'Bara-Bara', 'Horo-Horo', 'Doru-Doru', 'Clank-Clank', 'Hito-Hito'],
    'Commun':     ['Bomu-Bomu', 'Seiryu', 'Sube-Sube', 'Baku-Baku']
  };

  const fruitsObtenus = new Set(Object.keys(fruitsGroupes));
  const totalFruits = collection.length;

  const checks = [
    { id: 'premier_pas', condition: totalFruits >= 1, emoji: '🍎', nom: 'Premier Pas', desc: 'Obtenir son premier fruit' },
    { id: 'chanceux', condition: Object.values(fruitsGroupes).some(f => f.rarete === 'Mythique'), emoji: '🔱', nom: 'Chanceux', desc: 'Obtenir un fruit Mythique' },
    { id: 'elu', condition: Object.values(fruitsGroupes).some(f => f.rarete === 'Ultime'), emoji: '👑', nom: 'Elu', desc: 'Obtenir un fruit Ultime' },
    { id: 'collection_commun', condition: tousLesFruits['Commun'].every(f => fruitsObtenus.has(f)), emoji: '💚', nom: 'Collection Commun', desc: 'Avoir tous les fruits Commun' },
    { id: 'chasseur_rare', condition: tousLesFruits['Rare'].every(f => fruitsObtenus.has(f)), emoji: '💙', nom: 'Chasseur Rare', desc: 'Avoir tous les fruits Rare' },
    { id: 'maitre_epique', condition: tousLesFruits['Epique'].every(f => fruitsObtenus.has(f)), emoji: '💜', nom: 'Maitre Epique', desc: 'Avoir tous les fruits Epique' },
    { id: 'legende', condition: tousLesFruits['Legendaire'].every(f => fruitsObtenus.has(f)), emoji: '⭐', nom: 'Legende', desc: 'Avoir tous les fruits Legendaire' },
    { id: 'mythique_complet', condition: tousLesFruits['Mythique'].every(f => fruitsObtenus.has(f)), emoji: '🔱', nom: 'Mythique Complet', desc: 'Avoir tous les fruits Mythique' },
    { id: 'vrai_roi', condition: tousLesFruits['Ultime'].every(f => fruitsObtenus.has(f)), emoji: '👑', nom: 'Le Vrai Roi des Pirates', desc: 'Avoir tous les fruits Ultime' },
  ];

  for (const check of checks) {
    if (check.condition && !dejaobtenu.has(check.id)) {
      await supabase.from('achievements').insert({ username, achievement: check.id });
      nouveaux.push(check);
    }
  }

  return nouveaux;
}

app.post('/coffre', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Manque username' });

  // Vérifier cooldown coffre
  const { data: coffreData } = await supabase.from('codes_temp').select('expire').eq('username', username + '_coffre').single();
  //if (coffreData && Date.now() < coffreData.expire) {
 // const restant = Math.ceil((coffreData.expire - Date.now()) / 60000);
  //  return res.status(400).json({ error: 'Attends encore ' + restant + ' minute(s) avant d\'ouvrir un nouveau coffre !' });
  // }

  // Vérifier les Berrys
  const { data: primeData } = await supabase.from('primes').select('berrys').eq('username', username).single();
  if (!primeData || primeData.berrys < 2000) {
    return res.status(400).json({ error: 'Pas assez de Berrys ! Il faut 2000 Berrys pour ouvrir un coffre !' });
  }
  // Tirer 3 fruits
  const fruits = {
    'Ultime':     { chance: 0.5, liste: ['Nika-Nika', 'Oni-Oni', 'Roger-Roger', 'Aka-Aka'] },
    'Mythique':   { chance: 1.5, liste: ['Mochi-Mochi', 'Gum-Gum', 'Goro-Goro', 'Inu-Inu', 'Uo-Uo', 'Ope-Ope', 'Neko-Neko', 'Soru-Soru', 'Yami-Yami'] },
    'Legendaire': { chance: 5,   liste: ['Mera-Mera', 'Toshi-Toshi', 'Mero-Mero', 'Jiki-Jiki', 'Magu-Magu', 'Hie-Hie', 'Pika-Pika', 'Gura-Gura', 'Nikyu-Nikyu'] },
    'Epique':     { chance: 10,  liste: ['Moku-Moku', 'Uta-Uta', 'Suna-Suna', 'Hana-Hana', 'Ito-Ito', 'Tsuchi-Tsuchi', 'Ushi-Ushi'] },
    'Rare':       { chance: 23,  liste: ['Yomi-Yomi', 'Hobi-Hobi', 'Bara-Bara', 'Horo-Horo', 'Doru-Doru', 'Clank-Clank', 'Hito-Hito'] },
    'Commun':     { chance: 60,  liste: ['Bomu-Bomu', 'Seiryu', 'Sube-Sube', 'Baku-Baku'] }
  };

  const tirerFruit = () => {
    const rand = Math.random() * 100;
    let rarete = 'Commun';
    if (rand < 0.5) rarete = 'Ultime';
    else if (rand < 2) rarete = 'Mythique';
    else if (rand < 7) rarete = 'Legendaire';
    else if (rand < 17) rarete = 'Epique';
    else if (rand < 40) rarete = 'Rare';
    const liste = fruits[rarete].liste;
    const fruit = liste[Math.floor(Math.random() * liste.length)];
    return { fruit, rarete };
  };

  const loot = [tirerFruit(), tirerFruit(), tirerFruit()];

  // Déduire les Berrys
  const newBerrys = primeData.berrys - 2000;
  // Sauvegarder le cooldown coffre
  await supabase.from('codes_temp').upsert({ username: username + '_coffre', code: 'coffre', expire: Date.now() + 1200000 });
  await supabase.from('primes').upsert({ username, berrys: newBerrys, derniermessage: 0, derniereprime: 0 });

  // Sauvegarder les fruits
  for (const { fruit, rarete } of loot) {
    await supabase.from('collection').insert({ username, fruit, rarete });
  }

  const { data: allFruits } = await supabase.from('collection').select('*').eq('username', username);
  const fruitsG = {};
  (allFruits || []).forEach(f => {
    let r = (f.rarete || 'Commun').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (fruitsG[f.fruit]) fruitsG[f.fruit].count += 1;
    else fruitsG[f.fruit] = { ...f, rarete: r, count: 1 };
  });
  const nouveauxAchievements = await verifierAchievements(username, allFruits || [], fruitsG);
  res.json({ success: true, loot, berrys: newBerrys, achievements: nouveauxAchievements });
});

app.post('/vendre', async (req, res) => {
  const { username, fruit, rarete } = req.body;
  if (!username || !fruit || !rarete) return res.status(400).json({ error: 'Manque des parametres' });
  const prix = { 'Commun': 50, 'Rare': 100, 'Epique': 150, 'Legendaire': 500, 'Mythique': 1000, 'Ultime': 10000 };
  const valeur = prix[rarete] || 50;
  const { data: fruitsUser } = await supabase.from('collection').select('id').eq('username', username).eq('fruit', fruit);
  if (!fruitsUser || fruitsUser.length < 2) return res.status(400).json({ error: 'Pas de doublon a vendre !' });
  await supabase.from('collection').delete().eq('id', fruitsUser[0].id);
  const { data: primeData } = await supabase.from('primes').select('berrys').eq('username', username).single();
  const newBerrys = (primeData ? primeData.berrys : 0) + valeur;
  await supabase.from('primes').upsert({ username, berrys: newBerrys, derniermessage: 0, derniereprime: 0 });
  res.json({ success: true, berrys: newBerrys, valeur });
});

app.get('/collection/:username', async (req, res) => {
  const username = req.params.username.toLowerCase();
  const isOwner = req.query.verified === 'true' && req.query.owner === username;
  let avatar = 'https://static-cdn.jtvnw.net/user-default-pictures-uv/ebe4cd89-b4f4-4cd9-adac-2f30151b4209-profile_image-300x300.png';
  try {
    const r = await axios.get('https://api.twitch.tv/helix/users?login=' + username, { headers: { 'Client-ID': CLIENT_ID, 'Authorization': 'Bearer ' + ACCESS_TOKEN } });
    if (r.data.data.length > 0) avatar = r.data.data[0].profile_image_url;
  } catch (e) {}
  const { data: fruits } = await supabase.from('collection').select('*').eq('username', username).order('obtenu_le', { ascending: false });
  const { data: achievementsData } = await supabase.from('achievements').select('*').eq('username', username);
  const { data: primeData } = await supabase.from('primes').select('berrys').eq('username', username).single();
  const berrys = primeData ? primeData.berrys : 0;

  const rareteConfig = {
    'Ultime':     { emoji: '&#x1F451;', couleur: '#ffffff', bg: '#0d0d0d', glow: 'rgba(255,255,255,0.6)' },
    'Mythique':   { emoji: '&#x1F531;', couleur: '#cc0000', bg: '#1a0000', glow: 'rgba(200,0,0,0.5)' },
    'Legendaire': { emoji: '&#x2B50;',  couleur: '#ffd700', bg: '#2a2000', glow: 'rgba(255,215,0,0.5)' },
    'Epique':     { emoji: '&#x1F49C;', couleur: '#9b59b6', bg: '#1a0a2a', glow: 'rgba(155,89,182,0.5)' },
    'Rare':       { emoji: '&#x1F499;', couleur: '#3498db', bg: '#0a1a2a', glow: 'rgba(52,152,219,0.5)' },
    'Commun':     { emoji: '&#x1F7E2;', couleur: '#2ecc71', bg: '#0a2a0a', glow: 'rgba(46,204,113,0.3)' }
  };

  const fruitsGroupes = {};
  (fruits || []).forEach(f => {
    const key = f.fruit;
    let rarete = (f.rarete || 'Commun').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (rarete === 'Legendaire' || rarete === 'Legendaire') rarete = 'Legendaire';
    if (rarete === 'Epique') rarete = 'Epique';
    if (fruitsGroupes[key]) { fruitsGroupes[key].count += 1; }
    else { fruitsGroupes[key] = { ...f, rarete, count: 1 }; }
  });

  const stats = {};
  Object.values(fruitsGroupes).forEach(f => { stats[f.rarete] = (stats[f.rarete] || 0) + f.count; });

  const rareteOrder = ['Ultime', 'Mythique', 'Legendaire', 'Epique', 'Rare', 'Commun'];
  const tousLesFruits = {
    'Ultime':     ['Nika-Nika', 'Oni-Oni', 'Roger-Roger', 'Aka-Aka'],
    'Mythique':   ['Mochi-Mochi', 'Gum-Gum', 'Goro-Goro', 'Inu-Inu', 'Uo-Uo', 'Ope-Ope', 'Neko-Neko', 'Soru-Soru', 'Yami-Yami'],
    'Legendaire': ['Mera-Mera', 'Toshi-Toshi', 'Mero-Mero', 'Jiki-Jiki', 'Magu-Magu', 'Hie-Hie', 'Pika-Pika', 'Gura-Gura', 'Nikyu-Nikyu'],
    'Epique':     ['Moku-Moku', 'Uta-Uta', 'Suna-Suna', 'Hana-Hana', 'Ito-Ito', 'Tsuchi-Tsuchi', 'Ushi-Ushi'],
    'Rare':       ['Yomi-Yomi', 'Hobi-Hobi', 'Bara-Bara', 'Horo-Horo', 'Doru-Doru', 'Clank-Clank', 'Hito-Hito'],
    'Commun':     ['Bomu-Bomu', 'Seiryu', 'Sube-Sube', 'Baku-Baku']
  };
  const fruitPerso = {
    'Nika-Nika': 'nika', 'Oni-Oni': 'zoro', 'Roger-Roger': 'goldroger', 'Aka-Aka': 'shanks',
    'Gum-Gum': 'luffy', 'Mochi-Mochi': 'katakuri', 'Goro-Goro': 'enel', 'Ope-Ope': 'law',
    'Yami-Yami': 'barbenoire', 'Uo-Uo': 'kaido', 'Soru-Soru': 'bigmom', 'Neko-Neko': 'roblucci', 'Inu-Inu': 'yamato',
    'Mera-Mera': 'ace', 'Magu-Magu': 'akainu', 'Hie-Hie': 'aokiji', 'Pika-Pika': 'kizaru',
    'Gura-Gura': 'barbeblanche', 'Nikyu-Nikyu': 'kuma', 'Mero-Mero': 'hancock', 'Jiki-Jiki': 'kidd', 'Toshi-Toshi': 'bonney',
    'Suna-Suna': 'crocodile', 'Hana-Hana': 'robin', 'Ito-Ito': 'doflamingo', 'Moku-Moku': 'smoker',
    'Uta-Uta': 'uta', 'Tsuchi-Tsuchi': 'moria', 'Ushi-Ushi': 'dalton',
    'Yomi-Yomi': 'brook', 'Hobi-Hobi': 'sugar', 'Bara-Bara': 'baggy', 'Horo-Horo': 'perona',
    'Doru-Doru': 'galdino', 'Clank-Clank': 'douglasbullet', 'Hito-Hito': 'chopper',
    'Bomu-Bomu': 'ganzui', 'Seiryu': 'momonosuke', 'Sube-Sube': 'alvida', 'Baku-Baku': 'wapol'
  };

  const fruitsObtenus = new Set(Object.keys(fruitsGroupes));

  const etageres = rareteOrder.map(rarete => {
    const config = rareteConfig[rarete];
    const liste = tousLesFruits[rarete] || [];
    const fruitsHTML = liste.map(fruit => {
      const obtenu = fruitsObtenus.has(fruit);
      const count = fruitsGroupes[fruit] ? fruitsGroupes[fruit].count : 0;
      const perso = fruitPerso[fruit];
      const sellBtn = count > 1 && isOwner
        ? '<button class="sell-btn" onclick="vendre(\'' + username + '\', \'' + fruit + '\', \'' + rarete + '\')">Vendre 1</button>'
        : count > 1
          ? '<button class="sell-btn" style="opacity:0.4;cursor:not-allowed;" onclick="window.location=\'/auth/twitch?username=' + username + '\'">&#x1F512; Vendre</button>'
          : '';
      return '<div class="fruit-item">' +
        (count > 1 ? '<div class="fruit-count">' + count + 'x</div>' : '') +
        '<img src="/fruits/' + fruit + '.png" alt="' + fruit + '" style="' + (obtenu ? 'filter: drop-shadow(0 8px 16px ' + config.glow + ');' : 'filter: grayscale(100%) brightness(0.3);') + '">' +
        (perso ? '<div class="tooltip" style="border-color:' + config.couleur + ';"><img src="/persos/' + perso + '.png" alt="' + perso + '"><p style="color:' + config.couleur + ';">' + perso + '</p></div>' : '') +
        '<div class="fruit-label" style="color:' + (obtenu ? config.couleur : '#333') + ';">' + fruit + '</div>' +
        sellBtn + '</div>';
    }).join('');
    const nbObtenus = liste.filter(f => fruitsObtenus.has(f)).length;
    return '<div class="shelf-section"><div class="shelf-header" style="border-left:5px solid ' + config.couleur + ';background:' + config.bg + ';"><span class="shelf-emoji">' + config.emoji + '</span><span class="shelf-title" style="color:' + config.couleur + ';">' + rarete + '</span><span class="shelf-count">' + nbObtenus + '/' + liste.length + ' fruit(s)</span></div><div class="shelf"><div class="shelf-fruits">' + fruitsHTML + '</div><div class="shelf-board" style="background:' + config.couleur + ';"></div></div></div>';
  }).join('');

  const statsHTML = Object.entries(rareteConfig).map(([r, c]) => stats[r] ? '<span class="stat-badge" style="background:' + c.bg + ';color:' + c.couleur + ';border:1px solid ' + c.couleur + ';">' + c.emoji + ' ' + r + ': ' + stats[r] + '</span>' : '').join('');

  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Collection de ${username}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Exo+2:wght@300;400;700&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{background:#0a0a1a;min-height:100vh;padding:60px 20px 30px;font-family:'Roboto',sans-serif;color:white;}
    .auth-banner{position:fixed;top:0;left:0;right:0;
padding:8px;text-align:center;font-size:13px;z-index:1000;}
    .berrys-bag{position:fixed;top:50px;right:20px;background:rgba(10,10,26,.95);border:2px solid #f39c12;border-radius:15px;padding:12px 20px;text-align:center;z-index:999;box-shadow:0 0 20px rgba(243,156,18,.3);}
    .bag-amount{font-family:'Oswald',sans-serif;font-size:18px;color:#f39c12;}
    .bag-label{font-size:10px;color:#888;letter-spacing:2px;}
    .header{text-align:center;margin-bottom:40px;}
    .profile{display:flex;align-items:center;justify-content:center;gap:20px;margin-bottom:20px;}
    .profile img{width:80px;height:80px;border-radius:50%;border:3px solid #f39c12;}
    .profile-info h1{font-family:'Oswald',sans-serif;font-size:32px;color:#f39c12;letter-spacing:3px;}
    .berrys{font-size:18px;color:#f39c12;margin-top:5px;}
    .divider{width:200px;height:2px;background:linear-gradient(to right,transparent,#f39c12,transparent);margin:15px auto;}
    .stats{display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-bottom:30px;}
    .stat-badge{padding:5px 15px;border-radius:20px;font-size:13px;font-weight:bold;}
    .collection-title{font-family:'Oswald',sans-serif;font-size:24px;letter-spacing:4px;color:#f39c12;text-align:center;margin-bottom:40px;}
    .shelf-section{margin-bottom:40px;}
    .shelf-header{display:flex;align-items:center;gap:12px;padding:10px 20px;border-radius:8px 8px 0 0;}
    .shelf-emoji{font-size:22px;}
    .shelf-title{font-family:'Oswald',sans-serif;font-size:20px;letter-spacing:3px;flex:1;}
    .shelf-count{font-size:12px;opacity:.6;}
    .shelf{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-top:none;border-radius:0 0 8px 8px;padding:20px 20px 0;}
    .shelf-fruits{display:flex;flex-wrap:wrap;gap:20px;align-items:flex-end;padding-bottom:15px;min-height:140px;}
    .shelf-board{height:12px;margin:0 -20px;border-radius:0 0 8px 8px;opacity:.7;}
    .fruit-item{display:flex;flex-direction:column;align-items:center;gap:6px;position:relative;transition:transform .2s;cursor:pointer;}
    .fruit-item:hover{transform:translateY(-12px);}
    .fruit-item img{width:90px;height:90px;object-fit:contain;}
    .fruit-label{font-size:11px;text-align:center;max-width:90px;color:#ccc;}
    .fruit-count{position:absolute;top:-8px;right:-8px;background:#f39c12;color:#000;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:bold;}
    .tooltip{position:absolute;bottom:110%;left:50%;transform:translateX(-50%);background:rgba(5,5,20,.97);border:2px solid;border-radius:10px;padding:8px;width:120px;text-align:center;display:none;z-index:100;pointer-events:none;}
    .tooltip img{width:90px;height:90px;object-fit:contain;border-radius:8px;}
    .tooltip p{font-size:11px;margin-top:5px;font-weight:bold;text-transform:capitalize;}
    .fruit-item:hover .tooltip{display:block;}
    .sell-btn{margin-top:5px;background:rgba(243,156,18,.2);border:1px solid #f39c12;color:#f39c12;padding:3px 10px;border-radius:12px;font-size:10px;cursor:pointer;transition:all .2s;}
    .sell-btn:hover{background:#f39c12;color:#000;}
    .achievements-section { margin-bottom: 40px; text-align: center; }
    .livre-fermé { display: inline-block; cursor: pointer; transition: transform 0.3s; }
    .livre-fermé:hover { transform: scale(1.05); }
    .livre-cover { background: linear-gradient(135deg, #8B4513, #A0522D, #6B3410); border: 3px solid #f39c12; border-radius: 8px 20px 20px 8px; padding: 20px 30px; display: inline-flex; align-items: center; gap: 15px; box-shadow: -5px 5px 15px rgba(0,0,0,0.5), inset -3px 0 10px rgba(0,0,0,0.3); }
    .livre-spine { width: 8px; background: linear-gradient(135deg, #6B3410, #8B4513); border-radius: 4px; height: 60px; }
    .livre-title { font-family: 'Oswald', sans-serif; font-size: 20px; color: #f39c12; letter-spacing: 3px; text-shadow: 0 0 10px rgba(243,156,18,0.5); }
    .livre-icon { font-size: 28px; }
    .livre-subtitle { font-size: 11px; color: #c8a96e; letter-spacing: 2px; margin-top: 4px; }
    .achievements-grid { display: none; flex-wrap: wrap; gap: 15px; justify-content: center; margin-top: 25px; padding: 25px; background: #000000; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; }
.achievements-grid.ouvert { display: flex; }
.achievement-item { width: 160px; padding: 8px; border-radius: 12px; text-align: center; transition: transform 0.2s; background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.2); }
.achievement-item.obtenu { background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.6); box-shadow: 0 0 15px rgba(255,255,255,0.2); }
.achievement-item.obtenu:hover { transform: translateY(-5px); }
.achievement-item.locked { opacity: 0.3; }
    .achievement-emoji { font-size: 30px; margin-bottom: 8px; }
    .achievement-nom { font-family: 'Oswald', sans-serif; font-size: 13px; color: #f39c12; letter-spacing: 1px; margin-bottom: 5px; }
    .achievement-desc { font-size: 10px; color: #888; }
    .coffre-btn { background: linear-gradient(135deg, #1a0a2a, #2a1a3a); border: 2px solid #9b59b6; color: #9b59b6; padding: 12px 30px; border-radius: 25px; font-size: 16px; font-weight: bold; cursor: pointer; letter-spacing: 2px; transition: all 0.3s; box-shadow: 0 0 20px rgba(155,89,182,0.3); }
    .coffre-btn:hover { background: #9b59b6; color: white; box-shadow: 0 0 30px rgba(155,89,182,0.6); }
    .coffre-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); z-index: 9999; display: none; justify-content: center; align-items: center; flex-direction: column; }
    .coffre-overlay.active { display: flex; }
    .coffre-box { background: linear-gradient(145deg, #1a0a2a, #0d0d1a); border: 3px solid #9b59b6; border-radius: 20px; padding: 40px; text-align: center; max-width: 600px; width: 90%; box-shadow: 0 0 60px rgba(155,89,182,0.5); }
    .coffre-title { font-family: 'Oswald', sans-serif; font-size: 28px; color: #9b59b6; letter-spacing: 4px; margin-bottom: 30px; }
    .loot-grid { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-bottom: 30px; }
    .loot-item { display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0; transform: translateY(30px); transition: all 0.5s; }
    .loot-item.visible { opacity: 1; transform: translateY(0); }
    .loot-item img { width: 100px; height: 100px; object-fit: contain; }
    .loot-item .loot-name { font-size: 13px; font-weight: bold; }
    .loot-item .loot-rarete { font-size: 11px; opacity: 0.8; }
    .coffre-close { background: #9b59b6; color: white; border: none; padding: 10px 30px; border-radius: 20px; font-size: 14px; cursor: pointer; letter-spacing: 2px; }
    .footer{text-align:center;margin-top:40px;font-size:12px;color:#555;letter-spacing:3px;}
  </style>
</head>
<body>
  <div class="auth-banner" style="background:${isOwner ? '#9146ff' : '#1a1a2e'};border-bottom:${isOwner ? 'none' : '1px solid #9146ff'};color:white;">
    ${isOwner ? '&#x2705; Connecte en tant que ' + username + ' - Tu peux vendre tes doublons !' : '<a href="/auth/twitch?username=' + username + '" style="background:#9146ff;color:white;padding:5px 15px;border-radius:15px;text-decoration:none;font-weight:bold;">Se connecter avec Twitch pour vendre tes doublons</a>'}
  </div>
  <div class="berrys-bag">
    <div class="bag-amount" id="bag-amount">&#x1F4B0; ${berrys.toLocaleString()}</div>
    <div class="bag-label">BERRYS</div>
  </div>
  <div class="header">
  <div style="text-align:center;margin-bottom:15px;">
  <img src="/persos/teamnlb.png" style="width:150px;height:150px;object-fit:contain;">
</div>
    <div class="profile">
      <img src="${avatar}" alt="${username}">
      <div class="profile-info">
        <h1>${username}</h1>
        <p class="berrys">&#x1F4B0; ${berrys.toLocaleString()} Berrys</p>
      </div>
    </div>
    <div class="divider"></div>
    <div class="stats">${statsHTML}</div>
    <div class="collection-title">COLLECTION DE FRUITS DU DEMON</div>
    <div style="text-align:center;margin-bottom:30px;margin-top:15px;">
      <a href="/leaderboard" style="color:#f39c12;text-decoration:none;background:rgba(243,156,18,0.1);border:1px solid #f39c12;padding:6px 20px;border-radius:20px;font-size:13px;letter-spacing:2px;">&#x1F3C6; Voir le classement</a>
    </div>
    <div class="achievements-section">
      <div onclick="toggleLivre()" style="display:inline-block;cursor:pointer;text-align:center;transition:transform 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
  <img src="/fruits/coffresucces.png" style="width:100px;height:100px;object-fit:contain;filter:drop-shadow(0 0 15px rgba(243,156,18,0.5));">
  <div style="font-family:'Oswald',sans-serif;font-size:16px;color:#f39c12;letter-spacing:3px;margin-top:8px;">SUCCES</div>
</div>
      <div class="achievements-grid" id="achievements-grid">
        ${[
          { id: 'premier_pas', img: '/badges/premier_pas.png', nom: 'Premier Pas', desc: 'Obtenir son premier fruit' },
{ id: 'chanceux', img: '/badges/chanceux.png', nom: 'Chanceux', desc: 'Obtenir un fruit Mythique' },
{ id: 'elu', img: '/badges/elu.png', nom: 'Elu', desc: 'Obtenir un fruit Ultime' },
{ id: 'collection_commun', img: '/badges/collection_commun.png', nom: 'Collection Commun', desc: 'Avoir tous les fruits Commun' },
{ id: 'chasseur_rare', img: '/badges/chasseur_rare.png', nom: 'Chasseur Rare', desc: 'Avoir tous les fruits Rare' },
{ id: 'maitre_epique', img: '/badges/maitre_epique.png', nom: 'Maitre Epique', desc: 'Avoir tous les fruits Epique' },
{ id: 'legende', img: '/badges/legende.png', nom: 'Legende', desc: 'Avoir tous les fruits Legendaire' },
{ id: 'mythique_complet', img: '/badges/mythique_complet.png', nom: 'Mythique Complet', desc: 'Avoir tous les fruits Mythique' },
{ id: 'vrai_roi', img: '/badges/vrai_roi.png', nom: 'Le Vrai Roi des Pirates', desc: 'Avoir tous les fruits Ultime' },
{ id: 'chasseur_tresor', img: '/badges/chasseur_tresor.png', nom: 'Chasseur de Tresor', desc: 'Ouvrir son premier coffre' },
        ].map(a => {
          const obtenu = (achievementsData || []).some(d => d.achievement === a.id);
          return '<div class="achievement-item ' + (obtenu ? 'obtenu' : 'locked') + '">' +
            '<img src="' + a.img + '" style="width:155px;height:75px;object-fit:contain;' + (obtenu ? '' : 'filter:grayscale(100%) brightness(0.3);') + '">' +
            '<div style="font-family:Oswald,sans-serif;font-size:12px;color:' + (obtenu ? '#fff' : '#888') + ';margin-top:6px;letter-spacing:1px;">' + a.nom + '</div>' +
            '<div style="font-size:10px;color:' + (obtenu ? '#aaa' : '#666') + ';margin-top:3px;">' + a.desc + '</div>' +
            '</div>';
        }).join('')}
      </div>
    </div>
    ${isOwner ? `
    <div style="text-align:center;margin-bottom:30px;">
      <button onclick="ouvrirCoffre('${username}')" class="coffre-btn">
        &#x1F4E6; Ouvrir un Coffre Mystere (2000 Berrys)
      </button>
    </div>` : ''}
  </div>
  ${etageres}
  <div class="footer">
  <a href="/leaderboard" style="color:#f39c12;text-decoration:none;letter-spacing:3px;font-size:13px;">&#x1F3C6; Voir le classement</a>
  <p style="margin-top:10px;">NeyLaBrise - Grand Line</p>
</div>
  <script>
  function toggleLivre() {
  const grid = document.getElementById('achievements-grid');
  grid.classList.toggle('ouvert');
}
async function vendre(username, fruit, rarete) {
  if (!confirm('Vendre 1x ' + fruit + ' ?')) return;
  const res = await fetch('/vendre', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, fruit, rarete }) });
  const data = await res.json();
  if (data.success) {
    document.getElementById('bag-amount').textContent = '&#x1F4B0; ' + data.berrys.toLocaleString();
    alert('Vendu ! +' + data.valeur + ' Berrys !');
    location.reload();
  } else { alert(data.error); }
}

async function ouvrirCoffre(username) {
  const res = await fetch('/coffre', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username }) });
  const data = await res.json();
  if (!data.success) { alert(data.error); return; }

  const couleurs = { 'Ultime': '#ffffff', 'Mythique': '#cc0000', 'Legendaire': '#ffd700', 'Epique': '#9b59b6', 'Rare': '#3498db', 'Commun': '#2ecc71' };

  const overlay = document.getElementById('coffre-overlay');
  const lootGrid = document.getElementById('loot-grid');
  lootGrid.innerHTML = data.loot.map(l => {
    const couleur = couleurs[l.rarete] || '#2ecc71';
    return '<div class="loot-item" style="border:2px solid ' + couleur + ';border-radius:15px;padding:15px;background:rgba(0,0,0,0.5);">' +
      '<img src="/fruits/' + l.fruit + '.png" alt="' + l.fruit + '" style="width:100px;height:100px;object-fit:contain;filter:drop-shadow(0 0 15px ' + couleur + ');">' +
      '<div class="loot-name" style="color:' + couleur + ';">' + l.fruit + ' no Mi</div>' +
      '<div class="loot-rarete" style="color:' + couleur + ';">' + l.rarete + '</div>' +
      '</div>';
  }).join('');

  overlay.classList.add('active');
  if (data.achievements && data.achievements.length > 0) {
    setTimeout(() => {
      const achieveHTML = data.achievements.map(a => 
        '<div style="background:rgba(243,156,18,0.2);border:1px solid #f39c12;border-radius:10px;padding:8px 15px;margin:5px;display:inline-block;color:#f39c12;font-size:13px;">' + a.emoji + ' ' + a.nom + ' - ' + a.desc + '</div>'
      ).join('');
      document.getElementById('achievements-nouveaux').innerHTML = '<div style="margin-top:20px;"><div style="color:#f39c12;font-size:14px;letter-spacing:2px;margin-bottom:10px;">SUCCES DEBLOQUE !</div>' + achieveHTML + '</div>';
    }, 2000);
  }
  document.getElementById('bag-amount').textContent = '&#x1F4B0; ' + data.berrys.toLocaleString();

  setTimeout(() => {
    document.querySelectorAll('.loot-item').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 400);
    });
  }, 300);
}

function fermerCoffre() {
  document.getElementById('coffre-overlay').classList.remove('active');
  location.reload();
}
</script>
<div class="coffre-overlay" id="coffre-overlay">
  <div class="coffre-box">
    <div class="coffre-title">&#x1F4E6; COFFRE MYSTERE &#x1F4E6;</div>
    <div class="loot-grid" id="loot-grid"></div>
    <div id="achievements-nouveaux"></div>
    <button class="coffre-close" onclick="fermerCoffre()">Fermer</button>
  </div>
</div>
</body>
</html>`);
});

app.get('/leaderboard', async (req, res) => {
  const { data: collections } = await supabase.from('collection').select('username, rarete');
  const { data: membres } = await supabase.from('membres').select('username, personnage');

  const points = { 'Ultime': 100, 'Mythique': 50, 'Legendaire': 20, 'Epique': 10, 'Rare': 5, 'Commun': 1 };
  
  const scores = {};
  (collections || []).forEach(f => {
    const rarete = (f.rarete || 'Commun').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (!scores[f.username]) scores[f.username] = { username: f.username, score: 0, fruits: 0 };
    scores[f.username].score += points[rarete] || 1;
    scores[f.username].fruits += 1;
  });

  const classement = Object.values(scores).sort((a, b) => b.score - a.score).slice(0, 20);

  const avatars = {};
  for (const s of classement) {
    try {
      const r = await axios.get('https://api.twitch.tv/helix/users?login=' + s.username, { headers: { 'Client-ID': CLIENT_ID, 'Authorization': 'Bearer ' + ACCESS_TOKEN } });
      if (r.data.data.length > 0) avatars[s.username] = r.data.data[0].profile_image_url;
    } catch (e) { avatars[s.username] = 'https://static-cdn.jtvnw.net/user-default-pictures-uv/ebe4cd89-b4f4-4cd9-adac-2f30151b4209-profile_image-300x300.png'; }
  }

  const medals = ['&#x1F947;', '&#x1F948;', '&#x1F949;'];

  const rows = classement.map((s, i) => {
    const avatar = avatars[s.username] || 'https://static-cdn.jtvnw.net/user-default-pictures-uv/ebe4cd89-b4f4-4cd9-adac-2f30151b4209-profile_image-300x300.png';
    const membre = (membres || []).find(m => m.username === s.username);
    const perso = membre ? membre.personnage : '';
    const medal = i < 3 ? medals[i] : (i + 1) + '.';
    const isTop3 = i < 3;
    return '<div class="player-row ' + (isTop3 ? 'top3' : '') + '" style="' + (isTop3 ? 'border-color:' + ['#ffd700','#c0c0c0','#cd7f32'][i] + ';' : '') + '">' +
      '<div class="rank">' + medal + '</div>' +
      '<img src="' + avatar + '" class="player-avatar">' +
      '<div class="player-info">' +
        '<div class="player-name">' + s.username + '</div>' +
        (perso ? '<div class="player-perso">' + perso + '</div>' : '') +
      '</div>' +
      '<div class="player-stats">' +
        '<div class="player-score">' + s.score.toLocaleString() + ' pts</div>' +
        '<div class="player-fruits">' + s.fruits + ' fruits</div>' +
      '</div>' +
    '</div>';
  }).join('');

  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Classement - NeyLaBrise</title>
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto:wght@300;400&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0a0a1a; min-height: 100vh; padding: 30px 20px; font-family: 'Roboto', sans-serif; color: white; }
    .header { text-align: center; margin-bottom: 40px; }
    .header h1 { font-family: 'Oswald', sans-serif; font-size: 42px; letter-spacing: 6px; color: #f39c12; text-shadow: 0 0 30px rgba(243,156,18,0.5); }
    .divider { width: 200px; height: 2px; background: linear-gradient(to right, transparent, #f39c12, transparent); margin: 15px auto; }
    .subtitle { font-size: 13px; color: #888; letter-spacing: 3px; }
    .leaderboard { max-width: 700px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px; }
    .player-row { display: flex; align-items: center; gap: 15px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 12px 20px; transition: transform 0.2s; }
    .player-row:hover { transform: translateX(5px); }
    .player-row.top3 { border: 2px solid; background: rgba(255,255,255,0.06); }
    .rank { font-family: 'Oswald', sans-serif; font-size: 22px; width: 40px; text-align: center; }
    .player-avatar { width: 45px; height: 45px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.2); object-fit: cover; }
    .player-info { flex: 1; }
    .player-name { font-family: 'Oswald', sans-serif; font-size: 18px; letter-spacing: 1px; }
    .player-perso { font-size: 12px; color: #f39c12; font-style: italic; }
    .player-stats { text-align: right; }
    .player-score { font-family: 'Oswald', sans-serif; font-size: 20px; color: #f39c12; }
    .player-fruits { font-size: 11px; color: #888; }
    .points-legend { max-width: 700px; margin: 30px auto 0; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 25px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; }
.legend-item { font-size: 15px; font-weight: bold; padding: 6px 14px; border-radius: 20px; }
    .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #555; letter-spacing: 3px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>&#x1F3C6; CLASSEMENT &#x1F3C6;</h1>
    <div class="divider"></div>
    <p class="subtitle">TOP COLLECTIONNEURS - NEYLABRISE</p>
  </div>
  <div class="leaderboard">${rows}</div>
  <div class="points-legend">
    <span class="legend-item" style="background:rgba(255,255,255,0.1);color:#ffffff;border:1px solid #ffffff;">&#x1F451; Ultime = 100pts</span>
    <span class="legend-item" style="background:rgba(204,0,0,0.2);color:#cc0000;border:1px solid #cc0000;">&#x1F531; Mythique = 50pts</span>
    <span class="legend-item" style="background:rgba(255,215,0,0.15);color:#ffd700;border:1px solid #ffd700;">&#x2B50; Legendaire = 20pts</span>
    <span class="legend-item" style="background:rgba(155,89,182,0.2);color:#9b59b6;border:1px solid #9b59b6;">&#x1F49C; Epique = 10pts</span>
    <span class="legend-item" style="background:rgba(52,152,219,0.2);color:#3498db;border:1px solid #3498db;">&#x1F499; Rare = 5pts</span>
    <span class="legend-item" style="background:rgba(46,204,113,0.2);color:#2ecc71;border:1px solid #2ecc71;">&#x1F7E2; Commun = 1pt</span>
  </div>
  <div class="footer"><p>NeyLaBrise - Grand Line</p></div>
</body>
</html>`);
});

app.get('/animation', (req, res) => {
  const fruit = req.query.fruit || '';
  const rarete = req.query.rarete || 'Commun';
  const couleurs = { 'Ultime': '#ffffff', 'Mythique': '#cc0000', 'Legendaire': '#ffd700', 'Epique': '#9b59b6', 'Rare': '#3498db', 'Commun': '#2ecc71' };
  const couleur = couleurs[rarete] || '#2ecc71';
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:transparent;display:flex;justify-content:center;align-items:center;width:500px;height:400px;overflow:hidden;}.machine{background:linear-gradient(145deg,#0d0d1a,#1a1a3e,#0d0d1a);border:3px solid COULEUR;border-radius:24px;padding:25px 20px;text-align:center;box-shadow:0 0 60px COULEUR66,inset 0 0 40px rgba(0,0,0,.8);width:460px;opacity:0;animation:fadeIn .5s forwards;position:relative;overflow:hidden;}.machine::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(ellipse at center,COULEUR11 0%,transparent 60%);animation:pulse 2s infinite;}@keyframes pulse{0%,100%{opacity:.5;}50%{opacity:1;}}@keyframes fadeIn{from{opacity:0;transform:scale(.8);}to{opacity:1;transform:scale(1);}}.title{color:COULEUR;font-family:Arial Black,sans-serif;font-size:16px;letter-spacing:6px;margin-bottom:18px;text-transform:uppercase;text-shadow:0 0 20px COULEUR;position:relative;}.slots{display:flex;justify-content:center;gap:12px;margin-bottom:18px;}.slot{background:linear-gradient(180deg,#050510,#0a0a20);border:2px solid COULEUR;border-radius:14px;width:110px;height:110px;overflow:hidden;position:relative;box-shadow:0 0 20px COULEUR44,inset 0 0 15px rgba(0,0,0,.9);}.slot-inner{display:flex;flex-direction:column;align-items:center;width:100%;}.fruit-reveal{display:flex;flex-direction:column;align-items:center;gap:8px;opacity:0;animation:revealFruit .6s 4s forwards;}@keyframes revealFruit{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}.fruit-img{width:70px;height:70px;object-fit:contain;filter:drop-shadow(0 0 15px COULEUR) drop-shadow(0 0 30px COULEUR66);}.fruit-name{color:white;font-family:Arial Black,sans-serif;font-size:18px;font-weight:bold;letter-spacing:2px;text-shadow:0 0 10px white;}.rarete-badge{display:inline-block;background:linear-gradient(135deg,COULEUR33,COULEUR11);border:2px solid COULEUR;color:COULEUR;padding:6px 24px;border-radius:25px;font-family:Arial Black,sans-serif;font-size:14px;font-weight:bold;letter-spacing:4px;text-shadow:0 0 10px COULEUR;box-shadow:0 0 15px COULEUR44;opacity:0;animation:revealBadge .6s 4.5s forwards;}@keyframes revealBadge{from{opacity:0;transform:scale(.5);}to{opacity:1;transform:scale(1);}}</style></head><body><div class="machine"><div class="title">&#x1F3B0; Fruit du Demon &#x1F3B0;</div><div class="slots"><div class="slot" id="s1"><div class="slot-inner"><img src="/fruits/Mera-Mera.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Gum-Gum.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Yami-Yami.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Hie-Hie.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Ope-Ope.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"></div></div><div class="slot" id="s2"><div class="slot-inner"><img src="/fruits/Goro-Goro.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Pika-Pika.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Suna-Suna.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Ito-Ito.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Magu-Magu.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"></div></div><div class="slot" id="s3"><div class="slot-inner"><img src="/fruits/Hana-Hana.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Mochi-Mochi.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Bara-Bara.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Sube-Sube.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Bomu-Bomu.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"></div></div></div><div class="fruit-reveal"><img class="fruit-img" src="/fruits/FRUIT.png" alt="FRUIT"><div class="fruit-name">FRUIT no Mi</div><div class="rarete-badge">RARETE</div></div></div><audio id="spinSound" src="/spin.mp3" preload="auto"></audio><script>document.getElementById('spinSound').play().catch(e=>{});const slots=[document.getElementById('s1'),document.getElementById('s2'),document.getElementById('s3')];const stopTimes=[1500,2500,3500];slots.forEach((slot,i)=>{let pos=0;const interval=setInterval(()=>{pos-=12;slot.querySelector('.slot-inner').style.transform='translateY('+(pos%450)+'px)';},25);setTimeout(()=>{clearInterval(interval);slot.querySelector('.slot-inner').style.transform='translateY(0)';},stopTimes[i]);});</script></body></html>`;
  res.send(html.replace(/COULEUR/g, couleur).replace(/FRUIT/g, fruit).replace(/RARETE/g, rarete));
});

app.listen(3000, () => console.log('Serveur online demarre !'));
