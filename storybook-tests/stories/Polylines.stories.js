import { document } from 'global';
import { storiesOf } from '@storybook/html';
import {
  createSvgElement,
  Polylines,
  TranslationProducer,
} from '@wounded-pixels/svg-bindings';

storiesOf('Polylines', module).add('basic construction', () => {
  const parentDiv = document.createElement('div');
  const svg = createSvgElement('svg', { viewBox: '0 0 100 100' }, parentDiv);

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

  return parentDiv;
});
