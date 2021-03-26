import React from 'react';
import { Button, Form } from 'antd';
import { ProForm, ProInput, ProNumber, ProSelect } from '@/components/Form';
import { attrBasicSelectOptionsAry } from '@/utils/helper';
import { useModel } from 'umi';

export default () => {
  const { showDetail } = useModel('ac');
  return (
    <>
      <ProForm.Group>
        <ProNumber name={['wunei', 'percentage', 'value']} label={`五内百分比加值`} />
        <ProInput name={['wunei', 'percentage', 'types']} label="五内百分比" hidden />
      </ProForm.Group>
      <div style={{ display: showDetail ? 'inherit' : 'none' }}>
        <Form.List name={['wunei', 'fixed']}>
          {(fields, { add, remove }) => {
            return (
              <ProForm.Group>
                {fields.map((field, i) => {
                  return (
                    <React.Fragment key={i}>
                      <ProSelect
                        name={[i, 'type']}
                        options={attrBasicSelectOptionsAry}
                        label={`五内节点${i + 1}固定加值`}
                      />
                      <ProNumber name={[i, 'value']} label={`五内节点${i + 1}固定加值(%)`} />
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
              </ProForm.Group>
            );
          }}
        </Form.List>
      </div>
    </>
  );
};
