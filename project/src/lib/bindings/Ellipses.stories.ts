import { storiesOf } from '@storybook/html';
import {
  Ellipses,
  createResizableDiv,
  createResponsiveSvg,
} from '../../svg-bindings';

export const results: any = {};
results.defaults = createResizableDiv();
results.basic = createResizableDiv();

const models = [{ id: 1, x: 25, y: 25 }, { id: 2, x: 25, y: 25 }];

function createBasic() {
  const svg = createResponsiveSvg(results.basic, {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
  });

  const ellipses = new Ellipses(svg, m => m.id);
  ellipses
    .cx(m => m.x)
    .cy(m => m.y)
    .rx(m => (m.id % 2 === 0 ? 10 : 5))
    .ry(m => (m.id % 2 === 1 ? 10 : 5))
    .fill('none')
    .stroke(m => (m.id % 2 === 0 ? 'red' : 'blue'))
    .strokeWidth(0.5)
    .addTooltip(results.basic, 'Ellipse', [
      { label: 'x', valueProducer: m => m.x },
      { label: 'y', valueProducer: m => m.y },
    ]);

  ellipses.update(models);
}

function createDefaults() {
  const svg = createResponsiveSvg(results.defaults);
  const ellipses = new Ellipses(svg, model => model.id)
    .cx(m => m.x)
    .cy(m => m.y);
  ellipses.update([{ id: 1, x: 25, y: 25 }, { id: 2, x: 25, y: 25 }]);
}

createBasic();
createDefaults();

storiesOf('Ellipses', module)
  .add('defaults', () => results.defaults)
  .add('basic construction', () => results.basic);
