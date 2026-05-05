const topnav=document.getElementById('topnav');window.addEventListener('scroll',()=>{topnav.classList.toggle('scrolled',window.scrollY>60);},{passive:true});
const hamburger=document.getElementById('hamburger'),drawer=document.getElementById('drawer'),scrim=document.getElementById('scrim');
function toggleDrawer(){const o=drawer.classList.toggle('open');hamburger.classList.toggle('open',o);scrim.classList.toggle('open',o);hamburger.setAttribute('aria-expanded',o);drawer.setAttribute('aria-hidden',!o);drawer.toggleAttribute('inert',!o);document.body.style.overflow=o?'hidden':'';}
function closeDrawer(){drawer.classList.remove('open');hamburger.classList.remove('open');scrim.classList.remove('open');hamburger.setAttribute('aria-expanded','false');drawer.setAttribute('aria-hidden','true');drawer.setAttribute('inert','');document.body.style.overflow='';}
hamburger.addEventListener('click',toggleDrawer);scrim.addEventListener('click',closeDrawer);drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeDrawer));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer();});
const logoTop=document.getElementById('logoTop'),dockMark=document.getElementById('dockMark');
function goHome(){if(window.location.pathname.endsWith('index.html')||window.location.pathname==='/'||window.location.pathname===''){window.scrollTo({top:0,behavior:'smooth'});}else{window.location.href='index.html';}}
if(logoTop)logoTop.addEventListener('click',goHome);if(dockMark)dockMark.addEventListener('click',goHome);
document.querySelectorAll('[data-eu][data-ed]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();window.location.href='mailto:'+a.dataset.eu+'@'+a.dataset.ed;});});
const availBadge=document.getElementById('availBadge');
if(availBadge){const saved=localStorage.getItem('drh-available');applyAvailability(saved===null?true:saved==='true');availBadge.addEventListener('click',()=>{const next=availBadge.dataset.available!=='true';applyAvailability(next);localStorage.setItem('drh-available',String(next));});availBadge.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();availBadge.click();}});}
function applyAvailability(on){if(!availBadge)return;availBadge.dataset.available=on?'true':'false';availBadge.setAttribute('aria-pressed',String(on));const txt=availBadge.querySelector('.avail-text');if(txt)txt.textContent=on?'Available for work':'Currently unavailable';}
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:0.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const sections=['about','photography','work','skills','contact'].map(id=>document.getElementById(id));
const dockLinks=document.querySelectorAll('.dock__link');
let sectionTops=[];
function cacheSectionTops(){sectionTops=sections.map(sec=>sec?sec.offsetTop:0);}
requestAnimationFrame(cacheSectionTops);
window.addEventListener('resize',()=>requestAnimationFrame(cacheSectionTops),{passive:true});
function updateActiveDock(){let activeId='about';const y=window.scrollY+window.innerHeight*0.35;sections.forEach((sec,i)=>{if(sec&&sectionTops[i]<=y)activeId=sec.id;});dockLinks.forEach(l=>{l.classList.toggle('active',l.getAttribute('href')==='#'+activeId);});}
window.addEventListener('scroll',updateActiveDock,{passive:true});updateActiveDock();
