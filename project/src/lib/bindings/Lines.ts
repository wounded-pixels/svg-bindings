import { KeyFunction, NumberProducer } from './Types';
import { Bindings, updateAttribute } from './Bindings';

export class Lines extends Bindings {
  private x1Producer?: NumberProducer;
  private y1Producer?: NumberProducer;
  private x2Producer?: NumberProducer;
  private y2Producer?: NumberProducer;

  constructor(parent: SVGElement, keyFunction: KeyFunction) {
    super(parent, keyFunction);
  }

  x1(x1Producer: NumberProducer) {
    this.x1Producer = x1Producer;
    return this;
  }

  y1(y1Producer: NumberProducer) {
    this.y1Producer = y1Producer;
    return this;
  }

  x2(x2Producer: NumberProducer) {
    this.x2Producer = x2Producer;
    return this;
  }

  y2(y2Producer: NumberProducer) {
    this.y2Producer = y2Producer;
    return this;
  }

  protected createView(model: any) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    this.updateView(model, line);

    return this.parent.appendChild(line);
  }

  protected updateView(model: any, line: SVGElement) {
    super.updateView(model, line);
    updateAttribute(line, 'x1', this.x1Producer, model);
    updateAttribute(line, 'y1', this.y1Producer, model);
    updateAttribute(line, 'x2', this.x2Producer, model);
    updateAttribute(line, 'y2', this.y2Producer, model);
  }
}
