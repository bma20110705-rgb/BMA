import React from 'react';
import { Lang } from '../lib/filmography';
import {
  SOLO_LEVELING_PAGES,
  SOLO_LEVELING_LINKS,
} from '../lib/soloLevelingManga';

interface SoloLevelingReaderProps {
  lang: Lang;
  pageIndex: number;
  onChangePage: (nextIndex: number) => void;
  onBtnEnter: () => void;
  onBtnLeave: () => void;
}

const READER_LABELS: Record<
  Lang,
  {
    prev: string;
    next: string;
    pageOf: (cur: number, total: number) => string;
    ariseText: string;
    systemHeader: string;
  }
> = {
  uz: {
    prev: '◀ OLDINGI SAHIFA',
    next: 'KEYINGI SAHIFA ▶',
    pageOf: (c, t) => `SAHIFA ${c} / ${t}`,
    ariseText: 'TURINGLAR! (ARISE)',
    systemHeader: '! TIZIM XABARNOMASI [SYSTEM]',
  },
  ru: {
    prev: '◀ ПРЕД. СТРАНИЦА',
    next: 'СЛЕД. СТРАНИЦА ▶',
    pageOf: (c, t) => `СТРАНИЦА ${c} / ${t}`,
    ariseText: 'ВОССТАНЬТЕ! (ARISE)',
    systemHeader: '! УВЕДОМЛЕНИЕ СИСТЕМЫ [SYSTEM]',
  },
  en: {
    prev: '◀ PREV PAGE',
    next: 'NEXT PAGE ▶',
    pageOf: (c, t) => `PAGE ${c} / ${t}`,
    ariseText: 'ARISE!',
    systemHeader: '! SYSTEM NOTIFICATION',
  },
};

