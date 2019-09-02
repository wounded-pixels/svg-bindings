import {
  KeyFunction,
  BooleanProducer,
  NumberProducer,
  StringProducer,
  TextAnchorProducer,
} from './Types';

import {
  Bindings,
  produceBoolean,
  produceString,
  updateAttribute,
} from './Bindings';
import { createSvgElement } from '../util/svg-element';

export class Text extends Bindings {
  private xProducer: NumberProducer = 0;
  private yProducer: NumberProducer = 0;
  private textValueProducer: StringProducer = '';
  private fontSizeProducer?: StringProducer;
  private fontFamilyProducer?: StringProducer;
  private isBoldProducer: BooleanProducer = false;
  private textAnchorProducer?: TextAnchorProducer;

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

  text(textProducer: StringProducer) {
    this.textValueProducer = textProducer;
    return this;
  }

  fontSize(sizeProducer: StringProducer) {
    this.fontSizeProducer = sizeProducer;
    return this;
  }

  fontFamily(familyProducer: StringProducer) {
    this.fontFamilyProducer = familyProducer;
    return this;
  }

  bold(boldProducer: BooleanProducer) {
    this.isBoldProducer = boldProducer;
    return this;
  }

  /**
   * controls the horizontal alignment of the text
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor
   */
  textAnchor(textAnchorProducer: TextAnchorProducer) {
    this.textAnchorProducer = textAnchorProducer;
    return this;
  }

  protected createView(model: any) {
    const text = createSvgElement('text', this.parent);
    this.updateView(model, text);
    return text;
  }

  protected updateView(model: any, text: SVGElement) {
    super.updateView(model, text);
    updateAttribute(text, 'x', this.xProducer, model);
    updateAttribute(text, 'y', this.yProducer, model);
    updateAttribute(text, 'font-size', this.fontSizeProducer, model);
    updateAttribute(text, 'font-family', this.fontFamilyProducer, model);
    updateAttribute(text, 'text-anchor', this.textAnchorProducer, model);

    const fontWeightValue = produceBoolean(this.isBoldProducer, model)
      ? 'bold'
      : 'normal';
    text.setAttribute('font-weight', fontWeightValue);

    text.innerHTML = produceString(this.textValueProducer, model);
  }
}
