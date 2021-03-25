import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Form, Input, Divider, Button } from 'antd';
import styles from './index.less';
import DynamicField from './DynamicField';
import ProForm from '@ant-design/pro-form';

export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const [form] = Form.useForm();

  function handleFinish(values) {
    console.log('VALUES', values);
    alert('Check console for values');
  }
  return (
    <PageContainer content="这是一个新页面，从这里进行开发！" className={styles.main}>
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Spin spinning={loading} size="large" />
      </div>
      <ProForm form={form} onFinish={handleFinish}>
        <Form.Item name="first" label="Persistent Field" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Divider dashed>Additional Fields</Divider>
        <DynamicField />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </ProForm>
    </PageContainer>
  );
};
