require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const REWARD_ID = '5b62a20f-6679-402f-b5de-f307c3224eb8';
const BROADCASTER_ID = '122593539';
const TWITCH_CLIENT_ID = '4wl3wc4mnurd77ctzhl8s8v6gak6yl';
const IMG = 'https://usbsivjrputwwrohezwk.supabase.co/storage/v1/object/public/images';

const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname)));
app.get('/fruits/:file', (req, res) => res.redirect(IMG + '/fruits/' + req.params.file));
app.get('/persos/:file', (req, res) => res.redirect(IMG + '/persos/' + req.params.file));
app.get('/badges/:file', (req, res) => res.redirect(IMG + '/badges/' + req.params.file));

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://usbsivjrputwwrohezwk.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzYnNpdmpycHV0d3dyb2hlendrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDExOTM1MSwiZXhwIjoyMDk1Njk1MzUxfQ.UNf-rdDBD0MocGrQW4tzNAW3ksqgR__Zg3b1PwsDlPs';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
console.log('DEBUG secret:', process.env.CLIENT_SECRET ? 'present, longueur=' + process.env.CLIENT_SECRET.length : 'ABSENT');

const CLIENT_ID = process.env.CLIENT_ID || '4wl3wc4mnurd77ctzhl8s8v6gak6yl';
let ACCESS_TOKEN = process.env.ACCESS_TOKEN || '9w76c932djulze7uhrqdwjbk4d5fnn';

async function refreshToken() {
  try {
    const t = await axios.post('https://id.twitch.tv/oauth2/token', null, { params: { client_id: TWITCH_CLIENT_ID, client_secret: process.env.CLIENT_SECRET, grant_type: 'client_credentials' } });
    ACCESS_TOKEN = t.data.access_token;
    console.log('Token Twitch renouvele !');
  } catch (e) { console.log('Erreur refresh token:', e.message); }
}
refreshToken();
setInterval(refreshToken, 3600000);

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
  <style>
@keyframes lpPulse { 0%{transform:scale(1);opacity:0.6;} 80%{transform:scale(2);opacity:0;} 100%{opacity:0;} }
.lp-pulse{position:absolute;inset:0;border-radius:50%;background:#87ceeb;animation:lpPulse 2s ease-out infinite;pointer-events:none;}
#logpose-bag:hover > div { box-shadow:0 0 30px rgba(135,206,235,0.9) !important; }
</style>
<div id="logpose-bag" onclick="toggleLogPose()" style="position:fixed;bottom:20px;left:20px;z-index:9999;width:60px;height:60px;cursor:pointer;">
  <span class="lp-pulse"></span>
  <span class="lp-pulse" style="animation-delay:1s;"></span>
  <div style="position:absolute;inset:0;border-radius:50%;background:linear-gradient(135deg,#8a2be2,#4169e1);border:2px solid #87ceeb;display:flex;align-items:center;justify-content:center;font-size:30px;box-shadow:0 0 20px rgba(135,206,235,0.6);transition:box-shadow 0.3s;">&#x1F4B0;</div>
  <span id="lp-badge" style="position:absolute;top:-2px;right:-2px;width:20px;height:20px;border-radius:50%;background:#ff4655;color:white;font-size:13px;font-weight:bold;display:none;align-items:center;justify-content:center;border:2px solid #050510;">!</span>
</div>
<div id="logpose-panel" style="position:fixed;bottom:90px;left:20px;z-index:9999;width:280px;background:rgba(0,0,0,0.92);border:1px solid #8a2be2;border-radius:16px;padding:18px;display:none;box-shadow:0 0 30px rgba(138,43,226,0.5);font-family:'Exo 2',sans-serif;">
  <div id="lp-content">Chargement...</div>
</div>
<script>
(function(){
  var REWARDS = [50,100,200,300,400,500,600,700,800,900,1000];
  var params = new URLSearchParams(window.location.search);
  var verified = params.get('verified') === 'true';
  var owner = params.get('owner');
  var currentUser = (verified && owner) ? owner : null;
  window.toggleLogPose = function(){ var p = document.getElementById('logpose-panel'); p.style.display = (p.style.display === 'block') ? 'none' : 'block'; };
  function ladderHTML(h){ var c=''; for(var i=0;i<REWARDS.length;i++){ var d=i+1,n=d===h,bg=n?'#8a2be2':'rgba(255,255,255,0.06)',co=n?'#fff':'#888',bo=n?'#87ceeb':'rgba(255,255,255,0.1)'; c+='<div style="border:1px solid '+bo+';background:'+bg+';border-radius:8px;padding:4px 2px;text-align:center;"><div style="font-size:10px;font-weight:bold;color:'+co+';">J'+d+'</div><div style="font-size:10px;color:'+(n?'#cbe6f7':'#777')+';">'+REWARDS[i]+'</div></div>'; } return '<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px;margin:12px 0;">'+c+'</div>'; }
  function header(){ return '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;"><span style="font-size:20px;">&#x1F9ED;</span><span style="font-weight:bold;font-size:15px;color:#87ceeb;">Berrys journalier</span></div>'; }
  function render(){
    var c=document.getElementById('lp-content'), badge=document.getElementById('lp-badge');
    if(!currentUser){ c.innerHTML=header()+'<p style="font-size:13px;color:#bbb;line-height:1.5;margin-bottom:14px;">Connecte-toi avec Twitch pour reclamer ta recompense quotidienne en Berrys !</p><a href="/auth/twitch?username=guest&from=accueil" style="display:block;text-align:center;background:linear-gradient(135deg,#8a2be2,#4169e1);color:white;padding:10px;border-radius:12px;text-decoration:none;font-weight:bold;font-size:14px;">Se connecter avec Twitch</a>'; return; }
    fetch('/daily/infos?username='+encodeURIComponent(currentUser)).then(function(r){return r.json();}).then(function(d){
      if(d.error){ c.innerHTML=header()+'<p style="font-size:13px;color:#ffd479;">'+d.error+'</p>'; return; }
      var html=header();
      if(d.cooldown){ if(badge)badge.style.display='none'; html+='<p style="font-size:13px;color:#bbb;margin-bottom:4px;">Tu as deja recupere ton Log Pose !</p><p style="font-size:13px;color:#87ceeb;margin-bottom:2px;">Reviens dans <b>'+d.restantH+'h</b> pour continuer ta serie.</p>'+ladderHTML(d.prochainJour)+'<p style="font-size:11px;color:#777;text-align:center;">Serie actuelle : jour '+d.streakActuel+'</p>'; }
      else { if(badge)badge.style.display='flex'; html+='<div style="text-align:center;margin-bottom:2px;"><span style="font-size:28px;font-weight:bold;color:#fff;">+'+d.prochaineRecompense+'</span> <span style="font-size:13px;color:#aaa;">Berrys</span></div><p style="font-size:12px;color:#87ceeb;text-align:center;">Jour '+d.prochainJour+' de ta serie</p>'+ladderHTML(d.prochainJour)+'<button id="lp-claim" style="width:100%;background:linear-gradient(135deg,#8a2be2,#4169e1);color:white;border:none;border-radius:12px;padding:11px;font-size:15px;font-weight:bold;cursor:pointer;">Recuperer mon Log Pose</button>'; }
      c.innerHTML=html; var b=document.getElementById('lp-claim'); if(b)b.addEventListener('click',claim);
    }).catch(function(){ c.innerHTML=header()+'<p style="font-size:13px;color:#f88;">Erreur de connexion, reessaie.</p>'; });
  }
  function claim(){
    var b=document.getElementById('lp-claim'); if(b){b.disabled=true;b.textContent='...';}
    fetch('/daily/claim',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:currentUser})}).then(function(r){return r.json();}).then(function(d){
      if(d.error){ render(); return; }
      var c=document.getElementById('lp-content'), badge=document.getElementById('lp-badge'); if(badge)badge.style.display='none';
      c.innerHTML='<div style="text-align:center;padding:10px 0;"><div style="font-size:34px;margin-bottom:6px;">&#x1F4B0;</div><p style="font-size:18px;font-weight:bold;color:#87ceeb;margin-bottom:4px;">+'+d.reward+' Berrys !</p><p style="font-size:13px;color:#bbb;">Serie : jour '+d.streak+' &#x2022; Total : '+d.berrys.toLocaleString()+'</p><p style="font-size:12px;color:#777;margin-top:8px;">Reviens demain pour continuer !</p></div>';
    }).catch(function(){ render(); });
  }
  render();
  if(verified && owner){ document.getElementById('logpose-panel').style.display='block'; }
})();
</script>
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
    const t = await axios.post('https://id.twitch.tv/oauth2/token', null, { params: { client_id: TWITCH_CLIENT_ID, client_secret: process.env.CLIENT_SECRET, grant_type: 'client_credentials' } });
    await axios.post('https://api.twitch.tv/helix/eventsub/subscriptions', { type: 'channel.channel_points_custom_reward_redemption.add', version: '1', condition: { broadcaster_user_id: BROADCASTER_ID, reward_id: REWARD_ID }, transport: { method: 'webhook', callback: 'https://joyboybot-web.onrender.com/eventsub', secret: 'joyboybotsecret123' } }, { headers: { 'Client-ID': TWITCH_CLIENT_ID, 'Authorization': 'Bearer ' + t.data.access_token, 'Content-Type': 'application/json' } });
    console.log('EventSub enregistre !');
  } catch (err) { console.log('EventSub erreur:', err.response?.data || err.message); }
}
enregistrerEventSub();

// ==================== AUTH TWITCH ====================
app.get('/auth/twitch', (req, res) => {
  const username = req.query.username;
  const from = req.query.from || 'collection';
  res.redirect('https://id.twitch.tv/oauth2/authorize?client_id=' + CLIENT_ID + '&redirect_uri=https://joyboybot-web.onrender.com/auth/callback&response_type=code&scope=user:read:email&state=' + username + '|' + from);
});

