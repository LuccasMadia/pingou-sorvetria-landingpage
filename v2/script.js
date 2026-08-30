document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.hero__eyebrow, .hero__wordmark, .hero__tagline, .hero__inner .btn', {
    opacity: 0,
    y: 24,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power2.out'
  });

  gsap.utils.toArray('.catalogo__item').forEach((item) => {
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: 'top 90%' },
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out'
    });
  });

  gsap.from('.chapter-bg__caption', {
    scrollTrigger: { trigger: '.chapter-bg', start: 'top 60%' },
    opacity: 0,
    y: 16,
    duration: 0.6,
    ease: 'power2.out'
  });

  gsap.from('.sobre__col', {
    scrollTrigger: { trigger: '.sobre', start: 'top 80%' },
    opacity: 0,
    y: 24,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out'
  });
});
