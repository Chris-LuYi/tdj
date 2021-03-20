// @ts-ignore
/* eslint-disable */
declare const RARITY: '凡' | '卓' | '级' | '绝';
declare const JOB: '咒师' | '御风' | '侠客' | '铁卫' | '祝由';
declare const ELEMENT: '火' | '雷' | '冰' | '光' | '暗';

declare const CHARACTER_ATTRIBUTE:
  | 'hp'
  | 'physicalAttack'
  | 'physicalDefense'
  | 'magicAttack'
  | 'magicDefense'
  | 'critical';

declare const DAMAGE_TYPE:
  | 'attackDamage'
  | 'skillDamage'
  | 'outerDamage'
  | 'counterDamage'
  | 'aoeDamage'
  | 'fixedDamage';

declare const EQUIPMENT_TYPE: 'head' | 'body' | 'waist' | 'wrist';

declare namespace TDJ {
  type Skill = {
    id?: number;
    name?: string;
  };

  type Weapon = {
    id?: number;
    level?: number;
    attributeBonus?: Attribute;
    otherBonus?: DamageModifier[];
  };

  type Equipment = {
    id?: number;
    type: EQUIPMENT_TYPE;
    attributeBonus: Attribute;
    level: ?number;
    slot: ?EquipmentSlotItem;
  };

  type EquipmentSlotItem = {
    id?: number;
    modifiers: AttributeModifier[];
    rarity?: RARITY;
  };

  type CharacterEquipment = {
    equipments: Equipment[];
    additionalBonus: any;
  };

  type CalculationCondition = {
    id?: number;
    isMatched?: boolean;
  };

  interface ValueModifier {
    increase?: boolean = true;
    value?: number;
    percentage?: boolean = true;
    condition?: CalculationCondition[];
  }

  type DamageModifier = {
    type: ?DAMAGE_TYPE;
  } & ValueModifier;

  type AttributeModifier = {
    type: ?CHARACTER_ATTRIBUTE;
  } & ValueModifier;

  type Attribute = {
    hp?: number;
    physicalAttack?: number;
    physicalDefense?: number;
    magicAttack?: number;
    magicDefense?: number;
    critical?: number;
  };

  type Character = {
    id?: number;
    job?: JOB;
    rarity?: RARITY;
    element?: ELEMENT;
    name?: string;
    avatar?: string;
    level?: number;
    exp?: number;
    talent?: string;
    talentModifiers?: ValueModifier[];
    skills?: Skill[];
    rawAttribute?: Attribute;
    weapon?: Weapon;

    equipped?: CharacterEquipment;
  };
}
