export type SheetId =
  | 'covers'
  | 'spines'
  | 'fix'
  | 'fix2'
  | 'temur_cover'
  | 'temur_spine'
  | 'sololeveling_cover'
  | 'sololeveling_spine';
export type Lang = 'uz' | 'ru' | 'en';

export interface LocalizedFilmText {
  title: string;
  genre: string;
  synopsis: string;
}

export interface Film {
  id: string;
  title: string;
  year: number;
  genre: string;
  minutes: number;
  synopsis: string;
  isBook?: boolean;
  isManga?: boolean;
  bookUrl?: string;
  bookEmbedUrl?: string;
  crunchyrollUrl?: string;
  tappytoonUrl?: string;
  eraLabel?: string;
  i18n: Record<Lang, LocalizedFilmText>;
}

export interface InkBlob {
  cx: number;
  cy: number;
  delay: number;
}

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: 'uz', label: 'UZ' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
];

export const UI_TEXT: Record<
  Lang,
  {
    back: string;
    all: string;
    mangaTab: string;
    bookTab: string;
    open: string;
    close: string;
    watch: string;
    playing: string;
    readBook: string;
    closeBook: string;
    openArchive: string;
    readManga: string;
    viewCover: string;
    tappytoonBtn: string;
    crunchyrollBtn: string;
    credit: string;
    bookCredit: string;
    mangaCredit: string;
    min: string;
    pages: string;
    mangaPages: string;
    prevFilm: string;
    nextFilm: string;
    openFilm: string;
  }
> = {
  uz: {
    back: 'ORQAGA',
    all: 'BARCHASI',
    mangaTab: 'SOLO LEVELING',
    bookTab: 'AMIR TEMUR (KITOB)',
    open: 'OCHISH',
    close: 'YOPISH',
    watch: "FILMNI KO'RISH",
    playing: 'ARXIV TASMA NAMOYISHDA',
    readBook: "KITOBNI O'QISH (2UP)",
    closeBook: 'MUQOVAGA QAYTISH',
    openArchive: 'ARCHIVE.ORG DA OCHISH ↗',
    readManga: "MANGANI O'QISH (UZB)",
    viewCover: "MUQOVA SAN'ATINI KO'RISH",
    tappytoonBtn: 'TAPPYTOON MANGA ↗',
    crunchyrollBtn: 'CRUNCHYROLL ANIME ↗',
    credit: 'Ssenariy muallifi va rejissyor — Leon Vasari.',
    bookCredit: 'Manba: Internet Archive (archive.org/details/AmirTemur/mode/2up).',
    mangaCredit:
      'Muallif: Chugong · Rassom: DUBU (Redice Studio) · Manbalar: Tappytoon & Crunchyroll.',
    min: 'DAQ',
    pages: 'SAHIFA (2UP)',
    mangaPages: '6 SAHIFA · UZB TARJIMA',
    prevFilm: 'Oldingi asar',
    nextFilm: 'Keyingi asar',
    openFilm: 'Asarni ochish',
  },
  ru: {
    back: 'НАЗАД',
    all: 'ВСЕ',
    mangaTab: 'SOLO LEVELING',
    bookTab: 'АМИР ТЕМУР (КНИГА)',
    open: 'ОТКРЫТЬ',
    close: 'ЗАКРЫТЬ',
    watch: 'СМОТРЕТЬ ФИЛЬМ',
    playing: 'АРХИВНАЯ ПЛЁНКА В ЭФИРЕ',
    readBook: 'ЧИТАТЬ КНИГУ (2UP)',
    closeBook: 'ВЕРНУТЬСЯ К ОБЛОЖКЕ',
    openArchive: 'ОТКРЫТЬ НА ARCHIVE.ORG ↗',
    readManga: 'ЧИТАТЬ МАНГУ',
    viewCover: 'ПОСМОТРЕТЬ ОБЛОЖКУ',
    tappytoonBtn: 'TAPPYTOON MANGA ↗',
    crunchyrollBtn: 'CRUNCHYROLL ANIME ↗',
    credit: 'Автор сценария и режиссёр — Леон Вазари.',
    bookCredit: 'Источник: Internet Archive (archive.org/details/AmirTemur/mode/2up).',
    mangaCredit:
      'Автор: Chugong · Художник: DUBU (Redice Studio) · Источники: Tappytoon & Crunchyroll.',
    min: 'МИН',
    pages: 'СТР. (2UP)',
    mangaPages: '6 СТР. · МАНХВА',
    prevFilm: 'Предыдущая работа',
    nextFilm: 'Следующая работа',
    openFilm: 'Открыть работу',
  },
  en: {
    back: 'BACK',
    all: 'ALL',
    mangaTab: 'SOLO LEVELING',
    bookTab: 'AMIR TEMUR (BOOK)',
    open: 'OPEN',
    close: 'CLOSE',
    watch: 'WATCH THE FILM',
    playing: 'ARCHIVE REEL PLAYING',
    readBook: 'READ THE BOOK (2UP)',
    closeBook: 'BACK TO COVER',
    openArchive: 'OPEN ON ARCHIVE.ORG ↗',
    readManga: 'READ MANGA',
    viewCover: 'VIEW COVER ART',
    tappytoonBtn: 'TAPPYTOON MANGA ↗',
    crunchyrollBtn: 'CRUNCHYROLL ANIME ↗',
    credit: 'Written and directed by Leon Vasari.',
    bookCredit: 'Source: Internet Archive (archive.org/details/AmirTemur/mode/2up).',
    mangaCredit:
      'Original Story: Chugong · Art: DUBU (Redice Studio) · Sources: Tappytoon & Crunchyroll.',
    min: 'MIN',
    pages: 'PAGES (2UP)',
    mangaPages: '6 PAGES · MANHWA',
    prevFilm: 'Previous work',
    nextFilm: 'Next work',
    openFilm: 'Open work',
  },
};

