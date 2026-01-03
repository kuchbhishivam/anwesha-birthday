// slideshow
const photoEl = document.getElementById('photo');
let idx = 0;
function show(i){
  if(!photos || photos.length===0) return;
  idx = (i + photos.length) % photos.length;
  photoEl.src = photos[idx];
}
document.getElementById('prev').addEventListener('click', ()=> show(idx-1));
document.getElementById('next').addEventListener('click', ()=> show(idx+1));

// autoplay
let playing=false, timer=null;
const playBtn = document.getElementById('play');
if (playBtn){
  playBtn.addEventListener('click', ()=>{
    if(!playing){
      playing=true; playBtn.textContent='Pause ⏸';
      timer=setInterval(()=>show(idx+1), 2800);
    }else{
      playing=false; playBtn.textContent='Play Slideshow ▶';
      clearInterval(timer);
    }
  });
}

// confetti
document.getElementById('celebrate').addEventListener('click', ()=>{
  burstConfetti();
  startPetals();
});

function burstConfetti(){
  const container = document.getElementById('confetti');
  container.innerHTML='';
  for(let i=0;i<70;i++){
    const el = document.createElement('div');
    el.className='piece';
    el.style.left = Math.random()*100 + '%';
    el.style.background = ['#ff6fa3','#ffd166','#9ad3bc','#ffd1dc'][Math.floor(Math.random()*4)];
    el.style.transform = `translateY(-20vh) rotate(${Math.random()*360}deg)`;
    el.style.opacity = '1';
    el.style.width = (6+Math.random()*10)+'px';
    el.style.height = (10+Math.random()*12)+'px';
    el.style.top = (Math.random()*30)+'%';
    el.style.animation = `fall ${2+Math.random()*2.5}s linear forwards`;
    container.appendChild(el);
  }
  const s = document.createElement('style');
  s.innerHTML = `@keyframes fall{to{transform:translateY(120vh) rotate(360deg);opacity:0}}`;
  document.head.appendChild(s);
}

// floating petals (feel-like-real)
let petalsTimer=null;
function startPetals(){
  const area = document.getElementById('petals');
  area.innerHTML='';
  let count = 0;
  petalsTimer && clearInterval(petalsTimer);
  petalsTimer = setInterval(()=>{
    if(count>50){ clearInterval(petalsTimer); return; }
    const p = document.createElement('div');
    p.className='petal';
    p.style.left = Math.random()*100 + '%';
    p.style.top = '-5%';
    const rot = Math.random()*360;
    const dur = 5 + Math.random()*4;
    p.style.transform = `rotate(${rot}deg)`;
    p.style.animation = `petalFall ${dur}s linear forwards`;
    area.appendChild(p);
    count++;
  }, 120);
  const s = document.createElement('style');
  s.innerHTML = `@keyframes petalFall{to{transform:translateY(110vh) rotate(720deg);opacity:.2}}`;
  document.head.appendChild(s);
}
