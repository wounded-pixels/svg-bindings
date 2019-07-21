import { document } from 'global';
import { storiesOf } from '@storybook/html';
import { Circles, TranslationProducer } from '@wounded-pixels/svg-bindings';

storiesOf('Circles', module).add('basic construction', () => {
  const parentDiv = document.createElement('div');

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');

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

  parentDiv.appendChild(svg);

  return parentDiv;
});
