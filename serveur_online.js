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
app.use('/badges', express.static(path.join(__dirname, 'badges')));

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://usbsivjrputwwrohezwk.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzYnNpdmpycHV0d3dyb2hlendrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDExOTM1MSwiZXhwIjoyMDk1Njk1MzUxfQ.UNf-rdDBD0MocGrQW4tzNAW3ksqgR__Zg3b1PwsDlPs';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const CLIENT_ID = process.env.CLIENT_ID || '4wl3wc4mnurd77ctzhl8s8v6gak6yl';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || '9w76c932djulze7uhrqdwjbk4d5fnn';

// ==================== HOMEPAGE ====================
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
    .subtitle { font-size: 16px; color: #ffffff; letter-spacing: 5px; margin-top: 10px; text-transform: uppercase; font-weight: bold; text-shadow: 0 0 15px rgba(138,43,226,0.9), 0 0 30px rgba(135,206,235,0.6); }
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
      <a href="/leaderboard" class="card">
        <div class="card-badge">TOP 20</div>
        <div class="card-icon">&#x1F3C6;</div>
        <div class="card-title">CLASSEMENT</div>
        <div class="card-desc">Découvre les meilleurs collectionneurs de la Grand Line !</div>
      </a>
      <a href="/grandline" class="card">
        <div class="card-icon">&#x1F5FA;</div>
        <div class="card-title">GRAND LINE</div>
        <div class="card-desc">Explore les factions et les équipages de NeyLaBrise !</div>
      </a>
      <a href="#" onclick="goWanted()" class="card">
        <img src="/persos/wantednlb.png" style="width:80px;height:80px;object-fit:contain;margin-bottom:15px;">
        <div class="card-title">WANTED</div>
        <div class="card-desc">Consulte ton avis de recherche et ta prime en Berrys !</div>
      </a>
      <a href="/minijeux" class="card">
        <div class="card-icon">&#x1F3AE;</div>
        <div class="card-title">MINI JEUX</div>
        <div class="card-desc">Joue et gagne des Berrys hors live !</div>
      </a>
    </div>
    <div class="footer"><p>&#x1F3F4; NeyLaBrise — Mis a jour en temps reel &#x1F3F4;</p></div>
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
  <div style="position:fixed;bottom:20px;right:20px;z-index:9999;">
  </div>
  <audio id="bg-music" src="/persos/sonaccueil.mp3" loop></audio>
  <script>
    
  </script>
  <div style="position:fixed;bottom:20px;right:20px;z-index:9999;">
  </div>
  <audio id="bg-music" src="/persos/sonaccueil.mp3" loop></audio>
  <script>
    
  </script>
  <div style="position:fixed;bottom:20px;right:20px;z-index:9999;">
    <button id="music-btn" onclick="toggleMusic()" style="background:rgba(0,0,0,0.85);border:2px solid #87ceeb;color:white;width:55px;height:55px;border-radius:50%;font-size:24px;cursor:pointer;box-shadow:0 0 20px rgba(135,206,235,0.6);transition:all 0.3s;display:flex;align-items:center;justify-content:center;">&#x1F3B5;&#x20E0;</button>
  </div>
  <audio id="bg-music" src="/persos/sonaccueil.mp3" loop></audio>
  <script>
    let playing = false;
    function toggleMusic() {
      const music = document.getElementById('bg-music');
      const btn = document.getElementById('music-btn');
      if (playing) {
        music.pause();
        btn.innerHTML = '&#x1F507;';
        btn.style.borderColor = '#8a2be2';
      } else {
        music.play();
btn.innerHTML = '&#x1F3B5;';        btn.style.borderColor = '#87ceeb';
      }
      playing = !playing;
    }
  </script>
</body>
</html>`);
});

// ==================== WANTED ====================
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
  res.send('<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Wanted - ' + username + '</title><style>@import url(\'https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap\');*{margin:0;padding:0;box-sizing:border-box;}body{background:#1a1a2e url(/persos/wantedfond.png) center/cover fixed;display:flex;justify-content:center;align-items:center;min-height:100vh;}.wanted{background:linear-gradient(135deg,#e8d5a3,#d4b896,#c9a97d,#d4b896,#e8d5a3);width:400px;padding:25px 20px;text-align:center;position:relative;box-shadow:0 0 50px rgba(0,0,0,.9),inset 0 0 80px rgba(0,0,0,.25);border:4px solid #1a1a1a;}.wanted::before{content:\'\';position:absolute;top:8px;left:8px;right:8px;bottom:8px;border:2px solid #1a1a1a;pointer-events:none;}.texture{position:absolute;top:0;left:0;right:0;bottom:0;background-image:radial-gradient(ellipse at 20% 30%,rgba(0,0,0,.08) 0%,transparent 50%);pointer-events:none;z-index:1;}.content{position:relative;z-index:2;}.corner{position:absolute;font-size:22px;color:#1a1a1a;opacity:.6;}.corner.tl{top:14px;left:14px;}.corner.tr{top:14px;right:14px;}.corner.bl{bottom:14px;left:14px;}.corner.br{bottom:14px;right:14px;}.title{font-family:\'Oswald\',sans-serif;font-size:72px;color:#0d0d0d;letter-spacing:6px;line-height:1;}.subtitle{font-size:13px;color:#1a1a1a;letter-spacing:6px;margin-bottom:15px;border-top:2px solid #1a1a1a;border-bottom:2px solid #1a1a1a;padding:5px 0;font-family:Georgia,serif;}.avatar{width:210px;height:210px;border:4px solid #1a1a1a;object-fit:cover;display:block;margin:0 auto 12px;filter:sepia(20%) contrast(105%);}.username{font-family:\'Oswald\',sans-serif;font-size:30px;color:#0d0d0d;margin:8px 0 4px;letter-spacing:4px;text-transform:uppercase;}.personnage{font-size:12px;color:#2a1a0a;margin-bottom:12px;font-style:italic;font-family:Georgia,serif;}.divider{border:none;border-top:2px solid #1a1a1a;margin:8px 30px;}.bounty-label{font-size:11px;color:#1a1a1a;letter-spacing:6px;text-transform:uppercase;margin-top:8px;font-family:Georgia,serif;}.bounty{font-family:\'Oswald\',sans-serif;font-size:42px;color:#0d0d0d;letter-spacing:2px;}.bounty-unit{font-size:13px;color:#2a1a0a;letter-spacing:5px;margin-bottom:10px;font-family:Georgia,serif;}.footer{font-size:10px;color:#1a1a1a;letter-spacing:3px;border-top:2px solid #1a1a1a;padding-top:8px;margin-top:5px;font-family:Georgia,serif;text-transform:uppercase;}</style></head><body><div class="wanted"><div class="texture"></div><span class="corner tl">&#9875;</span><span class="corner tr">&#9875;</span><span class="corner bl">&#9875;</span><span class="corner br">&#9875;</span><div class="content"><div class="title">WANTED</div><div class="subtitle">DEAD OR ALIVE</div><img class="avatar" src="' + avatar + '" alt="' + username + '"><div class="username">' + username + '</div><div class="personnage">' + personnage + ' - ' + subs + ' sub(s)</div><hr class="divider"><div class="bounty-label">Prime</div><div class="bounty">' + berrys.toLocaleString() + '</div><div class="bounty-unit">BERRYS</div><div class="footer">NeyLaBrise - Grand Line</div></div></div></body></html>');
});

// ==================== GRAND LINE ====================
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
    return '<div class="faction-card" style="border-color:' + f.couleur + ';background:' + f.bg + ';" onclick="toggleFaction(this)">' +
      '<div class="faction-header">' +
      '<div class="faction-title" style="color:' + f.couleur + ';">' + f.nom + '</div>' +
      '<div class="faction-right"><span class="faction-count">' + fm.length + ' membre(s)</span><span class="faction-arrow" style="color:' + f.couleur + ';">&#x25BC;</span></div>' +
      '</div>' +
      '<div class="members-grid" style="display:none;">' + (cards || '<div class="empty">Aucun membre</div>') + '</div>' +
      '</div>';
  }).join('');
  res.send('<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Grand Line</title><style>@import url(\'https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto:wght@300;400&display=swap\');*{margin:0;padding:0;box-sizing:border-box;}body{background:#0a0a1a url(/persos/grandlinefond.png) center/cover fixed;min-height:100vh;padding:30px 20px;font-family:Roboto,sans-serif;color:white;}.header{text-align:center;margin-bottom:40px;}.header h1{font-family:\'Oswald\',sans-serif;font-size:48px;letter-spacing:8px;color:#000000;text-shadow:2px 2px 0px #ffffff,4px 4px 0px rgba(0,0,0,0.3);}.divider{width:200px;height:2px;background:linear-gradient(to right,transparent,#f39c12,transparent);margin:15px auto;}.header p{font-size:14px;color:#000000;letter-spacing:3px;font-weight:bold;}.factions-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:25px;max-width:1400px;margin:0 auto;}.faction-card{border:2px solid;border-radius:12px;padding:20px;cursor:pointer;}.faction-header{display:flex;justify-content:space-between;align-items:center;}.faction-title{font-family:\'Oswald\',sans-serif;font-size:22px;letter-spacing:3px;}.faction-right{display:flex;align-items:center;gap:10px;}.faction-count{font-size:12px;color:#888;letter-spacing:2px;}.faction-arrow{font-size:14px;transition:transform .3s;}.members-grid{display:flex;flex-direction:column;gap:10px;}.member-card{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.05);border-radius:8px;padding:10px;margin-top:10px;}.member-avatar{width:50px;height:50px;border-radius:50%;border:2px solid rgba(255,255,255,.2);object-fit:cover;}.member-info{flex:1;}.member-name{font-family:\'Oswald\',sans-serif;font-size:16px;}.member-perso{font-size:12px;color:#aaa;font-style:italic;}.member-prime{font-size:12px;color:#f39c12;}.empty{font-size:13px;color:#555;font-style:italic;text-align:center;padding:20px;}.footer{text-align:center;margin-top:40px;font-size:12px;color:#555;letter-spacing:3px;}</style></head><body><div class="header"><h1>GRAND LINE</h1><div class="divider"></div><p>CARTE DES EQUIPAGES - NEYLABRISE</p></div><div class="factions-grid">' + factionCards + '</div><div class="footer"><p>NeyLaBrise - Grand Line</p></div><script>function toggleFaction(card){var grid=card.querySelector(".members-grid");var arrow=card.querySelector(".faction-arrow");if(grid.style.display==="none"||grid.style.display===""){grid.style.display="flex";grid.style.flexDirection="column";grid.style.gap="10px";if(arrow)arrow.style.transform="rotate(180deg)";}else{grid.style.display="none";if(arrow)arrow.style.transform="rotate(0deg)";}}<\/script></body></html>');
});

app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));

// ==================== EVENTSUB ====================
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

// ==================== AUTH TWITCH ====================
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

// ==================== ACHIEVEMENTS ====================
async function verifierAchievements(username, collection, fruitsGroupes) {
  const { data: existing } = await supabase.from('achievements').select('achievement').eq('username', username);
  const dejaobtenu = new Set((existing || []).map(a => a.achievement));
  const nouveaux = [];
  const tousLesFruits = {
    'Ultime': ['Nika-Nika', 'Oni-Oni', 'Roger-Roger', 'Aka-Aka'],
    'Mythique': ['Mochi-Mochi', 'Gum-Gum', 'Goro-Goro', 'Inu-Inu', 'Uo-Uo', 'Ope-Ope', 'Neko-Neko', 'Soru-Soru', 'Yami-Yami'],
    'Legendaire': ['Mera-Mera', 'Toshi-Toshi', 'Mero-Mero', 'Jiki-Jiki', 'Magu-Magu', 'Hie-Hie', 'Pika-Pika', 'Gura-Gura', 'Nikyu-Nikyu'],
    'Epique': ['Moku-Moku', 'Uta-Uta', 'Suna-Suna', 'Hana-Hana', 'Ito-Ito', 'Tsuchi-Tsuchi', 'Ushi-Ushi'],
    'Rare': ['Yomi-Yomi', 'Hobi-Hobi', 'Bara-Bara', 'Horo-Horo', 'Doru-Doru', 'Clank-Clank', 'Hito-Hito'],
    'Commun': ['Bomu-Bomu', 'Seiryu', 'Sube-Sube', 'Baku-Baku']
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
    { id: 'chasseur_tresor', condition: false, emoji: '📦', nom: 'Chasseur de Tresor', desc: 'Ouvrir son premier coffre' }
  ];
  for (const check of checks) {
    if (check.condition && !dejaobtenu.has(check.id)) {
      await supabase.from('achievements').insert({ username, achievement: check.id });
      nouveaux.push(check);
    }
  }
  return nouveaux;
}

// ==================== COFFRE ====================
app.post('/coffre', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Manque username' });

  const { data: coffreRows } = await supabase.from('codes_temp').select('expire').eq('username', username + '_coffre');
  const coffreData = coffreRows && coffreRows.length > 0 ? coffreRows[0] : null;
  if (coffreData && Date.now() < coffreData.expire) {
    const restant = Math.ceil((coffreData.expire - Date.now()) / 60000);
    return res.status(400).json({ error: 'Attends encore ' + restant + ' minute(s) avant d\'ouvrir un nouveau coffre !' });
  }

  const { data: primeData } = await supabase.from('primes').select('berrys').eq('username', username).single();
  if (!primeData || primeData.berrys < 2000) {
    return res.status(400).json({ error: 'Pas assez de Berrys ! Il faut 2000 Berrys pour ouvrir un coffre !' });
  }

  const fruitsListe = {
    'Ultime': ['Nika-Nika', 'Oni-Oni', 'Roger-Roger', 'Aka-Aka'],
    'Mythique': ['Mochi-Mochi', 'Gum-Gum', 'Goro-Goro', 'Inu-Inu', 'Uo-Uo', 'Ope-Ope', 'Neko-Neko', 'Soru-Soru', 'Yami-Yami'],
    'Legendaire': ['Mera-Mera', 'Toshi-Toshi', 'Mero-Mero', 'Jiki-Jiki', 'Magu-Magu', 'Hie-Hie', 'Pika-Pika', 'Gura-Gura', 'Nikyu-Nikyu'],
    'Epique': ['Moku-Moku', 'Uta-Uta', 'Suna-Suna', 'Hana-Hana', 'Ito-Ito', 'Tsuchi-Tsuchi', 'Ushi-Ushi'],
    'Rare': ['Yomi-Yomi', 'Hobi-Hobi', 'Bara-Bara', 'Horo-Horo', 'Doru-Doru', 'Clank-Clank', 'Hito-Hito'],
    'Commun': ['Bomu-Bomu', 'Seiryu', 'Sube-Sube', 'Baku-Baku']
  };

  const tirerFruit = () => {
    const rand = Math.random() * 100;
    let rarete = 'Commun';
    if (rand < 0.5) rarete = 'Ultime';
    else if (rand < 2) rarete = 'Mythique';
    else if (rand < 7) rarete = 'Legendaire';
    else if (rand < 17) rarete = 'Epique';
    else if (rand < 40) rarete = 'Rare';
    const liste = fruitsListe[rarete];
    return { fruit: liste[Math.floor(Math.random() * liste.length)], rarete };
  };

  const loot = [tirerFruit(), tirerFruit(), tirerFruit()];
  const newBerrys = primeData.berrys - 2000;

  await supabase.from('codes_temp').delete().eq('username', username + '_coffre');
await supabase.from('codes_temp').insert({ username: username + '_coffre', code: 'coffre', expire: Date.now() + 1200000 });
  await supabase.from('primes').upsert({ username, berrys: newBerrys, derniermessage: 0, derniereprime: 0 });
  for (const { fruit, rarete } of loot) {
    await supabase.from('collection').insert({ username, fruit, rarete });
  }

  // Succes chasseur_tresor
  const { data: existingAch } = await supabase.from('achievements').select('achievement').eq('username', username).eq('achievement', 'chasseur_tresor');
  const nouveauxAchievements = [];
  if (!existingAch || existingAch.length === 0) {
    await supabase.from('achievements').insert({ username, achievement: 'chasseur_tresor' });
    nouveauxAchievements.push({ id: 'chasseur_tresor', emoji: '📦', nom: 'Chasseur de Tresor', desc: 'Ouvrir son premier coffre' });
  }

  const { data: allFruits } = await supabase.from('collection').select('*').eq('username', username);
  const fruitsG = {};
  (allFruits || []).forEach(f => {
    let r = (f.rarete || 'Commun').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (fruitsG[f.fruit]) fruitsG[f.fruit].count += 1;
    else fruitsG[f.fruit] = { ...f, rarete: r, count: 1 };
  });
  const autresAchievements = await verifierAchievements(username, allFruits || [], fruitsG);
  const tousAchievements = [...nouveauxAchievements, ...autresAchievements];

  res.json({ success: true, loot, berrys: newBerrys, achievements: tousAchievements });
});

// ==================== VENDRE ====================
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

// ==================== COLLECTION ====================
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
        '<img src="/fruits/' + fruit + '.png" alt="' + fruit + '" style="' + (obtenu ? 'filter:drop-shadow(0 8px 16px ' + config.glow + ');' : 'filter:grayscale(100%) brightness(0.3);') + '">' +
        (perso ? '<div class="tooltip" style="border-color:' + config.couleur + ';"><img src="/persos/' + perso + '.png" alt="' + perso + '"><p style="color:' + config.couleur + ';">' + perso + '</p></div>' : '') +
        '<div class="fruit-label" style="color:' + (obtenu ? config.couleur : '#333') + ';">' + fruit + '</div>' +
        sellBtn + '</div>';
    }).join('');
    const nbObtenus = liste.filter(f => fruitsObtenus.has(f)).length;
    return '<div class="shelf-section"><div class="shelf-header" style="border-left:5px solid ' + config.couleur + ';background:' + config.bg + ';"><span class="shelf-emoji">' + config.emoji + '</span><span class="shelf-title" style="color:' + config.couleur + ';">' + rarete + '</span><span class="shelf-count">' + nbObtenus + '/' + liste.length + ' fruit(s)</span></div><div class="shelf" style="background:linear-gradient(180deg, color-mix(in srgb, ' + config.couleur + ' 12%, transparent), color-mix(in srgb, ' + config.couleur + ' 3%, transparent));"><div class="shelf-fruits">' + fruitsHTML + '</div><div class="shelf-board" style="background:' + config.couleur + ';"></div></div></div>';
  }).join('');

  const statsHTML = Object.entries(rareteConfig).map(([r, c]) => stats[r] ? '<span class="stat-badge" style="background:' + c.bg + ';color:' + c.couleur + ';border:1px solid ' + c.couleur + ';">' + c.emoji + ' ' + r + ': ' + stats[r] + '</span>' : '').join('');

  const achievementsList = [
    { id: 'premier_pas', img: '/badges/premier_pas.png', nom: 'Premier Pas', desc: 'Obtenir son premier fruit' },
    { id: 'chanceux', img: '/badges/chanceux.png', nom: 'Chanceux', desc: 'Obtenir un fruit Mythique' },
    { id: 'elu', img: '/badges/elu.png', nom: 'Elu', desc: 'Obtenir un fruit Ultime' },
    { id: 'collection_commun', img: '/badges/collection_commun.png', nom: 'Collection Commun', desc: 'Avoir tous les fruits Commun' },
    { id: 'chasseur_rare', img: '/badges/chasseur_rare.png', nom: 'Chasseur Rare', desc: 'Avoir tous les fruits Rare' },
    { id: 'maitre_epique', img: '/badges/maitre_epique.png', nom: 'Maitre Epique', desc: 'Avoir tous les fruits Epique' },
    { id: 'legende', img: '/badges/legende.png', nom: 'Legende', desc: 'Avoir tous les fruits Legendaire' },
    { id: 'mythique_complet', img: '/badges/mythique_complet.png', nom: 'Mythique Complet', desc: 'Avoir tous les fruits Mythique' },
    { id: 'vrai_roi', img: '/badges/vrai_roi.png', nom: 'Le Vrai Roi des Pirates', desc: 'Avoir tous les fruits Ultime' },
    { id: 'chasseur_tresor', img: '/badges/chasseur_tresor.png', nom: 'Chasseur de Tresor', desc: 'Ouvrir son premier coffre' }
  ];

  const achievementsHTML = achievementsList.map(a => {
    const obtenu = (achievementsData || []).some(d => d.achievement === a.id);
    return '<div class="achievement-item ' + (obtenu ? 'obtenu' : 'locked') + '">' +
      '<img src="' + a.img + '" style="width:155px;height:75px;object-fit:contain;' + (obtenu ? '' : 'filter:grayscale(100%) brightness(0.3);') + '">' +
      '<div style="font-family:Oswald,sans-serif;font-size:12px;color:' + (obtenu ? '#fff' : '#888') + ';margin-top:6px;letter-spacing:1px;">' + a.nom + '</div>' +
      '<div style="font-size:10px;color:' + (obtenu ? '#aaa' : '#666') + ';margin-top:3px;">' + a.desc + '</div>' +
      '</div>';
  }).join('');

  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Collection de ${username}</title>
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto:wght@300;400&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{background:#0a0a1a;min-height:100vh;padding:60px 20px 30px;font-family:'Roboto',sans-serif;color:white;}
    .auth-banner{position:fixed;top:0;left:0;right:0;padding:8px;text-align:center;font-size:13px;z-index:1000;}
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
    .collection-title{font-family:'Oswald',sans-serif;font-size:24px;letter-spacing:4px;color:#f39c12;text-align:center;margin-bottom:20px;}
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
    .achievements-section{margin-bottom:40px;text-align:center;}
    .achievements-grid{display:none;flex-wrap:wrap;gap:15px;justify-content:center;margin-top:25px;padding:25px;background:#000;border:1px solid rgba(255,255,255,.1);border-radius:12px;}
    .achievements-grid.ouvert{display:flex;}
    .achievement-item{width:160px;padding:8px;border-radius:12px;text-align:center;transition:transform .2s;background:rgba(255,255,255,.05);border:2px solid rgba(255,255,255,.2);}
    .achievement-item.obtenu{background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.6);box-shadow:0 0 15px rgba(255,255,255,.2);}
    .achievement-item.obtenu:hover{transform:translateY(-5px);}
    .achievement-item.locked{opacity:.3;}
    .coffre-btn{background:linear-gradient(135deg,#1a0a2a,#2a1a3a);border:2px solid #9b59b6;color:#9b59b6;padding:12px 30px;border-radius:25px;font-size:16px;font-weight:bold;cursor:pointer;letter-spacing:2px;transition:all .3s;box-shadow:0 0 20px rgba(155,89,182,.3);}
    .coffre-btn:hover{background:#9b59b6;color:white;box-shadow:0 0 30px rgba(155,89,182,.6);}
    .coffre-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.9);z-index:9999;display:none;justify-content:center;align-items:center;flex-direction:column;}
    .coffre-overlay.active{display:flex;}
    .coffre-box{background:linear-gradient(145deg,#1a0a2a,#0d0d1a);border:3px solid #9b59b6;border-radius:20px;padding:40px;text-align:center;max-width:600px;width:90%;box-shadow:0 0 60px rgba(155,89,182,.5);}
    .coffre-title{font-family:'Oswald',sans-serif;font-size:28px;color:#9b59b6;letter-spacing:4px;margin-bottom:30px;}
    .loot-grid{display:flex;justify-content:center;gap:20px;flex-wrap:wrap;margin-bottom:30px;}
    .loot-item{display:flex;flex-direction:column;align-items:center;gap:8px;opacity:0;transform:translateY(30px);transition:all .5s;}
    .loot-item.visible{opacity:1;transform:translateY(0);}
    .coffre-close{background:#9b59b6;color:white;border:none;padding:10px 30px;border-radius:20px;font-size:14px;cursor:pointer;letter-spacing:2px;}
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
    <div class="achievements-section">
      <div onclick="toggleLivre()" style="display:inline-block;cursor:pointer;text-align:center;transition:transform 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
        <img src="/fruits/coffresucces.png" style="width:100px;height:100px;object-fit:contain;filter:drop-shadow(0 0 15px rgba(243,156,18,0.5));">
        <div style="font-family:'Oswald',sans-serif;font-size:16px;color:#f39c12;letter-spacing:3px;margin-top:8px;">SUCCES</div>
      </div>
      <div class="achievements-grid" id="achievements-grid">${achievementsHTML}</div>
    </div>
    ${isOwner ? '<div style="text-align:center;margin-bottom:30px;"><button onclick="ouvrirCoffre(\'' + username + '\')" class="coffre-btn">&#x1F4E6; Ouvrir un Coffre Mystere (2000 Berrys)</button></div>' : ''}
  </div>
  ${etageres}
  <div class="footer"><p>NeyLaBrise - Grand Line</p></div>
  <script>
    function toggleLivre() {
      document.getElementById('achievements-grid').classList.toggle('ouvert');
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
        return '<div class="loot-item" style="border:2px solid ' + couleur + ';border-radius:15px;padding:15px;background:rgba(0,0,0,0.5);"><img src="/fruits/' + l.fruit + '.png" style="width:100px;height:100px;object-fit:contain;filter:drop-shadow(0 0 15px ' + couleur + ');"><div style="color:' + couleur + ';font-size:13px;font-weight:bold;">' + l.fruit + ' no Mi</div><div style="color:' + couleur + ';font-size:11px;">' + l.rarete + '</div></div>';
      }).join('');
      overlay.classList.add('active');
      document.getElementById('bag-amount').textContent = '&#x1F4B0; ' + data.berrys.toLocaleString();
      if (data.achievements && data.achievements.length > 0) {
        setTimeout(() => {
          const achieveHTML = data.achievements.map(a => '<div style="background:rgba(243,156,18,0.2);border:1px solid #f39c12;border-radius:10px;padding:8px 15px;margin:5px;display:inline-block;color:#f39c12;font-size:13px;">' + a.emoji + ' ' + a.nom + '</div>').join('');
          document.getElementById('achievements-nouveaux').innerHTML = '<div style="margin-top:20px;color:#f39c12;font-size:14px;letter-spacing:2px;margin-bottom:10px;">SUCCES DEBLOQUE !</div>' + achieveHTML;
        }, 2000);
      }
      setTimeout(() => { document.querySelectorAll('.loot-item').forEach((el, i) => { setTimeout(() => el.classList.add('visible'), i * 400); }); }, 300);
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

// ==================== LEADERBOARD ====================
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
    return '<div class="player-row ' + (isTop3 ? 'top3' : '') + '" style="' + (isTop3 ? 'border-color:' + ['#ff0000','#ff8c00','#ffd700'][i] + ';background:rgba(0,0,0,.85)' + ';' : '') + '"><div class="rank">' + medal + '</div><img src="' + avatar + '" class="player-avatar"><div class="player-info"><div class="player-name">' + s.username + '</div>' + (perso ? '<div class="player-perso">' + perso + '</div>' : '') + '</div><div class="player-stats"><div class="player-score">' + s.score.toLocaleString() + ' pts</div><div class="player-fruits">' + s.fruits + ' fruits</div></div></div>';
  }).join('');

  res.send('<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Classement - NeyLaBrise</title><link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto:wght@300;400&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#0a0a1a url(/persos/classementfond.png) center/cover fixed;min-height:100vh;padding:30px 20px;font-family:\'Roboto\',sans-serif;color:white;}.header{text-align:center;margin-bottom:40px;position:relative;z-index:1;}.factions-grid{position:relative;z-index:1;}.header h1{font-family:\'Oswald\',sans-serif;font-size:42px;letter-spacing:6px;color:#ffffff;text-shadow:0 0 10px #8a2be2,0 0 20px #8a2be2,0 0 40px #8a2be2;}.divider{width:200px;height:2px;background:linear-gradient(to right,transparent,#f39c12,transparent);margin:15px auto;}.subtitle{font-size:13px;color:#888;letter-spacing:3px;}.leaderboard{max-width:700px;margin:0 auto;display:flex;flex-direction:column;gap:10px;}.player-row{display:flex;align-items:center;gap:15px;background:rgba(0,0,0,.85);border:3px solid #ffffff;border-radius:12px;padding:12px 20px;transition:transform .2s;}.player-row:hover{transform:translateX(5px);}.player-row.top3{border:3px solid;}.rank{font-family:\'Oswald\',sans-serif;font-size:22px;width:40px;text-align:center;}.player-avatar{width:45px;height:45px;border-radius:50%;border:2px solid rgba(255,255,255,.2);object-fit:cover;}.player-info{flex:1;}.player-name{font-family:\'Oswald\',sans-serif;font-size:18px;letter-spacing:1px;}.player-perso{font-size:12px;color:#f39c12;font-style:italic;}.player-stats{text-align:right;}.player-score{font-family:\'Oswald\',sans-serif;font-size:20px;color:#f39c12;}.player-fruits{font-size:11px;color:#888;}.points-legend{max-width:700px;margin:30px auto 0;background:rgba(0,0,0,.8);border:1px solid rgba(255,255,255,.3);border-radius:12px;padding:25px;display:flex;justify-content:center;gap:15px;flex-wrap:wrap;}.legend-item{font-size:15px;font-weight:bold;padding:6px 14px;border-radius:20px;}.footer{text-align:center;margin-top:40px;font-size:12px;color:#555;letter-spacing:3px;}</style></head><body><div class="header"><h1>&#x1F3C6; CLASSEMENT &#x1F3C6;</h1><div class="divider"></div><p class="subtitle"> - NEYLABRISE</p></div><div class="leaderboard">' + rows + '</div><div class="points-legend"><span class="legend-item" style="background:rgba(255,255,255,0.1);color:#ffffff;border:1px solid #ffffff;">&#x1F451; Ultime = 100pts</span><span class="legend-item" style="background:rgba(204,0,0,0.2);color:#cc0000;border:1px solid #cc0000;">&#x1F531; Mythique = 50pts</span><span class="legend-item" style="background:rgba(255,215,0,0.15);color:#ffd700;border:1px solid #ffd700;">&#x2B50; Legendaire = 20pts</span><span class="legend-item" style="background:rgba(155,89,182,0.2);color:#9b59b6;border:1px solid #9b59b6;">&#x1F49C; Epique = 10pts</span><span class="legend-item" style="background:rgba(52,152,219,0.2);color:#3498db;border:1px solid #3498db;">&#x1F499; Rare = 5pts</span><span class="legend-item" style="background:rgba(46,204,113,0.2);color:#2ecc71;border:1px solid #2ecc71;">&#x1F7E2; Commun = 1pt</span></div><div class="footer"><p>NeyLaBrise - Grand Line</p></div></body></html>');
});

// ==================== MINI JEUX ====================
app.get('/minijeux', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mini Jeux - NeyLaBrise</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Exo+2:wght@300;400;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #050510; min-height: 100vh; font-family: 'Exo 2', sans-serif; color: white; background-image: url('/persos/fond_site.png'); background-size: cover; background-position: center; background-attachment: fixed; }
    body::before { content: ''; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(5,5,16,0.8); pointer-events: none; }
    .container { max-width: 1000px; margin: 0 auto; padding: 50px 20px; position: relative; z-index: 1; }
    .header { text-align: center; margin-bottom: 60px; }
    .title { font-family: 'Cinzel', serif; font-size: 42px; font-weight: 900; color: #ffffff; letter-spacing: 6px; text-shadow: 0 0 30px rgba(138,43,226,0.8); }
    .subtitle { font-size: 14px; color: #87ceeb; letter-spacing: 5px; margin-top: 10px; text-transform: uppercase; font-weight: bold; text-shadow: 0 0 15px rgba(135,206,235,0.6); }
    .divider { width: 300px; height: 1px; background: linear-gradient(to right, transparent, #8a2be2, #87ceeb, #8a2be2, transparent); margin: 20px auto; }
    .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin-bottom: 40px; }
    .card { background: rgba(0,0,0,0.75); border: 1px solid rgba(138,43,226,0.4); border-radius: 16px; padding: 30px 25px; text-align: center; cursor: pointer; transition: all 0.3s; text-decoration: none; color: white; display: block; backdrop-filter: blur(10px); }
    .card:hover { transform: translateY(-8px); border-color: #8a2be2; box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 0 25px rgba(138,43,226,0.4); }
    .card-icon { font-size: 60px; margin-bottom: 15px; }
    .card-title { font-family: 'Cinzel', serif; font-size: 20px; letter-spacing: 3px; margin-bottom: 10px; color: #87ceeb; }
    .card-desc { font-size: 13px; color: #aaa; line-height: 1.6; margin-bottom: 10px; }
    .card-gain { font-size: 12px; color: #f39c12; font-weight: bold; letter-spacing: 1px; }
    .card-cooldown { font-size: 11px; color: #888; margin-top: 5px; }
    .card-soon { opacity: 0.5; cursor: not-allowed; }
    .card-soon:hover { transform: none; box-shadow: none; border-color: rgba(138,43,226,0.4); }
    .soon-badge { background: rgba(138,43,226,0.3); border: 1px solid #8a2be2; color: #8a2be2; font-size: 11px; padding: 3px 10px; border-radius: 10px; display: inline-block; margin-top: 8px; }
    .back-btn { display: inline-block; margin-bottom: 30px; color: #87ceeb; text-decoration: none; font-size: 14px; letter-spacing: 2px; }
    .back-btn:hover { color: #8a2be2; }
    .footer { text-align: center; font-size: 12px; color: #87ceeb; letter-spacing: 3px; margin-top: 40px; opacity: 0.6; }
  </style>
</head>
<body>
  <div class="container">
    <a href="/" class="back-btn">&#x2190; Retour</a>
    <div class="header">
      <div class="title">MINI JEUX</div>
      <div class="subtitle">Gagne des Berrys hors live !</div>
      <div class="divider"></div>
    </div>
    <div class="cards-grid">
      <a href="/roulette" class="card">
        <div class="card-icon">&#x1F3A1;</div>
        <div class="card-title">ROULETTE DES MERS</div>
        <div class="card-desc">Tourne la roue et tente ta chance sur les mers du Grand Line !</div>
        <div class="card-gain">&#x1F4B0; Jusqu'a 500 Berrys + Fruits !</div>
        <div class="card-cooldown">&#x23F0; Cooldown : 10 minutes</div>
      </a>
      <div class="card card-soon">
        <div class="card-icon">&#x2694;&#xFE0F;</div>
        <div class="card-title">COMBAT DE PIRATES</div>
        <div class="card-desc">Affronte des ennemis légendaires et remporte des Berrys !</div>
        <div class="card-gain">&#x1F4B0; Jusqu'a 1000 Berrys</div>
        <div class="card-cooldown">&#x23F0; Cooldown : 30 minutes</div>
        <div class="soon-badge">BIENTOT</div>
      </div>
      <a href="/blackjack" class="card">
        <div class="card-icon">&#x1F0CF;</div>
        <div class="card-title">BLACKJACK PIRATE</div>
        <div class="card-desc">21 style One Piece, double ta mise ou perds tout !</div>
        <div class="card-gain">&#x1F4B0; Mise variable</div>
        <div class="card-cooldown">&#x23F0; Pas de cooldown</div>
      </a>
        <div class="card-desc">21 style One Piece, double ta mise ou perds tout !</div>
        <div class="card-gain">&#x1F4B0; Mise variable</div>
        <div class="card-cooldown">&#x23F0; Pas de cooldown</div>
        <div class="soon-badge">BIENTOT</div>
      </div>
      <a href="/course" class="card">
        <div class="card-icon">&#x1F3F4;</div>
        <div class="card-title">COURSE VERS LE ONE PIECE</div>
        <div class="card-desc">Navigue sur la Grand Line et trouve le tresor ultime !</div>
        <div class="card-gain">&#x1F4B0; Jusqu'a 1000 Berrys + Fruits !</div>
        <div class="card-cooldown">&#x23F0; 1 fois par jour</div>
      </a>
        <div class="card-desc">Resous les enigmes des mers pour trouver le tresor !</div>
        <div class="card-gain">&#x1F4B0; Jusqu'a 2000 Berrys</div>
        <div class="card-cooldown">&#x23F0; 1 fois par jour</div>
        <div class="soon-badge">BIENTOT</div>
      </div>
    </div>
    <div class="footer"><p>&#x1F3F4; NeyLaBrise — Grand Line &#x1F3F4;</p></div>
  </div>
</body>
</html>`);
});

