import { NetflixHeader } from "@/components/netflix-header"
import { MovieRow } from "@/components/movie-row"

const movies = [
  {
    id: 6,
    title: "The Dark Knight",
    image: "/dark-knight-poster.png",
    year: 2008,
    rating: "PG-13",
    genre: "Action",
  },
  {
    id: 7,
    title: "Inception",
    image: "/inception-movie-poster.png",
    year: 2010,
    rating: "PG-13",
    genre: "Sci-Fi",
  },
  {
    id: 8,
    title: "Interstellar",
    image: "/interstellar-inspired-poster.png",
    year: 2014,
    rating: "PG-13",
    genre: "Sci-Fi Drama",
  },
  {
    id: 9,
    title: "The Matrix",
    image: "/matrix-movie-poster.png",
    year: 1999,
    rating: "R",
    genre: "Action Sci-Fi",
  },
  {
    id: 10,
    title: "Pulp Fiction",
    image: "/pulp-fiction-poster.png",
    year: 1994,
    rating: "R",
    genre: "Crime Drama",
  },
]

const categories = [
  { title: "Netflix Movies", movies: movies },
  { title: "Action & Adventure", movies: movies.slice(0, 3) },
  { title: "Sci-Fi Movies", movies: [movies[1], movies[2], movies[3]] },
  { title: "Crime Thrillers", movies: [movies[4]] },
  { title: "Award Winners", movies: movies.slice(1, 4) },
]

export default function MoviesPage() {
  return (
    <div className="min-h-screen bg-netflix-black">
      <NetflixHeader />

      <main className="pt-20">
        <div className="px-4 md:px-12 lg:px-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Movies</h1>

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
