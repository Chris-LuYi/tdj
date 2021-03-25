import { ATTRIBUTES, BUFF_SET, FORMATION_SET } from '@/data';
import { CheckboxOptionType } from 'antd/lib/checkbox';
import _ from 'lodash';

export const attrBasicSelectOptionsAry = ATTRIBUTES.filter((o) => o.category === 'basic');
export const attrBasicSelectOptions = _.keyBy(
  attrBasicSelectOptionsAry.map((o) => ({ ...o, text: o.label })),
  'value',
);
export const attrWeaponSelectOptionsAry = ATTRIBUTES.filter((o) => o.category === 'special');
export const attrSoulStoneSelectOptionsAry = ATTRIBUTES.filter((o) => o.category === 'soulstone');

export const attrWeaponSetSelectOptionsAry = ATTRIBUTES.filter((o) => o.category === 'weaponset');
export const attrWeaponSetSelectOptions = attrWeaponSetSelectOptionsAry.map((o) => ({
  ...o,
  text: o.label,
}));

export const buffCheckboxGroup = BUFF_SET.map((o) => {
  return {
    label: o.name,
    value: o.value,
    // style?: React.CSSProperties;
    // disabled?: boolean;
  };
});
export const formationRadioGroup = FORMATION_SET.map((o) => {
  return {
    label: o.name,
    value: o.value,
    // style?: React.CSSProperties;
    // disabled?: boolean;
  };
});

export const attrSelectOptions = _.keyBy(
  ATTRIBUTES.map((o) => ({ ...o, text: o.label })),
  'value',
);

const sumReducer = (accumulator: number | undefined, currentValue: number | undefined) => {
  return (accumulator || 0) + (currentValue || 0);
};

export const calculateFinalAttribute = (data: TDJ.Character) => {
  return data;
};

