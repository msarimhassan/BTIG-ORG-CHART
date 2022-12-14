import React, { useState } from 'react';
import Modal from 'react-modal';
import { Network, config } from '../../config';
import { useApi } from '../../hooks/useApi';
import { useNode } from '../../hooks/useNode';
import { logMessage, checkKey } from '../../utils';
import { Icons } from '../../common';

const customStyles = {
  overlay: {
    padding: 0,
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '450px',
    width: '10  50px',
    overflow: 'hidden',
    padding: 0,
    paddingBottom: '10px',
    backgroundColor: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  },
};

interface Props {
  data: any;
  setModal?: (obj: boolean) => void;
  modalIsOpen: boolean;
}

const IconButton = ({ onClick = () => {} }) => {
  const { AI } = Icons;
  return (
    <AI.AiFillEdit size={20} style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={onClick} />
  );
};

const EditModal: React.FC<Props> = ({ data, setModal = () => {}, modalIsOpen }) => {
  const initialValues = {
    userPrinicipalName: data.userPrincipalName,
    displayName: data.displayName,
    reportsInto: null,
    teamLead: data.teamLead,
    horizontal: data.dimensions.horizontal,
    visible: data.visible,
    left: data.dimensions.horizontal,
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

  const UpdateMember = async (key: any) => {
    const URL = checkKey(key, user);
    console.log({ URL });
    const response = await Network.patch(URL, {}, (await config()).headers);
    if (!response.ok) return alert('Error in updating the member');
    logMessage(`Updated the member ${data.userPrincipalName}`);
    setApiCall((prevVal: boolean) => !prevVal);
  };

  return (
    <Modal isOpen={modalIsOpen} style={customStyles}>
      <h2 className='heading-text' style={{ marginTop: '10px' }} data-testid='editteammembers'>
        Edit Team Members
      </h2>
      <div className='input-container'>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <input
            name='displayName'
            type='text'
            className='edit-input'
            value={user.displayName}
            onChange={handleChange}
            placeholder='Edit the Name'
          />
          <IconButton onClick={() => UpdateMember('displayName')} />
        </div>

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
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '10px' }}>
        <select
          name=''
          id=''
          style={{ marginLeft: '25px', border: '1px solid black', width: '200px' }}
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
            return <option value={item.teamName}>{item.teamName}</option>;
          })}
        </select>
        <IconButton onClick={() => UpdateMember('Team')} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '30px', marginTop: '10px' }}>
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
        <IconButton onClick={() => UpdateMember('teamLead')} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '30px', marginTop: '10px' }}>
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
        <IconButton onClick={() => UpdateMember('horizontal')} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '30px', marginTop: '10px' }}>
        <label>Left</label>
        <input
          style={{ marginLeft: '10px' }}
          type='checkbox'
          checked={user.left}
          data-testid='left-edit-input'
          name='Left'
          onClick={(event) => {
            let e = {
              target: {
                name: 'left',
                value: event.currentTarget.checked,
              },
            };
            handleChange(e);
          }}
        />
        <IconButton onClick={() => UpdateMember('left')} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '30px', marginTop: '10px' }}>
        <label>Visible</label>
        <input
          style={{ marginLeft: '10px' }}
          type='checkbox'
          checked={user.visible}
          data-testid='visible-input'
          name='visible'
          onClick={(event) => {
            let e = {
              target: {
                name: 'visible',
                value: event.currentTarget.checked,
              },
            };
            handleChange(e);
          }}
        />
        <IconButton onClick={() => UpdateMember('visible')} />
      </div>

      <div style={{ marginLeft: '15px', marginTop: '5px' }}>
        <button
          className='submit-btn'
          data-testid='edit-cancel-btn'
          onClick={() => setModal(false)}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default EditModal;
