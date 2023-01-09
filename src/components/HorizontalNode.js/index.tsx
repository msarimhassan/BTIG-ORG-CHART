import React, { FC, useState } from 'react';
import './HorizontalNode.css';
import { Tooltip } from 'antd';
import TooltipBox from '../Tooltip';

interface Props {
  object: any;
  setUpn?: (obj: any) => void;
  handleNode?: (obj: any) => void;
  marginLeft: number;
  leftNodeWidth: number;
  fullWidthHorizontalNodeWidth: number;
}

const HorizontalNode: FC<Props> = ({
  object,
  handleNode = () => {},
  marginLeft,
  leftNodeWidth,
  fullWidthHorizontalNodeWidth,
}) => {
  const [active, isActive] = useState(false);

  const hideTip = () => {
    isActive(false);
  };

  return (
    <Tooltip
      zIndex={1}
      placement='topLeft'
      title={<TooltipBox data={object} active={active} hideTooltip={hideTip} flag={false} />}
    >
      <div
        data-testid='testhorizontalnode'
        className='HorizontalNode'
        onClick={() => handleNode(object)}
        style={{
          width: object.dimensions.left ? leftNodeWidth - 10 : fullWidthHorizontalNodeWidth,
          marginLeft: marginLeft,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className='highlighted-text' data-testid='testTeamName'>
              {object.teamName}
            </div>
            <div className='pipe-sign'></div>
            <div
              style={{
                marginLeft: '5px',
                whiteSpace: 'nowrap',
                fontSize: '13px',
              }}
            >
              {object.visible === true ? <u> {object.displayName}</u> : null}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {object.directTeamMembers.length > 0
              ? object.directTeamMembers.map(
                  (
                    item: { displayName: string; teamLead: boolean; visible: boolean },
                    index: any
                  ) => {
                    return (
                      <div
                        key={index}
                        style={{
                          marginLeft: '15px',
                          whiteSpace: 'nowrap',
                          fontSize: '13px',
                        }}
                        data-testid='testTeamLead'
                      >
                        {item.visible === true ? (
                          item.teamLead ? (
                            <u>{item?.displayName}</u>
                          ) : (
                            item?.displayName
                          )
                        ) : null}
                      </div>
                    );
                  }
                )
              : null}
          </div>
        </div>
      </div>
    </Tooltip>
  );
};

export default HorizontalNode;