export const calculateAttribute = (
  data: TDJ.Character,
  {
    panelValueChanged = false,
    soulStoneChanged = false,
    panelFixedValueChange = false,
    combatStatusChange = false,
  },
) => {
  // formula
  // 人物进图前总面板计算方式为
  // {基础数值(等级+星等+武器+及身+五内数值) + [基础数值x(五内百分比+星盘+及身套装百分比)%]} x (1+兽魂百分比)% + 兽魂数值
  if (!data) return data;
  const newData = { ...data };
  attrBasicSelectOptionsAry
    .map((o) => o.value)
    .forEach((attr) => {
      // const attr = 'hp';
      // const attrBasic = 100;
      // const attrBaiscPct = 1.3;
      // const soulStonePct = 1.1;
      // const soulStoneBonus = 20;
      // if (!data.attrFinal) {
      //   newData.attrFinal = {};
      // }
      // if (newData.attrFinal) {
      //   newData.attrFinal[attr] = attrBasic * attrBaiscPct * soulStonePct + soulStoneBonus;
      // }

      // let attrStar;

      const attrWeapon = newData.weapon?.attrBonus[attr] || 0;
      const attrEquipment =
        newData.equipped?.equipments
          ?.map((o) => {
            return (o.attrBonus || [])
              .filter((m) => m.type === attr)
              .map((m) => m.value)
              .reduce(sumReducer, 0);
          })
          .reduce(sumReducer, 0) || 0;

      newData.wunei.fixed = newData.wunei?.fixed?.filter((o) => o.type ?? o.value);
      const attrWunei =
        newData.wunei?.fixed
          ?.filter((o) => o.type === attr)
          .map((o) => o.value)
          .reduce(sumReducer, 0) || 0;

      const attrSoulStone = newData.soulStones
        .map((o) => {
          let v = 0;
          if (o.fixModifier1 && o.fixModifier1 === attr) {
            v += o.fixModifier1Val || 0;
          }
          if (o.fixModifier2 && o.fixModifier2 === attr) {
            v += o.fixModifier2Val || 0;
          }
          return v;
        })
        .reduce(sumReducer);

      // console.log(attrSoulStone);
      // const attrBasic = attrLevelAndStar + attrWeapon + attrEquipment + attrWunei;

      const wuneiPct = newData.wunei?.percentage?.value || 0;
      const astrolabePct =
        (newData.astrolabe?.percentage || [])
          ?.filter((o) => (o.types || [])?.indexOf(attr as CharacterAttribute) >= 0)
          .map((o) => o.value)
          .reduce(sumReducer, 0) || 0;

      const equipmentSetPct =
        (newData.equipped?.setBonus || [])
          .filter((o) => (o.types || []).indexOf(attr as WeaponSetAttribute) >= 0)
          ?.map((o) => {
            return o.value || 0;
          })
          .reduce(sumReducer, 0) || 0;
      // const totalAttrPct = 1.05;
      const totalPanelDataPct = 1 + (astrolabePct + wuneiPct + equipmentSetPct) / 100 || 0;
      // console.log(attr, attrSoulStone);

      // const soulStoneBonus = newData.soulStones.reduce((accumulator, currentValue)=>{
      //   accumulator.push(currentValue.fixModifier1)
      // },[])
      if (!soulStoneChanged && !panelFixedValueChange && !combatStatusChange) {
        if (panelValueChanged) {
          const attrLevelAndStar =
            (newData.attrFinal[attr] || 0) / totalPanelDataPct -
            attrWeapon -
            attrEquipment -
            attrWunei;
          newData.attrRaw[attr] = Math.ceil(attrLevelAndStar);
        } else {
          // console.log(11111111111111, totalPanelDataPct);
          console.log(
            newData.attrRaw[attr],
            attrWeapon,
            attrEquipment,
            attrWunei,
            totalPanelDataPct,
          );
          newData.attrFinal[attr] =
            ((newData.attrRaw[attr] || 0) + attrWeapon + attrEquipment + attrWunei) *
            totalPanelDataPct;

          // newData.attrRaw[attr] = attrLevelAndStar;
        }
      }

      if (!newData.attrFinalFixed) {
        newData.attrFinalFixed = {};
      }
      if (soulStoneChanged) {
        const attrSoulStonePct = newData.soulStones
          .map((o) => {
            let v = 0;
            if (o.dynModifier1 && o.dynModifier1 === attr) {
              v += (o.dynModifier1Val || 0) * newData.attrFinal[attr];
            }
            if (o.dynModifier2 && o.dynModifier2 === attr) {
              v += (o.dynModifier2Val || 0) * newData.attrFinal[attr];
            }
            if (o.dynModifier3 && o.dynModifier3 === attr) {
              v += (o.dynModifier3Val || 0) * newData.attrFinal[attr];
            }
            if (o.dynModifier4 && o.dynModifier4 === attr) {
              v += (o.dynModifier4Val || 0) * newData.attrFinal[attr];
            }
            if (v > 0) v /= 100;
            return v;
          })
          .reduce(sumReducer);
        // console.log(attrSoulStone, attrSoulStonePct);
        newData.attrFinalFixed[attr] = attrSoulStone + attrSoulStonePct;
      }

      if (!newData.attrBattle) {
        newData.attrBattle = {};
      }

      if (panelValueChanged) {
        // console.log(panelValueChanged);
      }

      // 人物进图时面板计算方式为
      // 进图前总面板 x (1+天赋百分比+饰品百分比+兽魂套装百分比+绝学BUFF百分比+阵法百分比)%
      newData.talentModifiers = (newData.talentModifiers || []).filter(
        (o) => o.types?.length ?? o.value,
      );
      const talentPct =
        newData.talentModifiers
          .filter((m) => m.types?.indexOf(attr) >= 0)
          .map((o) => o.value)
          .reduce(sumReducer, 0) || 0;

      const equipmentSlotItemPct =
        (newData.equipped?.equipments || [])
          .map((o) => {
            // console.log(o.slot.modifiers);
            o.slot.modifiers = (o.slot?.modifiers || []).filter((m) => m.type ?? m.value);

            return (
              o.slot?.modifiers
                .filter((m) => m.type === attr)
                .map((m) => m.value)
                .reduce(sumReducer, 0) || 0
            );
          })
          .reduce(sumReducer, 0) || 0;
      const soulStonePct =
        newData.soulStoneSet
          .filter((o) => (o.types || [])?.indexOf(attr as SoulStoneSetAttribute) >= 0)
          .map((o) => o.value)
          .reduce(sumReducer, 0) || 0;
      const skillBuffPct =
        (newData.battleBuffs || [])

          .map((o) => BUFF_SET.find((m) => m.value === o && m.types.indexOf(attr) >= 0)?.modifier)
          .reduce(sumReducer, 0) || 0;
      const formationPct =
        FORMATION_SET.find((o) => o.value === newData.formation)
          ?.modifiers.filter((o) => (o.types || []).indexOf(attr) >= 0)
          .map((o) => o.value)
          .reduce(sumReducer, 0) || 0;
      // console.log(equipmentSlotItemPct);
      let battleTotalPct =
        talentPct + equipmentSlotItemPct + soulStonePct + skillBuffPct + formationPct || 0;
      if (battleTotalPct > 0) battleTotalPct /= 100;
      // console.log(battleTotalPct, formationPct);
      newData.attrBattle[attr] =
        (newData.attrFinal[attr] + newData.attrFinalFixed[attr]) * (1 + battleTotalPct);
      // console.log(newData.attrBattle);
    });

  return newData;
  // //console.log(newData);
  // return newData;
};

export const calculateDamage = (
  {
    attacker,
    defender,
  }: {
    attacker: TDJ.Character;
    defender: TDJ.Character;
  },

  {},
) => {
  return (attacker?.attrBattle?.matk || 0) - (defender?.attrBattle?.mdef || 0);
};
