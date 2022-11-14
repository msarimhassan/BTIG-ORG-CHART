import { useState, FC } from 'react';
import { Leaftooltip, Popup } from '../../components';
import { Network, Urls, config } from '../../config';
import { useApi } from '../../hooks/useApi';
import OptionModal from '../OptionModal.js';
import EditModal from '../EditModal';

interface NameProps {
    data: any;
}
const LeafName: FC<NameProps> = ({ data }) => {
    const [showName, setShowName] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [optionModal, setOptionModal] = useState<boolean>(false);
    const { setApiCall } = useApi();
    const handleDelete = async (name: string) => {
        if (window.confirm(`Are you sure you want to delete ${name}`)) {
            console.log('deleted');
            const response = await Network.delete(
                `${Urls.deleteMemeber}/${data.userPrincipalName}`,
                {},
                (
                    await config()
                ).headers
            );
            if (!response.ok) return console.log({ response });
            setApiCall((prevVal: boolean) => !prevVal);
        }
    };
    const handleUpdate = () => {
        setOptionModal(false);
        setEditModal(true);
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
                onClick={() => setOptionModal(!optionModal)}
            >
                <u style={{ fontWeight: 'bold' }}>{data.teamName}</u>
                <br />
                <span style={{ fontWeight: 'bold' }}>{data.displayName}</span>
            </div>
        </>
    );
};

export default LeafName;
