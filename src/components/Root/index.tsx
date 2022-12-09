import React, { useState } from 'react';
import AddTeam from '../AddTeam';
import useAuth from '../../hooks/useAuth';

import './Root.css';
interface Props {
  object: any;
}

const Root: React.FC<Props> = ({ object }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [active, isActive] = useState<boolean>(false);
  const { activeUser } = useAuth();

  const hideTooltip = () => {
    isActive(false);
  };

  const handleTeamModal = () => {
    if (activeUser?.role === 'read') return alert('Cannot Access');
    setShowModal(true);
  };

  return (
    <>
      <AddTeam
        modalIsOpen={showModal}
        setModal={setShowModal}
        reportsInto={object?.userPrincipalName}
      />
      <div
        className='root'
        data-testid='testroot'
        onMouseEnter={() => isActive(!active)}
        onClick={() => handleTeamModal()}
        onMouseLeave={hideTooltip}
      >
        {object?.displayName}
      </div>
    </>
  );
};

export default Root;
