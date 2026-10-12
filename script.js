(function () {
  'use strict';

  /* =====================================================================
     CONFIG — THE ONLY PLACE YOU NEED TO EDIT FOR LINKS AND MEDIA
     Leave a value as "" (empty quotes) to hide or skip it.
     ===================================================================== */
  var CONFIG = {

    /* REPLACE LOGO: file name of your logo (keep it in the same folder). */
    logo: "logo.png",

    /* REPLACE EMAIL: your email address, e.g. "hello@example.com" */
    email: "",

    /* REPLACE INSTAGRAM URL: e.g. "https://www.instagram.com/yourname"
       (typing just "yourname" also works). */
    instagram: "",

    /* REPLACE YOUTUBE URL: e.g. "https://www.youtube.com/@yourchannel" */
    youtube: "",

    /* REPLACE WHATSAPP NUMBER: digits only, with country code and no + or spaces.
       Example: "919876543210". */
    whatsapp: "",

    /* HERO BACKGROUND (optional).
       heroVideo: a direct video file (e.g. "media/hero.mp4" or an https .mp4 link).
       heroPoster: an image shown behind the text (or while the video loads).
       If both are empty, a dark rose-pink design is used. */
    heroVideo: "",
    heroPoster: "",

    /* SHOWREEL (optional but recommended).
       showreelUrl: YouTube, Vimeo, Instagram reel/post or direct .mp4 link.
       showreelThumb: thumbnail image (optional). */
    showreelUrl: "",
    showreelThumb: "",

    /* ABOUT PHOTO (optional): e.g. "media/me.jpg" */
    aboutPhoto: "",

    /* CLIENT REVIEWS — add ONLY genuine reviews you have permission to show.
       Example:
       { quote: "Fast, creative and easy to work with.", name: "Client name", project: "Wedding highlights" }
       Leave the list empty to show the "Client feedback will appear here" message. */
    testimonials: [],

    /* OPTIONAL EMAILJS (sends the form straight to your inbox, no email app needed).
       1) Make a free account at emailjs.com  2) add an Email Service  3) create a template
          that uses: {{from_name}}, {{reply_to}}, {{platform}}, {{video_type}}, {{budget}},
          {{deadline}}, {{message}}
       4) paste your Public Key, Service ID and Template ID below, set enabled to true.
       The Public Key is designed to be public. NEVER paste a Private Key here. */
    emailjs: {
      enabled: false,
      publicKey: "",
      serviceId: "",
      templateId: ""
    },

    /* PORTFOLIO — each object is one card.
       title:    card title
       category: filter group (cinematic, reels, youtube, travel, wedding, brand, motion, color)
       label:    small text under the title
       ratio:    card shape, e.g. "9/16" (vertical), "16/9" (wide), "1/1" (square), "4/5", "3/2", "2/1"
       image:    REPLACE PORTFOLIO IMAGE: thumbnail link or file (e.g. "media/reel1.jpg"). "" = designed placeholder
       video:    REPLACE VIDEO URL: YouTube / Vimeo / Instagram link or direct .mp4. "" = no video yet
       sample:   true shows a SAMPLE badge. Set to false once it is a real project of yours.      */
    portfolio: [
      { title: "Cinematic Edit",       category: "cinematic", label: "CINEMATIC EDITS",            ratio: "2/1" , image: "", video: "", sample: true },
      { title: "Instagram Reel",       category: "reels",     label: "INSTAGRAM REELS",            ratio: "9/16", image: "", video: "", sample: true },
      { title: "YouTube Video",        category: "youtube",   label: "YOUTUBE VIDEOS",             ratio: "16/9", image: "", video: "", sample: true },
      { title: "Travel Film",          category: "travel",    label: "TRAVEL FILMS",               ratio: "3/2",  image: "", video: "", sample: true },
      { title: "Wedding Highlights",   category: "wedding",   label: "WEDDING HIGHLIGHTS",         ratio: "4/5",  image: "", video: "", sample: true },
      { title: "Brand Promo",          category: "brand",     label: "PROMOTIONAL & BRAND VIDEOS", ratio: "1/1",  image: "", video: "", sample: true },
      { title: "Motion Graphics",      category: "motion",    label: "MOTION GRAPHICS",            ratio: "16/9", image: "", video: "", sample: true },
      { title: "Color Grading",        category: "color",     label: "COLOR GRADING",              ratio: "4/5",  image: "", video: "", sample: true }
    ]
  };
  /* ===================== END OF CONFIG ===================== */


  /* ---------- helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  /* ---------- bootstrap: mark JS as on, skip the intro if already seen or motion is reduced ---------- */
  root.classList.add('js');
  try { if (reduceMotion || sessionStorage.getItem('vk_intro')) root.classList.remove('intro-active'); } catch (e) {}

  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function socialUrl(kind, v) {
    v = (v || '').trim();
    if (!v) return '';
    if (/^https?:\/\//i.test(v)) return v;
    v = v.replace(/^@/, '');
    if (kind === 'instagram') return 'https://www.instagram.com/' + encodeURIComponent(v);
    if (kind === 'youtube') return 'https://www.youtube.com/@' + encodeURIComponent(v);
    if (kind === 'whatsapp') { var d = v.replace(/\D/g, ''); return d ? 'https://wa.me/' + d : ''; }
    return '';
  }

  var EMAIL = isEmail((CONFIG.email || '').trim()) ? CONFIG.email.trim() : '';
  var WHATSAPP_DIGITS = (CONFIG.whatsapp || '').replace(/\D/g, '');
  var EMAILJS_READY = !!(CONFIG.emailjs && CONFIG.emailjs.enabled && CONFIG.emailjs.publicKey && CONFIG.emailjs.serviceId && CONFIG.emailjs.templateId);

  var ICONS = {
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="M10 9l5 3-5 3z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.2-4.1A8 8 0 1 1 8.2 19z"/><path d="M9 9c.2 2.6 2.4 5 5.2 5.8l1.2-1.3-1.9-1-.8.6c-.9-.4-1.7-1.2-2.1-2.1l.6-.8-1-1.9z"/></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>'
  };

  /* ---------- logo (all images that use the logo) ---------- */
  (function logos() {
    function fallback(img) {
      if (img.dataset.failed) return;
      img.dataset.failed = '1';
      var s = document.createElement('span');
      s.textContent = 'VAKKOZ EDITOR';
      s.setAttribute('role', 'img');
      s.setAttribute('aria-label', 'VAKKOZ EDITOR');
      s.style.cssText = 'display:inline-block;color:#F29AAE;letter-spacing:.3em;font-size:.8rem;text-align:center';
      if (img.parentNode) img.parentNode.replaceChild(s, img);
    }
    $$('img[data-logo]').forEach(function (img) {
      if (CONFIG.logo) img.src = CONFIG.logo;
      img.addEventListener('error', function () { fallback(img); });
      if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) {
        /* already failed before the listener was attached */
        var probe = new Image();
        probe.onerror = function () { fallback(img); };
        probe.src = img.src;
      }
    });
  })();

  /* ---------- footer year ---------- */
  $('#year').textContent = new Date().getFullYear();

  /* ---------- contact + social links (unconfigured ones are hidden) ---------- */
  var LINKS = [];
  if (EMAIL) LINKS.push({ key: 'email', label: 'Email', text: EMAIL, href: 'mailto:' + EMAIL });
  var ig = socialUrl('instagram', CONFIG.instagram); if (ig) LINKS.push({ key: 'instagram', label: 'Instagram', text: 'Instagram', href: ig });
  var yt = socialUrl('youtube', CONFIG.youtube); if (yt) LINKS.push({ key: 'youtube', label: 'YouTube', text: 'YouTube', href: yt });
  var wa = socialUrl('whatsapp', CONFIG.whatsapp); if (wa) LINKS.push({ key: 'whatsapp', label: 'WhatsApp', text: 'WhatsApp', href: wa });

  function renderLinks(container, wrap, withText) {
    if (!container) return;
    container.textContent = '';
    if (!LINKS.length) { if (wrap) wrap.hidden = true; return; }
    LINKS.forEach(function (l) {
      var a = document.createElement('a');
      a.href = l.href;
      if (l.key !== 'email') { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      if (withText) {
        a.className = 'contact-link';
        var ico = document.createElement('span'); ico.className = 'ico ico-wrap'; ico.innerHTML = ICONS[l.key];
        var t = document.createElement('span'); t.textContent = l.text;
        a.appendChild(ico); a.appendChild(t);
      } else {
        a.className = 'social-btn ico';
        a.setAttribute('aria-label', l.label);
        a.innerHTML = ICONS[l.key];
      }
      container.appendChild(a);
    });
    if (wrap) wrap.hidden = false;
  }
  renderLinks($('#contactLinks'), $('#directWrap'), true);
  renderLinks($('#footerSocial'), $('#footerSocialWrap'), false);

  /* ---------- hero media ---------- */
  (function heroMedia() {
    var wrap = $('#heroMedia');
    if (CONFIG.heroPoster) {
      var img = new Image();
      img.alt = ''; img.decoding = 'async'; img.src = CONFIG.heroPoster;
      img.onerror = function () { img.remove(); };
      wrap.appendChild(img);
    }
    if (CONFIG.heroVideo && !reduceMotion) {
      var v = document.createElement('video');
      v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true; v.autoplay = true;
      v.setAttribute('playsinline', ''); v.setAttribute('muted', ''); v.setAttribute('aria-hidden', 'true');
      v.preload = 'metadata';
      if (CONFIG.heroPoster) v.poster = CONFIG.heroPoster;
      v.addEventListener('error', function () { v.remove(); });
      v.addEventListener('canplay', function () { v.classList.add('ready'); });
      v.src = CONFIG.heroVideo;
      wrap.appendChild(v);
      var p = v.play(); if (p && p.catch) p.catch(function () {});
    }
  })();

  /* ---------- navigation ---------- */
  var toggle = $('#navToggle'), nav = $('#primary-nav');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setMenu(!document.body.classList.contains('menu-open')); });
  $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  window.addEventListener('resize', function () { if (window.innerWidth >= 900) setMenu(false); });

  if ('IntersectionObserver' in window) {
    var navLinks = $$('.nav-list a');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          if (a.dataset.nav === en.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['home', 'portfolio', 'services', 'about', 'contact'].forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- modal (video player + lightbox) ---------- */
  var modal = $('#modal'), modalBox = $('#modalBox'), stage = $('#modalStage'), modalTitle = $('#modalTitle'), modalNote = $('#modalNote');
  var lastFocus = null, closeTimer = null;

  function ratioNum(r) {
    var m = String(r || '16/9').split('/');
    var n = parseFloat(m[0]) / parseFloat(m[1] || 1);
    return (isFinite(n) && n > 0) ? n : 16 / 9;
  }

  function toEmbed(url) {
    try {
      var u = new URL(url, window.location.href);
      var h = u.hostname.replace(/^www\./, '');
      var id = '';
      if (h === 'youtu.be') id = u.pathname.slice(1).split('/')[0];
      else if (/(^|\.)youtube\.com$/.test(h) || /(^|\.)youtube-nocookie\.com$/.test(h)) {
        var parts = u.pathname.split('/').filter(Boolean);
        if (parts[0] === 'embed' || parts[0] === 'shorts' || parts[0] === 'live') id = parts[1] || '';
        else id = u.searchParams.get('v') || '';
      }
      if (id) return { type: 'iframe', src: 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0&playsinline=1' };
      if (/(^|\.)vimeo\.com$/.test(h)) {
        var vp = u.pathname.split('/').filter(Boolean);
        var vid = '';
        for (var i = vp.length - 1; i >= 0; i--) { if (/^\d+$/.test(vp[i])) { vid = vp[i]; break; } }
        if (vid) return { type: 'iframe', src: 'https://player.vimeo.com/video/' + vid + '?autoplay=1' };
      }
      if (/(^|\.)instagram\.com$/.test(h)) {
        var ip = u.pathname.split('/').filter(Boolean);
        var kind = ip[0] === 'reels' ? 'reel' : ip[0];
        if ((kind === 'reel' || kind === 'p' || kind === 'tv') && ip[1]) return { type: 'iframe', src: 'https://www.instagram.com/' + kind + '/' + encodeURIComponent(ip[1]) + '/embed' };
      }
      if (/\.(mp4|webm|ogg|mov|m4v)$/i.test(u.pathname)) return { type: 'video', src: u.href };
      return { type: 'link', src: u.href };
    } catch (e) { return null; }
  }

  function placeholder(title, text, imgSrc, link) {
    var ph = document.createElement('div'); ph.className = 'stage-ph';
    if (imgSrc) {
      var im = new Image(); im.alt = ''; im.src = imgSrc; im.onerror = function () { im.remove(); };
      ph.appendChild(im);
    }
    var h = document.createElement('h4'); h.textContent = title;
    var p = document.createElement('p'); p.innerHTML = text;
    ph.appendChild(h); ph.appendChild(p);
    if (link) {
      var a = document.createElement('a'); a.className = 'btn btn-primary'; a.href = link; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = 'Open video';
      ph.appendChild(a);
    }
    return ph;
  }

  function openModal(o) {
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    lastFocus = document.activeElement;
    modalTitle.textContent = o.title;
    stage.textContent = '';
    modalNote.textContent = o.note || '';
    modalBox.style.setProperty('--rn', ratioNum(o.ratio));

    var embed = o.url ? toEmbed(o.url) : null;
    if (embed && embed.type === 'iframe') {
      var f = document.createElement('iframe');
      f.src = embed.src; f.title = o.title;
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.setAttribute('allowfullscreen', '');
      f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      stage.appendChild(f);
    } else if (embed && embed.type === 'video') {
      var v = document.createElement('video');
      v.controls = true; v.autoplay = true; v.playsInline = true; v.setAttribute('playsinline', '');
      if (o.thumb) v.poster = o.thumb;
      v.src = embed.src;
      v.addEventListener('error', function () {
        stage.textContent = '';
        stage.appendChild(placeholder('Video could not load', 'Check that the video link or file name is correct and that the file is uploaded next to <code>index.html</code>.', o.thumb));
      });
      stage.appendChild(v);
    } else if (embed && embed.type === 'link') {
      stage.appendChild(placeholder('Open this video', 'This link cannot be played inside the page, so it opens in a new tab.', o.thumb, embed.src));
    } else {
      stage.appendChild(placeholder(o.emptyTitle || 'No video added yet', o.emptyText || 'Add a video link for this project in the CONFIG section of the script.', o.thumb));
    }

    modal.hidden = false;
    document.body.classList.add('modal-open');
    void modal.offsetWidth;
    modal.classList.add('open');
    $('#modalClose').focus();
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    stage.textContent = '';   /* removing the player stops playback */
    closeTimer = setTimeout(function () { modal.hidden = true; closeTimer = null; }, reduceMotion ? 0 : 260);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  $('#modalClose').addEventListener('click', closeModal);
  $('[data-close]', modal).addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key !== 'Tab') return;
    var f = $$('a[href],button:not([disabled]),iframe,video[controls]', modal).filter(function (x) { return x.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (!modal.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------- showreel ---------- */
  (function showreel() {
    var btn = $('#reelBtn');
    var has = !!(CONFIG.showreelUrl && CONFIG.showreelUrl.trim());
    if (!has) { $('#reelBadge').hidden = false; $('#reelNote').hidden = false; btn.setAttribute('aria-label', 'Showreel placeholder: no video added yet'); }
    if (CONFIG.showreelThumb) {
      var im = new Image(); im.className = 'reel-img'; im.alt = ''; im.decoding = 'async'; im.loading = 'lazy'; im.src = CONFIG.showreelThumb;
      im.onerror = function () { im.remove(); };
      btn.insertBefore(im, btn.firstChild);
    }
    btn.addEventListener('click', function () {
      openModal({
        title: 'Showreel',
        url: has ? CONFIG.showreelUrl.trim() : '',
        ratio: '16/9',
        thumb: CONFIG.showreelThumb,
        emptyTitle: 'Showreel placeholder',
        emptyText: 'No showreel video has been added yet. To add yours, paste a YouTube, Vimeo or .mp4 link into <code>showreelUrl</code> in the CONFIG section of the script.'
      });
    });
  })();

  /* ---------- portfolio ---------- */
  (function portfolio() {
    var FILTERS = [['all', 'All'], ['cinematic', 'Cinematic'], ['reels', 'Reels'], ['youtube', 'YouTube'], ['travel', 'Travel'], ['wedding', 'Wedding'], ['brand', 'Brand'], ['motion', 'Motion'], ['color', 'Color Grading']];
    var ART = [
      ['22%', '30%', '82%', '74%'], ['70%', '26%', '20%', '78%'], ['40%', '60%', '85%', '20%'], ['18%', '70%', '78%', '30%'],
      ['62%', '38%', '24%', '80%'], ['30%', '24%', '74%', '72%'], ['78%', '60%', '26%', '24%'], ['50%', '28%', '30%', '82%']
    ];
    var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4l14 8-14 8z"/></svg>';
    var items = CONFIG.portfolio || [];
    var grid = $('#grid'), filtersEl = $('#filters'), status = $('#filterStatus');
    var anySample = false;

    items.forEach(function (it, i) {
      var sample = it.sample !== false;
      if (sample) anySample = true;
      var hasVideo = !!(it.video && String(it.video).trim());
      var art = ART[i % ART.length];

      var card = document.createElement('article');
      card.className = 'card';
      card.dataset.cat = it.category || 'all';

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'card-media';
      btn.style.setProperty('--ratio', it.ratio || '16/9');
      btn.setAttribute('aria-label', (hasVideo ? 'Play: ' : 'Open: ') + it.title + (sample ? ' (sample project)' : '') + (hasVideo ? '' : ', no video added yet'));

      var a = document.createElement('div'); a.className = 'art'; a.setAttribute('aria-hidden', 'true');
      a.style.setProperty('--ax', art[0]); a.style.setProperty('--ay', art[1]); a.style.setProperty('--bx', art[2]); a.style.setProperty('--by', art[3]);
      btn.appendChild(a);

      if (it.image) {
        var im = new Image(); im.alt = ''; im.loading = 'lazy'; im.decoding = 'async'; im.src = it.image;
        im.onerror = function () { im.remove(); };
        btn.appendChild(im);
      }

      var shade = document.createElement('span'); shade.className = 'card-shade'; btn.appendChild(shade);
      if (sample) { var b1 = document.createElement('span'); b1.className = 'badge sample'; b1.textContent = 'SAMPLE'; btn.appendChild(b1); }
      var b2 = document.createElement('span'); b2.className = 'badge fmt'; b2.textContent = String(it.ratio || '16/9').replace('/', ':'); btn.appendChild(b2);
      var pl = document.createElement('span'); pl.className = 'card-play'; pl.innerHTML = PLAY; btn.appendChild(pl);

      var info = document.createElement('span'); info.className = 'card-info';
      var h = document.createElement('h3'); h.textContent = it.title;
      var p = document.createElement('p'); p.textContent = it.label || '';
      info.appendChild(h); info.appendChild(p); btn.appendChild(info);

      btn.addEventListener('click', function () {
        openModal({
          title: it.title + (sample ? ' (sample)' : ''),
          url: hasVideo ? String(it.video).trim() : '',
          ratio: it.ratio,
          thumb: it.image,
          emptyTitle: 'No video added yet',
          emptyText: 'This is a ' + (sample ? 'sample project, not real client work. ' : 'project. ') + 'To add the video, paste its link into <code>video</code> for this card in <code>CONFIG.portfolio</code>.',
          note: sample ? 'Sample project shown for demonstration.' : ''
        });
      });

      card.appendChild(btn);
      grid.appendChild(card);
    });

    if (anySample) $('#sampleNote').hidden = false;

    var cards = $$('.card', grid);
    FILTERS.forEach(function (f, i) {
      var c = document.createElement('button');
      c.type = 'button'; c.className = 'chip'; c.dataset.filter = f[0]; c.textContent = f[1];
      c.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      c.addEventListener('click', function () { applyFilter(f[0], f[1]); });
      filtersEl.appendChild(c);
    });

    function applyFilter(key, name) {
      $$('.chip', filtersEl).forEach(function (c) { c.setAttribute('aria-pressed', c.dataset.filter === key ? 'true' : 'false'); });
      var shown = 0;
      cards.forEach(function (card) {
        var show = key === 'all' || card.dataset.cat === key;
        card.hidden = !show;
        card.classList.remove('pop');
        if (show) { shown++; void card.offsetWidth; if (!reduceMotion) card.classList.add('pop'); }
      });
      status.textContent = 'Showing ' + shown + (shown === 1 ? ' project' : ' projects') + ' in ' + name;
    }
  })();

  /* ---------- testimonials ---------- */
  (function reviews() {
    var list = CONFIG.testimonials || [];
    var box = $('#reviewList'), empty = $('#reviewEmpty');
    if (!list.length) return;
    empty.hidden = true;
    list.forEach(function (t) {
      if (!t || !t.quote) return;
      var fig = document.createElement('figure'); fig.className = 'review reveal';
      var bq = document.createElement('blockquote'); bq.textContent = '“' + t.quote + '”';
      var cap = document.createElement('figcaption');
      var n = document.createElement('b'); n.textContent = t.name || 'Client';
      cap.appendChild(n);
      if (t.project) cap.appendChild(document.createTextNode(t.project));
      fig.appendChild(bq); fig.appendChild(cap); box.appendChild(fig);
    });
  })();

  /* ---------- about photo ---------- */
  (function aboutPhoto() {
    if (!CONFIG.aboutPhoto) return;
    var box = $('#portrait');
    var im = new Image(); im.className = 'photo'; im.alt = 'Portrait of the editor behind VAKKOZ EDITOR'; im.decoding = 'async'; im.loading = 'lazy';
    im.onload = function () { box.style.borderStyle = 'solid'; var inner = box.firstElementChild; if (inner) inner.hidden = true; };
    im.onerror = function () { im.remove(); };
    im.src = CONFIG.aboutPhoto;
    box.appendChild(im);
  })();

  /* ---------- enquiry form ---------- */
  (function enquiry() {
    var form = $('#enquiryForm'), statusEl = $('#formStatus'), note = $('#sendNote'), sendBtn = $('#sendBtn'), waBtn = $('#waBtn');
    var F = { name: $('#f-name'), email: $('#f-email'), platform: $('#f-platform'), type: $('#f-type'), budget: $('#f-budget'), deadline: $('#f-deadline'), details: $('#f-details'), company: $('#f-company') };
    var ERR = { name: $('#e-name'), email: $('#e-email'), platform: $('#e-platform'), type: $('#e-type'), deadline: $('#e-deadline'), details: $('#e-details') };

    /* deadline cannot be in the past */
    var t = new Date();
    var today = t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
    F.deadline.min = today;

    /* explain exactly how sending works */
    if (EMAILJS_READY) note.textContent = 'Your enquiry is sent straight to the editor’s inbox. You will see a confirmation here once it has been sent.';
    else if (EMAIL) note.textContent = 'This form opens your email app with the enquiry already written. Press Send in your email app to finish. Nothing is sent from this page itself.';
    else note.textContent = 'Sending is not set up yet. The site owner needs to add an email address (or EmailJS keys) in the CONFIG section.';
    if (WHATSAPP_DIGITS) waBtn.hidden = false;

    var RULES = {
      name: function (v) { return v.trim().length < 2 ? 'Please enter your name.' : ''; },
      email: function (v) { return !v.trim() ? 'Please enter your email address.' : (!isEmail(v.trim()) ? 'That email address does not look right. Example: name@example.com' : ''); },
      platform: function (v) { return v ? '' : 'Please choose a platform.'; },
      type: function (v) { return v ? '' : 'Please choose a video type.'; },
      deadline: function (v) { return (v && v < today) ? 'The deadline cannot be in the past.' : ''; },
      details: function (v) { return v.trim().length < 10 ? 'Please add a few details about your project (at least 10 characters).' : ''; }
    };

    function check(key) {
      var msg = RULES[key](F[key].value);
      ERR[key].textContent = msg;
      if (msg) F[key].setAttribute('aria-invalid', 'true'); else F[key].removeAttribute('aria-invalid');
      return !msg;
    }
    Object.keys(RULES).forEach(function (k) {
      F[k].addEventListener('input', function () { if (F[k].getAttribute('aria-invalid')) check(k); });
      F[k].addEventListener('change', function () { if (F[k].getAttribute('aria-invalid')) check(k); });
      F[k].addEventListener('blur', function () { if (F[k].value) check(k); });
    });

    function validateAll() {
      var firstBad = null;
      Object.keys(RULES).forEach(function (k) { if (!check(k) && !firstBad) firstBad = F[k]; });
      return firstBad;
    }

    function show(type, text, linkEl) {
      statusEl.className = 'form-status ' + (type === 'ok' ? 'ok' : 'bad');
      statusEl.textContent = text;
      if (linkEl) { statusEl.appendChild(document.createTextNode(' ')); statusEl.appendChild(linkEl); }
    }

    function data() {
      return {
        name: F.name.value.trim(), email: F.email.value.trim(), platform: F.platform.value, type: F.type.value,
        budget: F.budget.value || 'Not specified', deadline: F.deadline.value || 'Not specified', details: F.details.value.trim()
      };
    }
    function bodyText(d) {
      return 'New project enquiry\n\nName: ' + d.name + '\nEmail: ' + d.email + '\nPlatform: ' + d.platform + '\nVideo type: ' + d.type +
        '\nBudget: ' + d.budget + '\nDeadline: ' + d.deadline + '\n\nProject details:\n' + d.details;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      statusEl.className = 'form-status'; statusEl.textContent = '';
      var bad = validateAll();
      if (bad) { show('bad', 'Please fix the highlighted fields and send again.'); bad.focus(); return; }
      if (F.company.value) { return; }   /* honeypot: bots fill this in */
      var d = data();

      if (EMAILJS_READY) {
        sendBtn.disabled = true; sendBtn.textContent = 'Sending…';
        fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: CONFIG.emailjs.serviceId,
            template_id: CONFIG.emailjs.templateId,
            user_id: CONFIG.emailjs.publicKey,
            template_params: { from_name: d.name, reply_to: d.email, platform: d.platform, video_type: d.type, budget: d.budget, deadline: d.deadline, message: d.details }
          })
        }).then(function (r) {
          if (!r.ok) throw new Error('send failed');
          form.reset();
          show('ok', 'Thank you. Your enquiry has been sent. You will get a reply at the email address you entered.');
        }).catch(function () {
          var a = null;
          if (EMAIL) { a = document.createElement('a'); a.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Project enquiry from ' + d.name) + '&body=' + encodeURIComponent(bodyText(d)); a.textContent = 'Send by email instead'; }
          show('bad', 'Sorry, the enquiry could not be sent. Check your connection and try again.', a);
        }).then(function () { sendBtn.disabled = false; sendBtn.textContent = 'Send enquiry'; });
        return;
      }

      if (EMAIL) {
        var href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Project enquiry from ' + d.name) + '&body=' + encodeURIComponent(bodyText(d));
        var link = document.createElement('a'); link.href = href; link.textContent = 'Open email again';
        show('ok', 'Your email app should open with the enquiry ready. Press Send there to finish. Nothing has been sent yet.', link);
        window.location.href = href;
        return;
      }

      show('bad', 'This form is not connected yet, so nothing was sent. The site owner needs to add an email address in the CONFIG section. Please use another contact option if one is shown.');
    });

    waBtn.addEventListener('click', function () {
      statusEl.className = 'form-status'; statusEl.textContent = '';
      var bad = validateAll();
      if (bad) { show('bad', 'Please fix the highlighted fields first.'); bad.focus(); return; }
      var url = 'https://wa.me/' + WHATSAPP_DIGITS + '?text=' + encodeURIComponent(bodyText(data()));
      window.open(url, '_blank', 'noopener');
      show('ok', 'WhatsApp should open with your message ready. Press Send there to finish. Nothing has been sent yet.');
    });
  })();

  /* ---------- reveal on scroll ---------- */
  (function reveal() {
    var els = $$('.reveal');
    if (!('IntersectionObserver' in window) || reduceMotion) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
    /* safety: never leave content hidden */
    setTimeout(function () { els.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top < window.innerHeight) el.classList.add('in'); }); }, 1500);
  })();

  /* ---------- scroll effects (header, progress, parallax, timeline) ---------- */
  (function scrollFx() {
    var header = $('#siteHeader'), bar = $('#progress'), heroBg = $('#heroBg'), medal = $('#heroMedal'), hero = $('#home'), tl = $('#timeline');
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      var vh = window.innerHeight;
      header.classList.toggle('scrolled', y > 20);
      var max = document.documentElement.scrollHeight - vh;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0).toFixed(4) + ')';
      if (!reduceMotion) {
        var hh = hero.offsetHeight;
        if (y < hh) {
          heroBg.style.transform = 'translate3d(0,' + (y * 0.22).toFixed(1) + 'px,0)';
          medal.style.transform = 'translate3d(0,' + (y * -0.07).toFixed(1) + 'px,0)';
        }
      }
      if (tl) {
        var r = tl.getBoundingClientRect();
        var span = window.innerWidth >= 900 ? Math.max(r.height, 320) : Math.max(r.height, 1);
        var p = Math.max(0, Math.min(1, (vh * 0.78 - r.top) / span));
        tl.style.setProperty('--p', p.toFixed(3));
      }
    }
    function onScroll() { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  })();

  /* ---------- intro (plays media/intro.mp4 once per visit) ---------- */
  (function intro() {
    if (!root.classList.contains('intro-active')) return;
    var video = $('#introVideo'), skip = $('#introSkip'), sound = $('#introSound');
    var guarded = [$('header'), $('main'), $('footer')];
    guarded.forEach(function (g) { if (g) g.inert = true; });

    var done = false;
    function end() {
      if (done) return; done = true;
      root.classList.add('intro-leaving');
      guarded.forEach(function (g) { if (g) g.inert = false; });
      try { sessionStorage.setItem('vk_intro', '1'); } catch (e) {}
      setTimeout(function () { try { video.pause(); } catch (e) {} root.classList.remove('intro-active', 'intro-leaving'); }, 900);
    }

    skip.addEventListener('click', end);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') end(); });
    video.addEventListener('ended', end);
    video.addEventListener('error', end);   /* video missing or broken: go straight to the site */

    sound.addEventListener('click', function () {
      video.muted = !video.muted;
      sound.textContent = video.muted ? 'Sound off' : 'Sound on';
      sound.setAttribute('aria-label', video.muted ? 'Turn sound on' : 'Turn sound off');
      if (video.paused && !done) { var q = video.play(); if (q && q.catch) q.catch(function () {}); }
    });

    var p = video.play();
    if (p && p.catch) p.catch(end);          /* autoplay blocked: do not trap the visitor */
    setTimeout(function () { if (video.currentTime === 0) end(); }, 5000);   /* never started */
    setTimeout(end, 13000);                  /* hard limit */
    skip.focus();
  })();

  /* ---------- premium cursor (desktop with a mouse only) ---------- */
  (function cursor() {
    if (reduceMotion || !window.matchMedia || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var c = document.createElement('div'); c.className = 'cursor'; c.setAttribute('aria-hidden', 'true');
    document.body.appendChild(c);
    var x = 0, y = 0, cx = 0, cy = 0, raf = null, first = true;
    function loop() {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      c.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
      if (Math.abs(x - cx) > 0.1 || Math.abs(y - cy) > 0.1) raf = requestAnimationFrame(loop); else raf = null;
    }
    window.addEventListener('mousemove', function (e) {
      x = e.clientX; y = e.clientY;
      if (first) { cx = x; cy = y; first = false; }
      c.classList.add('active');
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    document.addEventListener('mouseleave', function () { c.classList.remove('active'); });
    document.addEventListener('mouseover', function (e) {
      c.classList.toggle('hover', !!(e.target.closest && e.target.closest('a,button,input,select,textarea,label')));
    });
  })();

})();
