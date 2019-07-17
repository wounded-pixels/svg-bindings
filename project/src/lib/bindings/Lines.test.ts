import { Lines } from './Lines';
import { createSvgElement } from '../util/svg-element';

test('basic construction', () => {
  const svg = createSvgElement('svg', {
    viewBox: '0 0 100 100',
  });

  const rows = [{ id: 1, row: 1 }];
  const lines = new Lines(svg, model => model.id);
  lines
    .x1(0)
    .y1(m => m.row * 10)
    .x2(100)
    .y2(m => m.row * 10)
    .stroke('black')
    .strokeWidth(0.5);

  lines.update(rows);

  expect(svg.outerHTML).toMatchInlineSnapshot(
    `"<svg viewBox=\\"0 0 100 100\\"><line stroke=\\"black\\" stroke-width=\\"0.5\\" x1=\\"0\\" y1=\\"10\\" x2=\\"100\\" y2=\\"10\\"></line></svg>"`
  );
});
