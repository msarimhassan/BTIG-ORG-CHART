import React, { useState } from 'react';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import './Node.css';

import { Tooltip } from '../../components';
import useAuth from '../../hooks/useAuth';
import { manageteamNamefont } from '../../utils';

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
  handleNode = () => {},
  setUpn = () => {},
}: Props) => {
  const [active, isActive] = useState(false);
  const window = useWindowDimensions();
  const dimension = `${(window.width - 40) / totalNodes}px`;
  const height = `${(window.width - 40) / totalNodes + 50}px`;
  const hideTip = () => {
    isActive(false);
  };
  const { activeUser } = useAuth();

  const handlingNode = (obj: any) => {
    if (obj.directTeamMembers.length === 0) return;
    setUpn(obj.userPrincipalName);
    handleNode(obj);
  };

  const DisplayName: React.FC<teamName> = ({ teamName }) => {
    if (teamName) {
      return <span style={manageteamNamefont(teamName)}>{object.displayName}</span>;
    }

    return (
      <div className='node-displayname' style={manageteamNamefont(teamName)}>
        {object.displayName}
      </div>
    );
  };

  return (
    <div
      style={{ width: dimension, height: height, padding: 1 }}
      className='node'
      data-testid='testteamNode'
      onClick={(e) => {
        e.stopPropagation();
        handlingNode(object);
      }}
      onMouseEnter={() => isActive(!active)}
      onMouseLeave={hideTip}
    >
      {activeUser?.role === 'read' ? null : (
        <Tooltip data={object} active={active} hideTooltip={hideTip} flag={false} />
      )}
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
  );
};

export default Node;
