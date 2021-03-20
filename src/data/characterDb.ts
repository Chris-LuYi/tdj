// import type { Character } from '@/services/main/api';

export const characters: TDJ.Character[] = [
  {
    name: '燕明蓉',
    rarity: '绝',
    element: '雷',
    weapon: {
      level: 40,
      attributeBonus: {
        hp: 235,
        physicalAttack: 216,
      },
    },
    equipped: {
      equipments: [
        {
          attributeBonus: {
            hp: 118,
            magicDefense: 48,
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
          attributeBonus: {
            hp: 118,
            magicDefense: 48,
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
          attributeBonus: {
            hp: 118,
            magicDefense: 48,
          },
          level: 7,
          type: 'body',
          slot: {
            modifiers: [
              {
                value: 5,
                type: 'physicalDefense',
              },
            ],
          },
        },
      ],
      additionalBonus: {},
    },
  },
];
