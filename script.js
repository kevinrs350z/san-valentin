const photoButton = document.querySelector(".photo__button");
const reveal = document.querySelector(".reveal");
const floatingHearts = document.querySelector(".floating-hearts");
const fireworks = document.querySelector(".fireworks");
const intro = document.querySelector(".intro");
const card = document.querySelector(".card");
let ambientStarted = false;

const createFloatingHeart = (xPosition) => {
  const heart = document.createElement("span");
  heart.className = "floating-heart";

  const size = Math.random() * 10 + 10;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.left = `${xPosition ?? Math.random() * 100}%`;
  heart.style.animationDuration = `${Math.random() * 3 + 4.5}s`;
  heart.style.opacity = `${Math.random() * 0.5 + 0.4}`;

  floatingHearts.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
};

const startHearts = () => {
  for (let i = 0; i < 18; i += 1) {
    setTimeout(() => createFloatingHeart(), i * 220);
  }
};

const startAmbientHearts = () => {
  if (ambientStarted) return;
  ambientStarted = true;
  setInterval(() => {
    createFloatingHeart();
  }, 800);
};

const burstHearts = () => {
  for (let i = 0; i < 24; i += 1) {
    setTimeout(() => createFloatingHeart(Math.random() * 100), i * 80);
  }
};

const launchFireworks = () => {
  const frame = document.querySelector(".photo__frame");
  const rect = frame.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  const variants = ["variant-1", "variant-2", "variant-3", "variant-4", ""];
  for (let i = 0; i < 24; i += 1) {
    const heart = document.createElement("span");
    heart.className = "firework-heart";
    const variant = variants[Math.floor(Math.random() * variants.length)];
    if (variant) heart.classList.add(variant);

    const size = Math.random() * 8 + 12;
    const dx = (Math.random() - 0.5) * 160;
    const dy = (Math.random() - 0.5) * 160;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${originX}px`;
    heart.style.top = `${originY}px`;
    heart.style.setProperty("--dx", `${dx}px`);
    heart.style.setProperty("--dy", `${dy}px`);
    heart.style.animationDuration = `${Math.random() * 400 + 800}ms`;

    fireworks.appendChild(heart);
    setTimeout(() => heart.remove(), 1300);
  }
};

const acceptInvitation = () => {
  reveal.hidden = false;
  photoButton.disabled = true;
  photoButton.textContent = "¡Dijo que sí!";
  burstHearts();
  launchFireworks();
};

const showCard = () => {
  intro.style.display = "none";
  card.classList.add("is-visible");
  startHearts();
  document.removeEventListener("keydown", showCard);
  intro.removeEventListener("click", showCard);
};

// Iniciar corazones ambientales en la intro
startAmbientHearts();

photoButton.addEventListener("click", acceptInvitation);

document.addEventListener("keydown", showCard);
intro.addEventListener("click", showCard);
