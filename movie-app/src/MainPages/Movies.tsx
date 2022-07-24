import React, { useState, useEffect, useRef, Component } from "react";
import { paths } from "../constants/constants";
import IMovie from '../models/IMovie';
import { getMovies } from "../service/Movies";
import { Container, Alert, Row, Navbar, Nav, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilm } from '@fortawesome/free-solid-svg-icons';
import LoadingIndicator from '../commonComponents/LoadingIndicator'
import MovieList from '../movieComponents/MovieList';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'

type Props = {
    path: string
}
const Movies = ({ path }: Props) => {
    const location = useLocation();
    let id: any = location.state;
    const searchRef = useRef<HTMLInputElement>(null);
    const [Movies, setMovies] = useState<IMovie[]>([] as IMovie[]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    let HeaderText: string = '';
    const setHeaderText = () => {
        switch (path) {
            case paths.home: {
                HeaderText = "Welcome to My Movie App!!!"
                break;
            }
            case paths.inTheater: {
                HeaderText = "Movies in Theaters"
                break;
            }
            case paths.comingSoon: {
                HeaderText = "Coming Soon ...."
                break;
            }
            case paths.topratedIndian: {
                HeaderText = "Top Rated Indian Movies..."
                break;
            }
            case paths.topratedMovies: {
                HeaderText = "Top Rated Movies..."
                break;
            }
            case paths.favourite: {
                HeaderText = "My Favourites";
                break;
            }
        }
    }
    setHeaderText();
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                switch (path) {
                    case paths.inTheater: {
                        const Movies = await getMovies(path);
                        setMovies(Movies);
                        break;
                    }
                    case paths.comingSoon: {
                        const Movies = await getMovies(path);
                        setMovies(Movies);
                        break;
                    }
                    case paths.topratedIndian: {
                        const Movies = await getMovies(path);
                        setMovies(Movies);
                        break;
                    }
                    case paths.topratedMovies: {
                        const Movies = await getMovies(path);
                        setMovies(Movies);
                        break;
                    }
                    case paths.favourite: {
                        const Movies = await getMovies(path);
                        setMovies(Movies);
                        break;
                    }
                }
            }
            catch (error) {
                setError(error as Error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);
    const Search = (searchString: string) => {
        if (searchString.length > 0) {
            const filterResult: IMovie[] = Movies.filter(movie => movie.title.includes(searchString))
            setMovies(filterResult);
        }
        else { window.location.reload() }
    }

    return (
        <>
            {
                loading && (
                    <Container>
                        <LoadingIndicator size="large" message="Loading Movies..." />
                    </Container>
                )
            }
            {
                !loading && error && (
                    <Container>
                        <Alert variant="danger">{error.message}</Alert>
                    </Container>
                )
            }
            {
                !loading && !error &&
                (<>
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
                                <Form className="d-flex">
                                    <input type="text" placeholder="Search" ref={searchRef} onChange={() => Search(searchRef.current?.value as string)}></input>
                                    <Button variant="primary disabled"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></Button>
                                </Form>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Container>
                        <h1>{HeaderText}</h1>
                        <hr></hr>
                        <Row xs={1} md={3} lg={4} className="g-4">
                            <MovieList movies={Movies} path={path}></MovieList>
                        </Row>
                    </Container> <ToastContainer />
                </>
                )
            }
        </ >
    )
}
export default Movies;