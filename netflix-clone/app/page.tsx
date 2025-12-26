import { NetflixHeader } from "@/components/netflix-header"
import { HeroSection } from "@/components/hero-section"
import { MovieRow } from "@/components/movie-row"
import { AuthGuard } from "@/components/auth-guard"

// Mock movie data
const trendingMovies = [
  {
    id: 1,
    title: "Stranger Things",
    image: "/stranger-things-inspired-poster.png",
    year: "2023",
    rating: "TV-14",
  },
  {
    id: 2,
    title: "The Crown",
    image: "/the-crown-inspired-poster.png",
    year: "2023",
    rating: "TV-MA",
  },
  {
    id: 3,
    title: "Wednesday",
    image: "/wednesday-addams-poster.png",
    year: "2022",
    rating: "TV-14",
  },
  {
    id: 4,
    title: "Ozark",
    image: "/ozark-inspired-poster.png",
    year: "2022",
    rating: "TV-MA",
  },
  {
    id: 5,
    title: "The Witcher",
    image: "/witcher-inspired-poster.png",
    year: "2023",
    rating: "TV-MA",
  },
  {
    id: 6,
    title: "Bridgerton",
    image: "/bridgerton-inspired-poster.png",
    year: "2022",
    rating: "TV-MA",
  },
]

const actionMovies = [
  {
    id: 7,
    title: "Extraction",
    image: "/generic-action-movie-poster.png",
    year: "2023",
    rating: "R",
  },
  {
    id: 8,
    title: "Red Notice",
    image: "/red-notice-inspired-poster.png",
    year: "2021",
    rating: "PG-13",
  },
  {
    id: 9,
    title: "6 Underground",
    image: "/6-underground-poster.png",
    year: "2019",
    rating: "R",
  },
  {
    id: 10,
    title: "The Gray Man",
    image: "/the-gray-man-poster.png",
    year: "2022",
    rating: "PG-13",
  },
  {
    id: 11,
    title: "Army of the Dead",
    image: "/army-of-the-dead-poster.png",
    year: "2021",
    rating: "R",
  },
  {
    id: 12,
    title: "Thunder Force",
    image: "/thunder-force-poster.png",
    year: "2021",
    rating: "PG-13",
  },
]

const comedyMovies = [
  {
    id: 13,
    title: "Murder Mystery",
    image: "/murder-mystery-poster.png",
    year: "2023",
    rating: "PG-13",
  },
  {
    id: 15,
    title: "Enola Holmes",
    image: "/enola-holmes-poster.png",
    year: "2022",
    rating: "PG-13",
  },
  {
    id: 16,
    title: "The Half of It",
    image: "/the-half-of-it-poster.png",
    year: "2020",
    rating: "PG-13",
  },
  {
    id: 17,
    title: "Always Be My Maybe",
    image: "/placeholder.svg?height=300&width=200",
    year: "2019",
    rating: "TV-14",
  },
  {
    id: 18,
    title: "Set It Up",
    image: "/placeholder.svg?height=300&width=200",
    year: "2018",
    rating: "TV-14",
  },
]

export default function HomePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <NetflixHeader />
        <HeroSection />
        <div className="px-4 md:px-12 pb-20 space-y-8">
          <MovieRow title="Trending Now" movies={trendingMovies} />
          <MovieRow title="Action & Adventure" movies={actionMovies} />
          <MovieRow title="Comedy Movies" movies={comedyMovies} />
        </div>
      </div>
    </AuthGuard>
  )
}
