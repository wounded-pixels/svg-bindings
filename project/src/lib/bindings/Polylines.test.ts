import { results } from './Polylines.stories';

test('basic construction', () => {
  expect(results.basic.outerHTML).toMatchInlineSnapshot(
    `"<div style=\\"min-width: 200px; min-height: 200px; width: 300px; height: 300px; max-width: 400px; max-height: 400px; border: 1px solid black; resize: both; overflow: hidden;\\"><svg viewBox=\\"0 0 100 100\\" preserveAspectRatio=\\"xMidYMid meet\\" style=\\"width: 100%; height: 100%; display: inline-block; overflow: hidden;\\"><polyline fill=\\"none\\" opacity=\\"0.5\\" stroke=\\"black\\" stroke-width=\\"0.5\\" points=\\"10,10,20,50,30,10\\"></polyline></svg></div>"`
  );
});
