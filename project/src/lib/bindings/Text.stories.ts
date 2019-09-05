import { storiesOf } from '@storybook/html';
import {
  Lines,
  Text,
  createResizableDiv,
  createResponsiveSvg,
  createSvgElement,
} from '../../svg-bindings';

export const results: any = {};
results.defaults = createResizableDiv();
results.basic = createResizableDiv(100, 200, 200, 300, 300, 400);
results.textAnchor = createResizableDiv(100, 200, 200, 300, 300, 400);
results.alignmentBaseline = createResizableDiv(100, 200, 200, 300, 300, 400);

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

function createTextAnchor() {
  const svg = createResponsiveSvg(results.textAnchor);
  const fixedX = 50;

  createSvgElement('line', svg, {
    x1: '' + fixedX,
    y1: '0',
    x2: '' + fixedX,
    y2: '100',
    stroke: 'grey',
  });

  const anchorModels = [
    { id: 1, anchor: 'start' },
    { id: 2, anchor: 'middle' },
    { id: 3, anchor: 'end' },
  ];

  const text = new Text(svg, model => model.id);
  text
    .x(fixedX)
    .y(m => m.id * 30)
    .textAnchor(m => m.anchor)
    .stroke('none')
    .fill('black')
    .fontSize('16px')
    .text(m => m.anchor);

  text.update(anchorModels);
}

function createAlignmentBaseline() {
  const gap = 40;

  const alignmentModels = [
    { id: 1, alignment: 'baseline' },
    { id: 2, alignment: 'middle' },
    { id: 3, alignment: 'text-top' },
    { id: 4, alignment: 'hanging' },
    { id: 5, alignment: 'top' },
    { id: 6, alignment: 'bottom' },
    { id: 7, alignment: 'central' },
  ];

  const svg = createResponsiveSvg(results.alignmentBaseline, {
    x: 0,
    y: 0,
    width: 130,
    height: gap * (alignmentModels.length + 1),
  });

  const yProducer = (m: any) => m.id * gap;

  const lines = new Lines(svg, model => model.id);
  lines
    .x1(0)
    .y1(yProducer)
    .x2(130)
    .y2(yProducer);

  const text = new Text(svg, model => model.id);
  text
    .x(10)
    .y(yProducer)
    .alignmentBaseline(m => m.alignment)
    .stroke('none')
    .fill('black')
    .fontSize('16px')
    .text(m => m.alignment + ' AaGg');

  lines.update(alignmentModels);
  text.update(alignmentModels);
}

createBasic();
createDefaults();
createTextAnchor();
createAlignmentBaseline();

storiesOf('Text', module)
  .add('defaults', () => results.defaults)
  .add('basic construction', () => results.basic)
  .add('text anchor', () => results.textAnchor)
  .add('alignment of baseline', () => results.alignmentBaseline);
