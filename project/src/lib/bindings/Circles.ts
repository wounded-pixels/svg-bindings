import { KeyFunction, NumberProducer, StringProducer } from './Types';
import { Bindings, updateAttribute } from './Bindings';

export class Circles extends Bindings {
  private cxProducer?: NumberProducer;
  private cyProducer?: NumberProducer;
  private rProducer?: NumberProducer;

  constructor(parent: SVGElement, keyFunction: KeyFunction) {
    super(parent, keyFunction);
  }

  cx(cxProducer: NumberProducer) {
    this.cxProducer = cxProducer;
    return this;
  }

  cy(cyProducer: NumberProducer) {
    this.cyProducer = cyProducer;
    return this;
  }

  r(rProducer: NumberProducer) {
    this.rProducer = rProducer;
    return this;
  }

  createView(model: any) {
    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    this.updateView(model, circle);

    return this.parent.appendChild(circle);
  }

  protected updateView(model: any, circle: SVGElement) {
    super.updateView(model, circle);
    updateAttribute(circle, 'cx', this.cxProducer, model);
    updateAttribute(circle, 'cy', this.cyProducer, model);
    updateAttribute(circle, 'r', this.rProducer, model);
  }
}
