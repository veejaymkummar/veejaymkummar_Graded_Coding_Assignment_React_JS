import React, { useState, useEffect } from "react";
import { Container, Alert, Button, Row, Col, Card, Table, Navbar, Nav } from "react-bootstrap";
import IMovie from '../models/IMovie';
import { paths } from '../constants/constants';
import { getMovieById, getMovies, postFavMovie, delFavMovie } from "../service/Movies";
import LoadingIndicator from '../commonComponents/LoadingIndicator';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faFilm, faClose } from '@fortawesome/free-solid-svg-icons';
import Rating from '../commonComponents/RatingStars';
import { toast } from "react-toastify";


const MovieDetails = () => {
    const [Movie, setMovie] = useState<IMovie | null>(null);
    const [favouriteMovies, setfavouriteMovies] = useState<IMovie[] | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const location = useLocation();
    const navigate = useNavigate();
    let MovieState: any = location.state;
    const id = MovieState.Movieid;
    const path = MovieState.path;
    let isFavourite = MovieState.isFavourite;
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const favouriteMovies = await getMovies(paths.favourite);
                setfavouriteMovies(favouriteMovies);
                switch (path) {
                    case paths.inTheater: {
                        const Movie = await getMovieById(path, id);
                        setMovie(Movie);
                        break;
                    }
                    case paths.comingSoon: {
                        const Movie = await getMovieById(path, id);
                        setMovie(Movie);
                        break;
                    }
                    case paths.topratedIndian: {
                        const Movie = await getMovieById(path, id);
                        setMovie(Movie);
                        break;
                    }
                    case paths.topratedMovies: {
                        const Movie = await getMovieById(path, id);
                        setMovie(Movie);
                        break;
                    }
                    case paths.favourite: {
                        const Movie = await getMovieById(path, id);
                        setMovie(Movie);
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

    const goBack = () => {
        navigate(-1);
    }
    const AddtoFavourite = (Movie: IMovie) => {
        const match = favouriteMovies?.find(
            ({ id }) => id === Movie.id
        )
        if (match) {
            console.log("Found")
            toast.error('Movie already in favourites', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0
            })
        }
        else {
            console.log("Not Found")
            setfavouriteMovies([
                ...favouriteMovies!, Movie
            ])
            toast.success('Movie added to favourites', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: 0
            })
            postFavMovie(path, Movie);
        }
    }
    const RemovefromFavourite = (id: string) => {
        delFavMovie(id);
        alert("Movie Removed from Favourites");
        isFavourite = false;
        window.location.reload();
        navigate(-1);
    }

    return (
        <>
            {
                loading && (
                    <Container className="my-5">
                        <LoadingIndicator size="large" message="Loading Movies..." />
                    </Container>
                )
            }
            {
                !loading && error && (
                    <Container className="my-5">
                        <Alert variant="danger">{error.message}</Alert>
                    </Container>
                )
            }
            {
                !loading && !error && (
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
                                    </Nav> <Button className="btn" variant="primary" onClick={goBack}>Go Back</Button>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                        <hr></hr>
                        <Container className="my-5">
                            <Row>
                                <Col xs={12} sm={12} md={6} lg={3}>
                                    <Card key={Movie?.id}>
                                        <Card.Header className="text-truncate">
                                            {Movie?.title}
                                        </Card.Header>
                                        <Card.Img variant="top" className="img-thumbnail" style={{ height: "300px" }} alt={Movie?.title} src={Movie?.posterurl} />
                                        <Card.Body>
                                            <Rating maxStarCount={10} ratingNumber={Movie?.ratings.length!} ratingValue={Movie?.imdbRating!} ></Rating>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col xs={12} sm={12} md={6} lg={9}>
                                    <Row>
                                        <Table striped bordered hover>
                                            <tbody>
                                                <tr>
                                                    <td className="text-nowrap">imdb Rating</td>
                                                    <td>{Movie?.imdbRating}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-nowrap">Content Rating</td>
                                                    <td>{Movie?.contentRating}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-nowrap">Average Rating</td>
                                                    <td>{Movie?.averageRating}</td>
                                                </tr>
                                                <tr>
                                                    <td>Duration</td>
                                                    <td>{Movie?.duration}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-nowrap">Genres</td>
                                                    <td>{Movie?.genres}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-nowrap">Actors</td>
                                                    <td>{Movie?.actors}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-nowrap">Release Date</td>
                                                    <td>{Movie?.releaseDate}</td>
                                                </tr>
                                                <tr>
                                                    <td>Story Line</td>
                                                    <td>{Movie?.storyline}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </>
                )
            }
        </>
    )
}

export default MovieDetails;