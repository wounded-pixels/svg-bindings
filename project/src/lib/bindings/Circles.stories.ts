import { storiesOf } from '@storybook/html';
import {
  Circles,
  createResizableDiv,
  createResponsiveSvg,
  createSvgElement,
  TranslationProducer,
} from '../../svg-bindings';

export const results: any = {};
results.defaults = createResizableDiv(100, 200, 200, 300, 300, 400);
results.basic = createResizableDiv();

const models = [
  { id: 1, x: 10, y: 10, color: 'red' },
  { id: 2, x: 50, y: 50, color: 'blue' },
];

function createBasic() {
  const svg = createResponsiveSvg(results.basic);

  const circles = new Circles(svg, model => model.id);
  circles
    .cx(m => m.x)
    .cy(m => m.y)
    .r(m => m.id * 3)
    .fill(m => m.color)
    .opacity(0.5)
    .stroke('black')
    .strokeWidth(0.5)
    .addTransform(new TranslationProducer(m => m.id * 2, 0));

  circles.update(models);
}

function createDefaults() {
  const svg = createResponsiveSvg(results.defaults);
  const group = createSvgElement('g', svg);
  const circles = new Circles(group, model => model.id)
    .cx(m => m.x)
    .cy(m => m.y);
  circles.update(models);
}

createBasic();
createDefaults();

storiesOf('Circles', module)
  .add('defaults', () => results.defaults)
  .add('basic construction', () => results.basic);
