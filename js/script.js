// ==========================================
// BACKGROUND MUSIC & SECRET ENTRY SETUP
// ==========================================
const bgMusic = document.getElementById('bg-music');
const musicToggleBtn = document.getElementById('music-toggle-btn');
const welcomeOverlay = document.getElementById('welcome-overlay');
const enterSiteBtn = document.getElementById('enter-site-btn');
const entryInput = document.getElementById('entry-input');
const entryError = document.getElementById('entry-error');

bgMusic.volume = 0.2; 
let isMusicPlaying = false;

// الإجابات المقبولة (كلها هتتحول لحروف صغيرة ومن غير مسافات قبل المقارنة)
const ACCEPTED_ENTRY_ANSWERS = ['somi', 'somicafe', 'somicaffe','سومي كافيه','سومي','somi cafe','somi caffe'];

function checkEntry() {
  const normalized = entryInput.value.trim().toLowerCase().replace(/[^a-z]/g, '');

  if (ACCEPTED_ENTRY_ANSWERS.includes(normalized)) {
    entryError.classList.add('hidden');

    bgMusic.play().then(() => {
      isMusicPlaying = true;
      musicToggleBtn.innerHTML = '🎵';
    }).catch(err => console.log("Audio play error:", err));

    welcomeOverlay.style.opacity = '0';
    setTimeout(() => {
      welcomeOverlay.classList.add('hidden');
    }, 500);
  } else {
    entryError.classList.remove('hidden');
  }
}

enterSiteBtn.addEventListener('click', checkEntry);

entryInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkEntry();
  }
});

function toggleMusic() {
  if (isMusicPlaying) {
    bgMusic.pause();
    musicToggleBtn.innerHTML = '🔇';
    isMusicPlaying = false;
  } else {
    bgMusic.play().then(() => {
      musicToggleBtn.innerHTML = '🎵';
      isMusicPlaying = true;
    }).catch(e => console.log("Audio play failed"));
  }
}

musicToggleBtn.addEventListener('click', toggleMusic);


// ==========================================
// MEMORY MAP DATA (مفتاح لكل مكان)
// ==========================================
const memoriesData = {
  costa: {
    name: 'Costa Coffee',
    message: 'This is considered our place, the place where we sat the most and fought the most 😂. Here, I drowned you so many times with my lightheartedness 😎',
    media: [
      { type: 'image', src: 'images/map/costa 2.jpeg' },
      { type: 'image', src: 'images/map/costa 3.jpeg' },
      { type: 'video', src: 'images/map/costa video.mp4' },
    ],
  },
  primos: {
    name: "Primo's Pizza",
    message: 'This was the first place where we tried pizza together😋😋. We only went there once on Eid, and we fought because I brought a vape🤦🏻‍♂️',
    media: [
      { type: 'image', src: 'images/map/primos.jpeg' },
    ],
  },
  borio: {
    name: 'Borio Cafe',
    message: 'Here was the very first place we went together downtown— ahwaa balady😊, before I even knew about regular cafes bta3t el a8nya bta3tk dy😂😂',
    media: [
      { type: 'video', src: 'images/map/borio video.mp4' },
    ],
  },
  pizzaking: {
    name: 'Pizza King',
    message: 'This is the second time we tried pizza together, but at a different place. We ate until we were full😋. The offer was too good😂❤️',
    media: [
      { type: 'image', src: 'images/map/pizza king.jpg' },
      { type: 'image', src: 'images/map/pizza king 2.jpg' },
    ],
  },
  ziomarco: {
    name: 'Zio Marco',
    message: 'We did not go to Zamalek much—only twice, but we tried a lot of things! We celebrated our 100th day together there😍, and also your birthday.  We went to two restaurants😋 and even some museums!✨',
    media: [
      { type: 'image', src: 'images/map/zio marco.jpg' },
      { type: 'image', src: 'images/map/zio marco 2.jpeg' },
      { type: 'image', src: 'images/map/zio marco 3.jpeg' },
      { type: 'image', src: 'images/map/zio marco 4.jpeg' },
      { type: 'image', src: 'images/map/zio marco 5.jpeg' },
      { type: 'image', src: 'images/map/zio marco 6.jpeg' },
      { type: 'image', src: 'images/map/zio marco 7.jpeg' },
      { type: 'image', src: 'images/map/zio marco 8.jpeg' },
      { type: 'image', src: 'images/map/zio marco 9.jpeg' },
      { type: 'image', src: 'images/map/zio marco 10.jpeg' },
    ],
  },
  rustic: {
    name: 'Rustic Cafe',
    message: 'Of course we can nott forget this cafe! It is the place where we studied so much (or well, I studied while you just messed around 😂). It has a great vibe and great prices, but the staff... ewwww👎👎',
    media: [
      { type: 'image', src: 'images/map/rustic 5.jpeg' },
      { type: 'image', src: 'images/map/rustic 2.jpeg' },
      { type: 'image', src: 'images/map/rustic.jpeg' },
      { type: 'image', src: 'images/map/000000.jpeg' },
      { type: 'video', src: 'images/map/rustic vodeo.mp4' },
    ],
  },
  somi: {
    name: 'Somi Cafe',
    message: 'Do not be surprised that I named it "Secret Cafe", because, as I told you, we do not tell anyone about it. 🤫 This is where I took your pictures with my new phone, and they were truly the very first photos on it!❤️❤️',
    media: [
      { type: 'image', src: 'images/map/somi.jpg' },
      { type: 'image', src: 'images/map/somi2.jpg' },
      { type: 'image', src: 'images/map/somi3.jpg' },
    ],
  },
};

