export type KeyFunction = (model: any) => string;

export type NumberFunction = (model: any) => number;
export type NumberProducer = NumberFunction | number;

export type StringFunction = (model: any) => string;
export type StringProducer = StringFunction | string;

export type TextAnchor = 'start' | 'middle' | 'end';
export type TextAnchorFunction = (model: any) => TextAnchor;
export type TextAnchorProducer = TextAnchorFunction | TextAnchor;

export type NumberArrayFunction = (model: any) => number[];
export type NumberArrayProducer = NumberArrayFunction | number[];

export type BooleanFunction = (model: any) => boolean;
export type BooleanProducer = BooleanFunction | boolean;
