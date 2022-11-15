import React, { useState } from 'react';
import AddTeam from '../AddTeam';
import { Icons } from '../../common';

import './Root.css';
interface Props {
    object: any;
}

const Root: React.FC<Props> = ({ object }: Props) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [active, isActive] = useState<boolean>(false);
    const { AI } = Icons;
    const hideTooltip = () => {
        isActive(false);
    };
    const Tooltip = () => {
        const handleAddClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            setShowModal(!showModal);
        };
        return (
            <div data-testid='testleaftooltip' className='Tooltip-Wrapper'>
                {active && (
                    <div
                        className='Tooltip-Tip top'
                        data-testid='testleaftooltipchild'
                        onClick={handleAddClick}
                    >
                        Click to add new team
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <Tooltip />
            <AddTeam
                modalIsOpen={showModal}
                setModal={setShowModal}
                reportsInto={object?.userPrincipalName}
            />
            <div
                className='root'
                data-testid='testroot'
                onMouseEnter={() => isActive(!active)}
                onClick={() => setShowModal(true)}
                onMouseLeave={hideTooltip}
            >
                {object?.displayName}
            </div>
        </>
    );
};

export default Root;
