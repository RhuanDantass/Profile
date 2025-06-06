const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  initParticles();
});

let particles = [];
const particleCount = 100;
const maxDistance = 120;

// Criação de partículas com posições e velocidades aleatórias
function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1
    });
  }
}
initParticles();

// Animação
function animate() {
  ctx.clearRect(0, 0, width, height);

  // Conexões entre partículas próximas
  for (let i = 0; i < particleCount; i++) {
    for (let j = i + 1; j < particleCount; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDistance) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(155, 89, 182, ${1 - dist / maxDistance})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // Atualização e desenho das partículas
  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    // Rebater nas bordas
    if (p.x <= 0 || p.x >= width) p.vx *= -1;
    if (p.y <= 0 || p.y >= height) p.vy *= -1;

    ctx.beginPath();
    ctx.fillStyle = "rgba(155, 89, 182, 0.6)";
    ctx.shadowColor = "rgba(155, 89, 182, 0.4)";
    ctx.shadowBlur = 4;
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();

// ==== Efeito de digitação ====
const text = "Futuro Desenvolvedor De Software| Estudante ";
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
