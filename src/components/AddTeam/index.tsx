import React, { useState } from 'react';
import Modal from 'react-modal';
import { Network, Urls, config } from '../../config';
import { useApi } from '../../hooks/useApi';
import { logMessage } from '../../utils';
import useAuth from '../../hooks/useAuth';

interface Props {
  setModal?: (obj: boolean) => void;
  modalIsOpen: boolean;
  reportsInto: String;
}
const customStyles = {
  overlay: {
    padding: 0,
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '300px',
    width: '350px',
    overflow: 'hidden',
    padding: 0,
    backgroundColor: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  },
};

const initialValue = {
  displayName: '',
  userPrincipalName: '',
  teamName: '',
  teamLead: true,
  visibile: null,
  left: false,
  horizontal: false,
};

const AddTeam: React.FC<Props> = ({ setModal = () => {}, modalIsOpen, reportsInto }) => {
  const [team, setTeam] = useState(initialValue);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setTeam((prevVal: any) => {
      return { ...prevVal, [name]: value };
    });
  };

  const { setApiCall } = useApi();
  const { activeUser } = useAuth();
  const onSubmit = async () => {
    const obj = {
      ...team,
      reportsInto: reportsInto,
      dimensions: {
        left: team.left,
        horizontal: team.horizontal,
      },
    };
    const response = await Network.post(Urls.addMemeber, obj, (await config()).headers);
    if (!response.ok) return alert(response.data.error);
    logMessage(`${activeUser.name} added new team with name ${team.teamName}`);
    setApiCall((prevVal: boolean) => !prevVal);
  };
  return (
    <Modal isOpen={modalIsOpen} style={customStyles}>
      <h2 className='heading-text' style={{ marginTop: '10px' }} data-testid='testaddteammodal'>
        Add New Team
      </h2>
      <div className='input-container'>
        <input
          name='teamName'
          type='text'
          className='edit-input'
          value={team.teamName}
          onChange={handleChange}
          placeholder='Team Name'
        />
        <br />
        <input
          type='text'
          name='displayName'
          className='edit-input'
          value={team.displayName}
          onChange={handleChange}
          placeholder='Display name'
        />
        <br />
        <input
          type='text'
          name='userPrincipalName'
          value={team.userPrincipalName}
          className='edit-input'
          placeholder='lead upn'
          onChange={handleChange}
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '5px',
        }}
      >
        <div>
          <label>Left</label>
          <input
            style={{ marginLeft: '10px' }}
            type='checkbox'
            name='Left'
            data-testid='left-input'
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
        </div>
        <div style={{ marginLeft: '10px' }}>
          <label>Horizontal</label>
          <input
            data-testid='horizontal-input'
            style={{ marginLeft: '10px' }}
            type='checkbox'
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

      <div style={{ marginLeft: '15px', marginTop: '10px' }}>
        <button className='submit-btn' onClick={() => setModal(false)}>
          Cancel
        </button>
        <button className='cancel-btn' data-testid='addteambtn' onClick={() => onSubmit()}>
          Add
        </button>
      </div>
    </Modal>
  );
};

export default AddTeam;
