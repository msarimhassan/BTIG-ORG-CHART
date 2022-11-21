import React, { useState, useEffect } from 'react';

// import { NewData } from "../../common";
import {
    Node,
    Root,
    Tree,
    TreeNode,
    BackButton,
    Leaf,
    HorizontalNode,
    Navbar,
} from '../../components';
import { Network, Urls, config } from '../../config';
import { useApi } from '../../hooks/useApi';
import { useNode } from '../../hooks/useNode';
import { configuration } from '../../configuration';
import useAuth from '../../hooks/useAuth';
import useLoader from '../../hooks/useLoader';

import './Home.css';

const Home: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const { apiCall } = useApi();
    const { setNodeData } = useNode();
    const [previousData, setPreviousData] = useState<any>([]);
    const [upn, setUpn] = useState<String>('KHarlan@btig.com');
    const { token } = useAuth();
    const { setLoading } = useLoader();

    useEffect(() => {
        GetOrganizationData();
    }, [upn, apiCall]);

    const handleNode = (obj: any) => {
        setPreviousData([...previousData, data]);
        setData(obj);
        setNodeData(obj);
    };
    const handleBack = () => {
        const newData = previousData.pop();
        setData(newData);
        setNodeData(newData);
    };

    const GetOrganizationData = async () => {
        setLoading(true);
        const response = await Network.get(`${Urls.getMember}/${upn}`, (await config()).headers);
        setLoading(false);
        if (!response.ok) return console.log({ response });
        setData(response.data.data);
        setNodeData(response.data.data);
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
                                                          totalNodes={
                                                              data.directTeamMembers?.length
                                                          }
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
                                <>
                                    <HorizontalNode
                                        object={obj}
                                        handleNode={() => handleNode(obj)}
                                        totalNodes={data.directTeamMembers?.length}
                                    />
                                </>
                            ) : null;
                        })}
                    </div>
                </>
            ) : null}
        </>
    );
};
export default Home;