const AMIR_TEMUR_SPINE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 1089" width="188" height="1089">
  <defs>
    <linearGradient id="spBg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#C8BEA9"/>
      <stop offset="18%" stop-color="#E2D9C5"/>
      <stop offset="82%" stop-color="#DDD3BE"/>
      <stop offset="100%" stop-color="#BFB49E"/>
    </linearGradient>
  </defs>
  <rect width="188" height="1089" rx="4" fill="url(#spBg)"/>
  <rect x="8" y="10" width="172" height="1069" fill="none" stroke="#1F3FB0" stroke-width="2" stroke-opacity="0.75"/>
  <rect x="14" y="16" width="160" height="1057" fill="none" stroke="#141414" stroke-width="1" stroke-opacity="0.45"/>
  <!-- Top Archival Vignette: Samarkand Dome & Timurid Tamga -->
  <rect x="22" y="28" width="144" height="230" fill="#1F3FB0"/>
  <circle cx="94" cy="95" r="38" fill="#E2D9C5"/>
  <!-- Timurid 3-ring Tamga -->
  <circle cx="94" cy="78" r="8" fill="none" stroke="#1F3FB0" stroke-width="2.5"/>
  <circle cx="83" cy="98" r="8" fill="none" stroke="#1F3FB0" stroke-width="2.5"/>
  <circle cx="105" cy="98" r="8" fill="none" stroke="#1F3FB0" stroke-width="2.5"/>
  <!-- Dome & Minarets Silhouette -->
  <path d="M22 258 L22 200 L38 200 L38 145 L46 145 L46 200 L64 200 C64 162 124 162 124 200 L142 200 L142 145 L150 145 L150 200 L166 200 L166 258 Z" fill="#141414"/>
  <!-- Vertical Condensed Serif Title -->
  <g transform="translate(94, 595) rotate(90)">
    <text x="0" y="22" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="64" letter-spacing="6" fill="#141414">AMIR TEMUR</text>
  </g>
  <!-- Bottom Stamp -->
  <text x="94" y="965" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="18" letter-spacing="3" fill="#1F3FB0">1336–1405</text>
  <rect x="44" y="990" width="100" height="44" fill="none" stroke="#141414" stroke-width="2.5"/>
  <text x="94" y="1020" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="24" letter-spacing="3" fill="#141414">KITOB</text>
