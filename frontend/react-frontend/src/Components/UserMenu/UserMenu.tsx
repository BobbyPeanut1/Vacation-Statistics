import css from "./UserMenu.module.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppState } from "../../Redux/state";
import { UserModel } from "../../Models/UserModel";
import { userService } from "../../Services/userService";
import { notify } from "../../Utils/Notify";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

export function UserMenu(): JSX.Element {

    const user =  useSelector<AppState, UserModel>(store => store.user)
    

    async function logout() {
    try{
        await userService.logout();
        window.location.href = '/'
    }
    catch(err: any){
        notify.error(err);
    }
        
    }

    return (
        <div className={css.UserMenu}>
			{
                !user && <div>Hello Guest |
                         <NavLink to="login">Login</NavLink>
                         |
                         <LoginIcon />
                         </div>

            }
            {
                user && <div>Hello {user.firstName} {user.lastName} |
                        <NavLink to="" onClick={logout}>Logout</NavLink>
                        |
                        <LogoutIcon />
                        </div>
            }
        </div>
    );
}
