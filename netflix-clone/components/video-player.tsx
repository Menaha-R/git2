"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, ArrowLeft, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface VideoPlayerProps {
  src: string
  title: string
  onBack?: () => void
}

export function VideoPlayer({ src, title, onBack }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isYouTube, setIsYouTube] = useState(false)

  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.preload = "auto"
    video.muted = false
    video.volume = 1

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => {
      console.log("[v0] Video duration loaded:", video.duration)
      setDuration(video.duration)
      setIsLoading(false)
      video.play().catch((error) => {
        console.log("[v0] Auto-play failed:", error)
      })
    }
    const handleError = (e: Event) => {
      console.log("[v0] Video error:", e)
      console.log("[v0] Video error details:", video.error)
      setHasError(true)
      setIsLoading(false)
      setIsPlaying(false)
    }
    const handleLoadStart = () => {
      console.log("[v0] Video load started for:", src)
      setIsLoading(true)
      setHasError(false)
    }
    const handleCanPlay = () => {
      console.log("[v0] Video can play")
      setIsLoading(false)
    }
    const handlePlay = () => {
      console.log("[v0] Video started playing")
      setIsPlaying(true)
    }
    const handlePause = () => {
      console.log("[v0] Video paused")
      setIsPlaying(false)
    }

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)
    video.addEventListener("error", handleError)
    video.addEventListener("loadstart", handleLoadStart)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)

    const isYouTubeUrl = src.includes("youtube.com") || src.includes("youtu.be")
    setIsYouTube(isYouTubeUrl)

    if (isYouTubeUrl) {
      setIsLoading(false)
      return
    }

    video.src = src
    video.load()

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
      video.removeEventListener("error", handleError)
      video.removeEventListener("loadstart", handleLoadStart)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
    }
  }, [src])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video || hasError) return

    console.log("[v0] Toggle play - current state:", isPlaying)
    console.log("[v0] Video readyState:", video.readyState)
    console.log("[v0] Video src:", video.src)

    if (isPlaying) {
      video.pause()
    } else {
      video.play().catch((error) => {
        console.log("[v0] Video play failed:", error)
        setHasError(true)
        setIsPlaying(false)
      })
    }
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newTime = (value[0] / 100) * duration
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0] / 100
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.volume = volume
      setIsMuted(false)
    } else {
      video.volume = 0
      setIsMuted(true)
    }
  }

  const toggleFullscreen = () => {
    const container = document.getElementById("video-container")
    if (!container) return

    if (!isFullscreen) {
      container.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const skip = (seconds: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds))
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false)
    }, 3000)
  }

  return (
    <div
      id="video-container"
      className="relative w-full h-screen bg-black group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {isYouTube ? (
        <iframe
          src={`${src}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={title}
        />
      ) : (
        <video ref={videoRef} src={src} className="w-full h-full object-contain" onClick={togglePlay} preload="auto" />
      )}

      {!isYouTube && hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-center text-white">
            <AlertCircle className="h-16 w-16 mx-auto mb-4 text-red-500" />
            <h2 className="text-2xl font-semibold mb-2">Video Unavailable</h2>
            <p className="text-gray-300 mb-4">This video cannot be played at the moment.</p>
            <Button
              onClick={onBack}
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black bg-transparent"
            >
              Go Back
            </Button>
          </div>
        </div>
      )}

      {!isYouTube && isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-xl">Loading video...</p>
          </div>
        </div>
      )}

      {!isYouTube && (
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          } ${hasError ? "hidden" : ""}`}
        >
          <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/20">
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <h1 className="text-white text-xl font-semibold">{title}</h1>
            </div>
          </div>

          {!isPlaying && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="h-20 w-20 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <Play className="h-10 w-10 fill-current" />
              </Button>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="mb-4">
              <Slider
                value={[duration ? (currentTime / duration) * 100 : 0]}
                onValueChange={handleSeek}
                className="w-full"
              />
              <div className="flex justify-between text-white text-sm mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => skip(-10)} className="text-white hover:bg-white/20">
                  <SkipBack className="h-6 w-6" />
                </Button>

                <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:bg-white/20">
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 fill-current" />}
                </Button>

                <Button variant="ghost" size="icon" onClick={() => skip(10)} className="text-white hover:bg-white/20">
                  <SkipForward className="h-6 w-6" />
                </Button>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/20">
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                  <div className="w-20">
                    <Slider value={[isMuted ? 0 : volume * 100]} onValueChange={handleVolumeChange} />
                  </div>
                </div>
              </div>

              <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
                <Maximize className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {isYouTube && (
        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/20 bg-black/50">
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-white text-xl font-semibold bg-black/50 px-4 py-2 rounded">{title}</h1>
          </div>
        </div>
      )}
    </div>
  )
}
