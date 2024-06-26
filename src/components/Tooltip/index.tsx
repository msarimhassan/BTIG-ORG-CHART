import { FC, useState } from 'react';

import { Popup, AddMember } from '../../components';
import { Icons } from '../../common';
import './Tooltip.css';
interface Props {
  active: boolean;
  data: any;
  flag?: boolean;
  hideTooltip?: () => void;
}

const TooltipBox: FC<Props> = ({ active, hideTooltip = () => {}, flag, data }) => {
  const { MD, AI } = Icons;
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modal, openModal] = useState<boolean>(false);

  const handleEditClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setModalIsOpen(!modalIsOpen);
    hideTooltip();
  };

  const handleAddClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    openModal(!modal);
    hideTooltip();
  };

  return (
    <>
      {!!modalIsOpen && <Popup modalIsOpen={modalIsOpen} data={data} setModal={setModalIsOpen} />}
      <AddMember modalIsOpen={modal} data={data} setModal={openModal} />
      <div>
        <div data-testid='testTooltip'>
          <div className='toolTipChild'>
            <div
              data-testid='testEdit'
              onClick={(e) => handleEditClick(e)}
              style={{ padding: '5px' }}
            >
              <MD.MdEdit size={20} />
            </div>
            {!flag && (
              <div data-testid='testAdd' style={{ padding: '5px' }} onClickCapture={handleAddClick}>
                <AI.AiOutlinePlus size={20} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TooltipBox;
