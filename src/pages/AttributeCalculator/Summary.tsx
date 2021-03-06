import { useEffect, useState } from 'react';
import { Card, Form } from 'antd';
import { Anchor } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import {
  ProInput,
  ProForm,
  ProCheckbox,
  ProRadio,
  ProNumber,
  InputNumber,
  ProSelect,
} from '@/components';
import {
  attrBasicSelectOptionsAry,
  attrBasicSelectOptions,
  attrSelectOptions,
  attrWeaponSelectOptionsAry,
  attrWeaponSetSelectOptions,
  buffCheckboxGroup,
  formationRadioGroup,
  attrSoulStoneSelectOptionsAry,
} from '@/utils/helper';
import Equipment from './Component/Equipment';
import Wunei from './Component/Wunei';
import PanelAttrField from './Component/PanelAttrField';
import Talent from './Component/Talent';
import { useModel } from 'umi';
import styles from './index.less';
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
    width: '3%',
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
    renderFormItem: InputNumber,
    width: '8%',
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
    renderFormItem: InputNumber,
    width: '8%',
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
    renderFormItem: InputNumber,
    width: '8%',
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
    renderFormItem: InputNumber,
    width: '8%',
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
    renderFormItem: InputNumber,
    width: '8%',
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
    renderFormItem: InputNumber,
    width: '8%',
  },
];

const equipments: EquipmentType[] = ['head', 'body', 'waist', 'wrist'];

