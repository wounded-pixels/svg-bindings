import { KeyFunction, NumberProducer, StringProducer } from './Types';
import { TransformProducer } from '../transform-producers/TransformProducer';

/**
 * Returns a string representation of a number for use in an attribute
 * @param producer
 * @param model
 */
export function produceNumber(producer: NumberProducer, model: any): string {
  const value: number =
    typeof producer === 'function' ? producer(model) : producer;
  return '' + value;
}

export function produceString(producer: StringProducer, model: any): string {
  return typeof producer === 'function' ? producer(model) : producer;
}

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
 * Each concrete implementation of Bindings defines the attributes that can be populated from the model objects
 */
export abstract class Bindings {
  protected readonly parent: SVGElement;
  private readonly keyFunction: KeyFunction;
  private readonly viewMap: { [key: string]: SVGElement };

  private fillProducer?: StringProducer;
  private opacityProducer?: NumberProducer;
  private strokeProducer?: StringProducer;
  private strokeWidthProducer?: NumberProducer;
  private transformProducers: TransformProducer[] = [];

  protected constructor(parent: SVGElement, keyFunction: KeyFunction) {
    this.parent = parent;
    this.keyFunction = keyFunction;
    this.viewMap = {};
  }

  update(models: any[]) {
    const leaving = { ...this.viewMap };

    models.forEach(model => {
      const key = this.keyFunction(model);
      delete leaving[key];

      const view = this.viewMap[key];
      if (view) {
        this.updateView(model, view);
      } else {
        this.viewMap[key] = this.createView(model);
      }
    });

    Object.keys(leaving).forEach(key => {
      this.removeView(key);
      delete this.viewMap[key];
    });
  }

  private removeView(key: string) {
    const child = this.viewMap[key];
    child && this.parent.removeChild(child);
  }

  protected abstract createView(model: any): SVGElement;

  protected updateView(model: any, viewElement: SVGElement): void {
    this.fillProducer !== undefined &&
      viewElement.setAttribute('fill', produceString(this.fillProducer, model));
    this.opacityProducer !== undefined &&
      viewElement.setAttribute(
        'opacity',
        produceNumber(this.opacityProducer, model)
      );

    this.strokeProducer !== undefined &&
      viewElement.setAttribute(
        'stroke',
        produceString(this.strokeProducer, model)
      );

    this.strokeWidthProducer !== undefined &&
      viewElement.setAttribute(
        'stroke-width',
        produceNumber(this.strokeWidthProducer, model)
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
  }
}
