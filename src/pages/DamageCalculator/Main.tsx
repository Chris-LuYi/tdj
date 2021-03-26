import { useEffect, useState } from 'react';
import { Card, Form } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import {
  ProForm,
  ProInput,
  ProFormCheckbox,
  ProFormRadio,
  ProNumber,
  InputNumber,
  ProSelect,
} from '@/components/Form';
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

export default () => {
  const { myCharacters } = useModel('ac');
  console.log(myCharacters);

  return (
    <Card>
      <h3>基本数据</h3>
      <ProForm.Group>
        <ProInput name="name" label="名字" required />
        <ProInput name="id" label="ID" required hidden />
      </ProForm.Group>
      <h3>战斗双方</h3>
      <ProForm.Group>
        <ProSelect
          options={myCharacters.map((o) => ({ value: o.id, label: o.name }))}
          name="attackerId"
          label="进攻方角色"
          required
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProSelect
          options={myCharacters.map((o) => ({ value: o.id, label: o.name }))}
          name="defenderId"
          label="防御方角色"
          required
        />
      </ProForm.Group>
    </Card>
  );
};
