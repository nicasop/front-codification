import { NavLink } from 'react-router-dom';
import './NavBar.css'

const NavBar = (props) => {
    return(
        <div {...props} >
            <div>
                <div className="h2 text-center text-color my-4">
                    ENCRIPT
                </div>
            </div>
            <hr/>
            <ul class="list-group">
                <NavLink className="list-group-item text-center item-group" to={"/"}> 
                    Encriptar
                </NavLink>
                
                <NavLink className="list-group-item text-center item-group" to={"/desencript"}> 
                    Desencriptar
                </NavLink>
            </ul>
        </div>
    )
}

export default NavBar;