import { Form } from 'antd';
import { ProNumber } from '@/components/Form';
import styles from '../index.less';
import { attrBasicSelectOptions } from '@/utils/helper';

export default ({ code }: { code: CharacterAttribute }) => {
  return (
    <Form.Item label={attrBasicSelectOptions[code].label} className={styles.green}>
      <ProNumber name={['attrFinal', code]} noStyle />
      <div className="connect">+</div>
      <ProNumber name={['attrFinalFixed', code]} noStyle />
      <div className="connect">=</div>
      <Form.Item
        dependencies={[
          ['attrFinal', code],
          ['attrFinalFixed', code],
        ]}
        noStyle
      >
        {(f) => (
          <ProNumber
            disabled
            placeholder="自动计算"
            fieldProps={{
              value:
                f.getFieldValue(['attrFinal', code]) + f.getFieldValue(['attrFinalFixed', code]),
            }}
          />
        )}
      </Form.Item>
    </Form.Item>
  );
};
