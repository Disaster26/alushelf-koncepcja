(function(){
var top=document.getElementById('top'),b=top.querySelector('.burger'),menu=document.getElementById('menu');
function sc(){top.classList.toggle('sc',window.scrollY>8)}sc();window.addEventListener('scroll',sc,{passive:true});
b.addEventListener('click',function(){var o=top.classList.toggle('open');b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu')});
menu.addEventListener('click',function(e){if(e.target.closest('a')){top.classList.remove('open');b.setAttribute('aria-expanded','false')}});
/* aktywna pozycja menu */
var links=[].slice.call(menu.querySelectorAll('a[href^="#"]:not(.btn)'));
var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))}).filter(Boolean);
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+x.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});secs.forEach(function(s){io.observe(s)})}
/* karuzela: palec, mysz, strzalki */
var t=document.getElementById('tor'),w=document.getElementById('wstecz'),d=document.getElementById('dalej');
function krok(){var k=t.querySelector('.kar');return k?k.getBoundingClientRect().width+parseFloat(getComputedStyle(t).columnGap||16):300}
function st(){w.disabled=t.scrollLeft<4;d.disabled=t.scrollLeft+t.clientWidth>=t.scrollWidth-4}
w.addEventListener('click',function(){t.scrollBy({left:-krok(),behavior:'smooth'})});
d.addEventListener('click',function(){t.scrollBy({left:krok(),behavior:'smooth'})});
t.addEventListener('scroll',st,{passive:true});window.addEventListener('resize',st);st();
var down=false,sx=0,sl=0,moved=false;
t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=t.scrollLeft});
window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){moved=true;t.classList.add('drag')}t.scrollLeft=sl-dx});
window.addEventListener('pointerup',function(){if(!down)return;down=false;if(moved){var k=krok(),i=Math.round(t.scrollLeft/k);t.classList.remove('drag');t.scrollTo({left:i*k,behavior:'smooth'})}});
t.addEventListener('dragstart',function(e){e.preventDefault()});
/* formularz pokazowy */
var f=document.getElementById('form');f.addEventListener('submit',function(e){e.preventDefault();document.getElementById('ok').hidden=false});
document.getElementById('rok').textContent=new Date().getFullYear();
})();
