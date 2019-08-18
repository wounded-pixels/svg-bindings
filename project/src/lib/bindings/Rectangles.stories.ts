import { storiesOf } from '@storybook/html';
import {
  Rectangles,
  TranslationProducer,
  createResizableDiv,
  createResponsiveSvg,
} from '../../svg-bindings';

const data = [{ id: 1, x: 10, y: 10 }, { id: 2, x: 20, y: 20 }];

export const results: any = {};
results.rounded = createResizableDiv();
results.basic = createResizableDiv();

function createBasic() {
  const svg = createResponsiveSvg(results.basic, {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
  });

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
}

function createRounded() {
  const svg = createResponsiveSvg(results.rounded, {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
  });

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
}

createBasic();
createRounded();

storiesOf('Rectangles', module)
  .add('basic', () => results.basic)
  .add('rounded', () => results.rounded);
