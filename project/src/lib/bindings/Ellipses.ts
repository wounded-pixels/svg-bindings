import { KeyFunction, NumberProducer, StringProducer } from './Types';
import { Bindings, updateAttribute } from './Bindings';

export class Ellipses extends Bindings {
  private cxProducer?: NumberProducer;
  private cyProducer?: NumberProducer;
  private rxProducer?: NumberProducer;
  private ryProducer?: NumberProducer;

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

  rx(rxProducer: NumberProducer) {
    this.rxProducer = rxProducer;
    return this;
  }

  ry(ryProducer: NumberProducer) {
    this.ryProducer = ryProducer;
    return this;
  }

  protected createView(model: any) {
    const ellipse = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'ellipse'
    );
    this.updateView(model, ellipse);

    return this.parent.appendChild(ellipse);
  }

  protected updateView(model: any, ellipse: SVGElement) {
    super.updateView(model, ellipse);
    updateAttribute(ellipse, 'cx', this.cxProducer, model);
    updateAttribute(ellipse, 'cy', this.cyProducer, model);
    updateAttribute(ellipse, 'rx', this.rxProducer, model);
    updateAttribute(ellipse, 'ry', this.ryProducer, model);
  }
}