export default ({ form }: { form: any }) => {
  const { showDetail } = useModel('ac');

  const sharedProps = {
    formItemProps: {
      className: 'c-field',
      noStyle: true,
    },
    placeholder: '自动计算',
    readonly: true,
  };
  return (
    <Card>
      <h3>基本数据</h3>
      <ProForm.Group>
        <ProInput name="name" label="名字" required />
        <ProInput name="id" label="ID" required hidden />
      </ProForm.Group>
      <div className={styles.battleStatusPanel}>
        <Anchor affix={true} offsetTop={GLOBAL_CONFIG.headerHeight} onClick={() => {}}>
          <div className={'ac-content'}>
            <h3>最终战斗数值</h3>
            <ProForm.Group>
              <div>
                气血 <ProNumber {...sharedProps} name={['attrBattle', 'hp']} />
              </div>
              <div>
                物攻 <ProNumber {...sharedProps} name={['attrBattle', 'patk']} />
              </div>
              <div>
                物防 <ProNumber {...sharedProps} name={['attrBattle', 'pdef']} />
              </div>
              <div>
                法攻 <ProNumber {...sharedProps} name={['attrBattle', 'matk']} />
              </div>
              <div>
                法防 <ProNumber {...sharedProps} name={['attrBattle', 'mdef']} />
              </div>
              <div>
                会心 <ProNumber {...sharedProps} name={['attrBattle', 'critical']} />
              </div>
            </ProForm.Group>
          </div>
        </Anchor>
      </div>
      <h3>最终面板数值</h3>
      <ProForm.Group>
        <PanelAttrField code="hp" />
        <PanelAttrField code="patk" />
        <PanelAttrField code="pdef" />
        <PanelAttrField code="matk" />
        <PanelAttrField code="mdef" />
        <PanelAttrField code="critical" />
      </ProForm.Group>

      <div style={{ display: showDetail ? 'inherit' : 'none' }}>
        <h3>基础属性</h3>
        <ProForm.Group>
          <ProNumber placeholder="自动计算" name={['attrRaw', 'hp']} label="气血" disabled />
          <ProNumber placeholder="自动计算" name={['attrRaw', 'patk']} label="物攻" disabled />
          <ProNumber placeholder="自动计算" name={['attrRaw', 'pdef']} label="物防" disabled />
          <ProNumber placeholder="自动计算" name={['attrRaw', 'matk']} label="法攻" disabled />
          <ProNumber placeholder="自动计算" name={['attrRaw', 'mdef']} label="法防" disabled />
          <ProNumber placeholder="自动计算" name={['attrRaw', 'critical']} label="会心" disabled />
        </ProForm.Group>
      </div>
      <h3>兵刃练度</h3>
      <div style={{ display: showDetail ? 'inherit' : 'none' }}>
        <ProForm.Group>
          <ProNumber name={['weapon', 'attrBonus', 'hp']} label="气血" />
          <ProNumber name={['weapon', 'attrBonus', 'patk']} label="物攻" />
          <ProNumber name={['weapon', 'attrBonus', 'matk']} label="法攻" />
        </ProForm.Group>
      </div>
      <ProForm.Group>
        <ProSelect
          name={['weapon', 'otherBonus', 0, 'type']}
          options={attrWeaponSelectOptionsAry}
          label={`特性加成1`}
        />

        <ProNumber name={['weapon', 'otherBonus', 0, 'value']} label={`特性加成1加值(%)`} />
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
        <ProNumber name={['soulStoneSet', 0, 'value']} label="两枚效果加值(%)" />
        <ProSelect
          name={['soulStoneSet', 1, 'types']}
          options={attrSoulStoneSelectOptionsAry}
          label="三枚效果"
        />
        <ProNumber name={['soulStoneSet', 1, 'value']} label="三枚效果加值(%)" />
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
        <ProNumber name={['equipped', 'setBonus', 0, 'value']} label="四件+3效果加值(%)" />
        <ProSelect
          name={['equipped', 'setBonus', 1, 'types']}
          options={attrBasicSelectOptionsAry}
          label="四件+6效果"
          mode="multiple"
          disabled
        />
        <ProNumber name={['equipped', 'setBonus', 1, 'value']} label="四件+6效果加值(%)" />

        <ProSelect
          name={['equipped', 'setBonus', 2, 'types']}
          options={attrWeaponSetSelectOptions}
          label="四件+9效果"
          mode="multiple"
          maxTagCount={1}
        />
        <ProNumber name={['equipped', 'setBonus', 2, 'value']} label="四件+9效果加值(%)" />
      </ProForm.Group>
      <h3>五内</h3>
      <Wunei />
      <h3>列星 - 天魂之力</h3>
      <ProForm.Group>
        <ProSelect
          name={['astrolabe', 'percentage', 0, 'types']}
          options={attrBasicSelectOptionsAry}
          label={`星盘物防属性`}
          mode="multiple"
          readonly
        />
        <ProNumber name={['astrolabe', 'percentage', 0, 'value']} label={`百分比加值(%)`} />

        <ProSelect
          name={['astrolabe', 'percentage', 1, 'types']}
          options={attrBasicSelectOptionsAry}
          label={`星盘法防属性`}
          mode="multiple"
          readonly
        />
        <ProNumber name={['astrolabe', 'percentage', 1, 'value']} label={`百分比加值(%)`} />

        <ProSelect
          name={['astrolabe', 'percentage', 2, 'types']}
          options={attrBasicSelectOptionsAry}
          label={`星盘物攻/法攻属性`}
          mode="multiple"
          readonly
        />
        <ProNumber name={['astrolabe', 'percentage', 2, 'value']} label={`百分比加值(%)`} />

        <ProSelect
          name={['astrolabe', 'percentage', 3, 'types']}
          options={attrBasicSelectOptionsAry}
          label={`星盘气血属性`}
          mode="multiple"
          readonly
        />
        <ProNumber name={['astrolabe', 'percentage', 3, 'value']} label={`百分比加值(%)`} />
      </ProForm.Group>
      <h3>角色天赋百分比加成</h3>
      <Talent />
      <h3>BUFF</h3>
      <ProForm.Group>
        <ProCheckbox.Group name="battleBuffs" options={buffCheckboxGroup} />
      </ProForm.Group>

      <h3>阵型</h3>
      <ProForm.Group>
        <ProRadio.Group name="formation" options={formationRadioGroup} />
      </ProForm.Group>
    </Card>
  );
};
