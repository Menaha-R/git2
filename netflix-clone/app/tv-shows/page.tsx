import { NetflixHeader } from "@/components/netflix-header"
import { MovieRow } from "@/components/movie-row"

const tvShows = [
  {
    id: 1,
    title: "Stranger Things",
    image: "/stranger-things-inspired-poster.png",
    year: 2016,
    rating: "TV-14",
    genre: "Sci-Fi Drama",
  },
  {
    id: 2,
    title: "The Crown",
    image: "/the-crown-inspired-poster.png",
    year: 2016,
    rating: "TV-MA",
    genre: "Historical Drama",
  },
  {
    id: 3,
    title: "Wednesday",
    image: "/wednesday-addams-poster.png",
    year: 2022,
    rating: "TV-14",
    genre: "Comedy Horror",
  },
  {
    id: 4,
    title: "Ozark",
    image: "/ozark-inspired-poster.png",
    year: 2017,
    rating: "TV-MA",
    genre: "Crime Drama",
  },
  {
    id: 5,
    title: "The Witcher",
    image: "/witcher-inspired-poster.png",
    year: 2019,
    rating: "TV-MA",
    genre: "Fantasy",
  },
]

const categories = [
  { title: "Netflix Originals", shows: tvShows },
  { title: "Trending Now", shows: tvShows.slice(1) },
  { title: "Drama Series", shows: tvShows.slice(0, 3) },
  { title: "Sci-Fi & Fantasy", shows: [tvShows[0], tvShows[4]] },
  { title: "Crime Shows", shows: [tvShows[3]] },
]

export default function TVShowsPage() {
  return (
    <div className="min-h-screen bg-netflix-black">
      <NetflixHeader />

      <main className="pt-20">
        <div className="px-4 md:px-12 lg:px-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">TV Shows</h1>

          <div className="space-y-8">
            {categories.map((category, index) => (
              <MovieRow key={index} title={category.title} movies={category.shows} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