</svg>`;

const AMIR_TEMUR_COVER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 474 900" width="474" height="900">
  <defs>
    <linearGradient id="cvBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#EAE3D2"/>
      <stop offset="55%" stop-color="#DFD7C4"/>
      <stop offset="100%" stop-color="#CFC5B0"/>
    </linearGradient>
  </defs>
  <rect width="474" height="900" fill="url(#cvBg)"/>
  <!-- Worn vintage border rules -->
  <rect x="18" y="18" width="438" height="864" fill="none" stroke="#141414" stroke-width="2.5" stroke-opacity="0.85"/>
  <rect x="26" y="26" width="422" height="848" fill="none" stroke="#1F3FB0" stroke-width="1.5" stroke-opacity="0.8"/>
  <!-- Top Header -->
  <text x="237" y="64" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="14" letter-spacing="4.5" fill="#141414">TARIXIY MEROS · BMA STUDIO</text>
  <line x1="74" y1="78" x2="400" y2="78" stroke="#141414" stroke-width="1.2" stroke-opacity="0.6"/>
  <!-- Main Condensed Display Title -->
  <text x="237" y="162" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="82" letter-spacing="4" fill="#1F3FB0">AMIR</text>
  <text x="237" y="242" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="82" letter-spacing="4" fill="#141414">TEMUR</text>
  <text x="237" y="274" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="18" letter-spacing="2" fill="#1F3FB0">Sohibqiron tarixi va Tuzuklari (1336–1405)</text>
  <!-- Center Screen-Print Artwork Box -->
  <g>
    <rect x="44" y="298" width="386" height="502" fill="#1F3FB0"/>
    <!-- Geometric Timurid arch frame -->
    <path d="M56 788 L56 420 C56 340 145 312 237 312 C329 312 418 340 418 420 L418 788 Z" fill="#18318C" stroke="#E5DEC9" stroke-width="1.5" stroke-opacity="0.6"/>
    <!-- Great Sun Disc -->
    <circle cx="237" cy="495" r="128" fill="#E8DFCA"/>
    <!-- Timurid Three-Circle Tamga Emblem in Sky -->
    <circle cx="237" cy="360" r="12" fill="none" stroke="#E8DFCA" stroke-width="3"/>
    <circle cx="219" cy="388" r="12" fill="none" stroke="#E8DFCA" stroke-width="3"/>
    <circle cx="255" cy="388" r="12" fill="none" stroke="#E8DFCA" stroke-width="3"/>
    <!-- Samarkand Registan / Gur-e-Amir Silhouette -->
    <path d="M56 660 L82 660 L82 475 L98 460 L114 475 L114 660 L152 660 L152 575 C152 500 205 468 237 442 C269 468 322 500 322 575 L322 660 L360 660 L360 475 L376 460 L392 475 L392 660 L418 660 L418 788 L56 788 Z" fill="#141414" fill-opacity="0.88"/>
    <!-- Ribbed Dome Highlights -->
    <path d="M237 446 C215 480 198 525 198 575 M237 446 C259 480 276 525 276 575 M237 446 L237 575" stroke="#E8DFCA" stroke-width="1.8" stroke-opacity="0.55" fill="none"/>
    <!-- Mounted Ruler & Banner Silhouette on Foreground Ridge -->
    <path d="M56 735 Q160 685 255 710 T418 700 L418 788 L56 788 Z" fill="#141414"/>
    <!-- Horse & Rider Centerpiece -->
    <g transform="translate(178, 560)">
      <!-- Standard / Tuq Banner -->
      <line x1="82" y1="-48" x2="82" y2="95" stroke="#E8DFCA" stroke-width="3"/>
      <polygon points="82,-45 132,-32 82,-18" fill="#B8332A"/>
      <!-- Rider & Horse Silhouette -->
      <path d="M25 115 L36 78 L22 65 L35 45 L58 42 L64 18 C64 10 74 10 76 18 L82 38 L104 28 L116 42 L98 66 L108 115 L95 115 L88 82 L68 84 L55 115 L42 115 L50 82 L36 86 L34 115 Z" fill="#E8DFCA"/>
    </g>
    <!-- Foreground Engraved Horizon Lines -->
    <line x1="72" y1="748" x2="402" y2="748" stroke="#E8DFCA" stroke-width="1.2" stroke-opacity="0.5"/>
    <line x1="96" y1="764" x2="378" y2="764" stroke="#E8DFCA" stroke-width="1.2" stroke-opacity="0.35"/>
  </g>
  <!-- Bottom Archival Stamp & Badge -->
  <text x="44" y="845" font-family="sans-serif" font-weight="700" font-size="13" letter-spacing="2.5" fill="#141414">ARCHIVE.ORG / 2UP EDITION</text>
  <rect x="346" y="818" width="84" height="38" fill="none" stroke="#1F3FB0" stroke-width="2.5"/>
  <text x="388" y="843" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="18" letter-spacing="2.5" fill="#1F3FB0">KITOB</text>
</svg>`;

const SOLO_LEVELING_SPINE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188 1089" width="188" height="1089">
  <defs>
    <linearGradient id="slSpBg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0D0818"/>
      <stop offset="22%" stop-color="#1D1238"/>
      <stop offset="80%" stop-color="#170E2E"/>
      <stop offset="100%" stop-color="#090612"/>
    </linearGradient>
    <linearGradient id="slTextGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="50%" stop-color="#E0F2FE"/>
      <stop offset="100%" stop-color="#C084FC"/>
    </linearGradient>
  </defs>
  <rect width="188" height="1089" rx="4" fill="url(#slSpBg)"/>
  <rect x="8" y="10" width="172" height="1069" fill="none" stroke="#7C3AED" stroke-width="2.5" stroke-opacity="0.85"/>
  <rect x="14" y="16" width="160" height="1057" fill="none" stroke="#38BDF8" stroke-width="1" stroke-opacity="0.5"/>
  <!-- Top Shadow Monarch Emblem -->
  <rect x="22" y="28" width="144" height="225" fill="#120B24" stroke="#7C3AED" stroke-width="1.5"/>
  <circle cx="94" cy="115" r="52" fill="#2E1065" stroke="#A855F7" stroke-width="2"/>
  <!-- Shadow Monarch Helmet & Glowing Eyes -->
  <polygon points="94,55 130,98 118,168 70,168 58,98" fill="#090612" stroke="#C084FC" stroke-width="2"/>
  <polygon points="73,115 90,124 77,130" fill="#38BDF8"/>
  <polygon points="115,115 98,124 111,130" fill="#38BDF8"/>
  <text x="94" y="226" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="16" letter-spacing="4" fill="#38BDF8">VOL. 10</text>
  <!-- Vertical Title -->
  <g transform="translate(94, 595) rotate(90)">
    <text x="0" y="20" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="800" font-size="54" letter-spacing="5" fill="url(#slTextGrad)">SOLO LEVELING</text>
  </g>
  <!-- Bottom Stamp -->
  <text x="94" y="965" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="16" letter-spacing="3" fill="#C084FC">CHUGONG · DUBU</text>
  <rect x="34" y="988" width="120" height="46" fill="#2E1065" stroke="#38BDF8" stroke-width="2"/>
  <text x="94" y="1019" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="22" letter-spacing="3" fill="#E0F2FE">MANGA</text>
