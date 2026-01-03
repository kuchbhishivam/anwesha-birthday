/* ================= SLIDESHOW ================= */
const photoEl = document.getElementById('photo');
let idx = 0;

photoEl.style.opacity = "0";

function show(i){
  if(!photos || photos.length===0) return;
  idx = (i + photos.length) % photos.length;
  photoEl.src = photos[idx];

  /* LAST PHOTO → STOP MUSIC */
  if(idx === photos.length - 1){
    stopMusicSmoothly();
  }
}

document.getElementById('prev').addEventListener('click', ()=> show(idx-1));
document.getElementById('next').addEventListener('click', ()=> show(idx+1));

/* ================= AUTO SLIDESHOW ================= */
let timer=null;
function startSlideshow(){
  if(timer) return;
  timer=setInterval(()=>show(idx+1),2800);
}

/* ================= MUSIC CONTROL (PART-1) ================= */
const music=document.getElementById("birthdayMusic");

function stopMusicSmoothly(){
  if(!music) return;
  let vol=music.volume;
  const fade=setInterval(()=>{
    vol-=0.05;
    if(vol<=0){
      clearInterval(fade);
      music.pause();
      music.currentTime=0;
      music.volume=1;
    }else{
      music.volume=vol;
    }
  },150);
}

/* ================= BOUQUET FLOW ================= */
const bouquetImg=document.getElementById("bouquetImg");
const bouquetOverlay=document.getElementById("bouquetOverlay");

let bouquetIndex=0;
const bouquetImages=[
  "/static/img/tulip1.jpg",
  "/static/img/tulip2.jpg"
];

/* Bouquet soft animation */
setInterval(()=>{
  if(bouquetImg && !bouquetOverlay.classList.contains("hide")){
    bouquetIndex=(bouquetIndex+1)%bouquetImages.length;
    bouquetImg.style.opacity=0;
    setTimeout(()=>{
      bouquetImg.src=bouquetImages[bouquetIndex];
      bouquetImg.style.opacity=1;
    },500);
  }
},2500);

/* Bouquet tap → music + petals + slideshow */
if(bouquetImg && bouquetOverlay && music){
  bouquetImg.addEventListener("click",()=>{

    music.play().catch(()=>{});
    bouquetOverlay.classList.add("hide");

    startPetals();  

setTimeout(()=>{
  // photo fade-in
  photoEl.style.opacity = "1";

  // start slideshow AFTER photo visible
  startSlideshow();
},700);

  });
}

/* ================= C================= */
document.getElementById('celebrate').addEventListener('click',()=>{
  burstConfetti();
  startPetals();
});

function burstConfetti(){
  const c=document.getElementById('confetti');
  c.innerHTML='';
  for(let i=0;i<70;i++){
    const e=document.createElement('div');
    e.className='piece';
    e.style.left=Math.random()*100+'%';
    e.style.background=['#ff6fa3','#ffd166','#9ad3bc','#ffd1dc'][Math.floor(Math.random()*4)];
    e.style.opacity='1';
    e.style.width=(6+Math.random()*10)+'px';
    e.style.height=(10+Math.random()*12)+'px';
    e.style.animation=`fall ${2+Math.random()*2.5}s linear forwards`;
    c.appendChild(e);
  }
  const s=document.createElement('style');
  s.innerHTML='@keyframes fall{to{transform:translateY(120vh) rotate(360deg);opacity:0}}';
  document.head.appendChild(s);
}

/* ================= PETALS ================= */
let petalsTimer=null;
function startPetals(){
  const area=document.getElementById('petals');
  area.innerHTML='';
  let count=0;
  petalsTimer && clearInterval(petalsTimer);
  petalsTimer=setInterval(()=>{
    if(count>50){clearInterval(petalsTimer);return;}
    const p=document.createElement('div');
    p.className='petal';
    p.style.left=Math.random()*100+'%';
    p.style.top='-5%';
    const dur=5+Math.random()*4;
    p.style.animation=`petalFall ${dur}s linear forwards`;
    area.appendChild(p);
    count++;
  },120);
  const s=document.createElement('style');
  s.innerHTML='@keyframes petalFall{to{transform:translateY(110vh) rotate(720deg);opacity:.2}}';
  document.head.appendChild(s);
}
