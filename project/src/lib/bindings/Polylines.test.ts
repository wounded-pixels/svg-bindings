import { Polylines } from './Polylines';
import { createSvgElement } from '../util/svg-element';

test('basic construction', () => {
  const svg = createSvgElement('svg', {
    viewBox: '0 0 100 100',
  });

  const points = [10, 10, 20, 50, 30, 10];
  const models = [
    {
      id: 1,
      points,
    },
  ];

  const polylines = new Polylines(svg, m => m.id)
    .opacity(0.5)
    .stroke('black')
    .strokeWidth(0.5)
    .fill('none')
    .points(m => m.points);

  polylines.update(models);

  expect(svg.outerHTML).toMatchInlineSnapshot(
    `"<svg viewBox=\\"0 0 100 100\\"><polyline fill=\\"none\\" opacity=\\"0.5\\" stroke=\\"black\\" stroke-width=\\"0.5\\" points=\\"10,10,20,50,30,10\\"></polyline></svg>"`
  );
});
