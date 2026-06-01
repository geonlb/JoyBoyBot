const express = require('express');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const REWARD_ID = '5b62a20f-6679-402f-b5de-f307c3224eb8';
const BROADCASTER_ID = '122593539';
const TWITCH_CLIENT_ID = '4wl3wc4mnurd77ctzhl8s8v6gak6yl';
const TWITCH_TOKEN = '4eep42xahpyaye3kq8qx1odj0va7xx';

const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname)));
app.use('/fruits', express.static(path.join(__dirname, 'fruits')));

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://usbsivjrputwwrohezwk.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzYnNpdmpycHV0d3dyb2hlendrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDExOTM1MSwiZXhwIjoyMDk1Njk1MzUxfQ.UNf-rdDBD0MocGrQW4tzNAW3ksqgR__Zg3b1PwsDlPs';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const CLIENT_ID = process.env.CLIENT_ID || '4wl3wc4mnurd77ctzhl8s8v6gak6yl';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || '9w76c932djulze7uhrqdwjbk4d5fnn';

// Route avis de recherche
app.get('/prime/:username', async (req, res) => {
  const username = req.params.username.toLowerCase();

  const { data: primeData } = await supabase.from('primes').select('berrys').eq('username', username).single();
  const { data: membreData } = await supabase.from('membres').select('personnage').eq('username', username).single();
  const { data: compteurData } = await supabase.from('compteur').select('subs').eq('username', username).single();

  let avatar = 'https://static-cdn.jtvnw.net/user-default-pictures-uv/ebe4cd89-b4f4-4cd9-adac-2f30151b4209-profile_image-300x300.png';
  try {
    const response = await axios.get(`https://api.twitch.tv/helix/users?login=${username}`, {
      headers: { 'Client-ID': CLIENT_ID, 'Authorization': `Bearer ${ACCESS_TOKEN}` }
    });
    if (response.data.data.length > 0) avatar = response.data.data[0].profile_image_url;
  } catch (err) {}

  const berrys = primeData ? primeData.berrys : 0;
  const personnage = membreData ? membreData.personnage : 'Aucun';
  const subs = compteurData ? compteurData.subs : 0;

  res.send(`
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Avis de Recherche - ${username}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #1a1a2e; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .wanted {
      background: linear-gradient(135deg, #e8d5a3, #d4b896, #c9a97d, #d4b896, #e8d5a3);
      width: 400px; padding: 25px 20px; text-align: center; position: relative;
      box-shadow: 0 0 50px rgba(0,0,0,0.9), inset 0 0 80px rgba(0,0,0,0.25);
      border: 4px solid #1a1a1a;
    }
    .wanted::before { content: ''; position: absolute; top: 8px; left: 8px; right: 8px; bottom: 8px; border: 2px solid #1a1a1a; pointer-events: none; }
    .texture { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(ellipse at 20% 30%, rgba(0,0,0,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(0,0,0,0.1) 0%, transparent 50%); pointer-events: none; z-index: 1; }
    .content { position: relative; z-index: 2; }
    .corner { position: absolute; font-size: 22px; color: #1a1a1a; opacity: 0.6; }
    .corner.tl { top: 14px; left: 14px; } .corner.tr { top: 14px; right: 14px; }
    .corner.bl { bottom: 14px; left: 14px; } .corner.br { bottom: 14px; right: 14px; }
    .title { font-family: 'Oswald', sans-serif; font-size: 72px; color: #0d0d0d; letter-spacing: 6px; line-height: 1; text-shadow: 4px 4px 0px rgba(0,0,0,0.15); }
    .subtitle { font-size: 13px; color: #1a1a1a; letter-spacing: 6px; margin-bottom: 15px; border-top: 2px solid #1a1a1a; border-bottom: 2px solid #1a1a1a; padding: 5px 0; font-family: Georgia, serif; }
    .avatar { width: 210px; height: 210px; border: 4px solid #1a1a1a; object-fit: cover; display: block; margin: 0 auto 12px; filter: sepia(20%) contrast(105%); }
    .username { font-family: 'Oswald', sans-serif; font-size: 30px; color: #0d0d0d; margin: 8px 0 4px; letter-spacing: 4px; text-transform: uppercase; }
    .personnage { font-size: 12px; color: #2a1a0a; margin-bottom: 12px; font-style: italic; font-family: Georgia, serif; }
    .divider { border: none; border-top: 2px solid #1a1a1a; margin: 8px 30px; }
    .bounty-label { font-size: 11px; color: #1a1a1a; letter-spacing: 6px; text-transform: uppercase; margin-top: 8px; font-family: Georgia, serif; }
    .bounty { font-family: 'Oswald', sans-serif; font-size: 42px; color: #0d0d0d; letter-spacing: 2px; }
    .bounty-unit { font-size: 13px; color: #2a1a0a; letter-spacing: 5px; margin-bottom: 10px; font-family: Georgia, serif; }
    .footer { font-size: 10px; color: #1a1a1a; letter-spacing: 3px; border-top: 2px solid #1a1a1a; padding-top: 8px; margin-top: 5px; font-family: Georgia, serif; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="wanted">
    <div class="texture"></div>
    <span class="corner tl">⚓</span><span class="corner tr">⚓</span>
    <span class="corner bl">⚓</span><span class="corner br">⚓</span>
    <div class="content">
      <div class="title">WANTED</div>
      <div class="subtitle">DEAD OR ALIVE</div>
      <img class="avatar" src="${avatar}" alt="${username}">
      <div class="username">${username}</div>
      <div class="personnage">${personnage} • ${subs} sub(s)</div>
      <hr class="divider">
      <div class="bounty-label">Prime</div>
      <div class="bounty">${berrys.toLocaleString()}</div>
      <div class="bounty-unit">BERRYS</div>
      <div class="footer">🏴‍☠️ NeyLaBrise — Grand Line 🏴‍☠️</div>
    </div>
  </div>
</body>
</html>`);
});

