/* snow.js */
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const particleCount = 110;

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  createParticles();
}

function createParticles() {
  particles = [];
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.4 + 0.8,
      speedY: Math.random() * 0.6 + 0.3,
      speedX: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.5 + 0.25
    });
  }
}

function drawSnow() {
  ctx.clearRect(0, 0, width, height);
  
  particles.forEach(particle => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
    ctx.fill();
    
    particle.y += particle.speedY;
    particle.x += particle.speedX;
    
    if (particle.y - particle.radius > height) {
      particle.y = -particle.radius;
      particle.x = Math.random() * width;
    }
    
    if (particle.x + particle.radius < 0) {
      particle.x = width + particle.radius;
    }
    
    if (particle.x - particle.radius > width) {
      particle.x = -particle.radius;
    }
  });
  
  requestAnimationFrame(drawSnow);
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();
drawSnow();