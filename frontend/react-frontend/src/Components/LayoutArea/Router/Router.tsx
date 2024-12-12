import css from "../Router/Router.module.css"
import { Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../../LoginArea/Login/Login";
import { VacationData } from "../../VacationDataArea/VacationData/VacationData";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { AboutMe } from "../../AboutMe/AboutMe";

export function Router(): JSX.Element {
    return (
        <div className={css.Router}>
			<Routes>
                <Route path="/" element= {<Home />} />
                <Route path="/home" element= {<Home />} />
                <Route path="/login" element= {<Login />} />
                <Route path="/vacation_data" element= {<VacationData />} />
                <Route path="/about" element= {<AboutMe />} />
                <Route path="/*" element= {<PageNotFound />} />
            </Routes>
        </div>
    );
}
