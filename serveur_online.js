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
  </div>
  ${etageres}
  <div class="footer"><p>NeyLaBrise - Grand Line</p></div>
  <script>
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
  </script>
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
