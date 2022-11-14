import Modal from 'react-modal';
import './OptionModal.css';
import { Icons } from '../../common';

interface Props {
    data: any;
    setModal?: (obj: boolean) => void;
    modalIsOpen: boolean;
    handleDelete: (name: string) => void;
    handleUpdate: () => void;
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
        height: '150px',
        width: '250px',
        overflow: 'hidden',
        padding: 0,
        backgroundColor: '#fff',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
    },
};

const OptionModal: React.FC<Props> = ({
    data,
    setModal = () => {},
    modalIsOpen,
    handleDelete,
    handleUpdate,
}) => {
    const { MD } = Icons;
    const DeleteMember = (name: string) => {
        setModal(false);
        handleDelete(name);
    };
    return (
        <Modal isOpen={modalIsOpen} style={customStyles}>
            <h2 className='heading-text' style={{ marginTop: '10px' }}>
                Options
            </h2>
            <div style={{ position: 'absolute', right: 0, top: 0 }}>
                <MD.MdCancel onClick={() => setModal(false)} />
            </div>
            <div style={{ marginLeft: '15px', marginTop: '40px' }}>
                <button className='submit-btn' onClick={() => DeleteMember(data.displayName)}>
                    Delete
                </button>
                <button className='cancel-btn' onClick={handleUpdate}>
                    Edit
                </button>
            </div>
        </Modal>
    );
};

export default OptionModal;
