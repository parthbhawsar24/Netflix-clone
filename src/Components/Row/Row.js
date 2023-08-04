import React, { useEffect, useState } from 'react'
import axios from '../Services/axios';
import "./Row.css";
// import YouTube from 'react-youtube';
// import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl }) {

    const [movies, setMovies] = useState();
    // const [trailerUrl, setTrailerUrl] = useState("");
    const [divVisible, setDivVisible] = useState(false);
    const [singleMovie, setSingleMovie] = useState({});
    console.log(singleMovie);

    useEffect(() => {

        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    // console.log(movies);

    // const opts = {
    //     height: "390",
    //     width: "100%",
    //     playerVars: {
    //         autoplay: 1,
    //     },
    // };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    const toggleDiv = (movie) => {
        setDivVisible(!divVisible);
        if (movie !== undefined) {
            setSingleMovie(movie);
        }
        else {
            setSingleMovie("");
        }
    };

    // const handleClick = (movie) => {
    // if (trailerUrl) {
    //     setTrailerUrl('');
    // } else {
    //     movieTrailer(movie?.name || movie?.overview)
    //         .then(url => {
    //             const urlParams = new URLSearchParams(new URL(url).search);
    //             setTrailerUrl(urlParams.get("v"));
    //         })
    //         .catch(error => console.log(error));
    // }
    // }

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies?.map(movie => (
                    <> <img
                        key={movie.id}
                        onClick={() => toggleDiv(movie)}
                        className="row__poster"
                        src={`${base_url}${movie.poster_path}`}
                        alt={movie.name} ></img>
                    </>
                ))}
            </div>
            {/* {trailerUrl && movies.overview && <YouTube videoId={trailerUrl} opts={opts} />} */}
            {divVisible && (
                <div
                    className="drawer__bg"
                    style={{
                        backgroundImage: `url("https://image.tmdb.org/t/p/original/${singleMovie?.backdrop_path}")`,
                    }}
                >
                    <div className="drawer__content">
                        <img
                            key={singleMovie.id}
                            className="drawer__poster"
                            src={`${base_url}${singleMovie.backdrop_path}`}
                            alt={singleMovie.name} ></img>
                        <div className="drawer__text">
                            <h1>{singleMovie?.title || singleMovie?.name || singleMovie?.original_name}</h1>
                            <section><b>OverView :</b> {singleMovie.overview}</section>
                            <h4>Release Date: {singleMovie.release_date ? formatDate(singleMovie.release_date) : "-"}</h4>
                            <h4>Rating: <span className="fa fa-star checked"></span> {singleMovie.vote_average ? singleMovie.vote_average : "-"}</h4>
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}

export default Row