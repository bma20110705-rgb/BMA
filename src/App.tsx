import React, { useEffect, useRef, useState } from 'react';
import {
  FILMS,
  SHEET,
  INK_BLOBS,
  DECADES,
  DecadeKey,
  LANGUAGES,
  Lang,
  UI_TEXT,
  formatFilmSubtitle,
  formatFilmYear,
  getBackgroundCropStyle,
  getPosterSvgRect,
  smoothstep01,
  computeTapeDimensions,
  wrapRelativeIndex,
  computeTapeTransformState,
  getActiveFilmIndex,
  getDecadeForFilm,
  getTargetForDecadeJump,
} from './lib/filmography';
import { SoloLevelingReader } from './components/SoloLevelingReader';

const ITEM_COUNT = FILMS.length; // 14 items (12 films + Amir Temur book + Solo Leveling manga)
const TOTAL_COPIES = ITEM_COUNT * 3; // 42 virtual copies
const INITIAL_ACTIVE_INDEX = 6; // Solo Leveling at center of shelf
const INITIAL_SCROLL = ITEM_COUNT + INITIAL_ACTIVE_INDEX; // 20

export function App() {
  const probeRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const shelfRef = useRef<HTMLElement | null>(null);
  const tapeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const coverRefs = useRef<(HTMLDivElement | null)[]>([]);
  const playRingRef = useRef<HTMLButtonElement | null>(null);

  const tabsNavRef = useRef<HTMLElement | null>(null);
  const tabIndRef = useRef<HTMLDivElement | null>(null);
  const tabBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const capTitleMaskRef = useRef<HTMLDivElement | null>(null);
  const capSubMaskRef = useRef<HTMLDivElement | null>(null);
  const capYearMaskRef = useRef<HTMLDivElement | null>(null);

  const cursorRef = useRef<HTMLDivElement | null>(null);

  const detailRef = useRef<HTMLDivElement | null>(null);
  const detailLineRefs = useRef<(HTMLElement | null)[]>([]);
  const posterImgRef = useRef<SVGImageElement | null>(null);
  const blobCircleRefs = useRef<(SVGCircleElement | null)[]>([]);

  const [lang, setLang] = useState<Lang>('uz');
  const langRef = useRef<Lang>('uz');

  const [detailFilm, setDetailFilm] = useState(FILMS[INITIAL_ACTIVE_INDEX]);
  const [isScreening, setIsScreening] = useState(true);
  const [mangaPage, setMangaPage] = useState(0);

  // Mutable engine state inside ref so rAF loop runs at 60Hz with zero React re-renders
  const engineRef = useRef({
    s: INITIAL_SCROLL,
    T: INITIAL_SCROLL,
    hover: -1,
    lifts: new Float32Array(TOTAL_COPIES),
    active: INITIAL_ACTIVE_INDEX,
    mx: -100,
    my: -100,
    cx: -100,
    cy: -100,
    tiltX: 0,
    tiltY: 0,
    onCover: false,
    overBtn: false,
    isOpen: false,
    dragging: false,
    dragMoved: false,
    dragStartX: 0,
    dragStartT: INITIAL_SCROLL,
    suppressClickUntil: 0,
    H: 400,
    ws: 67.6,
    d: 210.6,
    gap: 12,
    W: typeof window !== 'undefined' ? window.innerWidth : 1440,
    VH: typeof window !== 'undefined' ? window.innerHeight : 900,
    reducedMotion: false,
    sheetAnim: null as Animation | null,
    lineAnims: [] as Animation[],
    inkRafId: 0,
  });

  const updateDecadeIndicator = (filmIndex: number) => {
    const film = FILMS[filmIndex];
    if (!film) return;
    const activeDecade = getDecadeForFilm(film);
    DECADES.forEach((dec) => {
      const btn = tabBtnRefs.current[dec];
      if (!btn) return;
      if (dec === activeDecade) {
        btn.classList.add('on');
      } else {
        btn.classList.remove('on');
      }
    });
    const activeBtn = tabBtnRefs.current[activeDecade];
    const ind = tabIndRef.current;
    if (activeBtn && ind) {
      ind.style.width = `${activeBtn.offsetWidth}px`;
      ind.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
    }
  };

  const slideMaskLine = (
    maskEl: HTMLElement | null,
    text: string,
    className: string,
    dir: number
  ) => {
    if (!maskEl) return;
    const eng = engineRef.current;
    if (eng.reducedMotion || dir === 0) {
      maskEl.innerHTML = '';
      const span = document.createElement('span');
      span.className = className;
      span.textContent = text;
      maskEl.appendChild(span);
      return;
    }

    const oldSpans = Array.from(maskEl.querySelectorAll('span'));
    const newSpan = document.createElement('span');
    newSpan.className = className;
    newSpan.textContent = text;
    maskEl.appendChild(newSpan);

    oldSpans.forEach((old) => {
      if (old.dataset.leaving === '1') return;
      old.dataset.leaving = '1';
      const computed = getComputedStyle(old).transform;
      const startTransform =
        computed && computed !== 'none' ? computed : 'translateY(0%)';
      const leaveAnim = old.animate(
        [
          { transform: startTransform },
          { transform: `translateY(${-dir * 105}%)` },
        ],
        {
          duration: 650,
          easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          fill: 'both',
        }
      );
      leaveAnim.onfinish = () => {
        old.remove();
      };
    });

    newSpan.animate(
      [
        { transform: `translateY(${dir * 105}%)` },
        { transform: 'translateY(0%)' },
      ],
      {
        duration: 650,
        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        fill: 'both',
      }
    );
  };

  useEffect(() => {
    // Preload all sheet images
    Object.values(SHEET).forEach(([url]) => {
      const img = new Image();
      img.src = url;
    });

    const eng = engineRef.current;
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    eng.reducedMotion = mqReduce.matches;
    const onReduceChange = (e: MediaQueryListEvent) => {
      eng.reducedMotion = e.matches;
    };
    mqReduce.addEventListener('change', onReduceChange);

    // Measure dimensions from probe
    const measure = () => {
      const W = window.innerWidth;
      const VH = window.innerHeight;
      const rawH = probeRef.current
        ? probeRef.current.getBoundingClientRect().height
        : Math.min(VH * 0.46, W * 0.31);
      const H = rawH > 0 ? rawH : Math.min(VH * 0.46, W * 0.31);
      const dims = computeTapeDimensions(H);
      eng.H = dims.H;
      eng.ws = dims.ws;
      eng.d = dims.d;
      eng.gap = dims.gap;
      eng.W = W;
      eng.VH = VH;

      if (stageRef.current) {
        stageRef.current.style.setProperty('--ws', `${dims.ws}px`);
        stageRef.current.style.setProperty('--d', `${dims.d}px`);
      }
      updateDecadeIndicator(eng.active);
    };

    const setActive = (newIdx: number, dir: number) => {
      eng.active = newIdx;
      const film = FILMS[newIdx];
      if (!film) return;
      const currentLang = langRef.current;
      const tr = film.i18n[currentLang];
      const slideDir = dir >= 0 ? 1 : -1;
      slideMaskLine(capTitleMaskRef.current, tr.title, 'cap-title', slideDir);
      slideMaskLine(
        capSubMaskRef.current,
        formatFilmSubtitle(film, currentLang),
        'lbl cap-sub',
        slideDir
      );
      slideMaskLine(
        capYearMaskRef.current,
        formatFilmYear(film),
        'cap-year',
        slideDir
      );
      updateDecadeIndicator(newIdx);
    };

    // Initialize caption & indicator without slide
    const initFilm = FILMS[eng.active];
    const initLang = langRef.current;
    slideMaskLine(
      capTitleMaskRef.current,
      initFilm.i18n[initLang].title,
      'cap-title',
      0
    );
    slideMaskLine(
      capSubMaskRef.current,
      formatFilmSubtitle(initFilm, initLang),
      'lbl cap-sub',
      0
    );
    slideMaskLine(
      capYearMaskRef.current,
      formatFilmYear(initFilm),
      'cap-year',
      0
    );
    measure();

    window.addEventListener('resize', measure);

    // Pointer tracking for cursor & cover tilt
    const onPointerMove = (e: PointerEvent) => {
      eng.mx = e.clientX;
      eng.my = e.clientY;

      if (eng.dragging) {
        const dx = e.clientX - eng.dragStartX;
        if (Math.abs(dx) > 5) {
          eng.dragMoved = true;
        }
        if (eng.dragMoved) {
          eng.T = eng.dragStartT - dx / (eng.ws + eng.gap);
        }
      }
    };

    const onPointerUp = () => {
      if (eng.dragging) {
        const wasMoved = eng.dragMoved;
        eng.dragging = false;
        eng.dragMoved = false;
        if (wasMoved) {
          eng.T = Math.round(eng.T);
          eng.suppressClickUntil = performance.now() + 250;
        }
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });

    // Wheel scrolling
    let wheelTimer: ReturnType<typeof setTimeout> | null = null;
    const onWheel = (e: WheelEvent) => {
      if (eng.isOpen) return;
      e.preventDefault();
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      eng.T += (delta / (eng.ws + eng.gap)) * 0.5;
      if (wheelTimer) clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        eng.T = Math.round(eng.T);
      }, 160);
    };
    window.addEventListener('wheel', onWheel, { passive: false });

    // Keyboard navigation
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && eng.isOpen) {
        e.preventDefault();
        closeDetail();
        return;
      }
      if (eng.isOpen) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        eng.T = Math.round(eng.T) + 1;
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        eng.T = Math.round(eng.T) - 1;
      } else if (
        e.key === 'Enter' &&
        (document.activeElement === document.body ||
          document.activeElement === document.documentElement)
      ) {
        e.preventDefault();
        openDetail();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    // Main rAF loop
    let lastTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      // 1. Scroll spring
      const diff = eng.T - eng.s;
      if (eng.reducedMotion) {
        eng.s = eng.T;
      } else {
        const k = eng.dragging && eng.dragMoved ? 18 : 5.2;
        if (Math.abs(diff) < 1e-4) {
          eng.s = eng.T;
        } else {
          eng.s += diff * (1 - Math.exp(-k * dt));
        }
      }

      // 2. Normalise loop if drifted beyond ±4 full loops
      if (Math.abs(eng.s - INITIAL_SCROLL) > ITEM_COUNT * 4) {
        const shiftLoops =
          Math.trunc((eng.s - INITIAL_SCROLL) / TOTAL_COPIES) * TOTAL_COPIES;
        eng.s -= shiftLoops;
        eng.T -= shiftLoops;
        if (eng.dragging) {
          eng.dragStartT -= shiftLoops;
        }
      }

      // 3. Check active film caption update
      const curActive = getActiveFilmIndex(eng.s);
      if (curActive !== eng.active) {
        const dir = Math.sign(eng.T - eng.s) || 1;
        setActive(curActive, dir);
      }

      // 4. Cursor & Tilt towards pointer
      const shelfCentreY = eng.VH * 0.5;
      const almostSettled = Math.abs(eng.T - eng.s) < 0.3;
      const withinCoverX = Math.abs(eng.mx - eng.W * 0.5) <= 0.55 * eng.d;
      const withinCoverY = Math.abs(eng.my - shelfCentreY) <= 0.55 * eng.H;
      const isOnCover =
        !eng.isOpen && almostSettled && withinCoverX && withinCoverY;
      eng.onCover = isOnCover;

      let targetTiltY = 0;
      let targetTiltX = 0;
      if (!eng.reducedMotion && eng.mx >= 0) {
        if (isOnCover) {
          targetTiltY = ((eng.mx - eng.W * 0.5) / (0.55 * eng.d)) * 9;
          targetTiltX = -((eng.my - shelfCentreY) / (eng.H * 0.5)) * 6;
        } else {
          targetTiltY = ((eng.mx - eng.W * 0.5) / eng.W) * 5;
          targetTiltX = 0;
        }
      }
      const tiltEase = eng.reducedMotion ? 1 : 1 - Math.exp(-7 * dt);
      eng.tiltY += (targetTiltY - eng.tiltY) * tiltEase;
      eng.tiltX += (targetTiltX - eng.tiltX) * tiltEase;

      // 5. Render 39 tapes with direct 3D face transforms
      const liftEase = eng.reducedMotion ? 1 : 1 - Math.exp(-12 * dt);
      const cullHalfWidth = eng.W * 0.5 + 1.5 * eng.d;
      const halfD = eng.d * 0.5;
      const halfWs = eng.ws * 0.5;

      for (let v = 0; v < TOTAL_COPIES; v++) {
        const tapeEl = tapeRefs.current[v];
        if (!tapeEl) continue;

        const r = wrapRelativeIndex(v, eng.s, TOTAL_COPIES);
        const isHoveredSpine =
          !eng.isOpen && eng.hover === v && Math.abs(r) > 0.5;
        const liftTarget = isHoveredSpine ? 1 : 0;
        eng.lifts[v] += (liftTarget - eng.lifts[v]) * liftEase;

        const state = computeTapeTransformState(
          r,
          eng.H,
          eng.ws,
          eng.d,
          eng.gap,
          eng.lifts[v],
          eng.tiltX,
          eng.tiltY
        );

        if (Math.abs(state.x) > cullHalfWidth) {
          tapeEl.style.visibility = 'hidden';
          continue;
        }

        tapeEl.style.visibility = 'visible';
        tapeEl.style.zIndex = String(state.zIndex);

        const baseTransform = `translate3d(${state.x.toFixed(2)}px, ${state.ty.toFixed(2)}px, ${state.tz.toFixed(2)}px) rotateZ(${state.rotZ.toFixed(3)}deg) rotateX(${state.rotX.toFixed(3)}deg)`;
        const spEl = spineRefs.current[v];
        const cvEl = coverRefs.current[v];

        if (spEl) {
          spEl.style.transform = `${baseTransform} rotateY(${state.rotY.toFixed(3)}deg) translateZ(${halfD.toFixed(2)}px)`;
          spEl.style.setProperty('--shade', state.spineShade.toFixed(3));
        }
        if (cvEl) {
          cvEl.style.transform = `${baseTransform} rotateY(${(state.rotY + 90).toFixed(3)}deg) translateZ(${halfWs.toFixed(2)}px)`;
          cvEl.style.setProperty('--shade', state.coverShade.toFixed(3));
        }
      }

      // 6. Play ring position & scale
      if (playRingRef.current) {
        const playLeft = eng.W * 0.5 - 0.5 * eng.d - 6;
        const playTop = shelfCentreY + 0.36 * eng.H;
        const playScale = eng.isOpen
          ? 0
          : smoothstep01(Math.max(0, 1 - Math.abs(eng.T - eng.s) * 3));
        playRingRef.current.style.left = `${playLeft}px`;
        playRingRef.current.style.top = `${playTop}px`;
        playRingRef.current.style.transform = `scale(${playScale.toFixed(3)})`;
      }

      // 7. Custom cursor position & state
      const curEase = eng.reducedMotion ? 1 : 1 - Math.exp(-16 * dt);
      eng.cx += (eng.mx - eng.cx) * curEase;
      eng.cy += (eng.my - eng.cy) * curEase;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${eng.cx.toFixed(2)}px, ${eng.cy.toFixed(2)}px, 0)`;

        let cursorClass = 'cursor';
        if (eng.overBtn) {
          cursorClass = 'cursor btn';
        } else if (!eng.isOpen && eng.onCover) {
          cursorClass = 'cursor open';
        } else if (!eng.isOpen && eng.hover !== -1) {
          const rHover = wrapRelativeIndex(eng.hover, eng.s, TOTAL_COPIES);
          if (Math.abs(rHover) > 0.5) {
            cursorClass = 'cursor spine';
          }
        }
        if (cursorRef.current.className !== cursorClass) {
          cursorRef.current.className = cursorClass;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (eng.inkRafId) cancelAnimationFrame(eng.inkRafId);
      if (wheelTimer) clearTimeout(wheelTimer);
      window.removeEventListener('resize', measure);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      mqReduce.removeEventListener('change', onReduceChange);
    };
  }, []);

  // Switch language handler
  const handleSelectLanguage = (
    nextLang: Lang,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (e.detail > 0) e.currentTarget.blur();
    if (nextLang === langRef.current) return;
    langRef.current = nextLang;
    setLang(nextLang);

    const eng = engineRef.current;
    const film = FILMS[eng.active];
    if (film) {
      slideMaskLine(
        capTitleMaskRef.current,
        film.i18n[nextLang].title,
        'cap-title',
        1
      );
      slideMaskLine(
        capSubMaskRef.current,
        formatFilmSubtitle(film, nextLang),
        'lbl cap-sub',
        1
      );
    }
    requestAnimationFrame(() => {
      updateDecadeIndicator(eng.active);
    });
  };

  // Open Detail sequence
  const openDetail = () => {
    const eng = engineRef.current;
    if (eng.isOpen) return;

    // 1. Prepare
    eng.T = Math.round(eng.T);
    eng.isOpen = true;
    eng.hover = -1;

    const activeFilmIdx = getActiveFilmIndex(eng.T);
    const film = FILMS[activeFilmIdx];
    setDetailFilm(film);
    setMangaPage(0);
    // Automatically open the interactive Manga Reader when clicking Solo Leveling
    setIsScreening(Boolean(film.isManga));

    // Point poster <image> at cover sheet crop
    const posterRect = getPosterSvgRect(film.id);
    if (posterImgRef.current) {
      posterImgRef.current.setAttribute('href', posterRect.href);
      posterImgRef.current.setAttribute('x', String(posterRect.x));
      posterImgRef.current.setAttribute('y', String(posterRect.y));
      posterImgRef.current.setAttribute('width', String(posterRect.width));
      posterImgRef.current.setAttribute('height', String(posterRect.height));
    }

    // Reset all blob radii to 0
    blobCircleRefs.current.forEach((circle) => {
      if (circle) circle.setAttribute('r', '0');
    });

    // Find active virtual copy cover face bounding rect
    let activeVirtualIndex = Math.round(eng.s);
    activeVirtualIndex =
      ((activeVirtualIndex % TOTAL_COPIES) + TOTAL_COPIES) % TOTAL_COPIES;
    const activeCoverEl = coverRefs.current[activeVirtualIndex];
    const rect = activeCoverEl
      ? activeCoverEl.getBoundingClientRect()
      : new DOMRect(
          eng.W * 0.5 - eng.d * 0.5,
          eng.VH * 0.5 - eng.H * 0.5,
          eng.d,
          eng.H
        );

    const dialogEl = detailRef.current;
    if (!dialogEl) return;

    // Cancel any previous animations
    if (eng.sheetAnim) eng.sheetAnim.cancel();
    eng.lineAnims.forEach((a) => a.cancel());
    eng.lineAnims = [];
    if (eng.inkRafId) cancelAnimationFrame(eng.inkRafId);

    const cx = rect.left + rect.width * 0.5;
    const cy = rect.top + rect.height * 0.5;
    const topInset = Math.max(0, rect.top);
    const rightInset = Math.max(0, eng.W - rect.right);
    const bottomInset = Math.max(0, eng.VH - rect.bottom);
    const leftInset = Math.max(0, rect.left);

    dialogEl.style.visibility = 'visible';
    dialogEl.style.transformOrigin = `${cx}px ${cy}px`;

    // 2. Sheet grows out of the cover
    const sheetDuration = eng.reducedMotion ? 1 : 1050;
    eng.sheetAnim = dialogEl.animate(
      [
        {
          clipPath: `inset(${topInset}px ${rightInset}px ${bottomInset}px ${leftInset}px round 3px)`,
          transform: 'rotate(-4.5deg)',
        },
        {
          clipPath: 'inset(0px 0px 0px 0px round 0px)',
          transform: 'rotate(0deg)',
        },
      ],
      {
        duration: sheetDuration,
        easing: 'cubic-bezier(0.76, 0, 0.18, 1)',
        fill: 'both',
      }
    );

    // 3. Text rises
    detailLineRefs.current.forEach((lineEl, index) => {
      if (!lineEl) return;
      const anim = lineEl.animate(
        [{ transform: 'translateY(110%)' }, { transform: 'translateY(0%)' }],
        {
          duration: eng.reducedMotion ? 1 : 900,
          delay: eng.reducedMotion ? 0 : 620 + index * 75,
          easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          fill: 'both',
        }
      );
      eng.lineAnims.push(anim);
    });

    // 4. Poster bleeds in
    const openStartTime = eng.reducedMotion
      ? performance.now() - 5000
      : performance.now();

    const animateInk = (now: number) => {
      const elapsed = now - openStartTime;
      const bleedElapsed = elapsed - 520;

      if (bleedElapsed >= 0) {
        INK_BLOBS.forEach((blob, i) => {
          const circle = blobCircleRefs.current[i];
          if (!circle) return;
          const localElapsed = bleedElapsed - blob.delay;
          if (localElapsed <= 0) {
            circle.setAttribute('r', '0');
          } else {
            const p = Math.min(1, localElapsed / 1250);
            const eased = 1 - Math.pow(1 - p, 3);
            circle.setAttribute('r', (eased * 720).toFixed(2));
          }
        });
      }

      if (elapsed < 2400 && eng.isOpen) {
        eng.inkRafId = requestAnimationFrame(animateInk);
      }
    };

    eng.inkRafId = requestAnimationFrame(animateInk);
  };

  // Close Detail sequence
  const closeDetail = () => {
    const eng = engineRef.current;
    if (!eng.isOpen) return;
    eng.isOpen = false;
    setIsScreening(false);

    if (eng.inkRafId) {
      cancelAnimationFrame(eng.inkRafId);
      eng.inkRafId = 0;
    }

    const dialogEl = detailRef.current;
    if (!dialogEl) return;

    let activeVirtualIndex = Math.round(eng.s);
    activeVirtualIndex =
      ((activeVirtualIndex % TOTAL_COPIES) + TOTAL_COPIES) % TOTAL_COPIES;
    const activeCoverEl = coverRefs.current[activeVirtualIndex];
    const rect = activeCoverEl
      ? activeCoverEl.getBoundingClientRect()
      : new DOMRect(
          eng.W * 0.5 - eng.d * 0.5,
          eng.VH * 0.5 - eng.H * 0.5,
          eng.d,
          eng.H
        );

    const cx = rect.left + rect.width * 0.5;
    const cy = rect.top + rect.height * 0.5;
    const topInset = Math.max(0, rect.top);
    const rightInset = Math.max(0, eng.W - rect.right);
    const bottomInset = Math.max(0, eng.VH - rect.bottom);
    const leftInset = Math.max(0, rect.left);

    dialogEl.style.transformOrigin = `${cx}px ${cy}px`;

    if (eng.sheetAnim) eng.sheetAnim.cancel();
    const closeAnim = dialogEl.animate(
      [
        {
          clipPath: 'inset(0px 0px 0px 0px round 0px)',
          transform: 'rotate(0deg)',
        },
        {
          clipPath: `inset(${topInset}px ${rightInset}px ${bottomInset}px ${leftInset}px round 3px)`,
          transform: 'rotate(-4.5deg)',
        },
      ],
      {
        duration: eng.reducedMotion ? 1 : 850,
        easing: 'cubic-bezier(0.76, 0, 0.18, 1)',
        fill: 'both',
      }
    );
    eng.sheetAnim = closeAnim;

    closeAnim.onfinish = () => {
      if (!eng.isOpen && detailRef.current) {
        detailRef.current.style.visibility = 'hidden';
        if (eng.sheetAnim) {
          eng.sheetAnim.cancel();
          eng.sheetAnim = null;
        }
        eng.lineAnims.forEach((a) => a.cancel());
        eng.lineAnims = [];
      }
    };
  };

  const handleTapeClick = (v: number) => {
    const eng = engineRef.current;
    if (performance.now() < eng.suppressClickUntil) return;
    const r = wrapRelativeIndex(v, eng.s, TOTAL_COPIES);
    if (Math.abs(r) < 0.5) {
      openDetail();
    } else {
      eng.T = Math.round(eng.T + r);
    }
  };

  const handleShelfPointerDown = (e: React.PointerEvent) => {
    const eng = engineRef.current;
    if (eng.isOpen) return;
    eng.dragging = true;
    eng.dragMoved = false;
    eng.dragStartX = e.clientX;
    eng.dragStartT = eng.T;
  };

  const handleDecadeClick = (
    decade: DecadeKey,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (e.detail > 0) e.currentTarget.blur();
    const eng = engineRef.current;
    eng.T = getTargetForDecadeJump(eng.T, decade);
  };

  const handleBtnEnter = () => {
    engineRef.current.overBtn = true;
  };

  const handleBtnLeave = () => {
    engineRef.current.overBtn = false;
  };

  const initialPosterRect = getPosterSvgRect(detailFilm.id);
  const ui = UI_TEXT[lang];
  const detailLocalized = detailFilm.i18n[lang];

  return (
    <>
      {/* Off-screen height probe for --H */}
      <div ref={probeRef} className="h-probe" aria-hidden="true" />

      {/* Paper grain overlay */}
      <div className="paper-grain" aria-hidden="true" />

      {/* 1. Top bar */}
      <header className="top-bar">
        <a
          href="#back"
          className="lbl box top-back"
          onPointerEnter={handleBtnEnter}
          onPointerLeave={handleBtnLeave}
          onClick={(e) => {
            e.preventDefault();
            if (engineRef.current.isOpen) {
              closeDetail();
            } else {
              engineRef.current.T = getTargetForDecadeJump(
                engineRef.current.T,
                'manga'
              );
            }
          }}
        >
          {ui.back}
        </a>

        <div className="logo" aria-label="BMA studio">
          <span className="logo-zh">BMA studio</span>
          <span className="logo-en">BMA STUDIO</span>
        </div>

        <div className="lang-switch" role="group" aria-label="Language">
          {LANGUAGES.map((item) => (
            <button
              key={item.code}
              type="button"
              className={`lbl lang-btn ${lang === item.code ? 'on' : ''}`}
              onPointerEnter={handleBtnEnter}
              onPointerLeave={handleBtnLeave}
              onClick={(e) => handleSelectLanguage(item.code, e)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* 2. Decade, Manga & Book tabs */}
      <nav ref={tabsNavRef} className="tabs" aria-label="Decades">
        <div ref={tabIndRef} className="tab-ind" aria-hidden="true" />
        {DECADES.map((dec) => {
          let label: string = dec;
          if (dec === 'all') label = ui.all;
          else if (dec === 'manga') label = ui.mangaTab;
          else if (dec === 'book') label = ui.bookTab;
          return (
            <button
              key={dec}
              ref={(el) => {
                tabBtnRefs.current[dec] = el;
              }}
              type="button"
              className={`lbl tab ${dec === 'manga' ? 'on' : ''}`}
              onPointerEnter={handleBtnEnter}
              onPointerLeave={handleBtnLeave}
              onClick={(e) => handleDecadeClick(dec, e)}
            >
              {label}
            </button>
          );
        })}
      </nav>

      {/* 3. The 3D VHS & Book Shelf */}
      <section
        ref={shelfRef}
        className="shelf"
        aria-label="Filmography shelf"
        onPointerDown={handleShelfPointerDown}
      >
        <div ref={stageRef} className="stage">
          {Array.from({ length: TOTAL_COPIES }, (_, v) => {
            const film = FILMS[v % ITEM_COUNT];
            const spineStyle = getBackgroundCropStyle(`spine-${film.id}`);
            const coverStyle = getBackgroundCropStyle(`cover-${film.id}`);
            return (
              <div
                key={v}
                ref={(el) => {
                  tapeRefs.current[v] = el;
                }}
                className="tape"
                data-virtual-index={v}
                data-film-id={film.id}
                onPointerEnter={() => {
                  engineRef.current.hover = v;
                }}
                onPointerLeave={() => {
                  if (engineRef.current.hover === v) {
                    engineRef.current.hover = -1;
                  }
                }}
                onClick={() => handleTapeClick(v)}
              >
                <div
                  ref={(el) => {
                    spineRefs.current[v] = el;
                  }}
                  className="face sp"
                  style={spineStyle}
                />
                <div
                  ref={(el) => {
                    coverRefs.current[v] = el;
                  }}
                  className="face cv"
                  style={coverStyle}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Play ring */}
      <button
        ref={playRingRef}
        type="button"
        className="play-ring"
        aria-label={ui.openFilm}
        onPointerEnter={handleBtnEnter}
        onPointerLeave={handleBtnLeave}
        onClick={openDetail}
      >
        <svg className="play-tri" viewBox="0 0 12 12" aria-hidden="true">
          <polygon points="1.5,1 11,6 1.5,11" fill="currentColor" />
        </svg>
      </button>

      {/* 5. Caption */}
      <div className="caption" aria-live="polite">
        <div ref={capTitleMaskRef} className="cap-mask" />
        <div ref={capSubMaskRef} className="cap-mask" />
        <div ref={capYearMaskRef} className="cap-mask" />
      </div>

      {/* 6. Arrows */}
      <button
        type="button"
        className="arrow-btn arrow-prev"
        aria-label={ui.prevFilm}
        onPointerEnter={handleBtnEnter}
        onPointerLeave={handleBtnLeave}
        onClick={(e) => {
          if (e.detail > 0) e.currentTarget.blur();
          engineRef.current.T = Math.round(engineRef.current.T) - 1;
        }}
      >
        <svg width="18" height="10" viewBox="0 0 18 10" aria-hidden="true">
          <path
            d="M5 1 L1 5 L5 9 M1 5 L17 5"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      </button>

      <button
        type="button"
        className="arrow-btn arrow-next"
        aria-label={ui.nextFilm}
        onPointerEnter={handleBtnEnter}
        onPointerLeave={handleBtnLeave}
        onClick={(e) => {
          if (e.detail > 0) e.currentTarget.blur();
          engineRef.current.T = Math.round(engineRef.current.T) + 1;
        }}
      >
        <svg width="18" height="10" viewBox="0 0 18 10" aria-hidden="true">
          <path
            d="M13 1 L17 5 L13 9 M17 5 L1 5"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      </button>

      {/* 7. Footer */}
      <footer className="footer">
        <div className="lbl">Bakhramov M</div>
        <div className="lbl">
          <a
            href="#fb"
            className="foot-link"
            onPointerEnter={handleBtnEnter}
            onPointerLeave={handleBtnLeave}
            onClick={(e) => e.preventDefault()}
          >
            FB
          </a>{' '}
          /{' '}
          <a
            href="#tw"
            className="foot-link"
            onPointerEnter={handleBtnEnter}
            onPointerLeave={handleBtnLeave}
            onClick={(e) => e.preventDefault()}
          >
            TW
          </a>
        </div>
      </footer>

      {/* 8. Detail Sheet Dialog */}
      <div
        ref={detailRef}
        className="detail"
        role="dialog"
        aria-modal="true"
        aria-label={detailLocalized.title}
      >
        <button
          type="button"
          className="lbl box detail-close"
          onPointerEnter={handleBtnEnter}
          onPointerLeave={handleBtnLeave}
          onClick={closeDetail}
        >
          {ui.close}
        </button>

        <div className="detail-top" aria-hidden="true">
          <div className="logo">
            <span className="logo-zh">BMA studio</span>
            <span className="logo-en">BMA STUDIO</span>
          </div>
        </div>

        <div className="detail-left">
          <div className="d-mask">
            <span
              ref={(el) => {
                detailLineRefs.current[0] = el;
              }}
              className="d-line lbl d-sub"
            >
              {formatFilmSubtitle(detailFilm, lang)}
            </span>
          </div>

          <div className="d-mask">
            <h1
              ref={(el) => {
                detailLineRefs.current[1] = el;
              }}
              className="d-line d-title"
            >
              {detailLocalized.title}
            </h1>
          </div>

          <div className="d-mask">
            <span
              ref={(el) => {
                detailLineRefs.current[2] = el;
              }}
              className="d-line lbl d-meta"
            >
              {formatFilmYear(detailFilm)} /{' '}
              {detailLocalized.genre.toUpperCase()} /{' '}
              {detailFilm.isManga
                ? ui.mangaPages
                : detailFilm.isBook
                  ? ui.pages
                  : `${detailFilm.minutes} ${ui.min}`}
            </span>
          </div>

          <div className="d-mask">
            <p
              ref={(el) => {
                detailLineRefs.current[3] = el;
              }}
              className="d-line d-syn"
            >
              {detailLocalized.synopsis}
            </p>
          </div>

          <div className="d-mask">
            <p
              ref={(el) => {
                detailLineRefs.current[4] = el;
              }}
              className="d-line d-cred"
            >
              {detailFilm.isManga
                ? ui.mangaCredit
                : detailFilm.isBook
                  ? ui.bookCredit
                  : ui.credit}
            </p>
          </div>

          <div className="d-mask">
            <div
              ref={(el) => {
                detailLineRefs.current[5] = el;
              }}
              className="d-line detail-actions"
            >
              <button
                type="button"
                className={`lbl box detail-watch ${isScreening ? 'playing' : ''}`}
                onPointerEnter={handleBtnEnter}
                onPointerLeave={handleBtnLeave}
                onClick={() => setIsScreening((prev) => !prev)}
              >
                {detailFilm.isManga
                  ? isScreening
                    ? ui.viewCover
                    : ui.readManga
                  : detailFilm.isBook
                    ? isScreening
                      ? ui.closeBook
                      : ui.readBook
                    : isScreening
                      ? `${ui.playing} #${detailFilm.year}`
                      : ui.watch}
              </button>

              {detailFilm.isBook && detailFilm.bookUrl && (
                <a
                  href={detailFilm.bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lbl box detail-ext-link"
                  onPointerEnter={handleBtnEnter}
                  onPointerLeave={handleBtnLeave}
                >
                  {ui.openArchive}
                </a>
              )}

              {detailFilm.isManga && detailFilm.tappytoonUrl && (
                <a
                  href={detailFilm.tappytoonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lbl box detail-ext-link"
                  onPointerEnter={handleBtnEnter}
                  onPointerLeave={handleBtnLeave}
                >
                  {ui.tappytoonBtn}
                </a>
              )}

              {detailFilm.isManga && detailFilm.crunchyrollUrl && (
                <a
                  href={detailFilm.crunchyrollUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lbl box detail-ext-link"
                  onPointerEnter={handleBtnEnter}
                  onPointerLeave={handleBtnLeave}
                >
                  {ui.crunchyrollBtn}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="detail-right">
          {detailFilm.isManga && isScreening ? (
            <SoloLevelingReader
              lang={lang}
              pageIndex={mangaPage}
              onChangePage={setMangaPage}
              onBtnEnter={handleBtnEnter}
              onBtnLeave={handleBtnLeave}
            />
          ) : detailFilm.isBook && isScreening && detailFilm.bookEmbedUrl ? (
            <div className="book-reader-wrap">
              <iframe
                src={detailFilm.bookEmbedUrl}
                title="Amir Temur — 2up Book Reader"
                className="book-reader-iframe"
                allowFullScreen
              />
            </div>
          ) : (
            <svg
              className="poster-svg"
              viewBox="0 0 474 900"
              aria-hidden="true"
            >
              <defs>
                <clipPath id="poster-clip">
                  <rect width="474" height="900" rx="2" />
                </clipPath>
                <filter
                  id="ink-flt"
                  x="-40%"
                  y="-40%"
                  width="180%"
                  height="180%"
                  filterUnits="userSpaceOnUse"
                >
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.011"
                    numOctaves="3"
                    seed="7"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="120"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
                <mask
                  id="ink-mask"
                  maskUnits="userSpaceOnUse"
                  x="-200"
                  y="-200"
                  width="874"
                  height="1300"
                >
                  <rect
                    x="-200"
                    y="-200"
                    width="874"
                    height="1300"
                    fill="black"
                  />
                  <g filter="url(#ink-flt)" fill="white">
                    {INK_BLOBS.map((blob, i) => (
                      <circle
                        key={i}
                        ref={(el) => {
                          blobCircleRefs.current[i] = el;
                        }}
                        cx={blob.cx}
                        cy={blob.cy}
                        r="720"
                      />
                    ))}
                  </g>
                </mask>
              </defs>
              <g clipPath="url(#poster-clip)" mask="url(#ink-mask)">
                <image
                  ref={posterImgRef}
                  href={initialPosterRect.href}
                  x={initialPosterRect.x}
                  y={initialPosterRect.y}
                  width={initialPosterRect.width}
                  height={initialPosterRect.height}
                  preserveAspectRatio="none"
                />
              </g>
            </svg>
          )}
        </div>
      </div>

      {/* 9. Custom Cursor */}
      <div ref={cursorRef} className="cursor" aria-hidden="true">
        <div className="cur-ring" />
        <div className="cur-dot" />
        <div className="cur-lbl">
          <span>{ui.open}</span>
        </div>
      </div>
    </>
  );
}

export default App;
