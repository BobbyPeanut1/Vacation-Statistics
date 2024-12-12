import css from "./PageNotFound.module.css";
import notFoundImg from "../../../Assets/Images/404img.png"
import { NavLink } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

export function PageNotFound(): JSX.Element {
    return (
        <div className={css.PageNotFound}>
            <Card style={{ width: '40%', border: "1px solid black", marginBottom: "10vh" }}>
                <Card.Img variant="top" src={notFoundImg} />
                <Card.Body className={css.btnPriority}>
                    <Card.Text className={css.errText}>An error has occurred: the page you are looking for doesn't exist 😔</Card.Text>
                    <Button className={css.customButton}><NavLink to="/home">Go back home?</NavLink></Button>
                </Card.Body>
            </Card>
        </div>
        
        
    );
}
