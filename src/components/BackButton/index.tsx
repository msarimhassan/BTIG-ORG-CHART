import React from "react";
import { Icons } from "../../common";

interface Props {
  previousData: Array<any>;
  handleBack?: () => void;
}

const BackButton: React.FC<Props> = ({
  previousData,
  handleBack = () => {},
}) => {
  const { BI } = Icons;
  return (
    <div>
      {previousData.length > 0 ? (
        <button
          className="back-btn"
          data-testid="testbackbtn"
          onClick={() => handleBack()}
        >
          <BI.BiArrowBack size={20} />
        </button>
      ) : null}
    </div>
  );
};

export default BackButton;