</svg>`;

const TEMUR_SPINE_URI = `data:image/svg+xml;utf8,${encodeURIComponent(AMIR_TEMUR_SPINE_SVG)}`;
const TEMUR_COVER_URI = `data:image/svg+xml;utf8,${encodeURIComponent(AMIR_TEMUR_COVER_SVG)}`;
const SOLO_LEVELING_SPINE_URI = `data:image/svg+xml;utf8,${encodeURIComponent(SOLO_LEVELING_SPINE_SVG)}`;

export const SHEET: Record<SheetId, [string, number, number]> = {
  covers: [
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_010644_837e04ca-2418-45c1-b8e0-0233265c4cd5.png&w=1744&q=85',
    1744,
    2336,
  ],
  spines: [
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_010738_a3e47ead-18f2-4974-9468-06d16a25edc5.png&w=2688&q=85',
    2688,
    1152,
  ],
  fix: [
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_010831_3ebb874b-93dc-433e-87ed-6299aba720f0.png&w=1520&q=85',
    1520,
    2688,
  ],
  fix2: [
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261029_092020_f96bc094-db7b-46de-9298-074a24e0a3b8.png&w=1520&q=85',
    1520,
    2688,
  ],
  temur_spine: [TEMUR_SPINE_URI, 188, 1089],
  temur_cover: [TEMUR_COVER_URI, 474, 900],
  sololeveling_spine: [SOLO_LEVELING_SPINE_URI, 188, 1089],
  sololeveling_cover: ['/assets/solo-leveling-cover.jpg', 1720, 2475],
};

export const CROP: Record<string, [SheetId, number, number, number, number]> = {
  'spine-temur': ['temur_spine', 0, 0, 188, 1089],
  'cover-temur': ['temur_cover', 0, 0, 474, 900],
  'spine-sololeveling': ['sololeveling_spine', 0, 0, 188, 1089],
  'cover-sololeveling': ['sololeveling_cover', 0, 0, 1720, 2475],
  'spine-valley': ['spines', 266, 31, 189, 1089],
  'cover-valley': ['covers', 497, 72, 344, 659],
  'spine-bluehour': ['spines', 492, 31, 189, 1089],
  'cover-bluehour': ['covers', 914, 72, 342, 659],
  'spine-river': ['fix', 197, 54, 324, 2566],
  'cover-river': ['covers', 1332, 72, 344, 659],
  'spine-summer': ['spines', 937, 31, 188, 1089],
  'cover-summer': ['covers', 74, 813, 344, 676],
  'spine-green': ['spines', 1157, 31, 185, 1090],
  'cover-green': ['covers', 497, 815, 344, 674],
  'spine-noon': ['spines', 44, 32, 184, 1088],
  'cover-noon': ['covers', 74, 72, 347, 659],
  'spine-observer': ['fix2', 371, 15, 349, 2655],
  'cover-observer': ['covers', 915, 815, 342, 675],
  'spine-birds': ['spines', 1573, 31, 183, 1089],
  'cover-birds': ['covers', 1331, 815, 345, 675],
  'spine-storm': ['fix2', 808, 15, 347, 2656],
  'cover-storm': ['covers', 74, 1571, 345, 681],
  'spine-tide': ['spines', 2012, 31, 188, 1089],
  'cover-tide': ['covers', 496, 1577, 343, 678],
  'spine-war': ['spines', 2236, 31, 189, 1089],
  'cover-war': ['covers', 913, 1579, 343, 676],
  'spine-door': ['spines', 2462, 31, 188, 1089],
  'cover-door': ['covers', 1331, 1579, 344, 677],
};

export const FILMS: Film[] = [
  {
    id: 'valley',
    title: 'The Silent Valley',
    year: 1958,
    genre: 'Drama',
    minutes: 104,
    synopsis:
      'A schoolteacher returns to the mountain village that exiled her father, and finds the valley has kept every one of its secrets.',
    i18n: {
      uz: {
        title: 'Sokin vodiy',
        genre: 'Drama',
        synopsis:
          "Maktab o'qituvchisi otasini surgun qilgan tog' qishlog'iga qaytadi va vodiy o'zining barcha sirlarini saqlab qolganiga guvoh bo'ladi.",
      },
      ru: {
        title: 'Тихая долина',
        genre: 'Драма',
        synopsis:
          'Школьная учительница возвращается в горную деревню, откуда изгнали её отца, и обнаруживает, что долина сохранила все свои тайны.',
      },
      en: {
        title: 'The Silent Valley',
        genre: 'Drama',
        synopsis:
          'A schoolteacher returns to the mountain village that exiled her father, and finds the valley has kept every one of its secrets.',
      },
    },
  },
  {
    id: 'bluehour',
    title: 'The Blue Hour',
    year: 1962,
    genre: 'Romance',
    minutes: 97,
    synopsis:
      'Over one long evening in a harbour town, a widow and a stranger trade small lies until the light runs out.',
    i18n: {
      uz: {
        title: 'Moviy soat',
        genre: 'Romantika',
        synopsis:
          "Bandargoh shaharchasidagi uzoq bir oqshomda beva ayol va notanish kishi kun botgunga qadar mayda yolg'onlar bilan almashishadi.",
      },
      ru: {
        title: 'Синий час',
        genre: 'Мелодрама',
        synopsis:
          'За один долгий вечер в портовом городке вдова и незнакомец обмениваются маленькой ложью, пока не гаснет свет.',
      },
      en: {
        title: 'The Blue Hour',
        genre: 'Romance',
        synopsis:
          'Over one long evening in a harbour town, a widow and a stranger trade small lies until the light runs out.',
      },
    },
  },
  {
    id: 'river',
    title: 'River of Salt',
    year: 1964,
    genre: 'Drama',
    minutes: 121,
    synopsis:
      'Two brothers drag a salt barge downriver to a city that no longer wants anything they carry.',
    i18n: {
      uz: {
        title: 'Tuz daryosi',
        genre: 'Drama',
        synopsis:
          "Ikki aka-uka tuz ortilgan barjani ularning yukiga endi ehtiyoji qolmagan shahar tomon daryo bo'ylab tortib borishadi.",
      },
      ru: {
        title: 'Соляная река',
        genre: 'Драма',
        synopsis:
          'Два брата тянут баржу с солью вниз по реке к городу, которому больше не нужно ничего из того, что они везут.',
      },
      en: {
        title: 'River of Salt',
        genre: 'Drama',
        synopsis:
          'Two brothers drag a salt barge downriver to a city that no longer wants anything they carry.',
      },
    },
  },
  {
    id: 'summer',
    title: 'The Last Summer',
    year: 1966,
    genre: 'Drama',
    minutes: 109,
    synopsis:
      'The summer before the dam floods their village, three friends set fire to everything they cannot take with them.',
    i18n: {
      uz: {
        title: "So'nggi yoz",
        genre: 'Drama',
        synopsis:
          "To'g'on qishloqni suv ostida qoldirishidan oldingi yozda uch do'st o'zlari bilan olib ketolmaydigan barcha narsaga o't qo'yishadi.",
      },
      ru: {
        title: 'Последнее лето',
        genre: 'Драма',
        synopsis:
          'Летом перед тем, как плотина затопит их деревню, трое друзей сжигают всё, что не могут забрать с собой.',
      },
      en: {
        title: 'The Last Summer',
        genre: 'Drama',
        synopsis:
          'The summer before the dam floods their village, three friends set fire to everything they cannot take with them.',
      },
    },
  },
  {
    id: 'green',
    title: 'The Green Road',
    year: 1969,
    genre: 'Mystery',
    minutes: 101,
    synopsis:
      'A surveyor mapping a forest road keeps finding the same footprints, always one day ahead of him.',
    i18n: {
      uz: {
        title: "Yashil yo'l",
        genre: 'Detektiv',
        synopsis:
          "O'rmon yo'lini xaritaga tushirayotgan yer o'lchovchi doimo o'zidan bir kun oldinda yurgan bir xil oyoq izlariga duch kelaveradi.",
      },
      ru: {
        title: 'Зелёная дорога',
        genre: 'Детектив',
        synopsis:
          'Геодезист, наносящий на карту лесную дорогу, раз за разом находит одни и те же следы — всегда на день впереди него.',
      },
      en: {
        title: 'The Green Road',
        genre: 'Mystery',
        synopsis:
          'A surveyor mapping a forest road keeps finding the same footprints, always one day ahead of him.',
      },
    },
  },
  {
    id: 'temur',
    title: 'Amir Temur',
    year: 1336,
    eraLabel: '1336–1405',
    genre: 'Historical Book',
    minutes: 320,
    isBook: true,
    bookUrl: 'https://archive.org/details/AmirTemur/mode/2up',
    bookEmbedUrl: 'https://archive.org/embed/AmirTemur?ui=embed#mode/2up',
    synopsis:
      'Historical volume chronicling the life, statecraft, military campaigns, and Institutes of Amir Temur (Tamerlane). Available to read in full two-page spread (2up) mode.',
    i18n: {
      uz: {
        title: 'Amir Temur',
        genre: 'Tarixiy kitob',
        synopsis:
          "Sohibqiron Amir Temurning hayoti, davlatchilik faoliyati, harbiy yurishlari va Tuzuklari haqidagi tarixiy kitob. Asarni ikki sahifali (2up) elektron kitob shaklida to'liq mutolaa qilishingiz mumkin.",
      },
      ru: {
        title: 'Амир Темур',
        genre: 'Историческая книга',
        synopsis:
          'Историческая книга о жизни, государственном управлении, военных походах и Уложениях Сахибкирана Амира Темура. Доступно чтение в двухстраничном режиме (2up).',
      },
      en: {
        title: 'Amir Temur',
        genre: 'Historical Book',
        synopsis:
          'Historical volume chronicling the life, statecraft, military campaigns, and Institutes of Amir Temur (Tamerlane). Available to read in full two-page spread (2up) mode.',
      },
    },
  },
  {
    id: 'sololeveling',
    title: 'Solo Leveling',
    year: 2018,
    eraLabel: 'VOL. 10 · MANGA',
    genre: 'Action Fantasy Manga',
    minutes: 200,
    isManga: true,
    crunchyrollUrl:
      'https://www.crunchyroll.com/series/GDKHZEJ0K/solo-leveling?utm_medium=web&utm_source=share',
    tappytoonUrl: 'https://www.tappytoon.com/comics/solo-leveling-official',
    synopsis:
      'Known as Humanity\'s Weakest E-Rank Hunter, Sung Jin-Woo awakens a secret System inside a deadly Double Dungeon—becoming the Shadow Monarch who commands an immortal legion with a single word: "Arise!"',
    i18n: {
      uz: {
        title: 'Solo Leveling',
        genre: 'Fantastik Manga · Manxva',
        synopsis:
          "«Insoniyatning eng zaif E-darajali ovchisi» Son Jin-Vu o'lim tuzog'iga aylangan Qo'shaloq Zindonda sirli «Tizim» (System) tomonidan yagona O'yinchi sifatida tanlanadi. Har bir jangda darajasini oshirib, u «Turinglar!» (Arise) buyrug'i bilan o'lmas ko'lankalar qo'shinini boshqaruvchi Ko'lankalar Monarxiga aylanadi.",
      },
      ru: {
        title: 'Solo Leveling',
        genre: 'Фэнтези Манга · Манхва',
        synopsis:
          'Известный как слабейший охотник E-ранга Сон Джин-Ву получает скрытую «Систему» в смертельном Двойном подземелье и становится Монархом Теней, повелевающим бессмертным легионом одним словом: «Восстаньте!»',
      },
      en: {
        title: 'Solo Leveling',
        genre: 'Action Fantasy Manga',
        synopsis:
          'Known as Humanity\'s Weakest E-Rank Hunter, Sung Jin-Woo awakens a secret System inside a deadly Double Dungeon—becoming the Shadow Monarch who commands an immortal legion with a single word: "Arise!"',
      },
    },
  },
  {
    id: 'noon',
    title: 'Noon in Ashes',
    year: 1971,
    genre: 'Western',
    minutes: 112,
    synopsis:
      'A rider crosses a white desert to settle an old debt, and learns too late who sent him.',
    i18n: {
      uz: {
        title: 'Kul ichidagi tush payti',
        genre: 'Vestern',
        synopsis:
          "Chavandoz eski qarzni uzish uchun oq sahroni kesib o'tadi va uni kim yuborganini juda kech anglaydi.",
      },
      ru: {
        title: 'Полдень в пепле',
        genre: 'Вестерн',
        synopsis:
          'Всадник пересекает белую пустыню, чтобы рассчитаться со старым долгом, и слишком поздно узнаёт, кто его послал.',
      },
      en: {
        title: 'Noon in Ashes',
        genre: 'Western',
        synopsis:
          'A rider crosses a white desert to settle an old debt, and learns too late who sent him.',
      },
    },
  },
  {
    id: 'observer',
    title: 'The Observer',
    year: 1973,
    genre: 'Thriller',
    minutes: 96,
    synopsis:
      'A night watchman begins to suspect that the building he guards has started watching him back.',
    i18n: {
      uz: {
        title: 'Kuzatuvchi',
        genre: 'Triller',
        synopsis:
          "Tungi qorovul o'zi qo'riqlayotgan bino ham uni kuzatishni boshlaganidan shubhalana boshlaydi.",
      },
      ru: {
        title: 'Наблюдатель',
        genre: 'Триллер',
        synopsis:
          'Ночной сторож начинает подозревать, что здание, которое он охраняет, само стало наблюдать за ним.',
      },
      en: {
        title: 'The Observer',
        genre: 'Thriller',
        synopsis:
          'A night watchman begins to suspect that the building he guards has started watching him back.',
      },
    },
  },
  {
    id: 'birds',
    title: 'The Fallen Birds',
    year: 1975,
    genre: 'Drama',
    minutes: 118,
    synopsis:
      "When the birds stop singing over a frontier town, the mayor's daughter is the only one who goes looking for the reason.",
    i18n: {
      uz: {
        title: 'Qulagan qushlar',
        genre: 'Drama',
        synopsis:
          "Chegara shaharchasi uzra qushlar sayrashdan to'xtaganda, faqatgina shahar hokimining qizi buning sababini izlashga tushadi.",
      },
      ru: {
        title: 'Павшие птицы',
        genre: 'Драма',
        synopsis:
          'Когда над приграничным городком перестают петь птицы, дочь мэра оказывается единственной, кто отправляется искать причину.',
      },
      en: {
        title: 'The Fallen Birds',
        genre: 'Drama',
        synopsis:
          "When the birds stop singing over a frontier town, the mayor's daughter is the only one who goes looking for the reason.",
      },
    },
  },
  {
    id: 'storm',
    title: 'Light in the Storm',
    year: 1978,
    genre: 'Drama',
    minutes: 127,
    synopsis:
      'A lighthouse keeper and his son wait out a three-day storm with a shipwrecked sailor who will not give his name.',
    i18n: {
      uz: {
        title: "Bo'rondagi yog'du",
        genre: 'Drama',
        synopsis:
          "Mayoq qorovuli va uning o'g'li o'z ismini aytishni istamagan halokatga uchragan dengizchi bilan uch kunlik bo'ronni o'tkazishadi.",
      },
      ru: {
        title: 'Свет в шторме',
        genre: 'Драма',
        synopsis:
          'Смотритель маяка и его сын пережидают трёхдневный шторм с потерпевшим крушение моряком, который не называет своего имени.',
      },
      en: {
        title: 'Light in the Storm',
        genre: 'Drama',
        synopsis:
          'A lighthouse keeper and his son wait out a three-day storm with a shipwrecked sailor who will not give his name.',
      },
    },
  },
  {
    id: 'tide',
    title: 'The Long Tide',
    year: 1981,
    genre: 'Drama',
    minutes: 99,
    synopsis:
      "A fisherman's wife counts the tides on the harbour wall while her husband's boat fails to come home.",
    i18n: {
      uz: {
        title: "Uzun to'lqin",
        genre: 'Drama',
        synopsis:
          "Baliqchining rafiqasi erining qayig'i uyga qaytavermagach, bandargoh devorida dengiz to'lqinlarini sanaydi.",
      },
      ru: {
        title: 'Долгий прилив',
        genre: 'Драма',
        synopsis:
          'Жена рыбака считает приливы на портовой стене, пока лодка её мужа не возвращается домой.',
      },
      en: {
        title: 'The Long Tide',
        genre: 'Drama',
        synopsis:
          "A fisherman's wife counts the tides on the harbour wall while her husband's boat fails to come home.",
      },
    },
  },
  {
    id: 'war',
    title: 'A Quiet War',
    year: 1985,
    genre: 'Comedy',
    minutes: 103,
    synopsis:
      'Two neighbours fight a silent war over a garden wall for thirty years, and neither will say how it began.',
    i18n: {
      uz: {
        title: 'Sokin urush',
        genre: 'Komediya',
        synopsis:
          "Ikki qo'shni o'ttiz yil davomida bog' devori ustida ovozsiz urush olib boradi va ularning hech biri bu qanday boshlanganini aytmaydi.",
      },
      ru: {
        title: 'Тихая война',
        genre: 'Комедия',
        synopsis:
          'Два соседа тридцать лет ведут безмолвную войну из-за садовой стены, и ни один не признаётся, с чего всё началось.',
      },
      en: {
        title: 'A Quiet War',
        genre: 'Comedy',
        synopsis:
          'Two neighbours fight a silent war over a garden wall for thirty years, and neither will say how it began.',
      },
    },
  },
  {
    id: 'door',
    title: 'Red Door',
    year: 1989,
    genre: 'Thriller',
    minutes: 114,
    synopsis:
      'A projectionist follows a reel of unknown film through the corridors of a cinema on its final night.',
    i18n: {
      uz: {
        title: 'Qizil eshik',
        genre: 'Triller',
        synopsis:
          "Kinomexanik kinoteatrning so'nggi kechasida noma'lum plyonka g'altagi ortidan yo'laklar bo'ylab boradi.",
      },
      ru: {
        title: 'Красная дверь',
        genre: 'Триллер',
        synopsis:
          'Киномеханик следует за бобиной неизвестного фильма по коридорам кинотеатра в ночь его закрытия.',
      },
      en: {
        title: 'Red Door',
        genre: 'Thriller',
        synopsis:
          'A projectionist follows a reel of unknown film through the corridors of a cinema on its final night.',
      },
    },
  },
];

export function formatFilmSubtitle(film: Film, lang: Lang): string {
  const t = film.i18n[lang];
  const ui = UI_TEXT[lang];
  if (film.isManga) {
    return `${t.genre.toUpperCase()} / ${ui.mangaPages}`;
  }
  if (film.isBook) {
    return `${t.genre.toUpperCase()} / ${ui.pages}`;
  }
  return `${t.genre.toUpperCase()} / ${film.minutes} ${ui.min}`;
}

export function formatFilmYear(film: Film): string {
  return film.eraLabel ?? String(film.year);
}

export const INK_BLOBS: InkBlob[] = [
  { cx: 150, cy: 330, delay: 0 },
  { cx: 340, cy: 600, delay: 120 },
  { cx: 250, cy: 120, delay: 220 },
  { cx: 90, cy: 760, delay: 300 },
  { cx: 400, cy: 250, delay: 360 },
  { cx: 260, cy: 860, delay: 420 },
  { cx: 230, cy: 470, delay: 180 },
];

export const DECADES = [
  'all',
  'manga',
  'book',
  '1950s',
  '1960s',
  '1970s',
  '1980s',
] as const;
export type DecadeKey = (typeof DECADES)[number];

export function getBackgroundCropStyle(cropKey: string): {
  backgroundImage: string;
  backgroundSize: string;
  backgroundPosition: string;
} {
  const entry = CROP[cropKey];
  if (!entry) {
    throw new Error(`Unknown crop key: ${cropKey}`);
  }
  const [sheetId, x, y, w, h] = entry;
  const [url, W, H] = SHEET[sheetId];
  const sizeX = (W / w) * 100;
  const sizeY = (H / h) * 100;
  const posX = W === w ? 0 : (x / (W - w)) * 100;
  const posY = H === h ? 0 : (y / (H - h)) * 100;
  return {
    backgroundImage: `url("${url}")`,
    backgroundSize: `${sizeX}% ${sizeY}%`,
    backgroundPosition: `${posX}% ${posY}%`,
  };
}

export function getPosterSvgRect(filmId: string): {
  href: string;
  x: number;
  y: number;
  width: number;
  height: number;
} {
  const entry = CROP[`cover-${filmId}`];
  if (!entry) {
    throw new Error(`Unknown film cover crop: cover-${filmId}`);
  }
  const [sheetId, x, y, w, h] = entry;
  const [url, W, H] = SHEET[sheetId];
  return {
    href: url,
    x: (-x * 474) / w || 0,
    y: (-y * 900) / h || 0,
    width: (W * 474) / w,
    height: (H * 900) / h,
  };
}

export function smoothstep01(x: number): number {
  const c = Math.max(0, Math.min(1, x));
  return c * c * (3 - 2 * c);
}

export function smoothStepB(r: number): number {
  if (r <= -1) return -0.5;
  if (r >= 1) return 0.5;
  return (r + Math.sin(Math.PI * r) / Math.PI) / 2;
}

export function computeTapeDimensions(H: number): {
  H: number;
  ws: number;
  d: number;
  gap: number;
} {
  return {
    H,
    ws: (H * 142) / 840,
    d: (H * 474) / 900,
    gap: H * 0.03,
  };
}

export function wrapRelativeIndex(
  v: number,
  s: number,
  totalCopies = FILMS.length * 3
): number {
  let r = (v - s) % totalCopies;
  if (r > totalCopies / 2) r -= totalCopies;
  if (r < -totalCopies / 2) r += totalCopies;
  return r;
}

export function computeHorizontalX(
  r: number,
  ws: number,
  d: number,
  gap: number
): number {
  return r * (ws + gap) + (d - ws + 1.6 * gap) * smoothStepB(r);
}

export function computeTapeTransformState(
  r: number,
  H: number,
  ws: number,
  d: number,
  gap: number,
  lift: number,
  tiltX: number,
  tiltY: number
) {
  const x = computeHorizontalX(r, ws, d, gap);
  const o = smoothstep01(Math.max(0, 1 - Math.abs(r)));
  const rotY = -90 * o + tiltY * o || 0;
  const rotX = tiltX * o || 0;
  const rotZ = -4.5 * o || 0;
  const tz = o * 0.2 * H || 0;
  const ty = -o * 0.025 * H - lift * 0.045 * H || 0;
  const zIndex = Math.round(100 - Math.abs(r) * 4);
  const spineShade = o * 0.55;
  const coverShade = (1 - o) * 0.5;

  return {
    x,
    ty,
    tz,
    rotX,
    rotY,
    rotZ,
    o,
    zIndex,
    spineShade,
    coverShade,
  };
}

export function getActiveFilmIndex(s: number): number {
  const count = FILMS.length;
  return ((Math.round(s) % count) + count) % count;
}

export function getDecadeForFilm(film: Film): DecadeKey {
  if (film.isManga) return 'manga';
  if (film.isBook) return 'book';
  const decade = Math.floor(film.year / 10) * 10;
  return `${decade}s` as DecadeKey;
}

export function getDecadeForYear(year: number): DecadeKey {
  if (year < 1900) return 'book';
  if (year >= 2000) return 'manga';
  const decade = Math.floor(year / 10) * 10;
  return `${decade}s` as DecadeKey;
}

export function getTargetForDecadeJump(currentT: number, decade: DecadeKey): number {
  const count = FILMS.length;
  let targetFilmIdx = 0;
  if (decade === 'manga') {
    const found = FILMS.findIndex((f) => f.isManga);
    if (found !== -1) targetFilmIdx = found;
  } else if (decade === 'book') {
    const found = FILMS.findIndex((f) => f.isBook);
    if (found !== -1) targetFilmIdx = found;
  } else if (decade !== 'all') {
    const decadeStart = parseInt(decade.slice(0, 4), 10);
    const found = FILMS.findIndex(
      (f) => !f.isBook && !f.isManga && f.year >= decadeStart && f.year < decadeStart + 10
    );
    if (found !== -1) targetFilmIdx = found;
  }
  const base = Math.round(currentT);
  const curIdx = ((base % count) + count) % count;
  let diff = (targetFilmIdx - curIdx) % count;
  if (diff > count / 2) diff -= count;
  if (diff < -count / 2) diff += count;
  return base + diff;
}
