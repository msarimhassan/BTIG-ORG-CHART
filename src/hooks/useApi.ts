import { useContext } from 'react'
import { ApiContext } from '../context'

export const useApi = () => {
    const { apiCall, setApiCall } = useContext(ApiContext)
    
    return  {apiCall,setApiCall}
}