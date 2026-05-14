(function(){
"use strict";

var deck=document.getElementById('deck');
var body=document.body;
var total=SLIDES.length;
var cur=0;
var inOutro=false;
var transitioning=false;

// ═══ BUILD SLIDES ═══
SLIDES.forEach(function(s,i){
  var el=document.createElement('div');
  el.className='slide';
  el.id='s'+i;
  el.innerHTML=s;
  deck.appendChild(el);
});

// ═══ NAV DOTS ═══
var dotsNav=document.getElementById('nav-dots');
var dots=[];
SLIDES.forEach(function(_,i){
  var d=document.createElement('button');
  d.className='dot';
  d.setAttribute('aria-label','Slide '+(i+1));
  d.addEventListener('click',function(){
    if(!transitioning&&!inOutro&&i!==cur) goTo(i);
  });
  dotsNav.appendChild(d);
  dots.push(d);
});

document.getElementById('st').textContent=total;

// ═══ SHOW SLIDE ═══
function showSlide(idx,dir){
  if(idx<0||idx>=total) return;
  var prevEl=document.getElementById('s'+cur);
  var next=document.getElementById('s'+idx);

  transitioning=true;

  var exitCls=dir>0?'exit-fwd':'exit-bk';
  var enterCls=dir>0?'enter-fwd':'enter-bk';

  // only exit the previous slide if it's a different slide that is currently shown
  if(prevEl&&prevEl!==next&&prevEl.classList.contains('active')){
    prevEl.classList.add(exitCls);
    setTimeout(function(){
      prevEl.classList.remove('active');
      prevEl.classList.remove(exitCls);
    },460);
  }

  cur=idx;
  next.scrollTop=0;
  next.classList.add(enterCls);
  void next.offsetWidth;
  next.classList.add('active');
  setTimeout(function(){
    next.classList.remove(enterCls);
    transitioning=false;
  },540);

  updateUI();
}

function goTo(idx){
  if(idx===cur) return;
  showSlide(idx,idx>cur?1:-1);
}

// ═══ NAVIGATION ═══
function advance(){
  if(inOutro||transitioning) return;
  if(cur<total-1){
    showSlide(cur+1,1);
  } else {
    showOutro();
  }
}

function goBack(){
  if(inOutro){ hideOutro(); return; }
  if(transitioning) return;
  if(cur>0) showSlide(cur-1,-1);
}

// ═══ UPDATE UI ═══
function updateUI(){
  document.getElementById('sn').textContent=cur+1;
  var pct=((cur+1)/total)*100;
  document.getElementById('progress-fill').style.width=pct+'%';
  dots.forEach(function(d,i){ d.classList.toggle('active',i===cur); });
  var btnPrev=document.getElementById('btn-prev');
  var btnNext=document.getElementById('btn-next');
  if(btnPrev) btnPrev.disabled=(cur===0&&!inOutro);
  if(btnNext) btnNext.disabled=false;
}

// ═══ OUTRO ═══
var macOutro=document.getElementById('mac-outro');
var outroBack=document.getElementById('outro-back');

var MAC_SRC='./MAC.html';

function showOutro(){
  inOutro=true;
  // Reload MAC.html every time so the morph animation replays from scratch
  var fr=document.getElementById('mac-frame');
  if(fr){ fr.src=''; setTimeout(function(){ fr.src=MAC_SRC; },30); }
  if(macOutro) macOutro.classList.add('show');
  updateUI();
}
function hideOutro(){
  inOutro=false;
  // Blank the iframe immediately so it's clean for next show
  var fr=document.getElementById('mac-frame');
  if(fr) fr.src='';
  if(macOutro) macOutro.classList.remove('show');
  updateUI();
}
if(outroBack) outroBack.addEventListener('click',hideOutro);

// ═══ FULLSCREEN ═══
function tryFullscreen(){
  var el=document.documentElement;
  if(!document.fullscreenElement){
    if(el.requestFullscreen) el.requestFullscreen();
    else if(el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if(el.msRequestFullscreen) el.msRequestFullscreen();
  } else {
    if(document.exitFullscreen) document.exitFullscreen();
    else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
  }
}

// ═══ GLOBE PRELOADER ═══
var globeOverlay=document.getElementById('globe-overlay');
var globeCatcher=document.getElementById('globe-catcher');
var globePlayed=sessionStorage.getItem('macGlobePlayed');

function endGlobe(){
  if(!globeOverlay||globeOverlay.style.display==='none') return;
  sessionStorage.setItem('macGlobePlayed','1');
  globeOverlay.classList.add('hide');
  setTimeout(function(){
    globeOverlay.style.display='none';
    showSlide(0,1);
    tryFullscreen();
  },950);
}

if(globeOverlay&&!globePlayed){
  if(globeCatcher) globeCatcher.addEventListener('click',endGlobe);
} else {
  if(globeOverlay) globeOverlay.style.display='none';
  showSlide(0,1);
}

// ═══ KEYBOARD ═══
document.addEventListener('keydown',function(e){
  if(globeOverlay&&globeOverlay.style.display!=='none'){ endGlobe(); return; }
  switch(e.key){
    case 'ArrowRight': case ' ': case 'Enter': case 'ArrowDown': case 'PageDown':
      e.preventDefault(); advance(); break;
    case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
      e.preventDefault(); goBack(); break;
    case 'f': case 'F':
      tryFullscreen(); break;
    case 'Escape':
      if(inOutro) hideOutro(); break;
  }
});

// ═══ BUTTON WIRING ═══
var btnPrev=document.getElementById('btn-prev');
var btnNext=document.getElementById('btn-next');
if(btnPrev) btnPrev.addEventListener('click',goBack);
if(btnNext) btnNext.addEventListener('click',advance);

// ═══ TOUCH SWIPE ═══
var tx=0;
document.addEventListener('touchstart',function(e){ tx=e.touches[0].clientX; },{passive:true});
document.addEventListener('touchend',function(e){
  var dx=e.changedTouches[0].clientX-tx;
  if(Math.abs(dx)>50){ dx<0?advance():goBack(); }
},{passive:true});

// ═══ HIDE NAV HINT ═══
setTimeout(function(){
  var h=document.getElementById('nav-hint');
  if(h) h.style.opacity='0';
},6000);

})();
