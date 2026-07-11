#!/usr/bin/env node
// Genera la pagina de referido de un creador: r/<code>/index.html
// Uso: node make-referral-page.mjs <code> "<Nombre publico>"
// El code debe matchear ^[a-z0-9-]{3,32}$ y existir en la tabla referral_codes.

import { mkdirSync, writeFileSync } from 'node:fs';

const [code, name] = process.argv.slice(2);
if (!code || !name || !/^[a-z0-9-]{3,32}$/.test(code)) {
  console.error('Uso: node make-referral-page.mjs <code> "<Nombre publico>"');
  console.error('     <code> en minusculas: letras, digitos y guiones (3-32 chars)');
  process.exit(1);
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const safeName = esc(name);
const jsName = JSON.stringify(name).replace(/</g, '\\u003c');

const html = `<!DOCTYPE html>
<html lang="es" style="color-scheme: dark;">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#09090b" />
  <meta name="robots" content="noindex" />
  <title>${safeName} te invita a Goal Labs</title>
  <meta name="description" content="Proba Goal Labs con 30 dias de Pro gratis, invitado por ${safeName}." />
  <meta property="og:title" content="${safeName} te invita a Goal Labs" />
  <meta property="og:description" content="Analisis de video para futbol. Entra con esta invitacion y arranca con 30 dias de Pro gratis." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://goallabs.com.ar/r/${code}/" />
  <meta property="og:image" content="https://goallabs.com.ar/assets/og-image.png" />
  <meta property="og:site_name" content="Goal Labs" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml" />
  <script data-goatcounter="https://goallabs.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
  <style>
    body { margin:0; background:#0a0a0a; color:#f0ebe1; font-family:system-ui,sans-serif;
           min-height:100vh; display:flex; align-items:center; justify-content:center; }
    p { opacity:.7; font-size:14px; letter-spacing:.05em; }
  </style>
</head>
<body>
  <p>Abriendo tu invitaci&oacute;n&hellip;</p>
  <script>
    try {
      localStorage.setItem('gl_ref', JSON.stringify({ code: '${code}', name: ${jsName}, ts: Date.now() }));
    } catch (e) {}
    // ~350ms para que GoatCounter cuente el click antes de salir
    setTimeout(function () { location.replace('/cuenta/?ref=${code}'); }, 350);
  </script>
  <noscript><meta http-equiv="refresh" content="0;url=/cuenta/?ref=${code}" /></noscript>
</body>
</html>
`;

mkdirSync(`r/${code}`, { recursive: true });
writeFileSync(`r/${code}/index.html`, html);
console.log(`OK → r/${code}/index.html  (${name})`);
console.log(`Link: https://goallabs.com.ar/r/${code}`);
