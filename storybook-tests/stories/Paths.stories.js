import { document } from 'global';
import { storiesOf } from '@storybook/html';
import { Paths } from '../../project/dist/svg-bindings';

storiesOf('Paths', module).add('basic construction', () => {
  const parentDiv = document.createElement('div');

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');

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
  parentDiv.appendChild(svg);

  return parentDiv;
});
