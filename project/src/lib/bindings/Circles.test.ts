import { results } from './Circles.stories';

test('basic construction', () => {
  expect(results.basic.outerHTML).toMatchInlineSnapshot(
    `"<div><svg viewBox=\\"0 0 100 100\\"><g></g><circle fill=\\"red\\" opacity=\\"0.5\\" stroke=\\"black\\" stroke-width=\\"0.5\\" transform=\\"translate(50, 0)\\" cx=\\"40\\" cy=\\"12.037037037037038\\" r=\\"2\\"></circle><circle fill=\\"red\\" opacity=\\"0.5\\" stroke=\\"black\\" stroke-width=\\"0.5\\" transform=\\"translate(50, 0)\\" cx=\\"38.333333333333336\\" cy=\\"10.185185185185183\\" r=\\"2\\"></circle></svg></div>"`
  );
});

test('minimal construction', () => {
  expect(results.defaults.outerHTML).toMatchInlineSnapshot(
    `"<div><svg viewBox=\\"0 0 100 100\\"><g><circle></circle><circle></circle></g></svg></div>"`
  );
});
