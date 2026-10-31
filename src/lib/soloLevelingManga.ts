import { Lang } from './filmography';

export interface MangaPageData {
  pageNumber: number;
  title: Record<Lang, string>;
  panelTopText: Record<Lang, string>;
  panelBottomText: Record<Lang, string>;
  narration: Record<Lang, string>;
  badge: Record<Lang, string>;
}

export const SOLO_LEVELING_LINKS = {
  crunchyroll:
    'https://www.crunchyroll.com/series/GDKHZEJ0K/solo-leveling?utm_medium=web&utm_source=share',
  tappytoon: 'https://www.tappytoon.com/comics/solo-leveling-official',
  coverImage: '/assets/solo-leveling-cover.jpg',
  remoteCoverUrl: 'https://freshcomics.s3.amazonaws.com/issue_covers/AUG242431.jpg',
};

export const SOLO_LEVELING_PAGES: MangaPageData[] = [
  {
    pageNumber: 1,
    badge: {
      uz: '1-BOB · MUQOVA VA PROLOG',
      ru: 'ГЛАВА 1 · ОБЛОЖКА И ПРОЛОГ',
      en: 'CHAPTER 1 · COVER & PROLOGUE',
    },
    title: {
      uz: "Insoniyatning eng zaif ovchisi — Son Jin-Vu",
      ru: 'Слабейший охотник человечества — Сон Джин-Ву',
      en: "Humanity's Weakest Hunter — Sung Jin-Woo",
    },
    panelTopText: {
      uz: 'SOLO LEVELING · 10-JILD (O‘ZBEKCHA TARJIMA)',
      ru: 'SOLO LEVELING · ТОМ 10 (РУССКИЙ ПЕРЕВОД)',
      en: 'SOLO LEVELING · VOL. 10 (ENGLISH EDITION)',
    },
    panelBottomText: {
      uz: '«Men — E-darajali eng kuchsiz ovchiman. Lekin oilam uchun har kuni zindonga kirishga majburman...»',
      ru: '«Я — слабейший охотник E-ранга. Но ради семьи я снова вхожу в подземелье...»',
      en: '"I am the weakest E-Rank hunter. Yet for my family, I step into the dungeon once again..."',
    },
    narration: {
      uz: "O'n yil avval bizning dunyomizni mahluqlar olami bilan bog'lovchi sirli «Darvozalar» ochildi. Son Jin-Vu barcha ovchilar orasida «Insoniyatning eng zaif quroli» deb atalardi — to Qo'shaloq Zindondagi o'sha mash'um kungacha.",
      ru: 'Десять лет назад открылись «Врата», соединившие наш мир с миром монстров. Сон Джин-Ву прозвали «Слабейшим оружием человечества» — до того рокового дня в Двойном подземелье.',
      en: 'Ten years ago, the Gates opened between our world and the realm of monsters. Sung Jin-Woo was known as "Humanity\'s Weakest Weapon" — until a fateful day inside a Double Dungeon.',
    },
  },
  {
    pageNumber: 2,
    badge: {
      uz: '2-SAHIFA · QO‘SHALOQ ZINDON',
      ru: 'СТРАНИЦА 2 · ДВОЙНОЕ ПОДЗЕМЕЛЬЕ',
      en: 'PAGE 2 · THE DOUBLE DUNGEON',
    },
    title: {
      uz: 'Kartenon ibodatxonasi va Uch Qonun',
      ru: 'Храм Картенон и Три Заповеди',
      en: 'The Karthenon Temple & Three Commandments',
    },
    panelTopText: {
      uz: '1. TANGRIGA SAJDA QILING   2. TANGRINI ULUG‘LANG   3. E’TIQODINGIZNI ISBOTLANG',
      ru: '1. ПОКЛОНИСЬ БОГУ   2. ВОССЛАВЬ БОГА   3. ДОКАЖИ СВОЮ ВЕРУ',
      en: '1. WORSHIP THE LORD   2. PRAISE THE LORD   3. PROVE YOUR FAITH',
    },
    panelBottomText: {
      uz: 'SON JIN-VU: «Hammangiz darvozadan chiqing! Men qurbongohda qolib, tosh haykallarni ushlab turaman!»',
      ru: 'СОН ДЖИН-ВУ: «Уходите через врата! Я останусь у алтаря и задержу каменные статуи!»',
      en: 'SUNG JIN-WOO: "Everyone, escape through the gate! I will stay on the altar and hold the statues back!"',
    },
    narration: {
      uz: "Kartenon ibodatxonasidagi ulkan tosh haykal ko'zlaridan olov chaqnadi. O'rtoqlarini qutqarish uchun qurbongohda yolg'iz qolgan Jin-Vu o'lim bilan yuzma-yuz qoldi.",
      ru: 'Глаза гигантской статуи в храме Картенон вспыхнули багровым пламенем. Оставшись один на алтаре, чтобы спасти товарищей, Джин-Ву встретился лицом к лицу со смертью.',
      en: 'The colossal statue of the Karthenon Temple ignited with crimson light. Left alone upon the sacrificial altar to save his party, Jin-Woo faced certain death.',
    },
  },
  {
    pageNumber: 3,
    badge: {
      uz: '3-SAHIFA · TIZIM UYG‘ONISHI',
      ru: 'СТРАНИЦА 3 · ПРОБУЖДЕНИЕ СИСТЕМЫ',
      en: 'PAGE 3 · SYSTEM AWAKENING',
    },
    title: {
      uz: '[XABARNOMA]: Maxfiy topshiriq bajarildi!',
      ru: '[УВЕДОМЛЕНИЕ]: Секретный квест выполнен!',
      en: '[NOTIFICATION]: Secret Quest Completed!',
    },
    panelTopText: {
      uz: '[TIZIM]: Siz «Kuchsizlar jasorati» maxfiy sinovidan o‘tdingiz. O‘yinchi bo‘lish huquqini qabul qilasizmi?',
      ru: '[СИСТЕМА]: Вы прошли испытание «Мужество слабых». Принять квалификацию Игрока?',
      en: '[SYSTEM]: You have completed the secret quest "Courage of the Weak". Will you accept Player qualification?',
    },
    panelBottomText: {
      uz: '«Agar qabul qilmasangiz, yuragingiz 0.02 soniyadan so‘ng to‘xtaydi.» — [HA, QABUL QILAMAN!]',
      ru: '«Если вы откажетесь, ваше сердце остановится через 0.02 секунды.» — [ДА, ПРИНЯТЬ!]',
      en: '"If you decline, your heart will stop in 0.02 seconds." — [ACCEPT!]',
    },
    narration: {
      uz: "So'nggi lahzada Jin-Vu ko'z o'ngida faqat unga ko'rinadigan havorang «Tizim» oynasi ochildi. U «Ha» deb javob berdi va dunyoda o'z darajasini oshira oladigan yagona «O'yinchi» sifatida qayta uyg'ondi!",
      ru: 'В последнее мгновение перед глазами Джин-Ву всплыло голубое окно «Системы». Ответив «Да», он пробудился как единственный в мире «Игрок», способный повышать свой уровень!',
      en: 'In his final heartbeat, a translucent blue System window materialized before Jin-Woo. By accepting, he awakened as the world\'s only Player capable of leveling up without limit!',
    },
  },
  {
    pageNumber: 4,
    badge: {
      uz: '4-SAHIFA · KASB O‘ZGARTIRISH JANGI',
      ru: 'СТРАНИЦА 4 · ИСПЫТАНИЕ СМЕНЫ КЛАССА',
      en: 'PAGE 4 · JOB CHANGE QUEST',
    },
    title: {
      uz: 'Qon-qizil ritsarlar qo‘mondoni — Igris',
      ru: 'Кроваво-красный командир рыцарей — Игрис',
      en: 'Blood-Red Commander Igris',
    },
    panelTopText: {
      uz: '[BOSS JANGI]: Qon-qizil qo‘mondon Igris · Bo‘sh taxt qo‘riqchisi',
      ru: '[БОСС]: Кроваво-красный командир Игрис · Страж пустого трона',
      en: '[BOSS BATTLE]: Blood-Red Commander Igris · Guardian of the Empty Throne',
    },
    panelBottomText: {
      uz: 'SON JIN-VU: «Xanjar ham o‘tmayapti?! Unday bo‘lsa bor kuchim bilan musht tushiraman!»',
      ru: 'СОН ДЖИН-ВУ: «Даже кинжал не пробивает броню?! Тогда я вложу всю силу в удар кулаком!»',
      en: 'SUNG JIN-WOO: "Even my dagger won\'t pierce his armor?! Then I\'ll crush through with bare fists!"',
    },
    narration: {
      uz: "40-darajaga yetgan Jin-Vu kasb o'zgartirish zindoniga kirdi. Bo'sh taxtni qo'riqlayotgan qon-qizil ritsar Igris bilan kechgan shiddatli jangda Jin-Vu o'zining haqiqiy jangovar salohiyatini namoyon etdi.",
      ru: 'Достигнув 40-го уровня, Джин-Ву вошёл в подземелье смены класса. В яростной схватке с рыцарем Игрисом у подножия пустого трона он доказал свою истинную мощь.',
      en: 'Reaching Level 40, Jin-Woo entered the Job Change dungeon. Clashing steel and fists against the honorable knight commander Igris, he pushed past every human limit.',
    },
  },
  {
    pageNumber: 5,
    badge: {
      uz: '5-SAHIFA · KO‘LANKALAR MONARXI',
      ru: 'СТРАНИЦА 5 · МОНАРХ ТЕНЕЙ',
      en: 'PAGE 5 · THE SHADOW MONARCH',
    },
    title: {
      uz: 'Ko‘lankani ajratib olish — «TURINGLAR!» (ARISE)',
      ru: 'Извлечение тени — «ВОССТАНЬ!» (ARISE)',
      en: 'Shadow Extraction — "ARISE!"',
    },
    panelTopText: {
      uz: '[YANGI UNVON]: NECROMANCER → KO‘LANKALAR HUKMDORI (SHADOW MONARCH)',
      ru: '[НОВЫЙ КЛАСС]: НЕКРОМАНТ → МОНАРХ ТЕНЕЙ (SHADOW MONARCH)',
      en: '[NEW JOB CLASS]: NECROMANCER → MONARCH OF SHADOWS',
    },
    panelBottomText: {
      uz: 'SON JIN-VU: «...TURINGLAR! (ARISE!) Endi sizlar mening ko‘lanka qo‘shinimsiz!»',
      ru: 'СОН ДЖИН-ВУ: «...ВОССТАНЬТЕ! (ARISE!) Отныне вы — моя теневая армия!»',
      en: 'SUNG JIN-WOO: "...ARISE! From this moment forth, you are my Shadow Army!"',
    },
    narration: {
      uz: "«Turinglar!» — Jin-Vuning ushbu buyrug'i bilan zulmat qa'ridan Igris va yuzlab ko'lanka askarlari ko'tarildi. Yolg'iz ovchi bir o'zi butun bir o'lmas qo'shinning hukmdoriga aylandi!",
      ru: '«Восстаньте!» — по единому слову Джин-Ву из бездны поднялись Игрис и легион теневых рыцарей. Одинокий охотник сам стал целой армией!',
      en: '"Arise!" With a single command, Igris and a legion of shadow soldiers rose from the abyss. The solo hunter had become an immortal army of one.',
    },
  },
  {
    pageNumber: 6,
    badge: {
      uz: '6-SAHIFA · 10-JILD KULMINATSIYASI',
      ru: 'СТРАНИЦА 6 · КУЛЬМИНАЦИЯ 10-ГО ТОМА',
      en: 'PAGE 6 · VOL. 10 CLIMAX',
    },
    title: {
      uz: 'S-darajali ovchi va Monarxlar urushi',
      ru: 'Охотник S-ранга и Война Монархов',
      en: 'S-Rank Hunter & The Monarchs War',
    },
    panelTopText: {
      uz: 'BERU VA IGRIS: «Amringizga muntazirmiz, bizning Hukumdorimiz!»',
      ru: 'БЕРУ И ИГРИС: «Ждём вашего приказа, наш Повелитель!»',
      en: 'BERU & IGRIS: "We await your command, My Liege!"',
    },
    panelBottomText: {
      uz: 'SON JIN-VU: «Men yolg‘iz darajamni oshirdim — endi bu dunyoni hech bir Monarx yakson qila olmaydi!»',
      ru: 'СОН ДЖИН-ВУ: «Я поднял свой уровень в одиночку — и ни один Монарх не разрушит этот мир!»',
      en: 'SUNG JIN-WOO: "I leveled up alone — and no Monarch will ever tear this world apart!"',
    },
    narration: {
      uz: "Jeju orolini ozod qilib, Beru va minglab ko'lankalarni o'z safiga qo'shgan Son Jin-Vu o'zga olam Monarxlariga qarshi hal qiluvchi jangga kirishadi. Rasmiy manbalar orqali to'liq manga va animeni tomosha qiling!",
      ru: 'Освободив остров Чеджу и подчинив Короля муравьёв Беру, Сон Джин-Ву вступает в решающую войну против Монархов иных миров.',
      en: 'Having conquered Jeju Island and claimed the Shadow Ant King Beru, Sung Jin-Woo stands at the vanguard of humanity against the invading Monarchs.',
    },
  },
];
