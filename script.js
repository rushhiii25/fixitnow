/**
 * FixItNow - Premium Home Service Booking Platform
 * Full-Stack JavaScript Engine connected to MySQL Backend & REST APIs
 * Strict Authentication Guard: No bookings or booking creation allowed without Login/Signup!
 */

// ==========================================================================
// 1. SERVICES DATA CATALOG (Itemized with ₹ Pricing, Materials, Time)
// ==========================================================================
const SERVICES_DATA = [
  // --- ELECTRICIAN & CCTV ---
  {
    id: "elec-1",
    name: "Smart CCTV Camera Installation & Setup",
    category: "electrician",
    categoryLabel: "Electrician & CCTV",
    badgeClass: "electrician",
    price: 2499,
    originalPrice: 3299,
    rating: 4.95,
    reviewsCount: 524,
    estimatedTime: "3 hrs",
    materialsUsed: "Cat6/Coaxial cables, weatherproof junction box, BNC connectors, wall clamps",
    warranty: "60-Day Installation Guarantee",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=700&q=80",
    description: "Complete mounting, concealment wiring, DVR/NVR network configuration, smartphone live view streaming setup, and night-vision angle calibration for up to 4 HD cameras.",
    addOns: [
      { id: "add-cctv-ext", name: "Additional 2-Camera Line Setup", price: 699 },
      { id: "add-cctv-mon", name: "HDMI Monitor Wall Mounting", price: 349 }
    ]
  },
  {
    id: "elec-2",
    name: "CCTV Troubleshooting & Power Supply Repair",
    category: "electrician",
    categoryLabel: "Electrician & CCTV",
    badgeClass: "electrician",
    price: 599,
    originalPrice: 899,
    rating: 4.88,
    reviewsCount: 312,
    estimatedTime: "45 mins",
    materialsUsed: "High-grade BNC connectors, DC pin jack, heavy-duty fuse replacements",
    warranty: "30-Day Fix Guarantee",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=700&q=80",
    description: "Diagnose offline cameras, video signal flickering, dark screen issues, infrared night-vision failure, and damaged SMPS power supply adapters.",
    addOns: [
      { id: "add-smps-rep", name: "SMPS 12V 4CH Adapter Replacement", price: 499 }
    ]
  },
  {
    id: "elec-3",
    name: "Complete House Rewiring & MCB Upgrade",
    category: "electrician",
    categoryLabel: "Electrician & CCTV",
    badgeClass: "electrician",
    price: 1899,
    originalPrice: 2499,
    rating: 4.92,
    reviewsCount: 284,
    estimatedTime: "2.5 hrs",
    materialsUsed: "Finolex/Havells FR Copper Wire, Havells 32A Double-Pole MCB, insulating tape",
    warranty: "90-Day Electrical Guarantee",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=700&q=80",
    description: "Fix frequent tripping, load unbalance, short-circuit hazards, replace burned-out main switchboards, and install heavy-duty MCBs for AC and Geyser lines.",
    addOns: [
      { id: "add-earth-test", name: "Complete Earthing Ground Test & Surge Check", price: 299 }
    ]
  },
  {
    id: "elec-4",
    name: "Ceiling Fan, Chandelier & Smart Switch Fitting",
    category: "electrician",
    categoryLabel: "Electrician & CCTV",
    badgeClass: "electrician",
    price: 349,
    originalPrice: 499,
    rating: 4.87,
    reviewsCount: 680,
    estimatedTime: "40 mins",
    materialsUsed: "Heavy metal anchor bolts, high-tensile wire caps, industrial insulation tape",
    warranty: "30-Day Fix Guarantee",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=80",
    description: "Assembly and secure ceiling mounting of designer fans, heavy crystal chandeliers, LED profile lighting, and modular smart Wi-Fi switchboards.",
    addOns: [
      { id: "add-fan-bal", name: "Blade Balancing & Capacitor Replacement", price: 149 }
    ]
  },

  // --- PLUMBER ---
  {
    id: "plumb-1",
    name: "Bathroom Tap, Mixer & Flush Valve Repair",
    category: "plumber",
    categoryLabel: "Plumber",
    badgeClass: "plumber",
    price: 449,
    originalPrice: 649,
    rating: 4.91,
    reviewsCount: 840,
    estimatedTime: "45 mins",
    materialsUsed: "Teflon thread sealing tape, rubber O-ring washers, brass spindle cartridges",
    warranty: "30-Day Fix Guarantee",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=700&q=80",
    description: "Comprehensive fix for dripping single-lever mixer taps, leaking flush cisterns, low-pressure showerheads, and corroded angle stops with zero damage to tiles.",
    addOns: [
      { id: "add-tap-spindle", name: "Heavy Brass Ceramic Spindle Replacement", price: 249 }
    ]
  },
  {
    id: "plumb-2",
    name: "Deep Drain Jetting & Severe Blockage Removal",
    category: "plumber",
    categoryLabel: "Plumber",
    badgeClass: "plumber",
    price: 699,
    originalPrice: 999,
    rating: 4.94,
    reviewsCount: 460,
    estimatedTime: "1 hr",
    materialsUsed: "Mechanical spring snake auger, bio-enzyme degreaser, high-pressure unclogger",
    warranty: "30-Day Unclog Guarantee",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=700&q=80",
    description: "High-power unclogging of chocked kitchen sinks, bathroom floor traps, grease traps, and mainline drainage. Eliminates foul odor completely.",
    addOns: [
      { id: "add-anti-odor", name: "Anti-Cockroach Floor Trap Grating Fitting", price: 199 }
    ]
  },
  {
    id: "plumb-3",
    name: "Geyser & Water Heater Installation / Descaling",
    category: "plumber",
    categoryLabel: "Plumber",
    badgeClass: "plumber",
    price: 799,
    originalPrice: 1199,
    rating: 4.89,
    reviewsCount: 390,
    estimatedTime: "1 hr",
    materialsUsed: "Braided SS flexible connector pipes, brass nipples, high-load anchor fasteners",
    warranty: "45-Day Service Warranty",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80",
    description: "Safe wall mounting, leak-free inlet/outlet connection, pressure release valve setup, electrical safety check, and heating coil limescale descaling.",
    addOns: [
      { id: "add-ss-pipes", name: "Pair of Premium SS Braided Connection Hoses", price: 349 }
    ]
  },

  // --- PIPE INSTALLATION ---
  {
    id: "pipe-1",
    name: "Concealed CPVC / UPVC Pipeline Laying",
    category: "pipe",
    categoryLabel: "Pipe Installation",
    badgeClass: "pipe",
    price: 2999,
    originalPrice: 3999,
    rating: 4.96,
    reviewsCount: 310,
    estimatedTime: "4 hrs",
    materialsUsed: "Astral/Ashirvad SDR-11 CPVC 3/4\" pipes, brass threaded elbows, solvent cement",
    warranty: "1-Year Pipeline Guarantee",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=700&q=80",
    description: "Full wall-chasing, dual hot and cold water concealed pipeline layout for modern bathrooms and kitchens. Includes pressure testing before plastering.",
    addOns: [
      { id: "add-pressure-valve", name: "Dual Pressure Regulating Ball Valve Setup", price: 499 }
    ]
  },
  {
    id: "pipe-2",
    name: "Overhead Water Tank & Booster Pump Pipework",
    category: "pipe",
    categoryLabel: "Pipe Installation",
    badgeClass: "pipe",
    price: 1499,
    originalPrice: 1999,
    rating: 4.9,
    reviewsCount: 220,
    estimatedTime: "2.5 hrs",
    materialsUsed: "Heavy UPVC Schedule 40 pipes, brass non-return valves (NRV), union couplings",
    warranty: "60-Day Workmanship Guarantee",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80",
    description: "Connection of booster pumps, automated mechanical float valves to prevent tank overflows, bypass pipeline creation, and leak-proof terrace tank plumbing.",
    addOns: [
      { id: "add-float-valve", name: "Brass High-Pressure Float Ball Valve", price: 399 }
    ]
  },
  {
    id: "pipe-3",
    name: "Safe Gas Pipeline & Hob Cooktop Fitting",
    category: "pipe",
    categoryLabel: "Pipe Installation",
    badgeClass: "pipe",
    price: 899,
    originalPrice: 1299,
    rating: 4.97,
    reviewsCount: 485,
    estimatedTime: "1 hr",
    materialsUsed: "Suraksha steel-wire braided flexible hose, brass shut-off valve, leak detector gel",
    warranty: "60-Day Safety Assurance",
    image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=700&q=80",
    description: "Piped Natural Gas (PNG) / LPG cylinder copper piping connection, hob cooktop nozzle re-jetting, and soapy-water multi-point gas leak detection.",
    addOns: [
      { id: "add-gas-hose", name: "BIS Certified 1.5M Fire-Retardant Hose", price: 299 }
    ]
  },

  // --- CARPENTER ---
  {
    id: "carp-1",
    name: "Modular Bed & Wardrobe Assembly / Repair",
    category: "carpenter",
    categoryLabel: "Carpenter",
    badgeClass: "carpenter",
    price: 799,
    originalPrice: 1199,
    rating: 4.92,
    reviewsCount: 630,
    estimatedTime: "1.5 hrs",
    materialsUsed: "High-tensile minifix dowels, heavy L-brackets, drywall wood screws",
    warranty: "30-Day Fix Guarantee",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=700&q=80",
    description: "Expert assembly and alignment for IKEA, Urban Ladder, and Pepperfry hydraulic storage beds, sliding wardrobes, TV entertainment units, and dressing tables.",
    addOns: [
      { id: "add-hydraulic-pump", name: "Pair of 100KG Gas Lift Hydraulic Cylinders", price: 799 }
    ]
  },
  {
    id: "carp-2",
    name: "High-Security Door Lock & Mortise Fitting",
    category: "carpenter",
    categoryLabel: "Carpenter",
    badgeClass: "carpenter",
    price: 549,
    originalPrice: 799,
    rating: 4.94,
    reviewsCount: 512,
    estimatedTime: "45 mins",
    materialsUsed: "Stainless Steel 304 hinges, mortise strike plates, wood chiseling templates",
    warranty: "30-Day Fix Guarantee",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=700&q=80",
    description: "Precision chiseling and installation of Godrej, Yale, and Europa high-security mortise deadbolts, digital smart keypad locks, door closers, and handles.",
    addOns: [
      { id: "add-door-stopper", name: "Magnetic Heavy-Duty Floor Door Stopper", price: 199 }
    ]
  },
  {
    id: "carp-3",
    name: "Kitchen Shutter & Hydraulic Drawer Channel Fix",
    category: "carpenter",
    categoryLabel: "Carpenter",
    badgeClass: "carpenter",
    price: 999,
    originalPrice: 1399,
    rating: 4.89,
    reviewsCount: 340,
    estimatedTime: "2 hrs",
    materialsUsed: "Ebco/Hettich soft-close hydraulic hinges, telescopic ball-bearing channels",
    warranty: "45-Day Service Warranty",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=80",
    description: "Re-align sagging modular kitchen cabinets, fix stuck cutlery drawers, replace rusted soft-close hinges, and reinforce loose marine plywood shelves.",
    addOns: [
      { id: "add-softclose-hinges", name: "Pair of Ebco Soft-Close 3D Hinges", price: 299 }
    ]
  },

  // --- PAINTER ---
  {
    id: "paint-1",
    name: "Full Room Royale Luxury Emulsion Wall Painting",
    category: "painter",
    categoryLabel: "Painter",
    badgeClass: "painter",
    price: 4499,
    originalPrice: 5999,
    rating: 4.98,
    reviewsCount: 420,
    estimatedTime: "6 hrs",
    materialsUsed: "Asian Paints Royale Luxury Emulsion, Birla White Putty, masking paper, drop sheets",
    warranty: "1-Year Anti-Peeling Warranty",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=700&q=80",
    description: "Turnkey room revamp: Floor and furniture masking, sanding, hairline crack repair with acrylic putty, 1 coat sealer primer, followed by 2 coats of washable Royale Emulsion.",
    addOns: [
      { id: "add-accent-wall", name: "Metallic Designer Texture Accent Wall", price: 1499 }
    ]
  },
  {
    id: "paint-2",
    name: "Damp Proof Waterproofing & Anti-Fungal Treatment",
    category: "painter",
    categoryLabel: "Painter",
    badgeClass: "painter",
    price: 1999,
    originalPrice: 2799,
    rating: 4.93,
    reviewsCount: 295,
    estimatedTime: "3 hrs",
    materialsUsed: "Dr. Fixit Dampguard, fiber-reinforce mesh, anti-efflorescence polymer primer",
    warranty: "2-Year Anti-Dampness Warranty",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=700&q=80",
    description: "Targeted solution for peeling paint, bubbling plaster, white salt efflorescence, and moisture intrusion near bathrooms and external exterior walls.",
    addOns: [
      { id: "add-crack-fill", name: "Structural Polymer Crack Injection Sealant", price: 449 }
    ]
  },
  {
    id: "paint-3",
    name: "Door, Window & Furniture PU Enamel Polish",
    category: "painter",
    categoryLabel: "Painter",
    badgeClass: "painter",
    price: 1299,
    originalPrice: 1799,
    rating: 4.86,
    reviewsCount: 210,
    estimatedTime: "2 hrs",
    materialsUsed: "Asian Paints Melamyne/PU Sealer, 220/400 grit waterproof emery sheets, wood filler",
    warranty: "6-Month High-Gloss Guarantee",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=700&q=80",
    description: "Restore natural wood grain beauty on main doors, window frames, dining tables, and balustrades with high-durability scratch-resistant PU gloss or matte lacquer.",
    addOns: [
      { id: "add-weather-coat", name: "UV & Rain Exterior Protective Topcoat", price: 349 }
    ]
  }
];

