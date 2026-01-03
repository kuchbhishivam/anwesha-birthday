/* ================= ELEMENTS ================= */

const stage     = document.getElementById("stage");
const bouquet   = document.getElementById("bouquet");
const photoEl   = document.getElementById("photo");
const tapHint   = document.getElementById("tapHint");
const celebrate = document.getElementById("celebrate");
const music     = document.getElementById("birthdayMusic");

/* ================= STATE ================= */

let idx = 0;
let started = false;
let slideshowTimer = null;

/* ================= INITIAL STATE ================= */

/* photo hidden initially */
photoEl.style.opacity = "0";
photoEl.src = "";

/* ================= SLIDESHOW ================= */

function showPhoto(i){
  if (!photos || photos.length === 0) return;

  idx = (i + photos.length) % photos.length;
  photoEl.src = photos[idx];

  /* last photo → stop music smoothly */
  if (idx === photos.length - 1) {
    stopMusicSmoothly();
    clearInterval(slideshowTimer);
  }
}

function startSlideshow(){
  if (slideshowTimer) return;

  showPhoto(0);
  slideshowTimer = setInterval(() => {
    showPhoto(idx + 1);
  }, 2800);
}

/* ================= MUSIC ================= */

function stopMusicSmoothly(){
  if (!music) return;

  let vol = music.volume || 1;
  const fade = setInterval(() => {
    vol -= 0.05;
    if (vol <= 0) {
      clearInterval(fade);
      music.pause();
      music.currentTime = 0;
      music.volume = 1;
    } else {
      music.volume = vol;
    }
  }, 150);
}

/* ================= BOUQUET TAP FLOW ================= */

bouquet.addEventListener("click", () => {
  if (started) return;
  started = true;

  /* 🎵 start music */
  music.play().catch(() => {});

  /* 🌸 petals */
  startPetals();

  /* 🌷 bouquet → photo transition */
  stage.classList.add("show-photo");

  /* hide tap text */
  if (tapHint) tapHint.style.opacity = "0";

  /* 🖼 start slideshow after fade */
  setTimeout(() => {
    startSlideshow();
  }, 600);
});

/* ================= TAP PHOTO → NEXT ================= */

photoEl.addEventListener("click", () => {
  showPhoto(idx + 1);
});

/* ================= CELEBRATE ================= */

celebrate.addEventListener("click", () => {
  burstConfetti();
  startPetals();
});

/* ================= CONFETTI ================= */

function burstConfetti(){
  const c = document.getElementById("confetti");
  c.innerHTML = "";

  for (let i = 0; i < 70; i++) {
    const e = document.createElement("div");
    e.className = "piece";
    e.style.left = Math.random() * 100 + "%";
    e.style.background =
      ["#ff6fa3", "#ffd166", "#9ad3bc", "#ffd1dc"]
      [Math.floor(Math.random() * 4)];
    e.style.opacity = "1";
    e.style.width = (6 + Math.random() * 10) + "px";
    e.style.height = (10 + Math.random() * 12) + "px";
    e.style.animation =
      `fall ${2 + Math.random() * 2.5}s linear forwards`;
    c.appendChild(e);
  }

  const s = document.createElement("style");
  s.innerHTML =
    "@keyframes fall{to{transform:translateY(120vh) rotate(360deg);opacity:0}}";
  document.head.appendChild(s);
}

/* ================= PETALS ================= */

let petalsTimer = null;

function startPetals(){
  const area = document.getElementById("petals");
  area.innerHTML = "";

  let count = 0;
  petalsTimer && clearInterval(petalsTimer);

  petalsTimer = setInterval(() => {
    if (count > 50) {
      clearInterval(petalsTimer);
      return;
    }

    const p = document.createElement("div");
    p.className = "petal";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = "-5%";
    const dur = 5 + Math.random() * 4;
    p.style.animation = `petalFall ${dur}s linear forwards`;
    area.appendChild(p);
    count++;
  }, 120);

  const s = document.createElement("style");
  s.innerHTML =
    "@keyframes petalFall{to{transform:translateY(110vh) rotate(720deg);opacity:.2}}";
  document.head.appendChild(s);
}
