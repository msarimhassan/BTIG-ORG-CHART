/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Node, Root, Tree, TreeNode, BackButton, Leaf, HorizontalNode } from '../../components';
import { Network, Urls, config } from '../../config';
import { useApi } from '../../hooks/useApi';
import { useNode } from '../../hooks/useNode';
import useLoader from '../../hooks/useLoader';
import useAuth from '../../hooks/useAuth';
import { logMessage } from '../../utils';
import './Home.css';

const Home: React.FC = () => {
  const location = useLocation();
  const [data, setData] = useState<any>(null);
  const { apiCall } = useApi();
  const { setNodeData } = useNode();
  const [previousData, setPreviousData] = useState<any>([]);
  const [upn, setUpn] = useState(
    location.pathname !== '/' ? location.pathname.replace('/', '') : 'KHarlan@btig.com'
  );
  const { setLoading } = useLoader();
  const { activeUser } = useAuth();

  useEffect(() => {
    const GetOrganizationData = async () => {
      setLoading(true);
      const response = await Network.get(Urls.getMember(upn), (await config()).headers);
      setLoading(false);
      if (!response.ok) return alert('Sorry no records are available');
      logMessage(`${activeUser.name} fetch data from endpoint ${upn}`);

      setData(response.data.data);
      setNodeData(response.data.data);
    };
    GetOrganizationData();
  }, [upn, apiCall]);

  const handleNode = (obj: any) => {
    setPreviousData([...previousData, data]);
    logMessage(`${activeUser.name} click the node`);
    setData(obj);
    setNodeData(obj);
  };
  const handleBack = () => {
    const newData = previousData.pop();
    logMessage(`${activeUser.name} click the back button`);
    setData(newData);
    setNodeData(newData);
  };

  return (
    <>
      {data !== null ? (
        <>
          <div className='container' data-testid='testhome'>
            <BackButton previousData={previousData} handleBack={handleBack} />
            <Tree label={<Root object={data} />}>
              {data.directTeamMembers
                ? data.directTeamMembers.map((obj: any, index: any) => {
                    return obj.dimensions.horizontal !== true ? (
                      <TreeNode
                        key={index}
                        label={
                          <Node
                            setUpn={setUpn}
                            key={index}
                            handleNode={() => handleNode(obj)}
                            object={obj}
                            totalNodes={data.directTeamMembers.length}
                          />
                        }
                      >
                        <TreeNode
                          key={index}
                          label={
                            <Leaf
                              key={index}
                              totalNodes={data.directTeamMembers?.length}
                              object={obj}
                              handleNode={() => handleNode(obj)}
                            />
                          }
                        />
                      </TreeNode>
                    ) : null;
                  })
                : null}
            </Tree>
          </div>
          <div>
            {data.directTeamMembers?.map((obj: any) => {
              return obj.teamName !== null && obj.dimensions.horizontal !== false ? (
                <HorizontalNode
                  object={obj}
                  handleNode={() => handleNode(obj)}
                  totalNodes={data.directTeamMembers?.length}
                />
              ) : null;
            })}
          </div>
        </>
      ) : null}
    </>
  );
};
export default Home;
