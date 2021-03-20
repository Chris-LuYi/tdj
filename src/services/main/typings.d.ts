// @ts-ignore
/* eslint-disable */
type RARITY = '凡' | '卓' | '级' | '绝';
type JOB = '咒师' | '御风' | '侠客' | '铁卫' | '祝由';
type ELEMENT = '火' | '雷' | '冰' | '光' | '暗';

type CHARACTER_ATTRIBUTE =
  | 'hp'
  | 'physicalAttack'
  | 'physicalDefense'
  | 'magicAttack'
  | 'magicDefense'
  | 'critical';

type DAMAGE_TYPE =
  | 'attackDamage'
  | 'skillDamage'
  | 'outerDamage'
  | 'counterDamage'
  | 'aoeDamage'
  | 'fixedDamage';

type EQUIPMENT_TYPE = 'head' | 'body' | 'waist' | 'wrist';

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
