import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Form, message } from 'antd';
import { useModel } from 'umi';
import ProForm from '@ant-design/pro-form';
import { Select } from '@/components/Form';

import Basic from './Basic';
import Summary from './Summary';

export default (props: any): React.ReactNode => {
  // const intl = useIntl();
  const { myCharacters, current, saveCurrent } = useModel('ac');
  const [currentTab, setCurrentTab] = useState('info');

  const [form] = Form.useForm();
  const [tempCurrent, setTempCurrent] = useState();

  const sharedProps = {
    form,
  };
  const content = {
    base: <Basic {...sharedProps} />,
    info: <Summary {...sharedProps} />,
  };
  useEffect(() => {
    // console.log('form changed', current);
    // form.setFieldsValue(current);
    form.resetFields();
  }, [current, form]);

  const submitForm = () => {
    // console.log(form.getFieldsValue());
    form.submit();
  };
  return (
    <ProForm<{
      name: string;
      company: string;
    }>
      form={form}
      submitter={{
        render: () => {
          // console.log(props);
          return [
            <Button key="submit" type="primary" onClick={submitForm}>
              提交
            </Button>,
            <Button key="reset" onClick={() => props.form?.resetFields()}>
              重置
            </Button>,
          ];
        },
      }}
      initialValues={current}
      onFinish={async (values) => {
        // await sleep(2000);
        message.success('保存成功');

        // localStorage.setItem('chacaterStaus', JSON.stringify(values));
        saveCurrent(values);
        props.history.push(`/ac?id=${tempCurrent}`);
      }}
      // onValuesChange={(changeValues) => console.log(changeValues)}
    >
      <PageContainer
        // content="欢迎使用 ProLayout 组件"
        tabActiveKey={currentTab}
        onTabChange={(k) => {
          setCurrentTab(k);
        }}
        tabList={[
          {
            tab: '基本信息',
            key: 'base',
          },
          {
            tab: '详细信息',
            key: 'info',
          },
        ]}
        extra={[
          <Select
            key="4"
            value={current.id}
            options={myCharacters.map((o: any) => ({
              value: o.id,
              label: o.name,
            }))}
            onChange={async (v) => {
              // console.log(form.resetFields() form.isFieldsTouched());
              if (form.isFieldsTouched()) {
                await submitForm();
                setTempCurrent(v);
              } else {
                props.history.push(`/ac?id=${v}`);
              }
            }}
          />,
          <Button type="primary" key="3">
            添加人物
          </Button>,
          <Button danger key="2">
            删除人物
          </Button>,
        ]}
        // footer={[
        //   <Button key="rest">重置</Button>,
        //   // <Button key="submit" type="primary">
        //   //   提交
        //   // </Button>,
        // ]}
      >
        {content[currentTab]}
      </PageContainer>
    </ProForm>
  );
};
