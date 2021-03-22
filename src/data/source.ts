export const ATTRIBUTES: {
  value: SlotItemAttribute;
  label: string;
  category: 'basic' | 'dynamic' | 'special' | 'weaponset' | 'soulstone';
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
  {
    value: 'critical',
    label: '会心',
    category: 'basic',
  },
  {
    value: 'alldmg',
    label: '伤害',
    category: 'special',
  },
  {
    value: 'crtrate',
    label: '暴击率',
    category: 'special',
  },
  {
    value: 'cntdmg',
    label: '反击伤害',
    category: 'special',
  },
  {
    value: 'heal',
    label: '治疗效果',
    category: 'special',
  },

  {
    value: 'btdefmdmgcut',
    label: '法伤减免（对战防御）',
    category: 'weaponset',
  },
  {
    value: 'btdefpdmgcut',
    label: '物伤减免（对战防御）',
    category: 'weaponset',
  },
  {
    value: 'atkdmg',
    label: '普通攻击（对战中）',
    category: 'soulstone',
  },
];

export const BUFF_SET: {
  value: number;
  modifier: number;
  types: SlotItemAttribute[];
  group: 'shenrui' | 'jiyi';
  name: string;
  order: number;
}[] = [
  {
    value: 1,
    name: '神睿',
    order: 1,
    group: 'shenrui',
    modifier: 20,
    types: ['patk', 'matk'],
  },
  {
    value: 2,
    name: '级意I',
    order: 1,
    group: 'jiyi',
    modifier: 10,
    types: ['patk', 'matk'],
  },
  {
    value: 3,
    name: '级意II',
    order: 2,
    group: 'jiyi',
    modifier: 20,
    types: ['patk', 'matk'],
  },
];

export const FORMATION_SET: {
  value: number;
  modifiers: TDJ.BUFFAttributeModifier[];
  name: string;
}[] = [
  {
    value: 1,
    name: '天烈炽炎阵',
    modifiers: [
      {
        types: ['patk', 'pdef', 'matk', 'mdef'],
        value: 15,
      },
      {
        types: ['btatkdmgenc'],
        value: 10,
      },
    ],
  },
  {
    value: 2,
    name: '天机阵',
    modifiers: [
      {
        types: ['patk', 'pdef', 'matk', 'mdef'],
        value: 15,
      },
      {
        types: ['btatkdmgenc', 'btcntdmgenc'],
        value: 10,
      },
    ],
  },
];
