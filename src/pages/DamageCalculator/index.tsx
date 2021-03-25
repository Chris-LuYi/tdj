import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Form, message, Popconfirm } from 'antd';
import { useModel } from 'umi';
import ProForm from '@ant-design/pro-form';
import { Select } from '@/components/Form';
import { calculateAttribute, calculateFinalAttribute } from '@/utils/helper';

import Main from './Main';

export default (props: any): React.ReactNode => {
  // const intl = useIntl();
  const { myCombats, addCombat, deleteCombat, current, saveCurrent } = useModel('cc');

  const [form] = Form.useForm();
  const [tempCurrent, setTempCurrent] = useState();

  useEffect(() => {
    console.log('form changed', current);
    // form.setFieldsValue(current);
    form.resetFields();
  }, [current, form]);

  const submitForm = () => {
    // console.log(form.getFieldsValue());
    form.submit();
  };
  return (
    <ProForm<TDJ.Combat>
      form={form}
      submitter={{
        render: () => {
          // console.log(props);
          return [
            <Button key="submit" type="primary" onClick={submitForm}>
              保存
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
        if (tempCurrent) props.history.push(`/dc?id=${tempCurrent}`);
      }}
      onValuesChange={(changedValues: any, values: TDJ.Combat) => {
        console.log(changedValues, values);
        // values.attrRaw.hp = values.attrFinal.hp - values.weapon?.attrBonus.hp;
        // // console.log(values.attrRaw.hp);
        // form.setFieldsValue(
        //   calculateAttribute(values, {
        //     panelValueChanged: !!changedValues.attrFinal,
        //     panelFixedValueChange: !!changedValues.attrFinalFixed,
        //     soulStoneChanged: !!changedValues.soulStones,
        //   }),
        // );
        console.log(changedValues);
      }}
    >
      <PageContainer
        // content="欢迎使用 ProLayout 组件"

        extra={[
          <Select
            key="4"
            value={current.id}
            options={myCombats.map((o: any) => ({
              value: o.id,
              label: o.name,
            }))}
            onChange={async (v) => {
              // console.log(form.resetFields() form.isFieldsTouched());
              if (form.isFieldsTouched()) {
                await submitForm();
                setTempCurrent(v);
              } else {
                props.history.push(`/dc?id=${v}`);
              }
            }}
          />,
          <Button type="primary" key="3" onClick={addCombat}>
            添加战斗情景
          </Button>,
          <Popconfirm key="2" title="确定要删除这个记录吗，该操作不可逆?" onConfirm={deleteCombat}>
            <Button danger>删除战斗</Button>
          </Popconfirm>,
        ]}
      >
        <Main />
      </PageContainer>
    </ProForm>
  );
};
