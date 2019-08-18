import { storiesOf } from '@storybook/html';
import {
  Lines,
  TranslationProducer,
  createResizableDiv,
  createResponsiveSvg,
} from '../../svg-bindings';

export const results: any = {};
results.defaults = createResizableDiv();
results.grid = createResizableDiv();

function createGrid() {
  const svg = createResponsiveSvg(results.grid);

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
  const svg = createResponsiveSvg(results.defaults);
  const lines = new Lines(svg, model => model.id)
    .x1(10)
    .y1(m => m.id * 10)
    .x2(30)
    .y2(m => m.id * 10 + 5);
  lines.update([{ id: 1 }, { id: 2 }]);
}

createGrid();
createDefaults();

storiesOf('Lines', module)
  .add('defaults', () => results.defaults)
  .add('grid', () => results.grid);
