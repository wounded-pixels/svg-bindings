import { Ellipses } from './Ellipses';

test('basic construction', () => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');

  const ellipses = new Ellipses(svg, model => model.id);
  ellipses
    .cx(m => m.x)
    .cy(m => m.y)
    .rx(20)
    .ry(10)
    .stroke('black')
    .strokeWidth(0.5);

  ellipses.update([{ id: 1, x: 25, y: 25 }]);

  expect(svg.outerHTML).toMatchInlineSnapshot(
    `"<svg viewBox=\\"0 0 100 100\\"><ellipse stroke=\\"black\\" stroke-width=\\"0.5\\" cx=\\"25\\" cy=\\"25\\" rx=\\"20\\" ry=\\"10\\"></ellipse></svg>"`
  );
});