// Route Grand Line
app.get('/grandline', async (req, res) => {
  const { data: membres } = await supabase.from('membres').select('*');
  const { data: primes } = await supabase.from('primes').select('*');

  const avatars = {};
  for (const m of (membres || [])) {
    try {
      const response = await axios.get(`https://api.twitch.tv/helix/users?login=${m.username}`, {
        headers: { 'Client-ID': CLIENT_ID, 'Authorization': `Bearer ${ACCESS_TOKEN}` }
      });
      if (response.data.data.length > 0) avatars[m.username] = response.data.data[0].profile_image_url;
    } catch (err) {
      avatars[m.username] = 'https://static-cdn.jtvnw.net/user-default-pictures-uv/ebe4cd89-b4f4-4cd9-adac-2f30151b4209-profile_image-300x300.png';
    }
  }

  const factions = [
  { id: 'equipage', nom: '⚓ Équipage de Luffy', couleur: '#e74c3c', bg: '#2c0a0a' },
  { id: 'bigmom', nom: '🍰 Équipage de Big Mom', couleur: '#e91e8c', bg: '#2c0a1f' },
  { id: 'empereurs', nom: '👑 Les Empereurs', couleur: '#f39c12', bg: '#2c1a00' },
  { id: 'grandscorsaires', nom: '⚔️ Les Grands Corsaires', couleur: '#9b59b6', bg: '#1a0a2c' },
  { id: 'marine', nom: '🌊 La Marine', couleur: '#3498db', bg: '#0a1a2c' },
  { id: 'antagonistes', nom: '😈 Les Antagonistes', couleur: '#e74c3c', bg: '#1a0000' },
  { id: 'allies', nom: '🌸 Les Alliés', couleur: '#2ecc71', bg: '#0a2c1a' }
];

  const factionCards = factions.map(f => {
    const factionMembres = (membres || []).filter(m => m.faction === f.id);
    const cards = factionMembres.map(m => {
      const prime = (primes || []).find(p => p.username === m.username);
      const berrys = prime ? prime.berrys.toLocaleString() : '0';
      const avatar = avatars[m.username] || '';
      return `<div class="member-card">
        <img src="${avatar}" alt="${m.username}" class="member-avatar">
        <div class="member-info">
          <div class="member-name">${m.username}</div>
          <div class="member-perso">${m.personnage}</div>
          <div class="member-prime">💰 ${berrys} Berrys</div>
        </div>
      </div>`;
    }).join('');
    return `<div class="faction-card" style="border-color: ${f.couleur}; background: ${f.bg};">
      <div class="faction-title" style="color: ${f.couleur};">${f.nom}</div>
      <div class="faction-count">${factionMembres.length} membre(s)</div>
      <div class="members-grid">${cards || '<div class="empty">Aucun membre</div>'}</div>
    </div>`;
  }).join('');

  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Grand Line - NeyLaBrise</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto:wght@300;400&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0a0a1a; min-height: 100vh; padding: 30px 20px; font-family: 'Roboto', sans-serif; color: white; }
    .header { text-align: center; margin-bottom: 40px; }
    .header h1 { font-family: 'Oswald', sans-serif; font-size: 48px; letter-spacing: 8px; color: #f39c12; text-shadow: 0 0 30px rgba(243,156,18,0.5); }
    .divider { width: 200px; height: 2px; background: linear-gradient(to right, transparent, #f39c12, transparent); margin: 15px auto; }
    .header p { font-size: 14px; color: #888; letter-spacing: 3px; }
    .factions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 25px; max-width: 1400px; margin: 0 auto; }
    .faction-card { border: 2px solid; border-radius: 12px; padding: 20px; }
    .faction-title { font-family: 'Oswald', sans-serif; font-size: 22px; letter-spacing: 3px; margin-bottom: 5px; }
    .faction-count { font-size: 12px; color: #888; letter-spacing: 2px; margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; }
    .members-grid { display: flex; flex-direction: column; gap: 10px; }
    .member-card { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.05); border-radius: 8px; padding: 10px; }
    .member-avatar { width: 50px; height: 50px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.2); object-fit: cover; }
    .member-info { flex: 1; }
    .member-name { font-family: 'Oswald', sans-serif; font-size: 16px; }
    .member-perso { font-size: 12px; color: #aaa; font-style: italic; }
    .member-prime { font-size: 12px; color: #f39c12; }
    .empty { font-size: 13px; color: #555; font-style: italic; text-align: center; padding: 20px; }
    .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #555; letter-spacing: 3px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🏴‍☠️ GRAND LINE 🏴‍☠️</h1>
    <div class="divider"></div>
    <p>CARTE DES ÉQUIPAGES — NEYLABRISE</p>
  </div>
  <div class="factions-grid">${factionCards}</div>
  <div class="footer"><p>🏴‍☠️ NeyLaBrise — Mis à jour en temps réel 🏴‍☠️</p></div>
</body>
</html>`);
});

// EventSub webhook pour les points de chaîne
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));

app.post('/eventsub', async (req, res) => {
  const messageType = req.headers['twitch-eventsub-message-type'];
  
  if (messageType === 'webhook_callback_verification') {
    return res.send(req.body.challenge);
  }
  
  if (messageType === 'notification') {
    const event = req.body.event;
    if (event.reward.id === REWARD_ID) {
      const username = event.user_login.toLowerCase();
      console.log(`Rachat 1-SUB détecté pour ${username}`);
      
      const { data: compteurData } = await supabase.from('compteur').select('subs').eq('username', username).single();
      const newSubs = compteurData ? compteurData.subs + 1 : 1;
      await supabase.from('compteur').upsert({ username, subs: newSubs });
      
      const { data: primeData } = await supabase.from('primes').select('berrys').eq('username', username).single();
      const newBerrys = primeData ? primeData.berrys + 5000 : 5000;
      await supabase.from('primes').upsert({ username, berrys: newBerrys, derniermessage: 0, derniereprime: 0 });
      
      console.log(`${username} a maintenant ${newSubs} sub(s) et ${newBerrys} Berrys !`);
    }
  }
  
  res.sendStatus(200);
});

async function enregistrerEventSub() {
  try {
    const tokenRes = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: {
        client_id: TWITCH_CLIENT_ID,
        client_secret: 'pher47e2e37jw51ygtxphw5dyjo5rq',
        grant_type: 'client_credentials'
      }
    });
    const appToken = tokenRes.data.access_token;
    
    await axios.post('https://api.twitch.tv/helix/eventsub/subscriptions', {
      type: 'channel.channel_points_custom_reward_redemption.add',
      version: '1',
      condition: { broadcaster_user_id: BROADCASTER_ID, reward_id: REWARD_ID },
      transport: { method: 'webhook', callback: 'https://joyboybot-web.onrender.com/eventsub', secret: 'joyboybotsecret123' }
    }, {
      headers: {
        'Client-ID': TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${appToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('EventSub enregistré !');
  } catch (err) {
    console.log('EventSub erreur:', err.response?.data || err.message);
  }
}

enregistrerEventSub();

app.get('/collection/:username', async (req, res) => {
  const username = req.params.username.toLowerCase();

  let avatar = 'https://static-cdn.jtvnw.net/user-default-pictures-uv/ebe4cd89-b4f4-4cd9-adac-2f30151b4209-profile_image-300x300.png';
  try {
    const response = await axios.get(`https://api.twitch.tv/helix/users?login=${username}`, {
      headers: { 'Client-ID': CLIENT_ID, 'Authorization': `Bearer ${ACCESS_TOKEN}` }
    });
    if (response.data.data.length > 0) avatar = response.data.data[0].profile_image_url;
  } catch (err) {}

  const { data: fruits } = await supabase.from('collection').select('*').eq('username', username).order('obtenu_le', { ascending: false });
  const { data: primeData } = await supabase.from('primes').select('berrys').eq('username', username).single();
  const berrys = primeData ? primeData.berrys : 0;

  const rareteConfig = {
    'Mythique': { emoji: '🔱', couleur: '#ff00ff', bg: '#2a0a2a', glow: 'rgba(255,0,255,0.5)' },
    'Légendaire': { emoji: '⭐', couleur: '#ffd700', bg: '#2a2000', glow: 'rgba(255,215,0,0.5)' },
    'Épique': { emoji: '💜', couleur: '#9b59b6', bg: '#1a0a2a', glow: 'rgba(155,89,182,0.5)' },
    'Rare': { emoji: '💙', couleur: '#3498db', bg: '#0a1a2a', glow: 'rgba(52,152,219,0.5)' },
    'Commun': { emoji: '🟢', couleur: '#2ecc71', bg: '#0a2a0a', glow: 'rgba(46,204,113,0.3)' }
  };

  // Regrouper les fruits en double
const fruitsGroupes = {};
(fruits || []).forEach(f => {
  const key = f.fruit;
  if (fruitsGroupes[key]) {
    fruitsGroupes[key].count += 1;
  } else {
    fruitsGroupes[key] = { ...f, count: 1 };
  }
});

const fruitsCards = Object.values(fruitsGroupes).map(f => {
  const config = rareteConfig[f.rarete] || rareteConfig['Commun'];
  const date = new Date(f.obtenu_le).toLocaleDateString('fr-FR');
  return `
    <div class="fruit-card" style="border-color: ${config.couleur}; background: ${config.bg}; box-shadow: 0 0 15px ${config.glow};">
      ${f.count > 1 ? `<div class="fruit-count" style="color: ${config.couleur}; font-size: 13px; font-weight: bold; margin-bottom: 5px;">x${f.count}</div>` : ''}
      <div class="fruit-rarete" style="color: ${config.couleur};">${config.emoji} ${f.rarete}</div>
      <img src="/fruits/${f.fruit}.png" alt="${f.fruit}" style="width: 80px; height: 80px; object-fit: contain; margin-bottom: 10px;">
      <div class="fruit-nom">${f.fruit}</div>
      <div class="fruit-nom-complet" style="color: ${config.couleur};">${f.fruit} no Mi</div>
      <div class="fruit-date">Obtenu le ${date}</div>
    </div>
  `;
}).join('');

  const stats = {};
  (fruits || []).forEach(f => { stats[f.rarete] = (stats[f.rarete] || 0) + 1; });

  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Collection de ${username}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto:wght@300;400&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0a0a1a; min-height: 100vh; padding: 30px 20px; font-family: 'Roboto', sans-serif; color: white; }
    .header { text-align: center; margin-bottom: 40px; }
    .profile { display: flex; align-items: center; justify-content: center; gap: 20px; margin-bottom: 20px; }
    .profile img { width: 80px; height: 80px; border-radius: 50%; border: 3px solid #f39c12; }
    .profile-info h1 { font-family: 'Oswald', sans-serif; font-size: 32px; color: #f39c12; letter-spacing: 3px; }
    .profile-info p { color: #888; font-size: 14px; }
    .berrys { font-size: 18px; color: #f39c12; margin-top: 5px; }
    .divider { width: 200px; height: 2px; background: linear-gradient(to right, transparent, #f39c12, transparent); margin: 15px auto; }
    .stats { display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin-bottom: 30px; }
    .stat-badge { padding: 5px 15px; border-radius: 20px; font-size: 13px; font-weight: bold; }
    .collection-title { font-family: 'Oswald', sans-serif; font-size: 24px; letter-spacing: 4px; color: #f39c12; text-align: center; margin-bottom: 20px; }
    .fruits-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; max-width: 1200px; margin: 0 auto; }
    .fruit-card { border: 2px solid; border-radius: 12px; padding: 20px; text-align: center; transition: transform 0.2s; }
    .fruit-card:hover { transform: scale(1.05); }
    .fruit-rarete { font-size: 13px; letter-spacing: 2px; margin-bottom: 10px; font-weight: bold; }
    .fruit-nom { font-family: 'Oswald', sans-serif; font-size: 22px; margin-bottom: 5px; }
    .fruit-nom-complet { font-size: 14px; font-style: italic; margin-bottom: 10px; }
    .fruit-date { font-size: 11px; color: #666; }
    .empty { text-align: center; padding: 60px; color: #555; font-size: 18px; }
    .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #555; letter-spacing: 3px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="profile">
      <img src="${avatar}" alt="${username}">
      <div class="profile-info">
        <h1>${username}</h1>
        <p class="berrys">💰 ${berrys.toLocaleString()} Berrys</p>
      </div>
    </div>
    <div class="divider"></div>
    <div class="stats">
      ${Object.entries(rareteConfig).map(([r, c]) => stats[r] ? `<span class="stat-badge" style="background: ${c.bg}; color: ${c.couleur}; border: 1px solid ${c.couleur};">${c.emoji} ${r}: ${stats[r]}</span>` : '').join('')}
    </div>
    <div class="collection-title">🍎 COLLECTION DE FRUITS DU DÉMON 🍎</div>
  </div>
  <div class="fruits-grid">
    ${fruitsCards || '<div class="empty">Aucun fruit collecté pour le moment !<br>Tape !fruit dans le chat pour commencer !</div>'}
  </div>
  <div class="footer"><p>🏴‍☠️ NeyLaBrise — Grand Line 🏴‍☠️</p></div>
</body>
</html>`);
});

app.get('/animation', (req, res) => {
  const fruit = req.query.fruit || '';
  const rarete = req.query.rarete || 'Commun';
  const couleurs = {
    'Mythique': '#ff00ff',
    'Légendaire': '#ffd700',
    'Épique': '#9b59b6',
    'Rare': '#3498db',
    'Commun': '#2ecc71'
  };
  const couleur = couleurs[rarete] || '#2ecc71';
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: transparent; display: flex; justify-content: center; align-items: center; width: 500px; height: 400px; font-family: Arial Black, sans-serif; overflow: hidden; }
    .machine { background: linear-gradient(145deg, #1a1a2e, #16213e); border: 4px solid COULEUR; border-radius: 20px; padding: 30px; text-align: center; box-shadow: 0 0 40px COULEUR88; width: 460px; opacity: 0; animation: fadeIn 0.3s forwards; }
    @keyframes fadeIn { to { opacity: 1; } }
    .title { color: COULEUR; font-size: 18px; letter-spacing: 4px; margin-bottom: 20px; text-transform: uppercase; }
    .slots { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; height: 100px; overflow: hidden; }
    .slot { background: #0a0a1a; border: 2px solid COULEUR; border-radius: 10px; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; font-size: 40px; }
    .slot-inner { animation: spin 0.1s linear infinite; }
    .slot.stopped .slot-inner { animation: none !important; transform: translateY(0); }
    @keyframes spin { 0% { transform: translateY(0); } 100% { transform: translateY(-100%); } }
    .fruit-name { color: white; font-size: 22px; font-weight: bold; letter-spacing: 2px; margin-bottom: 10px; opacity: 0; animation: showName 0.5s 4s forwards; }
    @keyframes showName { to { opacity: 1; } }
    .rarete-badge { display: inline-block; background: COULEUR22; border: 2px solid COULEUR; color: COULEUR; padding: 5px 20px; border-radius: 20px; font-size: 16px; font-weight: bold; letter-spacing: 3px; opacity: 0; animation: showBadge 0.5s 4.5s forwards; }
    @keyframes showBadge { to { opacity: 1; } }
    .fruit-img { width: 60px; height: 60px; object-fit: contain; opacity: 0; animation: showImg 0.5s 4s forwards; }
    @keyframes showImg { to { opacity: 1; } }
  </style>
</head>
<body>
  <div class="machine">
    <div class="title">🎰 Fruit du Démon 🎰</div>
    <div class="slots">
      <div class="slot" id="s1"><div class="slot-inner"><img src="/fruits/Mera-Mera.png" style="width:70px;height:70px;object-fit:contain"><img src="/fruits/Gum-Gum.png" style="width:70px;height:70px;object-fit:contain"><img src="/fruits/Yami-Yami.png" style="width:70px;height:70px;object-fit:contain"><img src="/fruits/Hie-Hie.png" style="width:70px;height:70px;object-fit:contain"><img src="/fruits/Ope-Ope.png" style="width:70px;height:70px;object-fit:contain"></div></div>
<div class="slot" id="s2"><div class="slot-inner"><img src="/fruits/Goro-Goro.png" style="width:70px;height:70px;object-fit:contain"><img src="/fruits/Pika-Pika.png" style="width:70px;height:70px;object-fit:contain"><img src="/fruits/Suna-Suna.png" style="width:70px;height:70px;object-fit:contain"><img src="/fruits/Ito-Ito.png" style="width:70px;height:70px;object-fit:contain"><img src="/fruits/Magu-Magu.png" style="width:70px;height:70px;object-fit:contain"></div></div>
<div class="slot" id="s3"><div class="slot-inner"><img src="/fruits/Hana-Hana.png" style="width:70px;height:70px;object-fit:contain"><img src="/fruits/Mochi-Mochi.png" style="width:70px;height:70px;object-fit:contain"><img src="/fruits/Bara-Bara.png" style="width:70px;height:70px;object-fit:contain"><img src="/fruits/Sube-Sube.png" style="width:70px;height:70px;object-fit:contain"><img src="/fruits/Bomu-Bomu.png" style="width:70px;height:70px;object-fit:contain"></div></div>
    </div>
    <img class="fruit-img" src="/fruits/FRUIT.png" alt="FRUIT">
    <div class="fruit-name">FRUIT no Mi</div>
    <div class="rarete-badge">RARETE</div>
  </div>
  <script>
  const slots = [
    document.getElementById('s1'),
    document.getElementById('s2'),
    document.getElementById('s3')
  ];
  
  const stopTimes = [1500, 2500, 3500];
  
  slots.forEach((slot, i) => {
    let pos = 0;
    const interval = setInterval(() => {
      pos -= 10;
      slot.querySelector('.slot-inner').style.transform = 'translateY(' + (pos % 350) + 'px)';
    }, 30);
    
    setTimeout(() => {
      clearInterval(interval);
      slot.querySelector('.slot-inner').style.transform = 'translateY(0)';
      slot.querySelector('.slot-inner').style.animation = 'none';
    }, stopTimes[i]);
  });
</script>
</body>
</html>`;
  res.send(html.replace(/COULEUR/g, couleur).replace(/FRUIT/g, fruit).replace(/RARETE/g, rarete));
});

app.listen(3000, () => console.log('Serveur online démarré !'));