const modal = document.getElementById('memory-modal');
const modalMessageStep = document.getElementById('modal-message-step');
const modalMediaStep = document.getElementById('modal-media-step');
const modalMessageText = document.getElementById('modal-message-text');
const modalRevealBtn = document.getElementById('modal-reveal-btn');
const modalClose = document.getElementById('modal-close');

function openMemory(placeKey) {
  const place = memoriesData[placeKey];
  if (!place) return;

  modalMessageStep.classList.remove('hidden');
  modalMediaStep.classList.add('hidden');
  modalMediaStep.innerHTML = '';

  modalMessageText.textContent = place.message;

  modalRevealBtn.onclick = () => {
    modalMessageStep.classList.add('hidden');
    modalMediaStep.classList.remove('hidden');

    place.media.forEach((item) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'rounded-md overflow-hidden bg-black/5 h-56 flex items-center justify-center';

      if (item.type === 'video') {
        const video = document.createElement('video');
        video.src = item.src;
        video.className = 'max-w-full max-h-full object-contain';
        video.controls = true;
        video.playsInline = true;

        video.addEventListener('play', () => {
          if (isMusicPlaying) {
            bgMusic.pause();
            musicToggleBtn.innerHTML = '🔇';
          }
        });

        video.addEventListener('pause', () => {
          if (isMusicPlaying) {
            bgMusic.play();
            musicToggleBtn.innerHTML = '🎵';
          }
        });
        video.addEventListener('ended', () => {
          if (isMusicPlaying) {
            bgMusic.play();
            musicToggleBtn.innerHTML = '🎵';
          }
        });

        wrapper.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = place.name;
        img.className = 'max-w-full max-h-full object-contain';
        wrapper.appendChild(img);
      }

      modalMediaStep.appendChild(wrapper);
    });
  };

  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  
  const videos = modalMediaStep.querySelectorAll('video');
  videos.forEach(v => v.pause());
  
  if (isMusicPlaying) {
    bgMusic.play();
    musicToggleBtn.innerHTML = '🎵';
  }
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// ---------- PASSWORD + SURPRISE ----------

const CORRECT_DATE_DIGITS = '2832025'; 

const passwordForm = document.getElementById('password-form');
const passwordInput = document.getElementById('password-input');
const passwordSubmit = document.getElementById('password-submit');
const passwordError = document.getElementById('password-error');
const videoSection = document.getElementById('video-section');

function checkPassword() {
  const digitsOnly = passwordInput.value.replace(/\D/g, '');

  if (digitsOnly === CORRECT_DATE_DIGITS) {
    passwordError.classList.add('hidden');
    passwordForm.classList.add('hidden');
    videoSection.classList.remove('hidden');
  } else {
    passwordError.classList.remove('hidden');
  }
}

passwordSubmit.addEventListener('click', checkPassword);

passwordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkPassword();
  }
});
