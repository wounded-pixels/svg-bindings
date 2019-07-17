import { Bindings, updateAttribute } from './Bindings';
import { KeyFunction, NumberArrayProducer } from './Types';
import { createSvgElement } from '../util/svg-element';

export class Polylines extends Bindings {
  pointsProducer?: NumberArrayProducer;

  constructor(parent: SVGElement, keyFunction: KeyFunction) {
    super(parent, keyFunction);
  }

  points(pointsProducer: NumberArrayProducer) {
    this.pointsProducer = pointsProducer;
    return this;
  }

  protected createView(model: any) {
    const polyline = createSvgElement('polyline', {}, this.parent);
    this.updateView(model, polyline);
    return polyline;
  }

  protected updateView(model: any, polyline: SVGElement) {
    super.updateView(model, polyline);
    updateAttribute(polyline, 'points', this.pointsProducer, model);
  }
}
