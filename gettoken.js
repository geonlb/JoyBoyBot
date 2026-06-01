const axios = require('axios');
axios.post('https://id.twitch.tv/oauth2/token', null, {
  params: {
    client_id: '4wl3wc4mnurd77ctzhl8s8v6gak6yl',
    client_secret: 'pher47e2e37jw51ygtxphw5dyjo5rq',
    grant_type: 'client_credentials'
  }
}).then(r => {
  console.log('Token:', r.data.access_token);
}).catch(e => {
  console.log('Erreur:', e.message);
});