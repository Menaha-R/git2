"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { NetflixHeader } from "@/components/netflix-header"
import { Button } from "@/components/ui/button"
import { Play, X, Info } from "lucide-react"

interface Movie {
  id: number
  title: string
  description: string
  image: string
  year: string
  rating: string
  genre: string[]
  duration: string
}

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<number[]>([])
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchWatchlist()
  }, [])

  const fetchWatchlist = async () => {
    try {
      // Get watchlist movie IDs
      const watchlistResponse = await fetch("/api/watchlist?userId=user1")
      const watchlistData = await watchlistResponse.json()

      if (watchlistData.success) {
        setWatchlist(watchlistData.data)

        // Fetch movie details for each ID
        const moviePromises = watchlistData.data.map((id: number) =>
          fetch(`/api/movies/${id}`).then((res) => res.json()),
        )

        const movieResponses = await Promise.all(moviePromises)
        const movieDetails = movieResponses.filter((response) => response.success).map((response) => response.data)

        setMovies(movieDetails)
      }
    } catch (error) {
      console.error("Error fetching watchlist:", error)
    } finally {
      setLoading(false)
    }
  }

  const removeFromWatchlist = async (movieId: number) => {
    try {
      const response = await fetch(`/api/watchlist?userId=user1&movieId=${movieId}`, {
        method: "DELETE",
      })

      const data = await response.json()
      if (data.success) {
        setWatchlist((prev) => prev.filter((id) => id !== movieId))
        setMovies((prev) => prev.filter((movie) => movie.id !== movieId))
      }
    } catch (error) {
      console.error("Error removing from watchlist:", error)
    }
  }

  const handlePlay = (movieId: number) => {
    router.push(`/watch/${movieId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NetflixHeader />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center">Loading your watchlist...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <NetflixHeader />
      <div className="pt-20 px-4 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My List</h1>

          {movies.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-xl font-semibold mb-4">Your list is empty</h2>
              <p className="text-muted-foreground mb-6">Add movies and shows to your list to watch them later</p>
              <Button onClick={() => router.push("/")} className="bg-primary hover:bg-primary/90">
                Browse Movies
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <div key={movie.id} className="group relative">
                  <div className="relative aspect-[2/3] overflow-hidden rounded-md">
                    <img
                      src={movie.image || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Remove button */}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 bg-background/80 hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFromWatchlist(movie.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <h3 className="font-semibold text-sm mb-2">{movie.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Button
                          size="icon"
                          className="h-8 w-8 bg-foreground text-background hover:bg-foreground/90"
                          onClick={() => handlePlay(movie.id)}
                        >
                          <Play className="h-4 w-4 fill-current" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 bg-muted/50 hover:bg-muted/70">
                          <Info className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {movie.year} • {movie.rating} • {movie.duration}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
