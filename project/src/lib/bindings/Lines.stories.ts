import { storiesOf } from '@storybook/html';
import {
  Lines,
  createSvgElement,
  TranslationProducer,
} from '../../svg-bindings';

export const results: any = {};
results.defaults = document.createElement('div');
results.grid = document.createElement('div');

function createGrid() {
  const svg = createSvgElement('svg', { viewBox: '0 0 100 100' }, results.grid);

  const stepByTen = (m: { id: number }) => m.id * 10;
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
}

function createDefaults() {
  const svg = createSvgElement(
    'svg',
    { viewBox: '0 0 100 100' },
    results.defaults
  );

  const lines = new Lines(svg, model => model.id);
  lines.update([{ id: 1 }]);
}

createGrid();
createDefaults();

storiesOf('Lines', module)
  .add('defaults', () => results.defaults)
  .add('grid', () => results.grid);
