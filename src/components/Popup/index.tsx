import React, { useState } from 'react';
import { Button, Checkbox, Col, Form, Input, message, Modal, Row, Spin } from 'antd';
import { useApi } from '../../hooks/useApi';
import { logMessage, compareValues } from '../../utils';

interface Props {
  modalIsOpen: boolean;
  data: any;
  setModal?: (obj: any) => void;
}
interface checkProps {
  name: any;
  title: String;
}

const Popup: React.FC<Props> = ({ modalIsOpen, setModal = () => {}, data }) => {
  const initialValues = {
    userPrinicipalName: data.userPrincipalName,
    displayName: data.displayName,
    reportsInto: null,
    teamLead: !!data.teamLead,
    horizontal: !!data.dimensions?.horizontal,
    visible: !!data.visible,
    left: !!data.dimensions?.left,
    teamName: data.teamName,
  };
  const [loading, setLoading] = useState(false);
  const { setApiCall } = useApi();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await compareValues(initialValues, values, data.teamName);
      message.success('User changes are saved successfully!');
      logMessage(`Updated the member ${data.userPrincipalName}`);
      setLoading(false);
      setApiCall((prevVal: boolean) => !prevVal);
      closeModal();
    } catch (err: any) {
      message.error('Something went wrong, please refresh and try again!');
      console.log(err);
    }
  };

  const closeModal = () => setModal(false);

  const CheckInput: React.FC<checkProps> = ({ name, title }) => {
    return (
      <Col span={12}>
        <Form.Item name={name} valuePropName='checked'>
          <Checkbox>{title}</Checkbox>
        </Form.Item>
      </Col>
    );
  };
  return (
    <div data-testid='test-popup' onClick={(e) => e.stopPropagation()}>
      <Modal
        open={modalIsOpen}
        onCancel={closeModal}
        title={`Edit (${data.userPrincipalName})`}
        width={530}
        bodyStyle={{ paddingTop: 30 }}
        destroyOnClose
        footer={null}
      >
        {/* Don't remove, following line helps to display data in dev mode */}
        {/* <pre style={{ backgroundColor: "lightgray", padding: 15 }}>
          {JSON.stringify(initialValues, null, 2)}
        </pre> */}
        <Spin spinning={loading} size='large'>
          <Form
            name='editFormLevel1'
            layout='vertical'
            onFinish={onFinish}
            initialValues={initialValues}
            style={{ paddingBottom: 30 }}
          >
            <Form.Item
              label='Display Name'
              name='displayName'
              rules={[
                {
                  required: true,
                  message: 'Required!',
                },
              ]}
            >
              <Input placeholder='Type Display Name' />
            </Form.Item>

            <Form.Item label='Team Name' name='teamName'>
              <Input placeholder='Type Team Name' data-testid='team-input' />
            </Form.Item>

            <Form.Item label='Member upn' name='userPrinicipalName'>
              <Input disabled />
            </Form.Item>

            <Row style={{ marginBottom: 30 }}>
              <CheckInput name='teamLead' title='Team Lead' />
              <CheckInput name='horizontal' title='Horizontal' />
              <CheckInput name='left' title='Left' />
              <CheckInput name='visible' title='Visible' />
            </Row>

            <Button
              data-testid='update-btn'
              type='primary'
              htmlType='submit'
              style={{ float: 'right' }}
            >
              Update Changes
            </Button>
            <Button
              // TODO: write emotion css
              style={{ float: 'right', marginRight: 10 }}
              onClick={closeModal}
              data-testid='test-cancel-btn'
            >
              Cancel
            </Button>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default Popup;
