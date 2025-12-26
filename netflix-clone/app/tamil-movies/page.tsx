"use client"

import { useState, useEffect } from "react"
import { NetflixHeader } from "@/components/netflix-header"
import { MovieRow } from "@/components/movie-row"
import { AuthGuard } from "@/components/auth-guard"

interface Movie {
  id: number
  title: string
  image: string
  year: string
  rating: string
}

export default function TamilMoviesPage() {
  const [tamilMovies, setTamilMovies] = useState<Movie[]>([])
  const [actionMovies, setActionMovies] = useState<Movie[]>([])
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTamilMovies()
  }, [])

  const fetchTamilMovies = async () => {
    try {
      // Fetch all Tamil movies
      const response = await fetch("/api/movies?category=tamil")
      const data = await response.json()

      if (data.success) {
        setTamilMovies(data.data)

        // Filter by genres
        setActionMovies(data.data.filter((movie: any) => movie.genre.includes("Action")))
        setDramaMovies(data.data.filter((movie: any) => movie.genre.includes("Drama")))
      }
    } catch (error) {
      console.error("Error fetching Tamil movies:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background">
          <NetflixHeader />
          <div className="pt-20 flex items-center justify-center">
            <div className="text-center">Loading Tamil movies...</div>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <NetflixHeader />

        {/* Hero Section */}
        <div className="relative h-[70vh] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/rrr-tamil-poster.png')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl px-4 md:px-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Tamil Cinema</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Experience the best of Tamil movies - from epic blockbusters to intimate dramas, featuring the biggest
              stars and most acclaimed directors of Tamil cinema.
            </p>
          </div>
        </div>

        {/* Movie Sections */}
        <div className="px-4 md:px-12 pb-20 space-y-8">
          <MovieRow title="Popular Tamil Movies" movies={tamilMovies} />
          <MovieRow title="Tamil Action Movies" movies={actionMovies} />
          <MovieRow title="Tamil Drama Movies" movies={dramaMovies} />
        </div>
      </div>
    </AuthGuard>
  )
}
