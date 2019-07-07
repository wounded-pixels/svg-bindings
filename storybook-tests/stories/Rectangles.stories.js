import { document } from 'global';
import { storiesOf } from '@storybook/html';
import {
  Rectangles,
  TranslationProducer,
} from '../../project/dist/svg-bindings';

const data = [{ id: 1, x: 10, y: 10 }, { id: 2, x: 20, y: 20 }];

storiesOf('Rectangles', module)
  .add('basic construction', () => {
    const parentDiv = document.createElement('div');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');

    const rectangles = new Rectangles(svg, model => model.id);
    rectangles
      .x(m => m.x)
      .y(m => m.y)
      .width(2)
      .height(4)
      .fill('blue')
      .opacity(0.5)
      .stroke('black')
      .strokeWidth(0.5)
      .addTransform(new TranslationProducer(0, 0));
    rectangles.update(data);

    const centered = new Rectangles(svg, model => model.id);
    centered
      .center(m => m.x, m => m.y)
      .width(2)
      .height(4)
      .fill('red')
      .opacity(0.5)
      .stroke('black')
      .strokeWidth(0.5);
    centered.update(data);

    parentDiv.appendChild(svg);

    return parentDiv;
  })
  .add('rounded corners', () => {
    const parentDiv = document.createElement('div');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');

    const rectangles = new Rectangles(svg, model => model.id);
    rectangles
      .x(m => m.x)
      .y(m => m.y)
      .width(10)
      .height(20)
      .fill('blue')
      .opacity(0.5)
      .stroke('black')
      .strokeWidth(0.5)
      .xRadius(2)
      .yRadius(2);
    rectangles.update(data);

    parentDiv.appendChild(svg);

    return parentDiv;
  });
