import { Card, Form } from 'antd';
import { Digit, InputNumber, ProSelect } from '@/components/Form';
import styles from '../index.less';
import { attrBasicSelectOptions } from '../variables';

export default ({ code }: { code: CharacterAttribute }) => {
  return (
    <Form.Item label={attrBasicSelectOptions[code].label} className={styles.green}>
      <Digit name={['attrFinal', code]} noStyle />
      <div className="connect">+</div>
      <Digit name={['attrFinalFixed', code]} noStyle />
      <div className="connect">=</div>
      <Form.Item
        dependencies={[
          ['attrFinal', code],
          ['attrFinalFixed', code],
        ]}
      >
        {(f) => (
          <InputNumber
            disabled
            placeholder="自动计算"
            style={{ width: '100%' }}
            value={f.getFieldValue(['attrFinal', code]) + f.getFieldValue(['attrFinalFixed', code])}
          />
        )}
      </Form.Item>
    </Form.Item>
  );
};
