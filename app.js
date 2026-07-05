/**
 * Urban Company Clickable Prototype — app.js v7
 *
 * All micro-interactions (cart, stars, tips, slots, toggles) = pure DOM
 * mutation. navigateTo() only changes the screen, no interactive redraws.
 */

// ─── State ───────────────────────────────────────────────────────────────────
const S = {
  screen: 'SPLASH',
  user: {
    phone:             '+91 98765 43210',
    dob:               '1992-04-12',
    profile:           'adult',   // 'adult' | 'minor'
    consentPhotos:     false,
    consentMarketing:  false,
    parentVerified:    false,
    parentPhone:       '',
  },
  cart:          0,           // 0 | 1
  rating:        0,           // 0‥5
  tip:           0,           // 50 | 100 | 150
  slot:          'tomorrow',  // 'tomorrow' | 'dayafter'
  booking:       'none',      // 'none' | 'assigned' | 'completed'
  showDataModal: false,
};

// ─── DOM Helpers ──────────────────────────────────────────────────────────────
const $   = id  => document.getElementById(id);
const $q  = sel => document.querySelector(sel);
const $qa = sel => document.querySelectorAll(sel);

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Theme ────────────────────────────────────────────────────────────────────
function toggleTheme() {
  const b = document.body;
  if (b.classList.contains('dark-theme')) {
    b.classList.replace('dark-theme', 'light-theme');
  } else {
    b.classList.replace('light-theme', 'dark-theme');
  }
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function navigateTo(name) {
  S.screen        = name;
  S.showDataModal = false;
  const c         = $('phone-screen-container');
  if (SCREENS[name]) c.innerHTML = SCREENS[name]();
}

// ─── Reset ────────────────────────────────────────────────────────────────────
function resetPrototype() {
  Object.assign(S, {
    screen: 'SPLASH', cart: 0, rating: 0, tip: 0,
    slot: 'tomorrow', booking: 'none', showDataModal: false,
    user: { phone: '+91 98765 43210', dob: '1992-04-12', profile: 'adult',
            consentPhotos: false, consentMarketing: false,
            parentVerified: false, parentPhone: '' }
  });
  navigateTo('SPLASH');
  setTimeout(() => navigateTo('WELCOME'), 1600);
}

// ─── Shared Navbar ────────────────────────────────────────────────────────────
function navBar(active) {
  const tabs = [
    { key: 'home',    screen: 'HOME',          icon: '🏠', label: 'Services'  },
    { key: 'bookings',screen: 'BOOKINGS',       icon: '📅', label: 'Bookings'  },
    { key: 'privacy', screen: 'PRIVACY_CENTER', icon: '🔒', label: 'Privacy', alert: true },
  ];
  return `
    <div class="phone-bottom-nav">
      ${tabs.map(t => `
        <button class="bottom-nav-btn${active === t.key ? ' active' : ''}${t.alert ? ' alert-nav' : ''}"
                onclick="navigateTo('${t.screen}')">
          <span class="bottom-nav-icon">${t.icon}</span>
          <span>${t.label}</span>
        </button>`).join('')}
    </div>`;
}

// ─── SCREENS ──────────────────────────────────────────────────────────────────
const SCREENS = {

  /* ── SPLASH ─────────────────────────────────────── */
  SPLASH: () => `
    <div class="screen-wrapper splash-screen">
      <div class="brand-logo-row">
        <div class="brand-logo-box">
          <span style="font-family:'Outfit',sans-serif;font-weight:900;font-size:21px;color:var(--bg-phone);line-height:1;">UC</span>
        </div>
        <div class="brand-logo-text">
          <span class="brand-logo-text-1">Urban Company</span>
          <span class="brand-logo-text-2">Home services made easy</span>
        </div>
      </div>
      <div class="splash-loading-bar">
        <div class="splash-progress-fill"></div>
      </div>
    </div>`,

  /* ── WELCOME ─────────────────────────────────────── */
  WELCOME: () => `
    <div class="screen-wrapper splash-screen">
      <div class="brand-logo-row" onclick="resetPrototype()" style="cursor:pointer; margin-bottom:8px;">
        <div class="brand-logo-box">
          <span style="font-family:'Outfit',sans-serif;font-weight:900;font-size:21px;color:var(--bg-phone);line-height:1;">UC</span>
        </div>
        <div class="brand-logo-text">
          <span class="brand-logo-text-1">Urban Company</span>
          <span class="brand-logo-text-2">Home services made easy</span>
        </div>
      </div>

      <p class="splash-subtitle">Get professionals for AC service, cleaning, salon &amp; more — right at your door.</p>

      <div style="width:100%; text-align:left; margin-bottom:22px;">
        <div class="form-group" style="margin-bottom:7px;">
          <label>Mobile Number</label>
          <input class="input-field" value="+91 98765 43210" disabled>
        </div>
        <p style="font-size:11.5px; color:var(--txt-3); line-height:1.5; margin-top:4px;">
          By continuing, you agree to our <span style="color:var(--accent); font-weight:600;">Terms</span> and <span style="color:var(--accent); font-weight:600;">Privacy Policy</span>
        </p>
      </div>

      <button class="btn-primary" onclick="navigateTo('SIGNUP')">Continue</button>
    </div>`,

  /* ── SIGNUP ──────────────────────────────────────── */
  SIGNUP: () => `
    <div class="screen-wrapper" style="padding: 0;">
      <div style="padding: 16px 14px 14px;">
        <p style="font-size:11px; font-weight:600; color:var(--txt-3); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:5px;">Account Setup</p>
        <h2 style="font-family:'Outfit',sans-serif; font-size:22px; font-weight:800; color:var(--txt-1); letter-spacing:-0.4px; margin-bottom:2px;">Tell us about you</h2>
        <p style="font-size:13px; color:var(--txt-3);">This helps us personalise your experience.</p>
      </div>

      <div style="padding: 0 14px;">
        <div class="form-group">
          <label>Mobile Number</label>
          <input class="input-field" value="${esc(S.user.phone)}" oninput="S.user.phone=this.value">
        </div>

        <div class="form-group" style="margin-bottom:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <label style="margin-bottom:0;">Date of Birth</label>
            <span style="font-size:10px; font-weight:700; padding:2px 8px; border-radius:5px;
              background:${S.user.profile === 'minor' ? 'rgba(229,57,53,0.1)' : 'rgba(0,166,90,0.1)'};
              color:${S.user.profile === 'minor' ? 'var(--red)' : 'var(--green)'};">
              ${S.user.profile === 'minor' ? 'Minor (Under 18)' : 'Adult (18+)'}
            </span>
          </div>
          <input type="date" class="input-field" value="${S.user.dob}" onchange="onDOBChange(this.value)">
          <div class="age-demo-buttons">
            <button class="btn-age-select${S.user.profile === 'adult' ? ' active' : ''}" onclick="setProfile('adult')">👤 Priya, 34</button>
            <button class="btn-age-select${S.user.profile === 'minor' ? ' active' : ''}" onclick="setProfile('minor')">🧒 Rohan, 16</button>
          </div>
        </div>
      </div>

      <div style="padding: 0 14px 6px;">
        <p style="font-size:11px; font-weight:700; color:var(--txt-3); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:10px;">Consent Settings</p>
        <div class="consent-box">
          <div class="consent-notice">
            We only use your data to deliver services. Optional settings can be changed any time.
          </div>

          <div class="consent-item">
            <div class="consent-label-left">
              <div class="consent-title-row">
                <h5>Service Delivery</h5>
                <span class="badge-req">Required</span>
              </div>
              <div class="consent-desc">Name, address &amp; phone to book and dispatch a technician.</div>
            </div>
            <label class="switch"><input type="checkbox" checked disabled><span class="slider"></span></label>
          </div>

          <div class="consent-item">
            <div class="consent-label-left">
              <div class="consent-title-row"><h5>Photo Proof of Work</h5></div>
              <div class="consent-desc">Partner can upload one quality-check photo. Deleted in 7 days.</div>
            </div>
            <label class="switch">
              <input type="checkbox" id="su-photos" ${S.user.consentPhotos ? 'checked' : ''} onchange="toggleConsent('photos',this.checked)">
              <span class="slider"></span>
            </label>
          </div>

          <div class="consent-item">
            <div class="consent-label-left">
              <div class="consent-title-row"><h5>Personalised Offers</h5></div>
              <div class="consent-desc">Deals and reminders via SMS and notifications.</div>
            </div>
            <label class="switch">
              <input type="checkbox" id="su-mkt" ${S.user.consentMarketing ? 'checked' : ''} onchange="toggleConsent('marketing',this.checked)">
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div style="padding: 6px 14px 16px;">
        <button class="btn-primary" onclick="doSignup()">Continue →</button>
      </div>
    </div>`,

  /* ── PARENTAL GATE ───────────────────────────────── */
  PARENTAL_GATE: () => `
    <div class="screen-wrapper" style="padding:0;">
      <div style="padding:16px 14px 12px;">
        <p style="font-size:11px; font-weight:700; color:var(--red); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px;">Minor Account Detected</p>
        <h2 style="font-family:'Outfit',sans-serif; font-size:20px; font-weight:800; color:var(--txt-1); letter-spacing:-0.3px; margin-bottom:3px;">Parent Verification</h2>
        <p style="font-size:12.5px; color:var(--txt-3); line-height:1.5;">We need a parent or guardian to approve this account before booking.</p>
      </div>

      <div style="padding: 0 14px 14px;">
        <div class="pc-danger-box">
          🔒 <strong style="color:var(--txt-1);">Restricted Mode is ON.</strong> Tracking, profiling and ads are automatically blocked for this profile under DPDP Section 9.
        </div>

        <div class="form-group">
          <label>Parent's Mobile Number</label>
          <input class="input-field" placeholder="+91 enter parent's number" value="${esc(S.user.parentPhone)}" oninput="S.user.parentPhone=this.value">
        </div>

        <div class="form-group" style="margin-bottom:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <label style="margin-bottom:0;">OTP sent to parent</label>
            <span style="font-size:11px; color:var(--txt-3);">Demo OTP: <strong style="color:var(--txt-1);">5678</strong></span>
          </div>
          <input class="input-field" placeholder="Enter OTP"
            style="letter-spacing:6px; font-size:20px; font-weight:700; text-align:center;"
            oninput="if(this.value==='5678'){ S.user.parentVerified=true; verifyParent(); }">
        </div>

        <button class="btn-primary" onclick="submitParent()" ${S.user.parentVerified ? '' : 'disabled'}>
          Confirm &amp; Continue →
        </button>
      </div>
    </div>`,

  /* ── HOME ────────────────────────────────────────── */
  HOME: () => `
    <div class="screen-wrapper" style="padding:0; justify-content:space-between;">
      <div class="home-app-header">
        <div class="location-box">
          <span class="location-lbl">Delivering to</span>
          <span class="location-val">Indiranagar, Bengaluru ▾</span>
        </div>
        <div onclick="resetPrototype()" style="cursor:pointer;">
          <svg viewBox="0 0 60 60" width="34" height="34">
            <rect x="4" y="4" width="52" height="52" rx="11" fill="var(--txt-1)"/>
            <text x="30" y="39" font-family="'Outfit',sans-serif" font-weight="900" font-size="24" fill="var(--bg-phone)" text-anchor="middle">UC</text>
          </svg>
        </div>
      </div>

      <div class="scroll-container">
        <div class="home-promo-banner">
          <h3>Your Home, Our Experts</h3>
          <p>Background-verified professionals. Fixed prices. No surprises.</p>
        </div>

        <p class="cat-title">What are you looking for?</p>

        <div class="cat-grid">
          <div class="cat-card active" onclick="navigateTo('CATEGORY')">
            <span class="cat-icon">❄️</span>
            <h4>AC Service &amp; Repair</h4>
          </div>
          <div class="cat-card" onclick="showAlert()">
            <span class="cat-icon">🧹</span>
            <h4>Home Cleaning</h4>
          </div>
          <div class="cat-card" onclick="showAlert()">
            <span class="cat-icon">💆‍♀️</span>
            <h4>Salon at Home</h4>
          </div>
          <div class="cat-card" onclick="showAlert()">
            <span class="cat-icon">🔧</span>
            <h4>Appliance Repair</h4>
          </div>
        </div>

        <!-- Quick trust signals like the real app -->
        <div style="padding: 8px 0 4px; display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; align-items:center; gap:10px; padding:11px 14px; background:var(--bg-card); border-radius:10px;">
            <span style="font-size:20px;">⭐</span>
            <div>
              <p style="font-size:12.5px; font-weight:600; color:var(--txt-1); margin-bottom:1px;">4.8 average rating</p>
              <p style="font-size:11px; color:var(--txt-3);">Based on 2.8M+ customer reviews</p>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:10px; padding:11px 14px; background:var(--bg-card); border-radius:10px;">
            <span style="font-size:20px;">🛡️</span>
            <div>
              <p style="font-size:12.5px; font-weight:600; color:var(--txt-1); margin-bottom:1px;">All partners background verified</p>
              <p style="font-size:11px; color:var(--txt-3);">Police check + identity screening</p>
            </div>
          </div>
        </div>
      </div>

      ${navBar('home')}
    </div>`,

  /* ── CATEGORY ────────────────────────────────────── */
  CATEGORY: () => `
    <div class="screen-wrapper" style="padding:0; justify-content:space-between;">
      <div class="app-subpage-header">
        <button class="btn-back-circle" onclick="navigateTo('HOME')">←</button>
        <h3>AC Service &amp; Repair</h3>
      </div>

      <div class="scroll-container">
        <!-- UC-style: full-width list rows, no card boxes -->
        <div class="service-card-wrapper">
          <div class="service-left">
            <h4>Foam-jet Deep Clean Service</h4>
            <div class="stars-rating-badge">⭐ 4.76 <span>&nbsp;(2.8M)</span></div>
            <div class="service-card-price">₹499 <span style="font-size:11px; font-weight:400; color:var(--txt-3);">onwards</span></div>
            <p style="font-size:11.5px; color:var(--txt-3); margin-top:4px; line-height:1.4;">Foam cleaning + filter wash + cooling check</p>
          </div>
          <button
            id="add-btn"
            class="btn-add-item${S.cart > 0 ? ' selected' : ''}"
            onclick="toggleCart(this)">
            ${S.cart > 0 ? '✓ Added' : '+ Add'}
          </button>
        </div>

        <div class="service-card-wrapper" style="opacity:0.5;">
          <div class="service-left">
            <h4>AC Gas Refilling</h4>
            <div class="stars-rating-badge">⭐ 4.73 <span>&nbsp;(833K)</span></div>
            <div class="service-card-price">₹1,499 <span style="font-size:11px; font-weight:400; color:var(--txt-3);">onwards</span></div>
            <p style="font-size:11.5px; color:var(--txt-3); margin-top:4px; line-height:1.4;">Gas refill + leak check + performance test</p>
          </div>
          <button class="btn-add-item" style="opacity:0.5; pointer-events:none;">+ Add</button>
        </div>

        <div style="padding:10px 14px; font-size:11px; color:var(--txt-3); line-height:1.5;">
          ✔ Fixed prices &nbsp;&nbsp; ✔ Spare parts included &nbsp;&nbsp; ✔ 30-day service guarantee
        </div>
      </div>

      <!-- Floating cart — CSS-only slide, no re-render -->
      <div id="cart-bar" class="floating-cart-bar${S.cart > 0 ? ' visible' : ''}">
        <div class="cart-lbl">
          <h5>1 service · ₹499</h5>
          <p>Tap to schedule date &amp; time</p>
        </div>
        <button class="btn-next-action" onclick="navigateTo('CHECKOUT')">Schedule →</button>
      </div>

      ${navBar('home')}
    </div>`,

  /* ── CHECKOUT ────────────────────────────────────── */
  CHECKOUT: () => `
    <div class="screen-wrapper" style="padding:0; justify-content:space-between;">
      <div class="app-subpage-header">
        <button class="btn-back-circle" onclick="navigateTo('CATEGORY')">←</button>
        <h3>Schedule Service</h3>
      </div>

      <div class="scroll-container">
        <!-- Order summary row — UC style flat -->
        <div class="checkout-card">
          <h4>Your Booking</h4>
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <p style="font-size:14px; font-weight:600; color:var(--txt-1); margin-bottom:3px;">Foam-jet Deep Clean Service</p>
              <p style="font-size:11.5px; color:var(--txt-3);">1 AC unit · Labour + material</p>
            </div>
            <span style="font-family:'Outfit',sans-serif; font-size:15px; font-weight:800; color:var(--txt-1); flex-shrink:0; margin-left:10px;">₹499</span>
          </div>
        </div>

        <!-- Time slot picker -->
        <div class="checkout-card">
          <h4>When do you need it?</h4>
          <div class="slots-grid">
            <button id="slot-tmr" class="btn-slot-card${S.slot === 'tomorrow' ? ' active' : ''}" onclick="pickSlot('tomorrow', this)">
              <strong>Tomorrow</strong>
              10:00 AM
            </button>
            <button id="slot-da" class="btn-slot-card${S.slot === 'dayafter' ? ' active' : ''}" onclick="pickSlot('dayafter', this)">
              <strong>Day After</strong>
              3:00 PM
            </button>
          </div>
        </div>

        <!-- Address -->
        <div class="checkout-card">
          <h4>Service Address</h4>
          <div class="checkout-address-block">
            <span class="chk-address-icon">📍</span>
            <div class="chk-address-details">
              <h5>Priya's Home</h5>
              <p>Flat 402, 10th Cross, Indiranagar, Bengaluru 560038</p>
            </div>
          </div>
        </div>

        <!-- Privacy notice — flat left-border style -->
        <div class="booking-brief-banner">
          <h5>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Privacy Protected Dispatch
          </h5>
          <p>Your number is masked and your exact address is shared only after the partner accepts.</p>
        </div>

        <div style="padding: 10px 14px 4px;">
          <button class="btn-primary" onclick="doMatching()">Confirm Booking · ₹499</button>
          <p style="font-size:11px; color:var(--txt-3); text-align:center; margin-top:8px; line-height:1.4;">
            Free cancellation up to 3 hours before the appointment
          </p>
        </div>
      </div>

      ${navBar('home')}
    </div>`,

  /* ── MATCHING ────────────────────────────────────── */
  MATCHING: () => `
    <div class="screen-wrapper radar-spinner-container">
      <div class="spin-circle-pulse">
        <div class="spin-circle"></div>
      </div>
      <h3>Finding your technician</h3>
      <p style="font-size:12.5px; color:var(--txt-3); margin-top:7px; max-width:210px; line-height:1.55;">
        Matching you with the best verified AC specialist nearby…
      </p>
    </div>`,

  /* ── PARTNER ─────────────────────────────────────── */
  PARTNER: () => `
    <div class="screen-wrapper" style="padding:0; justify-content:space-between;">
      <div class="app-subpage-header">
        <h3>Partner Assigned</h3>
      </div>

      <div class="scroll-container">
        <div class="partner-profile-panel">
          <div class="partner-avatar-circle">👨🏽</div>
          <h4>Ramesh Kumar</h4>
          <span style="display:inline-block; background:rgba(0,166,90,0.1); color:var(--green); font-size:10.5px; font-weight:700; padding:3px 10px; border-radius:5px; margin-top:4px;">Gold Tier Partner</span>

          <div class="partner-rating-pills">
            <div class="partner-pill-item">
              <span>Rating</span>
              <strong>⭐ 4.85 / 5</strong>
            </div>
            <div class="partner-pill-item">
              <span>Background</span>
              <strong style="color:var(--green);">✓ Verified</strong>
            </div>
            <div class="partner-pill-item">
              <span>Total Jobs</span>
              <strong>1,247</strong>
            </div>
            <div class="partner-pill-item">
              <span>ETA</span>
              <strong>~12 min</strong>
            </div>
          </div>

          <div class="partner-legal-banner">
            🤝 Ramesh has completed Urban Company's safety training and signed the Privacy Code. All calls go through a secure proxy — your real number stays private.
          </div>
        </div>

        <div style="padding: 14px 14px 6px;">
          <button class="btn-primary" onclick="navigateTo('EXECUTION')">Track Arrival →</button>
        </div>
      </div>

      ${navBar('home')}
    </div>`,

  /* ── EXECUTION ───────────────────────────────────── */
  EXECUTION: () => `
    <div class="screen-wrapper" style="padding:0; justify-content:space-between;">
      <div class="app-subpage-header">
        <h3>Service in Progress</h3>
      </div>

      <div class="scroll-container">
        <div class="execution-vector">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.6">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          <span style="font-size:13.5px; font-weight:600; color:var(--txt-1);">Ramesh is servicing your AC</span>
          <span style="font-size:11.5px; color:var(--txt-3);">Est. completion in ~35 min</span>
        </div>

        <div class="contextual-photo-banner">
          <strong style="color:var(--txt-1); font-weight:700;">📸 Photo Consent — </strong>
          ${S.user.consentPhotos
            ? `<span style="color:var(--green); font-weight:600;">Enabled</span> — Ramesh may take one quality-check photo. It's encrypted and auto-deleted in 7 days.`
            : `<span style="color:var(--red); font-weight:600;">Disabled</span> — Photo upload is blocked. Ramesh cannot photograph your home.`}
        </div>

        <!-- Checklist, UC-style flat list -->
        <div style="padding: 13px 14px; border-bottom:1px solid var(--border);">
          <p style="font-size:11px; font-weight:700; color:var(--txt-3); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:10px;">Live Progress</p>
          ${[
            { done: true,  text: 'Filter removed & inspected' },
            { done: true,  text: 'Foam-jet cleaning applied' },
            { done: false, text: 'Drying & reassembly' },
            { done: false, text: 'Final cooling test' },
          ].map(item => `
            <div style="display:flex; align-items:center; gap:10px; padding:7px 0; border-bottom:1px solid var(--border);">
              <span style="font-size:15px; flex-shrink:0;">${item.done ? '✅' : '🔄'}</span>
              <span style="font-size:13px; color:${item.done ? 'var(--txt-1)' : 'var(--txt-3)'}; font-weight:${item.done ? '500' : '400'};">${item.text}</span>
            </div>`).join('')}
        </div>

        <div style="padding: 14px 14px 6px;">
          <button class="btn-primary" onclick="navigateTo('RATING')">Mark as Completed →</button>
        </div>
      </div>

      ${navBar('home')}
    </div>`,

  /* ── RATING ──────────────────────────────────────── */
  RATING: () => `
    <div class="screen-wrapper" style="padding: 28px 20px 20px; justify-content:center; text-align:center;">
      <span style="font-size:42px; display:block; margin-bottom:12px;">🎉</span>
      <h2 style="font-family:'Outfit',sans-serif; font-size:22px; font-weight:800; color:var(--txt-1); letter-spacing:-0.4px; margin-bottom:4px;">Service Complete!</h2>
      <p style="font-size:13px; color:var(--txt-3); line-height:1.6; margin-bottom:20px;">How did Ramesh do? Rate him to help the community.</p>

      <div class="rating-stars-row" id="stars-row">
        ${[1,2,3,4,5].map(i => `
          <span class="interactive-star${S.rating >= i ? ' selected' : ''}"
            onclick="doRating(${i})" data-val="${i}">★</span>`).join('')}
      </div>

      <div style="text-align:left; width:100%; margin-bottom:20px;">
        <p class="section-eyebrow" style="margin-bottom:10px;">Leave a tip for Ramesh</p>
        <div class="tip-selection-row" id="tips-row">
          ${[50, 100, 150].map(a => `
            <button class="btn-tip-pill${S.tip === a ? ' active' : ''}" onclick="doTip(${a})" data-amt="${a}">₹${a}</button>`).join('')}
        </div>
        <p style="font-size:11px; color:var(--txt-3); line-height:1.4;">
          100% of the tip goes directly to Ramesh's wallet.
        </p>
      </div>

      <button class="btn-primary" onclick="submitFeedback()">Submit</button>
    </div>`,

  /* ── BOOKINGS ─────────────────────────────────────── */
  BOOKINGS: () => {
    let body = '';

    if (S.booking === 'none') {
      body = `
        <div style="text-align:center; padding:48px 24px;">
          <span style="font-size:44px; display:block; margin-bottom:14px;">📋</span>
          <h4 style="font-size:16px; font-weight:700; color:var(--txt-1); margin-bottom:5px;">No bookings yet</h4>
          <p style="font-size:13px; color:var(--txt-3); line-height:1.55; max-width:190px; margin:0 auto 20px;">
            Book your first service and it'll show up here.
          </p>
          <button class="btn-primary" style="max-width:160px; margin:0 auto; font-size:13.5px;" onclick="navigateTo('HOME')">Browse Services</button>
        </div>`;
    } else if (S.booking === 'assigned') {
      body = `
        <div class="booking-item-card">
          <div class="booking-item-header">
            <span style="font-size:10.5px; color:var(--txt-3); font-family:monospace; letter-spacing:0.3px;">UC-29384</span>
            <span class="booking-status-tag active">Upcoming</span>
          </div>
          <p style="font-size:15px; font-weight:700; color:var(--txt-1); margin-bottom:3px;">Foam-jet Deep Clean Service</p>
          <p style="font-size:12px; color:var(--txt-3);">📅 ${S.slot === 'tomorrow' ? 'Tomorrow, 10:00 AM' : 'Day After, 3:00 PM'}</p>
          <p style="font-size:12px; color:var(--txt-3);">📍 Flat 402, Indiranagar, BLR</p>
          <div style="display:flex; align-items:center; gap:9px; margin-top:8px; padding:10px; background:var(--bg-card); border-radius:9px;">
            <span style="font-size:22px;">👨🏽</span>
            <div>
              <p style="font-size:13px; font-weight:700; color:var(--txt-1);">Ramesh Kumar</p>
              <p style="font-size:11px; color:var(--txt-3);">AC Specialist · ⭐ 4.85</p>
            </div>
            <div style="margin-left:auto; text-align:right;">
              <p style="font-size:11.5px; font-weight:700; color:var(--accent);">₹499</p>
            </div>
          </div>
          <button class="btn-primary" style="margin-top:10px; font-size:13.5px; padding:11px;" onclick="navigateTo('PARTNER')">Track Partner →</button>
        </div>`;
    } else {
      body = `
        <div class="booking-item-card" style="opacity:0.85;">
          <div class="booking-item-header">
            <span style="font-size:10.5px; color:var(--txt-3); font-family:monospace;">UC-29384</span>
            <span class="booking-status-tag completed">Completed</span>
          </div>
          <p style="font-size:15px; font-weight:700; color:var(--txt-1); margin-bottom:3px;">Foam-jet Deep Clean Service</p>
          <p style="font-size:12px; color:var(--txt-3);">📅 ${S.slot === 'tomorrow' ? 'Tomorrow, 10:00 AM' : 'Day After, 3:00 PM'}</p>
          <p style="font-size:12px; color:var(--txt-3);">📍 Flat 402, Indiranagar, BLR</p>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; padding-top:8px; border-top:1px dashed var(--border);">
            <span style="font-size:12px; color:var(--txt-3);">Your rating: ${'⭐'.repeat(S.rating || 5)}</span>
            <span style="font-size:12px; color:var(--txt-3);">Tip: ₹${S.tip || 0}</span>
          </div>
        </div>`;
    }

    return `
      <div class="screen-wrapper" style="padding:0; justify-content:space-between;">
        <div class="app-subpage-header"><h3>My Bookings</h3></div>
        <div class="scroll-container">${body}</div>
        ${navBar('bookings')}
      </div>`;
  },

  /* ── PRIVACY CENTER ──────────────────────────────── */
  PRIVACY_CENTER: () => {
    const modal = S.showDataModal ? `
      <div class="screen-modal-overlay" onclick="if(event.target===this){S.showDataModal=false;navigateTo('PRIVACY_CENTER');}">
        <div class="screen-modal-card">
          <h4>Your Data Summary</h4>
          <div class="json-data-block">${esc(JSON.stringify({
            user: { name: 'Priya Sharma', phone: S.user.phone, type: S.user.profile, dob: S.user.dob },
            consents: {
              serviceDelivery: 'ACTIVE',
              photos:          S.user.consentPhotos     ? 'ACTIVE' : 'WITHDRAWN',
              marketing:       S.user.consentMarketing  ? 'ACTIVE' : 'WITHDRAWN',
            },
            log: [
              { time: '2026-07-05T22:42Z', event: 'Account created' },
              { time: '2026-07-05T22:43Z', event: 'AC service booked' },
              { time: '2026-07-05T22:44Z', event: 'Location shared with partner #4402' },
            ]
          }, null, 2))}</div>
          <button class="btn-modal-close-action" onclick="S.showDataModal=false; navigateTo('PRIVACY_CENTER')">Done</button>
        </div>
      </div>` : '';

    return `
      <div class="screen-wrapper" style="padding:0; justify-content:space-between;">
        <div class="app-subpage-header"><h3>Privacy &amp; Data</h3></div>

        <div class="scroll-container">
          <!-- Section 1: Consent toggles -->
          <div class="privacy-card-section">
            <h4>Your Consent Settings</h4>

            <div class="consent-item" style="padding:10px 0;">
              <div class="consent-label-left">
                <h5 style="font-size:13.5px; font-weight:600; color:var(--txt-1);">Photo Proof of Work</h5>
                <div class="consent-desc" id="pc-photo-desc">
                  ${S.user.consentPhotos ? 'On — quality photo allowed' : 'Off — photo upload blocked'}
                </div>
              </div>
              <label class="switch">
                <input type="checkbox" id="pc-photos" ${S.user.consentPhotos ? 'checked' : ''} onchange="toggleConsent('photos',this.checked)">
                <span class="slider"></span>
              </label>
            </div>

            <div class="consent-item" style="padding:10px 0; border-top:1px solid var(--border);">
              <div class="consent-label-left">
                <h5 style="font-size:13.5px; font-weight:600; color:var(--txt-1);">Personalised Offers</h5>
                <div class="consent-desc" id="pc-mkt-desc">
                  ${S.user.consentMarketing ? 'On — receiving offers and alerts' : 'Off — no marketing messages'}
                </div>
              </div>
              <label class="switch">
                <input type="checkbox" id="pc-mkt" ${S.user.consentMarketing ? 'checked' : ''} onchange="toggleConsent('marketing',this.checked)">
                <span class="slider"></span>
              </label>
            </div>
          </div>

          <!-- Section 2: Rights -->
          <div class="privacy-card-section">
            <h4>Your Data Rights</h4>
            <button class="btn-privacy-menu-item" onclick="S.showDataModal=true; navigateTo('PRIVACY_CENTER')">
              <span>📥 Download my data</span>
              <span class="menu-arrow-icon">→</span>
            </button>
            <button class="btn-privacy-menu-item" onclick="doCorrection()">
              <span>✏️ Correct my details</span>
              <span class="menu-arrow-icon">→</span>
            </button>
            <button class="btn-privacy-menu-item" onclick="doErasure()" style="color:var(--red);">
              <span>🗑️ Delete my account</span>
              <span class="menu-arrow-icon">→</span>
            </button>
          </div>

          <p style="font-size:11px; color:var(--txt-3); padding:12px 14px; line-height:1.5;">
            Questions? Contact our Data Protection Officer at <span style="color:var(--accent); font-weight:600;">dpo@urbancompany.com</span>
          </p>
        </div>

        ${modal}
        ${navBar('privacy')}
      </div>`;
  },
};

// ─── Action Handlers ──────────────────────────────────────────────────────────

function showAlert() {
  const t = document.createElement('div');
  t.style.cssText = `position:absolute; bottom:74px; left:50%; transform:translateX(-50%);
    background:var(--txt-1); color:var(--bg-phone); padding:9px 16px; border-radius:9px;
    font-size:12.5px; font-weight:600; white-space:nowrap; z-index:200;
    box-shadow:var(--shadow-float); animation:pgIn 0.2s ease both;`;
  t.textContent = '🚧 Select AC Service for the demo';
  $('phone-screen-container').appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.25s'; setTimeout(() => t.remove(), 250); }, 2000);
}

function onDOBChange(val) {
  S.user.dob = val;
  const age = new Date().getFullYear() - new Date(val).getFullYear();
  const wasMinor = S.user.profile === 'minor';
  S.user.profile = age < 18 ? 'minor' : 'adult';
  if (S.user.profile === 'minor') S.user.consentMarketing = false;
  if (wasMinor !== (S.user.profile === 'minor')) navigateTo('SIGNUP');
}

function setProfile(p) {
  S.user.profile = p;
  S.user.dob = p === 'adult' ? '1992-04-12' : '2010-04-12';
  if (p === 'minor') S.user.consentMarketing = false;
  navigateTo('SIGNUP');
}

// Consent toggle — DOM update only, no re-render
function toggleConsent(type, checked) {
  if (type === 'marketing' && S.user.profile === 'minor') {
    const id = S.screen === 'PRIVACY_CENTER' ? 'pc-mkt' : 'su-mkt';
    const el = $(id);
    if (el) el.checked = false;
    showToast('🔒 Marketing blocked for minor accounts');
    return;
  }
  if (type === 'photos')    S.user.consentPhotos    = checked;
  if (type === 'marketing') S.user.consentMarketing = checked;

  // Update description in-place only for Privacy Center
  if (S.screen === 'PRIVACY_CENTER') {
    const pd = $('pc-photo-desc');
    const md = $('pc-mkt-desc');
    if (pd) pd.textContent = S.user.consentPhotos    ? 'On — quality photo allowed'      : 'Off — photo upload blocked';
    if (md) md.textContent = S.user.consentMarketing ? 'On — receiving offers and alerts' : 'Off — no marketing messages';
  }
}

function doSignup() {
  if (S.user.profile === 'minor' && !S.user.parentVerified) {
    navigateTo('PARENTAL_GATE');
  } else {
    navigateTo('HOME');
  }
}

function verifyParent() {
  S.user.parentVerified = true;
  const btn = $q('button[onclick="submitParent()"]');
  if (btn) btn.removeAttribute('disabled');
}

function submitParent() {
  if (S.user.parentVerified) navigateTo('HOME');
  else showToast('Enter the OTP sent to parent (demo: 5678)');
}

// Cart: pure DOM update
function toggleCart(btn) {
  S.cart = S.cart === 0 ? 1 : 0;
  btn.classList.toggle('selected', S.cart > 0);
  btn.textContent = S.cart > 0 ? '✓ Added' : '+ Add';
  const bar = $('cart-bar');
  if (bar) bar.classList.toggle('visible', S.cart > 0);
}

// Slot: pure DOM update
function pickSlot(slot, btn) {
  S.slot = slot;
  $qa('.btn-slot-card').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// Stars: pure DOM update
function doRating(val) {
  S.rating = val;
  $qa('.interactive-star').forEach((s, i) => s.classList.toggle('selected', i < val));
}

// Tip: pure DOM update
function doTip(amt) {
  S.tip = amt;
  $qa('.btn-tip-pill').forEach(p => p.classList.toggle('active', Number(p.dataset.amt) === amt));
}

function submitFeedback() {
  S.booking = 'completed';
  showToast(`Thanks! ${S.rating}⭐ · Tip ₹${S.tip} sent to Ramesh.`);
  setTimeout(() => navigateTo('BOOKINGS'), 900);
}

function doMatching() {
  navigateTo('MATCHING');
  setTimeout(() => { S.booking = 'assigned'; navigateTo('PARTNER'); }, 2200);
}

function doCorrection() {
  showToast('✏️ Correction request sent to our team.');
}

function doErasure() {
  const ok = confirm('Delete your account?\n\nThis will permanently remove your data, addresses and booking history.');
  if (ok) {
    showToast('🗑️ Account deletion initiated. Done within 4 hours.');
    setTimeout(resetPrototype, 1500);
  }
}

// Toast — replaces all browser alert() calls
function showToast(msg) {
  $qa('.uc-toast').forEach(t => t.remove());
  const t = document.createElement('div');
  t.className = 'uc-toast';
  t.style.cssText = `
    position:absolute; bottom:72px; left:12px; right:12px;
    background:var(--txt-1); color:var(--bg-phone);
    padding:11px 14px; border-radius:10px;
    font-size:13px; font-weight:600; color: var(--bg-phone) !important;
    z-index:300; box-shadow:var(--shadow-float);
    animation:pgIn 0.22s ease both; line-height:1.4;`;
  t.textContent = msg;
  $('phone-screen-container').appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transition = 'opacity 0.28s ease';
    setTimeout(() => t.remove(), 280);
  }, 2800);
}

// ─── Init ─────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  navigateTo('SPLASH');
  setTimeout(() => navigateTo('WELCOME'), 1600);
});
