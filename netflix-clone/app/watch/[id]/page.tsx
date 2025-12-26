"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { VideoPlayer } from "@/components/video-player"

interface Movie {
  id: number
  title: string
  videoSrc: string
  description: string
}

export default function WatchPage() {
  const params = useParams()
  const router = useRouter()
  const movieId = params.id as string
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        console.log("[v0] Fetching movie with ID:", movieId)
        const response = await fetch(`/api/movies/${movieId}`)

        if (!response.ok) {
          throw new Error(`Movie not found: ${response.status}`)
        }

        const movieData = await response.json()
        console.log("[v0] Movie data received:", movieData)
        if (movieData.success && movieData.data) {
          console.log("[v0] Setting movie data:", movieData.data)
          console.log("[v0] Video source:", movieData.data.videoSrc)
          setMovie(movieData.data)
        } else {
          throw new Error("Invalid movie data format")
        }
      } catch (err) {
        console.error("[v0] Error fetching movie:", err)
        setError(err instanceof Error ? err.message : "Failed to load movie")
      } finally {
        setLoading(false)
      }
    }

    if (movieId) {
      fetchMovie()
    }
  }, [movieId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading movie...</p>
        </div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
          >
            Go back to home
          </button>
        </div>
      </div>
    )
  }

  return <VideoPlayer src={movie.videoSrc} title={movie.title} onBack={() => router.push("/")} />
}
