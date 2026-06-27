/* ============================================================
   mobile-nav.js  — place in your /js/ folder
   <script src="js/mobile-nav.js"></script>  before </body>
   ============================================================ */

(function () {

  function isMobile() { return window.innerWidth <= 768; }

  /* ── 1. INJECT BOTTOM NAV ── */
  function injectBottomNav() {
    if (document.getElementById('mobileBottomNav')) return;
    const nav = document.createElement('nav');
    nav.className = 'mobile-bottom-nav';
    nav.id = 'mobileBottomNav';
    nav.innerHTML = `
      <button class="mobile-nav-item active" onclick="mobileScrollTo('hero',this)">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        Home
      </button>
      <button class="mobile-nav-item" onclick="mobileScrollTo('experience',this)">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        Work
      </button>
      <button class="mobile-nav-item" onclick="mobileScrollTo('projects',this)">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
        Projects
      </button>
      <button class="mobile-nav-item" onclick="mobileScrollTo('techstack',this)">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
        Skills
      </button>
      <button class="mobile-nav-item" onclick="mobileScrollTo('contact',this)">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        Contact
      </button>
    `;
    document.body.appendChild(nav);
  }

  window.mobileScrollTo = function(id, btn) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelectorAll('.mobile-nav-item').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
  };

  /* ── 2. INJECT LOGO INTO TOPBAR (LEFT SIDE) ──
     NOTE: now uses a CSS class instead of forcing inline styles,
     so there's nothing fragile to "undo" on desktop. ── */
  function injectTopbarLogo() {
    const topbar = document.querySelector('.topbar');
    if (!topbar || document.querySelector('.mobile-header-left')) return;

    topbar.classList.add('mobile-topbar-active');

    const logo = document.createElement('div');
    logo.className = 'mobile-header-left';
    logo.innerHTML = `
      <img src="images/dahn.jpg" alt="Dahn Reymart" class="mobile-header-badge">
      <div>
        <div class="mobile-header-name">Dahn Reymart</div>
        <div class="mobile-header-sub">D. Capiong</div>
      </div>
    `;

    const toggle = topbar.querySelector('.dark-toggle');
    if (toggle) toggle.classList.add('mobile-toggle-active');

    topbar.insertBefore(logo, topbar.firstChild);
  }

  /* ── 3. PROFILE PHOTO LIGHTBOX ── */
  function initProfilePhotoLightbox() {
    if (document.getElementById('profilePhotoLightbox')) return;

    const overlay = document.createElement('div');
    overlay.className = 'profile-photo-lightbox';
    overlay.id = 'profilePhotoLightbox';
    overlay.innerHTML = `
      <button class="profile-photo-lightbox-close" onclick="closeProfilePhoto()">✕</button>
      <img src="images/dahn.jpg" alt="Dahn Reymart">
    `;
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeProfilePhoto();
    });
    document.body.appendChild(overlay);

    const ring = document.querySelector('.profile-img-ring');
    if (ring) {
      ring.style.cursor = 'pointer';
      ring.setAttribute('title', 'Tap to view photo');
      ring.addEventListener('click', function() {
        document.getElementById('profilePhotoLightbox').classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    }
  }

  window.closeProfilePhoto = function() {
    const lb = document.getElementById('profilePhotoLightbox');
    if (lb) lb.classList.remove('open');
    document.body.style.overflow = '';
  };

  /* ── 4. COLLAPSIBLE CARDS ── */
  function initCollapsibleCards() {
    document.querySelectorAll('.card').forEach(function(card) {
      const header = card.querySelector('.card-header');
      if (!header) return;

      // Avoid re-cloning/re-binding if already initialized
      if (header.dataset.mobileBound === '1') return;

      const newHeader = header.cloneNode(true);
      newHeader.dataset.mobileBound = '1';
      header.parentNode.replaceChild(newHeader, header);

      newHeader.addEventListener('click', function() {
        card.classList.toggle('expanded');
      });
    });

    const firstRight = document.querySelector('.col-right .card');
    if (firstRight) firstRight.classList.add('expanded');
    const firstLeft = document.querySelector('.col-left .card');
    if (firstLeft) firstLeft.classList.add('expanded');
  }

  /* ── 5. SCROLL-TO-TOP BUTTON ── */
  let _scrollTopHandler = null;

  function injectScrollTop() {
    if (document.getElementById('mobileScrollTop')) return;
    const btn = document.createElement('button');
    btn.className = 'mobile-scroll-top';
    btn.id = 'mobileScrollTop';
    btn.innerHTML = `<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>`;
    btn.onclick = function() { window.scrollTo({ top: 0, behavior: 'smooth' }); };
    document.body.appendChild(btn);

    _scrollTopHandler = function() {
      btn.classList.toggle('visible', window.scrollY > 300);
    };
    window.addEventListener('scroll', _scrollTopHandler, { passive: true });
  }

  /* ── 6. ADJUST CHATBOT POSITION (CSS class instead of inline style) ── */
  function adjustChatbot() {
    const btn = document.querySelector('.chatbot-btn');
    if (btn) btn.classList.add('mobile-chatbot-active');
  }

  /* ── CLEANUP (revert mobile-only DOM/class changes when back on desktop) ── */
  function cleanupMobile() {
    const bottomNav = document.getElementById('mobileBottomNav');
    if (bottomNav) bottomNav.remove();

    const logo = document.querySelector('.mobile-header-left');
    if (logo) logo.remove();

    const topbar = document.querySelector('.topbar');
    if (topbar) topbar.classList.remove('mobile-topbar-active');

    const toggle = document.querySelector('.dark-toggle');
    if (toggle) toggle.classList.remove('mobile-toggle-active');

    const lb = document.getElementById('profilePhotoLightbox');
    if (lb) lb.remove();

    const scrollTop = document.getElementById('mobileScrollTop');
    if (scrollTop) {
      if (_scrollTopHandler) window.removeEventListener('scroll', _scrollTopHandler);
      scrollTop.remove();
      _scrollTopHandler = null;
    }

    const chatBtn = document.querySelector('.chatbot-btn');
    if (chatBtn) chatBtn.classList.remove('mobile-chatbot-active');

    // Un-expand any cards so desktop view isn't stuck "open"
    document.querySelectorAll('.card.expanded').forEach(function(card) {
      card.classList.remove('expanded');
    });

    _mobileInitialized = false;
  }

  /* ── INIT (runs on load AND every resize, debounced) ── */
  let _mobileInitialized = false;

  function init() {
    if (isMobile()) {
      if (!_mobileInitialized) {
        injectBottomNav();
        injectTopbarLogo();
        initProfilePhotoLightbox();
        initCollapsibleCards();
        injectScrollTop();
        adjustChatbot();
        _mobileInitialized = true;
      }
    } else {
      if (_mobileInitialized) {
        cleanupMobile();
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  let _resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(init, 150);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') window.closeProfilePhoto && window.closeProfilePhoto();
  });

})();