"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, Check, Info, Share } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Movie {
  id: number
  title: string
  image: string
  year: string
  rating: string
}

interface MovieRowProps {
  title: string
  movies: Movie[]
}

export function MovieRow({ title, movies }: MovieRowProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null)
  const [watchlist, setWatchlist] = useState<number[]>([1, 3, 5]) // Mock initial watchlist
  const [likedMovies, setLikedMovies] = useState<number[]>([])
  const [showShareMenu, setShowShareMenu] = useState<number | null>(null)
  const router = useRouter()

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById(`row-${title}`)
    if (container) {
      const scrollAmount = 300
      const newPosition =
        direction === "left" ? Math.max(0, scrollPosition - scrollAmount) : scrollPosition + scrollAmount

      container.scrollTo({ left: newPosition, behavior: "smooth" })
      setScrollPosition(newPosition)
    }
  }

  const handlePlayMovie = (movieId: number) => {
    console.log(`[v0] Play button clicked for movie ${movieId}, navigating to /watch/${movieId}`)
    router.push(`/watch/${movieId}`)
  }

  const handleMoreInfo = (movieId: number) => {
    console.log(`[v0] More Info button clicked for movie ${movieId}`)
    router.push(`/movies/${movieId}`)
  }

  const toggleWatchlist = async (movieId: number) => {
    const isInWatchlist = watchlist.includes(movieId)

    try {
      if (isInWatchlist) {
        // Remove from watchlist
        const response = await fetch(`/api/watchlist?userId=user1&movieId=${movieId}`, {
          method: "DELETE",
        })
        if (response.ok) {
          setWatchlist((prev) => prev.filter((id) => id !== movieId))
        }
      } else {
        // Add to watchlist
        const response = await fetch("/api/watchlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: "user1", movieId }),
        })
        if (response.ok) {
          setWatchlist((prev) => [...prev, movieId])
        }
      }
    } catch (error) {
      console.error("Error updating watchlist:", error)
    }
  }

  const toggleLike = async (movieId: number) => {
    const isLiked = likedMovies.includes(movieId)

    try {
      if (isLiked) {
        // Remove like
        const response = await fetch(`/api/likes?userId=user1&movieId=${movieId}`, {
          method: "DELETE",
        })
        if (response.ok) {
          setLikedMovies((prev) => prev.filter((id) => id !== movieId))
          console.log(`[v0] Removed like for movie ${movieId}`)
        }
      } else {
        // Add like
        const response = await fetch("/api/likes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: "user1", movieId }),
        })
        if (response.ok) {
          setLikedMovies((prev) => [...prev, movieId])
          console.log(`[v0] Added like for movie ${movieId}`)
        }
      }
    } catch (error) {
      console.error("Error updating like:", error)
    }
  }

  const handleShare = async (movieId: number, movieTitle: string) => {
    const shareData = {
      title: movieTitle,
      text: `Check out ${movieTitle} on our Netflix clone!`,
      url: `${window.location.origin}/movies/${movieId}`,
    }

    try {
      // Check if Web Share API is supported and available
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        console.log(`[v0] Shared movie ${movieTitle} via native share`)
        return
      }
    } catch (error) {
      // If native sharing fails, fall through to clipboard fallback
      console.log(`[v0] Native share failed, falling back to clipboard`)
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(shareData.url)
      setShowShareMenu(movieId)
      setTimeout(() => setShowShareMenu(null), 2000)
      console.log(`[v0] Copied movie link to clipboard: ${shareData.url}`)
    } catch (clipboardError) {
      console.error("Error copying to clipboard:", clipboardError)
      // Final fallback: show the URL to user
      alert(`Share this movie: ${shareData.url}`)
    }
  }

  return (
    <div className="group relative">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 px-4 md:px-0">{title}</h2>

      <div className="relative">
        {/* Left Arrow */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Movie Container */}
        <div
          id={`row-${title}`}
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative flex-shrink-0 w-48 cursor-pointer transition-transform duration-300 hover:scale-105"
              onMouseEnter={() => setHoveredMovie(movie.id)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              <img
                src={movie.image || "/placeholder.svg"}
                alt={movie.title}
                className="w-full h-72 object-cover rounded-md"
              />

              {/* Hover Overlay */}
              {hoveredMovie === movie.id && (
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent rounded-md flex flex-col justify-end p-4">
                  <h3 className="font-semibold text-sm mb-2">{movie.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 bg-foreground text-background hover:bg-foreground/90"
                        onClick={() => handlePlayMovie(movie.id)}
                      >
                        <Play className="h-4 w-4 fill-current" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 bg-muted/50 hover:bg-muted/70"
                        onClick={() => toggleWatchlist(movie.id)}
                      >
                        {watchlist.includes(movie.id) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className={`h-8 w-8 bg-muted/50 hover:bg-muted/70 ${
                          likedMovies.includes(movie.id) ? "text-red-500" : ""
                        }`}
                        onClick={() => toggleLike(movie.id)}
                      >
                        <ThumbsUp className={`h-4 w-4 ${likedMovies.includes(movie.id) ? "fill-current" : ""}`} />
                      </Button>
                      <div className="relative">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 bg-muted/50 hover:bg-muted/70"
                          onClick={() => handleShare(movie.id, movie.title)}
                        >
                          <Share className="h-4 w-4" />
                        </Button>
                        {showShareMenu === movie.id && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-background border rounded-md px-2 py-1 text-xs shadow-lg whitespace-nowrap">
                            Link copied!
                          </div>
                        )}
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 bg-muted/50 hover:bg-muted/70"
                        onClick={() => handleMoreInfo(movie.id)}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {movie.year} • {movie.rating}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
