import { ProFormDigit } from '@ant-design/pro-form';

export default (props: any) => {
  return <ProFormDigit max={100000} width="sm" {...props} />;
};