export const SoloLevelingReader: React.FC<SoloLevelingReaderProps> = ({
  lang,
  pageIndex,
  onChangePage,
  onBtnEnter,
  onBtnLeave,
}) => {
  const totalPages = SOLO_LEVELING_PAGES.length;
  const safeIndex = Math.max(0, Math.min(totalPages - 1, pageIndex));
  const page = SOLO_LEVELING_PAGES[safeIndex];
  const labels = READER_LABELS[lang];

  const renderMangaArt = (num: number) => {
    switch (num) {
      case 1:
        return (
          <div className="manga-art-stage">
            <img
              src={SOLO_LEVELING_LINKS.coverImage}
              alt="Solo Leveling Vol. 10 Cover"
              referrerPolicy="no-referrer"
              className="manga-cover-img"
            />
            <div className="manga-bubble manga-bubble-top">
              {page.panelTopText[lang]}
            </div>
            <div className="manga-bubble manga-bubble-bottom">
              {page.panelBottomText[lang]}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="manga-art-stage">
            <svg
              viewBox="0 0 600 760"
              className="manga-svg-canvas"
              aria-label={page.title[lang]}
            >
              <defs>
                <linearGradient id="slBg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#090714" />
                  <stop offset="55%" stopColor="#1A1033" />
                  <stop offset="100%" stopColor="#08060E" />
                </linearGradient>
                <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FF3B5C" />
                  <stop offset="50%" stopColor="#D90429" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#D90429" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="600" height="760" fill="url(#slBg2)" />
              {/* Panel 1: Giant Statue of God */}
              <g>
                <rect
                  x="16"
                  y="16"
                  width="568"
                  height="430"
                  fill="#0D0A1A"
                  stroke="#7C3AED"
                  strokeWidth="2"
                />
                {/* Stone Throne & Colossus Silhouette */}
                <path
                  d="M90 446 L90 150 L145 150 L145 446 M455 446 L455 150 L510 150 L510 446"
                  fill="#19132E"
                />
                <path
                  d="M140 446 L175 235 L235 195 L250 110 L300 75 L350 110 L365 195 L425 235 L460 446 Z"
                  fill="#231B3F"
                  stroke="#5B21B6"
                  strokeWidth="2"
                />
                {/* Crown spires */}
                <polygon
                  points="250,110 265,48 285,95 300,38 315,95 335,48 350,110"
                  fill="#3B2D66"
                />
                {/* Glowing Crimson Eyes */}
                <circle cx="272" cy="142" r="28" fill="url(#eyeGlow)" />
                <circle cx="328" cy="142" r="28" fill="url(#eyeGlow)" />
                <polygon points="254,140 288,145 262,149" fill="#FFF" />
                <polygon points="346,140 312,145 338,149" fill="#FFF" />
                {/* Eerie Smile */}
                <path
                  d="M262 178 Q300 202 338 178"
                  stroke="#F43F5E"
                  strokeWidth="3.5"
                  fill="none"
                />
                {/* Laser beams */}
                <line
                  x1="272"
                  y1="142"
                  x2="120"
                  y2="430"
                  stroke="#FB7185"
                  strokeWidth="4"
                  strokeOpacity="0.75"
                />
                <line
                  x1="328"
                  y1="142"
                  x2="470"
                  y2="430"
                  stroke="#FB7185"
                  strokeWidth="4"
                  strokeOpacity="0.75"
                />
              </g>
              {/* Panel 2: Sacrificial Altar & Blue Flames */}
              <g>
                <rect
                  x="16"
                  y="462"
                  width="568"
                  height="282"
                  fill="#0B0917"
                  stroke="#38BDF8"
                  strokeWidth="2"
                />
                <ellipse
                  cx="300"
                  cy="640"
                  rx="210"
                  ry="55"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                  strokeDasharray="10 6"
                />
                <ellipse
                  cx="300"
                  cy="640"
                  rx="145"
                  ry="36"
                  fill="#0284C7"
                  fillOpacity="0.25"
                />
                {/* Jin-Woo Silhouette on Altar */}
                <path
                  d="M265 655 L282 565 L300 540 L322 565 L338 655 Z"
                  fill="#090714"
                  stroke="#7DD3FC"
                  strokeWidth="2"
                />
                {/* Blue Ritual Flames */}
                <path
                  d="M120 640 Q130 570 145 640 M200 665 Q210 595 225 665 M380 665 Q390 595 405 665 M465 640 Q475 570 490 640"
                  stroke="#38BDF8"
                  strokeWidth="5"
                  fill="none"
                />
              </g>
            </svg>
            <div className="manga-bubble manga-bubble-top">
              {page.panelTopText[lang]}
            </div>
            <div className="manga-bubble manga-bubble-bottom">
              {page.panelBottomText[lang]}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="manga-art-stage">
            <svg
              viewBox="0 0 600 760"
              className="manga-svg-canvas"
              aria-label={page.title[lang]}
            >
              <rect width="600" height="760" fill="#060B19" />
              {/* Holographic System Window */}
              <rect
                x="34"
                y="95"
                width="532"
                height="350"
                rx="6"
                fill="#082F49"
                fillOpacity="0.88"
                stroke="#38BDF8"
                strokeWidth="3"
              />
              <rect
                x="46"
                y="107"
                width="508"
                height="326"
                rx="4"
                fill="none"
                stroke="#7DD3FC"
                strokeWidth="1"
                strokeOpacity="0.6"
              />
              <circle
                cx="300"
                cy="168"
                r="32"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="3"
              />
              <text
                x="300"
                y="181"
                textAnchor="middle"
                fill="#7DD3FC"
                fontFamily="sans-serif"
                fontWeight="800"
                fontSize="38"
              >
                !
              </text>
              <text
                x="300"
                y="232"
                textAnchor="middle"
                fill="#E0F2FE"
                fontFamily="sans-serif"
                fontWeight="700"
                fontSize="20"
                letterSpacing="3"
              >
                {labels.systemHeader}
              </text>
              <line
                x1="90"
                y1="252"
                x2="510"
                y2="252"
                stroke="#38BDF8"
                strokeWidth="1.5"
              />
              <rect
                x="170"
                y="340"
                width="115"
                height="44"
                rx="4"
                fill="#0284C7"
                stroke="#BAE6FD"
                strokeWidth="2"
              />
              <text
                x="227"
                y="368"
                textAnchor="middle"
                fill="#FFF"
                fontFamily="sans-serif"
                fontWeight="700"
                fontSize="16"
              >
                YES / HA
              </text>
              <rect
                x="315"
                y="340"
                width="115"
                height="44"
                rx="4"
                fill="none"
                stroke="#64748B"
                strokeWidth="2"
              />
              <text
                x="372"
                y="368"
                textAnchor="middle"
                fill="#94A3B8"
                fontFamily="sans-serif"
                fontWeight="700"
                fontSize="16"
              >
                NO / YO‘Q
              </text>
              {/* Panel 2: Jin-Woo Awakening Eyes */}
              <rect
                x="34"
                y="470"
                width="532"
                height="200"
                fill="#090D1F"
                stroke="#38BDF8"
                strokeWidth="2"
              />
              <path
                d="M110 575 Q200 520 265 575 Q200 595 110 575 Z"
                fill="#38BDF8"
              />
              <path
                d="M335 575 Q400 520 490 575 Q400 595 335 575 Z"
                fill="#38BDF8"
              />
              <circle cx="205" cy="568" r="14" fill="#FFF" />
              <circle cx="395" cy="568" r="14" fill="#FFF" />
            </svg>
            <div className="manga-bubble manga-bubble-top">
              {page.panelTopText[lang]}
            </div>
            <div className="manga-bubble manga-bubble-bottom">
              {page.panelBottomText[lang]}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="manga-art-stage">
            <svg
              viewBox="0 0 600 760"
              className="manga-svg-canvas"
              aria-label={page.title[lang]}
            >
              <rect width="600" height="760" fill="#120817" />
              {/* Diagonal Speed Lines */}
              <g stroke="#F43F5E" strokeOpacity="0.28" strokeWidth="2">
                <line x1="0" y1="120" x2="600" y2="420" />
                <line x1="0" y1="220" x2="600" y2="520" />
                <line x1="0" y1="320" x2="600" y2="620" />
                <line x1="600" y1="90" x2="0" y2="490" />
                <line x1="600" y1="210" x2="0" y2="610" />
              </g>
              {/* Blood-Red Commander Igris Silhouette */}
              <path
                d="M300 75 C365 55 445 95 475 180 C430 140 375 135 335 160 Z"
                fill="#E11D48"
              />
              <polygon
                points="300,130 350,210 330,300 270,300 250,210"
                fill="#1E1B2E"
                stroke="#F43F5E"
                strokeWidth="3"
              />
              <polygon points="272,215 295,228 276,236" fill="#FB7185" />
              <polygon points="328,215 305,228 324,236" fill="#FB7185" />
              {/* Clash of Greatsword & Dagger */}
              <line
                x1="90"
                y1="560"
                x2="510"
                y2="240"
                stroke="#E11D48"
                strokeWidth="12"
              />
              <line
                x1="140"
                y1="260"
                x2="465"
                y2="560"
                stroke="#38BDF8"
                strokeWidth="9"
              />
              <circle cx="300" cy="400" r="42" fill="#FFF" fillOpacity="0.9" />
              <circle
                cx="300"
                cy="400"
                r="85"
                fill="none"
                stroke="#A855F7"
                strokeWidth="4"
              />
            </svg>
            <div className="manga-bubble manga-bubble-top">
              {page.panelTopText[lang]}
            </div>
            <div className="manga-bubble manga-bubble-bottom">
              {page.panelBottomText[lang]}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="manga-art-stage">
            <svg
              viewBox="0 0 600 760"
              className="manga-svg-canvas"
              aria-label={page.title[lang]}
            >
              <defs>
                <radialGradient id="ariseAura" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="#6D28D9" />
                  <stop offset="55%" stopColor="#1E1035" />
                  <stop offset="100%" stopColor="#070510" />
                </radialGradient>
              </defs>
              <rect width="600" height="760" fill="url(#ariseAura)" />
              {/* Iconic "ARISE / TURINGLAR" Typography */}
              <text
                x="300"
                y="215"
                textAnchor="middle"
                fill="#DDD6FE"
                stroke="#7C3AED"
                strokeWidth="2"
                fontFamily="Georgia, serif"
                fontWeight="800"
                fontSize="52"
                letterSpacing="6"
              >
                {labels.ariseText}
              </text>
              {/* Shadow Monarch Jin-Woo & Shadow Knights */}
              <polygon
                points="300,255 360,380 385,620 215,620 240,380"
                fill="#090612"
                stroke="#A855F7"
                strokeWidth="3"
              />
              <polygon points="278,310 296,318 282,324" fill="#C084FC" />
              <polygon points="322,310 304,318 318,324" fill="#C084FC" />
              {/* Left & Right Shadow Soldiers */}
              <polygon
                points="135,340 185,430 195,620 85,620 95,430"
                fill="#110C22"
                stroke="#7C3AED"
                strokeWidth="2"
              />
              <circle cx="128" cy="390" r="6" fill="#38BDF8" />
              <circle cx="152" cy="390" r="6" fill="#38BDF8" />
              <polygon
                points="465,340 515,430 525,620 405,620 415,430"
                fill="#110C22"
                stroke="#7C3AED"
                strokeWidth="2"
              />
              <circle cx="452" cy="390" r="6" fill="#38BDF8" />
              <circle cx="476" cy="390" r="6" fill="#38BDF8" />
            </svg>
            <div className="manga-bubble manga-bubble-top">
              {page.panelTopText[lang]}
            </div>
            <div className="manga-bubble manga-bubble-bottom">
              {page.panelBottomText[lang]}
            </div>
          </div>
        );

      default:
        return (
          <div className="manga-art-stage">
            <img
              src={SOLO_LEVELING_LINKS.coverImage}
              alt="Solo Leveling Sovereign of Shadows"
              referrerPolicy="no-referrer"
              className="manga-cover-img manga-cover-zoom"
            />
            <div className="manga-bubble manga-bubble-top">
              {page.panelTopText[lang]}
            </div>
            <div className="manga-bubble manga-bubble-bottom">
              {page.panelBottomText[lang]}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="sl-reader">
      {/* Top Page Navigation Bar */}
      <div className="sl-reader-header">
        <span className="lbl sl-badge">{page.badge[lang]}</span>
        <span className="lbl sl-page-indicator">
          {labels.pageOf(safeIndex + 1, totalPages)}
        </span>
      </div>

      {/* Illustrated Manga Page Canvas */}
      {renderMangaArt(page.pageNumber)}

      {/* Translated Page Title & Narration */}
      <div className="sl-reader-caption">
        <div className="sl-reader-title">{page.title[lang]}</div>
        <p className="sl-reader-narration">{page.narration[lang]}</p>
      </div>

      {/* Page Switching Controls */}
      <div className="sl-reader-controls">
        <button
          type="button"
          className="lbl box sl-nav-btn"
          disabled={safeIndex === 0}
          onPointerEnter={onBtnEnter}
          onPointerLeave={onBtnLeave}
          onClick={() => onChangePage(Math.max(0, safeIndex - 1))}
        >
          {labels.prev}
        </button>

        <div className="sl-page-dots" role="group" aria-label="Manga pages">
          {SOLO_LEVELING_PAGES.map((p, idx) => (
            <button
              key={p.pageNumber}
              type="button"
              className={`lbl sl-page-num ${idx === safeIndex ? 'on' : ''}`}
              onPointerEnter={onBtnEnter}
              onPointerLeave={onBtnLeave}
              onClick={() => onChangePage(idx)}
            >
              {p.pageNumber}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="lbl box sl-nav-btn"
          disabled={safeIndex === totalPages - 1}
          onPointerEnter={onBtnEnter}
          onPointerLeave={onBtnLeave}
          onClick={() => onChangePage(Math.min(totalPages - 1, safeIndex + 1))}
        >
          {labels.next}
        </button>
      </div>
    </div>
  );
};
