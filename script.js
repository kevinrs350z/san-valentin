const photoButton = document.querySelector(".photo__button");
const reveal = document.querySelector(".reveal");
const floatingHearts = document.querySelector(".floating-hearts");
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

const acceptInvitation = () => {
  reveal.hidden = false;
  photoButton.disabled = true;
  photoButton.textContent = "¡Dijo que sí!";
  burstHearts();
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
