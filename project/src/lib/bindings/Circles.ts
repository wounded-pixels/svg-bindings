import { KeyFunction, NumberProducer } from './Types';
import { Bindings, updateAttribute } from './Bindings';
import { createSvgElement } from '../util/svg-element';

export class Circles extends Bindings {
  private cxProducer?: NumberProducer;
  private cyProducer?: NumberProducer;
  private rProducer: NumberProducer = 3;

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

  protected createView(model: any) {
    const circle = createSvgElement('circle', this.parent);
    this.updateView(model, circle);
    return circle;
  }

  protected updateView(model: any, circle: SVGElement) {
    super.updateView(model, circle);
    updateAttribute(circle, 'cx', this.cxProducer, model);
    updateAttribute(circle, 'cy', this.cyProducer, model);
    updateAttribute(circle, 'r', this.rProducer, model);
  }
}
