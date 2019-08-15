import { storiesOf } from '@storybook/html';
import { Circles, Ellipses, createSvgElement } from '../../svg-bindings';

export const results: any = {};
results.defaults = document.createElement('div');
results.basic = document.createElement('div');

function createBasic() {
  const svg = createSvgElement(
    'svg',
    { viewBox: '0 0 100 100' },
    results.basic
  );
  const dominantAxis = 10;

  const circles = new Circles(svg, model => model.id);
  circles
    .cx(m => m.x)
    .cy(m => m.y)
    .r(m => m.r)
    .fill('none')
    .stroke('black')
    .strokeWidth(0.5);

  circles.update([
    { id: 1, x: 25, y: 25, r: dominantAxis },
    { id: 2, x: 25, y: 25, r: 0.5 },
  ]);

  const ellipses = new Ellipses(svg, model => model.id);
  ellipses
    .cx(m => m.x)
    .cy(m => m.y)
    .rx(m => (m.id % 2 === 0 ? dominantAxis : dominantAxis / 2))
    .ry(m => (m.id % 2 === 1 ? dominantAxis : dominantAxis / 2))
    .fill('none')
    .stroke(m => (m.id % 2 === 0 ? 'red' : 'blue'))
    .strokeWidth(0.5);

  ellipses.update([{ id: 1, x: 25, y: 25 }, { id: 2, x: 25, y: 25 }]);
}

function createDefaults() {
  const svg = createSvgElement(
    'svg',
    { viewBox: '0 0 100 100' },
    results.defaults
  );
  const ellipses = new Ellipses(svg, model => model.id);
  ellipses.update([{ id: 1, x: 25, y: 25 }, { id: 2, x: 25, y: 25 }]);
}

createBasic();
createDefaults();

storiesOf('Ellipses', module)
  .add('defaults', () => results.defaults)
  .add('basic construction', () => results.basic);
