import { useState } from 'react';
import { Button } from 'antd';
import { Digit, ProSelect } from '@/components/Form';
import { attrBasicSelectOptionsAry } from '../variables';
import ProForm, { ProFormText } from '@ant-design/pro-form';

const mapping = {
  head: '头部',
  body: '身体',
  waist: '腰部',
  wrist: '手腕',
};
export default ({ code, index }: { code: EquipmentType; index: number }) => {
  const prefix = mapping[code];

  const [dynamicAttrs, setDynamicAttrs] = useState([]);
  return (
    <ProForm.Group>
      <ProSelect
        name={['equipment', index, 'head1']}
        options={attrBasicSelectOptionsAry}
        label={`${prefix}属性1`}
      />

      <Digit name={['equipment', index, 'head1Val']} label={`${prefix}属性1加值`} />
      <ProSelect
        name={['equipment', index, 'head2']}
        options={attrBasicSelectOptionsAry}
        label={`${prefix}属性2`}
      />
      <Digit name={['equipment', index, 'head2Val']} label={`${prefix}属性2加值`} />

      {dynamicAttrs.map((o, i) => {
        return (
          <>
            <ProSelect
              key={`equipmentHeadSlotItem${i + 1}`}
              name={['equipment', index, `headSlotItem${i + 1}`]}
              options={attrBasicSelectOptionsAry}
              label={`${prefix}饰品属性${i + 1}`}
            />
            <Digit
              key={`equipmentHeadSlotItem${i + 1}Val`}
              name={['equipment', index, `headSlotItem${i + 1}Val`]}
              label={`${prefix}饰品属性${i + 1}加值`}
            />
          </>
        );
      })}

      <Button
        onClick={() => {
          setDynamicAttrs((ps) => {
            return ps.concat([{}]);
          });
        }}
      >
        添加饰品属性
      </Button>
      <Button
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
      <ProFormText hidden name={['equipments', index, 'pos']} />
    </ProForm.Group>
  );
};
