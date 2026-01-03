const stage   = document.getElementById("stage");
const bouquet = document.getElementById("bouquet");
const photo   = document.getElementById("photo");
const tapHint = document.getElementById("tapHint");
const music   = document.getElementById("birthdayMusic");
const celebrate = document.getElementById("celebrate");

let idx = 0;
let started = false;
let timer = null;

/* hide photo initially */
photo.style.opacity = "0";

/* ===== SLIDESHOW ===== */
function show(i){
  if(!photos || photos.length===0) return;
  idx = (i + photos.length) % photos.length;
  photo.src = photos[idx];

  if(idx === photos.length-1){
    stopMusic();
    clearInterval(timer);
  }
}

function startSlideshow(){
  show(0);
  timer = setInterval(()=>show(idx+1),2800);
}

/* ===== MUSIC ===== */
function stopMusic(){
  let v = music.volume;
  const f = setInterval(()=>{
    v -= .05;
    if(v<=0){
      clearInterval(f);
      music.pause();
      music.currentTime=0;
      music.volume=1;
    }else music.volume=v;
  },150);
}

/* ===== BOUQUET TAP ===== */
bouquet.addEventListener("click",()=>{
  if(started) return;
  started = true;

  music.play().catch(()=>{});
  stage.classList.add("show-photo");
  tapHint.style.opacity="0";
  startPetals();

  setTimeout(startSlideshow,600);
});

/* tap photo → next */
photo.addEventListener("click",()=>show(idx+1));

/* celebrate */
celebrate.addEventListener("click",()=>{
  burstConfetti();
  startPetals();
});

/* ===== CONFETTI ===== */
function burstConfetti(){
  const c=document.getElementById("confetti");
  c.innerHTML="";
  for(let i=0;i<70;i++){
    const e=document.createElement("div");
    e.style.left=Math.random()*100+"%";
    e.style.top="-10%";
    e.style.width="8px";
    e.style.height="12px";
    e.style.background=["#ff6fa3","#ffd1dc","#ffd166"][Math.floor(Math.random()*3)];
    e.style.position="absolute";
    e.style.animation=`fall ${2+Math.random()*2}s linear forwards`;
    c.appendChild(e);
  }
  const s=document.createElement("style");
  s.innerHTML="@keyframes fall{to{transform:translateY(120vh) rotate(360deg);opacity:0}}";
  document.head.appendChild(s);
}

/* ===== PETALS ===== */
function startPetals(){
  const p=document.getElementById("petals");
  p.innerHTML="";
  let c=0;
  const t=setInterval(()=>{
    if(c>50){clearInterval(t);return;}
    const e=document.createElement("div");
    e.className="petal";
    e.style.left=Math.random()*100+"%";
    e.style.top="-5%";
    e.style.animation=`petalFall ${5+Math.random()*4}s linear forwards`;
    p.appendChild(e);
    c++;
  },120);
  const s=document.createElement("style");
  s.innerHTML="@keyframes petalFall{to{transform:translateY(110vh) rotate(720deg);opacity:.2}}";
  document.head.appendChild(s);
}
