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
import NodeMerge from '../../components/NodeMerge';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { calculateDimensions, findNodeDFS } from './helpers';

import './Home.css';

const Home: React.FC = () => {
  const location = useLocation();
  const [data, setData] = useState<any>(null);
  const { apiCall } = useApi();
  const { setNodeData } = useNode();
  const [previousData, setPreviousData] = useState<any>([]);
  const [upn, setUpn] = useState(
    location.pathname !== '/' ? location.pathname.replace('/', '') : ''
  );
  const { setLoading } = useLoader();
  const { activeUser } = useAuth();
  const window = useWindowDimensions();

  useEffect(() => {
    const GetOrganizationData = async () => {
      setLoading(true);
      const prevState = { data, previousData };
      const response = await Network.get(Urls.getMember(upn), (await config()).headers);
      if (!response.ok) return alert('Sorry no records are available');
      logMessage(`${activeUser.name} fetch data from endpoint ${upn}`);

      if (prevState.data) {
        const result = { data: null };
        findNodeDFS(prevState.data._id, response.data.data, result);
        const { data: prevNode } = result;

        const navigations = new Array(previousData.length);

        for (let i = 0; i < previousData.length; i++) {
          const nav = previousData[i];
          const navResult = { data: null };
          findNodeDFS(nav._id, response.data.data, navResult);
          const { data: prevNode } = navResult;
          navigations[i] = prevNode;
          setPreviousData(navigations);
        }

        setData(prevNode);
        setNodeData(prevNode);
      } else {
        setData(response.data.data);
        setNodeData(response.data.data);
      }
      setLoading(false);
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

  const totalVerticalNode = data?.directTeamMembers?.filter(
    (item: any) => item.dimensions?.horizontal !== true && item.teamLead !== false
  ).length;

  const totalLeftNodes = data?.directTeamMembers?.filter(
    (item: any) => item.dimensions.left && !item.dimensions.horizontal
  ).length;

  const { width, leftHorizontalNodeWidth, leftHorizontalNodeMargin, fullWidthHorizontalNodeWidth } =
    calculateDimensions({ totalVerticalNode, totalLeftNodes, window });

  const rootLineHidden =
    (data &&
      (!data.directTeamMembers || (data.directTeamMembers && !data.directTeamMembers.length))) ||
    false;

  const mergedNodeVisible =
    data && data.directTeamMembers && data.directTeamMembers.some((item: any) => !item.teamLead);

  return (
    <>
      {data !== null ? (
        <>
          <div className='container' data-testid='testhome'>
            <BackButton previousData={previousData} handleBack={handleBack} />
            <Tree lineHidden={rootLineHidden} width={width} label={<Root object={data} />}>
              {data.directTeamMembers
                ? data.directTeamMembers
                    .sort((a: any, b: any) => ('' + a.teamName).localeCompare(b.teamName))
                    .sort((a: any, b: any) => b.dimensions.left - a.dimensions.left)
                    .map((obj: any, index: any) => {
                      const lineHidden =
                        !obj.directTeamMembers ||
                        (obj.directTeamMembers && !obj.directTeamMembers.length);
                      return obj.dimensions?.horizontal !== true && obj.teamLead !== false ? (
                        <TreeNode
                          lineHidden={lineHidden}
                          totalVerticalNode={totalVerticalNode}
                          level={2}
                          width={width}
                          key={index}
                          label={
                            <Node
                              setUpn={setUpn}
                              key={index}
                              handleNode={() => handleNode(obj)}
                              object={obj}
                              totalNodes={totalVerticalNode + (mergedNodeVisible ? 1 : 0)}
                            />
                          }
                        >
                          {!!obj.teamLead && (
                            <TreeNode
                              lineHidden={
                                !obj.directTeamMembers ||
                                (obj.directTeamMembers && !obj.directTeamMembers.length)
                              }
                              totalVerticalNode={totalVerticalNode}
                              level={3}
                              width={width}
                              key={index}
                              label={
                                <Leaf
                                  key={index}
                                  totalNodes={totalVerticalNode}
                                  object={obj}
                                  handleNode={() => handleNode(obj)}
                                />
                              }
                            />
                          )}
                        </TreeNode>
                      ) : null;
                    })
                : null}
              <TreeNode
                lineHidden={rootLineHidden}
                totalVerticalNode={totalVerticalNode}
                makeVisible={data.directTeamMembers.some((i: any) => !i.teamLead)}
                isMergedNode={data.directTeamMembers.some((i: any) => i.teamLead)}
                width={width}
                label={<NodeMerge object={data} handleNode={() => handleNode(data)} />}
                level={2}
              />
            </Tree>
          </div>
          <div>
            {data.directTeamMembers?.map((obj: any, index: any) => {
              return obj.dimensions?.horizontal !== false && obj.teamLead !== false ? (
                <HorizontalNode
                  key={index}
                  object={obj}
                  handleNode={() => handleNode(obj)}
                  marginLeft={leftHorizontalNodeMargin}
                  leftNodeWidth={leftHorizontalNodeWidth}
                  fullWidthHorizontalNodeWidth={fullWidthHorizontalNodeWidth}
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
