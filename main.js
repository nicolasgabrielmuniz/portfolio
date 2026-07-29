/* ==========================================================================
   Nicolas Muniz — Portfolio
   main.js
   ========================================================================== */
(() => {
  'use strict';

  const GITHUB_USERNAME = 'nicolasgabrielmuniz';

  /* ------------------------------------------------------------------
     0. Loader
  ------------------------------------------------------------------ */
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => loader && loader.classList.add('loaded'), 500);
  });

  /* ------------------------------------------------------------------
     1. Theme (dark default, persisted)
  ------------------------------------------------------------------ */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('nm-theme');
  if (savedTheme === 'light') root.setAttribute('data-theme', 'light');

  themeToggle?.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
      root.removeAttribute('data-theme');
      localStorage.setItem('nm-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('nm-theme', 'light');
    }
  });

  /* ------------------------------------------------------------------
     2. Navbar: scroll state, hamburger, active link
  ------------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    toggleBackToTop();
    highlightActiveLink();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  hamburger?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  const sections = document.querySelectorAll('main section[id]');
  function highlightActiveLink() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  /* ------------------------------------------------------------------
     3. Back to top
  ------------------------------------------------------------------ */
  const backToTop = document.getElementById('backToTop');
  function toggleBackToTop() {
    backToTop?.classList.toggle('visible', window.scrollY > 500);
  }
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ------------------------------------------------------------------
     4. Custom cursor
  ------------------------------------------------------------------ */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let ringX = 0, ringY = 0, dotX = 0, dotY = 0;
    window.addEventListener('mousemove', e => {
      dotX = e.clientX; dotY = e.clientY;
      cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%,-50%)`;
    });
    (function animateRing() {
      ringX += (dotX - ringX) * 0.18;
      ringY += (dotY - ringY) * 0.18;
      if (cursorRing) cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
      requestAnimationFrame(animateRing);
    })();
    document.querySelectorAll('a, button, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing?.classList.add('is-active'));
      el.addEventListener('mouseleave', () => cursorRing?.classList.remove('is-active'));
    });
  }

  /* ------------------------------------------------------------------
     5. Background particles (lightweight canvas)
  ------------------------------------------------------------------ */
  const canvas = document.getElementById('particles');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let w, h, particles;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    function makeParticles() {
      const count = Math.min(60, Math.floor((w * h) / 28000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        hue: Math.random() > 0.5 ? '96,165,250' : '167,139,250'
      }));
    }
    function tick() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue}, 0.55)`;
        ctx.fill();
      });
      requestAnimationFrame(tick);
    }
    resize();
    makeParticles();
    tick();
    window.addEventListener('resize', () => { resize(); makeParticles(); });
  }

  /* ------------------------------------------------------------------
     6. Scroll reveal (IntersectionObserver)
  ------------------------------------------------------------------ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  function observeReveals(selector) {
    document.querySelectorAll(selector).forEach(el => revealObserver.observe(el));
  }
  observeReveals('.reveal-up');

  /* ------------------------------------------------------------------
     7. Data: Skills
  ------------------------------------------------------------------ */
  const SKILLS = [
    { name: 'HTML5', icon: 'fa-brands fa-html5', level: 92 },
    { name: 'CSS3', icon: 'fa-brands fa-css3-alt', level: 88 },
    { name: 'JavaScript', icon: 'fa-brands fa-js', level: 85 },
    { name: 'TypeScript', icon: 'fa-brands fa-square-js', level: 65 },
    { name: 'React', icon: 'fa-brands fa-react', level: 78 },
    { name: 'Node.js', icon: 'fa-brands fa-node-js', level: 75 },
    { name: 'Python', icon: 'fa-brands fa-python', level: 80 },
    { name: 'Java', icon: 'fa-brands fa-java', level: 68 },
    { name: 'Git', icon: 'fa-brands fa-git-alt', level: 85 },
    { name: 'GitHub', icon: 'fa-brands fa-github', level: 85 },
    { name: 'SQL', icon: 'fa-solid fa-database', level: 78 },
    { name: 'MySQL', icon: 'fa-solid fa-server', level: 76 },
    { name: 'PostgreSQL', icon: 'fa-solid fa-elephant', level: 70 },
    { name: 'Docker', icon: 'fa-brands fa-docker', level: 60 },
    { name: 'Linux', icon: 'fa-brands fa-linux', level: 72 },
  ];

  const skillsGrid = document.getElementById('skillsGrid');
  if (skillsGrid) {
    skillsGrid.innerHTML = SKILLS.map(s => `
      <div class="skill-card" style="--fill:${s.level}%">
        <div class="skill-top">
          <span class="skill-icon"><i class="${s.icon}"></i></span>
          <span class="skill-name">${s.name}</span>
          <span class="skill-level">${s.level}%</span>
        </div>
        <div class="skill-bar-track"><div class="skill-bar-fill"></div></div>
      </div>
    `).join('');
    observeReveals('.skill-card');
  }

  /* ------------------------------------------------------------------
     8. Data: fallback / concept projects
  ------------------------------------------------------------------ */
  const FALLBACK_PROJECTS = [
    { title: 'Sistema de Controle de Estoque', desc: 'Aplicação para cadastro de produtos, controle de entradas e saídas e alertas de estoque mínimo.', stack: ['JavaScript', 'Node.js', 'MySQL'], icon: 'fa-solid fa-boxes-stacked' },
    { title: 'API REST em Node.js', desc: 'API RESTful com autenticação, validação de dados e documentação de endpoints.', stack: ['Node.js', 'Express', 'PostgreSQL'], icon: 'fa-solid fa-plug' },
    { title: 'Sistema Financeiro', desc: 'Controle de receitas e despesas com relatórios e gráficos de fluxo de caixa.', stack: ['React', 'Node.js', 'SQL'], icon: 'fa-solid fa-sack-dollar' },
    { title: 'Lista de Tarefas', desc: 'To-do list com categorias, prioridades e persistência de dados.', stack: ['JavaScript', 'HTML5', 'CSS3'], icon: 'fa-solid fa-list-check' },
    { title: 'Dashboard Administrativo', desc: 'Painel com métricas, tabelas dinâmicas e gráficos para tomada de decisão.', stack: ['React', 'Chart.js', 'API REST'], icon: 'fa-solid fa-chart-line' },
    { title: 'Chat em Tempo Real', desc: 'Aplicação de mensagens instantâneas com salas e status online.', stack: ['Node.js', 'Socket.io', 'JavaScript'], icon: 'fa-solid fa-comments' },
    { title: 'Sistema de Login com JWT', desc: 'Autenticação segura com tokens JWT, refresh token e rotas protegidas.', stack: ['Node.js', 'JWT', 'Express'], icon: 'fa-solid fa-user-lock' },
    { title: 'Site Responsivo', desc: 'Landing page institucional totalmente responsiva com foco em performance.', stack: ['HTML5', 'CSS3', 'JavaScript'], icon: 'fa-solid fa-mobile-screen' },
  ];

  function projectCardHTML(p) {
    const repoBtn = p.github
      ? `<a href="${p.github}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Código</a>`
      : `<a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> GitHub</a>`;
    const demoBtn = p.demo
      ? `<a class="primary" href="${p.demo}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a>`
      : `<a class="primary" href="#contato"><i class="fa-solid fa-comment"></i> Saiba mais</a>`;
    return `
      <article class="project-card">
        <div class="project-thumb"><i class="${p.icon || 'fa-solid fa-code'}"></i></div>
        <div class="project-body">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.desc}</p>
          <div class="project-stack">${(p.stack || []).map(t => `<span>${t}</span>`).join('')}</div>
          <div class="project-actions">${repoBtn}${demoBtn}</div>
        </div>
      </article>`;
  }

  function renderProjects(list) {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.innerHTML = list.map(projectCardHTML).join('');
    observeReveals('.project-card');
  }

  /* ------------------------------------------------------------------
     9. Data: Timeline
  ------------------------------------------------------------------ */
  const TIMELINE = [
    { year: '2022', title: 'Início na programação', desc: 'Primeiro contato com lógica de programação e os fundamentos do desenvolvimento de software.' },
    { year: '2023', title: 'HTML & CSS', desc: 'Aprendizado de estruturação semântica e estilização de páginas web responsivas.' },
    { year: '2023', title: 'JavaScript', desc: 'Evolução para lógica dinâmica, manipulação do DOM e interatividade no front-end.' },
    { year: '2024', title: 'React', desc: 'Construção de interfaces baseadas em componentes e gerenciamento de estado.' },
    { year: '2024', title: 'Node.js', desc: 'Desenvolvimento back-end, criação de APIs e integração com bancos de dados.' },
    { year: '2025', title: 'Banco de Dados', desc: 'Modelagem relacional, consultas SQL e boas práticas com MySQL e PostgreSQL.' },
    { year: '2025', title: 'Projetos Pessoais', desc: 'Aplicação prática dos conhecimentos em projetos autorais publicados no GitHub.' },
    { year: 'Próximo passo', title: 'Objetivo profissional', desc: 'Atuar como desenvolvedor full-stack, contribuindo com soluções escaláveis e eficientes.', goal: true },
  ];

  const timelineList = document.getElementById('timelineList');
  if (timelineList) {
    timelineList.innerHTML = TIMELINE.map(t => `
      <div class="timeline-item ${t.goal ? 'is-goal' : ''}">
        <span class="timeline-year">${t.year}</span>
        <h3 class="timeline-title">${t.title}</h3>
        <p class="timeline-desc">${t.desc}</p>
      </div>
    `).join('');
    observeReveals('.timeline-item');
  }

  /* ------------------------------------------------------------------
     10. Data: Services
  ------------------------------------------------------------------ */
  const SERVICES = [
    { icon: 'fa-solid fa-globe', title: 'Sites Institucionais', desc: 'Sites profissionais para apresentar sua marca ou negócio na web.' },
    { icon: 'fa-solid fa-bolt', title: 'Landing Pages', desc: 'Páginas de alta conversão focadas em um único objetivo claro.' },
    { icon: 'fa-solid fa-display', title: 'Sistemas Web', desc: 'Aplicações web sob medida para automatizar processos do seu negócio.' },
    { icon: 'fa-solid fa-plug', title: 'APIs REST', desc: 'Construção de APIs organizadas, seguras e bem documentadas.' },
    { icon: 'fa-solid fa-chart-pie', title: 'Dashboards', desc: 'Painéis visuais para acompanhar métricas e indicadores em tempo real.' },
    { icon: 'fa-solid fa-database', title: 'Banco de Dados', desc: 'Modelagem, estruturação e otimização de bancos de dados relacionais.' },
    { icon: 'fa-solid fa-gears', title: 'Automações', desc: 'Scripts e rotinas para automatizar tarefas repetitivas do dia a dia.' },
    { icon: 'fa-solid fa-screwdriver-wrench', title: 'Manutenção de Sistemas', desc: 'Correção de bugs, melhorias e evolução contínua de sistemas existentes.' },
  ];

  const servicesGrid = document.getElementById('servicesGrid');
  if (servicesGrid) {
    servicesGrid.innerHTML = SERVICES.map(s => `
      <div class="service-card">
        <div class="service-icon"><i class="${s.icon}"></i></div>
        <h3 class="service-title">${s.title}</h3>
        <p class="service-desc">${s.desc}</p>
      </div>
    `).join('');
    observeReveals('.service-card');
  }

  /* ------------------------------------------------------------------
     11. Animated counters
  ------------------------------------------------------------------ */
  function animateCounter(el, target) {
    const duration = 1400;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statsSection = document.getElementById('estatisticas');
  let countersStarted = false;
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        document.querySelectorAll('.stat-number').forEach(el => {
          animateCounter(el, parseInt(el.dataset.target, 10) || 0);
        });
      }
    });
  }, { threshold: 0.4 });
  if (statsSection) statsObserver.observe(statsSection);

  /* ------------------------------------------------------------------
     12. GitHub API integration
  ------------------------------------------------------------------ */
  async function loadGitHub() {
    const panel = document.getElementById('githubPanel');
    const langNames = new Set();

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`)
      ]);

      if (!userRes.ok) throw new Error('user-not-found');
      const user = await userRes.json();
      const repos = reposRes.ok ? await reposRes.json() : [];

      // Update stats
      const statRepos = document.getElementById('statRepos');
      if (statRepos) statRepos.dataset.target = user.public_repos || repos.length || 0;
      const statCommits = document.getElementById('statCommits');
      if (statCommits) statCommits.dataset.target = Math.max(repos.length * 12, 0); // estimate, GitHub API has no direct public commit count

      const sortedRepos = [...repos]
        .filter(r => !r.fork)
        .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.updated_at) - new Date(a.updated_at)));

      sortedRepos.forEach(r => { if (r.language) langNames.add(r.language); });

      // Render profile panel
      panel.innerHTML = `
        <div class="gh-profile">
          <img class="gh-avatar" src="${user.avatar_url}" alt="Foto de perfil de ${user.name || user.login} no GitHub" loading="lazy">
          <div>
            <div class="gh-name">${user.name || user.login}</div>
            <div class="gh-username">@${user.login}</div>
            ${user.bio ? `<p class="gh-bio">${user.bio}</p>` : ''}
          </div>
          <div class="gh-metrics">
            <div class="gh-metric"><strong>${user.public_repos ?? 0}</strong><span>Repositórios</span></div>
            <div class="gh-metric"><strong>${user.followers ?? 0}</strong><span>Seguidores</span></div>
            <div class="gh-metric"><strong>${user.following ?? 0}</strong><span>Seguindo</span></div>
          </div>
        </div>
        ${langNames.size ? `<div class="gh-langs">${[...langNames].map(l => `<span class="gh-lang-chip">${l}</span>`).join('')}</div>` : ''}
        <div class="gh-repos">
          ${sortedRepos.slice(0, 6).map(r => `
            <div class="gh-repo-card">
              <div class="gh-repo-name"><i class="fa-solid fa-code-branch"></i> ${r.name}</div>
              <p class="gh-repo-desc">${r.description || 'Sem descrição disponível.'}</p>
              <div class="gh-repo-meta">
                ${r.language ? `<span><i class="fa-solid fa-circle"></i> ${r.language}</span>` : ''}
                <span><i class="fa-regular fa-star"></i> ${r.stargazers_count}</span>
                <span><i class="fa-solid fa-code-fork"></i> ${r.forks_count}</span>
              </div>
            </div>
          `).join('') || '<p class="gh-empty">Nenhum repositório público em destaque no momento.</p>'}
        </div>
      `;

      // Populate real projects if repos exist, else keep fallback concept projects
      if (sortedRepos.length > 0) {
        const realProjects = sortedRepos.slice(0, 8).map(r => ({
          title: r.name.replace(/[-_]/g, ' '),
          desc: r.description || 'Projeto disponível no meu GitHub — confira o código-fonte para mais detalhes.',
          stack: r.language ? [r.language] : ['Código'],
          icon: 'fa-solid fa-code',
          github: r.html_url,
          demo: r.homepage || null,
        }));
        renderProjects(realProjects);
        const statProjects = document.getElementById('statProjects');
        if (statProjects) statProjects.dataset.target = realProjects.length;
      } else {
        renderProjects(FALLBACK_PROJECTS);
      }

      restartCountersIfVisible();
    } catch (err) {
      panel.innerHTML = `
        <div class="gh-error">
          <i class="fa-brands fa-github" style="font-size:1.6rem;display:block;margin-bottom:10px;"></i>
          Não foi possível carregar os dados do GitHub agora. Confira o perfil diretamente:
          <br><a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener" style="color:var(--blue-light);font-weight:600;">github.com/${GITHUB_USERNAME}</a>
        </div>`;
      renderProjects(FALLBACK_PROJECTS);
    }
  }

  function restartCountersIfVisible() {
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView && !countersStarted) {
      countersStarted = true;
      document.querySelectorAll('.stat-number').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target, 10) || 0);
      });
    }
  }

  // Render fallback projects immediately so the section is never empty, then try live data
  renderProjects(FALLBACK_PROJECTS);
  loadGitHub();

  /* ------------------------------------------------------------------
     13. Contact form (client-side validation, no backend configured)
  ------------------------------------------------------------------ */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  function setError(fieldId, message) {
    const group = document.getElementById(fieldId).closest('.form-group');
    const errorEl = document.getElementById(`${fieldId}Error`);
    if (message) {
      group.classList.add('has-error');
      errorEl.textContent = message;
    } else {
      group.classList.remove('has-error');
      errorEl.textContent = '';
    }
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    let valid = true;

    if (name.length < 2) { setError('name', 'Informe seu nome completo.'); valid = false; } else setError('name', '');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('email', 'Informe um e-mail válido.'); valid = false; } else setError('email', '');
    if (subject.length < 3) { setError('subject', 'Informe o assunto da mensagem.'); valid = false; } else setError('subject', '');
    if (message.length < 10) { setError('message', 'Escreva uma mensagem com pelo menos 10 caracteres.'); valid = false; } else setError('message', '');

    if (!valid) {
      formNote.textContent = 'Verifique os campos destacados acima.';
      formNote.className = 'form-note error';
      return;
    }

    // No backend is configured in this template — this opens the user's email client
    // with the message pre-filled as a functional fallback.
    const body = encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\n${message}`);
    const mailto = `mailto:nicolasgomuniz@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailto;

    formNote.textContent = 'Abrindo seu cliente de e-mail para enviar a mensagem…';
    formNote.className = 'form-note success';
    form.reset();
  });

})();
