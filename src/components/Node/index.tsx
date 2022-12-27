import React, { useState } from 'react';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import './Node.css';
import { manageteamNamefont } from '../../utils';

// import { Tooltip } from '../../components';
import useAuth from '../../hooks/useAuth';
import { Tooltip } from 'antd';
import TooltipBox from '../Tooltip';

interface Props {
  object: any;
  totalNodes?: number;
  setUpn?: (obj: any) => void;
  handleNode?: (obj: any) => void;
}

interface teamName {
  teamName: String;
}

const Node: React.FC<Props> = ({
  object,
  totalNodes = 1,
  handleNode = () => { },
  setUpn = () => { },
}: Props) => {
  const [active, isActive] = useState(false);
  const window = useWindowDimensions();
  const height = `${(window.width - 40) / totalNodes + 50}px`;
  const hideTip = () => {
    isActive(false);
  };
  const { activeUser } = useAuth();

  const handlingNode = (obj: any) => {
    if (obj.directTeamMembers.length === 0) return;
    handleNode(obj);
  };



  const DisplayName: React.FC<teamName> = ({ teamName }) => {
    if (teamName) {
      return <span style={{ fontSize: '12px' }}>{object.displayName}</span>;
    }

    return (
      <div className='node-displayname' style={{ fontSize: '12px' }}>
        {object.displayName}
      </div>
    );
  };

  return (
    <Tooltip
      zIndex={1}
      placement='top'
      title={<TooltipBox data={object} active={active} hideTooltip={hideTip} flag={false} />}
    >
      <div
        id='node'
        style={{ width: '100%', height }}
        className='node'
        data-testid='testteamNode'
        onClick={(e) => {
          e.stopPropagation();
          handlingNode(object);
        }}
      >
        <div
          data-testid='testTeamName'
          className={`text ${activeUser?.role === 'read' ? 'text-top' : ''}`}
        >
          <DisplayName teamName={object.teamName} />
          <br />
          <span className='text-teamname' style={manageteamNamefont(object.teamName)}>
            <u>{object.teamName}</u>
          </span>
        </div>
      </div>
    </Tooltip>
  );
};

export default Node;
