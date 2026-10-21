document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const site = document.getElementById('site');
  document.body.classList.add('locked');
  // Intro animation: logo pops in, then the page is revealed.
  window.setTimeout(() => {
    intro.classList.add('hide');
    site.classList.add('ready');
    document.body.classList.remove('locked');
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }, 2300);

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${Math.min((i % 4) * 70, 210)}ms`;
    revealObserver.observe(el);
  });

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.textContent = open ? '×' : '☰';
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.textContent = '☰';
    menuToggle.setAttribute('aria-expanded', 'false');
  }));

  // Menu category filter.
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.toggle('active', b === button));
    const filter = button.dataset.filter;
    menuCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !show);
      if (show) {
        card.classList.remove('visible');
        requestAnimationFrame(() => card.classList.add('visible'));
      }
    });
  }));

  const voucherURL = 'https://vt.tiktok.com/ZS9UsExNXbvNN-9tupD/?poisharing=MOMOYO---PANCING';
  document.querySelectorAll('.quick-order').forEach(button => button.addEventListener('click', () => {
    const product = button.dataset.product || 'menu MOMOYO';
    const go = window.confirm(`Kamu memilih ${product} 💗\\nLanjut ke halaman voucher/order MOMOYO Pancing?`);
    if (go) window.open(voucherURL, '_blank', 'noopener,noreferrer');
  }));

  // Gallery lightbox.
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.classList.remove('locked');
    lightboxImage.src = '';
  };
  document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.image;
    lightbox.classList.add('open');
    document.body.classList.add('locked');
  }));
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });

  const backTop = document.getElementById('backTop');
  const updateScroll = () => {
    backTop.classList.toggle('show', window.scrollY > 450);
    const sections = document.querySelectorAll('main section[id]');
    let current = 'home';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 160) current = section.id;
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', updateScroll, { passive: true });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.getElementById('year').textContent = new Date().getFullYear();
});
