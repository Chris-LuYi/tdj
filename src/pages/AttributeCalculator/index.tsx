import React, { useState, useEffect } from 'react';
import { Button, Form, message, Popconfirm } from 'antd';
import { useModel } from 'umi';
import ProForm from '@ant-design/pro-form';
import { PageContainer, Select } from '@/components';
import type { FormInstance } from 'antd/es/form';
import { calculateAttribute, calculateFinalAttribute } from '@/utils/helper';
import Basic from './Basic';
import Summary from './Summary';
import styles from './index.less';

export default (props: any): React.ReactNode => {
  // const intl = useIntl();
  const { myCharacters, addCharacter, deleteCharacter, current, saveCurrent } = useModel('ac');
  const [currentTab, setCurrentTab] = useState('info');

  const [form] = Form.useForm();
  const [tempCurrent, setTempCurrent] = useState();

  const sharedProps: {
    form: FormInstance;
  } = {
    form,
  };
  console.log(form);
  const content = {
    base: <Basic {...sharedProps} />,
    info: <Summary {...sharedProps} />,
  };
  useEffect(() => {
    console.log('form changed', current);
    // form.setFieldsValue(current);
    form.resetFields();
  }, [current, form]);

  const submitForm = () => {
    // console.log(form.getFieldsValue());
    form.submit();
  };
  console.log(form.getFieldsValue(), current);
  return (
    <ProForm<TDJ.Character>
      form={form}
      className={styles.root}
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
        if (tempCurrent) props.history.push(`/ac?id=${tempCurrent}`);
      }}
      onValuesChange={(changedValues: TDJ.Character, values: TDJ.Character) => {
        console.log(changedValues, values);
        // values.attrRaw.hp = values.attrFinal.hp - values.weapon?.attrBonus.hp;
        // console.log(values.attrRaw.hp);
        form.setFieldsValue(
          calculateAttribute(values, {
            panelValueChanged: !!changedValues.attrFinal,
            panelFixedValueChange: !!changedValues.attrFinalFixed,
            soulStoneChanged: !!changedValues.soulStones,
            combatStatusChange:
              !!changedValues.talentModifiers ||
              !!changedValues.battleBuffs ||
              !!changedValues.formation,
          }),
        );
      }}
    >
      <PageContainer
        // content="欢迎使用 ProLayout 组件"
        // tabActiveKey={currentTab}
        onTabChange={(k) => {
          setCurrentTab(k);
        }}
        // tabList={[
        //   {
        //     tab: '基本信息',
        //     key: 'base',
        //   },
        //   {
        //     tab: '详细信息',
        //     key: 'info',
        //   },
        // ]}
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
          <Button type="primary" key="3" onClick={addCharacter}>
            添加人物
          </Button>,
          <Popconfirm
            key="2"
            title="确定要删除这个角色吗，该操作不可逆?"
            onConfirm={deleteCharacter}
          >
            <Button danger>删除人物</Button>
          </Popconfirm>,
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
