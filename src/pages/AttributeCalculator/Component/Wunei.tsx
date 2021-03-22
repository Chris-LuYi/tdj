import React, { useState } from 'react';
import { Button, Form } from 'antd';
import { Digit, ProSelect } from '@/components/Form';
import { attrBasicSelectOptionsAry } from '../variables';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import type { FormInstance } from 'antd/es/form';
import styles from '../index.less';

export default () => {
  return (
    <Form.List
      name={['wunei', 'fixed']}
      // rules={[
      //   {
      //     validator: async (_, names) => {
      //       if (!names || names.length < 2) {
      //         return Promise.reject(new Error('At least 2 passengers'));
      //       }
      //     },
      //   },
      // ]}
    >
      {(fields, { add, remove, ...a }, b) => {
        console.log(fields, a, b);
        return (
          <ProForm.Group>
            <Digit name={['wunei', 'percentage', 'value']} label={`五内百分比加值`} />

            {fields.map((field, i) => {
              return (
                <>
                  <ProSelect
                    name={[i, 'type']}
                    options={attrBasicSelectOptionsAry}
                    label={`五内节点固定加值${i + 1}`}
                  />
                  <Digit name={[i, 'value']} label={`五内节点固定加值${i + 1}加值(%)`} />
                </>
              );
            })}
            <Form.Item label="操作">
              <Button
                key="add"
                onClick={() => {
                  add({
                    type: 'hp',
                    value: 0,
                  });
                }}
                style={{ marginRight: 8 }}
              >
                添加五内节点属性
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
            <ProFormText name={['wunei', 'percentage', 'types']} label="五内百分比" hidden />
          </ProForm.Group>
        );
      }}
    </Form.List>
  );
};
