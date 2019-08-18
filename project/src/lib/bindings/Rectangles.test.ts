import { Rectangles } from './Rectangles';
import { TranslationProducer } from '../transform-producers/TranslationProducer';
import { createSvgElement } from '../util/svg-element';

test('basic construction', () => {
  const svg = createSvgElement('svg', null, {
    viewBox: '0 0 100 100',
  });

  const rectangles = new Rectangles(svg, model => model.id);
  rectangles
    .x(m => m.x)
    .y(m => m.y)
    .width(m => m.id * 5)
    .height(m => m.id * 10)
    .fill(m => (m.id % 2 ? 'red' : 'blue'))
    .opacity(0.5)
    .stroke('black')
    .strokeWidth(0.5)
    .xRadius(2)
    .yRadius(2)
    .addTransform(new TranslationProducer(5, 5));

  rectangles.update([{ id: 1, x: 10, y: 10 }, { id: 2, x: 90, y: 10 }]);
  rectangles.update([{ id: 2, x: 90, y: 10 }]);
  rectangles.update([{ id: 1, x: 10, y: 10 }, { id: 2, x: 90, y: 10 }]);

  expect(svg.outerHTML).toMatchInlineSnapshot(
    `"<svg viewBox=\\"0 0 100 100\\"><rect fill=\\"blue\\" opacity=\\"0.5\\" stroke=\\"black\\" stroke-width=\\"0.5\\" transform=\\"translate(5, 5)\\" x=\\"90\\" y=\\"10\\" width=\\"10\\" height=\\"20\\" rx=\\"2\\" ry=\\"2\\"></rect><rect fill=\\"red\\" opacity=\\"0.5\\" stroke=\\"black\\" stroke-width=\\"0.5\\" transform=\\"translate(5, 5)\\" x=\\"10\\" y=\\"10\\" width=\\"5\\" height=\\"10\\" rx=\\"2\\" ry=\\"2\\"></rect></svg>"`
  );
});

test('minimal construction', () => {
  const svg = createSvgElement('svg', null, {
    viewBox: '0 0 100 100',
  });

  const rectangles = new Rectangles(svg, model => model.id);

  rectangles.update([{ id: 1, x: 10, y: 10 }, { id: 2, x: 90, y: 10 }]);
  expect(svg.outerHTML).toMatchInlineSnapshot(
    `"<svg viewBox=\\"0 0 100 100\\"><rect fill=\\"grey\\" stroke=\\"grey\\" stroke-width=\\"1\\"></rect><rect fill=\\"grey\\" stroke=\\"grey\\" stroke-width=\\"1\\"></rect></svg>"`
  );
});

test('centered', () => {
  const svg = createSvgElement('svg', null, {
    viewBox: '0 0 100 100',
  });

  const rectangles = new Rectangles(svg, model => model.id);
  rectangles
    .center(m => m.x, m => m.y)
    .width(5)
    .height(5)
    .fill('red');

  rectangles.update([{ id: 1, x: 10, y: 10 }, { id: 2, x: 90, y: 90 }]);
  expect(svg.outerHTML).toMatchInlineSnapshot(
    `"<svg viewBox=\\"0 0 100 100\\"><rect fill=\\"red\\" stroke=\\"grey\\" stroke-width=\\"1\\" x=\\"7.5\\" y=\\"7.5\\" width=\\"5\\" height=\\"5\\"></rect><rect fill=\\"red\\" stroke=\\"grey\\" stroke-width=\\"1\\" x=\\"87.5\\" y=\\"87.5\\" width=\\"5\\" height=\\"5\\"></rect></svg>"`
  );
});

test('centered, missing width and height', () => {
  const svg = createSvgElement('svg', null, {
    viewBox: '0 0 100 100',
  });

  const rectangles = new Rectangles(svg, model => model.id);
  rectangles.center(m => m.x, m => m.y).fill('red');

  rectangles.update([{ id: 1, x: 10, y: 10 }, { id: 2, x: 90, y: 90 }]);
  expect(svg.outerHTML).toMatchInlineSnapshot(
    `"<svg viewBox=\\"0 0 100 100\\"><rect fill=\\"red\\" stroke=\\"grey\\" stroke-width=\\"1\\" x=\\"10\\" y=\\"10\\" width=\\"0\\" height=\\"0\\"></rect><rect fill=\\"red\\" stroke=\\"grey\\" stroke-width=\\"1\\" x=\\"90\\" y=\\"90\\" width=\\"0\\" height=\\"0\\"></rect></svg>"`
  );
});