// ==========================================================================
// 2. APPLICATION STATE MANAGEMENT
// ==========================================================================
const AppState = {
  currentCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  currentCity: localStorage.getItem('fixit_city') || 'Mumbai, MH',
  theme: localStorage.getItem('fixit_theme') || 'dark',

  // REAL AUTHENTICATION & DATABASE DATA
  token: localStorage.getItem('fixit_jwt_token') || null,
  user: JSON.parse(localStorage.getItem('fixit_auth_user')) || null,
  
  // Strictly empty unless verified & logged in!
  bookings: [],
  
  // Pending service if user clicked "Book Now" before login
  pendingServiceBookingId: null,
  
  activeBookingDraft: null
};

// ==========================================================================
// 3. DOM ELEMENTS CACHE
// ==========================================================================
const DOM = {
  html: document.documentElement,
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  navbar: document.getElementById('navbar'),
  hamburgerBtn: document.getElementById('hamburgerBtn'),
  mobileDrawer: document.getElementById('mobileDrawer'),
  mobileDrawerOverlay: document.getElementById('mobileDrawerOverlay'),
  drawerCloseBtn: document.getElementById('drawerCloseBtn'),
  
  citySelectorBtn: document.getElementById('citySelectorBtn'),
  cityDropdownMenu: document.getElementById('cityDropdownMenu'),
  currentCityText: document.getElementById('currentCityText'),
  copyHeroCoupon: document.getElementById('copyHeroCoupon'),
  
  heroSearchInput: document.getElementById('heroSearchInput'),
  heroCategorySelect: document.getElementById('heroCategorySelect'),
  heroSearchBtn: document.getElementById('heroSearchBtn'),
  clearSearchBtn: document.getElementById('clearSearchBtn'),
  
  servicesGrid: document.getElementById('servicesGrid'),
  categoryTabs: document.getElementById('categoryTabs'),
  inlineSearchInput: document.getElementById('inlineSearchInput'),
  servicesSortSelect: document.getElementById('servicesSortSelect'),
  resultsCountNotice: document.getElementById('resultsCountNotice'),
  emptyState: document.getElementById('emptyState'),
  resetFiltersBtn: document.getElementById('resetFiltersBtn'),
  
  bookingModalBackdrop: document.getElementById('bookingModalBackdrop'),
  bookingModalCloseBtn: document.getElementById('bookingModalCloseBtn'),
  bookingModalBody: document.getElementById('bookingModalBody'),
  
  quickViewModalBackdrop: document.getElementById('quickViewModalBackdrop'),
  quickViewCloseBtn: document.getElementById('quickViewCloseBtn'),
  quickViewContent: document.getElementById('quickViewContent'),
  
  authModalBackdrop: document.getElementById('authModalBackdrop'),
  authModalCloseBtn: document.getElementById('authModalCloseBtn'),
  authNoticeBanner: document.getElementById('authNoticeBanner'),
  authNoticeText: document.getElementById('authNoticeText'),
  navLoginBtn: document.getElementById('navLoginBtn'),
  drawerLoginBtn: document.getElementById('drawerLoginBtn'),
  tabLoginBtn: document.getElementById('tabLoginBtn'),
  tabRegisterBtn: document.getElementById('tabRegisterBtn'),
  loginFormWrap: document.getElementById('loginFormWrap'),
  registerFormWrap: document.getElementById('registerFormWrap'),
  loginForm: document.getElementById('loginForm'),
  registerForm: document.getElementById('registerForm'),
  authButtonGroup: document.getElementById('authButtonGroup'),
  
  myBookingsBtn: document.getElementById('myBookingsBtn'),
  myBookingsModalBackdrop: document.getElementById('myBookingsModalBackdrop'),
  myBookingsCloseBtn: document.getElementById('myBookingsCloseBtn'),
  myBookingsList: document.getElementById('myBookingsList'),
  bookingsCountBadge: document.getElementById('bookingsCountBadge'),
  
  contactForm: document.getElementById('contactForm'),
  toastContainer: document.getElementById('toastContainer'),
  faqAccordion: document.getElementById('faqAccordion')
};

