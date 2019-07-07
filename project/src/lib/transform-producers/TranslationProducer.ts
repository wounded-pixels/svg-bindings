import { NumberProducer } from '../bindings/Types';
import { TransformProducer } from './TransformProducer';
import { produceNumber } from '../bindings/Bindings';

export class TranslationProducer implements TransformProducer {
  private readonly xProducer: NumberProducer;
  private readonly yProducer: NumberProducer;

  constructor(xProducer: NumberProducer, yProducer: NumberProducer) {
    this.xProducer = xProducer;
    this.yProducer = yProducer;
  }

  getTransform(model: any): string {
    const xValue = produceNumber(this.xProducer, model);
    const yValue = produceNumber(this.yProducer, model);

    return `translate(${xValue}, ${yValue})`;
  }
}
