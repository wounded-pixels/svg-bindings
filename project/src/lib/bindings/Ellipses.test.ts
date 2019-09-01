import { results } from './Ellipses.stories';

test('basic construction', () => {
  expect(results.basic.outerHTML).toMatchInlineSnapshot(
    `"<div style=\\"min-width: 200px; min-height: 200px; width: 300px; height: 300px; max-width: 400px; max-height: 400px; border: 1px solid black; resize: both; overflow: hidden;\\"><svg viewBox=\\"0 0 50 50\\" preserveAspectRatio=\\"xMidYMid meet\\" style=\\"width: 100%; height: 100%; display: inline-block; overflow: hidden;\\"><ellipse fill=\\"none\\" stroke=\\"blue\\" stroke-width=\\"0.5\\" cx=\\"25\\" cy=\\"25\\" rx=\\"5\\" ry=\\"10\\"></ellipse><ellipse fill=\\"none\\" stroke=\\"red\\" stroke-width=\\"0.5\\" cx=\\"25\\" cy=\\"25\\" rx=\\"10\\" ry=\\"5\\"></ellipse></svg></div>"`
  );
});

test('defaults', () => {
  expect(results.defaults.outerHTML).toMatchInlineSnapshot(
    `"<div style=\\"min-width: 200px; min-height: 200px; width: 300px; height: 300px; max-width: 400px; max-height: 400px; border: 1px solid black; resize: both; overflow: hidden;\\"><svg viewBox=\\"0 0 100 100\\" preserveAspectRatio=\\"xMidYMid meet\\" style=\\"width: 100%; height: 100%; display: inline-block; overflow: hidden;\\"><ellipse fill=\\"grey\\" stroke=\\"black\\" stroke-width=\\"1\\" cx=\\"25\\" cy=\\"25\\" rx=\\"4\\" ry=\\"2\\"></ellipse><ellipse fill=\\"grey\\" stroke=\\"black\\" stroke-width=\\"1\\" cx=\\"25\\" cy=\\"25\\" rx=\\"4\\" ry=\\"2\\"></ellipse></svg></div>"`
  );
});
