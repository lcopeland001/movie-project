import {createContext, useState, useEffect, useContext} from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])
    
    // Get favorites from local storage
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")

        if (storedFavs) setFavorites(JSON.parse(storedFavs)) 
    }, [])

    // Update page with new favorites in local storage
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    return <MovieContext.Provider>
        {children}
    </MovieContext.Provider>
}

