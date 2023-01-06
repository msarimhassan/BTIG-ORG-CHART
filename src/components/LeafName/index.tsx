import React, { useState, FC } from "react";
import { Button, Divider, Tooltip } from "antd";

import { Popup } from "../../components";
import { useApi } from "../../hooks/useApi";
import EditModal from "../EditModal";
import { deleteTeamMember } from "../../utils";

interface NameProps {
  data: any;
  flag: boolean;
  teamNameVisible: boolean;
  hideLine: boolean;
}
const LeafName: FC<NameProps> = ({
  data,
  flag,
  teamNameVisible,
  hideLine,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const { setApiCall } = useApi();

  const handleDelete = async (name: string, closeModal = () => {}) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      closeModal();
      deleteTeamMember(data.userPrincipalName);
      setApiCall((prevVal: boolean) => !prevVal);
    }
  };
 
  
  return (
    <>
      <Popup data={data} modalIsOpen={showModal} setModal={setShowModal} />
      <EditModal
        data={data}
        modalIsOpen={editModal}
        setModal={setEditModal}
        handleDelete={handleDelete}
      />
      <div data-testid="testClick" onClick={() => setEditModal(!editModal)}>
        <Tooltip placement="right" title={data.displayName}>
          {!hideLine ? (
            <Divider
              dashed
              style={{
                marginTop: 5,
                marginBottom: 5,
                borderColor: "lightgrey",
              }}
            />
          ) : null}
          <Button size="small" block type="text" className="leaf-member-name">
            {flag ? (
              <>
                {teamNameVisible ? (
                  <b>{!!data.teamName && data.teamName}</b>
                ) : null}
                {!!data.teamName && teamNameVisible ? <br /> : null}
                {!!data.teamLead ? <u>{data.displayName}</u> : data.displayName}
                {data.directTeamMembers.map((item: any, index: any) => {
                  return (
                    <div
                      style={{ marginTop: "3px" }}
                      key={index}
                      data-testid="test-member-name"
                    >
                      {item.displayName}
                    </div>
                  );
                })}
              </>
            ) : data.teamName ? null : (
              data.displayName
            )}
          </Button>
        </Tooltip>
      </div>
    </>
  );
};

export default LeafName;
