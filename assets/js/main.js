// Scrolled state on top nav
const topnav = document.getElementById('topnav');
window.addEventListener('scroll', () => {
  topnav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Hamburger / drawer
const hamburger = document.getElementById('hamburger');
const drawer    = document.getElementById('drawer');
const scrim     = document.getElementById('scrim');
function toggleDrawer() {
  const isOpen = drawer.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  scrim.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  drawer.setAttribute('aria-hidden', !isOpen);
  drawer.toggleAttribute('inert', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}
function closeDrawer() {
  drawer.classList.remove('open');
  hamburger.classList.remove('open');
  scrim.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  drawer.setAttribute('aria-hidden', 'true');
  drawer.setAttribute('inert', '');
  document.body.style.overflow = '';
}
hamburger.addEventListener('click', toggleDrawer);
scrim.addEventListener('click', closeDrawer);
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

// Logo doubles as back-to-top
const logoTop  = document.getElementById('logoTop');
const dockMark = document.getElementById('dockMark');
function goHome() {
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    window.location.href = 'index.html';
  }
}
if (logoTop)  logoTop.addEventListener('click', goHome);
if (dockMark) dockMark.addEventListener('click', goHome);

// Email obfuscation — assemble mailto: only on click so the address
// never appears as a scrapable string in the static HTML.
document.querySelectorAll('[data-eu][data-ed]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const u = a.dataset.eu, d = a.dataset.ed;
    window.location.href = 'mailto:' + u + '@' + d;
  });
});

// Availability badge — click to toggle on/off, persisted in localStorage
const availBadge = document.getElementById('availBadge');
if (availBadge) {
  const saved   = localStorage.getItem('drh-available');
  const initial = saved === null ? true : saved === 'true';
  applyAvailability(initial);
  availBadge.addEventListener('click', () => {
    const next = availBadge.dataset.available !== 'true';
    applyAvailability(next);
    localStorage.setItem('drh-available', String(next));
  });
  availBadge.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      availBadge.click();
    }
  });
}
function applyAvailability(on) {
  if (!availBadge) return;
  availBadge.dataset.available = on ? 'true' : 'false';
  availBadge.setAttribute('aria-pressed', String(on));
  const txt = availBadge.querySelector('.avail-text');
  if (txt) txt.textContent = on ? 'Available for work' : 'Currently unavailable';
}

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Dock active link (scroll spy)
const sections  = ['about','photography','work','skills','contact'].map(id => document.getElementById(id));
const dockLinks = document.querySelectorAll('.dock__link');
function updateActiveDock() {
  let activeId = 'about';
  const y = window.scrollY + window.innerHeight * 0.35;
  sections.forEach(sec => {
    if (sec && sec.offsetTop <= y) activeId = sec.id;
  });
  dockLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + activeId);
  });
}
window.addEventListener('scroll', updateActiveDock, { passive: true });
updateActiveDock();
