import { useContext } from 'react'
import { NodeContext } from '../context'


export const useNode = () => {
    const{nodes, setNodes}=useContext(NodeContext)
    const setNodeData = (data:any) => {
        setNodes(data)
    }
    return  {nodes,setNodeData}
}