// ==================== ROULETTE ====================
app.get('/roulette', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Roulette des Mers - NeyLaBrise</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Exo+2:wght@300;400;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #050510; min-height: 100vh; font-family: 'Exo 2', sans-serif; color: white; background-image: url('/persos/fondroulette.png'); background-size: cover; background-position: center; background-attachment: fixed; }
    body::before { content: ''; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(5,5,16,0.7); pointer-events: none; }
    .container { max-width: 800px; margin: 0 auto; padding: 30px 20px; position: relative; z-index: 1; text-align: center; }
    .back-btn { display: inline-block; margin-bottom: 20px; color: #87ceeb; text-decoration: none; font-size: 14px; letter-spacing: 2px; }
    .back-btn:hover { color: #8a2be2; }
    .title { font-family: 'Cinzel', serif; font-size: 36px; color: #ffffff; letter-spacing: 6px; text-shadow: 0 0 30px rgba(138,43,226,0.8); margin-bottom: 5px; }
    .subtitle { font-size: 13px; color: #87ceeb; letter-spacing: 4px; margin-bottom: 10px; }
    .search-bar { display: flex; justify-content: center; gap: 10px; margin-bottom: 30px; }
    .pseudo-input { background: rgba(0,0,0,0.7); border: 1px solid #8a2be2; color: white; padding: 10px 20px; border-radius: 25px; font-size: 14px; width: 250px; outline: none; font-family: 'Exo 2', sans-serif; }
    .pseudo-input::placeholder { color: #666; }
    .valider-btn { background: linear-gradient(135deg, #8a2be2, #4169e1); color: white; border: none; padding: 10px 25px; border-radius: 25px; font-size: 14px; font-weight: bold; cursor: pointer; font-family: 'Exo 2', sans-serif; transition: all 0.3s; }
    .valider-btn:hover { box-shadow: 0 0 25px rgba(138,43,226,0.6); }
    .wheel-container { position: relative; display: inline-block; margin: 20px auto; }
    .wheel-wrapper { position: relative; display: inline-block; }
    .wheel { border-radius: 50%; box-shadow: 0 0 40px rgba(138,43,226,0.5), 0 0 80px rgba(138,43,226,0.3); transition: transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99); }
    .pointer { position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 40px; filter: drop-shadow(0 0 10px rgba(243,156,18,0.8)); z-index: 10; }
    .spin-btn { margin-top: 25px; background: linear-gradient(135deg, #f39c12, #e67e22); color: #000; border: none; padding: 15px 50px; border-radius: 30px; font-size: 18px; font-weight: bold; cursor: pointer; font-family: 'Cinzel', serif; letter-spacing: 3px; transition: all 0.3s; box-shadow: 0 0 20px rgba(243,156,18,0.4); display: block; margin-left: auto; margin-right: auto; }
    .spin-btn:hover { box-shadow: 0 0 40px rgba(243,156,18,0.8); transform: scale(1.05); }
    .spin-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .result-box { margin-top: 25px; padding: 20px 30px; border-radius: 15px; display: none; }
    .result-box.show { display: block; animation: fadeIn 0.5s forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .result-title { font-family: 'Cinzel', serif; font-size: 22px; margin-bottom: 8px; }
    .result-berrys { font-size: 28px; font-weight: bold; color: #f39c12; }
    .cooldown-msg { margin-top: 15px; font-size: 13px; color: #888; }
    .berrys-display { background: rgba(0,0,0,0.7); border: 2px solid #f39c12; border-radius: 15px; padding: 10px 25px; display: inline-block; margin-bottom: 20px; }
    .berrys-display span { font-family: 'Cinzel', serif; font-size: 18px; color: #f39c12; }
    .legend { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 20px; }
    .legend-item { background: rgba(0,0,0,0.6); border-radius: 20px; padding: 5px 15px; font-size: 12px; border: 1px solid rgba(255,255,255,0.2); }
  </style>
</head>
<body>
  <div class="container">
    <a href="/minijeux" class="back-btn">&#x2190; Mini Jeux</a>
    <div class="title">&#x1F3A1; ROULETTE DES MERS</div>
    <div class="subtitle">Tente ta chance sur le Grand Line !</div>
    <div class="search-bar">
      <input type="text" class="pseudo-input" id="pseudo" placeholder="Ton pseudo Twitch...">
      <button class="valider-btn" onclick="charger()">Valider</button>
    </div>
    <div id="berrys-display" class="berrys-display" style="display:none;">
      <span id="berrys-amount">0</span> Berrys
    </div>
    <div class="wheel-wrapper">
      <div class="pointer" style="position:absolute;top:-20px;left:50%;transform:translateX(-50%) rotate(0deg);font-size:50px;color:#f39c12;text-shadow:0 0 15px rgba(243,156,18,0.8);">▼</div>
      <canvas id="wheel" class="wheel" width="400" height="400"></canvas>
    </div>
    <button class="spin-btn" id="spin-btn" onclick="tourner()" disabled>&#x1F3B0; TOURNER !</button>
    <div class="result-box" id="result-box">
      <div class="result-title" id="result-title"></div>
      <div class="result-berrys" id="result-berrys"></div>
      <div class="cooldown-msg" id="cooldown-msg"></div>
    </div>
    <div class="legend" id="legend"></div>
  </div>
  <script>
    const segments = [
      { label: '+50 Berrys', berrys: 50, couleur: '#87ceeb', prob: 30 },
      { label: 'Marine !', berrys: 0, couleur: '#1a1a2e', prob: 20 },
      { label: '+100 Berrys', berrys: 100, couleur: '#8a2be2', prob: 20 },
      { label: '+50 Berrys', berrys: 50, couleur: '#87ceeb', prob: 0 },
      { label: '+200 Berrys', berrys: 200, couleur: '#ff69b4', prob: 15 },
      { label: 'Marine !', berrys: 0, couleur: '#1a1a2e', prob: 0 },
      { label: '+500 Berrys', berrys: 500, couleur: '#ff0000', prob: 10 },
      { label: '+100 Berrys', berrys: 100, couleur: '#8a2be2', prob: 0 },
      { label: 'Fruit !', berrys: -1, couleur: '#ffffff', prob: 5 },
      { label: 'Marine !', berrys: 0, couleur: '#1a1a2e', prob: 0 },
    ];

    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    const nb = segments.length;
    const arc = (2 * Math.PI) / nb;
    let currentAngle = 0;
    let pseudo = '';
    let berrys = 0;
    let spinning = false;

    function dessinerRoue() {
      ctx.clearRect(0, 0, 400, 400);
      segments.forEach((seg, i) => {
        const start = currentAngle + i * arc;
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 195, start, start + arc);
        ctx.closePath();
        ctx.fillStyle = seg.couleur;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(start + arc / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = seg.berrys === 0 ? 'white' : (seg.berrys === -1 ? '#000' : 'white');
        ctx.font = 'bold 15px Arial Black, sans-serif';
        ctx.fillText(seg.label, 180, 5);
        ctx.restore();
      });
      ctx.beginPath();
      ctx.arc(200, 200, 25, 0, 2 * Math.PI);
      ctx.fillStyle = '#0a0a1a';
      ctx.fill();
      ctx.strokeStyle = '#f39c12';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = '#f39c12';
      ctx.font = 'bold 14px Cinzel, serif';
      ctx.textAlign = 'center';
      ctx.fillText('NLB', 200, 205);
    }

    function charger() {
      pseudo = document.getElementById('pseudo').value.trim().toLowerCase();
      if (!pseudo) { alert('Entre ton pseudo Twitch !'); return; }
      fetch('/roulette/infos?username=' + pseudo)
        .then(r => r.json())
        .then(data => {
          if (data.error) { alert(data.error); return; }
          berrys = data.berrys;
          document.getElementById('berrys-amount').textContent = berrys.toLocaleString();
          document.getElementById('berrys-display').style.display = 'inline-block';
          if (data.cooldown) {
            document.getElementById('spin-btn').disabled = true;
            document.getElementById('spin-btn').textContent = '⏰ ' + data.restant + ' min restantes';
          } else {
            document.getElementById('spin-btn').disabled = false;
            document.getElementById('spin-btn').textContent = '🎰 TOURNER !';
          }
          const legendDiv = document.getElementById('legend');
          legendDiv.innerHTML = segments.filter((s,i,a) => a.findIndex(x=>x.label===s.label) === i).map(s =>
            '<div class="legend-item" style="border-color:' + s.couleur + ';color:' + s.couleur + ';">' + s.label + '</div>'
          ).join('');
        });
    }

    function getResultat() {
      const rand = Math.random() * 100;
      let cumul = 0;
      const probs = [30, 20, 20, 0, 15, 0, 10, 0, 5, 0];
      for (let i = 0; i < probs.length; i++) {
        cumul += probs[i];
        if (rand < cumul) return i;
      }
      return 0;
    }

    function tourner() {
      if (spinning || !pseudo) return;
      spinning = true;
      document.getElementById('spin-btn').disabled = true;
      document.getElementById('result-box').classList.remove('show');

      const indexResultat = getResultat();
      const targetAngle = -(indexResultat * arc + arc / 2) + Math.PI / 2 + Math.PI + (5 + Math.floor(Math.random() * 3)) * 2 * Math.PI;
      const totalRotation = targetAngle + (5 * 2 * Math.PI);
      let start = null;
      const duration = 4000;

      function animate(ts) {
        if (!start) start = ts;
        const elapsed = ts - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const angle = totalRotation * ease;
        currentAngle = angle % (2 * Math.PI);
        dessinerRoue();
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          spinning = false;
          afficherResultat(indexResultat);
        }
      }
      requestAnimationFrame(animate);
    }

    async function afficherResultat(index) {
      const seg = segments[index];
      const res = await fetch('/roulette/jouer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: pseudo, index })
      });
      const data = await res.json();
      if (!data.success) { alert(data.error); document.getElementById('spin-btn').disabled = false; spinning = false; return; }

      const box = document.getElementById('result-box');
      box.style.background = 'rgba(0,0,0,0.85)';
      box.style.border = '2px solid ' + seg.couleur;
      box.style.boxShadow = '0 0 30px ' + seg.couleur + '44';

      if (seg.berrys === 0) {
        document.getElementById('result-title').textContent = '🚔 La Marine t\\'a arrêté !';
        document.getElementById('result-berrys').textContent = '+0 Berrys';
        document.getElementById('result-berrys').style.color = '#e74c3c';
      } else if (seg.berrys === -1) {
        document.getElementById('result-title').textContent = '🍎 Fruit du Démon !';
        document.getElementById('result-berrys').textContent = data.fruit + ' no Mi !';
        document.getElementById('result-berrys').style.color = '#ffffff';
      } else {
        document.getElementById('result-title').textContent = '🏴‍☠️ Butin récupéré !';
        document.getElementById('result-berrys').textContent = '+' + seg.berrys + ' Berrys !';
        document.getElementById('result-berrys').style.color = seg.couleur;
      }

      document.getElementById('cooldown-msg').textContent = '⏰ Prochain tour dans 10 minutes !';
      document.getElementById('berrys-amount').textContent = data.berrys.toLocaleString();
      berrys = data.berrys;
      box.classList.add('show');
      document.getElementById('spin-btn').textContent = '⏰ Reviens dans 10 min !';
    }

    dessinerRoue();
  </script>
</body>
</html>`);
});

app.get('/roulette/infos', async (req, res) => {
  const username = req.query.username;
  if (!username) return res.status(400).json({ error: 'Manque username' });
  const { data: primeData } = await supabase.from('primes').select('berrys').eq('username', username).single();
  if (!primeData) return res.status(400).json({ error: 'Pseudo introuvable ! Tu dois etre enregistre sur le stream.' });
  const { data: rouletteRows } = await supabase.from('codes_temp').select('expire').eq('username', username + '_roulette');
  const rouletteData = rouletteRows && rouletteRows.length > 0 ? rouletteRows[0] : null;
  const cooldown = rouletteData && Date.now() < parseInt(rouletteData.expire);
  const restant = cooldown ? Math.ceil((parseInt(rouletteData.expire) - Date.now()) / 60000) : 0;
  res.json({ berrys: primeData.berrys, cooldown, restant });
});

app.post('/roulette/jouer', async (req, res) => {
  const { username, index } = req.body;
  if (!username) return res.status(400).json({ error: 'Manque username' });
  const { data: rouletteRows } = await supabase.from('codes_temp').select('expire').eq('username', username + '_roulette');
  const rouletteData = rouletteRows && rouletteRows.length > 0 ? rouletteRows[0] : null;
  if (rouletteData && Date.now() < parseInt(rouletteData.expire)) {
    const restant = Math.ceil((parseInt(rouletteData.expire) - Date.now()) / 60000);
    return res.status(400).json({ error: 'Attends encore ' + restant + ' minute(s) !' });
  }
  const segments = [
    { berrys: 50 }, { berrys: 0 }, { berrys: 100 }, { berrys: 50 },
    { berrys: 200 }, { berrys: 0 }, { berrys: 500 }, { berrys: 100 },
    { berrys: -1 }, { berrys: 0 }
  ];
  const seg = segments[index];
  const { data: primeData } = await supabase.from('primes').select('berrys').eq('username', username).single();
  if (!primeData) return res.status(400).json({ error: 'Pseudo introuvable !' });
  let newBerrys = primeData.berrys;
  let fruit = null;
  if (seg.berrys === -1) {
    const fruitsListe = ['Bomu-Bomu', 'Seiryu', 'Sube-Sube', 'Baku-Baku', 'Yomi-Yomi', 'Bara-Bara', 'Horo-Horo', 'Doru-Doru'];
    fruit = fruitsListe[Math.floor(Math.random() * fruitsListe.length)];
    await supabase.from('collection').insert({ username, fruit, rarete: 'Commun' });
  } else {
    newBerrys += seg.berrys;
    await supabase.from('primes').upsert({ username, berrys: newBerrys, derniermessage: 0, derniereprime: 0 });
  }
  await supabase.from('codes_temp').delete().eq('username', username + '_roulette');
  await supabase.from('codes_temp').insert({ username: username + '_roulette', code: 'roulette', expire: Date.now() + 600000 });
  res.json({ success: true, berrys: newBerrys, fruit });
});

// ==================== BLACKJACK ====================
app.get('/blackjack', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blackjack Pirate - NeyLaBrise</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Exo+2:wght@300;400;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #000000; min-height: 100vh; font-family: 'Exo 2', sans-serif; color: white; background-image: url('/persos/blackjackfond.png'); background-size: cover; background-position: center; background-repeat: no-repeat; }
    body::before { content: ''; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.1); pointer-events: none; }
    .container { max-width: 900px; margin: 0 auto; padding: 30px 20px; position: relative; z-index: 1; text-align: center; }
    .back-btn { display: inline-block; margin-bottom: 20px; color: #87ceeb; text-decoration: none; font-size: 14px; letter-spacing: 2px; }
    .title { font-family: 'Cinzel', serif; font-size: 36px; color: #ffd700; letter-spacing: 6px; text-shadow: 0 0 30px rgba(255,215,0,0.6); margin-bottom: 5px; }
    .subtitle { font-size: 13px; color: #000000; font-weight: 900; letter-spacing: 4px; margin-bottom: 20px; }
    .setup-section { background: rgba(0,0,0,0.7); border: 2px solid #ffd700; border-radius: 15px; padding: 25px; margin-bottom: 20px; display: flex; justify-content: center; align-items: center; gap: 15px; flex-wrap: wrap; }
    .pseudo-input, .mise-input { background: rgba(0,0,0,0.7); border: 1px solid #ffd700; color: white; padding: 10px 20px; border-radius: 25px; font-size: 14px; outline: none; font-family: 'Exo 2', sans-serif; width: 200px; }
    .pseudo-input::placeholder, .mise-input::placeholder { color: #666; }
    .btn { padding: 10px 25px; border-radius: 25px; font-size: 14px; font-weight: bold; cursor: pointer; font-family: 'Cinzel', serif; letter-spacing: 2px; border: none; transition: all 0.3s; }
    .btn-gold { background: linear-gradient(135deg, #ffd700, #f39c12); color: #000; box-shadow: 0 0 15px rgba(255,215,0,0.4); }
    .btn-gold:hover { box-shadow: 0 0 30px rgba(255,215,0,0.8); transform: scale(1.05); }
    .btn-green { background: linear-gradient(135deg, #2ecc71, #27ae60); color: white; }
    .btn-red { background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; }
    .btn-blue { background: linear-gradient(135deg, #3498db, #2980b9); color: white; }
    .btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
    .game-section { display: none; }
    .game-section.active { display: block; }
    .berrys-display { background: rgba(0,0,0,0.7); border: 2px solid #ffd700; border-radius: 15px; padding: 10px 25px; display: inline-block; margin-bottom: 20px; font-family: 'Cinzel', serif; font-size: 18px; color: #ffd700; }
    .table { background: url('/persos/fondtable.png') center/cover; border: 6px solid #000000; box-shadow: 0 0 20px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,0,0,0.5); border: 4px solid #8B4513; border-radius: 20px; padding: 30px; margin: 20px 0; box-shadow: 0 0 40px rgba(0,0,0,0.8), inset 0 0 60px rgba(0,0,0,0.4); }
    .zone-label { font-family: 'Cinzel', serif; font-size: 14px; letter-spacing: 3px; color: #ffffff; font-weight: 900; text-shadow: 1px 1px 3px #000, -1px -1px 3px #000; margin-bottom: 10px; }
    .cards-zone { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; min-height: 120px; align-items: center; margin-bottom: 20px; }
    .card { width: 75px; height: 105px; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 22px; font-weight: bold; border: 2px solid rgba(255,255,255,0.3); position: relative; animation: cardFlip 0.3s ease; box-shadow: 3px 3px 10px rgba(0,0,0,0.5); }
    @keyframes cardFlip { from { transform: rotateY(90deg); opacity: 0; } to { transform: rotateY(0deg); opacity: 1; } }
    .card-pique { background: linear-gradient(135deg, #1a1a2e, #16213e); color: #87ceeb; border-color: #87ceeb; }
    .card-coeur { background: linear-gradient(135deg, #2c0a0a, #4a0a0a); color: #ff6b6b; border-color: #ff6b6b; }
    .card-carreau { background: linear-gradient(135deg, #1a0a2a, #2a1040); color: #9b59b6; border-color: #9b59b6; }
    .card-trefle { background: linear-gradient(135deg, #0a2a0a, #0a4a0a); color: #2ecc71; border-color: #2ecc71; }
    .card-dos { background: linear-gradient(135deg, #8B4513, #A0522D); color: #ffd700; border-color: #ffd700; font-size: 30px; }
    .card-symbole { font-size: 28px; }
    .card-valeur { font-size: 14px; font-family: 'Cinzel', serif; margin-top: 4px; }
    .score { font-family: 'Cinzel', serif; font-size: 20px; color: #ffffff; font-weight: 900; text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000; margin: 10px 0; }
    .mise-display { font-family: 'Cinzel', serif; font-size: 16px; color: #ffffff; font-weight: 900; text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000; margin-bottom: 15px; }
    .actions { display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin-top: 15px; }
    .result-box { background: rgba(0,0,0,0.9); border-radius: 15px; padding: 25px; margin-top: 20px; display: none; animation: fadeIn 0.5s forwards; }
    .result-box.show { display: block; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .result-title { font-family: 'Cinzel', serif; font-size: 28px; margin-bottom: 10px; }
    .result-gain { font-size: 32px; font-weight: bold; color: #ffd700; }
    .result-win { border: 3px solid #ffd700; box-shadow: 0 0 30px rgba(255,215,0,0.4); }
    .result-lose { border: 3px solid #e74c3c; box-shadow: 0 0 30px rgba(231,76,60,0.4); }
    .result-push { border: 3px solid #888; }
  </style>
</head>
<body>
  <div class="container">
    <a href="/minijeux" class="back-btn">&#x2190; Mini Jeux</a>
    <div class="title">&#x1F0CF; BLACKJACK PIRATE</div>
    <div class="subtitle">21 ou bust sur les mers du Grand Line !</div>
    <div class="setup-section" id="setup-section">
      <input type="text" class="pseudo-input" id="pseudo" placeholder="Ton pseudo Twitch...">
      <input type="number" class="mise-input" id="mise" placeholder="Mise (min 50)" min="50">
      <button class="btn btn-gold" onclick="commencer()">&#x1F3B4; JOUER !</button>
    </div>
    <div class="berrys-display" id="berrys-display" style="display:none;">
      &#x1F4B0; <span id="berrys-amount">0</span> Berrys
    </div>
    <div class="game-section" id="game-section">
      <div class="mise-display" id="mise-display"></div>
      <div class="table">
        <div class="zone-label">&#x2694;&#xFE0F; CROUPIER</div>
        <div class="cards-zone" id="dealer-cards"></div>
        <div class="score" id="dealer-score"></div>
        <hr style="border-color:rgba(255,255,255,0.1);margin:15px 0;">
        <div class="zone-label">&#x1F3F4; TON JEU</div>
        <div class="cards-zone" id="player-cards"></div>
        <div class="score" id="player-score"></div>
      </div>
      <div class="actions">
        <button class="btn btn-green" id="btn-tirer" onclick="tirer()">&#x2795; TIRER</button>
        <button class="btn btn-red" id="btn-rester" onclick="rester()">&#x270B; RESTER</button>
      </div>
      <div class="result-box" id="result-box">
        <div class="result-title" id="result-title"></div>
        <div class="result-gain" id="result-gain"></div>
        <button class="btn btn-gold" style="margin-top:15px;" onclick="rejouer()">&#x1F504; REJOUER</button>
      </div>
    </div>
  </div>
  <script>
    const symboles = {
      pique: { emoji: '&#x2666;', class: 'card-pique', nom: 'Marine' },
      coeur: { emoji: '&#x2665;', class: 'card-coeur', nom: 'Mugiwara' },
      carreau: { emoji: '&#x2663;', class: 'card-carreau', nom: 'Corsaire' },
      trefle: { emoji: '&#x2660;', class: 'card-trefle', nom: 'Barbe Noire' }
    };
    const valeurs = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    let deck = [], mainJoueur = [], mainCroupier = [], miseActuelle = 0, pseudoActuel = '', berrysActuels = 0, jeuEnCours = false;

    function creerDeck() {
      deck = [];
      for (const s of Object.keys(symboles)) {
        for (const v of valeurs) {
          deck.push({ valeur: v, symbole: s });
        }
      }
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
    }

    function valeurCarte(v) {
      if (['J','Q','K'].includes(v)) return 10;
      if (v === 'A') return 11;
      return parseInt(v);
    }

    function scoreMain(main) {
      let total = main.reduce((s, c) => s + valeurCarte(c.valeur), 0);
      let as = main.filter(c => c.valeur === 'A').length;
      while (total > 21 && as > 0) { total -= 10; as--; }
      return total;
    }

    function afficherCarte(carte, cacheDeuxieme = false) {
      const s = symboles[carte.symbole];
      if (cacheDeuxieme) return '<div class="card card-dos"><div>&#x1F3F4;</div><div style="font-size:11px;margin-top:4px;">???</div></div>';
      return '<div class="card ' + s.class + '"><div class="card-symbole">' + s.emoji + '</div><div class="card-valeur">' + carte.valeur + '</div><div style="font-size:9px;opacity:0.7;">' + s.nom + '</div></div>';
    }

    function majAffichage(cacheDeuxieme = true) {
      document.getElementById('player-cards').innerHTML = mainJoueur.map(c => afficherCarte(c)).join('');
      document.getElementById('dealer-cards').innerHTML = mainCroupier.map((c, i) => afficherCarte(c, cacheDeuxieme && i === 1)).join('');
      const scoreJ = scoreMain(mainJoueur);
      document.getElementById('player-score').textContent = 'Score: ' + scoreJ + (scoreJ === 21 && mainJoueur.length === 2 ? ' 🏆 BLACKJACK !' : '');
      if (!cacheDeuxieme) document.getElementById('dealer-score').textContent = 'Score: ' + scoreMain(mainCroupier);
      else document.getElementById('dealer-score').textContent = '';
    }

    async function commencer() {
      const pseudo = document.getElementById('pseudo').value.trim().toLowerCase();
      const mise = parseInt(document.getElementById('mise').value);
      if (!pseudo) { alert('Entre ton pseudo !'); return; }
      if (!mise || mise < 50) { alert('Mise minimum 50 Berrys !'); return; }
      const r = await fetch('/blackjack/infos?username=' + pseudo + '&mise=' + mise);
      const data = await r.json();
      if (data.error) { alert(data.error); return; }
      pseudoActuel = pseudo;
      miseActuelle = mise;
      berrysActuels = data.berrys;
      document.getElementById('berrys-amount').textContent = berrysActuels.toLocaleString();
      document.getElementById('berrys-display').style.display = 'inline-block';
      document.getElementById('mise-display').textContent = 'Mise : ' + mise.toLocaleString() + ' Berrys';
      creerDeck();
      mainJoueur = [deck.pop(), deck.pop()];
      mainCroupier = [deck.pop(), deck.pop()];
      jeuEnCours = true;
      document.getElementById('game-section').classList.add('active');
      document.getElementById('result-box').classList.remove('show');
      document.getElementById('btn-tirer').disabled = false;
      document.getElementById('btn-rester').disabled = false;
      majAffichage(true);
      const scoreJ = scoreMain(mainJoueur);
      if (scoreJ === 21) { setTimeout(() => rester(), 500); }
    }

    function tirer() {
      if (!jeuEnCours) return;
      mainJoueur.push(deck.pop());
      majAffichage(true);
      const score = scoreMain(mainJoueur);
      if (score > 21) { terminer(); }
    }

    function rester() {
      document.getElementById('btn-tirer').disabled = true;
      document.getElementById('btn-rester').disabled = true;
      majAffichage(false);
      let scoreCroupier = scoreMain(mainCroupier);
      const interval = setInterval(() => {
        if (scoreCroupier < 17) {
          mainCroupier.push(deck.pop());
          scoreCroupier = scoreMain(mainCroupier);
          majAffichage(false);
        } else {
          clearInterval(interval);
          terminer();
        }
      }, 600);
    }

    async function terminer() {
      jeuEnCours = false;
      majAffichage(false);
      const scoreJ = scoreMain(mainJoueur);
      const scoreC = scoreMain(mainCroupier);
      const blackjackNaturel = scoreJ === 21 && mainJoueur.length === 2;
      let resultat = '';
      if (scoreJ > 21) resultat = 'lose';
      else if (scoreC > 21) resultat = 'win';
      else if (blackjackNaturel && !(scoreC === 21 && mainCroupier.length === 2)) resultat = 'blackjack';
      else if (scoreJ > scoreC) resultat = 'win';
      else if (scoreJ === scoreC) resultat = 'push';
      else resultat = 'lose';
      const r = await fetch('/blackjack/resultat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: pseudoActuel, mise: miseActuelle, resultat })
      });
      const data = await r.json();
      berrysActuels = data.berrys;
      document.getElementById('berrys-amount').textContent = berrysActuels.toLocaleString();
      const box = document.getElementById('result-box');
      box.className = 'result-box show';
      if (resultat === 'win') {
        box.classList.add('result-win');
        document.getElementById('result-title').textContent = '🏴‍☠️ Victoire !';
        document.getElementById('result-gain').textContent = '+' + miseActuelle.toLocaleString() + ' Berrys !';
        document.getElementById('result-gain').style.color = '#ffd700';
      } else if (resultat === 'blackjack') {
        box.classList.add('result-win');
        document.getElementById('result-title').textContent = '🏆 BLACKJACK ! x2 !';
        document.getElementById('result-gain').textContent = '+' + (miseActuelle * 2).toLocaleString() + ' Berrys !';
        document.getElementById('result-gain').style.color = '#ff0000';
      } else if (resultat === 'lose') {
        box.classList.add('result-lose');
        document.getElementById('result-title').textContent = '💀 Perdu !';
        document.getElementById('result-gain').textContent = '-' + miseActuelle.toLocaleString() + ' Berrys';
        document.getElementById('result-gain').style.color = '#e74c3c';
      } else {
        box.classList.add('result-push');
        document.getElementById('result-title').textContent = '🤝 Egalite !';
        document.getElementById('result-gain').textContent = 'Mise remboursee';
        document.getElementById('result-gain').style.color = '#888';
      }
    }

    function rejouer() {
      document.getElementById('result-box').classList.remove('show');
      document.getElementById('mise-display').textContent = '';
      document.getElementById('player-cards').innerHTML = '';
      document.getElementById('dealer-cards').innerHTML = '';
      document.getElementById('player-score').textContent = '';
      document.getElementById('dealer-score').textContent = '';
      commencer();
    }
  </script>
</body>
</html>`);
});

app.get('/blackjack/infos', async (req, res) => {
  const { username, mise } = req.query;
  if (!username) return res.status(400).json({ error: 'Manque username' });
  const { data: primeData } = await supabase.from('primes').select('berrys').eq('username', username).single();
  if (!primeData) return res.status(400).json({ error: 'Pseudo introuvable ! Tu dois etre enregistre sur le stream.' });
  if (primeData.berrys < parseInt(mise)) return res.status(400).json({ error: 'Pas assez de Berrys !' });
  res.json({ berrys: primeData.berrys });
});

app.post('/blackjack/resultat', async (req, res) => {
  const { username, mise, resultat } = req.body;
  const { data: primeData } = await supabase.from('primes').select('berrys').eq('username', username).single();
  if (!primeData) return res.status(400).json({ error: 'Erreur' });
  let newBerrys = primeData.berrys;
  if (resultat === 'win') newBerrys += mise;
  else if (resultat === 'blackjack') newBerrys += mise * 2;
  else if (resultat === 'lose') newBerrys -= mise;
  await supabase.from('primes').upsert({ username, berrys: newBerrys, derniermessage: 0, derniereprime: 0 });
  res.json({ success: true, berrys: newBerrys });
});

// ==================== COURSE VERS ONE PIECE ====================
app.get('/course', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Course vers One Piece - NeyLaBrise</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Exo+2:wght@300;400;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #050510; min-height: 100vh; font-family: 'Exo 2', sans-serif; color: white; background-image: url('/persos/coursefond.png'); background-size: cover; background-position: center; background-attachment: fixed; overflow-x: hidden; }
    body::before { content: ''; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); pointer-events: none; }
    .container { max-width: 900px; margin: 0 auto; padding: 30px 20px; position: relative; z-index: 1; text-align: center; }
    .back-btn { display: inline-block; margin-bottom: 20px; color: #87ceeb; text-decoration: none; font-size: 14px; letter-spacing: 2px; }
    .title { font-family: 'Cinzel', serif; font-size: 36px; color: #87ceeb; letter-spacing: 6px; text-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000; margin-bottom: 5px; }
    .subtitle { font-size: 13px; color: #00008b; letter-spacing: 4px; margin-bottom: 20px; font-weight: bold; }
    .setup-box { background: rgba(0,0,0,0.8); border: 2px solid #87ceeb; box-shadow: 0 0 15px rgba(135,206,235,0.5); border-radius: 15px; padding: 25px; margin-bottom: 20px; display: flex; justify-content: center; align-items: center; gap: 15px; flex-wrap: wrap; }
    .pseudo-input { background: rgba(0,0,0,0.7); border: 1px solid #f39c12; color: white; padding: 10px 20px; border-radius: 25px; font-size: 14px; outline: none; font-family: 'Exo 2', sans-serif; width: 250px; }
    .pseudo-input::placeholder { color: #666; }
    .btn { padding: 12px 30px; border-radius: 25px; font-size: 14px; font-weight: bold; cursor: pointer; font-family: 'Cinzel', serif; letter-spacing: 2px; border: none; transition: all 0.3s; }
    .btn-gold { background: linear-gradient(135deg, #2ecc71, #27ae60); color: #000;
    .btn-gold:hover { box-shadow: 0 0 30px rgba(243,156,18,0.8); transform: scale(1.05); }
    .btn-action { background: linear-gradient(135deg, #8a2be2, #4169e1); color: white; margin: 5px; }
    .btn-action:hover { box-shadow: 0 0 20px rgba(138,43,226,0.6); transform: scale(1.05); }
    .btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
    .berrys-display { background: rgba(0,0,0,0.8); border: 2px solid #87ceeb; border-radius: 15px; padding: 10px 25px; display: inline-block; margin-bottom: 20px; font-family: 'Cinzel', serif; font-size: 18px; color: #87ceeb; }
    .ocean { background: linear-gradient(180deg, #001a3a, #002855); border-radius: 20px; padding: 20px; margin: 20px 0; position: relative; overflow: hidden; height: 180px; border: 3px solid #f39c12; box-shadow: 0 0 30px rgba(243,156,18,0.3); }
    .waves { position: absolute; bottom: 0; left: 0; right: 0; height: 60px; background: linear-gradient(180deg, transparent, rgba(0,100,200,0.4)); animation: waveAnim 2s infinite ease-in-out; }
    .waves2 { position: absolute; bottom: 10px; left: 0; right: 0; height: 40px; background: linear-gradient(180deg, transparent, rgba(0,150,255,0.3)); animation: waveAnim 2.5s infinite ease-in-out reverse; }
    @keyframes waveAnim { 0%, 100% { transform: translateX(-10px) scaleY(1); } 50% { transform: translateX(10px) scaleY(1.1); } }
    .sunny { position: absolute; bottom: 40px; transition: left 2s ease-in-out; }
    .sunny img { width: 100px; height: 75px; object-fit: contain; filter: drop-shadow(0 5px 15px rgba(255,215,0,0.5)); animation: boatRock 2s infinite ease-in-out; transform: scaleX(-1); }
    @keyframes boatRock { 0%, 100% { transform: rotate(-3deg) translateY(0); } 50% { transform: rotate(3deg) translateY(-5px); } }
    .iles { display: flex; justify-content: space-around; align-items: center; position: absolute; top: 20px; left: 5%; right: 5%; }
    .ile { font-size: 30px; opacity: 0.7; transition: all 0.5s; position: relative; }
    .ile.active { opacity: 1; animation: pulseIle 1s infinite; }
    .ile.visited { opacity: 0.4; }
    @keyframes pulseIle { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.3); } }
    .ile-label { font-size: 9px; color: #f39c12; text-align: center; position: absolute; bottom: -18px; left: 50%; transform: translateX(-50%); white-space: nowrap; font-weight: bold; }
    .event-box { background: rgba(0,0,0,0.9); border-radius: 15px; padding: 25px; margin-top: 20px; display: none; animation: fadeIn 0.5s forwards; }
    .event-box.show { display: block; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .event-icon { font-size: 60px; margin-bottom: 10px; animation: bounce 0.5s ease; }
    @keyframes bounce { 0% { transform: scale(0); } 70% { transform: scale(1.2); } 100% { transform: scale(1); } }
    .event-title { font-family: 'Cinzel', serif; font-size: 22px; color: #ffd700; margin-bottom: 10px; }
    .event-desc { font-size: 14px; color: #aaa; margin-bottom: 20px; line-height: 1.6; }
    .event-result { font-size: 24px; font-weight: bold; margin: 15px 0; }
    .actions-box { margin-top: 15px; }
    .progress-bar { background: rgba(255,255,255,0.1); border-radius: 10px; height: 10px; margin: 15px 0; overflow: hidden; }
    .progress-fill { background: linear-gradient(90deg, #f39c12, #ffd700); height: 100%; border-radius: 10px; transition: width 1s ease; }
    .etape-label { font-size: 13px; color: #f39c12; letter-spacing: 2px; margin-bottom: 5px; }
    .confetti { position: fixed; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; z-index: 9999; display: none; }
  </style>
</head>
<body>
  <div class="container">
    <a href="/minijeux" class="back-btn">&#x2190; Mini Jeux</a>
    <div class="title">&#x1F3F4; COURSE VERS LE ONE PIECE</div>
    <div class="subtitle">Navigue sur la Grand Line et trouve le tresor ultime !</div>
    <div class="setup-box" id="setup-box">
      <input type="text" class="pseudo-input" id="pseudo" placeholder="Ton pseudo Twitch...">
      <button class="btn btn-gold" onclick="commencer()">&#x2693; APPAREILLER !</button>
    </div>
    <div id="berrys-display" class="berrys-display" style="display:none;">
      &#x1F4B0; <span id="berrys-amount">0</span> Berrys
    </div>
    <div id="game-section" style="display:none;">
      <div class="etape-label" id="etape-label">ILE 1/5</div>
      <div class="progress-bar"><div class="progress-fill" id="progress-fill" style="width:0%"></div></div>
      <div class="ocean" id="ocean">
        <div class="iles" id="iles"></div>
        <div class="sunny" id="sunny" style="left:2%;">
          <img src="/persos/sunny.png" alt="Sunny">
        </div>
        <div class="waves"></div>
        <div class="waves2"></div>
      </div>
      <div class="event-box" id="event-box">
        <div class="event-icon" id="event-icon"></div>
        <div class="event-title" id="event-title"></div>
        <div class="event-desc" id="event-desc"></div>
        <div class="event-result" id="event-result"></div>
        <div class="actions-box" id="actions-box"></div>
      </div>
    </div>
  </div>
  <canvas class="confetti" id="confetti"></canvas>
  <script>
    const iles = [
      { nom: 'Ile du Debut', emoji: '&#x1F334;' },
      { nom: 'Ile aux Epees', emoji: '&#x2694;' },
      { nom: 'Ile de Feu', emoji: '&#x1F30B;' },
      { nom: 'Ile des Tempetes', emoji: '&#x26C8;' },
      { nom: 'Ile du Tresor', emoji: '&#x1F3F4;' }
    ];

    const events = [
      { type: 'tresor', icon: '&#x1F4B0;', titre: 'Tresor Decouverts !', desc: 'Ton equipage a trouve un coffre au fond des mers !', gain: 300, couleur: '#ffd700' },
      { type: 'combat_win', icon: '&#x2694;&#xFE0F;', titre: 'Victoire au Combat !', desc: 'Tu as vaincu un pirate rival et recupere son butin !', gain: 200, couleur: '#2ecc71' },
      { type: 'fruit', icon: '&#x1F34E;', titre: 'Fruit du Demon !', desc: 'Un fruit mysterieux flottait sur l ocean !', gain: -1, couleur: '#ffffff' },
      { type: 'marine', icon: '&#x1F6A8;', titre: 'Embuscade de la Marine !', desc: 'La Marine t a intercepte et confisque une partie de ton butin !', gain: -100, couleur: '#e74c3c' },
      { type: 'tempete', icon: '&#x1F32A;', titre: 'Tempete Violente !', desc: 'Une terrible tempete a frappe ton bateau, tu perds du temps mais continues ta route !', gain: 0, couleur: '#3498db' },
      { type: 'allie', icon: '&#x1F91D;', titre: 'Rencontre un Allie !', desc: 'Un equipage ami partage son butin avec toi !', gain: 150, couleur: '#87ceeb' },
      { type: 'jackpot', icon: '&#x1F451;', titre: 'ONE PIECE TROUVE !', desc: 'Tu as atteint Raftel et decouvert le legendaire One Piece !', gain: 2000, couleur: '#ff0000' }
    ];

    let pseudo = '', berrys = 0, etapeActuelle = 0, jeuEnCours = false;

    function initialiserIles() {
      const ilesDiv = document.getElementById('iles');
      ilesDiv.innerHTML = iles.map((ile, i) =>
        '<div class="ile" id="ile-' + i + '">' + ile.emoji + '<div class="ile-label">' + ile.nom + '</div></div>'
      ).join('');
    }

    async function commencer() {
      pseudo = document.getElementById('pseudo').value.trim().toLowerCase();
      if (!pseudo) { alert('Entre ton pseudo !'); return; }
      const r = await fetch('/course/infos?username=' + pseudo);
      const data = await r.json();
      if (data.error) { alert(data.error); return; }
      if (data.cooldown) { alert('Tu peux rejouer dans ' + data.restant + ' heure(s) !'); return; }
      berrys = data.berrys;
      document.getElementById('berrys-amount').textContent = berrys.toLocaleString();
      document.getElementById('berrys-display').style.display = 'inline-block';
      document.getElementById('setup-box').style.display = 'none';
      document.getElementById('game-section').style.display = 'block';
      etapeActuelle = 0;
      jeuEnCours = true;
      initialiserIles();
      majProgression();
      setTimeout(() => prochaineEtape(), 500);
    }

    function majProgression() {
      document.getElementById('etape-label').textContent = 'ILE ' + (etapeActuelle + 1) + '/5';
      document.getElementById('progress-fill').style.width = (etapeActuelle * 20) + '%';
      const positions = [2, 20, 40, 60, 80];
      document.getElementById('sunny').style.left = positions[etapeActuelle] + '%';
      iles.forEach((_, i) => {
        const el = document.getElementById('ile-' + i);
        el.className = 'ile' + (i === etapeActuelle ? ' active' : i < etapeActuelle ? ' visited' : '');
      });
    }

    function prochaineEtape() {
      if (etapeActuelle >= 5) { terminer(); return; }
      const eventBox = document.getElementById('event-box');
      eventBox.classList.remove('show');
      setTimeout(() => {
        let event;
        if (etapeActuelle === 4) {
          event = events.find(e => e.type === 'jackpot');
        } else {
          const probas = [25, 20, 10, 20, 10, 15];
          const rand = Math.random() * 100;
          let cumul = 0;
          let idx = 0;
          for (let i = 0; i < probas.length; i++) {
            cumul += probas[i];
            if (rand < cumul) { idx = i; break; }
          }
          event = events[idx];
        }
        afficherEvent(event);
      }, 500);
    }

    async function afficherEvent(event) {
      document.getElementById('event-icon').innerHTML = event.icon;
      document.getElementById('event-title').textContent = event.titre;
      document.getElementById('event-desc').textContent = event.desc;
      document.getElementById('event-result').style.color = event.couleur;

      const r = await fetch('/course/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: pseudo, type: event.type, gain: event.gain, etape: etapeActuelle })
      });
      const data = await r.json();
      if (data.error) { alert(data.error); return; }
      berrys = data.berrys;
      document.getElementById('berrys-amount').textContent = berrys.toLocaleString();

      if (event.gain > 0) document.getElementById('event-result').textContent = '+' + event.gain + ' Berrys !';
      else if (event.gain < 0 && event.gain !== -1) document.getElementById('event-result').textContent = event.gain + ' Berrys !';
      else if (event.gain === -1) document.getElementById('event-result').textContent = data.fruit + ' no Mi !';
      else document.getElementById('event-result').textContent = 'Pas de gain cette fois...';

      const actionsBox = document.getElementById('actions-box');
      if (etapeActuelle >= 4) {
        actionsBox.innerHTML = '<button class="btn btn-gold" onclick="terminer()">&#x1F3C6; Voir mon butin final !</button>';
        if (event.type === 'jackpot') lancerConfettis();
      } else {
        actionsBox.innerHTML = '<button class="btn btn-action" onclick="allerIleSuivante()">&#x27A1; Ile suivante !</button>';
      }
      document.getElementById('event-box').classList.add('show');
    }

    function allerIleSuivante() {
      etapeActuelle++;
      majProgression();
      prochaineEtape();
    }

    async function terminer() {
      await fetch('/course/terminer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: pseudo })
      });
      document.getElementById('event-icon').innerHTML = '&#x1F3C6;';
      document.getElementById('event-title').textContent = 'Aventure terminee !';
      document.getElementById('event-desc').textContent = 'Tu as traverse toutes les iles du Grand Line !';
      document.getElementById('event-result').textContent = 'Berrys totaux : ' + berrys.toLocaleString();
      document.getElementById('event-result').style.color = '#ffd700';
      document.getElementById('actions-box').innerHTML = '<button class="btn btn-gold" onclick="location.reload()">&#x1F504; Recommencer demain !</button>';
      document.getElementById('progress-fill').style.width = '100%';
      document.getElementById('etape-label').textContent = 'AVENTURE TERMINEE !';
    }

    function lancerConfettis() {
      const canvas = document.getElementById('confetti');
      canvas.style.display = 'block';
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const particules = Array.from({length: 150}, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 8 + 3,
        c: ['#ffd700','#ff0000','#8a2be2','#2ecc71','#87ceeb'][Math.floor(Math.random() * 5)],
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 4 + 2
      }));
      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particules.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
          ctx.fillStyle = p.c;
          ctx.fill();
          p.x += p.vx;
          p.y += p.vy;
          if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
        });
        requestAnimationFrame(draw);
      }
      draw();
      setTimeout(() => { canvas.style.display = 'none'; }, 5000);
    }
  </script>
</body>
</html>`);
});

app.get('/course/infos', async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'Manque username' });
  const { data: primeData } = await supabase.from('primes').select('berrys').eq('username', username).single();
  if (!primeData) return res.status(400).json({ error: 'Pseudo introuvable ! Tu dois etre enregistre sur le stream.' });
  const { data: courseRows } = await supabase.from('codes_temp').select('expire').eq('username', username + '_course');
  const courseData = courseRows && courseRows.length > 0 ? courseRows[0] : null;
  const cooldown = courseData && Date.now() < parseInt(courseData.expire);
  const restant = cooldown ? Math.ceil((parseInt(courseData.expire) - Date.now()) / 3600000) : 0;
  res.json({ berrys: primeData.berrys, cooldown, restant });
});

app.post('/course/event', async (req, res) => {
  const { username, type, gain, etape } = req.body;
  const { data: primeData } = await supabase.from('primes').select('berrys').eq('username', username).single();
  if (!primeData) return res.status(400).json({ error: 'Erreur' });
  let newBerrys = primeData.berrys;
  let fruit = null;
  if (gain === -1) {
    const fruitsListe = ['Yomi-Yomi', 'Hobi-Hobi', 'Bara-Bara', 'Horo-Horo', 'Doru-Doru', 'Clank-Clank', 'Hito-Hito'];
    fruit = fruitsListe[Math.floor(Math.random() * fruitsListe.length)];
    await supabase.from('collection').insert({ username, fruit, rarete: 'Rare' });
  } else if (gain !== 0) {
    newBerrys = Math.max(0, newBerrys + gain);
    await supabase.from('primes').upsert({ username, berrys: newBerrys, derniermessage: 0, derniereprime: 0 });
  }
  res.json({ success: true, berrys: newBerrys, fruit });
});

app.post('/course/terminer', async (req, res) => {
  const { username } = req.body;
  await supabase.from('codes_temp').delete().eq('username', username + '_course');
  await supabase.from('codes_temp').insert({ username: username + '_course', code: 'course', expire: Date.now() + 86400000 });
  res.json({ success: true });
});

// ==================== ANIMATION OBS ====================
app.get('/animation', (req, res) => {
  const fruit = req.query.fruit || '';
  const rarete = req.query.rarete || 'Commun';
  const couleurs = { 'Ultime': '#ffffff', 'Mythique': '#cc0000', 'Legendaire': '#ffd700', 'Epique': '#9b59b6', 'Rare': '#3498db', 'Commun': '#2ecc71' };
  const couleur = couleurs[rarete] || '#2ecc71';
  const html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:transparent;display:flex;justify-content:center;align-items:center;width:500px;height:400px;overflow:hidden;}.machine{background:linear-gradient(145deg,#0d0d1a,#1a1a3e,#0d0d1a);border:3px solid COULEUR;border-radius:24px;padding:25px 20px;text-align:center;box-shadow:0 0 60px COULEUR66,inset 0 0 40px rgba(0,0,0,.8);width:460px;opacity:0;animation:fadeIn .5s forwards;position:relative;overflow:hidden;}.machine::before{content:"x";color:transparent;position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(ellipse at center,COULEUR11 0%,transparent 60%);animation:pulse 2s infinite;}@keyframes pulse{0%,100%{opacity:.5;}50%{opacity:1;}}@keyframes fadeIn{from{opacity:0;transform:scale(.8);}to{opacity:1;transform:scale(1);}}.title{color:COULEUR;font-family:Arial Black,sans-serif;font-size:16px;letter-spacing:6px;margin-bottom:18px;text-transform:uppercase;text-shadow:0 0 20px COULEUR;position:relative;}.slots{display:flex;justify-content:center;gap:12px;margin-bottom:18px;}.slot{background:linear-gradient(180deg,#050510,#0a0a20);border:2px solid COULEUR;border-radius:14px;width:110px;height:110px;overflow:hidden;position:relative;box-shadow:0 0 20px COULEUR44,inset 0 0 15px rgba(0,0,0,.9);}.slot-inner{display:flex;flex-direction:column;align-items:center;width:100%;}.fruit-reveal{display:flex;flex-direction:column;align-items:center;gap:8px;opacity:0;animation:revealFruit .6s 4s forwards;}@keyframes revealFruit{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}.fruit-img{width:70px;height:70px;object-fit:contain;filter:drop-shadow(0 0 15px COULEUR) drop-shadow(0 0 30px COULEUR66);}.fruit-name{color:white;font-family:Arial Black,sans-serif;font-size:18px;font-weight:bold;letter-spacing:2px;text-shadow:0 0 10px white;}.rarete-badge{display:inline-block;background:linear-gradient(135deg,COULEUR33,COULEUR11);border:2px solid COULEUR;color:COULEUR;padding:6px 24px;border-radius:25px;font-family:Arial Black,sans-serif;font-size:14px;font-weight:bold;letter-spacing:4px;text-shadow:0 0 10px COULEUR;box-shadow:0 0 15px COULEUR44;opacity:0;animation:revealBadge .6s 4.5s forwards;}@keyframes revealBadge{from{opacity:0;transform:scale(.5);}to{opacity:1;transform:scale(1);}}</style></head><body><div class="machine"><div class="title">&#x1F3B0; Fruit du Demon &#x1F3B0;</div><div class="slots"><div class="slot" id="s1"><div class="slot-inner"><img src="/fruits/Mera-Mera.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Gum-Gum.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Yami-Yami.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Hie-Hie.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Ope-Ope.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"></div></div><div class="slot" id="s2"><div class="slot-inner"><img src="/fruits/Goro-Goro.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Pika-Pika.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Suna-Suna.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Ito-Ito.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Magu-Magu.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"></div></div><div class="slot" id="s3"><div class="slot-inner"><img src="/fruits/Hana-Hana.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Mochi-Mochi.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Bara-Bara.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Sube-Sube.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Bomu-Bomu.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"></div></div></div><div class="fruit-reveal"><img class="fruit-img" src="/fruits/FRUIT.png" alt="FRUIT"><div class="fruit-name">FRUIT no Mi</div><div class="rarete-badge">RARETE</div></div></div><audio id="spinSound" src="/spin.mp3" preload="auto"></audio><script>document.getElementById("spinSound").play().catch(e=>{});const slots=[document.getElementById("s1"),document.getElementById("s2"),document.getElementById("s3")];const stopTimes=[1500,2500,3500];slots.forEach((slot,i)=>{let pos=0;const interval=setInterval(()=>{pos-=12;slot.querySelector(".slot-inner").style.transform="translateY("+(pos%450)+"px)";},25);setTimeout(()=>{clearInterval(interval);slot.querySelector(".slot-inner").style.transform="translateY(0)";},stopTimes[i]);});<\/script></body></html>';
  res.send(html.replace(/COULEUR/g, couleur).replace(/FRUIT/g, fruit).replace(/RARETE/g, rarete));
});

app.listen(3000, () => console.log('Serveur online demarre !'));
