"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { NetflixHeader } from "@/components/netflix-header"
import { Search, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

const allContent = [
  {
    id: 1,
    title: "Stranger Things",
    image: "/stranger-things-inspired-poster.png",
    year: 2016,
    rating: "TV-14",
    genre: "Sci-Fi Drama",
    type: "TV Show",
  },
  {
    id: 2,
    title: "The Crown",
    image: "/the-crown-inspired-poster.png",
    year: 2016,
    rating: "TV-MA",
    genre: "Historical Drama",
    type: "TV Show",
  },
  {
    id: 3,
    title: "Wednesday",
    image: "/wednesday-addams-poster.png",
    year: 2022,
    rating: "TV-14",
    genre: "Comedy Horror",
    type: "TV Show",
  },
  {
    id: 6,
    title: "The Dark Knight",
    image: "/dark-knight-poster.png",
    year: 2008,
    rating: "PG-13",
    genre: "Action",
    type: "Movie",
  },
  {
    id: 7,
    title: "Inception",
    image: "/inception-movie-poster.png",
    year: 2010,
    rating: "PG-13",
    genre: "Sci-Fi",
    type: "Movie",
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState(allContent)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.get("q") || ""
    setSearchQuery(query)

    if (!query.trim()) {
      setSearchResults(allContent)
      return
    }

    const filtered = allContent.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.genre.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase()),
    )
    setSearchResults(filtered)
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    const url = new URL(window.location.href)
    if (query) {
      url.searchParams.set("q", query)
    } else {
      url.searchParams.delete("q")
    }
    router.replace(url.pathname + url.search, { scroll: false })
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults(allContent)
    router.replace("/search", { scroll: false })
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <NetflixHeader />

      <main className="pt-20">
        <div className="px-4 md:px-12 lg:px-16">
          {/* Search Input */}
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search for movies, TV shows, genres..."
                className="w-full bg-netflix-gray-dark text-white pl-12 pr-12 py-4 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-netflix-red"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Search Results */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              {searchQuery ? `Search results for "${searchQuery}"` : "Browse All"}
            </h2>

            {searchResults.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 text-xl">No results found for "{searchQuery}"</p>
                <p className="text-gray-500 mt-2">Try different keywords or browse our catalog</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    className="group cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => router.push(`/watch/${item.id}`)}
                  >
                    <div className="relative aspect-[3/4] rounded-md overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                    </div>
                    <div className="mt-2">
                      <h3 className="text-white font-medium text-sm truncate">{item.title}</h3>
                      <p className="text-gray-400 text-xs">
                        {item.year} • {item.type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
