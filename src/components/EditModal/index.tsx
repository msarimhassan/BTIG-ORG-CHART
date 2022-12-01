import React, { useState } from 'react';
import Modal from 'react-modal';
import { Network, Urls, config } from '../../config';
import { useApi } from '../../hooks/useApi';
import { useNode } from '../../hooks/useNode';
import { logMessage } from '../../utils';

const customStyles = {
  overlay: {
    padding: 0,
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '350px',
    width: '350px',
    overflow: 'hidden',
    padding: 0,
    backgroundColor: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  },
};

interface Props {
  data: any;
  setModal?: (obj: boolean) => void;
  modalIsOpen: boolean;
}

const EditModal: React.FC<Props> = ({ data, setModal = () => {}, modalIsOpen }) => {
  const initialValues = {
    userPrinicipalName: data.userPrincipalName,
    displayName: data.displayName,
    reportsInto: null,
    teamLead: data.teamLead,
    horizontal: data.dimensions.horizontal,
    visible: null,
  };
  const [user, setUser] = useState(initialValues);
  const { setApiCall } = useApi();
  const { nodes } = useNode();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevVal) => {
      return { ...prevVal, [name]: value };
    });
  };
  const UpdateMember = async () => {
    const obj = {
      ...user,
      teamName: data.teamName,
      dimensions: {
        left: true,
        horizontal: user.horizontal,
      },
      ...(!user.reportsInto && { reportsInto: user.reportsInto }),
    };

    const response = await Network.put(
      `${Urls.updateMember}/${data.userPrincipalName}`,
      obj,
      (
        await config()
      ).headers
    );
    if (!response.ok) return console.log({ response });
    logMessage(`Updated the member ${data.userPrincipalName}`);
    setApiCall((prevVal: boolean) => !prevVal);
  };

  return (
    <Modal isOpen={modalIsOpen} style={customStyles}>
      <h2 className='heading-text' style={{ marginTop: '10px' }} data-testid='editteammembers'>
        Edit Team Members
      </h2>
      <div className='input-container'>
        <input
          type='text'
          className='edit-input'
          value={user.displayName}
          onChange={handleChange}
          placeholder='Edit the Name'
        />
        <br />
        <input
          type='text'
          disabled={true}
          value={user.userPrinicipalName}
          className='edit-input'
          placeholder='Member upn'
          onChange={handleChange}
        />
      </div>
      <span style={{ fontSize: '0.8vw', marginLeft: '25px' }}>
        Note: Select the team if you want to change the team
      </span>
      <select
        name=''
        id=''
        style={{ marginLeft: '25px' }}
        data-testid='reportsInto-input'
        onChange={(event) => {
          let e = {
            target: {
              name: 'reportsInto',
              value: event.target.value,
            },
          };
          handleChange(e);
        }}
      >
        <option value='' selected disabled hidden>
          Choose Team
        </option>
        {nodes?.directTeamMembers.map((item: any) => {
          if (!item.teamLead) return null;
          return <option value={item.userPrincipalName}>{item.teamName}</option>;
        })}
      </select>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '15px',
        }}
      >
        <div>
          <label>Team Lead</label>
          <input
            style={{ marginLeft: '10px' }}
            type='checkbox'
            name='teamLead'
            checked={user.teamLead}
            data-testid='teamLead-input'
            onClick={(event) => {
              let e = {
                target: {
                  name: 'teamLead',
                  value: event.currentTarget.checked,
                },
              };
              handleChange(e);
            }}
          />
        </div>
        <div style={{ marginLeft: '10px' }}>
          <label>Horizontal</label>
          <input
            style={{ marginLeft: '10px' }}
            type='checkbox'
            checked={user.horizontal}
            data-testid='horizontal-input'
            name='Horizontal'
            onClick={(event) => {
              let e = {
                target: {
                  name: 'horizontal',
                  value: event.currentTarget.checked,
                },
              };
              handleChange(e);
            }}
          />
        </div>
      </div>
      <div style={{ marginLeft: '15px', marginTop: '40px' }}>
        <button className='submit-btn' data-testid='cancel-btn' onClick={() => setModal(false)}>
          Cancel
        </button>
        <button
          className='cancel-btn'
          onClick={() => UpdateMember()}
          data-testid='testeditteammodal'
        >
          Edit
        </button>
      </div>
    </Modal>
  );
};

export default EditModal;
