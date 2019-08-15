import { results } from './Ellipses.stories';

test('basic construction', () => {
  expect(results.basic.outerHTML).toMatchInlineSnapshot(
    `"<div><svg viewBox=\\"0 0 100 100\\"><circle fill=\\"none\\" stroke=\\"black\\" stroke-width=\\"0.5\\" cx=\\"25\\" cy=\\"25\\" r=\\"10\\"></circle><circle fill=\\"none\\" stroke=\\"black\\" stroke-width=\\"0.5\\" cx=\\"25\\" cy=\\"25\\" r=\\"0.5\\"></circle><ellipse fill=\\"none\\" stroke=\\"blue\\" stroke-width=\\"0.5\\" cx=\\"25\\" cy=\\"25\\" rx=\\"5\\" ry=\\"10\\"></ellipse><ellipse fill=\\"none\\" stroke=\\"red\\" stroke-width=\\"0.5\\" cx=\\"25\\" cy=\\"25\\" rx=\\"10\\" ry=\\"5\\"></ellipse></svg></div>"`
  );
});

test('defaults', () => {
  expect(results.defaults.outerHTML).toMatchInlineSnapshot(
    `"<div><svg viewBox=\\"0 0 100 100\\"><ellipse></ellipse><ellipse></ellipse></svg></div>"`
  );
});