app.get('/auth/callback', async (req, res) => {
  const { code, state } = req.query;
  try {
    const t = await axios.post('https://id.twitch.tv/oauth2/token', null, { params: { client_id: CLIENT_ID, client_secret: process.env.CLIENT_SECRET, code, grant_type: 'authorization_code', redirect_uri: 'https://joyboybot-web.onrender.com/auth/callback' } });
    const u = await axios.get('https://api.twitch.tv/helix/users', { headers: { 'Client-ID': CLIENT_ID, 'Authorization': 'Bearer ' + t.data.access_token } });
    const twitchUsername = u.data.data[0].login;
    const from = state.includes('|') ? state.split('|')[1] : 'collection';
    if (from === 'collection') {
      res.redirect('/collection/' + twitchUsername + '?verified=true&owner=' + twitchUsername);
    } else if (from === 'eveil') {
      res.redirect('/eveil?verified=true&owner=' + twitchUsername);
    } else if (from === 'accueil') {
      res.redirect('/?verified=true&owner=' + twitchUsername);
    } else {
      res.redirect('/' + from + '?verified=true&owner=' + twitchUsername);
    }
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
  <div style="position:fixed;bottom:20px;right:20px;z-index:9999;display:flex;align-items:center;gap:10px;">
    <span style="font-family:'Oswald',sans-serif;font-size:13px;color:#f39c12;letter-spacing:2px;background:rgba(0,0,0,0.7);padding:5px 12px;border-radius:20px;border:1px solid #f39c12;">NLB</span>
    <button id="music-btn" onclick="toggleMusic()" style="background:rgba(0,0,0,0.85);border:2px solid #f39c12;color:white;width:55px;height:55px;border-radius:50%;font-size:24px;cursor:pointer;box-shadow:0 0 20px rgba(243,156,18,0.6);transition:all 0.3s;display:flex;align-items:center;justify-content:center;">&#x1F507;</button>
  </div>
  <audio id="bg-music" src="/persos/lacommunlb.mp3" loop></audio>
  <script>
    let playing = false;
    function toggleMusic() {
      const music = document.getElementById('bg-music');
      const btn = document.getElementById('music-btn');
      if (playing) {
        music.pause();
        btn.innerHTML = '&#x1F507;';
        btn.style.borderColor = '#f39c12';
      } else {
        music.play();
        btn.innerHTML = '&#x1F3B5;';
        btn.style.borderColor = '#87ceeb';
      }
      playing = !playing;
    }
  </script>
</body>
</html>`);
});

// ==================== LEADERBOARD ====================
app.get('/leaderboard', async (req, res) => {
  const { data: collections } = await supabase.from('collection').select('username, rarete');
  const { data: membres } = await supabase.from('membres').select('username, personnage');
  const { data: primes } = await supabase.from('primes').select('username, berrys');
  const scores = {};
  (primes || []).forEach(p => {
    scores[p.username] = { username: p.username, score: p.berrys, fruits: 0 };
  });
  (collections || []).forEach(f => {
    if (scores[f.username]) scores[f.username].fruits += 1;
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
    return '<div class="player-row ' + (isTop3 ? 'top3' : '') + '" style="' + (isTop3 ? 'border-color:' + ['#ff0000','#ff8c00','#ffd700'][i] + ';background:rgba(0,0,0,.85)' + ';' : '') + '"><div class="rank">' + medal + '</div><img src="' + avatar + '" class="player-avatar"><div class="player-info"><div class="player-name">' + s.username + '</div>' + (perso ? '<div class="player-perso">' + perso + '</div>' : '') + '</div><div class="player-stats"><div class="player-score">' + s.score.toLocaleString() + ' Berrys</div><div class="player-fruits">' + s.fruits + ' fruits</div></div></div>';
  }).join('');

  res.send('<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Classement - NeyLaBrise</title><link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Roboto:wght@300;400&display=swap" rel="stylesheet"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#0a0a1a url(/persos/classementfond.png) center/cover fixed;min-height:100vh;padding:30px 20px;font-family:\'Roboto\',sans-serif;color:white;}.header{text-align:center;margin-bottom:40px;position:relative;z-index:1;}.factions-grid{position:relative;z-index:1;}.header h1{font-family:\'Oswald\',sans-serif;font-size:42px;letter-spacing:6px;color:#ffffff;text-shadow:0 0 10px #8a2be2,0 0 20px #8a2be2,0 0 40px #8a2be2;}.divider{width:200px;height:2px;background:linear-gradient(to right,transparent,#f39c12,transparent);margin:15px auto;}.subtitle{font-size:13px;color:#888;letter-spacing:3px;}.leaderboard{max-width:700px;margin:0 auto;display:flex;flex-direction:column;gap:10px;}.player-row{display:flex;align-items:center;gap:15px;background:rgba(0,0,0,.85);border:3px solid #ffffff;border-radius:12px;padding:12px 20px;transition:transform .2s;}.player-row:hover{transform:translateX(5px);}.player-row.top3{border:3px solid;}.rank{font-family:\'Oswald\',sans-serif;font-size:22px;width:40px;text-align:center;}.player-avatar{width:45px;height:45px;border-radius:50%;border:2px solid rgba(255,255,255,.2);object-fit:cover;}.player-info{flex:1;}.player-name{font-family:\'Oswald\',sans-serif;font-size:18px;letter-spacing:1px;}.player-perso{font-size:12px;color:#f39c12;font-style:italic;}.player-stats{text-align:right;}.player-score{font-family:\'Oswald\',sans-serif;font-size:20px;color:#f39c12;}.player-fruits{font-size:11px;color:#888;}.points-legend{max-width:700px;margin:30px auto 0;background:rgba(0,0,0,.8);border:1px solid rgba(255,255,255,.3);border-radius:12px;padding:25px;display:flex;justify-content:center;gap:15px;flex-wrap:wrap;}.legend-item{font-size:15px;font-weight:bold;padding:6px 14px;border-radius:20px;}.footer{text-align:center;margin-top:40px;font-size:12px;color:#555;letter-spacing:3px;}</style></head><body><div class="header"><h1>&#x1F3C6; CLASSEMENT &#x1F3C6;</h1><div class="divider"></div><p class="subtitle"> - NEYLABRISE</p></div><div class="leaderboard">' + rows + '</div><div class="footer"><p>NeyLaBrise - Grand Line</p></div></body></html>');
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
      <a href="/combat" class="card">
        <div class="card-icon">&#x2694;&#xFE0F;</div>
        <div class="card-title">COMBAT DE PIRATES</div>
        <div class="card-desc">Affronte des ennemis légendaires et remporte des Berrys !</div>
        <div class="card-gain">&#x1F4B0; Jusqu'a 1500 Berrys</div>
        <div class="card-cooldown">&#x23F0; Cooldown : 30 minutes</div>
      </a>
      </div>
      <a href="/blackjack" class="card">
        <div class="card-icon">&#x1F0CF;</div>
        <div class="card-title">BLACKJACK PIRATE</div>
        <div class="card-desc">21 style One Piece, double ta mise ou perds tout !</div>
        <div class="card-gain">&#x1F4B0; Mise variable</div>
        <div class="card-cooldown">&#x23F0; Pas de cooldown</div>
      </a>
      <a href="/course" class="card">
        <div class="card-icon">&#x1F3F4;</div>
        <div class="card-title">COURSE VERS LE ONE PIECE</div>
        <div class="card-desc">Navigue sur la Grand Line et trouve le tresor ultime !</div>
        <div class="card-gain">&#x1F4B0; Jusqu'a 1000 Berrys + Fruits !</div>
        <div class="card-cooldown">&#x23F0; 1 fois par jour</div>
      </a>
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
    ${req.query.verified === 'true' && req.query.owner ? `
    <div class="search-bar">
      <div id="pseudo-display" style="background:rgba(0,0,0,0.7);border:1px solid #8a2be2;color:white;padding:10px 20px;border-radius:25px;font-size:14px;">&#x2705; ${req.query.owner}</div>
      <button class="valider-btn" onclick="chargerAuto('${req.query.owner}')">Jouer !</button>
    </div>` : `
    <div style="text-align:center;margin-bottom:20px;">
      <a href="/auth/twitch?username=guest&from=roulette" style="background:#9146ff;color:white;padding:12px 25px;border-radius:25px;text-decoration:none;font-weight:bold;font-size:14px;">Se connecter avec Twitch pour jouer !</a>
    </div>`}
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

    function chargerAuto(p) {
      pseudo = p.toLowerCase();
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
        document.getElementById('result-title').textContent = '🚔 La Marine t&#39;a arrêté !';
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

// ==================== EVEIL DE FRUIT (RPG) ====================
const EVEIL_IMG = 'https://usbsivjrputwwrohezwk.supabase.co/storage/v1/object/public/images';
// Calcule le bonheur reel en tenant compte du temps ecoule (-2/heure)
async function appliquerDecroissanceBonheur(joueur) {
  if (!joueur || joueur.stade < 2) return joueur; // pas avant l'eclosion
  const maintenant = Date.now();
  const derniereMaj = joueur.bonheur_maj || maintenant;
  const heuresEcoulees = Math.floor((maintenant - derniereMaj) / (60 * 60 * 1000));
  if (heuresEcoulees >= 1) {
    const perte = heuresEcoulees * 2; // -2 par heure
    const nouveauBonheur = Math.max(0, (joueur.bonheur != null ? joueur.bonheur : 50) - perte);
    await supabase.from('eveil_joueurs').update({ bonheur: nouveauBonheur, bonheur_maj: maintenant }).eq('username', joueur.username);
    joueur.bonheur = nouveauBonheur;
    joueur.bonheur_maj = maintenant;
  }
  return joueur;
}

// Recuperer l'etat d'un joueur
app.get('/eveil/joueur', async (req, res) => {
  const username = req.query.username;
  if (!username) return res.status(400).json({ error: 'Manque username' });
  let { data } = await supabase.from('eveil_joueurs').select('*').eq('username', username.toLowerCase()).single();
  if (data) data = await appliquerDecroissanceBonheur(data);
  res.json({ joueur: data || null });
});

// Choisir son genre (cree le joueur)
app.post('/eveil/genre', async (req, res) => {
  const { username, genre } = req.body;
  if (!username || !genre) return res.status(400).json({ error: 'Manque des infos' });
  const u = username.toLowerCase();
  const { data: existant } = await supabase.from('eveil_joueurs').select('username').eq('username', u).single();
  if (existant) return res.status(400).json({ error: 'Tu as deja commence ton aventure !' });
  await supabase.from('eveil_joueurs').insert({ username: u, genre, cree_le: Date.now() });
  res.json({ success: true });
});

// Choisir son fruit (definitif)
app.post('/eveil/fruit', async (req, res) => {
  const { username, fruit } = req.body;
  if (!username || !fruit) return res.status(400).json({ error: 'Manque des infos' });
  const u = username.toLowerCase();
  const { data: joueur } = await supabase.from('eveil_joueurs').select('fruit').eq('username', u).single();
  if (!joueur) return res.status(400).json({ error: 'Cree ton personnage d\'abord !' });
  if (joueur.fruit) return res.status(400).json({ error: 'Tu as deja choisi ton fruit !' });
  await supabase.from('eveil_joueurs').update({ fruit, stade: 1, niveau: 1, xp: 0, pv_actuels: 100 }).eq('username', u);
  res.json({ success: true });
});

// Nommer son monstre (a l'eclosion, definitif)
app.post('/eveil/nommer', async (req, res) => {
  const { username, surnom } = req.body;
  if (!username || !surnom) return res.status(400).json({ error: 'Manque des infos' });
  const u = username.toLowerCase();
  const nom = surnom.trim().slice(0, 20); // max 20 caracteres
  if (nom.length < 1) return res.status(400).json({ error: 'Nom invalide' });
  const { data: j } = await supabase.from('eveil_joueurs').select('surnom').eq('username', u).single();
  if (j && j.surnom) return res.status(400).json({ error: 'Deja nomme !' });
  await supabase.from('eveil_joueurs').update({ surnom: nom }).eq('username', u);
  res.json({ success: true, surnom: nom });
});

// Catalogue de la boutique eveil
const EVEIL_BOUTIQUE = {
  ration:      { nom:'Ration', img:'ration', prix:200, desc:'Donne +50 XP a ton monstre', type:'xp', valeur:50 },
  poulet:      { nom:'Poulet d&#39;XP', img:'poulet', prix:800, desc:'Donne +250 XP a ton monstre', type:'xp', valeur:250 },
  potion:      { nom:'Potion', img:'potion', prix:150, desc:'Rend 50 PV (utile en combat)', type:'soin', valeur:50 },
  elixir:      { nom:'Elixir', img:'elixir', prix:400, desc:'Restaure tous les PV (utile en combat)', type:'soin', valeur:9999 },
  bouteille_rouge:       { nom:'Elixiteille Rouge', img:'bouteille-rouge', prix:300, desc:'Capture (taux faible) - bientot', type:'capture', valeur:1 },
  bouteille_bleue:       { nom:'Elixiteille Bleue', img:'bouteille-bleue', prix:700, desc:'Capture (taux moyen) - bientot', type:'capture', valeur:2 },
  bouteille_noire:       { nom:'Elixiteille Noire', img:'bouteille-noire', prix:1500, desc:'Capture (taux eleve) - bientot', type:'capture', valeur:3 },
  bouteille_multicolore: { nom:'Elixiteille Multicolore', img:'bouteille-multicolore', prix:5000, desc:'Capture (taux maximal) - bientot', type:'capture', valeur:4 }
};

// Utiliser un objet du sac
app.post('/eveil/utiliser', async (req, res) => {
  const { username, objetId } = req.body;
  if (!username || !objetId) return res.status(400).json({ error: 'Manque des infos' });
  const u = username.toLowerCase();
  const objet = EVEIL_BOUTIQUE[objetId];
  if (!objet) return res.status(400).json({ error: 'Objet inconnu' });

  // Verifier que le joueur a l'objet
  const { data: item } = await supabase.from('eveil_sac').select('quantite').eq('username', u).eq('objet', objetId).single();
  if (!item || item.quantite < 1) return res.status(400).json({ error: 'Tu n&#39;as pas cet objet !' });

  // Les objets de capture ne sont pas encore utilisables
  if (objet.type === 'capture') return res.status(400).json({ error: 'Les Elixiteilles arrivent bientot !' });

  // Recuperer le monstre
  const { data: j } = await supabase.from('eveil_joueurs').select('*').eq('username', u).single();
  if (!j || !j.fruit) return res.status(400).json({ error: 'Pas de monstre !' });

  // --- SOIN (potions/elixirs) : rend des PV ---
  if (objet.type === 'soin') {
    if (j.stade < 2) return res.status(400).json({ error: 'Ton oeuf doit eclore avant !' });
    const sj = statsCalc(j.fruit, j.niveau);
    const pvAvant = (j.pv_actuels != null) ? j.pv_actuels : sj.pvMax;
    if (pvAvant >= sj.pvMax) return res.status(400).json({ error: 'Ton monstre a deja tous ses PV !' });
    const soin = (objet.valeur >= 9999) ? sj.pvMax : objet.valeur;
    const pvApres = Math.min(sj.pvMax, pvAvant + soin);
    await supabase.from('eveil_joueurs').update({ pv_actuels: pvApres }).eq('username', u);
    // Retirer 1 de l'objet
    const nq = item.quantite - 1;
    await supabase.from('eveil_sac').delete().eq('username', u).eq('objet', objetId);
    if (nq > 0) await supabase.from('eveil_sac').insert({ username: u, objet: objetId, quantite: nq });
    return res.json({ success: true, soin: true, pvAvant, pvApres, pvMax: sj.pvMax, gainPv: pvApres - pvAvant, nom: objet.nom });
  }

  // Appliquer l'XP (meme logique que gagner-xp)
  let xp = (j.xp || 0) + objet.valeur;
  let niveau = j.niveau || 1;
  let eclos = j.stade >= 2;
  const events = [];
  if (!eclos) {
    if (xp >= EVEIL_ECLOSION_XP) { eclos = true; niveau = 1; xp = xp - EVEIL_ECLOSION_XP; events.push('eclosion'); }
  }
  if (eclos) {
    while (xp >= xpPourNiveau(niveau)) {
      xp -= xpPourNiveau(niveau);
      niveau++;
      events.push('niveau');
      if (niveau === EVEIL_EVO_ADO) events.push('evo3');
      if (niveau === EVEIL_EVO_FINAL) events.push('evo4');
    }
  }
  const stade = calculerStade(eclos, niveau);
  await supabase.from('eveil_joueurs').update({ xp, niveau, stade }).eq('username', u);

  // Retirer 1 de l'objet du sac (delete + reinsert avec quantite-1, ou delete si 0)
  const newQte = item.quantite - 1;
  await supabase.from('eveil_sac').delete().eq('username', u).eq('objet', objetId);
  if (newQte > 0) await supabase.from('eveil_sac').insert({ username: u, objet: objetId, quantite: newQte });

  res.json({ success: true, xp, niveau, stade, events, gainXp: objet.valeur, xpAvant: (j.xp || 0), niveauAvant: (j.niveau || 1), stadeAvant: j.stade, prochainNiveauXp: xpPourNiveau(niveau), prochainNiveauXpAvant: xpPourNiveau(j.niveau || 1) });
});

// Voir le sac d'un joueur
app.get('/eveil/sac', async (req, res) => {
  const username = req.query.username;
  if (!username) return res.status(400).json({ error: 'Manque username' });
  const { data } = await supabase.from('eveil_sac').select('*').eq('username', username.toLowerCase());
  res.json({ sac: data || [] });
});

// Acheter un objet (avec quantite + limite XP/jour)
app.post('/eveil/acheter', async (req, res) => {
  const { username, objetId, quantite } = req.body;
  if (!username || !objetId) return res.status(400).json({ error: 'Manque des infos' });
  const u = username.toLowerCase();
  const objet = EVEIL_BOUTIQUE[objetId];
  if (!objet) return res.status(400).json({ error: 'Objet inconnu' });

  const qte = Math.max(1, Math.min(99, parseInt(quantite) || 1));
  const coutTotal = objet.prix * qte;

  // Limite des objets XP : 5 par jour (total ration + poulet confondus)
  if (objet.type === 'xp') {
    const { data: jx } = await supabase.from('eveil_joueurs').select('xp_achats_jour, xp_achats_date').eq('username', u).single();
    const aujourdhui = new Date().toISOString().slice(0, 10); // format YYYY-MM-DD
    let dejaAchetes = (jx && jx.xp_achats_date === aujourdhui) ? (jx.xp_achats_jour || 0) : 0;
    if (dejaAchetes + qte > 5) {
      const restant = Math.max(0, 5 - dejaAchetes);
      return res.status(400).json({ error: 'Limite de 5 objets XP par jour ! Il t&#39;en reste ' + restant + ' aujourd&#39;hui.' });
    }
    // Mettre a jour le compteur du jour
    await supabase.from('eveil_joueurs').update({ xp_achats_jour: dejaAchetes + qte, xp_achats_date: aujourdhui }).eq('username', u);
  }

  // Verifier les Berrys
  const { data: prime } = await supabase.from('primes').select('berrys').eq('username', u).single();
  if (!prime || prime.berrys < coutTotal) return res.status(400).json({ error: 'Pas assez de Berrys ! Il te faut ' + coutTotal.toLocaleString() + ' Berrys pour ' + qte + 'x.' });

  // Debiter
  const newBerrys = prime.berrys - coutTotal;
  await supabase.from('primes').upsert({ username: u, berrys: newBerrys, derniermessage: 0, derniereprime: 0 });

  // Ajouter au sac
  const { data: existant } = await supabase.from('eveil_sac').select('quantite').eq('username', u).eq('objet', objetId).single();
  const newQte = (existant ? existant.quantite : 0) + qte;
  await supabase.from('eveil_sac').delete().eq('username', u).eq('objet', objetId);
  await supabase.from('eveil_sac').insert({ username: u, objet: objetId, quantite: newQte });

  res.json({ success: true, berrys: newBerrys, objet: objet.nom, quantite: newQte, achete: qte });
});

// Prendre soin de son monstre (laver/nourrir/jouer) - cooldown 2h, +bonheur
app.post('/eveil/soin', async (req, res) => {
  const { username, action } = req.body;
  if (!username || !action) return res.status(400).json({ error: 'Manque des infos' });
  const u = username.toLowerCase();
  const actions = {
    laver:   { col:'cd_laver',   gain:8,  msg:'Tu as lave ton monstre ! Il brille de proprete.' },
    nourrir: { col:'cd_nourrir', gain:10, msg:'Tu as nourri ton monstre ! Il se regale.' },
    jouer:   { col:'cd_jouer',   gain:12, msg:'Tu as joue avec ton monstre ! Il s&#39;amuse comme un fou.' }
  };
  const act = actions[action];
  if (!act) return res.status(400).json({ error: 'Action inconnue' });

  const { data: j } = await supabase.from('eveil_joueurs').select('*').eq('username', u).single();
  if (!j || !j.fruit) return res.status(400).json({ error: 'Pas de monstre !' });
  if (j.stade < 2) return res.status(400).json({ error: 'Ton oeuf doit d&#39;abord eclore !' });

  const maintenant = Date.now();
  const cd = j[act.col] || 0;
  if (maintenant < cd) {
    const restantMin = Math.ceil((cd - maintenant) / 60000);
    const h = Math.floor(restantMin / 60);
    const m = restantMin % 60;
    return res.status(400).json({ error: 'Attends encore ' + (h > 0 ? h + 'h' : '') + m + 'min pour cette action !' });
  }

  const nouveauBonheur = Math.min(100, (j.bonheur || 50) + act.gain);
  const update = { bonheur: nouveauBonheur, bonheur_maj: maintenant };
  update[act.col] = maintenant + 2 * 60 * 60 * 1000; // +2h
  await supabase.from('eveil_joueurs').update(update).eq('username', u);

  res.json({ success: true, bonheur: nouveauBonheur, gain: act.gain, msg: act.msg });
});

// Donnees de progression (lignees d'evolution + courbe XP)
const EVEIL_LIGNEES = {
  lave:  { element:'Lave',  couleur:'#e74c3c', stades:['laviana-no-nlb','salarlo','volcave','avladrak'],       noms:['Laviana no NLB','Salarlo','Volcave','AvlaDrak'] },
  marin: { element:'Marin', couleur:'#3498db', stades:['watame-no-nlb','requinounou','sharkathor','megabysse'], noms:['Watame no NLB','Requinounou','Sharkathor','Megabysse'] },
  nuage: { element:'Nuage', couleur:'#bdc3c7', stades:['brisa-no-nlb','piouf','zephyx','loukane'],              noms:['Brisa no NLB','Piouf','Zephyx','Loukane'] },
  roche: { element:'Roche', couleur:'#d4a017', stades:['stoko-no-nlb','cayasse','roknar','cayosaura'],          noms:['Stoko no NLB','Cayasse','Roknar','Cayosaura'] },
  givre: { element:'Givre', couleur:'#5dade2', stades:['arlio-no-nlb','givrou','latsnow','pokeryx'],            noms:['Arlio no NLB','Givrou','Latsnow','Pokeryx'] },
  neant: { element:'Neant', couleur:'#8e44ad', stades:['neyarole-no-nlb','ombrelin','neantis','yuniversae'],    noms:['Neyarole no NLB','Ombrelin','Neantis','Yuniversae'] }
};

// Stats par element (base + gain par niveau)
const EVEIL_STATS = {
  lave:  { pvB:75,  pvN:8,  atkB:34, atkN:6, defB:12, defN:2 },
  marin: { pvB:90,  pvN:10, atkB:28, atkN:5, defB:18, defN:3 },
  nuage: { pvB:65,  pvN:7,  atkB:28, atkN:5, defB:26, defN:4 },
  roche: { pvB:110, pvN:14, atkB:14, atkN:2, defB:30, defN:5 },
  givre: { pvB:100, pvN:12, atkB:20, atkN:3, defB:28, defN:5 },
  neant: { pvB:90,  pvN:10, atkB:38, atkN:7, defB:8,  defN:1 }
};
// Attaques par element : [base, chargee, ultime] avec multiplicateur de degats
const EVEIL_ATTAQUES = {
  lave:  [{nom:'Morsure Ardente',mult:1.0},{nom:'Souffle de Lave',mult:1.6},{nom:'Apocalypse Volcanique',mult:2.5}],
  marin: [{nom:'Morsure deferlante',mult:1.0},{nom:'Charge tourbillon',mult:1.6},{nom:'Gueule de l\'Ocean',mult:2.5}],
  nuage: [{nom:'Bourrasque',mult:1.0},{nom:'Serres foudroyantes',mult:1.6},{nom:'Oeil du Cyclone',mult:2.5}],
  roche: [{nom:'Coup de poing rocheux',mult:1.0},{nom:'Charge devastatrice',mult:1.6},{nom:'Effondrement de Montagne',mult:2.5}],
  givre: [{nom:'Morsure gelee',mult:1.0},{nom:'Souffle de blizzard',mult:1.6},{nom:'Ere Glaciaire',mult:2.5}],
  neant: [{nom:'Griffe du vide',mult:1.0},{nom:'Engloutissement',mult:1.6},{nom:'Trou Noir',mult:2.5}]
};
// Roue des forces : qui est fort contre qui (cle bat valeur)
const EVEIL_FORCES = { lave:'givre', givre:'marin', marin:'nuage', nuage:'roche', roche:'lave' };
// Neant : fort contre marin et roche, faible contre les 4 autres
function multiplicateurElement(attaquant, defenseur) {
  if (attaquant === 'neant') return (defenseur === 'marin' || defenseur === 'roche') ? 2 : 0.5;
  if (defenseur === 'neant') return (attaquant === 'marin' || attaquant === 'roche') ? 0.5 : 2;
  if (EVEIL_FORCES[attaquant] === defenseur) return 2;       // super efficace
  if (EVEIL_FORCES[defenseur] === attaquant) return 0.5;     // pas efficace
  return 1;                                                   // neutre
}
function statsCalc(fruit, niveau) {
  const s = EVEIL_STATS[fruit];
  return { pvMax: s.pvB + niveau*s.pvN, atk: s.atkB + niveau*s.atkN, def: s.defB + niveau*s.defN };
}
const EVEIL_ELEMENTS = ['lave','marin','nuage','roche','givre','neant'];
// ========== MONSTRES SAUVAGES & ZONES (Brisepedia) ==========
// rarete : 'commun', 'epique', 'ultime'  |  img : fichier dans monstres/ (sans .png)
// PLACEHOLDER : on utilise tes 6 creatures comme images temporaires, a remplacer par tes vrais monstres
const EVEIL_MONSTRES = {
  // Zone 1 - debutant (communs)
  axoflut:    { nom:'Axoflut', img:'axoflut', element:'marin', rarete:'commun', zone:1, evolution:'axolomax' },
  crabak:     { nom:'Crabak', img:'crabak', element:'marin', rarete:'commun', zone:1, evolution:'crabamax' },
  tortimimi:  { nom:'Tortimimi', img:'tortimimi', element:'marin', rarete:'commun', zone:1, evolution:'torturage' },
  bricolouf:  { nom:'Bricolouf', img:'bricolouf', element:'roche', rarete:'commun', zone:1, evolution:'costarpaing' },
  gladuc:     { nom:'Gladuc', img:'gladuc', element:'givre', rarete:'commun', zone:1, evolution:'glagroduc' },
  fumoir:     { nom:'Fumoir', img:'fumoir', element:'neant', rarete:'commun', zone:1, evolution:'celestion' },
  // Zone 2 - intermediaire (epiques)
  axolomax:   { nom:'Axolomax', img:'axolomax', element:'marin', rarete:'epique', zone:2 },
  crabamax:   { nom:'Crabamax', img:'crabamax', element:'marin', rarete:'epique', zone:2 },
  torturage:  { nom:'Torturage', img:'torturage', element:'marin', rarete:'epique', zone:2 },
  costarpaing:{ nom:'Costarpaing', img:'costarpaing', element:'roche', rarete:'epique', zone:2 },
  daphir:     { nom:'Daphir', img:'daphir', element:'roche', rarete:'epique', zone:2 },
  dubis:      { nom:'Dubis', img:'dubis', element:'roche', rarete:'epique', zone:2 },
  // Zone 3 - avance (ultimes)
  glagroduc:  { nom:'Glagroduc', img:'glagroduc', element:'givre', rarete:'ultime', zone:3 },
  celestion:  { nom:'Celestion', img:'celestion', element:'neant', rarete:'ultime', zone:3 }
};
const EVEIL_ZONES = {
  1: { nom:'Crique des Debutants', desc:'Une plage tranquille pour faire ses armes', nivMin:1, nivMax:6, couleur:'#2ecc71' },
  2: { nom:'Jungle Brumeuse', desc:'Des creatures plus coriaces rodent ici', nivMin:5, nivMax:14, couleur:'#9b59b6' },
  3: { nom:'Abysses Maudits', desc:'Le repaire des monstres les plus puissants', nivMin:13, nivMax:25, couleur:'#e74c3c' }
};
const RARETE_INFO = {
  commun: { nom:'Commun', couleur:'#2ecc71', tauxBase:0.45 },
  epique: { nom:'Epique', couleur:'#9b59b6', tauxBase:0.22 },
  ultime: { nom:'Ultime', couleur:'#e74c3c', tauxBase:0.08 }
};

// Recuperer la Brisepedia d'un joueur (tous les monstres + ce qui est capture)
app.get('/eveil/brisepedia', async (req, res) => {
  const username = req.query.username;
  if (!username) return res.status(400).json({ error: 'Manque username' });
  const u = username.toLowerCase();
  const { data: caps } = await supabase.from('eveil_captures').select('*').eq('username', u);
  const captures = {};
  (caps || []).forEach(function(c){ captures[c.monstre_id] = c.quantite; });
  res.json({ monstres: EVEIL_MONSTRES, zones: EVEIL_ZONES, raretes: RARETE_INFO, captures });
});

// Lancer un combat (genere un monstre sauvage)
app.post('/eveil/combat/start', async (req, res) => {
  const { username, zone } = req.body;
  if (!username) return res.status(400).json({ error: 'Manque username' });
  const u = username.toLowerCase();
  const z = parseInt(zone) || 1;
  const zoneInfo = EVEIL_ZONES[z];
  if (!zoneInfo) return res.status(400).json({ error: 'Zone inconnue' });

  const { data: j } = await supabase.from('eveil_joueurs').select('*').eq('username', u).single();
  if (!j || !j.fruit) return res.status(400).json({ error: 'Pas de monstre !' });
  if (j.stade < 2) return res.status(400).json({ error: 'Ton oeuf doit eclore avant de combattre !' });

  // Stats du joueur
  const sj = statsCalc(j.fruit, j.niveau);
  let pvJoueur = (j.pv_actuels != null && j.pv_actuels > 0) ? Math.min(j.pv_actuels, sj.pvMax) : sj.pvMax;
  if (pvJoueur <= 0) return res.status(400).json({ error: 'Ton monstre est KO ! Soigne-le avec une potion avant de combattre.' });

  // Choisir un monstre AU HASARD parmi ceux de la zone
  const monstresZone = Object.keys(EVEIL_MONSTRES).filter(function(id){ return EVEIL_MONSTRES[id].zone === z; });
  // Ponderation par rarete : commun plus frequent, ultime rare
  const poids = { commun:60, epique:30, ultime:10 };
  let pool = [];
  monstresZone.forEach(function(id){ var n = poids[EVEIL_MONSTRES[id].rarete] || 10; for(var k=0;k<n;k++) pool.push(id); });
  const monstreId = pool[Math.floor(Math.random()*pool.length)];
  const monstre = EVEIL_MONSTRES[monstreId];

  // Niveau de l'ennemi dans la fourchette de la zone
  const nivEnnemi = Math.max(1, zoneInfo.nivMin + Math.floor(Math.random()*(zoneInfo.nivMax - zoneInfo.nivMin + 1)));
  const se = statsCalc(monstre.element, nivEnnemi);

  const combat = {
    monstreId: monstreId, enElem: monstre.element, enNiv: nivEnnemi, enStade: 2,
    enNom: monstre.nom, enImg: monstre.img, enRarete: monstre.rarete, zone: z,
    enPvMax: se.pvMax, enPv: se.pvMax, enAtk: se.atk, enDef: se.def,
    joPvMax: sj.pvMax, joPv: pvJoueur, joAtk: sj.atk, joDef: sj.def,
    tour: 1
  };
  await supabase.from('eveil_joueurs').update({ combat_actif: JSON.stringify(combat) }).eq('username', u);

  res.json({ success: true, combat, joFruit: j.fruit, joNiveau: j.niveau, joStade: j.stade });
  await supabase.from('eveil_joueurs').update({ combat_actif: JSON.stringify(combat) }).eq('username', u);

  res.json({ success: true, combat, joFruit: j.fruit, joNiveau: j.niveau, joStade: j.stade });
});

// Jouer un tour (attaque)
app.post('/eveil/combat/attaque', async (req, res) => {
  const { username, attaqueIndex } = req.body;
  if (!username) return res.status(400).json({ error: 'Manque username' });
  const u = username.toLowerCase();
  const { data: j } = await supabase.from('eveil_joueurs').select('*').eq('username', u).single();
  if (!j || !j.combat_actif) return res.status(400).json({ error: 'Pas de combat en cours !' });

  const c = JSON.parse(j.combat_actif);
  const idx = Math.max(0, Math.min(2, parseInt(attaqueIndex) || 0));
  // L'ultime (idx 2) n'est dispo qu'au stade 4
  if (idx === 2 && j.stade < 4) return res.status(400).json({ error: 'Ultime debloquee au stade final !' });

  const log = [];

  // --- Attaque du joueur ---
  const atkJoueur = EVEIL_ATTAQUES[j.fruit][idx];
  const multJ = multiplicateurElement(j.fruit, c.enElem);
  let degJ = Math.max(1, Math.round((c.joAtk * atkJoueur.mult - c.enDef * 0.5) * multJ));
  const critJ = Math.random() < 0.1 ? 2 : 1; // 10% crit
  degJ = Math.round(degJ * critJ);
  c.enPv = Math.max(0, c.enPv - degJ);
  let msgJ = 'Ton monstre utilise ' + atkJoueur.nom + ' ! ' + degJ + ' degats';
  if (multJ === 2) msgJ += ' (super efficace !)';
  if (multJ === 0.5) msgJ += ' (pas tres efficace...)';
  if (critJ === 2) msgJ += ' CRITIQUE !';
  log.push(msgJ);

  // Victoire ?
  if (c.enPv <= 0) {
    const gainXp = 20 + c.enNiv * 8;
    const gainBerrys = 30 + c.enNiv * 5;
    // Applique XP
    let xp = (j.xp || 0) + gainXp, niveau = j.niveau, events = [];
    while (xp >= xpPourNiveau(niveau)) { xp -= xpPourNiveau(niveau); niveau++; events.push('niveau'); if(niveau===EVEIL_EVO_ADO)events.push('evo3'); if(niveau===EVEIL_EVO_FINAL)events.push('evo4'); }
    const stade = calculerStade(true, niveau);
    // Applique Berrys
    const { data: prime } = await supabase.from('primes').select('berrys').eq('username', u).single();
    const newBerrys = (prime ? prime.berrys : 0) + gainBerrys;
    await supabase.from('primes').upsert({ username: u, berrys: newBerrys, derniermessage: 0, derniereprime: 0 });
    // Sauve (PV joueur conserves, combat fini)
    await supabase.from('eveil_joueurs').update({ xp, niveau, stade, pv_actuels: c.joPv, combat_actif: '' }).eq('username', u);
    return res.json({ success: true, fini: true, victoire: true, log, gainXp, gainBerrys, events, niveau, stade, combat: c });
  }

  // --- Riposte de l'ennemi ---
  const atkEnnemi = EVEIL_ATTAQUES[c.enElem][c.enStade >= 4 ? (Math.random()<0.3?2:Math.floor(Math.random()*2)) : Math.floor(Math.random()*2)];
  const multE = multiplicateurElement(c.enElem, j.fruit);
  let degE = Math.max(1, Math.round((c.enAtk * atkEnnemi.mult - c.joDef * 0.5) * multE));
  const critE = Math.random() < 0.08 ? 2 : 1;
  degE = Math.round(degE * critE);
  c.joPv = Math.max(0, c.joPv - degE);
  let msgE = 'Le ' + c.enElem + ' sauvage riposte avec ' + atkEnnemi.nom + ' ! ' + degE + ' degats';
  if (multE === 2) msgE += ' (super efficace !)';
  if (multE === 0.5) msgE += ' (pas tres efficace...)';
  if (critE === 2) msgE += ' CRITIQUE !';
  log.push(msgE);

  // Defaite ?
  if (c.joPv <= 0) {
    await supabase.from('eveil_joueurs').update({ pv_actuels: 0, combat_actif: '' }).eq('username', u);
    return res.json({ success: true, fini: true, victoire: false, log, combat: c });
  }

  // Combat continue
  c.tour++;
  await supabase.from('eveil_joueurs').update({ combat_actif: JSON.stringify(c), pv_actuels: c.joPv }).eq('username', u);
  res.json({ success: true, fini: false, log, combat: c });
});

// Fuir le combat
app.post('/eveil/combat/fuir', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Manque username' });
  const u = username.toLowerCase();
  const { data: j } = await supabase.from('eveil_joueurs').select('combat_actif').eq('username', u).single();
  if (j && j.combat_actif) {
    const c = JSON.parse(j.combat_actif);
    await supabase.from('eveil_joueurs').update({ pv_actuels: c.joPv, combat_actif: '' }).eq('username', u);
  }
  res.json({ success: true });
});

const EVEIL_ECLOSION_XP = 50;        // XP pour faire eclore l'oeuf
const EVEIL_EVO_ADO = 15;            // niveau pour passer ado (stade 3)
const EVEIL_EVO_FINAL = 35;          // niveau pour la forme finale (stade 4)

// XP necessaire pour passer du niveau N au niveau N+1 (courbe progressive)
function xpPourNiveau(niveau) { return 80 + (niveau - 1) * 40 + Math.floor(Math.pow(niveau, 1.7)); }

// Calcule le stade selon le niveau et l'eclosion
function calculerStade(eclos, niveau) {
  if (!eclos) return 1;            // oeuf pas encore eclos
  if (niveau >= EVEIL_EVO_FINAL) return 4;
  if (niveau >= EVEIL_EVO_ADO) return 3;
  return 2;                        // bebe
}

// Ajouter de l'XP a un joueur (gere eclosion, level up, evolution)
app.post('/eveil/gagner-xp', async (req, res) => {
  const { username, montant } = req.body;
  if (!username || !montant) return res.status(400).json({ error: 'Manque des infos' });
  const u = username.toLowerCase();
  const { data: j } = await supabase.from('eveil_joueurs').select('*').eq('username', u).single();
  if (!j || !j.fruit) return res.status(400).json({ error: 'Pas de monstre !' });

  let xp = (j.xp || 0) + parseInt(montant);
  let niveau = j.niveau || 1;
  let eclos = j.stade >= 2; // si stade >= 2, l'oeuf est deja eclos
  const events = [];

  // Eclosion de l'oeuf
  if (!eclos) {
    if (xp >= EVEIL_ECLOSION_XP) { eclos = true; niveau = 1; xp = xp - EVEIL_ECLOSION_XP; events.push('eclosion'); }
  }

  // Montees de niveau (si eclos)
  if (eclos) {
    while (xp >= xpPourNiveau(niveau)) {
      xp -= xpPourNiveau(niveau);
      niveau++;
      events.push('niveau');
      if (niveau === EVEIL_EVO_ADO) events.push('evo3');
      if (niveau === EVEIL_EVO_FINAL) events.push('evo4');
    }
  }

  const stade = calculerStade(eclos, niveau);
  await supabase.from('eveil_joueurs').update({ xp, niveau, stade }).eq('username', u);
  res.json({ success: true, xp, niveau, stade, events, prochainNiveauXp: xpPourNiveau(niveau) });
});

// La page du RPG
app.get('/eveil', (req, res) => {
  const verified = req.query.verified === 'true';
  const owner = req.query.owner || '';
  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>L'Eveil des Fruits - NeyLaBrise</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Exo+2:wght@300;400;700&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{background:#050510;min-height:100vh;font-family:'Exo 2',sans-serif;color:white;background-image:url('/persos/fond_site.png');background-size:cover;background-position:center;background-attachment:fixed;}
    body::before{content:'';position:fixed;inset:0;background:rgba(5,5,16,0.8);pointer-events:none;}
    .container{max-width:900px;margin:0 auto;padding:40px 20px;position:relative;z-index:1;text-align:center;}
    .back-btn{display:inline-block;margin-bottom:20px;color:#87ceeb;text-decoration:none;font-size:14px;letter-spacing:2px;}
    .title{font-family:'Cinzel',serif;font-size:42px;font-weight:900;color:#fff;letter-spacing:5px;text-shadow:0 0 30px rgba(138,43,226,0.8);}
    .subtitle{font-size:14px;color:#87ceeb;letter-spacing:4px;margin-top:10px;text-transform:uppercase;}
    .divider{width:300px;height:1px;background:linear-gradient(to right,transparent,#8a2be2,#87ceeb,#8a2be2,transparent);margin:20px auto 40px;}
    .panel{background:rgba(0,0,0,0.7);border:1px solid rgba(138,43,226,0.4);border-radius:20px;padding:40px 30px;backdrop-filter:blur(10px);max-width:600px;margin:0 auto;}
    .intro-text{font-size:15px;color:#ccc;line-height:1.7;margin-bottom:30px;}
    .connect-btn{display:inline-block;background:linear-gradient(135deg,#8a2be2,#4169e1);color:white;padding:14px 35px;border-radius:30px;text-decoration:none;font-weight:bold;font-size:16px;letter-spacing:1px;transition:all 0.3s;}
    .connect-btn:hover{box-shadow:0 0 30px rgba(138,43,226,0.6);transform:scale(1.05);}
    .genre-grid{display:flex;gap:30px;justify-content:center;flex-wrap:wrap;margin-top:20px;}
    .genre-card{background:rgba(0,0,0,0.6);border:2px solid rgba(138,43,226,0.4);border-radius:18px;padding:20px;cursor:pointer;transition:all 0.3s;width:240px;}
    .genre-card:hover{border-color:#87ceeb;transform:translateY(-8px);box-shadow:0 10px 40px rgba(138,43,226,0.4);}
    .genre-card img{width:180px;height:240px;object-fit:contain;}
    .genre-nom{font-family:'Cinzel',serif;font-size:20px;letter-spacing:3px;color:#87ceeb;margin-top:12px;}
    .loading{font-size:16px;color:#87ceeb;}
    @keyframes flotte{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
    @keyframes monteFade{0%{transform:translateY(0);opacity:1;}100%{transform:translateY(-120px);opacity:0;}}
    @keyframes saute{0%,100%{transform:translateY(0);}25%{transform:translateY(-25px);}50%{transform:translateY(0);}75%{transform:translateY(-12px);}}
    @keyframes cbtAvanceJ{0%,100%{transform:scaleX(-1) translateX(0);}50%{transform:scaleX(-1) translateX(40px) translateY(-10px);}}
    @keyframes cbtAvanceE{0%,100%{transform:translateX(0);}50%{transform:translateX(-40px) translateY(10px);}}
    @keyframes cbtTremble{0%,100%{transform:translateX(0);}20%{transform:translateX(-8px);}40%{transform:translateX(8px);}60%{transform:translateX(-6px);}80%{transform:translateX(6px);}}
    @keyframes cbtTrembleJ{0%,100%{transform:scaleX(-1) translateX(0);}20%{transform:scaleX(-1) translateX(-8px);}40%{transform:scaleX(-1) translateX(8px);}60%{transform:scaleX(-1) translateX(-6px);}80%{transform:scaleX(-1) translateX(6px);}}
    @keyframes cbtFlash{0%,100%{filter:none;}50%{filter:brightness(3) drop-shadow(0 0 20px #fff);}}
    @keyframes cbtSecousse{0%,100%{transform:translate(0,0);}10%{transform:translate(-6px,4px);}30%{transform:translate(6px,-4px);}50%{transform:translate(-5px,-3px);}70%{transform:translate(5px,3px);}90%{transform:translate(-3px,2px);}}
    .cbt-secousse{animation:cbtSecousse 0.4s ease-in-out;}
    .particule{position:absolute;font-size:32px;pointer-events:none;animation:monteFade 1.5s ease-out forwards;z-index:50;}
    .saute{animation:saute 0.8s ease-in-out !important;}
    .gain-txt{position:absolute;font-size:24px;font-weight:bold;color:#ff69b4;text-shadow:0 0 10px rgba(233,30,140,0.8);pointer-events:none;animation:monteFade 1.6s ease-out forwards;z-index:51;}
    #rotate-msg{display:none;}
    @media (max-width:850px) and (orientation:portrait){
      #rotate-msg{display:flex;position:fixed;inset:0;z-index:99999;background:#050510;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px;}
    }
    @keyframes tourne{0%{transform:rotate(0deg);}50%{transform:rotate(90deg);}100%{transform:rotate(90deg);}}
  </style>
</head>
<body>
<div id="rotate-msg">
    <div style="font-size:70px;animation:tourne 2s ease-in-out infinite;">📱</div>
    <div style="font-family:'Cinzel',serif;font-size:24px;color:#87ceeb;letter-spacing:2px;margin-top:25px;">TOURNE TON TELEPHONE</div>
    <div style="font-size:15px;color:#ccc;margin-top:12px;max-width:300px;line-height:1.6;">L'Eveil des Fruits se joue en mode paysage pour une meilleure aventure ! &#x1F3F4;</div>
  </div>
  <div class="container">
    <a href="/" class="back-btn">&#x2190; Retour au port</a>
    <div class="title">&#x1F34E; L'EVEIL DES FRUITS</div>
    <div class="subtitle">Deviens un Eveilleur de la Grand Line</div>
    <div class="divider"></div>
    <div id="content"><div class="loading">Chargement...</div></div>
  </div>
  <script>
    var params = new URLSearchParams(window.location.search);
    var verified = params.get('verified') === 'true';
    var owner = params.get('owner');
    var currentUser = (verified && owner) ? owner.toLowerCase() : null;
    var IMG = '${EVEIL_IMG}';
    var FRUITS = [
      { id:'lave',   nom:'Laviana no NLB',  img:'laviana-no-nlb',  emoji:'🌋', couleur:'#e74c3c', element:'Lave',  fort:'Givre', faible:'Roche' },
      { id:'marin',  nom:'Watame no NLB',   img:'watame-no-nlb',   emoji:'🌊', couleur:'#3498db', element:'Marin', fort:'Nuage', faible:'Givre' },
      { id:'nuage',  nom:'Brisa no NLB',    img:'brisa-no-nlb',    emoji:'☁️', couleur:'#bdc3c7', element:'Nuage', fort:'Roche', faible:'Marin' },
      { id:'roche',  nom:'Stoko no NLB',    img:'stoko-no-nlb',    emoji:'🪨', couleur:'#d4a017', element:'Roche', fort:'Lave',  faible:'Nuage' },
      { id:'givre',  nom:'Arlio no NLB',    img:'arlio-no-nlb',    emoji:'❄️', couleur:'#5dade2', element:'Givre', fort:'Marin', faible:'Lave' },
      { id:'neant',  nom:'Neyarole no NLB', img:'neyarole-no-nlb', emoji:'🌑', couleur:'#8e44ad', element:'Neant', fort:'Marin + Roche', faible:'les 4 autres (high risk)' }
    ];

    function ecranTempleIntro(){
      document.getElementById('content').innerHTML =
        '<div class="panel" style="background:linear-gradient(rgba(5,5,16,0.75),rgba(5,5,16,0.85)), url(' + IMG + '/eveil/temple.png) center/cover;border-color:#8a2be2;">'
        + '<p class="intro-text">Tu pousses la lourde porte de pierre d&#39;un temple oublie au coeur d&#39;une ile deserte...<br><br>Dans une salle secrete baignee d&#39;une lueur etrange, six fruits du demon en forme d&#39;oeuf reposent sur des piedestaux. L&#39;un d&#39;eux t&#39;appelle.<br><br><b style="color:#ffd479;">Choisis bien : ce fruit sera ton partenaire pour toute l&#39;aventure.</b></p>'
        + '<button class="connect-btn" style="border:none;cursor:pointer;" onclick="ecranOeufs()">Entrer dans la salle secrete</button></div>';
    }

    function ecranOeufs(){
      var cards = '';
      for (var i=0;i<FRUITS.length;i++){
        var f = FRUITS[i];
        cards += '<div class="genre-card" style="width:260px;border-color:'+f.couleur+'44;" onclick="confirmerFruit(&#39;'+f.id+'&#39;)">'
          + '<img src="'+IMG+'/monstres/'+f.img+'.png" alt="'+f.nom+'" style="width:150px;height:150px;">'
          + '<div class="genre-nom" style="color:'+f.couleur+';font-size:16px;">'+f.emoji+' '+f.nom+'</div>'
          + '<div style="font-size:13px;color:#ccc;margin-top:8px;">Element : <b style="color:'+f.couleur+';">'+f.element+'</b></div>'
          + '<div style="font-size:12px;color:#2ecc71;margin-top:4px;">💪 Fort vs '+f.fort+'</div>'
          + '<div style="font-size:12px;color:#e74c3c;">⚠️ Faible vs '+f.faible+'</div>'
          + '</div>';
      }
      document.getElementById('content').innerHTML =
        '<p class="intro-text" style="margin-bottom:25px;">Les six oeufs reposent devant toi. Lequel choisis-tu, Eveilleur ?</p>'
        + '<div class="genre-grid">'+cards+'</div>';
    }

    function confirmerFruit(id){
      var f = null;
      for (var i=0;i<FRUITS.length;i++){ if(FRUITS[i].id===id) f=FRUITS[i]; }
      if(!f) return;
      if(!confirm('Choisir ' + f.nom + ' (' + f.element + ') ? Ce choix est DEFINITIF !')) return;
      fetch('/eveil/fruit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:currentUser,fruit:id})})
        .then(function(r){return r.json();})
        .then(function(d){
          if(d.error){ alert(d.error); return; }
          document.getElementById('content').innerHTML =
            '<div class="panel"><div style="font-size:70px;margin-bottom:10px;">'+f.emoji+'</div>'
            + '<div style="font-family:Cinzel,serif;font-size:26px;color:'+f.couleur+';margin-bottom:10px;">'+f.nom+'</div>'
            + '<p class="intro-text">L&#39;oeuf se met a vibrer entre tes mains... Ton aventure d&#39;Eveilleur commence !</p></div>';
          setTimeout(monMonstre, 2000);
        })
        .catch(function(){ alert('Erreur, reessaie.'); });
    }

    function ecranConnexion(){
      document.getElementById('content').innerHTML =
        '<div class="panel"><p class="intro-text">Bienvenue, futur pirate ! Une legende raconte qu&#39;au coeur d&#39;un temple oublie sommeillent six fruits du demon mysterieux, attendant leur Eveilleur.<br><br>Connecte-toi pour commencer ton aventure et choisir ton destin.</p>'
        + '<a href="/auth/twitch?username=guest&from=eveil" class="connect-btn">Se connecter avec Twitch</a></div>';
    }

    function ecranChoixGenre(){
      document.getElementById('content').innerHTML =
        '<div class="panel"><p class="intro-text">Avant de partir a l&#39;aventure, dis-nous qui tu es, pirate.</p>'
        + '<div class="genre-grid">'
        + '<div class="genre-card" onclick="choisirGenre(&#39;homme&#39;)"><img src="'+IMG+'/eveil/perso-homme.png" alt="Homme"><div class="genre-nom">PIRATE</div></div>'
        + '<div class="genre-card" onclick="choisirGenre(&#39;femme&#39;)"><img src="'+IMG+'/eveil/perso-femme.png" alt="Femme"><div class="genre-nom">PIRATESSE</div></div>'
        + '</div></div>';
    }

    function choisirGenre(genre){
      fetch('/eveil/genre',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:currentUser,genre:genre})})
        .then(function(r){return r.json();})
        .then(function(d){
          if(d.error){ alert(d.error); return; }
          ecranTempleIntro();
        })
        .catch(function(){ alert('Erreur, reessaie.'); });
    }

    var LIGNEES = {
      lave:  { element:'Lave',  couleur:'#e74c3c', stades:['laviana-no-nlb','salarlo','volcave','avladrak'],       noms:['Laviana no NLB','Salarlo','Volcave','AvlaDrak'],       attaques:['Morsure Ardente','Souffle de Lave','Apocalypse Volcanique'],       stats:{pvB:75,pvN:8, atkB:34,atkN:6, defB:12,defN:2} },
      marin: { element:'Marin', couleur:'#3498db', stades:['watame-no-nlb','requinounou','sharkathor','megabysse'], noms:['Watame no NLB','Requinounou','Sharkathor','Megabysse'], attaques:['Morsure deferlante','Charge tourbillon','Gueule de l&#39;Ocean'], stats:{pvB:90,pvN:10, atkB:28,atkN:5, defB:18,defN:3} },
      nuage: { element:'Nuage', couleur:'#bdc3c7', stades:['brisa-no-nlb','piouf','zephyx','loukane'],              noms:['Brisa no NLB','Piouf','Zephyx','Loukane'],              attaques:['Bourrasque','Serres foudroyantes','Oeil du Cyclone'],            stats:{pvB:65,pvN:7, atkB:28,atkN:5, defB:26,defN:4} },
      roche: { element:'Roche', couleur:'#d4a017', stades:['stoko-no-nlb','cayasse','roknar','cayosaura'],          noms:['Stoko no NLB','Cayasse','Roknar','Cayosaura'],          attaques:['Coup de poing rocheux','Charge devastatrice','Effondrement de Montagne'], stats:{pvB:110,pvN:14, atkB:14,atkN:2, defB:30,defN:5} },
      givre: { element:'Givre', couleur:'#5dade2', stades:['arlio-no-nlb','givrou','latsnow','pokeryx'],            noms:['Arlio no NLB','Givrou','Latsnow','Pokeryx'],            attaques:['Morsure gelee','Souffle de blizzard','Ere Glaciaire'],           stats:{pvB:100,pvN:12, atkB:20,atkN:3, defB:28,defN:5} },
      neant: { element:'Neant', couleur:'#8e44ad', stades:['neyarole-no-nlb','ombrelin','neantis','yuniversae'],    noms:['Neyarole no NLB','Ombrelin','Neantis','Yuniversae'],    attaques:['Griffe du vide','Engloutissement','Trou Noir'],                   stats:{pvB:90,pvN:10, atkB:38,atkN:7, defB:8,defN:1} }
    };

function ecranNommer(){
      fetch('/eveil/joueur?username='+encodeURIComponent(currentUser))
        .then(function(r){return r.json();})
        .then(function(d){
          var j = d.joueur;
          var lig = LIGNEES[j.fruit];
          var img = lig.stades[1]; // stade 2 (bebe)
          var espece = lig.noms[1];
          document.getElementById('content').innerHTML =
            '<div class="panel" style="border-color:'+lig.couleur+';">'
            + '<div style="font-size:13px;color:#87ceeb;letter-spacing:2px;margin-bottom:10px;">&#x1F389; ECLOSION !</div>'
            + '<img src="'+IMG+'/monstres/'+img+'.png" style="width:180px;height:180px;object-fit:contain;filter:drop-shadow(0 0 25px '+lig.couleur+'aa);animation:flotte 2s ease-in-out infinite;">'
            + '<p class="intro-text" style="margin:15px 0;">Ton oeuf a eclos ! Voici <b style="color:'+lig.couleur+';">'+espece+'</b>.<br>Quel nom veux-tu lui donner ?</p>'
            + '<input id="surnom-input" type="text" maxlength="20" placeholder="Son petit nom..." style="background:rgba(0,0,0,0.6);border:1px solid '+lig.couleur+';color:#fff;padding:12px 18px;border-radius:25px;font-size:15px;text-align:center;outline:none;width:240px;font-family:Exo 2,sans-serif;">'
            + '<div style="font-size:11px;color:#888;margin-top:6px;">(20 caracteres max &#x2022; definitif)</div>'
            + '<div style="margin-top:18px;"><button class="connect-btn" style="border:none;cursor:pointer;" onclick="validerNom()">Valider ce nom</button></div>'
            + '</div>';
        });
    }

    function validerNom(){
      var nom = document.getElementById('surnom-input').value.trim();
      if(nom.length < 1){ alert('Donne-lui un nom !'); return; }
      fetch('/eveil/nommer',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:currentUser,surnom:nom})})
        .then(function(r){return r.json();})
        .then(function(d){
          if(d.error){ alert(d.error); return; }
          monMonstre();
        })
        .catch(function(){ alert('Erreur, reessaie.'); });
    }

var BOUTIQUE = {
      ration:      { nom:'Ration', img:'ration', prix:200, desc:'Donne +50 XP', categorie:'XP' },
      poulet:      { nom:'Poulet d&#39;XP', img:'poulet', prix:800, desc:'Donne +250 XP', categorie:'XP' },
      potion:      { nom:'Potion', img:'potion', prix:150, desc:'Rend 50 PV', categorie:'Soin' },
      elixir:      { nom:'Elixir', img:'elixir', prix:400, desc:'Restaure tous les PV', categorie:'Soin' },
      bouteille_rouge:       { nom:'Elixiteille Rouge', img:'bouteille-rouge', prix:300, desc:'Capture - taux faible', categorie:'Capture' },
      bouteille_bleue:       { nom:'Elixiteille Bleue', img:'bouteille-bleue', prix:700, desc:'Capture - taux moyen', categorie:'Capture' },
      bouteille_noire:       { nom:'Elixiteille Noire', img:'bouteille-noire', prix:1500, desc:'Capture - taux eleve', categorie:'Capture' },
      bouteille_multicolore: { nom:'Elixiteille Multicolore', img:'bouteille-multicolore', prix:5000, desc:'Capture - taux max', categorie:'Capture' }
    };

    function boutique(){
      fetch('/roulette/infos?username='+encodeURIComponent(currentUser))
        .then(function(r){return r.json();})
        .then(function(info){
          var berrys = (info && info.berrys) ? info.berrys : 0;
          var cats = [
            { nom:'OBJETS XP', cle:'XP', couleur:'#2ecc71', emoji:'🍗' },
            { nom:'OBJETS DE SOIN', cle:'Soin', couleur:'#3498db', emoji:'🧪' },
            { nom:'OBJETS DE CAPTURE', cle:'Capture', couleur:'#9b59b6', emoji:'🍶' }
          ];

          var html = '<div style="text-align:center;margin-bottom:25px;">'
            + '<div style="font-family:Cinzel,serif;font-size:30px;color:#f39c12;letter-spacing:3px;text-shadow:0 0 20px rgba(243,156,18,0.6);">🏪 BRISE SHOP</div>'
            + '<div style="display:inline-block;margin-top:10px;background:rgba(0,0,0,0.7);border:2px solid #f39c12;border-radius:20px;padding:8px 22px;">'
            + '<span style="font-family:Cinzel,serif;font-size:18px;color:#f39c12;">💰 '+berrys.toLocaleString()+' Berrys</span></div></div>';

          for(var c=0;c<cats.length;c++){
            var cat = cats[c];
            var objetsHTML = '';
            for(var id in BOUTIQUE){
              var o = BOUTIQUE[id];
              if(o.categorie !== cat.cle) continue;
              objetsHTML += '<div style="display:flex;flex-direction:column;align-items:center;gap:6px;width:150px;">'
                + '<img src="'+IMG+'/objets/'+o.img+'.png" style="width:'+(cat.cle==='XP'?'80':'95')+'px;height:'+(cat.cle==='XP'?'80':'95')+'px;object-fit:contain;filter:drop-shadow(0 6px 10px '+cat.couleur+'66);">'
                + '<div style="font-family:Cinzel,serif;font-size:13px;color:#fff;text-align:center;">'+o.nom+'</div>'
                + '<div style="font-size:11px;color:#aaa;text-align:center;min-height:28px;">'+o.desc+'</div>'
                + '<div style="font-size:13px;color:'+cat.couleur+';font-weight:bold;">💰 '+o.prix.toLocaleString()+'</div>'
                + '<div style="display:flex;align-items:center;gap:6px;">'
                + '<button onclick="changeQte(&#39;'+id+'&#39;,-1)" style="width:24px;height:24px;border-radius:50%;border:1px solid '+cat.couleur+';background:rgba(0,0,0,0.5);color:'+cat.couleur+';cursor:pointer;">-</button>'
                + '<span id="qte-'+id+'" style="font-size:14px;color:#fff;min-width:20px;display:inline-block;text-align:center;">1</span>'
                + '<button onclick="changeQte(&#39;'+id+'&#39;,1)" style="width:24px;height:24px;border-radius:50%;border:1px solid '+cat.couleur+';background:rgba(0,0,0,0.5);color:'+cat.couleur+';cursor:pointer;">+</button>'
                + '</div>'
                + '<button class="connect-btn" style="border:none;cursor:pointer;font-size:11px;padding:6px 16px;margin-top:2px;background:linear-gradient(135deg,'+cat.couleur+','+cat.couleur+'cc);color:#000;font-weight:bold;" onclick="acheter(&#39;'+id+'&#39;)">Acheter</button>'
                + '</div>';
            }
            // Le presentoir de la categorie
            html += '<div style="max-width:720px;margin:0 auto 30px;">'
              // Bandeau titre
              + '<div style="background:linear-gradient(135deg,'+cat.couleur+','+cat.couleur+'99);border-radius:12px 12px 0 0;padding:10px 20px;display:flex;align-items:center;gap:10px;box-shadow:0 0 20px '+cat.couleur+'44;">'
              + '<span style="font-size:22px;">'+cat.emoji+'</span>'
              + '<span style="font-family:Cinzel,serif;font-size:18px;letter-spacing:3px;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,0.5);">'+cat.nom+'</span></div>'
              // Le presentoir (etagere)
              + '<div style="background:linear-gradient(180deg, color-mix(in srgb, '+cat.couleur+' 14%, rgba(0,0,0,0.7)), rgba(0,0,0,0.8));border:1px solid '+cat.couleur+'66;border-top:none;border-radius:0 0 12px 12px;padding:25px 20px 0;">'
              + '<div style="display:flex;flex-wrap:wrap;gap:20px;justify-content:center;align-items:flex-end;padding-bottom:18px;">'+objetsHTML+'</div>'
              // La planche de l'etagere
              + '<div style="height:14px;margin:0 -20px;background:'+cat.couleur+';opacity:0.8;border-radius:0 0 12px 12px;box-shadow:0 4px 12px '+cat.couleur+'66;"></div>'
              + '</div></div>';
          }

          html += '<div style="text-align:center;margin-top:10px;"><button class="connect-btn" style="border:none;cursor:pointer;background:rgba(0,0,0,0.5);font-size:13px;padding:10px 25px;" onclick="hub()">&#x2190; Retour au repaire</button></div>';

          // Fond special boutique : on enveloppe dans un conteneur avec degrade
          document.getElementById('content').innerHTML =
            '<div style="background:radial-gradient(ellipse at top, rgba(243,156,18,0.12), transparent 60%), linear-gradient(160deg, #2a1a0a, #1a0a1a, #0a0a1a);border-radius:20px;padding:30px 20px;margin:-10px;">'+html+'</div>';
        });
    }

    function changeQte(id, delta){
      var el = document.getElementById('qte-'+id);
      var q = parseInt(el.textContent) + delta;
      if(q < 1) q = 1;
      if(q > 99) q = 99;
      el.textContent = q;
    }

    function acheter(id){
      var o = BOUTIQUE[id];
      var q = parseInt(document.getElementById('qte-'+id).textContent) || 1;
      var total = o.prix * q;
      if(!confirm('Acheter '+q+'x '+o.nom+' pour '+total.toLocaleString()+' Berrys ?')) return;
      fetch('/eveil/acheter',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:currentUser,objetId:id,quantite:q})})
        .then(function(r){return r.json();})
        .then(function(d){
          if(d.error){ alert(d.error); return; }
          var sonAchat = new Audio(IMG + '/eveil/achat.mp3');
          sonAchat.volume = 0.5;
          sonAchat.play().catch(function(){});
          alert('✅ '+d.achete+'x '+o.nom+' achete ! (Tu en as '+d.quantite+' dans ton sac)');
          boutique();
        })
        .catch(function(){ alert('Erreur, reessaie.'); });
    }

    function sac(){
      fetch('/eveil/sac?username='+encodeURIComponent(currentUser))
        .then(function(r){return r.json();})
        .then(function(d){
          var items = d.sac || [];
          // Index des quantites par objet
          var qteParObjet = {};
          for(var k=0;k<items.length;k++){ qteParObjet[items[k].objet] = items[k].quantite; }

          // Categories du sac (avec les futures vides)
          var categories = [
            { cle:'XP',       nom:'OBJETS XP',      couleur:'#2ecc71' },
            { cle:'Soin',     nom:'OBJETS DE SOIN', couleur:'#3498db' },
            { cle:'Capture',  nom:'CAPTURE',        couleur:'#9b59b6' },
            { cle:'Quete',    nom:'OBJETS DE QUETE',couleur:'#e67e22' },
            { cle:'Materiaux',nom:'MATERIAUX',      couleur:'#95a5a6' }
          ];

          var panneaux = '';
          for(var c=0;c<categories.length;c++){
            var cat = categories[c];
            // Cases d'objets de cette categorie
            var cases = '';
            var compte = 0;
            for(var id in BOUTIQUE){
              var o = BOUTIQUE[id];
              if(o.categorie !== cat.cle) continue;
              var q = qteParObjet[id] || 0;
              if(q < 1) continue; // on n'affiche que ce qu'on possede
              compte++;
              var estXp = o.categorie === 'XP';
              var estSoin = o.categorie === 'Soin';
              cases += '<div style="position:relative;background:linear-gradient(160deg,#3a2a18,#2a1d10);border:2px solid #6b4f2e;border-radius:8px;padding:8px;width:88px;text-align:center;box-shadow:inset 0 2px 6px rgba(0,0,0,0.5);">'
                + '<div style="position:absolute;top:-6px;right:-6px;background:'+cat.couleur+';color:#000;border-radius:50%;width:22px;height:22px;font-size:11px;font-weight:bold;display:flex;align-items:center;justify-content:center;border:2px solid #2a1d10;">'+q+'</div>'
                + '<img src="'+IMG+'/objets/'+o.img+'.png" style="width:46px;height:46px;object-fit:contain;">'
                + '<div style="font-size:9px;color:#e8d5a3;margin-top:4px;line-height:1.1;min-height:22px;">'+o.nom+'</div>'
                + ((estXp || estSoin) ? '<button onclick="utiliser(&#39;'+id+'&#39;)" style="margin-top:4px;background:'+cat.couleur+';border:none;border-radius:6px;color:#000;font-size:9px;font-weight:bold;padding:3px 6px;cursor:pointer;width:100%;">Utiliser</button>' : '')
                + '</div>';
            }
            if(compte === 0){
              cases = '<div style="font-size:11px;color:#8a7355;font-style:italic;padding:14px;">Vide pour l&#39;instant...</div>';
            }
            // Le panneau parchemin de la categorie
            panneaux += '<div style="background:linear-gradient(160deg,#5a4226,#43301b);border:3px solid #2a1d10;border-radius:12px;padding:12px;box-shadow:0 4px 12px rgba(0,0,0,0.4);">'
              // Bandeau-plaque grave
              + '<div style="background:linear-gradient(180deg,#6b4f2e,#4a3520);border:2px solid #2a1d10;border-radius:8px;padding:6px 12px;margin-bottom:10px;text-align:center;box-shadow:inset 0 1px 3px rgba(255,220,150,0.2);">'
              + '<span style="font-family:Cinzel,serif;font-size:14px;letter-spacing:2px;color:'+cat.couleur+';text-shadow:0 1px 2px rgba(0,0,0,0.6);">'+cat.nom+'</span></div>'
              // Zone des cases
              + '<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;min-height:60px;align-items:center;">'+cases+'</div>'
              + '</div>';
          }

          var html = '<div style="max-width:720px;margin:0 auto;background:linear-gradient(170deg,#4a3520,#2a1d10);border:4px solid #1a1109;border-radius:20px;padding:25px 20px;box-shadow:0 8px 30px rgba(0,0,0,0.6);">'
            // Titre facon plaque
            + '<div style="background:linear-gradient(180deg,#6b4f2e,#43301b);border:3px solid #2a1d10;border-radius:12px;padding:12px 25px;margin:0 auto 20px;display:inline-block;box-shadow:inset 0 2px 4px rgba(255,220,150,0.25);">'
            + '<span style="font-family:Cinzel,serif;font-size:24px;letter-spacing:3px;color:#f5d98a;text-shadow:0 2px 3px rgba(0,0,0,0.7);">🎒 SAC A DOS</span></div>'
            // Grille des panneaux
            + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;">'+panneaux+'</div>'
            + '<div style="margin-top:22px;"><button class="connect-btn" style="border:none;cursor:pointer;background:rgba(0,0,0,0.5);font-size:13px;padding:10px 25px;" onclick="hub()">&#x2190; Retour au repaire</button></div>'
            + '</div>';
          document.getElementById('content').innerHTML = html;
        });
    }

  function utiliser(objetId){
      var o = BOUTIQUE[objetId];
      if(!confirm('Utiliser '+o.nom+' ?')) return;
      fetch('/eveil/utiliser',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:currentUser,objetId:objetId})})
        .then(function(r){return r.json();})
        .then(function(d){
          if(d.error){ alert(d.error); return; }
          if(d.soin){ popupSoin(o, d); return; }
          popupUtilisation(o, d);
        })
        .catch(function(){ alert('Erreur, reessaie.'); });
    }

    function popupSoin(o, d){
      fetch('/eveil/joueur?username='+encodeURIComponent(currentUser))
        .then(function(r){return r.json();})
        .then(function(res){
          var j = res.joueur;
          var lig = LIGNEES[j.fruit];
          var stade = j.stade || 1;
          var img = lig.stades[stade-1];
          var nomAff = j.surnom || lig.noms[stade-1];

          var pctAvant = Math.max(0, Math.round((d.pvAvant / d.pvMax) * 100));
          var pctApres = Math.max(0, Math.round((d.pvApres / d.pvMax) * 100));

          var overlay = document.createElement('div');
          overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:99998;display:flex;align-items:center;justify-content:center;';
          overlay.innerHTML =
            '<div style="background:linear-gradient(160deg,rgba(0,0,0,0.95),#2ecc7122);border:2px solid #2ecc71;border-radius:20px;padding:35px 30px;max-width:420px;text-align:center;box-shadow:0 0 40px rgba(46,204,113,0.4);">'
            + '<div style="font-size:13px;color:#2ecc71;letter-spacing:2px;margin-bottom:15px;">SOIN</div>'
            + '<div style="position:relative;display:inline-block;">'
            + '<img id="soin-img" src="'+IMG+'/objets/'+o.img+'.png" style="width:70px;height:70px;object-fit:contain;position:absolute;left:50%;top:0;transform:translateX(-50%);z-index:2;opacity:0;transition:all 0.6s;">'
            + '<img id="soin-monstre" src="'+IMG+'/monstres/'+img+'.png" style="width:160px;height:160px;object-fit:contain;filter:drop-shadow(0 0 20px '+lig.couleur+'aa);">'
            + '</div>'
            + '<div style="font-family:Cinzel,serif;font-size:20px;color:'+lig.couleur+';margin:10px 0 4px;">'+nomAff+'</div>'
            // Barre de PV
            + '<div style="max-width:300px;margin:10px auto 0;">'
            + '<div style="display:flex;justify-content:space-between;font-size:12px;color:#aaa;margin-bottom:3px;"><span>&#x2764;&#xFE0F; PV</span><span id="soin-pvtxt" style="color:#fff;">'+d.pvAvant+' / '+d.pvMax+'</span></div>'
            + '<div style="background:rgba(0,0,0,0.5);border:1px solid #2ecc71;border-radius:12px;height:18px;overflow:hidden;"><div id="soin-barre" style="height:100%;width:'+pctAvant+'%;background:linear-gradient(90deg,#27ae60,#2ecc71);transition:width 1s ease-out;"></div></div></div>'
            + '<div id="soin-gain" style="font-size:18px;color:#2ecc71;font-weight:bold;margin-top:12px;opacity:0;transition:opacity 0.4s;">+'+d.gainPv+' PV</div>'
            + '<button id="soin-close" style="margin-top:18px;background:#2ecc71;border:none;border-radius:25px;color:#000;font-weight:bold;padding:10px 30px;cursor:pointer;opacity:0;transition:opacity 0.4s;">Super !</button>'
            + '</div>';
          document.body.appendChild(overlay);

          setTimeout(function(){ var im=document.getElementById('soin-img'); im.style.opacity='1'; im.style.top='50px'; }, 200);
          setTimeout(function(){
            var im=document.getElementById('soin-img'); im.style.opacity='0'; im.style.transform='translateX(-50%) scale(1.5)';
            document.getElementById('soin-gain').style.opacity='1';
            document.getElementById('soin-monstre').style.animation='saute 0.8s ease-in-out';
          }, 900);
          setTimeout(function(){
            document.getElementById('soin-barre').style.width = pctApres + '%';
            document.getElementById('soin-pvtxt').textContent = d.pvApres + ' / ' + d.pvMax;
          }, 1200);
          setTimeout(function(){ document.getElementById('soin-close').style.opacity='1'; }, 1600);

          document.getElementById('soin-close').onclick = function(){ document.body.removeChild(overlay); sac(); };
        });
    }

          function popupUtilisation(o, d){
      fetch('/eveil/joueur?username='+encodeURIComponent(currentUser))
        .then(function(r){return r.json();})
        .then(function(res){
          var j = res.joueur;
          var lig = LIGNEES[j.fruit];
          var stadeAv = d.stadeAvant;
          var imgAvant = lig.stades[stadeAv-1];
          var nomAff = j.surnom || lig.noms[stadeAv-1];
          var pctAvant = Math.min(100, Math.round((d.xpAvant / d.prochainNiveauXpAvant) * 100));
          var pctApres = Math.min(100, Math.round((d.xp / d.prochainNiveauXp) * 100));
          var aEvolue = d.events && (d.events.indexOf('eclosion')>=0 || d.events.indexOf('evo3')>=0 || d.events.indexOf('evo4')>=0);
          var aMonte = d.events && d.events.indexOf('niveau')>=0;

          var overlay = document.createElement('div');
          overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:99998;display:flex;align-items:center;justify-content:center;';
          overlay.innerHTML =
            '<div style="background:linear-gradient(160deg,rgba(0,0,0,0.95),'+lig.couleur+'22);border:2px solid '+lig.couleur+';border-radius:20px;padding:35px 30px;max-width:420px;text-align:center;box-shadow:0 0 40px '+lig.couleur+'66;">'
            + '<div style="font-size:13px;color:#87ceeb;letter-spacing:2px;margin-bottom:15px;">UTILISATION</div>'
            + '<div style="position:relative;display:inline-block;">'
            + '<img id="popup-img" src="'+IMG+'/objets/'+o.img+'.png" style="width:70px;height:70px;object-fit:contain;position:absolute;left:50%;top:0;transform:translateX(-50%);z-index:2;opacity:0;transition:all 0.6s;">'
            + '<img id="popup-monstre" src="'+IMG+'/monstres/'+imgAvant+'.png" style="width:160px;height:160px;object-fit:contain;filter:drop-shadow(0 0 20px '+lig.couleur+'aa);">'
            + '</div>'
            + '<div style="font-family:Cinzel,serif;font-size:20px;color:'+lig.couleur+';margin:10px 0 4px;">'+nomAff+'</div>'
            + '<div id="popup-niv" style="font-size:14px;color:#fff;margin-bottom:10px;">Niveau '+d.niveauAvant+'</div>'
            + '<div style="max-width:300px;margin:0 auto;">'
            + '<div style="background:rgba(0,0,0,0.5);border:1px solid '+lig.couleur+';border-radius:12px;height:18px;overflow:hidden;"><div id="popup-barre" style="height:100%;width:'+pctAvant+'%;background:'+lig.couleur+';transition:width 1s ease-out;"></div></div></div>'
            + '<div id="popup-gain" style="font-size:18px;color:#2ecc71;font-weight:bold;margin-top:12px;opacity:0;transition:opacity 0.4s;">+'+d.gainXp+' XP</div>'
            + '<div id="popup-event" style="font-size:15px;color:#ffd479;margin-top:6px;min-height:20px;"></div>'
            + '<button id="popup-close" style="margin-top:18px;background:'+lig.couleur+';border:none;border-radius:25px;color:#000;font-weight:bold;padding:10px 30px;cursor:pointer;opacity:0;transition:opacity 0.4s;">Super !</button>'
            + '</div>';
          document.body.appendChild(overlay);

          setTimeout(function(){ var im = document.getElementById('popup-img'); im.style.opacity = '1'; im.style.top = '50px'; }, 200);
          setTimeout(function(){
            var im = document.getElementById('popup-img'); im.style.opacity = '0'; im.style.transform = 'translateX(-50%) scale(1.5)';
            document.getElementById('popup-gain').style.opacity = '1';
          }, 900);
          setTimeout(function(){
            var barre = document.getElementById('popup-barre');
            if(aEvolue || aMonte){ barre.style.width = '100%'; } else { barre.style.width = pctApres + '%'; }
          }, 1200);
          setTimeout(function(){
            if(aEvolue){
              var newImg = lig.stades[d.stade-1];
              document.getElementById('popup-monstre').src = IMG + '/monstres/' + newImg + '.png';
              document.getElementById('popup-monstre').style.animation = 'saute 0.8s ease-in-out';
              var evMsg = d.events.indexOf('evo4')>=0 ? '👑 EVOLUTION FINALE !' : (d.events.indexOf('eclosion')>=0 ? '🥚 Eclosion !' : '✨ Evolution !');
              document.getElementById('popup-event').textContent = evMsg;
              document.getElementById('popup-niv').textContent = 'Niveau ' + d.niveau;
              document.getElementById('popup-barre').style.transition = 'none';
              document.getElementById('popup-barre').style.width = pctApres + '%';
            } else if(aMonte){
              document.getElementById('popup-event').textContent = '⬆️ Niveau ' + d.niveau + ' !';
              document.getElementById('popup-niv').textContent = 'Niveau ' + d.niveau;
              document.getElementById('popup-barre').style.transition = 'none';
              document.getElementById('popup-barre').style.width = pctApres + '%';
            }
            document.getElementById('popup-close').style.opacity = '1';
          }, 2300);

          document.getElementById('popup-close').onclick = function(){
            if(d.events && d.events.indexOf('eclosion')>=0){ document.body.removeChild(overlay); ecranNommer(); return; }
            document.body.removeChild(overlay);
            sac();
          };
        });
    }
    
function bateau(){
      fetch('/eveil/joueur?username='+encodeURIComponent(currentUser))
        .then(function(r){return r.json();})
        .then(function(d){
          var j = d.joueur;
          if(!j || !j.fruit){ ecranTempleIntro(); return; }
          var lig = LIGNEES[j.fruit];
          var stade = j.stade || 1;
          var img = lig.stades[stade-1];
          var nomAff = j.surnom || lig.noms[stade-1];
          var bonheur = (j.bonheur != null) ? j.bonheur : 50;
          var maintenant = Date.now();

          // Humeur selon le bonheur
          var humeur = bonheur >= 80 ? '😍 Radieux' : (bonheur >= 50 ? '😊 Content' : (bonheur >= 25 ? '😐 Bof' : '😢 Triste'));

          var actions = [
            { id:'laver',   nom:'Laver',   emoji:'🧽', cd:j.cd_laver },
            { id:'nourrir', nom:'Nourrir', emoji:'🍖', cd:j.cd_nourrir },
            { id:'jouer',   nom:'Jouer',   emoji:'🎮', cd:j.cd_jouer }
          ];
          var btns = '';
          for(var i=0;i<actions.length;i++){
            var a = actions[i];
            var dispo = !a.cd || maintenant >= a.cd;
            if(dispo){
              btns += '<button class="connect-btn" style="border:none;cursor:pointer;font-size:14px;padding:12px 22px;" onclick="soin(&#39;'+a.id+'&#39;)">'+a.emoji+' '+a.nom+'</button>';
            } else {
              var restMin = Math.ceil((a.cd - maintenant)/60000);
              var txt = restMin >= 60 ? Math.floor(restMin/60)+'h'+(restMin%60)+'m' : restMin+'min';
              btns += '<button disabled style="opacity:0.4;cursor:not-allowed;border:none;border-radius:30px;font-size:13px;padding:12px 22px;background:rgba(0,0,0,0.5);color:#888;">'+a.emoji+' '+txt+'</button>';
            }
          }

          var html = '<div style="background:linear-gradient(rgba(5,5,16,0.55),rgba(5,5,16,0.75)), url('+IMG+'/eveil/bateau.png) center/cover;border:1px solid '+lig.couleur+';border-radius:20px;padding:30px 25px;max-width:680px;margin:0 auto;">'
            + '<div style="font-family:Cinzel,serif;font-size:26px;color:#87ceeb;letter-spacing:2px;margin-bottom:5px;">🏠 MON BATEAU</div>'
            + '<div style="font-size:13px;color:#ccc;margin-bottom:20px;">Le repaire de '+nomAff+'</div>'
            + '<div id="zone-monstre" style="position:relative;display:inline-block;">'
            + '<img id="bateau-monstre" src="'+IMG+'/monstres/'+img+'.png" style="width:200px;height:200px;object-fit:contain;filter:drop-shadow(0 0 25px '+lig.couleur+'aa);animation:flotte 2.5s ease-in-out infinite;">'
            + '</div>'
            + '<div style="font-family:Cinzel,serif;font-size:22px;color:'+lig.couleur+';margin-top:10px;">'+nomAff+'</div>'
            + '<div style="font-size:15px;color:#fff;margin:8px 0;">Humeur : '+humeur+'</div>'
            // Barre de bonheur
            + '<div style="max-width:320px;margin:10px auto;">'
            + '<div style="display:flex;justify-content:space-between;font-size:12px;color:#aaa;margin-bottom:3px;"><span>❤️ Bonheur</span><span style="color:#fff;">'+bonheur+'/100</span></div>'
            + '<div style="background:rgba(0,0,0,0.5);border:1px solid #e91e8c;border-radius:12px;height:18px;overflow:hidden;"><div style="height:100%;width:'+bonheur+'%;background:linear-gradient(90deg,#e91e8c,#ff69b4);transition:width 0.5s;"></div></div></div>'
            // Boutons de soin
            + '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:20px;">'+btns+'</div>'
            + '<div style="margin-top:22px;"><button class="connect-btn" style="border:none;cursor:pointer;background:rgba(0,0,0,0.5);font-size:13px;padding:10px 25px;" onclick="arreterMusiqueBateau();hub()">&#x2190; Retour au repaire</button></div>'
            + '</div>'
            + '<audio id="musique-bateau" src="'+IMG+'/eveil/bateau.mp3" loop></audio>'
            + '<button id="btn-musique-bateau" onclick="toggleMusiqueBateau()" style="position:fixed;bottom:20px;right:20px;z-index:999;background:rgba(0,0,0,0.85);border:2px solid #87ceeb;color:white;width:55px;height:55px;border-radius:50%;font-size:24px;cursor:pointer;box-shadow:0 0 20px rgba(135,206,235,0.6);">&#x1F3B5;</button>';
          document.getElementById('content').innerHTML = html;
          // Lancer la musique automatiquement (si le navigateur l'autorise)
          var mb = document.getElementById('musique-bateau');
          if(mb){ mb.volume = 0.4; var p = mb.play(); if(p){ p.catch(function(){}); } }
        });
    }
    function toggleMusiqueBateau(){
      var mb = document.getElementById('musique-bateau');
      var btn = document.getElementById('btn-musique-bateau');
      if(!mb) return;
      if(mb.paused){ mb.play(); if(btn) btn.innerHTML = '&#x1F3B5;'; }
      else { mb.pause(); if(btn) btn.innerHTML = '&#x1F507;'; }
    }

    function arreterMusiqueBateau(){
      var mb = document.getElementById('musique-bateau');
      if(mb){ mb.pause(); mb.currentTime = 0; }
    }

    function soin(action){
      // Empeche de spammer pendant l'animation
      fetch('/eveil/soin',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:currentUser,action:action})})
        .then(function(r){return r.json();})
        .then(function(d){
          if(d.error){ flashErreur(d.error.replace(/&#39;/g, "'")); return; }
          // Emoji selon l'action
          var emojis = { laver:'🫧', nourrir:'🍖', jouer:'⭐' };
          var emoji = emojis[action] || '❤️';
          animerSoin(emoji, d.gain);
          // Met a jour la barre de bonheur sans recharger toute la page
          setTimeout(function(){ bateau(); }, 1700);
        })
        .catch(function(){ flashErreur('Erreur, reessaie.'); });
    }

    function animerSoin(emoji, gain){
      var zone = document.getElementById('zone-monstre');
      var monstre = document.getElementById('bateau-monstre');
      if(!zone || !monstre) return;

      // Le monstre saute de joie
      monstre.classList.add('saute');
      setTimeout(function(){ monstre.classList.remove('saute'); }, 800);

      // Particules d'emojis qui montent
      for(var i=0;i<6;i++){
        (function(idx){
          setTimeout(function(){
            var p = document.createElement('div');
            p.className = 'particule';
            p.textContent = emoji;
            p.style.left = (30 + Math.random()*100) + 'px';
            p.style.top = (80 + Math.random()*60) + 'px';
            zone.appendChild(p);
            setTimeout(function(){ if(p.parentNode) p.parentNode.removeChild(p); }, 1500);
          }, idx*120);
        })(i);
      }

      // Texte "+X bonheur"
      var g = document.createElement('div');
      g.className = 'gain-txt';
      g.textContent = '+' + gain + ' ❤️';
      g.style.left = '70px';
      g.style.top = '40px';
      zone.appendChild(g);
      setTimeout(function(){ if(g.parentNode) g.parentNode.removeChild(g); }, 1600);
    }

    function flashErreur(msg){
      var div = document.createElement('div');
      div.textContent = msg;
      div.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:rgba(231,76,60,0.95);color:#fff;padding:12px 24px;border-radius:25px;font-size:14px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,0.4);';
      document.body.appendChild(div);
      setTimeout(function(){ if(div.parentNode) div.parentNode.removeChild(div); }, 2500);
    }

var ATTAQUES_FRONT = {
      lave:  ['Morsure Ardente','Souffle de Lave','Apocalypse Volcanique'],
      marin: ['Morsure deferlante','Charge tourbillon','Gueule de l&#39;Ocean'],
      nuage: ['Bourrasque','Serres foudroyantes','Oeil du Cyclone'],
      roche: ['Coup de poing rocheux','Charge devastatrice','Effondrement de Montagne'],
      givre: ['Morsure gelee','Souffle de blizzard','Ere Glaciaire'],
      neant: ['Griffe du vide','Engloutissement','Trou Noir']
    };
    var combatEtat = null; // garde l'etat du combat en cours cote client
    var sonsCombat = {
      start:    new Audio(IMG+'/eveil/combat-start.mp3'),
      attaque:  new Audio(IMG+'/eveil/combat-attaque.mp3'),
      victoire: new Audio(IMG+'/eveil/combat-victoire.mp3'),
      defaite:  new Audio(IMG+'/eveil/combat-defaite.mp3')
    };
    function jouerSon(nom){ try{ var s = sonsCombat[nom]; if(s){ s.currentTime=0; s.volume=0.5; s.play().catch(function(){}); } }catch(e){} }
    function arreterSon(nom){ try{ var s = sonsCombat[nom]; if(s){ s.pause(); s.currentTime=0; } }catch(e){} }

    function combat(){
      // Affiche l'ecran de choix de zone
      fetch('/eveil/brisepedia?username='+encodeURIComponent(currentUser))
        .then(function(r){return r.json();})
        .then(function(d){
          var zones = d.zones;
          var cards = '';
          for(var z in zones){
            var zo = zones[z];
            cards += '<div onclick="lancerCombatZone('+z+')" style="position:relative;background:linear-gradient(rgba(5,5,16,0.45),rgba(5,5,16,0.75)), url('+IMG+'/eveil/zone'+z+'.png) center/cover;border:2px solid '+zo.couleur+';border-radius:16px;padding:25px 20px;cursor:pointer;transition:transform 0.2s;min-height:130px;display:flex;flex-direction:column;justify-content:flex-end;" onmouseover="this.style.transform=&#39;scale(1.03)&#39;;" onmouseout="this.style.transform=&#39;scale(1)&#39;;">'
              + '<div style="font-family:Cinzel,serif;font-size:20px;color:'+zo.couleur+';text-shadow:0 2px 4px rgba(0,0,0,0.8);">'+zo.nom+'</div>'
              + '<div style="font-size:12px;color:#ddd;text-shadow:0 1px 3px rgba(0,0,0,0.9);margin-top:4px;">'+zo.desc+'</div>'
              + '<div style="font-size:11px;color:'+zo.couleur+';margin-top:6px;">Niveaux '+zo.nivMin+' - '+zo.nivMax+'</div>'
              + '</div>';
          }
          var html = '<div style="max-width:680px;margin:0 auto;">'
            + '<div style="text-align:center;font-family:Cinzel,serif;font-size:26px;color:#8a2be2;letter-spacing:3px;margin-bottom:8px;">&#x2694;&#xFE0F; CHOISIS TA ZONE</div>'
            + '<div style="text-align:center;font-size:13px;color:#aaa;margin-bottom:20px;">Explore une zone pour affronter ses monstres sauvages</div>'
            + '<div style="display:grid;grid-template-columns:1fr;gap:14px;">'+cards+'</div>'
            + '<div style="text-align:center;margin-top:22px;"><button class="connect-btn" style="border:none;cursor:pointer;background:rgba(0,0,0,0.5);font-size:13px;padding:10px 25px;" onclick="hub()">&#x2190; Retour au repaire</button></div>'
            + '</div>';
          document.getElementById('content').innerHTML = html;
        });
    }

    function lancerCombatZone(zone){
      fetch('/eveil/combat/start',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:currentUser,zone:zone})})
        .then(function(r){return r.json();})
        .then(function(d){
          if(d.error){ alert(d.error); hub(); return; }
          combatEtat = { combat:d.combat, joFruit:d.joFruit, joNiveau:d.joNiveau, joStade:d.joStade };
          jouerSon('start');
          afficherCombat([d.combat.enNom + ' sauvage apparait !']);
        })
        .catch(function(){ alert('Erreur, reessaie.'); });
    }

    function afficherCombat(logLignes){
      var e = combatEtat;
      var c = e.combat;
      var ligJ = LIGNEES[e.joFruit];
      var imgJ = ligJ.stades[e.joStade-1];
      var nomJ = ligJ.noms[e.joStade-1];
      var ligE = LIGNEES[c.enElem];
      var imgE = c.enImg || ligE.stades[c.enStade-1];
      var nomE = c.enNom || ligE.noms[c.enStade-1];

      var pctJ = Math.max(0, Math.round((c.joPv/c.joPvMax)*100));
      var pctE = Math.max(0, Math.round((c.enPv/c.enPvMax)*100));
      var couleurPv = function(p){ return p>50 ? '#2ecc71' : (p>20 ? '#f39c12' : '#e74c3c'); };

      var atks = ATTAQUES_FRONT[e.joFruit];
      var btnsAtk = '';
      for(var i=0;i<3;i++){
        var ultime = (i===2);
        var dispo = !ultime || e.joStade>=4;
        var labels = ['Base','Chargee','Ultime'];
        if(dispo){
          btnsAtk += '<button class="connect-btn" style="border:none;cursor:pointer;font-size:13px;padding:10px 16px;margin:4px;" onclick="attaquer('+i+')"><b>'+atks[i]+'</b><br><span style="font-size:10px;opacity:0.8;">'+labels[i]+'</span></button>';
        } else {
          btnsAtk += '<button disabled style="opacity:0.4;cursor:not-allowed;border:none;border-radius:30px;font-size:13px;padding:10px 16px;margin:4px;background:rgba(0,0,0,0.5);color:#888;">'+atks[i]+' &#x1F512;<br><span style="font-size:10px;">Stade final</span></button>';
        }
      }

      var logHTML = '';
      for(var L=0;L<logLignes.length;L++){ logHTML += '<div style="margin:2px 0;">'+logLignes[L]+'</div>'; }

      var html = '<div id="cbt-arene" class="panel" style="border-color:#8a2be2;max-width:680px;">'
        // Ennemi (en haut)
        + '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;">'
        + '<div style="text-align:left;background:rgba(0,0,0,0.5);border:1px solid '+ligE.couleur+';border-radius:12px;padding:8px 14px;">'
        + '<div style="font-size:13px;color:'+ligE.couleur+';">'+nomE+' <span style="color:#aaa;">Niv '+c.enNiv+'</span></div>'
        + '<div style="background:rgba(0,0,0,0.5);border-radius:8px;height:12px;width:160px;overflow:hidden;margin-top:4px;"><div id="cbt-pvE" style="height:100%;width:'+pctE+'%;background:'+couleurPv(pctE)+';transition:width 0.6s;"></div></div>'
        + '<div style="font-size:10px;color:#aaa;margin-top:2px;">'+c.enPv+' / '+c.enPvMax+' PV</div>'
        + '</div>'
        + '<img id="cbt-ennemi" src="'+IMG+'/monstres/'+imgE+'.png" style="width:210px;height:210px;object-fit:contain;filter:drop-shadow(0 0 18px '+ligE.couleur+'aa);">'
        + '</div>'
        // Joueur (en bas)
        + '<div style="display:flex;justify-content:space-between;align-items:flex-end;gap:10px;margin-top:5px;">'
        + '<img id="cbt-joueur" src="'+IMG+'/monstres/'+imgJ+'.png" style="width:240px;height:240px;object-fit:contain;filter:drop-shadow(0 0 18px '+ligJ.couleur+'aa);transform:scaleX(-1);">'
        + '<div style="text-align:left;background:rgba(0,0,0,0.5);border:1px solid '+ligJ.couleur+';border-radius:12px;padding:8px 14px;">'
        + '<div style="font-size:13px;color:'+ligJ.couleur+';">'+nomJ+' <span style="color:#aaa;">Niv '+e.joNiveau+'</span></div>'
        + '<div style="background:rgba(0,0,0,0.5);border-radius:8px;height:12px;width:160px;overflow:hidden;margin-top:4px;"><div id="cbt-pvJ" style="height:100%;width:'+pctJ+'%;background:'+couleurPv(pctJ)+';transition:width 0.6s;"></div></div>'
        + '<div style="font-size:10px;color:#aaa;margin-top:2px;">'+c.joPv+' / '+c.joPvMax+' PV</div>'
        + '</div>'
        + '</div>'
        // Log
        + '<div style="background:rgba(0,0,0,0.6);border:1px solid rgba(138,43,226,0.4);border-radius:10px;padding:12px;margin:12px 0;min-height:50px;font-size:13px;color:#ddd;">'+logHTML+'</div>'
        + '<div style="display:flex;flex-wrap:wrap;justify-content:center;">'+btnsAtk+'</div>'
        + '<div style="margin-top:12px;"><button class="connect-btn" style="border:none;cursor:pointer;background:rgba(231,76,60,0.3);border:1px solid #e74c3c;font-size:12px;padding:8px 20px;" onclick="fuirCombat()">&#x1F3C3; Fuir</button></div>'
        + '</div>';
      document.getElementById('content').innerHTML = html;
    }

    function attaquer(idx){
      jouerSon('attaque');
      var monstreJ = document.getElementById('cbt-joueur');
      var monstreE = document.getElementById('cbt-ennemi');
      // Animation : le joueur avance pour attaquer
      if(monstreJ){ monstreJ.style.animation = 'cbtAvanceJ 0.4s ease-in-out'; }

      fetch('/eveil/combat/attaque',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:currentUser,attaqueIndex:idx})})
        .then(function(r){return r.json();})
        .then(function(d){
          if(d.error){ alert(d.error); return; }
          combatEtat.combat = d.combat;

          // L'ennemi encaisse : flash + tremble + secousse
          setTimeout(function(){
            if(monstreE){ monstreE.style.animation = 'cbtFlash 0.3s, cbtTremble 0.4s'; }
            var arene = document.getElementById('cbt-arene');
            if(arene){ arene.classList.add('cbt-secousse'); setTimeout(function(){ arene.classList.remove('cbt-secousse'); }, 400); }
          }, 350);

          if(d.fini){
            // Met a jour l'affichage une derniere fois
            setTimeout(function(){
              afficherCombat(d.log);
              if(d.victoire){
                arreterSon('start');
                jouerSon('victoire');
                var msg = '🏆 VICTOIRE !\\n+'+d.gainXp+' XP\\n+'+d.gainBerrys+' Berrys';
                if(d.events && d.events.indexOf('evo4')>=0) msg += '\\n👑 EVOLUTION FINALE !';
                else if(d.events && d.events.indexOf('evo3')>=0) msg += '\\n✨ Evolution !';
                else if(d.events && d.events.indexOf('niveau')>=0) msg += '\\n⬆️ Niveau '+d.niveau+' !';
                setTimeout(function(){ alert(msg); hub(); }, 1200);
              } else {
                jouerSon('defaite');
                setTimeout(function(){ alert('💀 Ton monstre est KO ! Soigne-le avec une potion avant de recombattre.'); hub(); }, 1200);
              }
            }, 800);
          } else {
            // L'ennemi riposte : il avance + le joueur tremble
            setTimeout(function(){
              afficherCombat(d.log);
              var mE = document.getElementById('cbt-ennemi');
              var mJ = document.getElementById('cbt-joueur');
              if(mE){ mE.style.animation = 'cbtAvanceE 0.4s ease-in-out'; }
              setTimeout(function(){
                if(mJ){ mJ.style.animation = 'cbtFlash 0.3s, cbtTrembleJ 0.4s'; }
                var arene = document.getElementById('cbt-arene');
                if(arene){ arene.classList.add('cbt-secousse'); setTimeout(function(){ arene.classList.remove('cbt-secousse'); }, 400); }
              }, 350);
            }, 850);
          }
        })
        .catch(function(){ alert('Erreur, reessaie.'); });
    }

    function fuirCombat(){
      if(!confirm('Fuir le combat ?')) return;
      fetch('/eveil/combat/fuir',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:currentUser})})
        .then(function(r){return r.json();})
        .then(function(){ hub(); })
        .catch(function(){ hub(); });
    }

var brisepediaZone = 0; // 0 = toutes les zones

    function brisepedia(){
      fetch('/eveil/brisepedia?username='+encodeURIComponent(currentUser))
        .then(function(r){return r.json();})
        .then(function(d){
          var monstres = d.monstres, zones = d.zones, raretes = d.raretes, captures = d.captures;

          // Compteur de completion
          var total = Object.keys(monstres).length;
          var decouverts = Object.keys(captures).length;

          // Onglets de zones
          var onglets = '<button onclick="setZoneBrise(0)" style="border:none;cursor:pointer;border-radius:20px;font-size:12px;padding:7px 16px;margin:3px;background:'+(brisepediaZone===0?'#f39c12':'rgba(0,0,0,0.5)')+';color:'+(brisepediaZone===0?'#000':'#fff')+';font-weight:bold;">Toutes</button>';
          for(var z in zones){
            var actif = (brisepediaZone == z);
            onglets += '<button onclick="setZoneBrise('+z+')" style="border:none;cursor:pointer;border-radius:20px;font-size:12px;padding:7px 16px;margin:3px;background:'+(actif?zones[z].couleur:'rgba(0,0,0,0.5)')+';color:'+(actif?'#000':'#fff')+';font-weight:bold;">'+zones[z].nom+'</button>';
          }

          // Grille des monstres
          var cases = '';
          for(var id in monstres){
            var m = monstres[id];
            if(brisepediaZone !== 0 && m.zone != brisepediaZone) continue;
            var capture = captures[id] != null;
            var rar = raretes[m.rarete];
            if(capture){
              cases += '<div onclick="ficheMonstre(&#39;'+id+'&#39;)" style="background:linear-gradient(160deg, color-mix(in srgb, '+rar.couleur+' 18%, rgba(0,0,0,0.7)), rgba(0,0,0,0.85));border:2px solid '+rar.couleur+';border-radius:14px;padding:10px;text-align:center;cursor:pointer;transition:transform 0.2s;" onmouseover="this.style.transform=&#39;translateY(-4px)&#39;;" onmouseout="this.style.transform=&#39;translateY(0)&#39;;">'
                + '<img src="'+IMG+'/monstres/'+m.img+'.png" style="width:80px;height:80px;object-fit:contain;filter:drop-shadow(0 0 10px '+rar.couleur+'aa);">'
                + '<div style="font-family:Cinzel,serif;font-size:13px;color:#fff;margin-top:5px;">'+m.nom+'</div>'
                + '<div style="display:inline-block;margin-top:4px;background:'+rar.couleur+';color:#000;font-size:9px;font-weight:bold;padding:2px 10px;border-radius:10px;">'+rar.nom+'</div>'
                + (captures[id]>1 ? '<div style="font-size:10px;color:#aaa;margin-top:3px;">x'+captures[id]+'</div>' : '')
                + '</div>';
            } else {
              cases += '<div style="background:rgba(0,0,0,0.6);border:2px solid rgba(255,255,255,0.1);border-radius:14px;padding:10px;text-align:center;">'
                + '<img src="'+IMG+'/monstres/'+m.img+'.png" style="width:80px;height:80px;object-fit:contain;filter:brightness(0) drop-shadow(0 0 6px rgba(255,255,255,0.2));">'
                + '<div style="font-family:Cinzel,serif;font-size:13px;color:#666;margin-top:5px;">???</div>'
                + '<div style="display:inline-block;margin-top:4px;background:rgba(255,255,255,0.1);color:#666;font-size:9px;font-weight:bold;padding:2px 10px;border-radius:10px;">?????</div>'
                + '</div>';
            }
          }

          var html = '<div style="max-width:720px;margin:0 auto;">'
            + '<div style="text-align:center;margin-bottom:8px;">'
            + '<div style="font-family:Cinzel,serif;font-size:28px;color:#f39c12;letter-spacing:3px;text-shadow:0 0 20px rgba(243,156,18,0.6);">&#x1F4D6; BRISEPEDIA</div>'
            + '<div style="font-size:13px;color:#aaa;margin-top:5px;">'+decouverts+' / '+total+' monstres decouverts</div>'
            + '</div>'
            + '<div style="text-align:center;margin-bottom:18px;">'+onglets+'</div>'
            + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;">'+cases+'</div>'
            + '<div style="text-align:center;margin-top:22px;"><button class="connect-btn" style="border:none;cursor:pointer;background:rgba(0,0,0,0.5);font-size:13px;padding:10px 25px;" onclick="hub()">&#x2190; Retour au repaire</button></div>'
            + '</div>';
          document.getElementById('content').innerHTML = html;
        });
    }

    function setZoneBrise(z){ brisepediaZone = z; brisepedia(); }

    function ficheMonstre(id){
      fetch('/eveil/brisepedia?username='+encodeURIComponent(currentUser))
        .then(function(r){return r.json();})
        .then(function(d){
          var m = d.monstres[id];
          var rar = d.raretes[m.rarete];
          var zone = d.zones[m.zone];
          var qte = d.captures[id] || 0;
          var overlay = document.createElement('div');
          overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:99998;display:flex;align-items:center;justify-content:center;';
          overlay.innerHTML = '<div style="background:linear-gradient(160deg,rgba(0,0,0,0.95),'+rar.couleur+'22);border:2px solid '+rar.couleur+';border-radius:20px;padding:30px;max-width:360px;text-align:center;box-shadow:0 0 40px '+rar.couleur+'66;">'
            + '<img src="'+IMG+'/monstres/'+m.img+'.png" style="width:140px;height:140px;object-fit:contain;filter:drop-shadow(0 0 18px '+rar.couleur+'aa);">'
            + '<div style="font-family:Cinzel,serif;font-size:22px;color:'+rar.couleur+';margin:10px 0 4px;">'+m.nom+'</div>'
            + '<div style="display:inline-block;background:'+rar.couleur+';color:#000;font-size:11px;font-weight:bold;padding:3px 14px;border-radius:12px;margin-bottom:10px;">'+rar.nom+'</div>'
            + '<div style="font-size:13px;color:#ddd;margin:4px 0;">Element : '+m.element+'</div>'
            + '<div style="font-size:13px;color:#ddd;margin:4px 0;">Zone : '+zone.nom+'</div>'
            + '<div style="font-size:13px;color:#ddd;margin:4px 0;">Captures : '+qte+'</div>'
            + '<button onclick="this.parentNode.parentNode.remove()" style="margin-top:16px;background:'+rar.couleur+';border:none;border-radius:25px;color:#000;font-weight:bold;padding:9px 28px;cursor:pointer;">Fermer</button>'
            + '</div>';
          overlay.onclick = function(e){ if(e.target===overlay) overlay.remove(); };
          document.body.appendChild(overlay);
        });
    }

function hub(){
      fetch('/eveil/joueur?username='+encodeURIComponent(currentUser))
        .then(function(r){return r.json();})
        .then(function(d){
          var j = d.joueur;
          if(!j || !j.fruit){ ecranTempleIntro(); return; }
          var lig = LIGNEES[j.fruit];
          var stade = j.stade || 1;
          var img = lig.stades[stade-1];
          var nom = lig.noms[stade-1];
          var eclos = stade >= 2;

          var sections = [
            { id:'monstre', emoji:'&#x1F409;', titre:'MON MONSTRE', desc:'Vois et gere ton partenaire', actif:true },
            { id:'combat',  emoji:'&#x2694;&#xFE0F;', titre:'COMBAT', desc:'Affronte des monstres sauvages', actif:true },
            { id:'explo',   emoji:'&#x1F4D6;', titre:'BRISEPEDIA', desc:'Ta collection de monstres', actif:true },
            { id:'boutique',emoji:'&#x1F3EA;', titre:'BOUTIQUE', desc:'Achete potions et objets', actif:true },
            { id:'sac',     emoji:'&#x1F392;', titre:'SAC', desc:'Tes objets et ressources', actif:true },
            { id:'bateau',  emoji:'&#x1F3E0;', titre:'MON BATEAU', desc:'Ton repaire personnel', actif:true }
          ];

          var cards = '';
          for(var i=0;i<sections.length;i++){
            var s = sections[i];
            if(s.actif){
              var action = s.id==='monstre' ? 'monMonstre()' : (s.id==='boutique' ? 'boutique()' : (s.id==='sac' ? 'sac()' : (s.id==='combat' ? 'combat()' : (s.id==='explo' ? 'brisepedia()' : 'bateau()'))));
              cards += '<div onclick="'+action+'" style="background:rgba(0,0,0,0.7);border:1px solid '+lig.couleur+';border-radius:16px;padding:22px;cursor:pointer;transition:all 0.3s;text-align:center;" onmouseover="this.style.transform=&#39;translateY(-6px)&#39;;this.style.boxShadow=&#39;0 8px 25px '+lig.couleur+'66&#39;;" onmouseout="this.style.transform=&#39;translateY(0)&#39;;this.style.boxShadow=&#39;none&#39;;">'
                + '<div style="font-size:42px;margin-bottom:8px;">'+s.emoji+'</div>'
                + '<div style="font-family:Cinzel,serif;font-size:17px;letter-spacing:2px;color:'+lig.couleur+';">'+s.titre+'</div>'
                + '<div style="font-size:12px;color:#aaa;margin-top:6px;">'+s.desc+'</div>'
                + '</div>';
            } else {
              cards += '<div style="background:rgba(0,0,0,0.5);border:1px solid rgba(138,43,226,0.3);border-radius:16px;padding:22px;text-align:center;opacity:0.55;">'
                + '<div style="font-size:42px;margin-bottom:8px;">'+s.emoji+'</div>'
                + '<div style="font-family:Cinzel,serif;font-size:17px;letter-spacing:2px;color:#87ceeb;">'+s.titre+'</div>'
                + '<div style="font-size:12px;color:#888;margin-top:6px;">'+s.desc+'</div>'
                + '<div style="display:inline-block;margin-top:8px;background:rgba(138,43,226,0.3);border:1px solid #8a2be2;color:#8a2be2;font-size:10px;padding:2px 10px;border-radius:10px;">BIENTOT</div>'
                + '</div>';
            }
          }

          var html = '<div style="margin-bottom:25px;display:flex;align-items:center;justify-content:center;gap:15px;flex-wrap:wrap;">'
            + '<img src="'+IMG+'/monstres/'+img+'.png" style="width:70px;height:70px;object-fit:contain;filter:drop-shadow(0 0 12px '+lig.couleur+'aa);">'
            + '<div style="text-align:left;">'
            + '<div style="font-family:Cinzel,serif;font-size:20px;color:'+lig.couleur+';">'+(j.surnom || nom)+'</div>'
            + '<div style="font-size:13px;color:#aaa;">'+(eclos ? 'Niveau '+j.niveau+' &#x2022; '+lig.element : 'Oeuf a couver')+'</div>'
            + '</div></div>'
            + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:18px;max-width:680px;margin:0 auto;">'+cards+'</div>';
          document.getElementById('content').innerHTML = html;
        });
    }

    function monMonstre(){
      fetch('/eveil/joueur?username='+encodeURIComponent(currentUser))
        .then(function(r){return r.json();})
        .then(function(d){
          var j = d.joueur;
          if(!j || !j.fruit){ ecranTempleIntro(); return; }
          var lig = LIGNEES[j.fruit];
          var stade = j.stade || 1;
          var img = lig.stades[stade-1];
          var nom = lig.noms[stade-1];
          var eclos = stade >= 2;

          // OEUF pas encore eclos
          if(!eclos){
            var ho = '<div class="panel" style="border-color:'+lig.couleur+';">'
              + '<div style="font-size:13px;color:#87ceeb;letter-spacing:2px;margin-bottom:10px;">TON OEUF</div>'
              + '<img src="'+IMG+'/monstres/'+img+'.png" style="width:180px;height:180px;object-fit:contain;filter:drop-shadow(0 0 25px '+lig.couleur+'88);animation:flotte 2s ease-in-out infinite;">'
              + '<div style="font-family:Cinzel,serif;font-size:22px;color:'+lig.couleur+';margin:10px 0;">'+nom+'</div>'
              + '<p style="font-size:14px;color:#ccc;margin-bottom:8px;">Ton oeuf n&#39;a pas encore eclos. Couve-le en gagnant de l&#39;experience !</p>'
              + barreXP(j.xp, 50, 'Eclosion', lig.couleur)
              + '<button class="connect-btn" style="border:none;cursor:pointer;margin-top:20px;" onclick="actionTest()">&#x1F31F; Gagner de l&#39;XP (test)</button>'
              + '</div>';
            document.getElementById('content').innerHTML = ho;
            return;
          }

          // Stats calculees selon le niveau
          var st = lig.stats;
          var pvMax = st.pvB + j.niveau * st.pvN;
          var atk = st.atkB + j.niveau * st.atkN;
          var def = st.defB + j.niveau * st.defN;
          var statBar = function(label, val, valMax, col){
            var pct = Math.min(100, Math.round((val/valMax)*100));
            return '<div style="margin-bottom:8px;text-align:left;">'
              + '<div style="display:flex;justify-content:space-between;font-size:11px;color:#aaa;margin-bottom:2px;"><span>'+label+'</span><span style="color:#fff;">'+val+'</span></div>'
              + '<div style="background:rgba(0,0,0,0.5);border-radius:8px;height:10px;overflow:hidden;"><div style="height:100%;width:'+pct+'%;background:'+col+';"></div></div></div>';
          };

          // Attaques (l'ultime grisee si pas stade 4)
          var typesAtk = ['Base','Chargee','Ultime'];
          var atkHTML = '';
          for(var a=0;a<3;a++){
            var estUltime = (a===2);
            var debloque = !estUltime || stade>=4;
            var opacite = debloque ? '1' : '0.35';
            var cadenas = debloque ? '' : ' &#x1F512;';
            atkHTML += '<div style="background:rgba(0,0,0,0.4);border:1px solid '+lig.couleur+'66;border-radius:10px;padding:8px 12px;margin-bottom:8px;text-align:left;opacity:'+opacite+';">'
              + '<div style="font-size:10px;color:'+lig.couleur+';letter-spacing:1px;text-transform:uppercase;">'+typesAtk[a]+cadenas+'</div>'
              + '<div style="font-size:14px;color:#fff;font-weight:bold;">'+lig.attaques[a]+'</div>'
              + (estUltime && !debloque ? '<div style="font-size:10px;color:#888;">Debloquee au stade final</div>' : '')
              + '</div>';
          }

          // La fiche RPG (2 colonnes)
          var html = '<div class="panel" style="border-color:'+lig.couleur+';max-width:680px;background:linear-gradient(135deg, rgba(0,0,0,0.85), '+lig.couleur+'15);">'
            + '<div style="display:flex;gap:25px;flex-wrap:wrap;align-items:center;justify-content:center;">'
            // Colonne gauche : image + nom
            + '<div style="flex:1;min-width:200px;text-align:center;">'
            + '<img src="'+IMG+'/monstres/'+img+'.png" style="width:200px;height:200px;object-fit:contain;filter:drop-shadow(0 0 25px '+lig.couleur+'aa);animation:flotte 2.5s ease-in-out infinite;">'
            + '<div style="font-family:Cinzel,serif;font-size:24px;color:'+lig.couleur+';margin-top:10px;">'+(j.surnom || nom)+'</div>'
            + (j.surnom ? '<div style="font-size:12px;color:#888;font-style:italic;">'+nom+'</div>' : '')
            + '<div style="display:inline-block;margin-top:6px;padding:3px 14px;border:1px solid '+lig.couleur+';border-radius:15px;font-size:12px;color:'+lig.couleur+';">'+lig.element+' &#x2022; Stade '+stade+'/4</div>'
            + '<div style="font-size:20px;color:#fff;margin-top:10px;">Niveau <b style="color:'+lig.couleur+';">'+j.niveau+'</b></div>'
            + '</div>'
            // Colonne droite : stats + xp
            + '<div style="flex:1;min-width:220px;">'
            + statBar('&#x2764;&#xFE0F; PV', pvMax, 600, '#2ecc71')
            + statBar('&#x2694;&#xFE0F; Attaque', atk, 220, '#e74c3c')
            + statBar('&#x1F6E1;&#xFE0F; Defense', def, 180, '#3498db')
            + '<div style="margin-top:12px;">' + barreXP(j.xp, j.prochainNiveauXp || estimXp(j.niveau), 'Niv '+(j.niveau+1), lig.couleur) + '</div>'
            + '</div>'
            + '</div>'
            // Attaques en bas
            + '<div style="margin-top:20px;border-top:1px solid '+lig.couleur+'44;padding-top:15px;">'
            + '<div style="font-size:13px;color:#87ceeb;letter-spacing:2px;margin-bottom:12px;">ATTAQUES</div>'
            + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;">'+atkHTML+'</div>'
            + '</div>'
            + '<button class="connect-btn" style="border:none;cursor:pointer;margin-top:20px;" onclick="actionTest()">&#x1F31F; Gagner de l&#39;XP (test)</button>'
            + '<div style="margin-top:15px;"><button class="connect-btn" style="border:none;cursor:pointer;background:rgba(0,0,0,0.5);font-size:13px;padding:10px 25px;" onclick="hub()">&#x2190; Retour au repaire</button></div>'
            + '</div>';
          document.getElementById('content').innerHTML = html;
        });
    }
        
    function estimXp(niveau){ return 80 + (niveau-1)*40 + Math.floor(Math.pow(niveau,1.7)); }

    function barreXP(xp, max, label, couleur){
      var pct = Math.min(100, Math.round((xp/max)*100));
      return '<div style="max-width:340px;margin:14px auto 0;">'
        + '<div style="background:rgba(0,0,0,0.5);border:1px solid '+couleur+';border-radius:12px;height:20px;overflow:hidden;">'
        + '<div style="height:100%;width:'+pct+'%;background:'+couleur+';transition:width 0.5s;"></div></div>'
        + '<div style="font-size:12px;color:#aaa;margin-top:5px;">'+xp+' / '+max+' XP &#x2192; '+label+'</div></div>';
    }

    function actionTest(){
      fetch('/eveil/gagner-xp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:currentUser,montant:500})})
        .then(function(r){return r.json();})
        .then(function(d){
          if(d.error){ alert(d.error); return; }
          if(d.events && d.events.indexOf('eclosion')>=0){ ecranNommer(); return; }
          if(d.events && d.events.indexOf('evo3')>=0) alert('✨ Ton monstre evolue en stade 3 !');
          if(d.events && d.events.indexOf('evo4')>=0) alert('👑 EVOLUTION FINALE ! Ton monstre atteint sa forme ultime avec le Haki !');
          monMonstre();
        });
    }

    function demarrer(){
      if(!currentUser){ ecranConnexion(); return; }
      fetch('/eveil/joueur?username='+encodeURIComponent(currentUser))
        .then(function(r){return r.json();})
        .then(function(d){
          if(!d.joueur){ ecranChoixGenre(); }
          else if(!d.joueur.fruit){ ecranTempleIntro(); }
          else { hub(); }
        })
        .catch(function(){ document.getElementById('content').innerHTML = '<div class="panel"><p class="loading">Erreur de connexion.</p></div>'; });
    }
    demarrer();
  </script>
</body>
</html>`);
});

