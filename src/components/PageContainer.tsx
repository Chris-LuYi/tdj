import { PageContainer } from '@ant-design/pro-layout';
import { ConfigProvider } from 'antd';

export default (props: any) => {
  return (
    <ConfigProvider componentSize="small">
      <PageContainer {...props} />
    </ConfigProvider>
  );
};
