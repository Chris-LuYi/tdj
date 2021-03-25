// @ts-ignore
/* eslint-disable */
type Rarity = '凡' | '卓' | '级' | '绝';
type Job = '咒师' | '御风' | '侠客' | '铁卫' | '祝由';
type Element = '火' | '雷' | '冰' | '光' | '暗';

type CharacterAttribute = 'hp' | 'patk' | 'pdef' | 'matk' | 'mdef' | 'critical';
type WeaponSpeciality = 'crtrate' | 'cntdmg' | 'alldmg' | 'heal';
type WeaponSetAttribute = 'btdefdmgcut' | 'btdefmdmgcut' | 'btdefpdmgcut' | CharacterAttribute;
type SoulStoneSetAttribute = DamageType | CharacterAttribute;

type SlotItemAttribute =
  | SoulStoneSetAttribute
  | WeaponSpeciality
  | WeaponSetAttribute
  | 'pdmg'
  | 'ppnt'
  | 'mdmg'
  | 'mpnt'
  | 'pprf'
  | 'mprf'
  | 'cprf'
  | 'ctprf'
  | 'btatkdmgenc'
  | 'btcntdmgenc';

type DamageType = 'atkdmg' | 'skldmg' | 'outdmg' | 'cntdmg' | 'aoedmg' | 'fixdmg' | 'crtrate';

type EquipmentType = 'head' | 'body' | 'waist' | 'wrist';

declare namespace TDJ {
  type Skill = {
    id?: number;
    name?: string;
  };

  type Weapon = {
    id?: number;
    level?: number;
    attrBonus: Attribute;
    otherBonus?: DamageModifier[];
  };

  type Equipment = {
    id?: number;
    type: EquipmentType;
    attrBonus: AttributeModifier[];
    level?: number;
    slot?: EquipmentSlotItem;
  };

  type EquipmentSlotItem = {
    id?: number;
    modifiers: AttributeModifier[];
    rarity?: Rarity;
  };

  type CharacterEquipment = {
    equipments: Equipment[];
    setBonus?: MultipleAttributeModifier[];
  };

  type CalculationCondition = {
    id?: number;
    isMatched?: boolean;
  };

  interface ValueModifier {
    increase?: boolean = true;
    value?: number;
    percentage?: boolean = true;
    battle?: boolean = false;
    condition?: CalculationCondition[];
  }

  type DamageModifier = {
    type?: DamageType;
  } & ValueModifier;

  type AttributeModifier = {
    type?: CharacterAttribute;
  } & ValueModifier;

  type MultipleAttributeModifier = {
    types?: WeaponSetAttribute[];
  } & ValueModifier;

  type SoulStoneSetAttributeModifier = {
    types?: SoulStoneSetAttribute[];
  } & ValueModifier;

  type BUFFAttributeModifier = {
    types?: SlotItemAttribute[];
  } & ValueModifier;

  type Attribute = {
    hp?: number;
    patk?: number;
    pdef?: number;
    matk?: number;
    mdef?: number;
    critical?: number;
  };

  type SoulStoneAttribute = {
    id?: number;
    type?: '荒' | '天' | '地';
    fixModifier1?: CharacterAttribute;
    fixModifier1Val?: number;
    fixModifier2?: CharacterAttribute;
    fixModifier2Val?: number;
    dynModifier1?: SlotItemAttribute;
    dynModifier1Val?: number;
    dynModifier2?: SlotItemAttribute;
    dynModifier2Val?: number;
    dynModifier3?: SlotItemAttribute;
    dynModifier3Val?: number;
    dynModifier4?: SlotItemAttribute;
    dynModifier4Val?: number;
  };

  type WuNeiAttribute = {
    percentage?: MultipleAttributeModifier;
    fixed?: AttributeModifier[];
  };
  type AstrolabeAttribute = {
    percentage?: MultipleAttributeModifier[];
  };

  type Character = {
    id?: string;
    job?: Job;
    rarity?: Rarity;
    element?: Element;
    name?: string;
    avatar?: string;
    level?: number;
    exp?: number;
    talent?: string;
    talentModifiers?: BUFFAttributeModifier[];
    skills?: Skill[];
    attrRaw: Attribute;
    attrFinal: Attribute;
    attrFinalFixed: Attribute;
    attrBattle?: Attribute;
    weapon?: Weapon;
    soulStones: SoulStoneAttribute[];
    soulStoneSet: SoulStoneSetAttributeModifier[];
    equipped?: CharacterEquipment;
    wunei?: WuNeiAttribute;
    astrolabe?: AstrolabeAttribute;
    battleBuffs?: number[];
    formation?: number;
  };

  type Combat = {
    id?: string;
    name?: string;
    attackerId: string;
    defenderId: string;
    attacker?: Character;
    defender?: Character;
  };
}
