import React, { useState, useEffect } from 'react';

import { NewData } from '../../common';
import { Node, Root, Tree, TreeNode, BackButton, Leaf, HorizontalNode } from '../../components';
import { Network, Urls, config } from '../../config';
import { useApi } from '../../hooks/useApi';

import './Home.css';

const Home: React.FC = () => {
    const [data, setData] = useState<any>(NewData.data);
    const { apiCall } = useApi();
    const [previousData, setPreviousData] = useState<any>([]);
    const [upn, setUpn] = useState<String>('KHarlan@btig.com');
    const [loading, setLoading] = useState<Boolean>(false);
    // useEffect(() => {
    //     GetOrganizationData();
    // }, [upn, apiCall]);

    const handleNode = (obj: any) => {
        setPreviousData([...previousData, data]);
        setData(obj);
    };
    const handleBack = () => {
        const newData = previousData.pop();
        setData(newData);
    };
    // const GetOrganizationData = async () => {
    //     setLoading(true);
    //     const response = await Network.get(`${Urls.getMember}/${upn}`, (await config()).headers);
    //     setLoading(false);
    //     console.log({ response });
    //     setData(response.data.data);
    // };
    // if (loading)
    //     return (
    //         <div className='loader'>
    //             <h1>Loading....</h1>
    //         </div>
    //     );
    console.log(data);
    return (
        <>
            <div className='container' data-testid='testhome'>
                <BackButton previousData={previousData} handleBack={handleBack} />
                <Tree label={<Root object={data} />}>
                    {data.directTeamMembers
                        ? data.directTeamMembers.map((obj: any, index: any) => {
                              return obj.teamLead !== false &&
                                  obj.dimensions.horizontal !== true ? (
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
    );
};

export default Home;
