import { ATTRIBUTES } from '@/data';
import _ from 'lodash';

export const attrBasicSelectOptionsAry = ATTRIBUTES.filter((o) => o.category === 'basic');
export const attrBasicSelectOptions = _.keyBy(
  attrBasicSelectOptionsAry.map((o) => ({ ...o, text: o.label })),
  'value',
);

export const attrSelectOptions = _.keyBy(
  ATTRIBUTES.map((o) => ({ ...o, text: o.label })),
  'value',
);
