import { Bindings, updateAttribute } from './Bindings';
import { KeyFunction, StringProducer } from './Types';

export class Paths extends Bindings {
  dProducer?: StringProducer;

  constructor(parent: SVGElement, keyFunction: KeyFunction) {
    super(parent, keyFunction);
  }

  d(dProducer: StringProducer) {
    this.dProducer = dProducer;
    return this;
  }

  protected createView(model: any) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.updateView(model, path);

    return this.parent.appendChild(path);
  }

  protected updateView(model: any, path: SVGElement) {
    super.updateView(model, path);
    updateAttribute(path, 'd', this.dProducer, model);
  }
}
