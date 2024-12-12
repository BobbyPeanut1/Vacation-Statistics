import { NavLink } from "react-router-dom";
import css from "./Menu.module.css";
import { useEffect, useState } from "react";

export function Menu(): JSX.Element {
    
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
     if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true); 
      }
    }, [isAuth]);


    return (
        <div className={css.Menu}>
            
			<NavLink to="/home">Home</NavLink>
            {isAuth && <NavLink to="/vacation_data">Vacations Data</NavLink>}
            <NavLink to="/about">About Me</NavLink>
        </div>
    );
}
