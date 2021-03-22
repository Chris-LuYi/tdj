import { useEffect, useState } from 'react';
import { Card, Form } from 'antd';
import ProForm, { ProFormText, ProFormCheckbox, ProFormRadio } from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { Digit, InputNumber, ProSelect } from '@/components/Form';
import {
  attrBasicSelectOptionsAry,
  attrBasicSelectOptions,
  attrSelectOptions,
  attrWeaponSelectOptionsAry,
  attrWeaponSetSelectOptions,
  buffCheckboxGroup,
  formationRadioGroup,
  attrSoulStoneSelectOptionsAry,
} from './variables';
import Equipment from './Component/Equipment';
import Wunei from './Component/Wunei';
import PanelAttrField from './Component/PanelAttrField';
import styles from './index.less';

console.log(attrWeaponSetSelectOptions);
const EditTableInput = () => {
  return <InputNumber min={0} max={1000} />;
};
// const
type DataSourceType = {
  id: React.Key;
  type?: string;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  children?: DataSourceType[];
};

const columns: ProColumns<DataSourceType>[] = [
  {
    title: '类别',
    dataIndex: 'type',
    key: 'type',
    width: '7%',
    valueType: 'text',
    renderFormItem: (schema, config) => {
      return config.record?.type;
    },
  },
  {
    title: '固定词条1',
    key: 'fixModifier1',
    dataIndex: 'fixModifier1',
    valueType: 'select',
    valueEnum: attrBasicSelectOptions,
    width: '7%',
  },
  {
    title: '固定词条1加值',
    key: 'fixModifier1Val',
    dataIndex: 'fixModifier1Val',
    renderFormItem: EditTableInput,
    width: '7%',
  },
  {
    title: '固定词条2',
    key: 'fixModifier2',
    dataIndex: 'fixModifier2',
    valueType: 'select',
    valueEnum: attrBasicSelectOptions,
    width: '7%',
  },
  {
    title: '固定词条2加值',
    key: 'fixModifier2Val',
    dataIndex: 'fixModifier2Val',
    renderFormItem: EditTableInput,
    width: '7%',
  },
  {
    title: '随机词条1',
    key: 'dynModifier1',
    dataIndex: 'dynModifier1',
    valueType: 'select',
    valueEnum: attrSelectOptions,
    width: '7%',
  },
  {
    title: '随机词条1加值(%)',
    key: 'dynModifier1Val',
    dataIndex: 'dynModifier1Val',
    renderFormItem: EditTableInput,
    width: '7%',
  },
  {
    title: '随机词条2',
    key: 'dynModifier2',
    dataIndex: 'dynModifier2',
    valueType: 'select',
    valueEnum: attrSelectOptions,
    width: '7%',
  },
  {
    title: '随机词条2加值(%)',
    key: 'dynModifier2Val',
    dataIndex: 'dynModifier2Val',
    renderFormItem: EditTableInput,
    width: '7%',
  },
  {
    title: '随机词条3',
    key: 'dynModifier3',
    dataIndex: 'dynModifier3',
    valueType: 'select',
    valueEnum: attrSelectOptions,
    width: '7%',
  },
  {
    title: '随机词条3加值(%)',
    key: 'dynModifier3Val',
    dataIndex: 'dynModifier3Val',
    renderFormItem: EditTableInput,
    width: '7%',
  },
  {
    title: '随机词条4',
    key: 'dynModifier4',
    dataIndex: 'dynModifier4',
    valueType: 'select',
    valueEnum: attrSelectOptions,
    width: '7%',
  },
  {
    title: '随机词条4加值(%)',
    key: 'dynModifier4Val',
    dataIndex: 'dynModifier4Val ',
    renderFormItem: EditTableInput,
    width: '7%',
  },
];

const equipments: EquipmentType[] = ['head', 'body', 'waist', 'wrist'];

