import React, { useState } from 'react';
import Modal from 'react-modal';
import { useApi } from '../../hooks/useApi';
import { AddNewMember } from '../../utils';

import './AddMember.css';

const customStyles = {
  overlay: {
    padding: 0,
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '280px',
    width: '350px',
    overflow: 'hidden',
    padding: 0,
    backgroundColor: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  },
};

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
};
const AddMember: React.FC<Props> = ({ modalIsOpen, setModal = () => {}, data }) => {
  const [user, setUser] = useState(initialValues);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevVal: any) => {
      return {
        ...prevVal,
        [name]: value,
        teamName: data?.teamName,
        reportsInto: data?.userPrincipalName,
      };
    });
  };
  const { setApiCall } = useApi();
  const handleCancel = (e: any) => {
    e.stopPropagation();
    setModal(!modalIsOpen);
  };
  return (
    <div test-dataid='testmodal' onClick={(e) => e.stopPropagation()}>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div>
          <h2 className='header'>Add Member</h2>

          <div className='input-container'>
            <input
              name='displayName'
              type='text'
              value={user.displayName}
              className='edit-input'
              placeholder='Member diplay Name'
              onChange={(e) => handleChange(e)}
            />
            <br />
            <input
              name='userPrincipalName'
              type='text'
              value={user.userPrincipalName}
              className='edit-input'
              placeholder='Member upn'
              onChange={handleChange}
            />
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
                  data-testid='teamLead-input'
                  name='teamLead'
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
              <div style={{ marginLeft: '10px' }}>
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
            </div>
          </div>
          <div className='btn-group'>
            <button data-testid='test-cancel-btn' className='cancel-btn' onClick={handleCancel}>
              close
            </button>
            <button
              className='submit-btn'
              data-testid='testaddmemberbtn'
              onClick={(e) => {
                AddNewMember(e, user);
                setApiCall((prevVal: boolean) => !prevVal);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddMember;
