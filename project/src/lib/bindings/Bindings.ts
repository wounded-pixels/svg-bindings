import {
  BooleanProducer,
  KeyFunction,
  LabeledValueProducer,
  NumberArrayProducer,
  NumberProducer,
  StringProducer,
} from './Types';
import { TransformProducer } from '../transform-producers/TransformProducer';

export function produceNumber(producer: NumberProducer, model: any): number {
  return typeof producer === 'function' ? producer(model) : producer;
}

export function produceString(producer: StringProducer, model: any): string {
  return typeof producer === 'function' ? producer(model) : producer;
}

export function produceBoolean(producer: BooleanProducer, model: any): boolean {
  return typeof producer === 'function' ? producer(model) : producer;
}

export function updateAttribute(
  view: SVGElement,
  attribute: string,
  producer: NumberProducer | NumberArrayProducer | StringProducer | undefined,
  model: any
) {
  if (producer === undefined) {
    return;
  }
  const value: number | number[] | string =
    typeof producer === 'function' ? producer(model) : producer;
  view.setAttribute(attribute, '' + value);
}

const styleTooltip = (tooltip: HTMLElement): void => {
  const style = tooltip.style;
  style.position = 'absolute';
  style.padding = '7px';
  style.borderRadius = '5px';
  style.display = 'none';
};

const useEventType = typeof PointerEvent === 'function' ? 'pointer' : 'mouse';
const motionEventTypes = [
  'click',
  'touchstart',
  'touchend',
  'touchmove',
  `${useEventType}enter`,
  `${useEventType}leave`,
  `${useEventType}move`,
];

/**
 * Abstract class to keep track of bindings between model objects and view objects
 * The client code sets up a binding which describes how to represent model objects with SVGs
 * The client calls update with a list of model objects
 *
 * The Bindings base class takes care of the book keeping
 * - which model objects are new and need an SVG created
 * - which model objects are missing from the updated list and need to have their corresponding SVGs removed
 * - which model objects are still present and should have their corresponding SVGs updated
 *
 * The binding also allows the client code to configure a tooltip
 *
 * Each concrete implementation of Bindings defines the attributes that can be populated from the model objects
 */
export abstract class Bindings {
  protected readonly parent: SVGElement;
  private readonly keyFunction: KeyFunction;
  private readonly viewMap: { [key: string]: SVGElement };
  private readonly modelMap: { [key: string]: any };

  private readonly tooltipElement: HTMLElement;

  private fillProducer: StringProducer = 'grey';
  private opacityProducer?: NumberProducer;
  private strokeProducer: StringProducer = 'black';
  private strokeWidthProducer: NumberProducer = 1;
  private transformProducers: TransformProducer[] = [];
  private tooltipTitleProducer: StringProducer = '';
  private tooltipLabeledValueProducers?: LabeledValueProducer[];
  private tooltipBackgroundColorProducer: StringProducer = '#ebdfbe';

  protected constructor(parent: SVGElement, keyFunction: KeyFunction) {
    this.parent = parent;
    this.keyFunction = keyFunction;
    this.viewMap = {};
    this.modelMap = {};
    this.tooltipElement = document.createElement('div');
    styleTooltip(this.tooltipElement);
  }

  update(models: any[]) {
    const leaving = { ...this.viewMap };

    models.forEach(model => {
      const key = this.keyFunction(model);
      delete leaving[key];

      const view = this.viewMap[key];
      this.modelMap[key] = model;
      if (view) {
        this.updateView(model, view);
      } else {
        const view = this.createView(model);
        this.addTooltipListener(view, key);
        this.viewMap[key] = view;
      }
    });

    Object.keys(leaving).forEach(key => {
      this.removeView(key);
      delete this.modelMap[key];
      delete this.viewMap[key];
    });
  }

  private removeView(key: string) {
    const child = this.viewMap[key];
    child && this.parent.removeChild(child);
  }

  protected abstract createView(model: any): SVGElement;

  protected updateView(model: any, viewElement: SVGElement): void {
    updateAttribute(viewElement, 'fill', this.fillProducer, model);
    updateAttribute(viewElement, 'opacity', this.opacityProducer, model);
    updateAttribute(viewElement, 'stroke', this.strokeProducer, model);
    updateAttribute(
      viewElement,
      'stroke-width',
      this.strokeWidthProducer,
      model
    );

    const transformFragments = this.transformProducers
      .map(producer => producer.getTransform(model))
      .join(' ');
    transformFragments.length > 0 &&
      viewElement.setAttribute('transform', transformFragments);
  }

  fill(fillProducer: StringProducer) {
    this.fillProducer = fillProducer;
    return this;
  }

  opacity(opacityProducer: NumberProducer) {
    this.opacityProducer = opacityProducer;
    return this;
  }

  stroke(strokeProducer: StringProducer) {
    this.strokeProducer = strokeProducer;
    return this;
  }

  strokeWidth(strokeWidthProducer: NumberProducer) {
    this.strokeWidthProducer = strokeWidthProducer;
    return this;
  }

  addTransform(transformProducer: TransformProducer) {
    this.transformProducers.push(transformProducer);
    return this;
  }

  addTooltip(
    tooltipContainer: HTMLElement,
    titleProducer: StringProducer,
    labeledValueProducers: LabeledValueProducer[],
    backgroundColorProducer?: StringProducer
  ) {
    this.tooltipTitleProducer = titleProducer;
    this.tooltipLabeledValueProducers = labeledValueProducers;
    this.tooltipBackgroundColorProducer =
      backgroundColorProducer || this.tooltipBackgroundColorProducer;

    tooltipContainer.appendChild(this.tooltipElement);
  }

  private addTooltipListener(view: SVGElement, key: string) {
    const pointerHandler = (event: any) => {
      if (event.type.includes('leave')) {
        this.tooltipElement.innerHTML = '';
        this.tooltipElement.style.display = 'none';
      } else {
        const model = this.modelMap[key];
        this.populateTooltip(model);
        this.positionTooltip(event);
        this.tooltipElement.style.display = 'block';
      }
    };

    motionEventTypes.map(eventType => {
      view.addEventListener(eventType, pointerHandler);
    });
  }

  private populateTooltip(model: any) {
    const title = produceString(this.tooltipTitleProducer, model);
    const titleDiv = `<div>${title}</div>`;

    const labeledValues = this.tooltipLabeledValueProducers
      ? this.tooltipLabeledValueProducers
          .map(lvp => {
            const label = lvp.label;
            const value = produceString(lvp.valueProducer, model);

            return `<div><span>${label}:</span><span>${value}</span></div>`;
          })
          .join('')
      : '';

    this.tooltipElement.style.backgroundColor = produceString(
      this.tooltipBackgroundColorProducer,
      model
    );
    this.tooltipElement.innerHTML = `<div>${titleDiv}${labeledValues}</div>`;
  }

  private positionTooltip(event: any) {
    const { clientX, clientY } = event;
    this.tooltipElement.style.top = `${clientY + 10}px`;
    this.tooltipElement.style.left = `${clientX + 10}px`;
  }
}
