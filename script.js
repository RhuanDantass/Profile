// ====== Configuração do canvas para partículas ======
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resize();
window.addEventListener('resize', resize);

// Classe para cada partícula
class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.7) * 0.5; // sobe mais que desce
    this.opacity = Math.random() * 0.15 + 0.05;  // opacidade mais baixa
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y < 0) this.y = height;
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(155, 89, 182, ${this.opacity})`; // roxo
    ctx.shadowColor = 'rgba(155, 89, 182, 0.7)';
    ctx.shadowBlur = 8;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Criar e armazenar as partículas
const particlesArray = [];
const particlesCount = 100;

for (let i = 0; i < particlesCount; i++) {
  particlesArray.push(new Particle());
}

// Loop de animação das partículas
function animateParticles() {
  ctx.clearRect(0, 0, width, height);
  for (const p of particlesArray) {
    p.update();
    p.draw();
  }
  requestAnimationFrame(animateParticles);
}

animateParticles();

// ====== Efeito de digitação ======
const text = "Desenvolvedor de Softwares | Estudante De Informática";
const typewriter = document.querySelector(".typewriter");
let i = 0;

function type() {
  if (i < text.length) {
    typewriter.textContent += text.charAt(i);
    i++;
    setTimeout(type, 70);
  } else {
    typewriter.style.borderRight = "none";
  }
}

type();

