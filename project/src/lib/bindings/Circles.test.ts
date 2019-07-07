import { Circles } from './Circles';
import { TranslationProducer } from '../transform-producers/TranslationProducer';

test('basic construction', () => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');

  const circles = new Circles(svg, model => model.id);
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
    `"<svg viewBox=\\"0 0 100 100\\"><circle fill=\\"blue\\" opacity=\\"0.5\\" stroke=\\"black\\" stroke-width=\\"0.5\\" transform=\\"translate(20, 5)\\" cx=\\"90\\" cy=\\"10\\" r=\\"10\\"></circle><circle fill=\\"red\\" opacity=\\"0.5\\" stroke=\\"black\\" stroke-width=\\"0.5\\" transform=\\"translate(10, 5)\\" cx=\\"10\\" cy=\\"10\\" r=\\"5\\"></circle></svg>"`
  );
});

test('minimal construction', () => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');

  const circles = new Circles(svg, model => model.id);

  circles.update([{ id: 1, x: 10, y: 10 }, { id: 2, x: 90, y: 10 }]);
  expect(svg.outerHTML).toMatchInlineSnapshot(
    `"<svg viewBox=\\"0 0 100 100\\"><circle></circle><circle></circle></svg>"`
  );
});
