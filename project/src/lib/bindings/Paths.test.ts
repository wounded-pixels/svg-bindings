import { results } from './Paths.stories';

test('basic construction', () => {
  expect(results.basic.outerHTML).toMatchInlineSnapshot(
    `"<div><svg viewBox=\\"0 0 100 100\\"><path fill=\\"blue\\" opacity=\\"0.5\\" stroke=\\"black\\" stroke-width=\\"0.5\\" d=\\"M25 25 L75 25 L75 75 L25 75 L25 25 M40 40 L40 60 L60 60 L60 40 L40 40\\"></path></svg></div>"`
  );
});
