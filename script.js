// Ocultar loader + establecer año + iniciar partículas
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) loader.classList.add('hidden');
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
  initParticles();
});

// Navegación móvil
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('.nav .nav-link').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// Revelar al hacer scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Barras de habilidades
document.querySelectorAll('.bar').forEach(bar => {
  const value = Number(bar.getAttribute('data-value') || 0);
  const fill = document.createElement('div');
  fill.className = 'fill';
  bar.appendChild(fill);
  requestAnimationFrame(() => { fill.style.width = value + '%'; });
});

// Datos de proyectos
const projects = {
  p1: {
    title: 'UniQAMS — Sistema de Aseguramiento de Calidad',
    subtitle: 'Acreditación, evaluaciones y auditorías mediante una app web centralizada.',
    img: 'assets/qapic2.jpg',
    body: '<p><strong>Objetivo:</strong> Reemplazar los flujos manuales de aseguramiento de calidad con una plataforma centralizada y rastreable.</p><ul class="bullets"><li>Arquitectura de la información</li><li>Componentes responsivos</li><li>Bucles de retroalimentación</li></ul>',
    link: 'assets/QA.pdf'
  },
  
  p2: {
    title: 'Reemplazo de Colores en Imágenes',
    subtitle: 'Herramienta Web Interactiva • Visión por Computador',
    img: 'assets/colorpic.PNG',
    body: '<p><strong>Experimenta una herramienta inteligente de edición de imágenes:</strong> Sube cualquier imagen, selecciona un color y transfórmalo al tono que desees al instante. Simple, rápido y fácil de usar — diseñado para diseñadores, estudiantes y cualquier persona interesada en la creatividad con IA.</p>',
    link: 'https://ivdqey2ytnqdeg8rrvattq.streamlit.app'
  },
  p6: { 
    title: 'PAWPAL – Dueños de Perros',
    subtitle: 'Aplicación de Gestión de Mascotas (UI/UX)',
    img: 'assets/dm.png',
    body: '<p>Una interfaz centrada en el usuario para dueños de perros. Incluye <strong>perfiles de mascotas</strong>, gestión de <strong>historiales de vacunación</strong>, control de <strong>información personal</strong> y opciones para <strong>ver, editar o añadir perros</strong>. Diseñada con enfoque en accesibilidad y usabilidad.</p>',
    link: 'https://www.figma.com/design/LXjUlBIWmTmf8js7JPcz8I/Untitled?node-id=0-1&m=dev&t=VxxZAqgf2PokhXBp-1' 
  },

  p5: { 
    title: 'MANEN Marketplace',
    subtitle: 'Plataforma de Comercio Electrónico (UI/UX)',
    img: 'assets/Inicio.png',
    body: '<p>Una plataforma de comercio electrónico confiable para Guinea Ecuatorial que conecta vendedores y compradores. Incluye diseño <strong>responsivo</strong>, secciones de productos destacados y flujo de compra/venta simplificado. Construido con <strong>Figma</strong> y prototipado web.</p>',
    link: 'https://www.figma.com/design/bsPfza1Blcq8PDdBSe4EFa/Untitled?node-id=0-1&m=dev&t=n3YRnxIywQrt25w0-1'
  },


  // Proyectos de VA (enlaces PDF)
va1: {
  title: 'Proyecto VA — Programación y Calendario',
  subtitle: 'Diagramas de flujo + requisitos',
  img: 'assets/VA1.jpg',
  body: '<p>Automatización de programación, recordatorios y sincronización de tareas.</p>',
  link: 'assets/sal.pdf'
},
va2: {
  title: 'Proyecto VA — Automatización de Correos y Tareas',
  subtitle: 'Flujos de gestión de bandeja de entrada',
  img: 'assets/VA2.jpg',
  body: '<p>Automatización inteligente de correos electrónicos y delegación de tareas.</p>',
  link: 'assets/VA2.pdf'
},
va3: {
  title: 'Proyecto VA — Soporte al Cliente',
  subtitle: 'Sistema de tickets + satisfacción del cliente',
  img: 'assets/VA3.jpg',
  body: '<p>Sistema de soporte al cliente confiable con integración de asistente virtual.</p>',
  link: 'assets/ecomer.pdf'
},
va4: {
  title: 'Proyecto VA — Automatización de Entrada de Datos',
  subtitle: 'Ingreso de datos automatizado + flujos de trabajo',
  img: 'assets/VA4.png',
  body: '<p>Automatización confiable de flujos de trabajo repetitivos.</p>',
  link: 'assets/VA4.pdf'
}
};

