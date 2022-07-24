import React, { useEffect, useState } from "react";
import IMovie from "../models/IMovie";
import { Alert, Button, Card } from 'react-bootstrap';
import RatingStars from "../commonComponents/RatingStars";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faHeart, faClose } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { paths } from '../constants/constants'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { delFavMovie, getMovies, postFavMovie } from "../service/Movies";

type Props = {
    Movie: IMovie,
    path: string
}

const MovieItem = ({ Movie, path }: Props) => {
    const [favouriteMovies, setfavouriteMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const Movies = await getMovies(paths.favourite);
            setfavouriteMovies(Movies);
        };
        fetchMovies();
    }, []);

    const navigate = useNavigate();
    let isFavourite: boolean = false;

    const setfavouriteButtons = () => {
        for (let i = 0; i < favouriteMovies.length; i++) {
            if (Movie.id === favouriteMovies[i].id) {
                isFavourite = true;
                break;
            }
        }
    }
    const AddtoFavourite = (Movie: IMovie) => {
        const match = favouriteMovies.find(
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
                ...favouriteMovies, Movie
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
        isFavourite=false;
        window.location.reload();

    }
    setfavouriteButtons();
    const MovieDetails = (Movie:IMovie) => {
        navigate(paths.details, { state: { id: 1, Movieid: Movie.id, path: path, isFavourite:isFavourite } });
    }
    return (
        <>
            <Card key={Movie.id} style={{ width: "250px" }} className="ms-5">
                <Card.Header className="text-truncate">
                    {Movie.title}
                </Card.Header>
                <Card.Img variant="top" className="img-thumbnail" style={{ height: "300px" }} alt={Movie.title} src={Movie.posterurl} />
                <Card.Body>
                    <RatingStars ratingValue={Movie.imdbRating} ratingNumber={Movie.ratings.length} maxStarCount={10}></RatingStars>
                    <div>
                        <Button variant="link" onClick={() => MovieDetails(Movie)}>
                            <FontAwesomeIcon icon={faInfoCircle} className="me-2"></FontAwesomeIcon>More info...</Button>
                    </div>
                </Card.Body>
                <Card.Footer>
                    {
                        isFavourite && (
                            <Button variant="link" onClick={() => RemovefromFavourite(Movie.id)}>Remove from Favourites
                                <FontAwesomeIcon icon={faClose} style={{ color: "black" }} className="ms-2"></FontAwesomeIcon>
                            </Button>
                        )
                    }
                    {
                        !isFavourite && (
                            <Button variant="link" onClick={() => AddtoFavourite(Movie)}>Add to Favourites
                                <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} className="ms-2"></FontAwesomeIcon>
                            </Button>
                        )
                    }
                </Card.Footer>
            </Card>

        </>
    )
}
export default MovieItem