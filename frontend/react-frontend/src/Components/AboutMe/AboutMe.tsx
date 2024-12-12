import css from "./AboutMe.module.css";
import { Card, ListGroup } from "react-bootstrap";
import img from "../../Assets/Images/me.jpg"

export function AboutMe(): JSX.Element {
    return (
        <div className={css.AboutMe}>

            <Card className={css.moveCard} style={{ width: '40%', border: "1px solid black" }}>
                <Card.Img variant="top" src={img} />
                <Card.Body className={css.btnPriority}>
                <h1>About Me</h1>

                <Card.Text>My name is Jonathan and I'm a 24 year old python fullstack course student</Card.Text>
                <Card.Text>In times where I don't program, I like to hang out with friends, play the guitar and follow the current news and events. If theres a concert near me I'm there!</Card.Text>
                <Card.Text>This website was done as a part of my final assignment in the course. Iv'e learned to use JWT authentication and deepened my understanding of Django Rest Frameworks and ReactJS</Card.Text>
                <Card.Text>Hope you enjoy the website and remember: "The philosophers have only interpreted the world, in various ways; the point, however, is to change it". Go do something today.</Card.Text>


                <hr />
                <Card.Title>Known Technologies:</Card.Title>
                <br />
                <Card.Title>Programming Languages</Card.Title>


                <ListGroup as="ol" numbered>
                    <ListGroup.Item as="li">Python</ListGroup.Item>
                    <ListGroup.Item as="li">JavaScript</ListGroup.Item>
                    <ListGroup.Item as="li">TypeScript</ListGroup.Item>
                </ListGroup>

                <Card.Title>Frameworks and Notable Libraries</Card.Title>

                <ListGroup as="ol" numbered>
                    <ListGroup.Item as="li">Django</ListGroup.Item>
                    <ListGroup.Item as="li">Flask</ListGroup.Item>
                    <ListGroup.Item as="li">ReactJS</ListGroup.Item>
                </ListGroup>

                <Card.Title>Accomplishments</Card.Title>

                <ListGroup>
                    <ListGroup.Item as="li">Part of a hackathon team that won joint first place as part of my physics major.</ListGroup.Item>
                    <ListGroup.Item as="li">Former Classical guitar player for the Kfar Saba conservatory.</ListGroup.Item>
                    <ListGroup.Item as="li">Former fencing competitor with a 3rd place finish.</ListGroup.Item>
                </ListGroup>
                                    

                </Card.Body>
            </Card>

			
        </div>
    );
}