// ==================== LOG POSE (RECOMPENSE QUOTIDIENNE) ====================
const DAILY_REWARDS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const DAY_MS = 86400000; // 24h en millisecondes

app.get('/daily/infos', async (req, res) => {
  const username = req.query.username;
  if (!username) return res.status(400).json({ error: 'Manque username' });
  const { data: primeData } = await supabase.from('primes').select('berrys, dernier_daily, daily_streak').eq('username', username).single();
  if (!primeData) return res.status(400).json({ error: 'Pseudo introuvable !' });
  const now = Date.now();
  const lastClaim = parseInt(primeData.dernier_daily) || 0;
  const streak = parseInt(primeData.daily_streak) || 0;
  const cooldown = lastClaim > 0 && now < lastClaim + DAY_MS;
  const restantH = cooldown ? Math.ceil((lastClaim + DAY_MS - now) / 3600000) : 0;
  let prochainJour;
  if (lastClaim === 0 || now > lastClaim + 2 * DAY_MS || streak >= 11) prochainJour = 1;
  else prochainJour = streak + 1;
  res.json({ berrys: primeData.berrys, cooldown, restantH, streakActuel: streak, prochainJour, prochaineRecompense: DAILY_REWARDS[prochainJour - 1], rewards: DAILY_REWARDS });
});

