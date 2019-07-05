import { Circles } from './Circles';

test('basic construction', () => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');

  const circles = new Circles(svg, model => model.id);
  circles
    .cx(m => m.x)
    .cy(m => m.y)
    .r(m => m.id * 5)
    .fill(m => (m.id % 2 ? 'red' : 'blue'))
    .stroke('black')
    .strokeWidth(0.5);
  circles.update([{ id: 1, x: 10, y: 10 }, { id: 2, x: 90, y: 10 }]);

  expect(svg.outerHTML).toMatchInlineSnapshot(
    `"<svg viewBox=\\"0 0 100 100\\"><circle cx=\\"10\\" cy=\\"10\\" r=\\"5\\" fill=\\"red\\" stroke=\\"black\\" stroke-width=\\"0.5\\"></circle><circle cx=\\"90\\" cy=\\"10\\" r=\\"10\\" fill=\\"blue\\" stroke=\\"black\\" stroke-width=\\"0.5\\"></circle></svg>"`
  );
});
