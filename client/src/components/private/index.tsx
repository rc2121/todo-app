import { Navigate, useLocation } from 'react-router-dom'
const PrivateRouting = ({ children }: { children: JSX.Element }) => {
    const location = useLocation()
    if(!localStorage.getItem('token')) {
        return <Navigate to="/login" state={{ from: location }} />  
    }
    return children
}

export default PrivateRouting