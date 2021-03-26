import { InputNumber } from 'antd';

export default (props: any) => {
  return <InputNumber placeholder="请选择" precision={2} width="xs" {...props} />;
};