// Referencias del modal
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const modalImg = document.getElementById('modal-img');
const modalBody = document.getElementById('modal-body');
const modalLink = document.getElementById('modal-link');

// Función para abrir proyecto
function openProject(key) {
  const p = projects[key];
  if (!p) return;

  // Si es proyecto VA → abrir PDF en una nueva pestaña
  if (key.startsWith('va')) {
    window.open(p.link, '_blank');
    return;
  }

  // Proyectos normales → abrir en modal
  modalTitle.textContent = p.title;
  modalSubtitle.textContent = p.subtitle;
  modalImg.src = p.img;
  modalImg.alt = p.title;
  modalBody.innerHTML = p.body;

  // Añadir botón de enlace
  if (p.link && p.link !== '#') {
    modalLink.style.display = 'inline-block';
    modalLink.href = p.link;
    modalLink.textContent = '🚀 Probar en Vivo';
    modalLink.target = '_blank';
  } else {
    modalLink.style.display = 'none';
  }

  modal.showModal();
}

// Cerrar modal con botón
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.onclick = () => modal.close();
});

// Eventos para tarjetas de proyectos
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => openProject(card.dataset.project));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { 
      e.preventDefault(); 
      openProject(card.dataset.project); 
    }
  });
});

// Cerrar modal al hacer clic en ❌
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.onclick = () => modal.close();
});

// Cerrar al hacer clic fuera del contenido
modal?.addEventListener('click', (e) => {
  if (e.target === modal) modal.close();
});

// Cerrar con la tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modal.close();
});

// Background particles
function initParticles() {
  const c = document.getElementById('bg');
  if (!c) return;
  const ctx = c.getContext('2d');
  const DPR = window.devicePixelRatio || 1;
  let w, h, particles = [];
  
  function resize() {
    w = c.width = innerWidth * DPR;
    h = c.height = innerHeight * DPR;
    c.style.width = innerWidth + 'px';
    c.style.height = innerHeight + 'px';
    particles = new Array(80).fill(0).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2 * DPR,
      vy: (Math.random() - 0.5) * 0.2 * DPR
    }));
  }
  resize(); 
  window.addEventListener('resize', resize);

  function step() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(74,200,249,0.35)';
    const linkDist = 140 * DPR;

    for (const p of particles) {
      p.x += p.vx; 
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath(); 
      ctx.arc(p.x, p.y, 1.2 * DPR, 0, Math.PI * 2); 
      ctx.fill();
    }

    ctx.strokeStyle = 'rgba(3,108,150,0.18)';
    ctx.lineWidth = 1 * DPR;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.hypot(dx, dy);
        if (d < linkDist) {
          ctx.globalAlpha = 1 - d / linkDist;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(step);
  }
  step();
}

// Lightbox for Certificates with Gallery Navigation
const certImages = document.querySelectorAll('.cert-img');
const lightbox = document.getElementById('lightbox');
const lightboxFrame = document.getElementById('lightbox-frame');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');

let currentIndex = 0;
let certList = Array.from(certImages).map(img => img.getAttribute('data-pdf'));

// Graphic Design Lightbox
const designImages = document.querySelectorAll('.design-img');
let designList = Array.from(designImages).map(img => img.src);

// Reuse the same lightbox
designImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    certList = designList; // reuse certList for designs
    openLightbox(currentIndex);
  });
});

// Open lightbox
function openLightbox(index) {
  currentIndex = index;
  lightboxFrame.src = certList[currentIndex];
  lightbox.style.display = 'block';
}

// Close lightbox
function closeLightbox() {
  lightbox.style.display = 'none';
  lightboxFrame.src = '';
}

// Next / Prev
function showNext() {
  currentIndex = (currentIndex + 1) % certList.length;
  lightboxFrame.src = certList[currentIndex];
}
function showPrev() {
  currentIndex = (currentIndex - 1 + certList.length) % certList.length;
  lightboxFrame.src = certList[currentIndex];
}

// Event listeners
certImages.forEach((img, index) => {
  img.addEventListener('click', () => openLightbox(index));
});
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

window.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'block') {
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'Escape') closeLightbox();
  }
});
