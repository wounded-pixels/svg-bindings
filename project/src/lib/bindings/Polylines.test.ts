import { results } from './Polylines.stories';

test('basic construction', () => {
  expect(results.basic.outerHTML).toMatchInlineSnapshot(
    `"<div><svg viewBox=\\"0 0 100 100\\"><polyline fill=\\"none\\" opacity=\\"0.5\\" stroke=\\"black\\" stroke-width=\\"0.5\\" points=\\"10,10,20,50,30,10\\"></polyline></svg></div>"`
  );
});
