import React, { useState } from 'react';
import Modal from 'react-modal';
import { config, Network, Urls } from '../../config';
import { useApi } from '../../hooks/useApi';

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

const AddMember: React.FC<Props> = ({ modalIsOpen, setModal = () => {}, data }) => {
    const [userPrinicipalName, setUserPrincipalName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [teamLead, setTeamLead] = useState(false);
    const [horizontal, setHorizontal] = useState(false);
    const [left, setLeft] = useState(false);
    const { apiCall, setApiCall } = useApi();
    const handleCancel = (e: any) => {
        e.stopPropagation();
        setModal(!modalIsOpen);
    };
    const AddNewMember = async (e: any) => {
        e.stopPropagation();
        const obj = {
            displayName: displayName,
            userPrincipalName: userPrinicipalName,
            teamName: data.teamName,
            teamLead: teamLead,
            visible: null,
            reportsInto: data.userPrincipalName,
            dimensions: {
                left: left,
                horizontal: horizontal,
            },
        };
        const response = await Network.post(Urls.addMemeber, obj, (await config()).headers);
        if (!response.ok) return alert(response.data.error);
        setApiCall((prevVal: boolean) => !prevVal);
    };
    return (
        <div test-dataid='testmodal' onClick={(e) => e.stopPropagation()}>
            <Modal isOpen={modalIsOpen} style={customStyles}>
                <div>
                    <h2 className='header'>Add Member</h2>

                    <div className='input-container'>
                        <input
                            type='text'
                            value={displayName}
                            className='edit-input'
                            placeholder='Member diplay Name'
                            onChange={(e) => {
                                setDisplayName(e.target.value);
                            }}
                        />
                        <br />
                        <input
                            type='text'
                            value={userPrinicipalName}
                            className='edit-input'
                            placeholder='Member upn'
                            onChange={(e) => {
                                setUserPrincipalName(e.target.value);
                            }}
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
                                    name='teamLead'
                                    onClick={(e) => setTeamLead(e.currentTarget.checked)}
                                />
                            </div>
                            <div style={{ marginLeft: '10px' }}>
                                <label>Horizontal</label>
                                <input
                                    style={{ marginLeft: '10px' }}
                                    type='checkbox'
                                    name='Horizontal'
                                    onClick={(e) => setHorizontal(e.currentTarget.checked)}
                                />
                            </div>
                            <div style={{ marginLeft: '10px' }}>
                                <label>Left</label>
                                <input
                                    style={{ marginLeft: '10px' }}
                                    type='checkbox'
                                    name='Left'
                                    onClick={(e) => setLeft(e.currentTarget.checked)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='btn-group'>
                        <button
                            data-testid='test-cancel-btn'
                            className='cancel-btn'
                            onClick={handleCancel}
                        >
                            close
                        </button>
                        <button className='submit-btn' onClick={AddNewMember}>
                            Submit
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AddMember;
