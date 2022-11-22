import React, { useState } from 'react';
import Modal from 'react-modal';
import { Network, Urls, config } from '../../config';
import { useApi } from '../../hooks/useApi';
import { useNode } from '../../hooks/useNode';

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
    const [userPrinicipalName, setUserPrincipalName] = useState(data.userPrincipalName);
    const [displayName, setDisplayName] = useState(data.displayName);
    const [reportsInto, setReportsInto] = useState<any>(null);
    const { nodes } = useNode();
    const [teamLead, setTeamLead] = useState(data.teamLead);
    const [horizontal, setHorizontal] = useState(data.dimensions.horizontal);
    const { setApiCall } = useApi();
    const UpdateMember = async () => {
        const obj = {
            displayName: displayName,
            userPrincipalName: userPrinicipalName,
            teamName: data.teamName,
            teamLead: teamLead,
            visible: null,
            dimensions: {
                left: true,
                horizontal: horizontal,
            },
            ...(reportsInto && { reportsInto: reportsInto }),
        };

        const response = await Network.put(
            `${Urls.updateMember}/${data.userPrincipalName}`,
            obj,
            (
                await config()
            ).headers
        );
        if (!response.ok) return console.log({ response });
        setApiCall((prevVal: boolean) => !prevVal);
    };

    return (
        <Modal isOpen={modalIsOpen} style={customStyles}>
            <h2 className='heading-text' style={{ marginTop: '10px' }} data-testid="editteammembers">
                Edit Team Members
            </h2>
            <div className='input-container'>
                <input
                    type='text'
                    className='edit-input'
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder='Edit the Name'
                />
                <br />
                <input
                    type='text'
                    disabled={true}
                    value={userPrinicipalName}
                    className='edit-input'
                    placeholder='Member upn'
                    onChange={(e) => {
                        setUserPrincipalName(e.target.value);
                    }}
                />
            </div>
            <span style={{ fontSize: '0.8vw',marginLeft:'25px' }}>
                Note: Select the team if you want to change the team
            </span>
            <select
                name=''
                id=''
                style={{ marginLeft: '25px' }}
                onChange={(e) => setReportsInto(e.target.value)}
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
                        checked={teamLead}
                        onClick={(e) => setTeamLead(e.currentTarget.checked)}
                    />
                </div>
                <div style={{ marginLeft: '10px' }}>
                    <label>Horizontal</label>
                    <input
                        style={{ marginLeft: '10px' }}
                        type='checkbox'
                        checked={horizontal}
                        name='Horizontal'
                        onClick={(e) => setHorizontal(e.currentTarget.checked)}
                    />
                </div>
            </div>
            <div style={{ marginLeft: '15px', marginTop: '40px' }}>
                <button className='submit-btn' onClick={() => setModal(false)}>
                    Cancel
                </button>
                <button className='cancel-btn' onClick={() => UpdateMember()} data-testid="testeditteammodal">
                    Edit
                </button>
            </div>
        </Modal>
    );
};

export default EditModal;
