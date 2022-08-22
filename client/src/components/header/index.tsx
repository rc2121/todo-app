import { NavLink, useNavigate } from 'react-router-dom'
import { LogoutButton } from './styles'
import './index.scss'

const Header = () => {
    const isAuthenticated = localStorage.getItem('token')
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    return(
        <div>{isAuthenticated && <div className='headerWrapper'>
                <div className='linkWrapper'>
                    <NavLink className='link' to="/">Home</NavLink>
                    <NavLink className='link' to="/todos">Todos</NavLink>
                </div>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </div>
        }
        </div>
    )
}

export default Header