import { Bindings, updateAttribute } from './Bindings';
import { KeyFunction, StringProducer } from './Types';
import { createSvgElement } from '../util/svg-element';

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
    const path = createSvgElement('path', this.parent);
    this.updateView(model, path);
    return path;
  }

  protected updateView(model: any, path: SVGElement) {
    super.updateView(model, path);
    updateAttribute(path, 'd', this.dProducer, model);
  }
}
