import css from "./Home.module.css";
import statisticsImgOne from "../../../Assets/Images/statistics1.jpg"
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export function Home(): JSX.Element {
    return (
        <div className={css.Home}>
            <h1 className={css.TitleDesign}>
			    The amazing world of vacation statistics
                <br />
                <div className={css.SpanDesign}>
                    <span>Your vacation solutions start here</span>
                </div>
            </h1>

            <Card className={css.customCardColor} style={{ width: '40%', border: "1px solid black", marginBottom: "10vh" }}>
                <Card.Img variant="top" src={statisticsImgOne} />
                <Card.Body>
                    <p className={css.Text}>Hello and welcome to your vacations statistics page.</p>
                    <p className={css.Text}>As a member of the zamanski foundation you can see all the information about our vacations that any guest can ever want.</p>
                    <p className={css.Text}>If you are not logged in click <NavLink to="/login">here</NavLink> to log in.</p>
                    <p className={css.Text}>If you are already logged in, click the vacations data button at the top left of your screen.</p>
                    <p className={css.Text}>If you are an employee and don't have an account yet, please refer to your system admin for an account.</p>
                    <p className={css.Text}>Good Luck and remember</p>
                    <p className={css.Text}>Easy Tours are the best Tours!</p>
                </Card.Body>
            </Card>

        </div>
    );
}
