import React, { useState } from 'react';

import './Root.css';
interface Props {
  object: any;
}

const Root: React.FC<Props> = ({ object }: Props) => {
  const [active, isActive] = useState<boolean>(false);

  const hideTooltip = () => {
    isActive(false);
  };

  return (
    <>
      <div
        className='root'
        data-testid='testroot'
        onMouseEnter={() => isActive(!active)}
        onMouseLeave={hideTooltip}
      >
        <span style={{ fontSize: '13px' }}>
          <u>{object?.displayName}</u>
        </span>
        <br />
        <span className='text-teamname' style={{ fontSize: '13px', fontWeight: 'bold' }}>
          {object.teamName}
        </span>
      </div>
    </>
  );
};

export default Root;
