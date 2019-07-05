import { KeyFunction, NumberProducer, StringProducer } from './Types';

export class Circles {
  private readonly parent: SVGSVGElement;
  private readonly keyFunction: KeyFunction;
  private readonly viewMap: { [key: string]: Element };
  private cxProducer: NumberProducer = 0;
  private cyProducer: NumberProducer = 0;
  private rProducer: NumberProducer = 0;
  private fillProducer: StringProducer = 'none';
  private strokeProducer: StringProducer = 'none';
  private strokeWidthProducer: NumberProducer = 0;

  constructor(parent: SVGSVGElement, keyFunction: KeyFunction) {
    this.parent = parent;
    this.keyFunction = keyFunction;

    this.viewMap = {};
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

  fill(fillProducer: StringProducer) {
    this.fillProducer = fillProducer;
    return this;
  }

  stroke(strokeProducer: StringProducer) {
    this.strokeProducer = strokeProducer;
    return this;
  }

  strokeWidth(strokeWidthProducer: NumberProducer) {
    this.strokeWidthProducer = strokeWidthProducer;
    return this;
  }

  update(models: any[]) {
    const leaving = { ...this.viewMap };

    models.forEach(model => {
      const key = this.keyFunction(model);
      delete leaving[key];

      const view = this.viewMap[key];
      if (view) {
        this.updateView(model, view);
      } else {
        this.viewMap[key] = this.createView(model);
      }
    });

    Object.keys(leaving).forEach(key => {
      this.removeView(key);
      delete this.viewMap[key];
    });
  }

  private createView(model: any) {
    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    this.updateView(model, circle);

    return this.parent.appendChild(circle);
  }

  private updateView(model: any, circle: Element) {
    circle.setAttribute('cx', Circles.produceNumber(this.cxProducer, model));
    circle.setAttribute('cy', Circles.produceNumber(this.cyProducer, model));
    circle.setAttribute('r', Circles.produceNumber(this.rProducer, model));
    circle.setAttribute(
      'fill',
      Circles.produceString(this.fillProducer, model)
    );
    circle.setAttribute(
      'stroke',
      Circles.produceString(this.strokeProducer, model)
    );
    circle.setAttribute(
      'stroke-width',
      Circles.produceNumber(this.strokeWidthProducer, model)
    );
  }

  private removeView(key: string) {
    const child = this.viewMap[key];
    child && this.parent.removeChild(child);
  }

  private static produceNumber(producer: NumberProducer, model: any): string {
    const value: number =
      typeof producer === 'function' ? producer(model) : producer;
    return '' + value;
  }

  private static produceString(producer: StringProducer, model: any): string {
    return typeof producer === 'function' ? producer(model) : producer;
  }
}
