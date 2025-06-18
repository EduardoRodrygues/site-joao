const config = {
    particleCount: 60,
    speed: 1,
    particleSize: 10
  };
  
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');
  let canvasWidth = canvas.width = window.innerWidth;
  let canvasHeight = canvas.height = window.innerHeight;
  
  let trails = [];
  let heartPath = [];
  
  function initHeartPath() {
    heartPath = [];
    const PI2 = 6.28318;
    const steps = 60;
  
    let scale;
    if (window.innerWidth <= 768) { // Se for celular ou tablet
      scale = Math.min(canvasWidth, canvasHeight) * 0.35; // aumenta mais no mobile
    } else {
      scale = Math.min(canvasWidth, canvasHeight) * 0.25; // padrão no desktop
    }
  
    for (let i = 0; i < steps; i++) {
      const t = (i / steps) * PI2;
      const x = canvasWidth / 2 + scale * Math.pow(Math.sin(t), 3);
      const y = canvasHeight / 2 - scale * ( // invertido o sinal pra centralizar melhor
        0.8125 * Math.cos(t) -
        0.3125 * Math.cos(2 * t) -
        0.125 * Math.cos(3 * t) -
        0.0625 * Math.cos(4 * t)
      );
      heartPath.push([x, y]);
    }
  }
  
  function initParticles() {
    trails = [];
    if (heartPath.length === 0) initHeartPath();
  
    for (let i = 0; i < config.particleCount; i++) {
      const particles = [];
      const x = Math.random() * canvasWidth;
      const y = Math.random() * canvasHeight;
  
      for (let k = 0; k < config.particleCount; k++) {
        particles.push({
          x, y,
          velX: 0, velY: 0,
          radius: ((1 - k/config.particleCount) + 1) * config.particleSize/2,
          speed: Math.random() + 1,
          targetIndex: Math.floor(Math.random() * heartPath.length),
          direction: i % 2 * 2 - 1,
          friction: Math.random() * 0.2 + 0.7,
          color: `hsla(0,100%,50%,0.1)`
        });
      }
      trails.push(particles);
    }
  }
  
  function renderParticle(particle) {
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  
  function animationLoop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
    trails.forEach(trail => {
      if (!trail || !trail.length) return;
      const leader = trail[0];
      const target = heartPath[leader.targetIndex % heartPath.length];
      if (!target) return;
  
      const dx = leader.x - target[0];
      const dy = leader.y - target[1];
      const dist = Math.sqrt(dx*dx + dy*dy);
  
      if (dist < 10) {
        if (Math.random() > 0.95) {
          leader.targetIndex = Math.floor(Math.random() * heartPath.length);
        } else {
          if (Math.random() > 0.99) leader.direction *= -1;
          leader.targetIndex += leader.direction;
          leader.targetIndex = (leader.targetIndex + heartPath.length) % heartPath.length;
        }
      }
  
      leader.velX += -dx/dist * leader.speed * config.speed;
      leader.velY += -dy/dist * leader.speed * config.speed;
      leader.x += leader.velX;
      leader.y += leader.velY;
      leader.velX *= leader.friction;
      leader.velY *= leader.friction;
  
      renderParticle(leader);
      for (let k = 1; k < trail.length; k++) {
        trail[k].x -= (trail[k].x - trail[k-1].x) * 0.7;
        trail[k].y -= (trail[k].y - trail[k-1].y) * 0.7;
        renderParticle(trail[k]);
      }
    });
  
    requestAnimationFrame(animationLoop);
  }
  
  window.addEventListener('resize', () => {
    canvasWidth = canvas.width = window.innerWidth;
    canvasHeight = canvas.height = window.innerHeight;
    initHeartPath();
  });
  
  function init() {
    initHeartPath();
    initParticles();
    animationLoop();
  }
  
  init();
  