import { Bindings, updateAttribute } from './Bindings';
import { KeyFunction, NumberArrayProducer } from './Types';

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
    const polyline = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'polyline'
    );
    this.updateView(model, polyline);

    return this.parent.appendChild(polyline);
  }

  protected updateView(model: any, polyline: SVGElement) {
    super.updateView(model, polyline);
    updateAttribute(polyline, 'points', this.pointsProducer, model);
  }
}
