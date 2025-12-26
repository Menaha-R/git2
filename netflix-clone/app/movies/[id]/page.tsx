"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Play, Plus, Check, ThumbsUp, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AuthGuard } from "@/components/auth-guard"

interface Movie {
  id: number
  title: string
  description: string
  image: string
  year: string
  rating: string
  genre: string[]
  duration: string
  category: string
  videoSrc: string
  cast: string[]
  director?: string
  writer?: string
  imdbRating?: string
}

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([])
  const router = useRouter()
  const params = useParams()
  const movieId = params.id as string

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        console.log(`[v0] Fetching movie details for ID: ${movieId}`)
        const response = await fetch(`/api/movies/${movieId}`)

        if (!response.ok) {
          throw new Error(`Movie not found: ${response.status}`)
        }

        const movieData = await response.json()
        console.log("[v0] Movie details received:", movieData)

        if (movieData.success && movieData.data) {
          setMovie(movieData.data)

          // Fetch similar movies from the same genre/category
          const allMoviesResponse = await fetch("/api/movies")
          if (allMoviesResponse.ok) {
            const allMoviesData = await allMoviesResponse.json()
            if (allMoviesData.success) {
              const similar = allMoviesData.data
                .filter(
                  (m: Movie) =>
                    m.id !== movieData.data.id &&
                    (m.genre.some((g: string) => movieData.data.genre.includes(g)) ||
                      m.category === movieData.data.category),
                )
                .slice(0, 6)
              setSimilarMovies(similar)
            }
          }
        } else {
          throw new Error("Invalid movie data format")
        }
      } catch (error) {
        console.error("[v0] Error fetching movie:", error)
        setError(error instanceof Error ? error.message : "Failed to load movie")
      } finally {
        setLoading(false)
      }
    }

    if (movieId) {
      fetchMovie()
    }
  }, [movieId])

  const handlePlay = () => {
    if (movie) {
      console.log(`[v0] Play button clicked for movie ${movie.id}`)
      router.push(`/watch/${movie.id}`)
    }
  }

  const handleBack = () => {
    router.back()
  }

  const toggleWatchlist = async () => {
    if (!movie) return

    try {
      if (isInWatchlist) {
        const response = await fetch(`/api/watchlist?userId=user1&movieId=${movie.id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          setIsInWatchlist(false)
        }
      } else {
        const response = await fetch("/api/watchlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: "user1", movieId: movie.id }),
        })
        if (response.ok) {
          setIsInWatchlist(true)
        }
      }
    } catch (error) {
      console.error("Error updating watchlist:", error)
    }
  }

  const toggleLike = async () => {
    if (!movie) return

    try {
      if (isLiked) {
        // Remove like
        const response = await fetch(`/api/likes?userId=user1&movieId=${movie.id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          setIsLiked(false)
          console.log(`[v0] Removed like for movie ${movie.id}`)
        }
      } else {
        // Add like
        const response = await fetch("/api/likes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: "user1", movieId: movie.id }),
        })
        if (response.ok) {
          setIsLiked(true)
          console.log(`[v0] Added like for movie ${movie.id}`)
        }
      }
    } catch (error) {
      console.error("Error updating like:", error)
    }
  }

  const handleShare = async () => {
    if (!movie) return

    const shareData = {
      title: movie.title,
      text: `Check out ${movie.title} - ${movie.description.substring(0, 100)}...`,
      url: window.location.href,
    }

    try {
      // Check if Web Share API is supported and available
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        console.log(`[v0] Shared movie ${movie.title} via native share`)
        return
      }
    } catch (error) {
      console.log(`[v0] Native share failed, falling back to clipboard: ${error}`)
    }

    // Fallback: always copy to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href)
      setShowShareMenu(true)
      setTimeout(() => setShowShareMenu(false), 2000)
      console.log(`[v0] Copied movie link to clipboard`)
    } catch (clipboardError) {
      console.error("Error copying to clipboard:", clipboardError)
      // Final fallback: show the URL in an alert
      alert(`Share this movie: ${window.location.href}`)
    }
  }

  const handleSimilarMovieClick = (movieId: number) => {
    router.push(`/movies/${movieId}`)
  }

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading movie details...</p>
          </div>
        </div>
      </AuthGuard>
    )
  }

  if (error || !movie) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Movie Not Found</h1>
            <p className="text-muted-foreground mb-6">{error || "The requested movie could not be found."}</p>
            <Button onClick={handleBack}>Go Back</Button>
          </div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative h-screen">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${movie.image}')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          {/* Back Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-6 left-6 z-20 bg-background/20 hover:bg-background/40"
            onClick={handleBack}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>

          {/* Content */}
          <div className="relative z-10 px-6 md:px-12 flex items-center h-full">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>

              {/* Movie Info */}
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="secondary">{movie.rating}</Badge>
                <span className="text-muted-foreground">{movie.year}</span>
                <span className="text-muted-foreground">{movie.duration}</span>
                {movie.imdbRating && (
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-muted-foreground">{movie.imdbRating}</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              <div className="flex gap-2 mb-6">
                {movie.genre.map((g) => (
                  <Badge key={g} variant="outline">
                    {g}
                  </Badge>
                ))}
              </div>

              <p className="text-lg md:text-xl mb-8 text-muted-foreground leading-relaxed">{movie.description}</p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 flex items-center gap-2"
                  onClick={handlePlay}
                >
                  <Play className="h-5 w-5 fill-current" />
                  Play
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-muted/50 text-foreground hover:bg-muted/70 flex items-center gap-2"
                  onClick={toggleWatchlist}
                >
                  {isInWatchlist ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  {isInWatchlist ? "In My List" : "Add to My List"}
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className={`bg-muted/20 hover:bg-muted/40 flex items-center gap-2 ${isLiked ? "text-red-500" : ""}`}
                  onClick={toggleLike}
                >
                  <ThumbsUp className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                  {isLiked ? "Liked" : "Like"}
                </Button>
                <div className="relative">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="bg-muted/20 hover:bg-muted/40 flex items-center gap-2"
                    onClick={handleShare}
                  >
                    <Share className="h-5 w-5" />
                    Share
                  </Button>
                  {showShareMenu && (
                    <div className="absolute top-full left-0 mt-2 bg-background border rounded-md px-3 py-2 text-sm shadow-lg">
                      Link copied to clipboard!
                    </div>
                  )}
                </div>
              </div>

              {/* Cast */}
              {movie.cast && movie.cast.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Cast</h3>
                  <p className="text-muted-foreground">{movie.cast.join(", ")}</p>
                </div>
              )}

              {/* Director & Writer */}
              {(movie.director || movie.writer) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {movie.director && (
                    <div>
                      <h4 className="font-semibold">Director</h4>
                      <p className="text-muted-foreground">{movie.director}</p>
                    </div>
                  )}
                  {movie.writer && (
                    <div>
                      <h4 className="font-semibold">Writer</h4>
                      <p className="text-muted-foreground">{movie.writer}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Movies Section */}
        {similarMovies.length > 0 && (
          <div className="px-6 md:px-12 py-12">
            <h2 className="text-2xl font-bold mb-6">More Like This</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {similarMovies.map((similarMovie) => (
                <div
                  key={similarMovie.id}
                  className="cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handleSimilarMovieClick(similarMovie.id)}
                >
                  <img
                    src={similarMovie.image || "/placeholder.svg"}
                    alt={similarMovie.title}
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                  <h3 className="font-semibold text-sm mb-1">{similarMovie.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    {similarMovie.year} • {similarMovie.rating}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  )
}
