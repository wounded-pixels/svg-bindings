import { storiesOf } from '@storybook/html';
import {
  Paths,
  createResizableDiv,
  createResponsiveSvg,
} from '../../svg-bindings';

export const results: any = {};
results.basic = createResizableDiv();

function createBasic() {
  const svg = createResponsiveSvg(results.basic);

  const models = [
    {
      id: 1,
      path:
        'M25 25 L75 25 L75 75 L25 75 L25 25 M40 40 L40 60 L60 60 L60 40 L40 40',
    },
  ];

  const paths = new Paths(svg, m => m.id)
    .opacity(0.5)
    .stroke('black')
    .strokeWidth(0.5)
    .fill('blue')
    .d(m => m.path);

  paths.update(models);
}

createBasic();

storiesOf('Paths', module).add('basic', () => results.basic);
