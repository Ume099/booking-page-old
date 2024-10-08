export type ValueType = 'stringValue' | 'arrayValue';

export interface StringValueType {
  stringValue: string;
  valueType: ValueType;
}

export interface ArrayValueType {
  arrayValue: {
    values: StringValueType[];
  };
  valueType: ValueType;
}
