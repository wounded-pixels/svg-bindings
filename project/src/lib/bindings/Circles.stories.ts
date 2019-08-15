import { storiesOf } from '@storybook/html';
import {
  Circles,
  createSvgElement,
  TranslationProducer,
} from '../../svg-bindings';

export const results: any = {};
results.defaults = document.createElement('div');
results.basic = document.createElement('div');

function createBasic() {
  const svg = createSvgElement(
    'svg',
    { viewBox: '0 0 100 100' },
    results.basic
  );
  const group = createSvgElement('g');
  svg.appendChild(group);

  const circles = new Circles(svg, model => model.id);
  circles
    .cx(m => (50 * m.height) / 90)
    .cy(m => 50 - (50 * m.weight) / 270)
    .r(2)
    .fill(m => (m.gender === 'm' ? 'red' : 'blue'))
    .opacity(0.5)
    .stroke('black')
    .strokeWidth(0.5)
    .addTransform(new TranslationProducer(m => (m.gender === 'm' ? 50 : 0), 0));

  const fred = { id: 1, height: 72, weight: 205, gender: 'm' };
  const barney = { id: 2, height: 69, weight: 215, gender: 'm' };
  const wilma = { id: 3, height: 61, weight: 130, gender: 'f' };
  const betty = { id: 4, height: 63, weight: 105, gender: 'f' };

  circles.update([fred, barney]);

  setTimeout(() => {
    circles.update([wilma, betty]);
  }, 500);

  setTimeout(() => {
    circles.update([fred, barney, wilma, betty]);
  }, 1000);
}

function createDefaults() {
  const svg = createSvgElement(
    'svg',
    { viewBox: '0 0 100 100' },
    results.defaults
  );
  const group = createSvgElement('g', { ignored: null }, svg);
  const circles = new Circles(group, model => model.id);
  circles.update([{ id: 1, x: 10, y: 10 }, { id: 2, x: 90, y: 10 }]);
}

createBasic();
createDefaults();

storiesOf('Circles', module)
  .add('defaults', () => results.defaults)
  .add('basic construction', () => results.basic);
