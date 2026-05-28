const express = require('express');
const axios = require('axios');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname)));
const db = new Database('joyboy.db');

const CLIENT_ID = '4wl3wc4mnurd77ctzhl8s8v6gak6yl';
const ACCESS_TOKEN = '9w76c932djulze7uhrqdwjbk4d5fnn';

app.get('/prime/:username', async (req, res) => {
  const username = req.params.username.toLowerCase();
  
  // Récupérer les données du bot
  const prime = db.prepare('SELECT berrys FROM primes WHERE username = ?').get(username);
  const membre = db.prepare('SELECT personnage FROM membres WHERE username = ?').get(username);
  const compteur = db.prepare('SELECT subs FROM compteur WHERE username = ?').get(username);

  // Récupérer la photo de profil Twitch
  let avatar = 'https://static-cdn.jtvnw.net/user-default-pictures-uv/ebe4cd89-b4f4-4cd9-adac-2f30151b4209-profile_image-300x300.png';
  try {
    const response = await axios.get(`https://api.twitch.tv/helix/users?login=${username}`, {
      headers: {
        'Client-ID': CLIENT_ID,
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    });
    if (response.data.data.length > 0) {
      avatar = response.data.data[0].profile_image_url;
    }
  } catch (err) {
    console.log('Erreur Twitch API:', err.message);
  }

  const berrys = prime ? prime.berrys : 0;
  const personnage = membre ? membre.personnage : 'Aucun';
  const subs = compteur ? compteur.subs : 0;

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
body {
  background: #1a1a2e;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.wanted {
  background: linear-gradient(135deg, #e8d5a3, #d4b896, #c9a97d, #d4b896, #e8d5a3);
  width: 400px;
  padding: 25px 20px;
  text-align: center;
  position: relative;
  box-shadow: 0 0 50px rgba(0,0,0,0.9), inset 0 0 80px rgba(0,0,0,0.25);
  border: 4px solid #1a1a1a;
}
.wanted::before {
  content: '';
  position: absolute;
  top: 8px; left: 8px; right: 8px; bottom: 8px;
  border: 2px solid #1a1a1a;
  pointer-events: none;
}
.texture {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: 
    radial-gradient(ellipse at 20% 30%, rgba(0,0,0,0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(0,0,0,0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(139,90,43,0.05) 0%, transparent 70%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1;
}
.content { position: relative; z-index: 2; }
.title {
  font-family: 'Oswald', sans-serif;
  font-size: 72px;
  color: #0d0d0d;
  letter-spacing: 6px;
  line-height: 1;
  text-shadow: 4px 4px 0px rgba(0,0,0,0.15);
  margin-bottom: 0px;
}
.subtitle {
  font-size: 13px;
  color: #1a1a1a;
  letter-spacing: 6px;
  margin-bottom: 15px;
  border-top: 2px solid #1a1a1a;
  border-bottom: 2px solid #1a1a1a;
  padding: 5px 0;
  font-family: Georgia, serif;
}
.avatar {
  width: 210px;
  height: 210px;
  border: 4px solid #1a1a1a;
  object-fit: cover;
  display: block;
  margin: 0 auto 12px;
  filter: sepia(20%) contrast(105%);
  box-shadow: inset 0 0 20px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.4);
}
.username {
  font-family: 'Oswald', sans-serif;
  font-size: 30px;
  color: #0d0d0d;
  margin: 8px 0 4px;
  letter-spacing: 4px;
  text-transform: uppercase;
}
.personnage {
  font-size: 12px;
  color: #2a1a0a;
  margin-bottom: 12px;
  font-style: italic;
  font-family: Georgia, serif;
  letter-spacing: 1px;
}
.divider {
  border: none;
  border-top: 2px solid #1a1a1a;
  margin: 8px 30px;
}
.bounty-label {
  font-size: 11px;
  color: #1a1a1a;
  letter-spacing: 6px;
  text-transform: uppercase;
  margin-top: 8px;
  font-family: Georgia, serif;
}
.bounty {
  font-family: 'Oswald', sans-serif;
  font-size: 42px;
  color: #0d0d0d;
  letter-spacing: 2px;
  line-height: 1.1;
}
.bounty-unit {
  font-size: 13px;
  color: #2a1a0a;
  letter-spacing: 5px;
  margin-bottom: 10px;
  font-family: Georgia, serif;
}
.footer {
  font-size: 10px;
  color: #1a1a1a;
  letter-spacing: 3px;
  border-top: 2px solid #1a1a1a;
  padding-top: 8px;
  margin-top: 5px;
  font-family: Georgia, serif;
  text-transform: uppercase;
}
.corner {
  position: absolute;
  font-size: 22px;
  color: #1a1a1a;
  opacity: 0.6;
}
.corner.tl { top: 14px; left: 14px; }
.corner.tr { top: 14px; right: 14px; }
.corner.bl { bottom: 14px; left: 14px; }
.corner.br { bottom: 14px; right: 14px; }
  </style></head>
<body>
  <div class="wanted">
  <div class="texture"></div>
  <span class="corner tl">⚓</span>
  <span class="corner tr">⚓</span>
  <span class="corner bl">⚓</span>
  <span class="corner br">⚓</span>
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
</body>
</html>
  `);
});

app.listen(3000, () => {
  console.log('Serveur web démarré sur le port 3000 !');
});