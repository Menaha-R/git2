"use client"

import { useRouter } from "next/navigation"
import { Play, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const router = useRouter()

  const handlePlay = () => {
    console.log("[v0] Play button clicked, navigating to /watch/1")
    router.push("/watch/1") // Navigate to Stranger Things
  }

  const handleMoreInfo = () => {
    console.log("[v0] More Info button clicked, navigating to movie details")
    // Navigate to a movie details page or show modal
    router.push("/movies/1") // Navigate to movie details
  }

  return (
    <div className="relative h-screen flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/stranger-things-inspired-poster.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-12 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Stranger Things</h1>
        <p className="text-lg md:text-xl mb-6 text-muted-foreground">
          When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying
          supernatural forces, and one strange little girl.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
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
            onClick={handleMoreInfo}
          >
            <Info className="h-5 w-5" />
            More Info
          </Button>
        </div>
      </div>
    </div>
  )
}
