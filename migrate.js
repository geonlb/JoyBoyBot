const Database = require('better-sqlite3');
const { createClient } = require('@supabase/supabase-js');

const db = new Database('joyboy.db');
const supabase = createClient(
  'https://usbsivjrputwwrohezwk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzYnNpdmpycHV0d3dyb2hlendrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDExOTM1MSwiZXhwIjoyMDk1Njk1MzUxfQ.UNf-rdDBD0MocGrQW4tzNAW3ksqgR__Zg3b1PwsDlPs'
);

async function migrate() {
  const membres = db.prepare('SELECT * FROM membres').all();
  const compteur = db.prepare('SELECT * FROM compteur').all();
  const primes = db.prepare('SELECT * FROM primes').all();

  if (membres.length > 0) {
    await supabase.from('membres').upsert(membres);
    console.log(`${membres.length} membres migrés !`);
  }
  if (primes.length > 0) {
  const primesFormatted = primes.map(p => ({
    username: p.username,
    berrys: p.berrys,
    derniermessage: p.dernierMessage,
    derniereprime: p.dernierePrime
  }));
  await supabase.from('primes').upsert(primesFormatted);
  console.log(`${primes.length} primes migrés !`);
}
  if (primes.length > 0) {
    await supabase.from('primes').upsert(primes);
    console.log(`${primes.length} primes migrés !`);
  }
  console.log('Migration terminée !');
}

migrate();