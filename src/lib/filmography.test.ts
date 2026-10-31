import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FILMS,
  CROP,
  INK_BLOBS,
  LANGUAGES,
  UI_TEXT,
  formatFilmSubtitle,
  getBackgroundCropStyle,
  getPosterSvgRect,
  smoothStepB,
  computeTapeDimensions,
  wrapRelativeIndex,
  computeHorizontalX,
  computeTapeTransformState,
  getActiveFilmIndex,
  getDecadeForFilm,
  getTargetForDecadeJump,
} from './filmography';
import {
  SOLO_LEVELING_PAGES,
  SOLO_LEVELING_LINKS,
} from './soloLevelingManga';

test('FILMS contains Solo Leveling manga, Amir Temur book, and all 12 films with uz, ru, en translations and zero Japanese characters', () => {
  assert.equal(FILMS.length, 14);
  assert.equal(LANGUAGES.length, 3);

  const temur = FILMS.find((f) => f.id === 'temur');
  assert.ok(temur);
  assert.equal(temur.isBook, true);
  assert.equal(temur.bookUrl, 'https://archive.org/details/AmirTemur/mode/2up');
  assert.equal(temur.bookEmbedUrl, 'https://archive.org/embed/AmirTemur?ui=embed#mode/2up');

  const solo = FILMS.find((f) => f.id === 'sololeveling');
  assert.ok(solo);
  assert.equal(solo.isManga, true);
  assert.equal(
    solo.crunchyrollUrl,
    'https://www.crunchyroll.com/series/GDKHZEJ0K/solo-leveling?utm_medium=web&utm_source=share'
  );
  assert.equal(solo.tappytoonUrl, 'https://www.tappytoon.com/comics/solo-leveling-official');

  assert.equal(SOLO_LEVELING_PAGES.length, 6);
  assert.equal(SOLO_LEVELING_LINKS.coverImage, '/assets/solo-leveling-cover.jpg');

  const jpRegex = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/;

  for (const lang of ['uz', 'ru', 'en'] as const) {
    assert.ok(!jpRegex.test(UI_TEXT[lang].back));
    assert.ok(!jpRegex.test(UI_TEXT[lang].all));
    assert.ok(!jpRegex.test(UI_TEXT[lang].mangaTab));
    assert.ok(!jpRegex.test(UI_TEXT[lang].bookTab));
    assert.ok(!jpRegex.test(UI_TEXT[lang].readBook));
    assert.ok(!jpRegex.test(UI_TEXT[lang].readManga));

    for (const film of FILMS) {
      const tr = film.i18n[lang];
      assert.ok(tr.title.length > 0);
      assert.ok(tr.genre.length > 0);
      assert.ok(tr.synopsis.length > 0);
      assert.ok(!jpRegex.test(tr.title));
      assert.ok(!jpRegex.test(tr.genre));
      assert.ok(!jpRegex.test(tr.synopsis));
      assert.ok(!jpRegex.test(formatFilmSubtitle(film, lang)));
    }

    for (const page of SOLO_LEVELING_PAGES) {
      assert.ok(page.title[lang].length > 0);
      assert.ok(page.panelTopText[lang].length > 0);
      assert.ok(page.panelBottomText[lang].length > 0);
      assert.ok(page.narration[lang].length > 0);
      assert.ok(!jpRegex.test(page.title[lang]));
      assert.ok(!jpRegex.test(page.panelTopText[lang]));
      assert.ok(!jpRegex.test(page.panelBottomText[lang]));
      assert.ok(!jpRegex.test(page.narration[lang]));
    }
  }
});

test('Every item has valid spine and cover crop entries and SVG poster geometry', () => {
  for (const film of FILMS) {
    const spineStyle = getBackgroundCropStyle(`spine-${film.id}`);
    const coverStyle = getBackgroundCropStyle(`cover-${film.id}`);
    assert.ok(spineStyle.backgroundImage.length > 10);
    assert.ok(coverStyle.backgroundImage.length > 10);

    const posterRect = getPosterSvgRect(film.id);
    assert.ok(posterRect.width >= 474);
    assert.ok(posterRect.height >= 900);
  }
  assert.equal(Object.keys(CROP).length, 28);
  assert.equal(INK_BLOBS.length, 7);
});

test('Shelf smoothstep and horizontal spacing B(r) / F(r) are continuous and symmetric', () => {
  assert.equal(smoothStepB(0), 0);
  assert.equal(smoothStepB(1), 0.5);
  assert.equal(smoothStepB(-1), -0.5);

  const dims = computeTapeDimensions(400);
  assert.equal(computeHorizontalX(0, dims.ws, dims.d, dims.gap), 0);
  const right1 = computeHorizontalX(1, dims.ws, dims.d, dims.gap);
  const left1 = computeHorizontalX(-1, dims.ws, dims.d, dims.gap);
  assert.ok(Math.abs(right1 + left1) < 1e-9);
  assert.ok(right1 > dims.ws + dims.gap);
});

test('Active tape transform at r=0 is fully open (-90deg Y, -4.5deg Z, pulled forward)', () => {
  const dims = computeTapeDimensions(400);
  const activeState = computeTapeTransformState(0, dims.H, dims.ws, dims.d, dims.gap, 0, 0, 0);
  assert.equal(activeState.o, 1);
  assert.equal(activeState.rotY, -90);
  assert.equal(activeState.rotZ, -4.5);
  assert.equal(activeState.tz, 80);

  const spineState = computeTapeTransformState(2, dims.H, dims.ws, dims.d, dims.gap, 0, 0, 0);
  assert.equal(spineState.o, 0);
  assert.equal(spineState.rotY, 0);
  assert.equal(spineState.rotZ, 0);
  assert.equal(spineState.tz, 0);
});

test('Active item index, relative wrapping, and manga/book/decade jump shortest path work accurately', () => {
  // Index 6 is Solo Leveling (in middle copy of 14 items: 14 + 6 = 20)
  assert.equal(getActiveFilmIndex(20), 6);
  assert.equal(FILMS[getActiveFilmIndex(20)].id, 'sololeveling');
  assert.equal(getDecadeForFilm(FILMS[6]), 'manga');
  assert.equal(getDecadeForFilm(FILMS[5]), 'book');
  assert.equal(wrapRelativeIndex(20, 20), 0);
  assert.equal(wrapRelativeIndex(21, 20), 1);

  assert.equal(getTargetForDecadeJump(20, 'manga'), 20);
  assert.equal(getTargetForDecadeJump(20, 'book'), 19);
  assert.equal(getTargetForDecadeJump(20, '1970s'), 21);
  assert.equal(getTargetForDecadeJump(20, 'all'), 14);
});
