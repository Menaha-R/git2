import { NetflixHeader } from "@/components/netflix-header"
import { MovieRow } from "@/components/movie-row"

const newAndPopular = [
  {
    id: 11,
    title: "Glass Onion",
    image: "/glass-onion-poster.png",
    year: 2022,
    rating: "PG-13",
    genre: "Mystery",
  },
  {
    id: 12,
    title: "Red Notice",
    image: "/red-notice-poster.png",
    year: 2021,
    rating: "PG-13",
    genre: "Action Comedy",
  },
  {
    id: 13,
    title: "Don't Look Up",
    image: "/generic-sci-fi-thriller-poster.png",
    year: 2021,
    rating: "R",
    genre: "Comedy Drama",
  },
  {
    id: 14,
    title: "The Adam Project",
    image: "/adam-project-poster.png",
    year: 2022,
    rating: "PG-13",
    genre: "Sci-Fi Adventure",
  },
  {
    id: 15,
    title: "Enola Holmes 2",
    image: "/enola-holmes-2-poster.png",
    year: 2022,
    rating: "PG-13",
    genre: "Mystery Adventure",
  },
]

const categories = [
  { title: "New Releases", movies: newAndPopular },
  { title: "Trending Now", movies: newAndPopular.slice(1) },
  { title: "Top 10 in Your Country", movies: newAndPopular.slice(0, 3) },
  { title: "Popular on Netflix", movies: newAndPopular.slice(2) },
  { title: "Worth the Wait", movies: [newAndPopular[0], newAndPopular[4]] },
]

export default function NewPopularPage() {
  return (
    <div className="min-h-screen bg-netflix-black">
      <NetflixHeader />

      <main className="pt-20">
        <div className="px-4 md:px-12 lg:px-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">New & Popular</h1>

          <div className="space-y-8">
            {categories.map((category, index) => (
              <MovieRow key={index} title={category.title} movies={category.movies} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
