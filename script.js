document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  const heroTl = gsap.timeline();
  heroTl
    .from('.hero__eyebrow', { opacity: 0, y: -20, duration: 0.6, ease: 'power2.out' })
    .from('.hero__wordmark', { opacity: 0, scale: 0.6, rotation: -18, duration: 1.1, ease: 'elastic.out(1, 0.5)' }, '-=0.2')
    .from('.hero__tagline', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    .from('.hero__cta', { opacity: 0, scale: 0.5, rotation: -20, duration: 0.9, ease: 'elastic.out(1, 0.5)' }, '-=0.3')
    .from('.hero__photo', { opacity: 0, x: -60, rotation: -25, duration: 1.1, ease: 'elastic.out(1, 0.5)' }, '-=0.6');

  const cardRestRotations = new Map();
  document.querySelectorAll('.flavor-card').forEach((card) => {
    cardRestRotations.set(card, gsap.getProperty(card, 'rotation'));
  });

  gsap.utils.toArray('.flavor-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%' },
      opacity: 0,
      y: 50,
      rotation: '+=20',
      duration: 0.8,
      delay: (i % 6) * 0.05,
      ease: 'elastic.out(1, 0.6)'
    });
  });

  gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.fromTo(title,
      { rotation: -6 },
      {
        rotation: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.35)',
        scrollTrigger: { trigger: title, start: 'top 85%', once: true }
      }
    );
  });

  const sobreDrip = document.querySelector('.sobre__drip');
  if (sobreDrip) {
    gsap.to(sobreDrip, { y: 12, duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }

  document.querySelectorAll('.flavor-card').forEach((card) => {
    const restRotation = cardRestRotations.get(card);
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { rotation: 0, scale: 1.05, duration: 0.3, ease: 'back.out(3)' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotation: restRotation, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });

  document.querySelectorAll('.btn--cta').forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { scaleX: 1.08, scaleY: 0.94, duration: 0.2, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { scaleX: 1, scaleY: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
    });
  });

  const cursorDrip = document.querySelector('.cursor-drip');
  const hero = document.querySelector('.hero');
  if (cursorDrip && hero && window.matchMedia('(hover: hover)').matches) {
    const xTo = gsap.quickTo(cursorDrip, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(cursorDrip, 'y', { duration: 0.4, ease: 'power3' });

    hero.addEventListener('mousemove', (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      cursorDrip.classList.add('is-active');
    });
    hero.addEventListener('mouseleave', () => {
      cursorDrip.classList.remove('is-active');
    });
  }
});
