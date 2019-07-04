export type KeyFunction = (model: any) => string;

export type NumberFunction = (model: any) => number;
export type NumberProducer = NumberFunction | number;

export type StringFunction = (model: any) => string;
export type StringProducer = StringFunction | string;
