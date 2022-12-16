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
        {object?.displayName}
        <br />
        <span className='text-teamname'>
          <u>{object.teamName}</u>
        </span>
      </div>
    </>
  );
};

export default Root;
