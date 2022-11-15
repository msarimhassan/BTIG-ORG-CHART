import React, { useState } from 'react';
import Modal from 'react-modal';
import { Network, Urls, config } from '../../config';
import { useApi } from '../../hooks/useApi';
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

const AddTeam: React.FC<Props> = ({ setModal = () => {}, modalIsOpen, reportsInto }) => {
    const [userPrinicipalName, setUserPrincipalName] = useState();
    const [displayName, setDisplayName] = useState();
    const [teamName, setTeamName] = useState();
    const [horizontal, setHorizontal] = useState(false);
    const [left, setLeft] = useState(false);

    const { setApiCall } = useApi();
    const onSubmit = async () => {
        const obj = {
            displayName: displayName,
            userPrincipalName: userPrinicipalName,
            teamName: teamName,
            teamLead: true,
            visible: null,
            reportsInto: reportsInto,
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
        <Modal isOpen={modalIsOpen} style={customStyles}>
            <h2 className='heading-text' style={{ marginTop: '10px' }}>
                Add New Team
            </h2>
            <div className='input-container'>
                <input
                    type='text'
                    className='edit-input'
                    value={teamName}
                    onChange={(e: any) => setTeamName(e.target.value)}
                    placeholder='Team Name'
                />
                <br />
                <input
                    type='text'
                    className='edit-input'
                    value={displayName}
                    onChange={(e: any) => setDisplayName(e.target.value)}
                    placeholder='Display name'
                />
                <br />
                <input
                    type='text'
                    value={userPrinicipalName}
                    className='edit-input'
                    placeholder='lead upn'
                    onChange={(e: any) => {
                        setUserPrincipalName(e.target.value);
                    }}
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
                        onClick={(e) => setLeft(e.currentTarget.checked)}
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
            </div>

            <div style={{ marginLeft: '15px', marginTop: '10px' }}>
                <button className='submit-btn' onClick={() => setModal(false)}>
                    Cancel
                </button>
                <button className='cancel-btn' onClick={() => onSubmit()}>
                    Add
                </button>
            </div>
        </Modal>
    );
};

export default AddTeam;
