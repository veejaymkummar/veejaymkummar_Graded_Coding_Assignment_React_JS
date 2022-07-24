import React from "react";
import { Col } from "react-bootstrap";
import IMovie from "../models/IMovie";
import MovieItem from './MovieItem';

type Props = {
    movies: IMovie[];
    path: string;
}
const MovieList = ({ movies, path }: Props) => {
    return (
        <>
            {
                movies.map(
                    (movie, idx) => (
                        <Col key={idx}>
                            <MovieItem Movie={movie} path={path}></MovieItem>
                        </Col>
                    ))
            }
        </>
    );
}
export default MovieList;