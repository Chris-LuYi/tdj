import React, { useState } from 'react';
import { Button, Form } from 'antd';
import { Digit, ProSelect } from '@/components/Form';
import { attrBasicSelectOptionsAry } from '../variables';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import type { FormInstance } from 'antd/es/form';

const mapping = {
  head: '头部',
  body: '身体',
  waist: '腰部',
  wrist: '手腕',
};
export default ({
  code,
  index,
  form,
}: {
  code: EquipmentType;
  index: number;
  form: FormInstance;
}) => {
  const prefix = mapping[code];

  const [dynamicAttrs, setDynamicAttrs] = useState(
    form.getFieldValue(['equipped', 'equipments', index, 'slot', 'modifiers']) || [],
  );
  return (
    <ProForm.Group>
      <ProSelect
        name={['equipped', 'equipments', index, 'attrBonus', 0, 'type']}
        options={attrBasicSelectOptionsAry}
        label={`${prefix}属性1`}
      />

      <Digit
        name={['equipped', 'equipments', index, 'attrBonus', 0, 'value']}
        label={`${prefix}属性1加值`}
      />
      <ProSelect
        name={['equipped', 'equipments', index, 'attrBonus', 1, 'type']}
        options={attrBasicSelectOptionsAry}
        label={`${prefix}属性2`}
      />
      <Digit
        name={['equipped', 'equipments', index, 'attrBonus', 1, 'value']}
        label={`${prefix}属性2加值`}
      />

      {dynamicAttrs.map((o, i) => {
        return (
          <React.Fragment key={i}>
            <ProSelect
              name={['equipped', 'equipments', index, 'slot', 'modifiers', i, 'type']}
              options={attrBasicSelectOptionsAry}
              label={`${prefix}饰品属性${i + 1}`}
            />
            <Digit
              name={['equipped', 'equipments', index, 'slot', 'modifiers', i, 'value']}
              label={`${prefix}饰品属性${i + 1}加值(%)`}
            />
          </React.Fragment>
        );
      })}

      <Form.Item label="操作">
        <Button
          key="add"
          onClick={() => {
            setDynamicAttrs((ps) => {
              return ps.concat([{}]);
            });
          }}
          style={{ marginRight: 8 }}
        >
          添加饰品属性
        </Button>
        <Button
          key="remove"
          disabled={dynamicAttrs.length < 1}
          onClick={() => {
            setDynamicAttrs((ps) => {
              return ps.splice(0, ps.length - 1);
            });
          }}
          danger
        >
          删除上一个
        </Button>
      </Form.Item>
      <ProFormText
        name={['equipped', 'equipments', index, 'type']}
        label={`${prefix}部位`}
        hidden
      />
    </ProForm.Group>
  );
};
