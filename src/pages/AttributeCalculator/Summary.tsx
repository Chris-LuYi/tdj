import { useState } from 'react';
import { Card } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { Digit, InputNumber, ProSelect } from '@/components/Form';
import { attrBasicSelectOptionsAry, attrBasicSelectOptions, attrSelectOptions } from './variables';
import Equipment from './Component/Equipment';

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
    title: '随机词条1加值',
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
    title: '随机词条2加值',
    key: 'dynModifier2Val',
    dataIndex: 'dynModifier2Val',
    renderFormItem: EditTableInput,
    width: '7%',
  },
  {
    title: '随机词条3',
    key: 'dynModifier3',
    dataIndex: 'modifier3',
    valueType: 'select',
    valueEnum: attrSelectOptions,
    width: '7%',
  },
  {
    title: '随机词条3加值',
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
    title: '随机词条4加值',
    key: 'dynModifier4Val',
    dataIndex: 'dynModifier4Val ',
    renderFormItem: EditTableInput,
    width: '7%',
  },
];

const equipments: EquipmentType[] = ['head', 'body', 'waist', 'wrist'];

export default ({ form }: { form: any }) => {
  const [editableKeys] = useState<React.Key[]>(() => {
    return form.getFieldValue('soulStones').map((item: any) => item.id);
  });
  // console.log();

  return (
    <Card>
      <h3>基本数据</h3>
      <ProForm.Group>
        <ProFormText name="name" label="名字" required />
        <ProFormText name="id" label="ID" required hidden />
      </ProForm.Group>
      <h3>最终面板数值</h3>
      <ProForm.Group>
        <Digit name={['attrFinal', 'hp']} label="气血" />
        <Digit name={['attrFinal', 'patk']} label="物攻" />
        <Digit name={['attrFinal', 'pdef']} label="物防" />
        <Digit name={['attrFinal', 'matk']} label="法攻" />
        <Digit name={['attrFinal', 'mdef']} label="法防" />
        <Digit name={['attrFinal', 'critical']} label="会心" />
      </ProForm.Group>
      <h3>基础属性</h3>
      <ProForm.Group>
        <Digit name={['attrRaw', 'hp']} label="气血" disabled />
        <Digit name={['attrRaw', 'patk']} label="物攻" disabled />
        <Digit name={['attrRaw', 'pdef']} label="物防" disabled />
        <Digit name={['attrRaw', 'matk']} label="法攻" disabled />
        <Digit name={['attrRaw', 'mdef']} label="法防" disabled />
        <Digit name={['attrRaw', 'critical']} label="会心" disabled />
      </ProForm.Group>
      <h3>兵刃练度</h3>
      <ProForm.Group>
        <Digit name={['weapon', 'attrBonus', 'hp']} label="气血" />
        <Digit name={['weapon', 'attrBonus', 'patk']} label="物攻" />
        <Digit name={['weapon', 'attrBonus', 'matk']} label="法攻" />
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
            editableKeys,
          }}
        />
      </ProForm.Item>
      <ProForm.Group>
        <ProSelect name="soulStone2Effect" options={attrBasicSelectOptionsAry} label="两枚效果" />
        <Digit name="soulStone2EffectVal" label="两枚效果加值" />
        <ProSelect name="soulStone3Effect" options={attrBasicSelectOptionsAry} label="三枚效果" />
        <Digit name="soulStone3EffectVal" label="三枚效果加值" />
      </ProForm.Group>
      <h3>及身</h3>
      {equipments.map((o, i) => {
        return <Equipment key={o} code={o} index={i} />;
      })}
    </Card>
  );
};
