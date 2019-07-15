import { document } from 'global';
import { storiesOf } from '@storybook/html';
import {
  Polylines,
  TranslationProducer,
} from '../../project/dist/svg-bindings';

storiesOf('Polylines', module).add('basic construction', () => {
  const parentDiv = document.createElement('div');

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');

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

  parentDiv.appendChild(svg);

  return parentDiv;
});
