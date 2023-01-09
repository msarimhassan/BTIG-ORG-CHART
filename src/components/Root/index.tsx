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
        {object.visible === true ? (
          <>
            <span style={{ fontSize: '13px' }}>
              <u>{object?.displayName}</u>
            </span>
            <br />
          </>
        ) : null}

        <span className='text-teamname' style={{ fontSize: '13px', fontWeight: 'bold' }}>
          {object.teamName}
        </span>
      </div>
    </>
  );
};

export default Root;