export default ({ form }: { form: any }) => {
  return (
    <Card>
      <h3>基本数据</h3>
      <ProForm.Group>
        <ProFormText name="name" label="名字" required />
        <ProFormText name="id" label="ID" required hidden />
      </ProForm.Group>
      <h3>最终面板数值</h3>
      <ProForm.Group>
        <PanelAttrField code="hp" />
        <PanelAttrField code="patk" />
        <PanelAttrField code="pdef" />
        <PanelAttrField code="matk" />
        <PanelAttrField code="mdef" />
        <PanelAttrField code="critical" />
      </ProForm.Group>
      <h3>最终战斗数值</h3>
      <ProForm.Group>
        <Digit placeholder="自动计算" name={['attrBattle', 'hp']} label="气血" disabled />
        <Digit placeholder="自动计算" name={['attrBattle', 'patk']} label="物攻" disabled />
        <Digit placeholder="自动计算" name={['attrBattle', 'pdef']} label="物防" disabled />
        <Digit placeholder="自动计算" name={['attrBattle', 'matk']} label="法攻" disabled />
        <Digit placeholder="自动计算" name={['attrBattle', 'mdef']} label="法防" disabled />
        <Digit placeholder="自动计算" name={['attrBattle', 'critical']} label="会心" disabled />
      </ProForm.Group>
      <h3>基础属性</h3>
      <ProForm.Group>
        <Digit placeholder="自动计算" name={['attrRaw', 'hp']} label="气血" disabled />
        <Digit placeholder="自动计算" name={['attrRaw', 'patk']} label="物攻" disabled />
        <Digit placeholder="自动计算" name={['attrRaw', 'pdef']} label="物防" disabled />
        <Digit placeholder="自动计算" name={['attrRaw', 'matk']} label="法攻" disabled />
        <Digit placeholder="自动计算" name={['attrRaw', 'mdef']} label="法防" disabled />
        <Digit placeholder="自动计算" name={['attrRaw', 'critical']} label="会心" disabled />
      </ProForm.Group>
      <h3>兵刃练度</h3>
      <ProForm.Group>
        <Digit name={['weapon', 'attrBonus', 'hp']} label="气血" />
        <Digit name={['weapon', 'attrBonus', 'patk']} label="物攻" />
        <Digit name={['weapon', 'attrBonus', 'matk']} label="法攻" />
        <ProSelect
          name={['weapon', 'otherBonus', 0, 'type']}
          options={attrWeaponSelectOptionsAry}
          label={`特性加成1`}
        />

        <Digit name={['weapon', 'otherBonus', 0, 'value']} label={`特性加成1加值(%)`} />
      </ProForm.Group>
      <h3>魂石</h3>
      <ProForm.Item name="soulStones" trigger="onValuesChange">
        <EditableProTable<DataSourceType>
          rowKey="id"
          toolBarRender={false}
          columns={columns}
          maxLength={3}
          editable={{
            type: 'multiple',
            editableKeys: [1, 2, 3],
          }}
        />
      </ProForm.Item>
      <ProForm.Group>
        <ProSelect
          name={['soulStoneSet', 0, 'types']}
          options={attrBasicSelectOptionsAry}
          label="两枚效果"
        />
        <Digit name={['soulStoneSet', 0, 'value']} label="两枚效果加值(%)" />
        <ProSelect
          name={['soulStoneSet', 1, 'types']}
          options={attrSoulStoneSelectOptionsAry}
          label="三枚效果"
        />
        <Digit name={['soulStoneSet', 1, 'value']} label="三枚效果加值(%)" />
      </ProForm.Group>
      <h3>及身</h3>
      {equipments.map((o, i) => {
        return <Equipment key={o} code={o} index={i} form={form} />;
      })}
      <ProForm.Group>
        <ProSelect
          name={['equipped', 'setBonus', 0, 'types']}
          options={attrBasicSelectOptionsAry}
          label="四件+3效果"
          mode="multiple"
          disabled
        />
        <Digit name={['equipped', 'setBonus', 0, 'value']} label="四件+3效果加值(%)" />
        <ProSelect
          name={['equipped', 'setBonus', 1, 'types']}
          options={attrBasicSelectOptionsAry}
          label="四件+6效果"
          mode="multiple"
          disabled
        />
        <Digit name={['equipped', 'setBonus', 1, 'value']} label="四件+6效果加值(%)" />

        <ProSelect
          name={['equipped', 'setBonus', 2, 'types']}
          options={attrWeaponSetSelectOptions}
          label="四件+9效果"
          mode="multiple"
          maxTagCount={1}
        />
        <Digit name={['equipped', 'setBonus', 2, 'value']} label="四件+9效果加值(%)" />
      </ProForm.Group>
      <h3>五内</h3>
      <Wunei form={form} />
      <h3>列星 - 天魂之力</h3>
      <ProForm.Group>
        <ProSelect
          name={['astrolabe', 'percentage', 0, 'types']}
          options={attrBasicSelectOptionsAry}
          label={`星盘物防属性`}
          mode="multiple"
          readonly
        />
        <Digit name={['astrolabe', 'percentage', 0, 'value']} label={`百分比加值(%)`} />

        <ProSelect
          name={['astrolabe', 'percentage', 1, 'types']}
          options={attrBasicSelectOptionsAry}
          label={`星盘法防属性`}
          mode="multiple"
          readonly
        />
        <Digit name={['astrolabe', 'percentage', 1, 'value']} label={`百分比加值(%)`} />

        <ProSelect
          name={['astrolabe', 'percentage', 2, 'types']}
          options={attrBasicSelectOptionsAry}
          label={`星盘物攻/法攻属性`}
          mode="multiple"
          readonly
        />
        <Digit name={['astrolabe', 'percentage', 2, 'value']} label={`百分比加值(%)`} />

        <ProSelect
          name={['astrolabe', 'percentage', 3, 'types']}
          options={attrBasicSelectOptionsAry}
          label={`星盘气血属性`}
          mode="multiple"
          readonly
        />
        <Digit name={['astrolabe', 'percentage', 3, 'value']} label={`百分比加值(%)`} />
      </ProForm.Group>
      <h3>BUFF</h3>
      <ProForm.Group>
        <ProFormCheckbox.Group name="battleBuffs" options={buffCheckboxGroup} />
      </ProForm.Group>

      <h3>阵型</h3>
      <ProForm.Group>
        <ProFormRadio.Group name="formation" options={formationRadioGroup} />
      </ProForm.Group>
    </Card>
  );
};
