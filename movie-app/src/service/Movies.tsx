import React from "react";
import axios from 'axios'
import IMovie from "../models/IMovie";

const baseURL = process.env.REACT_APP_BASE_URL;


const getMovies = async (url:string) => {
    const response = await axios.get<IMovie[]>(`${baseURL}${url}`);
    return response.data;
}
const getMovieById = async (url:string, id:string) =>{
    const response = await axios.get<IMovie>(`${baseURL}${url}/${id}`);
    return response.data;
}
const getSearchMovies =async (url:string, movieTitle:string) => {
    const response = await axios.get<IMovie[]>(`${baseURL}${url}/?title_like=${movieTitle}`);  
    return response.data 
}
const postFavMovie = async(url:string, movie:IMovie) =>{
    return await axios.post<IMovie>(`${baseURL}/favourite`,movie )
}
const delFavMovie =async (id:string) => {
    return await axios.delete<IMovie>(`${baseURL}/favourite/${id}`);    
}

export {
    getSearchMovies, getMovies, getMovieById, postFavMovie, delFavMovie
}