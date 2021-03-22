// import type { Character } from '@/services/main/api';

export const characters: TDJ.Character[] = [
  {
    name: '燕明蓉',
    rarity: '绝',
    element: '雷',
    weapon: {
      level: 40,
      attrBonus: {
        hp: 235,
        patk: 216,
      },
    },
    equipped: {
      equipments: [
        {
          attrBonus: {
            hp: 118,
            mdef: 48,
          },
          level: 7,
          type: 'head',
          slot: {
            modifiers: [
              {
                value: 5,
                type: 'hp',
              },
            ],
          },
        },
        {
          attrBonus: {
            hp: 118,
            mdef: 48,
          },
          level: 7,
          type: 'body',
          slot: {
            modifiers: [
              {
                value: 5,
                type: 'hp',
              },
            ],
          },
        },
        {
          attrBonus: {
            hp: 118,
            mdef: 48,
          },
          level: 7,
          type: 'body',
          slot: {
            modifiers: [
              {
                value: 5,
                type: 'pdef',
              },
            ],
          },
        },
      ],
      setBonus: {},
    },
  },
];
