
(() => {
    const originalImagePaths = [
    'Pictures/PXL_20250323_160322465.jpg',
    'Pictures/20221004_120102_52451203335_o.jpg',
    'Pictures/345395045_170564368972787_6665234763286219141_n.jpg',
    'Pictures/7C3D60D1.png',
    'Pictures/90F0C5E6.png',
    'Pictures/fb_20150313_18_04_30_saved_picture_51326593041_o.jpg',
    'Pictures/fb_20150313_18_05_19_saved_picture_51326796243_o.jpg',
    'Pictures/fb_20150313_18_05_44_saved_picture_51327586465_o.jpg',
    'Pictures/fb_20150313_18_05_48_saved_picture_51326593111_o.jpg',
    'Pictures/fb_20150313_18_05_53_saved_picture_51325859672_o.jpg',
    'Pictures/fb_20150313_18_06_08_saved_picture_51326593121_o.jpg',
    'Pictures/fb_20150313_18_06_15_saved_picture_51326593146_o.jpg',
    'Pictures/fb_20150313_18_06_26_saved_picture_51327316319_o.jpg',
    'Pictures/fb_20150313_18_06_31_saved_picture_51327586520_o.jpg',
    'Pictures/fb_20150313_18_06_57_saved_picture_51327586525_o.jpg',
    'Pictures/img_1673_51326796338_o.jpg',
    'Pictures/img_20190525_152829_51327316514_o.jpg',
    'Pictures/img_20190525_155627_51327586745_o.jpg',
    'Pictures/img_9608_51326796353_o.jpg',
    'Pictures/img_9609_51327586580_o.jpg',
    'Pictures/Laptop1.jpg',
    'Pictures/Laptop2.jpg',
    'Pictures/my-laptop_52017362697_o.jpg',
    'Pictures/PXL_20221202_204454125.jpg',
    'Pictures/PXL_20221203_051025900.jpg',
    'Pictures/PXL_20221203_160930924.jpg',
    'Pictures/PXL_20221228_222816583~2.jpg',
    'Pictures/pxl_20230508_003704126_53069653555_o.jpg',
    'Pictures/pxl_20230508_004156096_53069451774_o.jpg',
    'Pictures/PXL_20230514_003432146.jpg',
    'Pictures/PXL_20250323_160322465.jpg',
    'Pictures/rivulq9_51327322214_o.jpg',
    'Pictures/tweaked-the-crap-out-of-the-atom-ide_52018444358_o.png',
    'Pictures/v__2f3b_51327586785_o.jpg',
    'Pictures/v__e513_51327316384_o.jpg',
    'Pictures/wp_20150317_001_51326593391_o.jpg',
    'Pictures/wp_20160905_17_25_44_pro_51327316409_o.jpg',
    'Pictures/wp_20160905_17_26_42_rich_51326796458_o.jpg',
    'Pictures/wp_20160905_17_26_57_rich_51327586695_o.jpg',
    'Pictures/xfce-my-retro-ms-dos-theme-for-xubuntu_52017360277_o.jpg',
  ];

  const galleryRoot = document.getElementById('gallery');
  if (!galleryRoot || originalImagePaths.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mod = (n, m) => ((n % m) + m) % m;

  function getThumbPath(originalPath) {
    const filename = originalPath.split('/').pop() || originalPath;
    const dot = filename.lastIndexOf('.');
    if (dot === -1) return originalPath;
    const name = filename.slice(0, dot);
    const ext = filename.slice(dot + 1);
    return `Thumbnails/${name}_thumb.${ext}`;
  }

  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  function cardSize() {
    return isMobile()
      ? { w: 210, h: 270 }
      : { w: 260, h: 380 };
  }

  // ----- build carousel DOM -----
  galleryRoot.innerHTML = '';

  const viewport = document.createElement('div');
  viewport.className = 'carousel-viewport';

  const stage = document.createElement('div');
  stage.className = 'carousel-stage';

  const btnPrev = document.createElement('button');
  btnPrev.className = 'carousel-nav-btn carousel-nav-left';
  btnPrev.type = 'button';
  btnPrev.setAttribute('aria-label', 'Previous image');
  btnPrev.innerHTML = '&#9664;';

  const btnNext = document.createElement('button');
  btnNext.className = 'carousel-nav-btn carousel-nav-right';
  btnNext.type = 'button';
  btnNext.setAttribute('aria-label', 'Next image');
  btnNext.innerHTML = '&#9654;';

  viewport.appendChild(btnPrev);
  viewport.appendChild(stage);
  viewport.appendChild(btnNext);
  galleryRoot.appendChild(viewport);

  // ----- lightbox DOM (reuse if already present) -----
  let lightbox = document.querySelector('.lightbox');
  if (lightbox) lightbox.remove();

  lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-inner" role="dialog" aria-modal="true">
      <button class="lightbox-nav-btn lightbox-nav-left" type="button" aria-label="Previous image">&#9664;</button>
      <img class="lightbox-img" alt="">
      <button class="lightbox-nav-btn lightbox-nav-right" type="button" aria-label="Next image">&#9654;</button>
      <div class="lightbox-hint">CLICK OUTSIDE (OR PRESS ESC) TO CLOSE</div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lbPrev = lightbox.querySelector('.lightbox-nav-left');
  const lbNext = lightbox.querySelector('.lightbox-nav-right');

  function openLightbox() {
    const full = originalImagePaths[currentIndex];
    lightboxImg.src = full;
    lightboxImg.alt = full.split('/').pop() || '';
    lightbox.classList.add('is-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // ----- cards -----
  const OFFSETS = [-2, -1, 0, 1, 2];
  const cards = OFFSETS.map((offset) => {
    const card = document.createElement('div');
    card.className = 'carousel-card';
    card.dataset.offset = String(offset);

    const frame = document.createElement('div');
    frame.className = 'carousel-frame';

    const img = document.createElement('img');
    img.decoding = 'async';
    img.loading = 'eager';
    frame.appendChild(img);
    card.appendChild(frame);

    card.addEventListener('click', () => {
      const o = Number(card.dataset.offset || 0);
      if (o === 0) openLightbox();
      else { userAction(); goBy(o); }
    });

    stage.appendChild(card);
    return { card, img, offset };
  });

  // ----- layout + render -----
  function computeSpacing() {
    const { w: cardW } = cardSize();
    const w = viewport.clientWidth || 1000;
    const edgePad = isMobile() ? 18 : 28;

    // Keep the outer cards fully visible: cardW + 4*spacing <= w - 2*edgePad
    const maxSpacing = Math.floor((w - 2 * edgePad - cardW) / 4);
    const spacing = Math.max(isMobile() ? 140 : 180, Math.min(isMobile() ? 190 : 270, maxSpacing));
    return spacing;
  }

  function scaleForOffset(o) {
    const a = Math.abs(o);
    if (a === 0) return 1.18;
    if (a === 1) return 0.92;
    return 0.80;
  }

  function brightnessForOffset(o) {
    const a = Math.abs(o);
    if (a === 0) return 1;
    if (a === 1) return 0.62;
    return 0.38;
  }

  function render() {
    const spacing = computeSpacing();

    for (const { card, img, offset } of cards) {
      const imgIndex = mod(currentIndex + offset, originalImagePaths.length);
      const originalPath = originalImagePaths[imgIndex];

      card.dataset.imgIndex = String(imgIndex);

      img.src = getThumbPath(originalPath);
      img.alt = originalPath.split('/').pop() || `image-${imgIndex}`;

      const x = offset * spacing;
      const s = scaleForOffset(offset);
      const b = brightnessForOffset(offset);
      const z = 100 - Math.abs(offset) * 10;

      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--s', `${s}`);
      card.style.setProperty('--b', `${b}`);
      card.style.setProperty('--z', `${z}`);

      if (offset === 0) card.classList.add('is-center');
      else card.classList.remove('is-center');

      if (Math.abs(offset) <= 1) {
        const pre = new Image();
        pre.src = originalPath;
      }
    }

    if (lightbox.classList.contains('is-open')) {
      const full = originalImagePaths[currentIndex];
      lightboxImg.src = full;
      lightboxImg.alt = full.split('/').pop() || '';
    }
  }

  // ----- navigation -----
  let currentIndex = 0;
  let lastUserActionAt = Date.now();

  function goBy(delta) {
    currentIndex = mod(currentIndex + delta, originalImagePaths.length);
    render();
  }

  function userAction() {
    lastUserActionAt = Date.now();
  }

  btnPrev.addEventListener('click', () => { userAction(); goBy(-1); });
  btnNext.addEventListener('click', () => { userAction(); goBy(1); });

  lbPrev.addEventListener('click', (e) => { e.stopPropagation(); userAction(); goBy(-1); });
  lbNext.addEventListener('click', (e) => { e.stopPropagation(); userAction(); goBy(1); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
      return;
    }
    if (e.key === 'ArrowLeft') { userAction(); goBy(-1); }
    if (e.key === 'ArrowRight') { userAction(); goBy(1); }
  });

  // ----- auto-advance -----
  const ADVANCE_MS = 4200;
  if (!prefersReducedMotion) {
    setInterval(() => {
      if (lightbox.classList.contains('is-open')) return;
      if (Date.now() - lastUserActionAt < 2500) return;
      goBy(1);
    }, ADVANCE_MS);
  }

  window.addEventListener('resize', render);

  render();
})();
