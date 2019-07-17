import { Circles } from './Circles';
import { TranslationProducer } from '../transform-producers/TranslationProducer';
import { createSvgElement } from '../util/svg-element';

test('basic construction', () => {
  const svg = createSvgElement('svg', {
    viewBox: '0 0 100 100',
  });
  const group = createSvgElement('g', { nope: null }, svg);
  const circles = new Circles(group, model => model.id);
  circles
    .cx(m => m.x)
    .cy(m => m.y)
    .r(m => m.id * 5)
    .fill(m => (m.id % 2 ? 'red' : 'blue'))
    .opacity(0.5)
    .stroke('black')
    .strokeWidth(0.5)
    .addTransform(new TranslationProducer(m => m.id * 10, 5));

  circles.update([{ id: 1, x: 10, y: 10 }, { id: 2, x: 90, y: 10 }]);
  circles.update([{ id: 2, x: 90, y: 10 }]);
  circles.update([{ id: 1, x: 10, y: 10 }, { id: 2, x: 90, y: 10 }]);

  expect(svg.outerHTML).toMatchInlineSnapshot(
    `"<svg viewBox=\\"0 0 100 100\\"><g><circle fill=\\"blue\\" opacity=\\"0.5\\" stroke=\\"black\\" stroke-width=\\"0.5\\" transform=\\"translate(20, 5)\\" cx=\\"90\\" cy=\\"10\\" r=\\"10\\"></circle><circle fill=\\"red\\" opacity=\\"0.5\\" stroke=\\"black\\" stroke-width=\\"0.5\\" transform=\\"translate(10, 5)\\" cx=\\"10\\" cy=\\"10\\" r=\\"5\\"></circle></g></svg>"`
  );
});

test('minimal construction', () => {
  const svg = createSvgElement('svg', {
    viewBox: '0 0 100 100',
  });
  const group = createSvgElement('g');
  svg.appendChild(group);
  const circles = new Circles(group, model => model.id);

  circles.update([{ id: 1, x: 10, y: 10 }, { id: 2, x: 90, y: 10 }]);
  expect(svg.outerHTML).toMatchInlineSnapshot(
    `"<svg viewBox=\\"0 0 100 100\\"><g><circle></circle><circle></circle></g></svg>"`
  );
});
