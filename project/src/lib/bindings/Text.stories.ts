import { storiesOf } from '@storybook/html';
import {
  Text,
  createResizableDiv,
  createResponsiveSvg,
} from '../../svg-bindings';

export const results: any = {};
results.defaults = createResizableDiv();
results.basic = createResizableDiv(100, 200, 200, 300, 300, 400);

const models = [
  { id: 1, x: 10, y: 10, text: 'Hi 10' },
  { id: 2, x: 10, y: 50, text: 'There 50' },
];

function createBasic() {
  const svg = createResponsiveSvg(results.basic);

  const text = new Text(svg, model => model.id);
  text
    .x(m => m.x)
    .y(m => m.y)
    .fill(m => m.color)
    .opacity(0.5)
    .stroke('blue')
    .strokeWidth(0.5)
    .fontSize(m => (m.id % 2 == 0 ? '20px' : '10px'))
    .fontFamily(m => (m.id % 2 == 0 ? 'sans-serif' : 'cursive'))
    .bold(m => m.id % 2 == 0)
    .text(m => m.text);

  text.update(models);
}

function createDefaults() {
  const svg = createResponsiveSvg(results.defaults);

  const text = new Text(svg, model => model.id);
  text
    .x(m => m.x)
    .y(m => m.y)
    .text('yo');

  text.update(models);
}
createBasic();
createDefaults();

storiesOf('Text', module)
  .add('defaults', () => results.defaults)
  .add('basic construction', () => results.basic);
