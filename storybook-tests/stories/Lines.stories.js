import { document } from 'global';
import { storiesOf } from '@storybook/html';
import { Lines, TranslationProducer } from '../../project/dist/svg-bindings';

storiesOf('Lines', module).add('basic construction', () => {
  const parentDiv = document.createElement('div');

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');

  const stepByTen = m => m.id * 10;
  const hLines = new Lines(svg, model => model.id)
    .x1(0)
    .y1(stepByTen)
    .x2(90)
    .y2(stepByTen)
    .addTransform(new TranslationProducer(5, 5))
    .stroke('black')
    .strokeWidth(0.5);

  const vLines = new Lines(svg, model => model.id)
    .x1(stepByTen)
    .y1(0)
    .x2(stepByTen)
    .y2(90)
    .addTransform(new TranslationProducer(5, 5))
    .stroke('black')
    .strokeWidth(0.5);

  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => {
    return { id: index };
  });
  hLines.update(values);
  vLines.update(values);

  parentDiv.appendChild(svg);

  return parentDiv;
});
