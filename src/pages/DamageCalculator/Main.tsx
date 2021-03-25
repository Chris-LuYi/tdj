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
} from '@/utils/helper';
import styles from './index.less';
import { useModel } from 'umi';

export default ({ form }: { form: any }) => {
  const { myCharacters } = useModel('ac');
  console.log(myCharacters);

  return (
    <Card>
      <h3>基本数据</h3>
      <ProForm.Group>
        <ProFormText name="name" label="名字" required />
        <ProFormText name="id" label="ID" required hidden />
      </ProForm.Group>
      <h3>进攻方</h3>
      <ProForm.Group>
        <ProSelect
          options={myCharacters.map((o) => ({ value: o.id, label: o.name }))}
          name="attackerId"
          labelFie
          label="角色"
          required
        />
      </ProForm.Group>
      <h3>防御方</h3>
    </Card>
  );
};
