import { storiesOf } from '@storybook/html';
import {
  Polylines,
  createResizableDiv,
  createResponsiveSvg,
} from '../../svg-bindings';

export const results: any = {};
results.basic = createResizableDiv();

function createBasic() {
  const svg = createResponsiveSvg(results.basic);

  const points = [10, 10, 20, 50, 30, 10];
  const models = [
    {
      id: 1,
      points,
    },
  ];

  const polylines = new Polylines(svg, m => m.id)
    .opacity(0.5)
    .stroke('black')
    .strokeWidth(0.5)
    .fill('none')
    .points(m => m.points);

  polylines.update(models);
}

createBasic();

storiesOf('Polylines', module).add('basic', () => results.basic);
