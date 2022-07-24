import React from "react";
import { Container, Navbar, Nav, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faMobile, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { paths } from "../constants/constants";

import LoadingIndicator from '../commonComponents/LoadingIndicator'

const Home = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand href="/"><FontAwesomeIcon icon={faFilm} className="me-2"></FontAwesomeIcon>Movies</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href={paths.inTheater}>Movies in Theaters</Nav.Link>
                            <Nav.Link href={paths.comingSoon}>Coming Soon</Nav.Link>
                            <Nav.Link href={paths.topratedIndian}>Top Rated Indian</Nav.Link>
                            <Nav.Link href={paths.topratedMovies}>Top Rated Movies</Nav.Link>
                            <Nav.Link href={paths.favourite}>Favourite</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="my-5">
                <LoadingIndicator size="small" message="This is My Movie Application Project..." />
                <hr></hr>
                <div>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={'./images/Reducednew.jpg'} />
                        <Card.Body>
                            <Card.Text>
                                Veejay M Kummar
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <div><FontAwesomeIcon icon={faEnvelope} className="me-2"></FontAwesomeIcon>: veejaymkummar@gmail.com</div>
                            <div><FontAwesomeIcon icon={faMobile} className="me-2"></FontAwesomeIcon>: +91 9880323360</div>
                        </Card.Footer>
                    </Card>
                </div>
            </Container>
        </>
    )
}
export default Home