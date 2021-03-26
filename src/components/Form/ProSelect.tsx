import { ProFormSelect } from '@ant-design/pro-form';

export default (props: any) => {
  return (
    <ProFormSelect placeholder="请选择" width="xs" dropdownMatchSelectWidth={false} {...props} />
  );
};
