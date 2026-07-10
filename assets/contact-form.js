/* Goal Labs — formulario de contacto compartido (modal) vía Web3Forms.
   Reemplaza los links mailto: de nav/closer en index.html, partners/ y creadores/.
   Los campos varían según el tipo de contacto (data-contact-form="partners"|"creator"
   en el trigger): cada público responde preguntas relevantes para calificar el contacto,
   no un mensaje libre genérico. */
(function () {
  var ACCESS_KEY = '9cf639f2-e629-4a64-b965-d4cf66c9e6a9';
  var ENDPOINT = 'https://api.web3forms.com/submit';
  var FALLBACK_EMAIL = 'nacholiporace@goallabs.com.ar';

  var STR = {
    es: {
      name: 'Nombre', email: 'Email', selectPlaceholder: 'Elegí una opción',
      send: 'Enviar', sending: 'Enviando…', close: 'Cerrar',
      success: '¡Gracias! Te respondemos a la brevedad.',
      error: 'No se pudo enviar. Reintentá o escribinos directo a ' + FALLBACK_EMAIL + '.'
    },
    en: {
      name: 'Name', email: 'Email', selectPlaceholder: 'Choose an option',
      send: 'Send', sending: 'Sending…', close: 'Close',
      success: "Thanks! We'll get back to you soon.",
      error: 'Something went wrong. Try again or email us directly at ' + FALLBACK_EMAIL + '.'
    },
    it: {
      name: 'Nome', email: 'Email', selectPlaceholder: "Scegli un'opzione",
      send: 'Invia', sending: 'Invio…', close: 'Chiudi',
      success: 'Grazie! Ti risponderemo a breve.',
      error: 'Invio non riuscito. Riprova o scrivici direttamente a ' + FALLBACK_EMAIL + '.'
    }
  };

  var FORMS = {
    clubes: {
      title: { es: 'Contanos sobre tu club', en: 'Tell us about your club', it: 'Raccontaci del tuo club' },
      fields: [
        { name: 'institution', type: 'text', required: true,
          label: { es: 'Club / institución', en: 'Club / institution', it: 'Club / istituzione' } },
        { name: 'institution_type', type: 'select', required: true,
          label: { es: 'Tipo de institución', en: 'Type of institution', it: 'Tipo di istituzione' },
          options: [
            { value: 'club', label: { es: 'Club', en: 'Club', it: 'Club' } },
            { value: 'academia', label: { es: 'Academia / escuela de fútbol', en: 'Academy / football school', it: 'Accademia / scuola calcio' } },
            { value: 'liga_regional', label: { es: 'Liga regional o amateur', en: 'Regional or amateur league', it: 'Lega regionale o amatoriale' } },
            { value: 'otro', label: { es: 'Otro', en: 'Other', it: 'Altro' } }
          ] },
        { name: 'message', type: 'textarea', required: true,
          label: { es: 'Contanos más', en: 'Tell us more', it: 'Raccontaci di più' } }
      ]
    },
    partners: {
      title: { es: 'Contanos sobre tu propuesta', en: 'Tell us about your proposal', it: 'Raccontaci della tua proposta' },
      fields: [
        { name: 'organization', type: 'text', required: true,
          label: { es: 'Organización / empresa', en: 'Organization / company', it: 'Organizzazione / azienda' } },
        { name: 'partner_type', type: 'select', required: true,
          label: { es: 'Tipo de partner', en: 'Partner type', it: 'Tipo di partner' },
          options: [
            { value: 'liga', label: { es: 'Liga o plataforma de video', en: 'League or video platform', it: 'Lega o piattaforma video' } },
            { value: 'medio', label: { es: 'Medio o marca', en: 'Media outlet or brand', it: 'Media o brand' } },
            { value: 'reventa', label: { es: 'Consultora / reventa', en: 'Consultancy / resale', it: 'Consulenza / rivendita' } },
            { value: 'otro', label: { es: 'Otro', en: 'Other', it: 'Altro' } }
          ] },
        { name: 'message', type: 'textarea', required: true,
          label: { es: 'Contanos más', en: 'Tell us more', it: 'Raccontaci di più' } }
      ]
    },
    creator: {
      title: { es: 'Sumate como creador', en: 'Join as a creator', it: 'Unisciti come creator' },
      fields: [
        { name: 'handle', type: 'text', required: true,
          label: { es: 'Usuario / canal', en: 'Handle / channel', it: 'Nome utente / canale' } },
        { name: 'platform', type: 'select', required: true,
          label: { es: 'Plataforma principal', en: 'Main platform', it: 'Piattaforma principale' },
          options: [
            { value: 'youtube', label: { es: 'YouTube', en: 'YouTube', it: 'YouTube' } },
            { value: 'instagram', label: { es: 'Instagram', en: 'Instagram', it: 'Instagram' } },
            { value: 'tiktok', label: { es: 'TikTok', en: 'TikTok', it: 'TikTok' } },
            { value: 'twitch', label: { es: 'Twitch', en: 'Twitch', it: 'Twitch' } },
            { value: 'otra', label: { es: 'Otra', en: 'Other', it: 'Altra' } }
          ] },
        { name: 'message', type: 'textarea', required: true,
          label: { es: 'Contanos sobre tu contenido', en: 'Tell us about your content', it: 'Raccontaci del tuo contenuto' } }
      ]
    },
    generic: {
      title: { es: 'Escribinos', en: "Let's talk", it: 'Scrivici' },
      fields: [
        { name: 'message', type: 'textarea', required: true,
          label: { es: 'Mensaje', en: 'Message', it: 'Messaggio' } }
      ]
    }
  };

  function lang() {
    var l = (document.documentElement.lang || 'es').slice(0, 2).toLowerCase();
    return STR[l] ? l : 'es';
  }

  var css = ''
    + '.gl-cf-backdrop{position:fixed;inset:0;z-index:9500;background:rgba(0,0,0,.6);backdrop-filter:blur(2px);'
    + 'display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;pointer-events:none;transition:opacity .2s ease;overflow-y:auto;}'
    + '.gl-cf-backdrop.is-open{opacity:1;pointer-events:auto;}'
    + '.gl-cf-modal{background:#111113;border:1px solid rgba(255,255,255,.12);border-radius:16px;max-width:440px;width:100%;'
    + 'padding:28px;position:relative;transform:translateY(12px);transition:transform .2s ease;font-family:"Outfit",sans-serif;margin:auto;}'
    + '.gl-cf-backdrop.is-open .gl-cf-modal{transform:translateY(0);}'
    + '.gl-cf-close{position:absolute;top:14px;right:14px;background:none;border:0;color:#8b8b86;cursor:pointer;font-size:18px;line-height:1;padding:6px;}'
    + '.gl-cf-close:hover{color:#fff;}'
    + '.gl-cf-title{color:#fff;font-family:"Instrument Serif",Georgia,serif;font-size:1.6rem;margin:0 0 16px;padding-right:20px;}'
    + '.gl-cf-field{margin-bottom:12px;}'
    + '.gl-cf-field label{display:block;font-size:.75rem;color:#8b8b86;margin-bottom:4px;font-family:"DM Mono",monospace;text-transform:uppercase;letter-spacing:.05em;}'
    + '.gl-cf-field input,.gl-cf-field textarea,.gl-cf-field select{width:100%;background:#0a0a0a;border:1px solid rgba(255,255,255,.15);border-radius:8px;'
    + 'color:#fff;padding:10px 12px;font-size:.9rem;font-family:inherit;resize:vertical;}'
    + '.gl-cf-field select{-webkit-appearance:none;appearance:none;}'
    + '.gl-cf-field select option{background:#111113;color:#fff;}'
    + '.gl-cf-field input:focus,.gl-cf-field textarea:focus,.gl-cf-field select:focus{outline:2px solid #34d399;outline-offset:1px;border-color:transparent;}'
    + '.gl-cf-submit{width:100%;background:#f5f2ea;color:#111;border:0;border-radius:999px;padding:12px;font-weight:600;font-size:.9rem;'
    + 'cursor:pointer;transition:transform .2s ease,opacity .2s ease;margin-top:4px;}'
    + '.gl-cf-submit:hover{transform:translateY(-1px);}'
    + '.gl-cf-submit:disabled{opacity:.6;cursor:default;transform:none;}'
    + '.gl-cf-status{font-size:.85rem;margin-top:12px;text-align:center;}'
    + '.gl-cf-status.ok{color:#34d399;}'
    + '.gl-cf-status.err{color:#f87171;}'
    + '.gl-cf-honeypot{position:absolute;left:-9999px;}';
  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  var backdrop = document.createElement('div');
  backdrop.className = 'gl-cf-backdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  backdrop.innerHTML =
    '<div class="gl-cf-modal">'
    + '<button type="button" class="gl-cf-close">&times;</button>'
    + '<h2 class="gl-cf-title"></h2>'
    + '<form novalidate>'
    + '<input type="checkbox" name="botcheck" class="gl-cf-honeypot" tabindex="-1" autocomplete="off">'
    + '<input type="hidden" name="access_key" value="' + ACCESS_KEY + '">'
    + '<input type="hidden" name="subject" class="gl-cf-subject-field">'
    + '<div class="gl-cf-fields"></div>'
    + '<button type="submit" class="gl-cf-submit"></button>'
    + '<p class="gl-cf-status" role="status" aria-live="polite"></p>'
    + '</form>'
    + '</div>';
  document.body.appendChild(backdrop);

  var titleEl = backdrop.querySelector('.gl-cf-title');
  var closeBtn = backdrop.querySelector('.gl-cf-close');
  var form = backdrop.querySelector('form');
  var subjectField = backdrop.querySelector('.gl-cf-subject-field');
  var fieldsWrap = backdrop.querySelector('.gl-cf-fields');
  var submitBtn = backdrop.querySelector('.gl-cf-submit');
  var statusEl = backdrop.querySelector('.gl-cf-status');
  var lastFocused = null;

  function fieldHTML(f, l) {
    var label = '<label>' + f.label[l] + '</label>';
    var req = f.required ? ' required' : '';
    if (f.type === 'textarea') {
      return '<div class="gl-cf-field">' + label + '<textarea name="' + f.name + '" rows="4"' + req + '></textarea></div>';
    }
    if (f.type === 'select') {
      var opts = '<option value="" disabled selected>' + STR[l].selectPlaceholder + '</option>';
      f.options.forEach(function (o) { opts += '<option value="' + o.value + '">' + o.label[l] + '</option>'; });
      return '<div class="gl-cf-field">' + label + '<select name="' + f.name + '"' + req + '>' + opts + '</select></div>';
    }
    return '<div class="gl-cf-field">' + label + '<input type="' + f.type + '" name="' + f.name + '"' + req + '></div>';
  }

  function baseFieldsHTML(l) {
    return '<div class="gl-cf-field"><label>' + STR[l].name + '</label><input type="text" name="name" required></div>'
      + '<div class="gl-cf-field"><label>' + STR[l].email + '</label><input type="email" name="email" required></div>';
  }

  function open(type, subject) {
    lastFocused = document.activeElement;
    var l = lang();
    var cfg = FORMS[type] || FORMS.generic;
    titleEl.textContent = cfg.title[l];
    closeBtn.setAttribute('aria-label', STR[l].close);
    fieldsWrap.innerHTML = baseFieldsHTML(l) + cfg.fields.map(function (f) { return fieldHTML(f, l); }).join('');
    submitBtn.disabled = false;
    submitBtn.textContent = STR[l].send;
    subjectField.value = subject || cfg.title[l];
    statusEl.textContent = '';
    statusEl.className = 'gl-cf-status';
    form.reset();
    backdrop.classList.add('is-open');
    var firstInput = fieldsWrap.querySelector('input,select,textarea');
    if (firstInput) firstInput.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function close() {
    backdrop.classList.remove('is-open');
    document.removeEventListener('keydown', onKeydown);
    if (lastFocused) lastFocused.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') close();
  }

  backdrop.addEventListener('mousedown', function (e) {
    if (e.target === backdrop) close();
  });
  closeBtn.addEventListener('click', close);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var l = lang();
    submitBtn.disabled = true;
    submitBtn.textContent = STR[l].sending;
    statusEl.textContent = '';
    statusEl.className = 'gl-cf-status';

    var payload = {
      access_key: ACCESS_KEY,
      subject: subjectField.value,
      botcheck: form.botcheck.checked
    };
    new FormData(form).forEach(function (value, key) {
      if (key === 'access_key' || key === 'subject' || key === 'botcheck') return;
      payload[key] = value;
    });

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        submitBtn.disabled = false;
        submitBtn.textContent = STR[l].send;
        if (data && data.success) {
          statusEl.textContent = STR[l].success;
          statusEl.className = 'gl-cf-status ok';
          form.reset();
        } else {
          statusEl.textContent = STR[l].error;
          statusEl.className = 'gl-cf-status err';
        }
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = STR[l].send;
        statusEl.textContent = STR[l].error;
        statusEl.className = 'gl-cf-status err';
      });
  });

  document.querySelectorAll('[data-contact-open]').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      open(trigger.getAttribute('data-contact-form') || 'generic', trigger.getAttribute('data-contact-subject'));
    });
  });
})();
