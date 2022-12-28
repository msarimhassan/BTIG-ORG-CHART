import React, { useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Modal, Row, Spin } from 'antd';
import { useApi } from '../../hooks/useApi';
import { AddNewMember } from '../../utils';

interface Props {
  modalIsOpen: boolean;
  data: any;
  setModal?: (obj: any) => void;
}

const initialValues = {
  userPrincipalName: '',
  displayName: '',
  teamLead: false,
  horizontal: false,
  left: false,
  visible: false,
};
const AddMember: React.FC<Props> = ({ modalIsOpen, setModal = () => {}, data }) => {
  const [loading, setLoading] = useState(false);
  const { setApiCall } = useApi();

  const closeModal = (e: any) => {
    e.stopPropagation();
    setModal(false);
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    AddNewMember({
      ...values,
      teamName: data?.teamName,
      reportsInto: data?.userPrincipalName,
    });
    setModal(false);
    setApiCall((prevVal: boolean) => !prevVal);
    setLoading(false);
  };

  return (
    <div test-dataid='testmodal' onClick={(e) => e.stopPropagation()}>
      <Modal
        open={modalIsOpen}
        title='Add Member'
        footer={null}
        onCancel={closeModal}
        destroyOnClose
        bodyStyle={{ paddingTop: 30 }}
      >
        <Spin spinning={loading} size='large'>
          <Form
            name='addMemberForm'
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

            <Form.Item
              label='Member upn'
              name='userPrincipalName'
              rules={[
                {
                  required: true,
                  message: 'Required!',
                },
              ]}
            >
              <Input placeholder='Type Member upn' />
            </Form.Item>

            <Row style={{ marginBottom: 30 }}>
              <Col span={12}>
                <Form.Item name='teamLead' valuePropName='checked'>
                  <Checkbox data-testid='teamLead-input'>Team Lead</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='horizontal' valuePropName='checked'>
                  <Checkbox data-testid='horizontal-input'>Horizontal</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='left' valuePropName='checked'>
                  <Checkbox data-testid='left-input'>Left</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='visible' valuePropName='checked'>
                  <Checkbox>Visible</Checkbox>
                </Form.Item>
              </Col>
            </Row>

            <Button type='primary' htmlType='submit' style={{ float: 'right' }}>
              Submit
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

export default AddMember;
