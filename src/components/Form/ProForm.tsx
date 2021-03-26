import OrgProForm from '@ant-design/pro-form';
import type { ProFormProps } from '@ant-design/pro-form/lib/layouts/ProForm';
// import type { GroupProps } from '@ant-design/pro-form/lib/interface';
import { Form } from 'antd';

function ProForm(props: ProFormProps) {
  return <OrgProForm {...props} />;
}

type GroupComponentProps = React.ComponentProps<typeof OrgProForm.Group>;

const FormGroup = (props: GroupComponentProps) => {
  return <OrgProForm.Group size={16} {...props} />;
};
ProForm.useForm = Form.useForm;
ProForm.Group = FormGroup;
ProForm.Item = Form.Item;

export { ProForm };
