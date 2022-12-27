import React, { useState, FC } from 'react';
import { Button, Divider, Tooltip } from 'antd';

import { Popup } from '../../components';
import { useApi } from '../../hooks/useApi';
import EditModal from '../EditModal';
import { deleteTeamMember } from '../../utils';

interface NameProps {
  data: any;
  flag: boolean;
}
const LeafName: FC<NameProps> = ({ data, flag }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const { setApiCall } = useApi();

  const handleDelete = async (name: string, closeModal = () => {}) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      closeModal();
      deleteTeamMember(data.userPrincipalName);
      setApiCall((prevVal: boolean) => !prevVal);
    }
  };

  return (
    <>
      <Popup data={data} modalIsOpen={showModal} setModal={setShowModal} />
      <EditModal
        data={data}
        modalIsOpen={editModal}
        setModal={setEditModal}
        handleDelete={handleDelete}
      />

      <div data-testid='testClick' onClick={() => setEditModal(!editModal)}>
        <>
          {flag ? (
            <>
              <Tooltip placement='right' title={data.displayName}>
                <Button size='small' block type='text' className='leaf-member-name'>
                  <b>{!!data.teamName ? data.teamName : null}</b>
                  {!!data.teamName ? <br /> : null}
                  {!!data.teamLead ? data.displayName : null}
                  {data.directTeamMembers.length}
                  <br />
                  {data.directTeamMembers.map((item: any, index: any) => {
                    return (
                      <div style={{ marginTop: '3px', fontSize: '9px' }} key={index}>
                        {item.displayName}
                      </div>
                    );
                  })}
                </Button>
              </Tooltip>
              {data.directTeamMembers.length ? (
                <Divider dashed style={{ marginTop: 5, marginBottom: 5 }} />
              ) : null}
            </>
          ) : (
            <Tooltip placement='right' title={data.displayName}>
              <Button size='small' block type='text' className='leaf-member-name'>
                {data.displayName}
              </Button>
            </Tooltip>
          )}
        </>
      </div>
    </>
  );
};

export default LeafName;
