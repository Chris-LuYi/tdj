import React from 'react';
import { Button, Form } from 'antd';
import { ProNumber, ProSelect } from '@/components/Form';
import { attrBasicSelectOptionsAry } from '@/utils/helper';
import ProForm from '@ant-design/pro-form';

export default () => {
  return (
    <Form.List name={['talentModifiers']}>
      {(fields, { add, remove }) => {
        return (
          <ProForm.Group>
            {fields.map((field, i) => {
              return (
                <React.Fragment key={i}>
                  <ProSelect
                    name={[i, 'types']}
                    options={attrBasicSelectOptionsAry}
                    label={`天赋百分比${i + 1}加值`}
                    mode="multiple"
                  />
                  <ProNumber name={[i, 'value']} label={`天赋百分比${i + 1}加值(%)`} />
                </React.Fragment>
              );
            })}
            <Form.Item label="操作">
              <Button
                key="add"
                onClick={() => {
                  add({
                    types: ['hp'],
                    value: 0,
                  });
                }}
                style={{ marginRight: 8 }}
              >
                添加天赋属性
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
  );
};
