export const ATTRIBUTES: {
  value: SlotItemAttribute;
  label: string;
  category: 'basic' | 'dynamic';
}[] = [
  {
    value: 'hp',
    label: '气血',
    category: 'basic',
  },
  {
    value: 'patk',
    label: '物攻',
    category: 'basic',
  },
  {
    value: 'pdef',
    label: '物防',
    category: 'basic',
  },
  {
    value: 'pdmg',
    label: '物理伤害',
    category: 'dynamic',
  },
  {
    value: 'ppnt',
    label: '物理穿透',
    category: 'dynamic',
  },
  {
    value: 'pprf',
    label: '物理免伤',
    category: 'dynamic',
  },
  {
    value: 'matk',
    label: '法攻',
    category: 'basic',
  },
  {
    value: 'mdef',
    label: '法防',
    category: 'basic',
  },
  {
    value: 'mdmg',
    label: '法术伤害',
    category: 'dynamic',
  },
  {
    value: 'mpnt',
    label: '法术穿透',
    category: 'dynamic',
  },
  {
    value: 'mprf',
    label: '法术免伤',
    category: 'dynamic',
  },
  {
    value: 'ctprf',
    label: '暴击抗性',
    category: 'dynamic',
  },
];
