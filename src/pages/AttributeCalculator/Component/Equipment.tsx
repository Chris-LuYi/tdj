import React from 'react';
import { Button, Form } from 'antd';
import { ProForm, ProInput, ProNumber, ProSelect } from '@/components/Form';
import { attrBasicSelectOptionsAry } from '@/utils/helper';
import type { FormInstance } from 'antd/es/form';
import { useModel } from 'umi';

const mapping = {
  head: '头部',
  body: '身体',
  waist: '腰部',
  wrist: '手腕',
};
export default ({ code, index }: { code: EquipmentType; index: number; form: FormInstance }) => {
  const prefix = mapping[code];
  const { showDetail } = useModel('ac');

  return (
    <>
      <div style={{ display: showDetail ? 'inherit' : 'none' }}>
        <ProForm.Group>
          <ProSelect
            name={['equipped', 'equipments', index, 'attrBonus', 0, 'type']}
            options={attrBasicSelectOptionsAry}
            label={`${prefix}属性1`}
          />

          <ProNumber
            name={['equipped', 'equipments', index, 'attrBonus', 0, 'value']}
            label={`${prefix}属性1加值`}
          />
          <ProSelect
            name={['equipped', 'equipments', index, 'attrBonus', 1, 'type']}
            options={attrBasicSelectOptionsAry}
            label={`${prefix}属性2`}
          />
          <ProNumber
            name={['equipped', 'equipments', index, 'attrBonus', 1, 'value']}
            label={`${prefix}属性2加值`}
          />

          <ProInput
            name={['equipped', 'equipments', index, 'type']}
            label={`${prefix}部位`}
            hidden
          />
        </ProForm.Group>
      </div>

      <Form.List name={['equipped', 'equipments', index, 'slot', 'modifiers']}>
        {(fields, { add, remove }) => {
          return (
            <ProForm.Group>
              {fields.map((field, i) => {
                return (
                  <React.Fragment key={i}>
                    <ProSelect
                      name={[i, 'type']}
                      options={attrBasicSelectOptionsAry}
                      label={`${prefix}饰品属性${i + 1}`}
                    />
                    <ProNumber name={[i, 'value']} label={`${prefix}饰品属性${i + 1}加值(%)`} />
                  </React.Fragment>
                );
              })}
              <Form.Item label="操作">
                <Button
                  key="add"
                  onClick={() => {
                    add({
                      value: 0,
                      type: 'hp',
                    });
                  }}
                  style={{ marginRight: 8 }}
                >
                  添加饰品属性
                </Button>
                <Button
                  key="remove"
                  disabled={fields.length < 1}
                  onClick={() => {
                    remove([fields.length - 1]);
                  }}
                  danger
                >
                  删除上一个
                </Button>
              </Form.Item>
            </ProForm.Group>
          );
        }}
      </Form.List>
    </>
  );
};
