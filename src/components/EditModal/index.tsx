import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { useNode } from '../../hooks/useNode';
import { logMessage, compareMemberValues, getOptions, getReportsInto } from '../../utils';

import { Button, Checkbox, Col, Form, Input, message, Modal, Row, Select, Spin } from 'antd';
import useLoader from '../../hooks/useLoader';

interface Props {
  data: any;
  setModal?: (obj: boolean) => void;
  modalIsOpen: boolean;
  handleDelete?: (name: string, closeModal: any) => void;
}

interface checkProps {
  name: any;
  title: String;
  testName?: any;
}

const EditModal: React.FC<Props> = ({
  data,
  setModal = () => {},
  modalIsOpen,
  handleDelete = () => {},
}) => {
  const { nodes } = useNode();

  const initialValues = {
    userPrinicipalName: data.userPrincipalName,
    displayName: data.displayName,
    reportsInto: getReportsInto(nodes?.directTeamMembers, data.reportsInto),
    teamLead: !!data.teamLead,
    horizontal: !!data.dimensions.horizontal,
    visible: !!data.visible,
    left: !!data.dimensions.horizontal,
  };

  const form = Form.useFormInstance();
  const [loading, setLoading] = useState(false);

  const { setApiCall } = useApi();

  const closeModal = () => setModal(false);
  const { loading: globalLoading } = useLoader();
  const options = getOptions(nodes?.directTeamMembers);
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await compareMemberValues(initialValues, values);
      message.success('User changes are saved successfully!');
      setLoading(false);
      closeModal();
      logMessage(`Updated the member ${data.userPrincipalName}`);
      setApiCall((prevVal: boolean) => !prevVal);
    } catch (err: any) {
      message.error('Something went wrong, please refresh and try again!');
      console.log(err);
    }
  };

  const CheckInput: React.FC<checkProps> = ({ name, title, testName }) => {
    return (
      <Col span={12}>
        <Form.Item name={name} valuePropName='checked'>
          <Checkbox data-testid={testName}>{title}</Checkbox>
        </Form.Item>
      </Col>
    );
  };

  return (
    <Modal
      open={modalIsOpen}
      onCancel={closeModal}
      title={`Edit (${data.userPrincipalName})`}
      width={530}
      bodyStyle={{ paddingTop: 30 }}
      destroyOnClose
      footer={null}
      data-testid='edit-modal'
    >
      {/* Don't remove, following line helps to display data in dev mode */}
      {/* <pre style={{ backgroundColor: "lightgray", padding: 15 }}>
        {JSON.stringify(initialValues, null, 2)}
      </pre> */}
      <Spin spinning={loading} size='large'>
        <Form
          name='editForm'
          layout='vertical'
          onFinish={onFinish}
          form={form}
          initialValues={initialValues}
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

          <Form.Item label='Member upn' name='userPrinicipalName'>
            <Input disabled />
          </Form.Item>
          <Form.Item name='reportsInto' label='Team'>
            <Select
              placeholder='Select a option and change input text above'
              allowClear
              showSearch
              options={options}
            />
          </Form.Item>
          <Row style={{ marginBottom: 30 }}>
            <CheckInput name='teamLead' testName='teamLead-input' title='Team Lead' />
            <CheckInput name='horizontal' testName='horizontal-input' title='Horizontal' />
            <CheckInput name='left' title='Left' />
            <CheckInput name='visible' title='Visible' testName='visible-input' />
          </Row>

          {/* TODO: remove closeModal that is being passed in handleDelete, it's not good practice */}
          <Button
            disabled={loading || globalLoading}
            danger
            onClick={() => handleDelete(data.displayName, closeModal)}
            data-testid='delete-member'
          >
            Delete Member
          </Button>
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
            data-testid='edit-cancel-btn'
          >
            Cancel
          </Button>
        </Form>
      </Spin>
    </Modal>
  );
};

export default EditModal;
