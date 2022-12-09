import { useState, FC } from 'react';
import { Leaftooltip, Popup } from '../../components';
import { Network, Urls, config } from '../../config';
import { useApi } from '../../hooks/useApi';
import OptionModal from '../OptionModal.js';
import EditModal from '../EditModal';
import useAuth from '../../hooks/useAuth';
import { logMessage } from '../../utils';

interface NameProps {
  data: any;
  flag: boolean;
}
const LeafName: FC<NameProps> = ({ data, flag }) => {
  const [showName, setShowName] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [optionModal, setOptionModal] = useState<boolean>(false);
  const { setApiCall } = useApi();
  const { activeUser } = useAuth();

  const handleDelete = async (name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      const response = await Network.delete(
        Urls.deleteMember(data.userPrincipalName),
        {},
        (
          await config()
        ).headers
      );
      if (!response.ok) return alert('Failed to delete');
      logMessage(`Delete Member ${data.userPrincipalName}`);
      setApiCall((prevVal: boolean) => !prevVal);
    }
  };
  const handleUpdate = () => {
    setOptionModal(false);
    setEditModal(true);
  };
  const checkStatus = () => {
    if (activeUser?.role === 'read') return;
    setOptionModal(!optionModal);
  };
  return (
    <>
      <Popup data={data} modalIsOpen={showModal} setModal={setShowModal} />
      <Leaftooltip active={showName} data={data} />
      <OptionModal
        data={data}
        handleDelete={handleDelete}
        modalIsOpen={optionModal}
        setModal={setOptionModal}
        handleUpdate={handleUpdate}
      />
      <EditModal data={data} modalIsOpen={editModal} setModal={setEditModal} />

      <div
        data-testid='testClick'
        onMouseEnter={() => setShowName(!showName)}
        onMouseLeave={() => setShowName(!showName)}
        className='text'
        onClick={() => checkStatus()}
      >
        <>
          {flag ? (
            <>
              <u style={{ fontWeight: 'bold' }}>{!!data.teamName && data.teamName}</u>
              <br />
              <span style={{ fontWeight: 'bold' }}>{!!data.teamLead && data.displayName}</span>
              <br />
              {data.directTeamMembers.map((item: any) => {
                return (
                  <>
                    <span>{item.displayName}</span>
                    <br />
                  </>
                );
              })}
            </>
          ) : (
            <span style={{ fontWeight: 'bold' }}>{data.displayName}</span>
          )}
        </>
      </div>
    </>
  );
};

export default LeafName;
