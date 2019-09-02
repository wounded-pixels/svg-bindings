import { results } from './Text.stories';

test('basic construction', () => {
  expect(results.basic.outerHTML).toMatchInlineSnapshot(
    `"<div style=\\"min-width: 100px; min-height: 200px; width: 200px; height: 300px; max-width: 300px; max-height: 400px; border: 1px solid black; resize: both; overflow: hidden;\\"><svg viewBox=\\"0 0 100 100\\" preserveAspectRatio=\\"xMidYMid meet\\" style=\\"width: 100%; height: 100%; display: inline-block; overflow: hidden;\\"><text fill=\\"undefined\\" opacity=\\"0.5\\" stroke=\\"blue\\" stroke-width=\\"0.5\\" x=\\"10\\" y=\\"10\\" font-size=\\"10px\\" font-family=\\"cursive\\" font-weight=\\"normal\\">Hi 10</text><text fill=\\"undefined\\" opacity=\\"0.5\\" stroke=\\"blue\\" stroke-width=\\"0.5\\" x=\\"10\\" y=\\"50\\" font-size=\\"20px\\" font-family=\\"sans-serif\\" font-weight=\\"bold\\">There 50</text></svg></div>"`
  );
});

test('minimal construction', () => {
  expect(results.defaults.outerHTML).toMatchInlineSnapshot(
    `"<div style=\\"min-width: 200px; min-height: 200px; width: 300px; height: 300px; max-width: 400px; max-height: 400px; border: 1px solid black; resize: both; overflow: hidden;\\"><svg viewBox=\\"0 0 100 100\\" preserveAspectRatio=\\"xMidYMid meet\\" style=\\"width: 100%; height: 100%; display: inline-block; overflow: hidden;\\"><text fill=\\"grey\\" stroke=\\"black\\" stroke-width=\\"1\\" x=\\"10\\" y=\\"10\\" font-weight=\\"normal\\">yo</text><text fill=\\"grey\\" stroke=\\"black\\" stroke-width=\\"1\\" x=\\"10\\" y=\\"50\\" font-weight=\\"normal\\">yo</text></svg></div>"`
  );
});

test('text anchor', () => {
  expect(results.textAnchor.outerHTML).toMatchInlineSnapshot(
    `"<div style=\\"min-width: 100px; min-height: 200px; width: 200px; height: 300px; max-width: 300px; max-height: 400px; border: 1px solid black; resize: both; overflow: hidden;\\"><svg viewBox=\\"0 0 100 100\\" preserveAspectRatio=\\"xMidYMid meet\\" style=\\"width: 100%; height: 100%; display: inline-block; overflow: hidden;\\"><line x1=\\"50\\" y1=\\"0\\" x2=\\"50\\" y2=\\"100\\" stroke=\\"grey\\"></line><text fill=\\"grey\\" stroke=\\"black\\" stroke-width=\\"1\\" x=\\"50\\" y=\\"30\\" text-anchor=\\"start\\" font-weight=\\"normal\\">hello</text><text fill=\\"grey\\" stroke=\\"black\\" stroke-width=\\"1\\" x=\\"50\\" y=\\"60\\" text-anchor=\\"middle\\" font-weight=\\"normal\\">hello</text><text fill=\\"grey\\" stroke=\\"black\\" stroke-width=\\"1\\" x=\\"50\\" y=\\"90\\" text-anchor=\\"end\\" font-weight=\\"normal\\">hello</text></svg></div>"`
  );
});
