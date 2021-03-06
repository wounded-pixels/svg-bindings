import { results } from './Circles.stories';

test('basic construction', () => {
  expect(results.basic.outerHTML).toMatchInlineSnapshot(
    `"<div style=\\"min-width: 200px; min-height: 200px; width: 300px; height: 300px; max-width: 400px; max-height: 400px; border: 1px solid black; resize: both; overflow: hidden;\\"><svg viewBox=\\"0 0 100 100\\" preserveAspectRatio=\\"xMidYMid meet\\" style=\\"width: 100%; height: 100%; display: inline-block; overflow: hidden;\\"><circle fill=\\"red\\" opacity=\\"0.5\\" stroke=\\"black\\" stroke-width=\\"0.5\\" transform=\\"translate(2, 0)\\" cx=\\"10\\" cy=\\"10\\" r=\\"3\\"></circle><circle fill=\\"blue\\" opacity=\\"0.5\\" stroke=\\"black\\" stroke-width=\\"0.5\\" transform=\\"translate(4, 0)\\" cx=\\"50\\" cy=\\"50\\" r=\\"6\\"></circle><circle fill=\\"yellow\\" opacity=\\"0.5\\" stroke=\\"black\\" stroke-width=\\"0.5\\" transform=\\"translate(6, 0)\\" cx=\\"80\\" cy=\\"97\\" r=\\"9\\"></circle></svg><div style=\\"position: absolute; padding: 7px; border-radius: 5px; display: none;\\"></div></div>"`
  );
});

test('minimal construction', () => {
  expect(results.defaults.outerHTML).toMatchInlineSnapshot(
    `"<div style=\\"min-width: 100px; min-height: 200px; width: 200px; height: 300px; max-width: 300px; max-height: 400px; border: 1px solid black; resize: both; overflow: hidden;\\"><svg viewBox=\\"0 0 100 100\\" preserveAspectRatio=\\"xMidYMid meet\\" style=\\"width: 100%; height: 100%; display: inline-block; overflow: hidden;\\"><g><circle fill=\\"grey\\" stroke=\\"black\\" stroke-width=\\"1\\" cx=\\"10\\" cy=\\"10\\" r=\\"3\\"></circle><circle fill=\\"grey\\" stroke=\\"black\\" stroke-width=\\"1\\" cx=\\"50\\" cy=\\"50\\" r=\\"3\\"></circle><circle fill=\\"grey\\" stroke=\\"black\\" stroke-width=\\"1\\" cx=\\"80\\" cy=\\"97\\" r=\\"3\\"></circle></g></svg></div>"`
  );
});
