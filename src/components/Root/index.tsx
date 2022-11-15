import React, { useState } from 'react';
import AddTeam from '../AddTeam';

import './Root.css';
interface Props {
    object: any;
}
const Root: React.FC<Props> = ({ object }: Props) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    return (
        <>
            <AddTeam
                modalIsOpen={showModal}
                setModal={setShowModal}
                reportsInto={object?.userPrincipalName}
            />
            <div className='root' data-testid='testroot' onClick={() => setShowModal(!showModal)}>
                {object?.displayName}
            </div>
        </>
    );
};

export default Root;
