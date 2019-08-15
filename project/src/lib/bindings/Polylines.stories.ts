import { storiesOf } from '@storybook/html';
import { Polylines, createSvgElement } from '../../svg-bindings';

export const results: any = {};
results.basic = document.createElement('div');

function createBasic() {
  const svg = createSvgElement(
    'svg',
    { viewBox: '0 0 100 100' },
    results.basic
  );

  const points = [10, 10, 20, 50, 30, 10];
  const models = [
    {
      id: 1,
      points,
    },
  ];

  const polylines = new Polylines(svg, m => m.id)
    .opacity(0.5)
    .stroke('black')
    .strokeWidth(0.5)
    .fill('none')
    .points(m => m.points);

  polylines.update(models);
}

createBasic();

storiesOf('Polylines', module).add('basic', () => results.basic);