app.post('/daily/claim', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Manque username' });
  const { data: primeData } = await supabase.from('primes').select('berrys, dernier_daily, daily_streak').eq('username', username).single();
  if (!primeData) return res.status(400).json({ error: 'Pseudo introuvable !' });
  const now = Date.now();
  const lastClaim = parseInt(primeData.dernier_daily) || 0;
  const streak = parseInt(primeData.daily_streak) || 0;
  if (lastClaim > 0 && now < lastClaim + DAY_MS) {
    const restantH = Math.ceil((lastClaim + DAY_MS - now) / 3600000);
    return res.status(400).json({ error: 'Reviens dans ' + restantH + 'h pour ton prochain Log Pose !' });
  }
  let newStreak;
  if (lastClaim === 0 || now > lastClaim + 2 * DAY_MS || streak >= 11) newStreak = 1;
  else newStreak = streak + 1;
  const reward = DAILY_REWARDS[newStreak - 1];
  const newBerrys = primeData.berrys + reward;
  await supabase.from('primes').update({ berrys: newBerrys, dernier_daily: now, daily_streak: newStreak }).eq('username', username);
  res.json({ success: true, reward, berrys: newBerrys, streak: newStreak });
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
      ${req.query.verified === 'true' && req.query.owner ? `
      <div style="background:rgba(0,0,0,0.7);border:1px solid #ffd700;color:white;padding:10px 20px;border-radius:25px;font-size:14px;">&#x2705; ${req.query.owner}</div>
      <input type="number" class="mise-input" id="mise" placeholder="Mise (min 50)" min="50">
      <button class="btn btn-gold" onclick="commencerAuto(this.dataset.owner)" data-owner="${req.query.owner}">&#x1F3B4; JOUER !</button>` : `
      <a href="/auth/twitch?username=guest&from=blackjack" style="background:#9146ff;color:white;padding:12px 25px;border-radius:25px;text-decoration:none;font-weight:bold;font-size:14px;">Se connecter avec Twitch pour jouer !</a>`}
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

    async function commencerAuto(p) {
      pseudoActuel = (p || '').toLowerCase();
      const mise = parseInt(document.getElementById('mise').value);
      if (!mise || mise < 50) { alert('Mise minimum 50 Berrys !'); return; }
      const r = await fetch('/blackjack/infos?username=' + pseudoActuel + '&mise=' + mise);
      const data = await r.json();
      if (data.error) { alert(data.error); return; }
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
<div style="position:fixed;bottom:20px;right:20px;z-index:9999;">
    <button id="music-btn" onclick="toggleMusic()" style="background:rgba(0,0,0,0.85);border:2px solid #ffd700;color:white;width:55px;height:55px;border-radius:50%;font-size:24px;cursor:pointer;box-shadow:0 0 20px rgba(255,215,0,0.6);transition:all 0.3s;display:flex;align-items:center;justify-content:center;">&#x1F507;</button>
  </div>
  <audio id="bg-music" src="/persos/sonblackjack.mp3" loop></audio>
  <script>
    let playing = false;
    function toggleMusic() {
      const music = document.getElementById('bg-music');
      const btn = document.getElementById('music-btn');
      if (playing) {
        music.pause();
        btn.innerHTML = '&#x1F507;';
        btn.style.borderColor = '#ffd700';
      } else {
        music.play();
        btn.innerHTML = '&#x1F3B5;';
        btn.style.borderColor = '#87ceeb';
      }
      playing = !playing;
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
    .btn-gold { background: linear-gradient(135deg, #2ecc71, #27ae60); color: #000; }
    .btn-gold:hover { box-shadow: 0 0 30px rgba(243,156,18,0.8); transform: scale(1.05); }
    .btn-action { background: linear-gradient(135deg, #8a2be2, #4169e1); color: white; margin: 5px; }
    .btn-action:hover { box-shadow: 0 0 20px rgba(138,43,226,0.6); transform: scale(1.05); }
    .btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
    .berrys-display { background: rgba(0,0,0,0.8); border: 2px solid #87ceeb; border-radius: 15px; padding: 10px 25px; display: inline-block; margin-bottom: 20px; font-family: 'Cinzel', serif; font-size: 18px; color: #87ceeb; }
    .ocean { background: linear-gradient(180deg, #001a3a, #002855); border-radius: 20px; padding: 20px; margin: 20px 0; position: relative; overflow: hidden; height: 180px; border: 3px solid #f39c12; box-shadow: 0 0 30px rgba(243,156,18,0.3); z-index: 2; }
    .waves { position: absolute; bottom: 0; left: 0; right: 0; height: 60px; background: linear-gradient(180deg, transparent, rgba(0,100,200,0.4)); animation: waveAnim 2s infinite ease-in-out; }
    .waves2 { position: absolute; bottom: 10px; left: 0; right: 0; height: 40px; background: linear-gradient(180deg, transparent, rgba(0,150,255,0.3)); animation: waveAnim 2.5s infinite ease-in-out reverse; }
    @keyframes waveAnim { 0%, 100% { transform: translateX(-10px) scaleY(1); } 50% { transform: translateX(10px) scaleY(1.1); } }
    .sunny { position: absolute; bottom: 15px; transition: left 2s ease-in-out; }
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
      ${req.query.verified === 'true' && req.query.owner ? `
      <div style="background:rgba(0,0,0,0.7);border:1px solid #87ceeb;color:white;padding:10px 20px;border-radius:25px;font-size:14px;">&#x2705; ${req.query.owner}</div>
      <button class="btn btn-gold" onclick="commencerCourse(this.dataset.owner)" data-owner="${req.query.owner}">&#x2693; APPAREILLER !</button>` : `
      <a href="/auth/twitch?username=guest&from=course" style="background:#9146ff;color:white;padding:12px 25px;border-radius:25px;text-decoration:none;font-weight:bold;font-size:14px;">Se connecter avec Twitch pour jouer !</a>`}
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

    async function commencerCourse(p) {
      pseudo = (p || '').toLowerCase();
      document.getElementById('bg-music').play().catch(e => {});
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
      document.getElementById('actions-box').innerHTML = '<button class="btn btn-gold" onclick="location.reload()">&#x1F504; Reviens dans 6h !</button>';
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
<audio id="bg-music" src="/persos/courseonepieceson.mp3" loop></audio>
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
  await supabase.from('codes_temp').insert({ username: username + '_course', code: 'course', expire: Date.now() + 21600000 });
  res.json({ success: true });
});

// ==================== COMBAT DE PIRATES ====================
app.get('/combat', (req, res) => {
  const isAuth = req.query.verified === 'true' && req.query.owner;
  const owner = req.query.owner || '';
  res.send(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Combat de Pirates - NeyLaBrise</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Exo+2:wght@300;400;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #050510; min-height: 100vh; font-family: 'Exo 2', sans-serif; color: white; background-image: url('/persos/combatfond.png'); background-size: cover; background-position: center; background-attachment: fixed; }
    body::before { content: ''; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); pointer-events: none; }
    .container { max-width: 900px; margin: 0 auto; padding: 30px 20px; position: relative; z-index: 1; text-align: center; }
    .back-btn { display: inline-block; margin-bottom: 20px; color: #87ceeb; text-decoration: none; font-size: 14px; letter-spacing: 2px; }
    .title { font-family: 'Cinzel', serif; font-size: 36px; color: #ff0000; letter-spacing: 6px; text-shadow: 0 0 30px rgba(255,0,0,0.8), 2px 2px 0 #000; margin-bottom: 5px; }
    .subtitle { font-size: 13px; color: #fff; letter-spacing: 4px; margin-bottom: 20px; font-weight: bold; text-shadow: 1px 1px 0 #000; }
    .auth-box { background: rgba(0,0,0,0.8); border: 2px solid #ff0000; border-radius: 15px; padding: 20px; margin-bottom: 20px; display: flex; justify-content: center; align-items: center; gap: 15px; flex-wrap: wrap; }
    .btn { padding: 12px 30px; border-radius: 25px; font-size: 14px; font-weight: bold; cursor: pointer; font-family: 'Cinzel', serif; letter-spacing: 2px; border: none; transition: all 0.3s; }
    .btn-red { background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; box-shadow: 0 0 15px rgba(231,76,60,0.4); }
    .btn-red:hover { box-shadow: 0 0 30px rgba(231,76,60,0.8); transform: scale(1.05); }
    .btn-blue { background: linear-gradient(135deg, #3498db, #2980b9); color: white; }
    .btn-gold { background: linear-gradient(135deg, #ffd700, #f39c12); color: #000; }
    .btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
    .berrys-display { background: rgba(0,0,0,0.8); border: 2px solid #f39c12; border-radius: 15px; padding: 10px 25px; display: inline-block; margin-bottom: 20px; font-family: 'Cinzel', serif; font-size: 18px; color: #f39c12; }
    .ennemis-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .ennemi-card { background: rgba(0,0,0,0.8); border-radius: 15px; padding: 20px; cursor: pointer; transition: all 0.3s; border: 2px solid transparent; }
    .ennemi-card:hover { transform: translateY(-5px); }
    .ennemi-card.facile { border-color: #2ecc71; }
    .ennemi-card.moyen { border-color: #f39c12; }
    .ennemi-card.difficile { border-color: #e74c3c; }
    .ennemi-card.legendaire { border-color: #9b59b6; box-shadow: 0 0 20px rgba(155,89,182,0.5); }
    .ennemi-card img { width: 80px; height: 80px; object-fit: contain; margin-bottom: 10px; }
    .ennemi-nom { font-family: 'Cinzel', serif; font-size: 14px; margin-bottom: 5px; }
    .ennemi-diff { font-size: 11px; margin-bottom: 5px; }
    .ennemi-gain { font-size: 12px; color: #f39c12; font-weight: bold; }
    .ennemi-cooldown { font-size: 10px; color: #888; margin-top: 3px; }
    .arena { display: none; }
    .arena.active { display: block; }
    .combat-zone { background: rgba(0,0,0,0.85); border: 3px solid #e74c3c; border-radius: 20px; padding: 25px; margin: 20px 0; }
    .fighters { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .fighter { text-align: center; width: 40%; }
    .fighter img { width: 120px; height: 120px; object-fit: contain; filter: drop-shadow(0 0 15px rgba(255,0,0,0.5)); }
    .fighter-name { font-family: 'Cinzel', serif; font-size: 16px; margin: 8px 0 5px; }
    .hp-bar-container { background: rgba(255,255,255,0.1); border-radius: 10px; height: 12px; overflow: hidden; }
    .hp-bar { height: 100%; border-radius: 10px; transition: width 0.5s ease; }
    .hp-bar.player { background: linear-gradient(90deg, #2ecc71, #27ae60); }
    .hp-bar.enemy { background: linear-gradient(90deg, #e74c3c, #c0392b); }
    .hp-text { font-size: 11px; color: #aaa; margin-top: 3px; }
    .vs { font-family: 'Cinzel', serif; font-size: 36px; color: #ff0000; text-shadow: 0 0 20px rgba(255,0,0,0.8); }
    .combat-log { background: rgba(0,0,0,0.6); border-radius: 10px; padding: 15px; margin: 15px 0; height: 100px; overflow-y: auto; text-align: left; font-size: 13px; }
    .log-entry { margin-bottom: 5px; padding: 3px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .log-player { color: #2ecc71; }
    .log-enemy { color: #e74c3c; }
    .log-info { color: #f39c12; }
    .actions { display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin-top: 15px; }
    .effect { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 80px; pointer-events: none; z-index: 9999; display: none; animation: effectAnim 0.8s forwards; }
    @keyframes effectAnim { 0% { opacity: 1; transform: translate(-50%, -50%) scale(0.5); } 50% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); } 100% { opacity: 0; transform: translate(-50%, -50%) scale(2); } }
    .result-box { background: rgba(0,0,0,0.95); border-radius: 20px; padding: 30px; margin-top: 20px; display: none; }
    .result-box.show { display: block; animation: fadeIn 0.5s forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .result-title { font-family: 'Cinzel', serif; font-size: 32px; margin-bottom: 15px; }
    .result-gain { font-size: 28px; font-weight: bold; margin: 10px 0; }
    .shake { animation: shake 0.5s; }
    @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
  </style>
</head>
<body>
  <div class="container">
    <a href="/minijeux" class="back-btn">&#x2190; Mini Jeux</a>
    <div class="title">&#x2694;&#xFE0F; COMBAT DE PIRATES</div>
    <div class="subtitle">Affronte les legendes du Grand Line !</div>
    <div class="auth-box">
      ${isAuth ? `
      <div style="color:white;font-size:14px;border:1px solid #ff0000;padding:8px 20px;border-radius:20px;background:rgba(0,0,0,0.7);">&#x2705; ${owner}</div>` : `
      <a href="/auth/twitch?username=guest&from=combat" style="background:#9146ff;color:white;padding:12px 25px;border-radius:25px;text-decoration:none;font-weight:bold;font-size:14px;">Se connecter avec Twitch pour jouer !</a>`}
    </div>
    ${isAuth ? `
    <div id="berrys-display" class="berrys-display">&#x1F4B0; <span id="berrys-amount">...</span> Berrys</div>
    <div id="selection-section">
      <div style="font-family:'Cinzel',serif;font-size:18px;color:#ff0000;letter-spacing:3px;margin-bottom:20px;text-shadow:0 0 10px rgba(255,0,0,0.5);">CHOISIS TON ADVERSAIRE</div>
      <div class="ennemis-grid">
        <div class="ennemi-card facile" onclick="choisirEnnemi('wapol',0)">
          <img src="/persos/wapol.png" alt="Wapol">
          <div class="ennemi-nom">WAPOL</div>
          <div class="ennemi-diff" style="color:#2ecc71;">&#x1F7E2; FACILE</div>
          <div class="ennemi-gain">+150 Berrys</div>
          <div class="ennemi-cooldown">&#x23F0; 30 min</div>
        </div>
        <div class="ennemi-card moyen" onclick="choisirEnnemi('crocodile',1)">
          <img src="/persos/crocodile.png" alt="Crocodile">
          <div class="ennemi-nom">CROCODILE</div>
          <div class="ennemi-diff" style="color:#f39c12;">&#x1F7E1; MOYEN</div>
          <div class="ennemi-gain">+300 Berrys</div>
          <div class="ennemi-cooldown">&#x23F0; 30 min</div>
        </div>
        <div class="ennemi-card difficile" onclick="choisirEnnemi('doflamingo',2)">
          <img src="/persos/doflamingo.png" alt="Doflamingo">
          <div class="ennemi-nom">DOFLAMINGO</div>
          <div class="ennemi-diff" style="color:#e74c3c;">&#x1F534; DIFFICILE</div>
          <div class="ennemi-gain">+600 Berrys</div>
          <div class="ennemi-cooldown">&#x23F0; 30 min</div>
        </div>
        <div class="ennemi-card legendaire" onclick="choisirEnnemi('barbenoire',3)">
          <img src="/persos/barbenoire.png" alt="Barbe Noire">
          <div class="ennemi-nom">BARBE NOIRE</div>
          <div class="ennemi-diff" style="color:#9b59b6;">&#x1F7E3; LEGENDAIRE</div>
          <div class="ennemi-gain">+1500 Berrys</div>
          <div class="ennemi-cooldown">&#x23F0; 30 min</div>
        </div>
      </div>
    </div>
    <div class="arena" id="arena">
      <div class="combat-zone">
        <div class="fighters">
          <div class="fighter" id="fighter-player">
            <img src="/persos/teamnlb.png" alt="Toi" id="player-img">
            <div class="fighter-name" id="player-name">${owner}</div>
            <div class="hp-bar-container"><div class="hp-bar player" id="player-hp-bar" style="width:100%"></div></div>
            <div class="hp-text" id="player-hp-text">100/100 HP</div>
          </div>
          <div class="vs">VS</div>
          <div class="fighter" id="fighter-enemy">
            <img src="" alt="Ennemi" id="enemy-img">
            <div class="fighter-name" id="enemy-name"></div>
            <div class="hp-bar-container"><div class="hp-bar enemy" id="enemy-hp-bar" style="width:100%"></div></div>
            <div class="hp-text" id="enemy-hp-text"></div>
          </div>
        </div>
        <div class="combat-log" id="combat-log"></div>
        <div class="actions" id="combat-actions">
          <button class="btn btn-red" onclick="attaquer()" id="btn-attaquer">&#x2694;&#xFE0F; ATTAQUER</button>
          <button class="btn btn-blue" onclick="defendre()" id="btn-defendre">&#x1F6E1;&#xFE0F; DEFENDRE</button>
          <button class="btn btn-gold" onclick="technique()" id="btn-technique">&#x26A1; TECHNIQUE</button>
        </div>
      </div>
      <div class="result-box" id="result-box">
        <div class="result-title" id="result-title"></div>
        <div class="result-gain" id="result-gain"></div>
        <button class="btn btn-red" style="margin-top:15px;" onclick="recommencer()">&#x1F504; NOUVEAU COMBAT</button>
      </div>
    </div>` : ''}
  </div>
  <div class="effect" id="effect"></div>
  <script>
    const ennemis = [
      { nom: 'WAPOL', img: '/persos/wapol.png', hpMax: 80, atk: 8, gain: 150, diff: 0 },
      { nom: 'CROCODILE', img: '/persos/crocodile.png', hpMax: 120, atk: 15, gain: 300, diff: 1 },
      { nom: 'DOFLAMINGO', img: '/persos/doflamingo.png', hpMax: 180, atk: 22, gain: 600, diff: 2 },
      { nom: 'BARBE NOIRE', img: '/persos/barbenoire.png', hpMax: 250, atk: 35, gain: 1500, diff: 3 }
    ];
    let playerHP = 100, playerHPMax = 100;
    let enemyHP = 0, enemyHPMax = 0;
    let ennemiActuel = null, combatEnCours = false, defense = false;
    const pseudo = '${owner}';

    async function init() {
      const r = await fetch('/combat/infos?username=' + pseudo);
      const data = await r.json();
      if (data.berrys !== undefined) {
        document.getElementById('berrys-amount').textContent = data.berrys.toLocaleString();
      }
      if (data.cooldowns) {
        data.cooldowns.forEach((cd, i) => {
          if (cd > 0) {
            const cards = document.querySelectorAll('.ennemi-card');
            if (cards[i]) {
              cards[i].style.opacity = '0.5';
              cards[i].style.cursor = 'not-allowed';
              cards[i].onclick = null;
              const cooldownDiv = cards[i].querySelector('.ennemi-cooldown');
              if (cooldownDiv) cooldownDiv.textContent = '⏰ ' + cd + ' min restantes';
            }
          }
        });
      }
    }

    function choisirEnnemi(nom, idx) {
      ennemiActuel = ennemis[idx];
      playerHP = playerHPMax = 100;
      enemyHP = enemyHPMax = ennemiActuel.hpMax;
      defense = false;
      combatEnCours = true;
      document.getElementById('selection-section').style.display = 'none';
      document.getElementById('arena').classList.add('active');
      document.getElementById('enemy-img').src = ennemiActuel.img;
      document.getElementById('enemy-name').textContent = ennemiActuel.nom;
      document.getElementById('enemy-hp-text').textContent = enemyHP + '/' + enemyHPMax + ' HP';
      document.getElementById('player-hp-text').textContent = playerHP + '/' + playerHPMax + ' HP';
      majHPBars();
      addLog('Le combat contre ' + ennemiActuel.nom + ' commence !', 'info');
    }

    function majHPBars() {
      document.getElementById('player-hp-bar').style.width = (playerHP / playerHPMax * 100) + '%';
      document.getElementById('enemy-hp-bar').style.width = (enemyHP / enemyHPMax * 100) + '%';
      const playerColor = playerHP > 50 ? '#2ecc71' : playerHP > 25 ? '#f39c12' : '#e74c3c';
      document.getElementById('player-hp-bar').style.background = 'linear-gradient(90deg, ' + playerColor + ', ' + playerColor + ')';
    }

    function addLog(msg, type) {
      const log = document.getElementById('combat-log');
      const div = document.createElement('div');
      div.className = 'log-entry log-' + type;
      div.textContent = msg;
      log.appendChild(div);
      log.scrollTop = log.scrollHeight;
    }

    function showEffect(emoji) {
      const el = document.getElementById('effect');
      el.innerHTML = emoji;
      el.style.display = 'block';
      setTimeout(() => { el.style.display = 'none'; }, 800);
    }

    function shake(elementId) {
      const el = document.getElementById(elementId);
      el.classList.add('shake');
      setTimeout(() => el.classList.remove('shake'), 500);
    }

    function attaquer() {
      if (!combatEnCours) return;
      setBtnsDisabled(true);
      defense = false;
      const dmgPlayer = Math.floor(Math.random() * 20) + 15;
      enemyHP = Math.max(0, enemyHP - dmgPlayer);
      showEffect('&#x1F4A5;');
      shake('fighter-enemy');
      addLog('Tu attaques ! -' + dmgPlayer + ' HP a ' + ennemiActuel.nom, 'player');
      majHPBars();
      document.getElementById('enemy-hp-text').textContent = enemyHP + '/' + enemyHPMax + ' HP';
      if (enemyHP <= 0) { setTimeout(() => finCombat(true), 500); return; }
      setTimeout(() => tourEnnemi(), 800);
    }

    function defendre() {
      if (!combatEnCours) return;
      setBtnsDisabled(true);
      defense = true;
      addLog('Tu te mets en position defensive !', 'info');
      showEffect('&#x1F6E1;&#xFE0F;');
      setTimeout(() => tourEnnemi(), 800);
    }

    function technique() {
      if (!combatEnCours) return;
      setBtnsDisabled(true);
      defense = false;
      const dmgPlayer = Math.floor(Math.random() * 35) + 25;
      enemyHP = Math.max(0, enemyHP - dmgPlayer);
      showEffect('&#x26A1;');
      shake('fighter-enemy');
      addLog('TECHNIQUE SPECIALE ! -' + dmgPlayer + ' HP a ' + ennemiActuel.nom + ' !', 'player');
      majHPBars();
      document.getElementById('enemy-hp-text').textContent = enemyHP + '/' + enemyHPMax + ' HP';
      if (enemyHP <= 0) { setTimeout(() => finCombat(true), 500); return; }
      setTimeout(() => tourEnnemi(), 800);
    }

    function tourEnnemi() {
      const dmgEnnemi = defense ? Math.floor(ennemiActuel.atk * 0.3) : Math.floor(Math.random() * ennemiActuel.atk) + Math.floor(ennemiActuel.atk * 0.5);
      playerHP = Math.max(0, playerHP - dmgEnnemi);
      showEffect('&#x1F480;');
      shake('fighter-player');
      addLog(ennemiActuel.nom + ' attaque ! -' + dmgEnnemi + ' HP', 'enemy');
      majHPBars();
      document.getElementById('player-hp-text').textContent = playerHP + '/' + playerHPMax + ' HP';
      if (playerHP <= 0) { setTimeout(() => finCombat(false), 500); return; }
      defense = false;
      setBtnsDisabled(false);
    }

    function setBtnsDisabled(disabled) {
      ['btn-attaquer','btn-defendre','btn-technique'].forEach(id => {
        document.getElementById(id).disabled = disabled;
      });
    }

    async function finCombat(victoire) {
      combatEnCours = false;
      setBtnsDisabled(true);
      const r = await fetch('/combat/resultat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: pseudo, diff: ennemiActuel.diff, victoire, gain: ennemiActuel.gain })
      });
      const data = await r.json();
      document.getElementById('berrys-amount').textContent = data.berrys.toLocaleString();
      const box = document.getElementById('result-box');
      box.style.border = victoire ? '3px solid #ffd700' : '3px solid #e74c3c';
      box.style.boxShadow = victoire ? '0 0 30px rgba(255,215,0,0.4)' : '0 0 30px rgba(231,76,60,0.4)';
      document.getElementById('result-title').innerHTML = victoire ? '&#x1F3C6; VICTOIRE !' : '&#x1F480; DEFAITE !';
      document.getElementById('result-title').style.color = victoire ? '#ffd700' : '#e74c3c';
      document.getElementById('result-gain').textContent = victoire ? '+' + ennemiActuel.gain + ' Berrys !' : '-' + Math.floor(ennemiActuel.gain * 0.3) + ' Berrys...';
      document.getElementById('result-gain').style.color = victoire ? '#ffd700' : '#e74c3c';
      box.classList.add('show');
    }

    function recommencer() {
      document.getElementById('arena').classList.remove('active');
      document.getElementById('selection-section').style.display = 'block';
      document.getElementById('result-box').classList.remove('show');
      document.getElementById('combat-log').innerHTML = '';
      init();
    }

    init();
  </script>
<audio id="bg-music" src="/persos/combatpirateson.mp3" loop></audio>
  <script>
    document.getElementById('bg-music').play().catch(e => {});
  </script>
</body>
</html>`);
});

app.get('/combat/infos', async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'Manque username' });
  const { data: primeData } = await supabase.from('primes').select('berrys').eq('username', username).single();
  if (!primeData) return res.status(400).json({ error: 'Pseudo introuvable !' });
  const cooldowns = [];
  for (let i = 0; i < 4; i++) {
    const { data: rows } = await supabase.from('codes_temp').select('expire').eq('username', username + '_combat_' + i);
    const cd = rows && rows.length > 0 ? rows[0] : null;
    const restant = cd && Date.now() < parseInt(cd.expire) ? Math.ceil((parseInt(cd.expire) - Date.now()) / 60000) : 0;
    cooldowns.push(restant);
  }
  res.json({ berrys: primeData.berrys, cooldowns });
});

app.post('/combat/resultat', async (req, res) => {
  const { username, diff, victoire, gain } = req.body;
  const { data: primeData } = await supabase.from('primes').select('berrys').eq('username', username).single();
  if (!primeData) return res.status(400).json({ error: 'Erreur' });
  let newBerrys = primeData.berrys;
  if (victoire) newBerrys += gain;
  else newBerrys = Math.max(0, newBerrys - Math.floor(gain * 0.3));
  await supabase.from('primes').upsert({ username, berrys: newBerrys, derniermessage: 0, derniereprime: 0 });
  await supabase.from('codes_temp').delete().eq('username', username + '_combat_' + diff);
  await supabase.from('codes_temp').insert({ username: username + '_combat_' + diff, code: 'combat', expire: Date.now() + 1800000 });
  res.json({ success: true, berrys: newBerrys });
});

// ==================== ANIMATION OBS ====================
app.get('/animation', (req, res) => {
  const fruit = req.query.fruit || '';
  const rarete = req.query.rarete || 'Commun';
  const couleurs = { 'Ultime': '#ffffff', 'Mythique': '#cc0000', 'Legendaire': '#ffd700', 'Epique': '#9b59b6', 'Rare': '#3498db', 'Commun': '#2ecc71' };
  const couleur = couleurs[rarete] || '#2ecc71';
  const html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:transparent;display:flex;justify-content:center;align-items:center;width:500px;height:400px;overflow:hidden;}.machine{background:linear-gradient(145deg,#0d0d1a,#1a1a3e,#0d0d1a);border:3px solid COULEUR;border-radius:24px;padding:25px 20px;text-align:center;box-shadow:0 0 60px COULEUR66,inset 0 0 40px rgba(0,0,0,.8);width:460px;opacity:0;animation:fadeIn .5s forwards;position:relative;overflow:hidden;}.machine::before{content:"x";color:transparent;position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(ellipse at center,COULEUR11 0%,transparent 60%);animation:pulse 2s infinite;}@keyframes pulse{0%,100%{opacity:.5;}50%{opacity:1;}}@keyframes fadeIn{from{opacity:0;transform:scale(.8);}to{opacity:1;transform:scale(1);}}.title{color:COULEUR;font-family:Arial Black,sans-serif;font-size:16px;letter-spacing:6px;margin-bottom:18px;text-transform:uppercase;text-shadow:0 0 20px COULEUR;position:relative;}.slots{display:flex;justify-content:center;gap:12px;margin-bottom:18px;}.slot{background:linear-gradient(180deg,#050510,#0a0a20);border:2px solid COULEUR;border-radius:14px;width:110px;height:110px;overflow:hidden;position:relative;box-shadow:0 0 20px COULEUR44,inset 0 0 15px rgba(0,0,0,.9);}.slot-inner{display:flex;flex-direction:column;align-items:center;width:100%;}.fruit-reveal{display:flex;flex-direction:column;align-items:center;gap:8px;opacity:0;animation:revealFruit .6s 4s forwards;}@keyframes revealFruit{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}.fruit-img{width:70px;height:70px;object-fit:contain;filter:drop-shadow(0 0 15px COULEUR) drop-shadow(0 0 30px COULEUR66);}.fruit-name{color:white;font-family:Arial Black,sans-serif;font-size:18px;font-weight:bold;letter-spacing:2px;text-shadow:0 0 10px white;}.rarete-badge{display:inline-block;background:linear-gradient(135deg,COULEUR33,COULEUR11);border:2px solid COULEUR;color:COULEUR;padding:6px 24px;border-radius:25px;font-family:Arial Black,sans-serif;font-size:14px;font-weight:bold;letter-spacing:4px;text-shadow:0 0 10px COULEUR;box-shadow:0 0 15px COULEUR44;opacity:0;animation:revealBadge .6s 4.5s forwards;}@keyframes revealBadge{from{opacity:0;transform:scale(.5);}to{opacity:1;transform:scale(1);}}</style></head><body><div class="machine"><div class="title">&#x1F3B0; Fruit du Demon &#x1F3B0;</div><div class="slots"><div class="slot" id="s1"><div class="slot-inner"><img src="/fruits/Mera-Mera.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Gum-Gum.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Yami-Yami.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Hie-Hie.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Ope-Ope.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"></div></div><div class="slot" id="s2"><div class="slot-inner"><img src="/fruits/Goro-Goro.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Pika-Pika.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Suna-Suna.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Ito-Ito.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Magu-Magu.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"></div></div><div class="slot" id="s3"><div class="slot-inner"><img src="/fruits/Hana-Hana.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Mochi-Mochi.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Bara-Bara.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Sube-Sube.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"><img src="/fruits/Bomu-Bomu.png" style="width:100px;height:100px;object-fit:contain;display:block;margin:5px auto;"></div></div></div><div class="fruit-reveal"><img class="fruit-img" src="/fruits/FRUIT.png" alt="FRUIT"><div class="fruit-name">FRUIT no Mi</div><div class="rarete-badge">RARETE</div></div></div><audio id="spinSound" src="/spin.mp3" preload="auto"></audio><script>const slots=[document.getElementById("s1"),document.getElementById("s2"),document.getElementById("s3")];const stopTimes=[1500,2500,3500];slots.forEach((slot,i)=>{let pos=0;const interval=setInterval(()=>{pos-=12;slot.querySelector(".slot-inner").style.transform="translateY("+(pos%450)+"px)";},25);setTimeout(()=>{clearInterval(interval);slot.querySelector(".slot-inner").style.transform="translateY(0)";},stopTimes[i]);});<\/script></body></html>';
  res.send(html.replace(/COULEUR/g, couleur).replace(/FRUIT/g, fruit).replace(/RARETE/g, rarete));
});

app.listen(3000, () => console.log('Serveur online demarre !'));
