import React, { useState } from 'react';
import Modal from 'react-modal';
import { Network, Urls, config } from '../../config';
import { useApi } from '../../hooks/useApi';

import './Modal.css';
const customStyles = {
    overlay: {
        padding: 0,
        zIndex: 1000,
    },
    content: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '200px',
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

const Popup: React.FC<Props> = ({ modalIsOpen, setModal = () => {}, data }) => {
    const [newTeam, setNewTeam] = useState(data.teamName);
    const { setApiCall } = useApi();
    const handleUpgrade = async () => {
        const obj = {
            newTeamName: newTeam,
        };
        const response = await Network.put(
            `${Urls.updateTeamName}/${data.teamName}`,
            obj,
            (
                await config()
            ).headers
        );
        if (!response.ok) return console.log({ response });
        setApiCall((prevVal: any) => !prevVal);
    };
    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Modal isOpen={modalIsOpen} style={customStyles}>
                <div>
                    <h2 className='header'>Edit the Team Name</h2>

                    <div className='input-container'>
                        <input
                            type='text'
                            className='edit-input'
                            value={newTeam}
                            onChange={(e: any) => {
                                setNewTeam(e.target.value);
                            }}
                            placeholder='Team Name'
                        />
                    </div>

                    <div className='btn-group'>
                        <button
                            className='cancel-btn'
                            data-testid='test-cancel-btn'
                            onClick={(e) => {
                                e.stopPropagation();
                                setModal(!modalIsOpen);
                            }}
                        >
                            close
                        </button>
                        <button className='submit-btn' data-testid='update-btn' onClick={handleUpgrade}>
                            Submit
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Popup;
