import { useState } from "react";

const useBookingState = () => {
    const [movies, setMovies] = useState({});

    const initializeMovie = (initialData) => {
        setMovies(initialData)
    }


    return {
        movies,
        initializeMovie,
    }
}

export default useBookingState;