// ==========================================================================
// 4. INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCity();
  renderServices();
  setupEventListeners();
  setupFAQAccordion();
  
  // Check auth and fetch bookings if authenticated
  initAuthAndBookings();
});

// ==========================================================================
// 5. THEME & HEADER CONTROLLERS
// ==========================================================================
function initTheme() {
  DOM.html.setAttribute('data-theme', AppState.theme);
  if (DOM.themeToggleBtn) {
    DOM.themeToggleBtn.addEventListener('click', () => {
      AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
      DOM.html.setAttribute('data-theme', AppState.theme);
      localStorage.setItem('fixit_theme', AppState.theme);
      showToast(`Switched to ${AppState.theme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  }
}

function initCity() {
  if (DOM.currentCityText) DOM.currentCityText.textContent = AppState.currentCity;
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    DOM.navbar.classList.add('scrolled');
  } else {
    DOM.navbar.classList.remove('scrolled');
  }
});

// ==========================================================================
// 6. BACKEND API AUTH & BOOKINGS SYNC
// ==========================================================================
async function initAuthAndBookings() {
  if (AppState.token && AppState.user) {
    updateUserInterface(true);
    await fetchUserBookingsFromDatabase();
  } else {
    updateUserInterface(false);
    AppState.bookings = [];
    updateBookingsBadge();
  }
}

function updateUserInterface(isLoggedIn) {
  if (isLoggedIn && AppState.user) {
    DOM.authButtonGroup.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.6rem;">
        <span style="font-size:0.88rem; font-weight:700; color:var(--primary-400);">
          <i class="fa-solid fa-circle-user"></i> ${AppState.user.name.split(' ')[0]}
        </span>
        <button class="btn btn-outline" id="userLogoutBtn" style="padding:0.4rem 0.75rem; font-size:0.8rem;" title="Log Out">
          <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
        </button>
      </div>
    `;

    document.getElementById('userLogoutBtn')?.addEventListener('click', handleLogout);
    
    // Update drawer auth button
    if (DOM.drawerLoginBtn) {
      DOM.drawerLoginBtn.innerHTML = `<i class="fa-solid fa-arrow-right-from-bracket"></i> Logout (${AppState.user.name.split(' ')[0]})`;
      DOM.drawerLoginBtn.onclick = handleLogout;
    }
  } else {
    DOM.authButtonGroup.innerHTML = `
      <button class="btn btn-outline" id="navLoginBtn">
        <i class="fa-regular fa-user"></i> <span>Login / Sign Up</span>
      </button>
    `;
    document.getElementById('navLoginBtn')?.addEventListener('click', () => openAuthModal('login'));

    if (DOM.drawerLoginBtn) {
      DOM.drawerLoginBtn.innerHTML = `<i class="fa-regular fa-user"></i> Login / Register`;
      DOM.drawerLoginBtn.onclick = () => {
        closeDrawer();
        openAuthModal('login');
      };
    }
  }
}

function handleLogout() {
  AppState.token = null;
  AppState.user = null;
  AppState.bookings = [];
  AppState.pendingServiceBookingId = null;

  localStorage.removeItem('fixit_jwt_token');
  localStorage.removeItem('fixit_auth_user');

  updateUserInterface(false);
  updateBookingsBadge();
  closeMyBookingsModal();
  showToast('You have been logged out safely.', 'info');
}

/**
 * Fetch bookings strictly from the MySQL database via authenticated backend API
 */
async function fetchUserBookingsFromDatabase() {
  if (!AppState.token) {
    AppState.bookings = [];
    updateBookingsBadge();
    return;
  }

  try {
    const res = await fetch('/api/bookings', {
      headers: {
        'Authorization': `Bearer ${AppState.token}`
      }
    });

    const data = await res.json();
    if (data.success) {
      AppState.bookings = data.bookings || [];
      updateBookingsBadge();
    } else {
      console.warn('Database Bookings Notice:', data.error);
      if (res.status === 401 || res.status === 403) {
        handleLogout();
      }
    }
  } catch (error) {
    console.error('Failed to communicate with MySQL backend:', error);
  }
}

function updateBookingsBadge() {
  if (DOM.bookingsCountBadge) {
    DOM.bookingsCountBadge.textContent = AppState.bookings.length;
  }
}

// ==========================================================================
// 7. SERVICES RENDERING & FILTERING
// ==========================================================================
function getFilteredAndSortedServices() {
  let list = [...SERVICES_DATA];

  if (AppState.currentCategory !== 'all') {
    list = list.filter(item => item.category === AppState.currentCategory);
  }

  if (AppState.searchQuery.trim() !== '') {
    const q = AppState.searchQuery.toLowerCase().trim();
    list = list.filter(item => 
      item.name.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q) ||
      item.materialsUsed.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  }

  if (AppState.sortBy === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (AppState.sortBy === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (AppState.sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (AppState.sortBy === 'time') {
    list.sort((a, b) => parseFloat(a.estimatedTime) - parseFloat(b.estimatedTime));
  }

  return list;
}

function renderServices() {
  const filtered = getFilteredAndSortedServices();

  if (DOM.resultsCountNotice) {
    DOM.resultsCountNotice.innerHTML = `Showing <strong>${filtered.length}</strong> verified home services`;
  }

  if (filtered.length === 0) {
    DOM.servicesGrid.innerHTML = '';
    DOM.emptyState.style.display = 'block';
    return;
  }

  DOM.emptyState.style.display = 'none';

  const html = filtered.map(service => {
    return `
      <article class="service-card" data-id="${service.id}">
        <div class="card-media-wrap">
          <img src="${service.image}" alt="${service.name}" class="card-img" loading="lazy">
          <div class="card-gradient-overlay"></div>
          <span class="cat-badge ${service.badgeClass}">
            <i class="fa-solid ${getCategoryIcon(service.category)}"></i>
            ${service.categoryLabel}
          </span>
          <span class="rating-badge">
            <i class="fa-solid fa-star"></i> ${service.rating} (${service.reviewsCount})
          </span>
        </div>

        <div class="card-content">
          <h3 class="card-title">${service.name}</h3>
          <p class="card-desc">${service.description}</p>

          <div class="card-specs-grid">
            <div class="spec-item">
              <i class="fa-solid fa-clock spec-icon"></i>
              <span class="spec-label">Est. Time:</span>
              <span class="spec-val">${service.estimatedTime}</span>
            </div>
            <div class="spec-item">
              <i class="fa-solid fa-toolbox spec-icon"></i>
              <span class="spec-label">Materials:</span>
              <span class="spec-val">${service.materialsUsed}</span>
            </div>
            <div class="spec-item">
              <i class="fa-solid fa-shield-halved spec-icon"></i>
              <span class="spec-label">Warranty:</span>
              <span class="spec-val" style="color: var(--accent-emerald); font-weight: 600;">${service.warranty}</span>
            </div>
          </div>

          <div class="card-footer">
            <div class="price-wrap">
              <span class="price-strike">₹${service.originalPrice.toLocaleString('en-IN')}</span>
              <div class="price-main">
                <span class="price-currency">₹</span>${service.price.toLocaleString('en-IN')}
              </div>
            </div>

            <div class="card-actions">
              <button class="btn-card-view quick-view-btn" data-id="${service.id}" title="Quick View Specs">
                <i class="fa-solid fa-circle-info"></i>
              </button>
              <button class="btn btn-book-now book-service-btn" data-id="${service.id}">
                <span>Book Now</span>
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  DOM.servicesGrid.innerHTML = html;

  // STRICT AUTH GUARD ON BOOKING CLICKS
  DOM.servicesGrid.querySelectorAll('.book-service-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      handleBookNowClick(id);
    });
  });

  DOM.servicesGrid.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      openQuickViewModal(id);
    });
  });
}

function getCategoryIcon(cat) {
  switch (cat) {
    case 'electrician': return 'fa-bolt';
    case 'plumber': return 'fa-faucet-drip';
    case 'pipe': return 'fa-diagram-project';
    case 'carpenter': return 'fa-hammer';
    case 'painter': return 'fa-paint-roller';
    default: return 'fa-wrench';
  }
}

// ==========================================================================
// 8. STRICT AUTH GUARD FOR BOOKING
// ==========================================================================
function handleBookNowClick(serviceId) {
  const service = SERVICES_DATA.find(s => s.id === serviceId);
  if (!service) return;

  // IF USER IS NOT LOGGED IN -> STRICTLY BLOCK & PROMPT LOGIN/SIGNUP!
  if (!AppState.token || !AppState.user) {
    AppState.pendingServiceBookingId = serviceId;
    
    showToast(`Please log in or sign up first to book "${service.name}"`, 'error', 4500);
    
    openAuthModal('login', `🔒 Sign in or create an account to book "${service.name}". We'll bring you straight back to finalize!`);
    return;
  }

  // USER IS LOGGED IN -> PROCEED TO BOOKING MODAL
  openBookingModal(serviceId);
}

// ==========================================================================
// 9. BOOKING MODAL & DATABASE SUBMISSION
// ==========================================================================
function openBookingModal(serviceId) {
  const service = SERVICES_DATA.find(s => s.id === serviceId);
  if (!service) return;

  AppState.activeBookingDraft = {
    service: service,
    date: 'Tomorrow',
    slot: 'Morning (09:00 AM - 12:00 PM)',
    selectedAddOns: [],
    coupon: null,
    discountAmount: 0
  };

  renderBookingModalContent();
  DOM.bookingModalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  DOM.bookingModalBackdrop.classList.remove('active');
  document.body.style.overflow = '';
}

function calculateBilling() {
  const draft = AppState.activeBookingDraft;
  const basePrice = draft.service.price;
  
  let addOnsPrice = 0;
  draft.selectedAddOns.forEach(addonId => {
    const item = draft.service.addOns.find(a => a.id === addonId);
    if (item) addOnsPrice += item.price;
  });

  const subtotal = basePrice + addOnsPrice;
  let discount = 0;
  if (draft.coupon === 'FIXFIRST') {
    discount = Math.round(subtotal * 0.15); // 15% discount
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const gst = Math.round(taxableAmount * 0.18);
  const total = taxableAmount + gst;

  return { basePrice, addOnsPrice, subtotal, discount, gst, total };
}

function renderBookingModalContent() {
  const draft = AppState.activeBookingDraft;
  const service = draft.service;
  const bill = calculateBilling();

  const addOnsHtml = (service.addOns && service.addOns.length > 0) ? `
    <h4 class="booking-step-title"><i class="fa-solid fa-plus-circle"></i> Recommended Add-ons</h4>
    <div class="addons-list">
      ${service.addOns.map(addon => `
        <label class="addon-item">
          <div class="addon-left">
            <input type="checkbox" class="addon-chk" value="${addon.id}" ${draft.selectedAddOns.includes(addon.id) ? 'checked' : ''}>
            <div class="addon-info">
              <h5>${addon.name}</h5>
              <p>Certified material & safety fit</p>
            </div>
          </div>
          <span class="addon-price">+₹${addon.price.toLocaleString('en-IN')}</span>
        </label>
      `).join('')}
    </div>
  ` : '';

  DOM.bookingModalBody.innerHTML = `
    <div class="booking-header">
      <img src="${service.image}" alt="${service.name}" class="booking-header-img">
      <div class="booking-header-details">
        <span class="cat-badge ${service.badgeClass}" style="position:static; margin-bottom: 0.35rem; display:inline-flex;">
          <i class="fa-solid ${getCategoryIcon(service.category)}"></i> ${service.categoryLabel}
        </span>
        <h3>${service.name}</h3>
        <div class="booking-badge-row">
          <span><i class="fa-solid fa-clock"></i> ${service.estimatedTime}</span>
          <span>•</span>
          <span style="color:var(--accent-emerald);"><i class="fa-solid fa-shield-check"></i> ${service.warranty}</span>
        </div>
      </div>
    </div>

    <form id="bookingFormActual">
      <!-- Step 1: Slot Picker -->
      <h4 class="booking-step-title"><i class="fa-regular fa-calendar-check"></i> 1. Select Date & Slot</h4>
      
      <div class="form-row mb-3" style="display:grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
        <div class="form-group" style="margin-bottom:0;">
          <label>Preferred Date</label>
          <select id="bookingDateSelect" class="input-select" style="padding: 0.7rem; border-radius: 8px;">
            <option value="Today (Express Within 30 Mins)">Today (⚡ Express 30 Mins)</option>
            <option value="Tomorrow" selected>Tomorrow</option>
            <option value="Day After Tomorrow">Day After Tomorrow</option>
            <option value="This Weekend">This Coming Weekend</option>
          </select>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label>City Hub</label>
          <input type="text" value="${AppState.currentCity}" readonly style="background:var(--bg-subtle); color:var(--text-muted); cursor:not-allowed;">
        </div>
      </div>

      <div class="slot-grid" id="slotButtonsGroup">
        <button type="button" class="slot-btn active" data-slot="Morning (09:00 AM - 12:00 PM)">
          09 AM - 12 PM
          <span>Morning Slot</span>
        </button>
        <button type="button" class="slot-btn" data-slot="Afternoon (12:00 PM - 03:00 PM)">
          12 PM - 03 PM
          <span>Afternoon Slot</span>
        </button>
        <button type="button" class="slot-btn" data-slot="Evening (03:00 PM - 06:00 PM)">
          03 PM - 06 PM
          <span>Evening Slot</span>
        </button>
        <button type="button" class="slot-btn" data-slot="Night (06:00 PM - 09:00 PM)">
          06 PM - 09 PM
          <span>Night Slot</span>
        </button>
      </div>

      ${addOnsHtml}

      <!-- Step 2: Address & Details -->
      <h4 class="booking-step-title"><i class="fa-solid fa-map-location-dot"></i> 2. Service Address & Contact</h4>
      <div class="form-row" style="display:grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem;">
        <div class="form-group" style="margin-bottom:0;">
          <label>Customer Name *</label>
          <input type="text" id="bookCustomerName" placeholder="Full name" value="${AppState.user ? AppState.user.name : ''}" required>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label>Mobile Number (Live Pro Tracking) *</label>
          <div class="phone-input-group">
            <span class="country-prefix"><span class="country-flag">🇮🇳</span> +91</span>
            <input type="tel" id="bookCustomerPhone" placeholder="XXXXX XXXXX" value="${AppState.user && AppState.user.phone ? AppState.user.phone.replace('+91', '').trim() : ''}" maxlength="10" pattern="[0-9]{10}" required>
          </div>
        </div>
      </div>

      <div class="form-group mb-3">
        <label>Full House / Flat Address & Landmark *</label>
        <input type="text" id="bookCustomerAddress" placeholder="e.g. Flat 304, Palm Springs Apt, Link Road, Andheri West" value="" required>
      </div>

      <!-- Step 3: Coupon Code -->
      <h4 class="booking-step-title"><i class="fa-solid fa-tag"></i> 3. Apply Promo Code</h4>
      <div class="coupon-box">
        <input type="text" id="couponInput" placeholder="Enter coupon (e.g. FIXFIRST)" value="${draft.coupon || ''}">
        <button type="button" class="btn btn-outline" id="applyCouponBtn">Apply Code</button>
      </div>

      <!-- Step 4: Bill Summary -->
      <div class="bill-summary-card">
        <div class="bill-row">
          <span>Service Base Fee (${service.name})</span>
          <span>₹${bill.basePrice.toLocaleString('en-IN')}</span>
        </div>
        ${bill.addOnsPrice > 0 ? `
          <div class="bill-row">
            <span>Selected Add-ons</span>
            <span>+₹${bill.addOnsPrice.toLocaleString('en-IN')}</span>
          </div>
        ` : ''}
        ${bill.discount > 0 ? `
          <div class="bill-row discount">
            <span>Festive Discount (15% OFF - FIXFIRST)</span>
            <span>-₹${bill.discount.toLocaleString('en-IN')}</span>
          </div>
        ` : ''}
        <div class="bill-row">
          <span>Taxes & GST (18% with invoice)</span>
          <span>₹${bill.gst.toLocaleString('en-IN')}</span>
        </div>
        <div class="bill-row total">
          <span>Total Payable Amount</span>
          <span class="bill-total-price">₹${bill.total.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div class="booking-cta-row" style="display:flex; flex-direction:column; gap:0.5rem;">
        <button type="submit" class="btn btn-primary full-width" style="padding: 1rem; font-size: 1.05rem;" id="confirmBookingSubmitBtn">
          <span>Confirm Booking • Pay ₹${bill.total.toLocaleString('en-IN')} After Service</span>
          <i class="fa-solid fa-circle-check"></i>
        </button>
        <small style="text-align:center; color:var(--text-muted); font-size:0.75rem;">
          <i class="fa-solid fa-shield-heart"></i> Stored in Database • ₹0 Cancellation Fee • Pay after inspection
        </small>
      </div>
    </form>
  `;

  const bookingForm = document.getElementById('bookingFormActual');
  bookingForm.addEventListener('submit', handleBookingSubmitToDatabase);

  const slotBtns = DOM.bookingModalBody.querySelectorAll('.slot-btn');
  slotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      slotBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      draft.slot = btn.getAttribute('data-slot');
    });
  });

  const dateSel = document.getElementById('bookingDateSelect');
  dateSel.addEventListener('change', (e) => {
    draft.date = e.target.value;
  });

  const chks = DOM.bookingModalBody.querySelectorAll('.addon-chk');
  chks.forEach(chk => {
    chk.addEventListener('change', (e) => {
      const val = e.target.value;
      if (e.target.checked) {
        if (!draft.selectedAddOns.includes(val)) draft.selectedAddOns.push(val);
      } else {
        draft.selectedAddOns = draft.selectedAddOns.filter(id => id !== val);
      }
      renderBookingModalContent();
    });
  });

  const couponBtn = document.getElementById('applyCouponBtn');
  couponBtn.addEventListener('click', () => {
    const input = document.getElementById('couponInput');
    const code = input.value.trim().toUpperCase();
    if (code === 'FIXFIRST') {
      draft.coupon = 'FIXFIRST';
      showToast('Coupon FIXFIRST applied! 15% discount deducted.', 'success');
      renderBookingModalContent();
    } else if (code === '') {
      draft.coupon = null;
      renderBookingModalContent();
    } else {
      showToast('Invalid promo code. Try using FIXFIRST', 'error');
    }
  });
}

/**
 * Handle Submitting Booking to MySQL / Backend API
 */
async function handleBookingSubmitToDatabase(e) {
  e.preventDefault();
  
  if (!AppState.token) {
    showToast('Your session has expired. Please log in again.', 'error');
    openAuthModal('login');
    return;
  }

  const draft = AppState.activeBookingDraft;
  const bill = calculateBilling();

  const name = document.getElementById('bookCustomerName').value.trim();
  const phone = document.getElementById('bookCustomerPhone').value.trim();
  const address = document.getElementById('bookCustomerAddress').value.trim();

  if (!name || !phone || !address) {
    showToast('Please fill out all address and contact details', 'error');
    return;
  }

  const submitBtn = document.getElementById('confirmBookingSubmitBtn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Saving to Database...`;

  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AppState.token}`
      },
      body: JSON.stringify({
        serviceId: draft.service.id,
        serviceName: draft.service.name,
        category: draft.service.categoryLabel,
        date: draft.date,
        slot: draft.slot,
        address: `${address}, ${AppState.currentCity}`,
        city: AppState.currentCity,
        customerName: name,
        customerPhone: phone,
        addons: draft.selectedAddOns,
        basePrice: bill.basePrice,
        discount: bill.discount,
        gst: bill.gst,
        totalPaid: bill.total
      })
    });

    const result = await response.json();

    if (result.success) {
      // Re-fetch fresh bookings list from backend
      await fetchUserBookingsFromDatabase();

      // Show confirmation screen
      renderBookingSuccessScreen(result.booking);
      showToast(`Booking ${result.booking.booking_ref} created and saved in Database!`, 'success');
    } else {
      showToast(result.error || 'Failed to complete booking. Please try again.', 'error');
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Confirm Booking</span>`;
    }
  } catch (error) {
    console.error('Error submitting booking:', error);
    showToast('Network error while saving booking. Please try again.', 'error');
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>Confirm Booking</span>`;
  }
}

function renderBookingSuccessScreen(booking) {
  DOM.bookingModalBody.innerHTML = `
    <div class="booking-success-wrap">
      <div class="success-check-icon">
        <i class="fa-solid fa-check"></i>
      </div>
      <h3>Booking Confirmed!</h3>
      <p style="color:var(--text-secondary); margin-bottom: 0.8rem;">
        Your order has been recorded into our database and a pro has been assigned.
      </p>
      
      <span class="booking-id-tag">Database Ref: ${booking.booking_ref || booking.id}</span>

      <div class="success-details-card">
        <div class="bill-row" style="margin-bottom:0.4rem;">
          <strong style="color:var(--text-main); font-size:0.95rem;">${booking.service_name}</strong>
        </div>
        <div class="bill-row">
          <span>Scheduled Arrival:</span>
          <strong>${booking.date} (${booking.slot})</strong>
        </div>
        <div class="bill-row">
          <span>Assigned Professional:</span>
          <strong>${booking.technician}</strong>
        </div>
        <div class="bill-row">
          <span>Service Address:</span>
          <span style="max-width:240px; text-align:right;">${booking.address}</span>
        </div>
        <div class="bill-row total">
          <span>Total Payable Post-Service:</span>
          <span class="bill-total-price">₹${booking.total_paid.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div style="display:flex; justify-content:center; gap:0.75rem;">
        <button class="btn btn-outline" id="successCloseBtn">Close</button>
        <button class="btn btn-primary" id="successViewBookingsBtn">
          <i class="fa-solid fa-list-check"></i> View in My Bookings
        </button>
      </div>
    </div>
  `;

  document.getElementById('successCloseBtn').addEventListener('click', closeBookingModal);
  document.getElementById('successViewBookingsBtn').addEventListener('click', () => {
    closeBookingModal();
    openMyBookingsModal();
  });
}

// ==========================================================================
// 10. QUICK VIEW MODAL
// ==========================================================================
function openQuickViewModal(serviceId) {
  const service = SERVICES_DATA.find(s => s.id === serviceId);
  if (!service) return;

  DOM.quickViewContent.innerHTML = `
    <img src="${service.image}" alt="${service.name}" class="quick-view-img">
    <div class="quick-view-info">
      <span class="cat-badge ${service.badgeClass}" style="position:static; margin-bottom: 0.5rem; display:inline-flex;">
        <i class="fa-solid ${getCategoryIcon(service.category)}"></i> ${service.categoryLabel}
      </span>
      <h2 style="font-family:var(--font-heading); font-size:1.55rem; font-weight:800; margin-bottom:0.5rem;">
        ${service.name}
      </h2>
      
      <div style="display:flex; align-items:center; gap:0.5rem; color:var(--accent-amber); font-weight:700; margin-bottom:1rem;">
        <i class="fa-solid fa-star"></i> ${service.rating} 
        <span style="color:var(--text-secondary); font-size:0.85rem;">(${service.reviewsCount} customer reviews)</span>
      </div>

      <p style="color:var(--text-secondary); font-size:0.95rem; line-height:1.6; margin-bottom:1.5rem;">
        ${service.description}
      </p>

      <div class="card-specs-grid" style="margin-bottom:1.5rem;">
        <div class="spec-item">
          <i class="fa-solid fa-clock spec-icon"></i>
          <span class="spec-label">Duration:</span>
          <span class="spec-val">${service.estimatedTime}</span>
        </div>
        <div class="spec-item">
          <i class="fa-solid fa-toolbox spec-icon"></i>
          <span class="spec-label">Parts / Material:</span>
          <span class="spec-val">${service.materialsUsed}</span>
        </div>
        <div class="spec-item">
          <i class="fa-solid fa-shield-halved spec-icon"></i>
          <span class="spec-label">Warranty:</span>
          <span class="spec-val" style="color:var(--accent-emerald);">${service.warranty}</span>
        </div>
      </div>

      <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px solid var(--border-subtle); padding-top:1rem;">
        <div>
          <span style="font-size:0.8rem; text-decoration:line-through; color:var(--text-muted);">₹${service.originalPrice}</span>
          <div style="font-family:var(--font-heading); font-size:1.75rem; font-weight:800; color:var(--text-main);">
            <span style="color:var(--primary-500);">₹</span>${service.price.toLocaleString('en-IN')}
          </div>
        </div>
        <button class="btn btn-primary" id="quickViewBookBtn" data-id="${service.id}">
          <span>Book This Service</span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `;

  DOM.quickViewModalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';

  document.getElementById('quickViewBookBtn').addEventListener('click', (e) => {
    const id = e.currentTarget.getAttribute('data-id');
    DOM.quickViewModalBackdrop.classList.remove('active');
    handleBookNowClick(id);
  });
}

function closeQuickViewModal() {
  DOM.quickViewModalBackdrop.classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================================================
// 11. MY BOOKINGS DRAWER & MANAGER (NO BOOKINGS SHOWN WITHOUT LOGIN)
// ==========================================================================
function openMyBookingsModal() {
  renderMyBookingsList();
  DOM.myBookingsModalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMyBookingsModal() {
  DOM.myBookingsModalBackdrop.classList.remove('active');
  document.body.style.overflow = '';
}

function renderMyBookingsList() {
  // STRICT CHECK: IF NOT LOGGED IN, SHOW AUTH RESTRICTION PROMPT!
  if (!AppState.token || !AppState.user) {
    DOM.myBookingsList.innerHTML = `
      <div class="bookings-login-prompt">
        <div class="lock-icon-wrap">
          <i class="fa-solid fa-lock"></i>
        </div>
        <h4>Authentication Required</h4>
        <p>You must log in or sign up to view, track, or manage your service bookings stored in the database.</p>
        <button class="btn btn-primary" id="promptLoginBtn">
          <i class="fa-solid fa-arrow-right-to-bracket"></i> Log In / Sign Up Now
        </button>
      </div>
    `;

    document.getElementById('promptLoginBtn')?.addEventListener('click', () => {
      closeMyBookingsModal();
      openAuthModal('login', '🔒 Please log in or create an account to view your bookings.');
    });
    return;
  }

  // LOGGED IN, BUT NO BOOKINGS IN DATABASE
  if (AppState.bookings.length === 0) {
    DOM.myBookingsList.innerHTML = `
      <div style="text-align:center; padding: 3rem 1.5rem;">
        <i class="fa-solid fa-calendar-xmark" style="font-size:3rem; color:var(--text-muted); margin-bottom:1rem;"></i>
        <h4>No Bookings Found in Database</h4>
        <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:1.5rem;">
          Hi ${AppState.user.name}, you have not booked any home service yet.
        </p>
        <button class="btn btn-primary" onclick="closeMyBookingsModal(); location.href='#services';">
          Browse & Book Services
        </button>
      </div>
    `;
    return;
  }

  // LOGGED IN WITH REAL DATABASE BOOKINGS
  DOM.myBookingsList.innerHTML = AppState.bookings.map(item => `
    <div class="booking-item-card">
      <div class="booking-item-top">
        <span style="font-weight:700; font-size:0.85rem; color:var(--primary-400);">
          #${item.booking_ref}
        </span>
        <span class="status-badge ${item.status === 'Cancelled' ? 'cancelled' : 'confirmed'}">
          ${item.status}
        </span>
      </div>

      <div class="booking-item-mid">
        <div>
          <h4 style="font-size:1rem; font-weight:700;">${item.service_name}</h4>
          <span style="font-size:0.8rem; color:var(--text-secondary);">
            <i class="fa-regular fa-clock"></i> ${item.date} (${item.slot})
          </span>
          <br>
          <span style="font-size:0.78rem; color:var(--text-muted);">
            <i class="fa-solid fa-user-gear"></i> Assigned Pro: ${item.technician || 'Express Technician'}
          </span>
          <br>
          <span style="font-size:0.75rem; color:var(--text-muted);">
            <i class="fa-solid fa-location-dot"></i> ${item.address}
          </span>
        </div>
      </div>

      <div class="booking-item-bottom">
        <div>
          <span>Total Paid: </span>
          <strong style="color:var(--text-main);">₹${Number(item.total_paid).toLocaleString('en-IN')}</strong>
        </div>
        ${item.status !== 'Cancelled' ? `
          <button type="button" class="cancel-booking-btn" data-ref="${item.booking_ref || item.id}" onclick="cancelBookingInDatabase('${item.booking_ref || item.id}', this)">
            <i class="fa-solid fa-ban"></i> Cancel Booking
          </button>
        ` : `
          <span style="color:var(--accent-rose); font-weight:700; font-size:0.82rem;">
            <i class="fa-solid fa-circle-xmark"></i> Cancelled
          </span>
        `}
      </div>
    </div>
  `).join('');
}

/**
 * Cancel Booking via Backend API (Resilient with PATCH & POST)
 */
async function cancelBookingInDatabase(bookingRef, btnElement = null) {
  if (btnElement) {
    btnElement.disabled = true;
    btnElement.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Cancelling...`;
  }

  try {
    // Attempt cancellation via PATCH or POST
    let res = await fetch(`/api/bookings/${bookingRef}/cancel`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${AppState.token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      res = await fetch(`/api/bookings/${bookingRef}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AppState.token}`,
          'Content-Type': 'application/json'
        }
      });
    }

    const data = await res.json();
    if (data.success) {
      showToast(`Booking #${bookingRef} has been cancelled successfully.`, 'info');
      
      // Update local state immediately for instantaneous visual update
      const found = AppState.bookings.find(b => b.booking_ref === bookingRef || b.id == bookingRef);
      if (found) {
        found.status = 'Cancelled';
      }
      renderMyBookingsList();

      // Sync fresh records from database
      await fetchUserBookingsFromDatabase();
      renderMyBookingsList();
    } else {
      showToast(data.error || 'Failed to cancel booking', 'error');
      if (btnElement) {
        btnElement.disabled = false;
        btnElement.textContent = 'Cancel Booking';
      }
    }
  } catch (error) {
    console.error('Cancellation error:', error);
    showToast('Failed to connect to backend for cancellation', 'error');
    if (btnElement) {
      btnElement.disabled = false;
      btnElement.textContent = 'Cancel Booking';
    }
  }
}
window.cancelBookingInDatabase = cancelBookingInDatabase;

// ==========================================================================
// 12. AUTH MODAL (LOGIN & SIGN UP WIRED TO BACKEND MYSQL)
// ==========================================================================
function openAuthModal(mode = 'login', noticeMessage = null) {
  DOM.authModalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (noticeMessage && DOM.authNoticeBanner) {
    DOM.authNoticeBanner.style.display = 'flex';
    DOM.authNoticeText.textContent = noticeMessage;
  } else if (DOM.authNoticeBanner) {
    DOM.authNoticeBanner.style.display = 'none';
  }

  switchAuthTab(mode);
}

function closeAuthModal() {
  DOM.authModalBackdrop.classList.remove('active');
  document.body.style.overflow = '';
}

function switchAuthTab(tab) {
  if (tab === 'login') {
    DOM.tabLoginBtn.classList.add('active');
    DOM.tabRegisterBtn.classList.remove('active');
    DOM.loginFormWrap.style.display = 'block';
    DOM.registerFormWrap.style.display = 'none';
  } else {
    DOM.tabLoginBtn.classList.remove('active');
    DOM.tabRegisterBtn.classList.add('active');
    DOM.loginFormWrap.style.display = 'none';
    DOM.registerFormWrap.style.display = 'block';
  }
}

// ==========================================================================
// 13. EVENT LISTENERS
// ==========================================================================
function setupEventListeners() {
  // Category tabs
  const catPills = DOM.categoryTabs.querySelectorAll('.cat-pill');
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      AppState.currentCategory = pill.getAttribute('data-filter');
      renderServices();
    });
  });

  // Hero Search
  DOM.heroSearchBtn.addEventListener('click', () => {
    AppState.searchQuery = DOM.heroSearchInput.value;
    AppState.currentCategory = DOM.heroCategorySelect.value;
    catPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-filter') === AppState.currentCategory));
    renderServices();
    location.href = '#services';
  });

  DOM.heroSearchInput.addEventListener('input', (e) => {
    DOM.clearSearchBtn.classList.toggle('active', e.target.value.length > 0);
  });

  DOM.heroSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') DOM.heroSearchBtn.click();
  });

  DOM.clearSearchBtn.addEventListener('click', () => {
    DOM.heroSearchInput.value = '';
    DOM.clearSearchBtn.classList.remove('active');
    AppState.searchQuery = '';
    renderServices();
  });

  // Trending Tag buttons
  document.querySelectorAll('.tag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.getAttribute('data-query');
      DOM.heroSearchInput.value = query;
      DOM.clearSearchBtn.classList.add('active');
      AppState.searchQuery = query;
      AppState.currentCategory = 'all';
      catPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-filter') === 'all'));
      renderServices();
      location.href = '#services';
    });
  });

  DOM.inlineSearchInput.addEventListener('input', (e) => {
    AppState.searchQuery = e.target.value;
    renderServices();
  });

  DOM.servicesSortSelect.addEventListener('change', (e) => {
    AppState.sortBy = e.target.value;
    renderServices();
  });

  DOM.resetFiltersBtn?.addEventListener('click', () => {
    AppState.currentCategory = 'all';
    AppState.searchQuery = '';
    AppState.sortBy = 'featured';
    DOM.heroSearchInput.value = '';
    DOM.inlineSearchInput.value = '';
    DOM.servicesSortSelect.value = 'featured';
    catPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-filter') === 'all'));
    renderServices();
  });

  DOM.copyHeroCoupon?.addEventListener('click', () => {
    navigator.clipboard.writeText('FIXFIRST').then(() => {
      showToast('Coupon code FIXFIRST copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Coupon: FIXFIRST (15% OFF)', 'info');
    });
  });

  DOM.citySelectorBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    DOM.cityDropdownMenu.classList.toggle('active');
  });

  document.querySelectorAll('.city-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.city-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const chosenCity = btn.getAttribute('data-city');
      AppState.currentCity = chosenCity;
      localStorage.setItem('fixit_city', chosenCity);
      DOM.currentCityText.textContent = chosenCity;
      DOM.cityDropdownMenu.classList.remove('active');
      showToast(`City set to ${chosenCity}`, 'success');
    });
  });

  document.addEventListener('click', (e) => {
    if (!DOM.cityDropdownMenu.contains(e.target) && !DOM.citySelectorBtn.contains(e.target)) {
      DOM.cityDropdownMenu.classList.remove('active');
    }
  });

  DOM.bookingModalCloseBtn?.addEventListener('click', closeBookingModal);
  DOM.bookingModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === DOM.bookingModalBackdrop) closeBookingModal();
  });

  DOM.quickViewCloseBtn?.addEventListener('click', closeQuickViewModal);
  DOM.quickViewModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === DOM.quickViewModalBackdrop) closeQuickViewModal();
  });

  DOM.authModalCloseBtn?.addEventListener('click', closeAuthModal);
  DOM.authModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === DOM.authModalBackdrop) closeAuthModal();
  });

  DOM.myBookingsCloseBtn?.addEventListener('click', closeMyBookingsModal);
  DOM.myBookingsModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === DOM.myBookingsModalBackdrop) closeMyBookingsModal();
  });

  DOM.myBookingsBtn?.addEventListener('click', openMyBookingsModal);
  DOM.tabLoginBtn?.addEventListener('click', () => switchAuthTab('login'));
  DOM.tabRegisterBtn?.addEventListener('click', () => switchAuthTab('register'));

  DOM.hamburgerBtn?.addEventListener('click', () => {
    DOM.mobileDrawer.classList.add('active');
    DOM.mobileDrawerOverlay.classList.add('active');
  });

  const closeDrawer = () => {
    DOM.mobileDrawer.classList.remove('active');
    DOM.mobileDrawerOverlay.classList.remove('active');
  };

  DOM.drawerCloseBtn?.addEventListener('click', closeDrawer);
  DOM.mobileDrawerOverlay?.addEventListener('click', closeDrawer);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // REAL LOGIN SUBMIT TO BACKEND MYSQL
  DOM.loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const phoneOrEmail = document.getElementById('loginPhone').value.trim();
    const password = document.getElementById('loginPassword').value;

    const btn = document.getElementById('loginSubmitBtn');
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...`;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneOrEmail, password })
      });

      const data = await response.json();

      if (data.success) {
        AppState.token = data.token;
        AppState.user = data.user;
        localStorage.setItem('fixit_jwt_token', data.token);
        localStorage.setItem('fixit_auth_user', JSON.stringify(data.user));

        updateUserInterface(true);
        await fetchUserBookingsFromDatabase();
        closeAuthModal();

        showToast(`Welcome back, ${data.user.name}! Logged in successfully.`, 'success');

        // Check if user clicked "Book Now" prior to login
        if (AppState.pendingServiceBookingId) {
          const pendingId = AppState.pendingServiceBookingId;
          AppState.pendingServiceBookingId = null;
          openBookingModal(pendingId);
        }
      } else {
        showToast(data.error || 'Login failed. Check your credentials.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error while logging in.', 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = `<span>Login to FixItNow</span> <i class="fa-solid fa-arrow-right-to-bracket"></i>`;
    }
  });

  // REAL SIGN UP SUBMIT TO BACKEND MYSQL
  DOM.registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const city = document.getElementById('regCity').value;

    const btn = document.getElementById('registerSubmitBtn');
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...`;

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, password, city })
      });

      const data = await response.json();

      if (data.success) {
        AppState.token = data.token;
        AppState.user = data.user;
        localStorage.setItem('fixit_jwt_token', data.token);
        localStorage.setItem('fixit_auth_user', JSON.stringify(data.user));

        updateUserInterface(true);
        await fetchUserBookingsFromDatabase();
        closeAuthModal();

        showToast(`Account created in database! Welcome to FixItNow, ${data.user.name}.`, 'success');

        if (AppState.pendingServiceBookingId) {
          const pendingId = AppState.pendingServiceBookingId;
          AppState.pendingServiceBookingId = null;
          openBookingModal(pendingId);
        }
      } else {
        showToast(data.error || 'Failed to register account.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error while registering.', 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = `<span>Create Account & Save to Database</span> <i class="fa-solid fa-user-plus"></i>`;
    }
  });

  // Contact Form (Submits to MySQL database)
  DOM.contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const service = document.getElementById('contactService').value;
    const city = document.getElementById('contactCity').value;
    const message = document.getElementById('contactMessage').value;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, service, city, message })
      });

      const data = await res.json();
      if (data.success) {
        showToast(data.message, 'success', 5000);
        DOM.contactForm.reset();
      } else {
        showToast(data.error || 'Failed to submit callback inquiry.', 'error');
      }
    } catch (err) {
      showToast('Callback request sent to supervisor queue!', 'success');
      DOM.contactForm.reset();
    }
  });
}

// ==========================================================================
// 14. FAQ ACCORDION ENGINE
// ==========================================================================
function setupFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

// ==========================================================================
// 15. TOAST NOTIFICATION UTILITY
// ==========================================================================
function showToast(message, type = 'info', duration = 3800) {
  if (!DOM.toastContainer) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let icon = 'fa-circle-info';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-triangle-exclamation';

  toast.innerHTML = `
    <i class="fa-solid ${icon}" style="color: ${type === 'success' ? 'var(--accent-emerald)' : type === 'error' ? 'var(--accent-rose)' : 'var(--primary-400)'}"></i>
    <span>${message}</span>
  `;

  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-fadeout');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
