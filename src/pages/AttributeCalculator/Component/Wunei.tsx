import React from 'react';
import { Button, Form } from 'antd';
import { Digit, ProSelect } from '@/components/Form';
import { attrBasicSelectOptionsAry } from '@/utils/helper';
import ProForm, { ProFormText } from '@ant-design/pro-form';

export default () => {
  return (
    <Form.List name={['wunei', 'fixed']}>
      {(fields, { add, remove }) => {
        return (
          <ProForm.Group>
            <Digit name={['wunei', 'percentage', 'value']} label={`五内百分比加值`} />

            {fields.map((field, i) => {
              return (
                <React.Fragment key={i}>
                  <ProSelect
                    name={[i, 'type']}
                    options={attrBasicSelectOptionsAry}
                    label={`五内节点固定加值${i + 1}`}
                  />
                  <Digit name={[i, 'value']} label={`五内节点固定加值${i + 1}加值(%)`} />
                </React.Fragment>
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
