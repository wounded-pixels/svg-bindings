import { KeyFunction, NumberProducer } from './Types';
import { Bindings, produceNumber, updateAttribute } from './Bindings';

export class Rectangles extends Bindings {
  private xProducer?: NumberProducer;
  private yProducer?: NumberProducer;
  private widthProducer?: NumberProducer;
  private heightProducer?: NumberProducer;
  private xRadiusProducer?: NumberProducer;
  private yRadiusProducer?: NumberProducer;
  private centerProducers: NumberProducer[] = [];

  constructor(parent: SVGElement, keyFunction: KeyFunction) {
    super(parent, keyFunction);
  }

  x(xProducer: NumberProducer) {
    this.xProducer = xProducer;
    return this;
  }

  y(yProducer: NumberProducer) {
    this.yProducer = yProducer;
    return this;
  }

  center(...centerProducers: NumberProducer[]) {
    this.centerProducers = centerProducers;
    return this;
  }

  width(widthProducer: NumberProducer) {
    this.widthProducer = widthProducer;
    return this;
  }

  height(heightProducer: NumberProducer) {
    this.heightProducer = heightProducer;
    return this;
  }

  xRadius(xRadiusProducer: NumberProducer) {
    this.xRadiusProducer = xRadiusProducer;
    return this;
  }

  yRadius(yRadiusProducer: NumberProducer) {
    this.yRadiusProducer = yRadiusProducer;
    return this;
  }

  createView(model: any) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.updateView(model, rect);

    return this.parent.appendChild(rect);
  }

  protected updateView(model: any, rect: SVGElement) {
    super.updateView(model, rect);

    if (this.centerProducers.length === 0) {
      updateAttribute(rect, 'x', this.xProducer, model);
      updateAttribute(rect, 'y', this.yProducer, model);
      updateAttribute(rect, 'width', this.widthProducer, model);
      updateAttribute(rect, 'height', this.heightProducer, model);
    } else {
      const width =
        this.widthProducer !== undefined
          ? produceNumber(this.widthProducer, model)
          : 0;
      const height =
        this.heightProducer !== undefined
          ? produceNumber(this.heightProducer, model)
          : 0;

      const centerX = produceNumber(this.centerProducers[0], model);
      const centerY = produceNumber(this.centerProducers[1], model);

      const xValue = centerX - width / 2;
      const yValue = centerY - height / 2;

      updateAttribute(rect, 'x', xValue, model);
      updateAttribute(rect, 'y', yValue, model);
      updateAttribute(rect, 'width', width, model);
      updateAttribute(rect, 'height', height, model);
    }

    updateAttribute(rect, 'rx', this.xRadiusProducer, model);
    updateAttribute(rect, 'ry', this.yRadiusProducer, model);
  }
}
