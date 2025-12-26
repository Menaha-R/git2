import { type NextRequest, NextResponse } from "next/server"

// Mock movie database
const movies = [
  {
    id: 1,
    title: "Stranger Things",
    description:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    image: "/stranger-things-inspired-poster.png",
    year: "2023",
    rating: "TV-14",
    genre: ["Drama", "Fantasy", "Horror"],
    duration: "51m",
    category: "trending",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 2,
    title: "The Crown",
    description:
      "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    image: "/the-crown-inspired-poster.png",
    year: "2023",
    rating: "TV-MA",
    genre: ["Drama", "History"],
    duration: "58m",
    category: "trending",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 17,
    title: "RRR",
    description:
      "A fearless revolutionary and an officer in the British force, who once shared a deep bond, decide to join forces and chart out an inspirational path of freedom against the despotic rule.",
    image: "/rrr-tamil-poster.png",
    year: "2022",
    rating: "PG-13",
    genre: ["Action", "Drama", "History"],
    duration: "187m",
    category: "tamil",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 18,
    title: "Baahubali 2: The Conclusion",
    description:
      "When Shiva, the son of Bahubali, learns about his heritage, he begins to look for answers. His story is juxtaposed with past events that unfolded in the Mahishmati Kingdom.",
    image: "/baahubali-2-poster.png",
    year: "2017",
    rating: "PG-13",
    genre: ["Action", "Drama", "Fantasy"],
    duration: "167m",
    category: "tamil",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: 19,
    title: "Vikram",
    description: "Members of a black ops team must track and eliminate a gang of masked murderers.",
    image: "/vikram-tamil-poster.png",
    year: "2022",
    rating: "R",
    genre: ["Action", "Crime", "Thriller"],
    duration: "174m",
    category: "tamil",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 20,
    title: "Beast",
    description:
      "A RAW agent is in search of his captured team and the truth behind the assignment while dealing with terrorists who want to reveal the identity of the spy.",
    image: "/beast-tamil-poster.png",
    year: "2022",
    rating: "PG-13",
    genre: ["Action", "Comedy", "Thriller"],
    duration: "155m",
    category: "tamil",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 21,
    title: "Master",
    description:
      "An alcoholic professor is sent to a juvenile school, where he clashes with a gangster who uses the school children for criminal activities.",
    image: "/master-tamil-poster.png",
    year: "2021",
    rating: "R",
    genre: ["Action", "Crime", "Thriller"],
    duration: "179m",
    category: "tamil",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    id: 22,
    title: "KGF Chapter 2",
    description:
      "The blood-soaked land of Kolar Gold Fields has a new overlord now - Rocky, whose name strikes fear in the heart of his foes.",
    image: "/kgf-chapter-2-poster.png",
    year: "2022",
    rating: "R",
    genre: ["Action", "Crime", "Drama"],
    duration: "168m",
    category: "tamil",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    id: 23,
    title: "Pushpa: The Rise",
    description:
      "A labourer rises through the ranks of a red sandalwood smuggling syndicate, making some powerful enemies in the process.",
    image: "/pushpa-tamil-poster.png",
    year: "2021",
    rating: "R",
    genre: ["Action", "Crime", "Drama"],
    duration: "179m",
    category: "tamil",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 24,
    title: "Sarkar",
    description:
      "An NRI businessman learns his vote has been cast by someone else and decides to investigate the matter, eventually finding himself pitted against two corrupt politicians.",
    image: "/sarkar-tamil-poster.png",
    year: "2018",
    rating: "PG-13",
    genre: ["Action", "Drama", "Thriller"],
    duration: "165m",
    category: "tamil",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: 25,
    title: "Bigil",
    description: "A former football player struggles to train a women's football team and avenge his father's death.",
    image: "/bigil-tamil-poster.png",
    year: "2019",
    rating: "PG-13",
    genre: ["Action", "Drama", "Sport"],
    duration: "178m",
    category: "tamil",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: 26,
    title: "Enthiran 2.0",
    description:
      "Dr. Vaseegaran creates Nila, a robot with the ability to understand human emotions and feelings. A mobile phone scientist and his team become a threat to the world.",
    image: "/2point0-tamil-poster.png",
    year: "2018",
    rating: "PG-13",
    genre: ["Action", "Drama", "Sci-Fi"],
    duration: "148m",
    category: "tamil",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: 27,
    title: "Asuran",
    description:
      "The teenage son of a farmer from an underprivileged caste kills a rich, upper caste landlord. How do the pacifist farmer and his hot-blooded son deal with the repercussions?",
    image: "/asuran-tamil-poster.png",
    year: "2019",
    rating: "R",
    genre: ["Action", "Drama", "Thriller"],
    duration: "141m",
    category: "tamil",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
]

function calculateMovieScore(movie: any, searchTerm: string) {
  let score = 0
  const lowerSearchTerm = searchTerm.toLowerCase()
  const lowerTitle = movie.title.toLowerCase()
  const lowerDescription = movie.description.toLowerCase()

  // Exact title match gets highest score
  if (lowerTitle === lowerSearchTerm) {
    score += 100
  }
  // Title contains search term
  else if (lowerTitle.includes(lowerSearchTerm)) {
    score += 80
  }
  // Title starts with search term
  else if (lowerTitle.startsWith(lowerSearchTerm)) {
    score += 70
  }

  // Description contains search term
  if (lowerDescription.includes(lowerSearchTerm)) {
    score += 30
  }

  // Genre matches
  movie.genre.forEach((genre: string) => {
    if (genre.toLowerCase().includes(lowerSearchTerm)) {
      score += 50
    }
  })

  // Year matches
  if (movie.year.includes(searchTerm)) {
    score += 20
  }

  // Category matches (especially important for Tamil movies)
  if (movie.category.toLowerCase().includes(lowerSearchTerm)) {
    score += 60
  }

  return score
}

function findRelatedMovies(searchResults: any[], searchTerm: string, allMovies: any[]) {
  const relatedMovies = new Set()
  const lowerSearchTerm = searchTerm.toLowerCase()

  // If searching for Tamil content, prioritize Tamil movies
  const isTamilSearch = lowerSearchTerm.includes("tamil") || searchResults.some((movie) => movie.category === "tamil")

  searchResults.forEach((movie) => {
    // Find movies with similar genres
    const similarGenreMovies = allMovies.filter(
      (m) => m.id !== movie.id && m.genre.some((g: string) => movie.genre.includes(g)),
    )

    // Find movies in same category
    const sameCategoryMovies = allMovies.filter((m) => m.id !== movie.id && m.category === movie.category)

    // If Tamil search, prioritize Tamil movies
    if (isTamilSearch) {
      const tamilMovies = allMovies.filter((m) => m.category === "tamil" && !searchResults.some((sr) => sr.id === m.id))
      tamilMovies.slice(0, 5).forEach((tm) => relatedMovies.add(tm))
    }

    // Add similar movies (limit to avoid too many results)
    similarGenreMovies.slice(0, 3).forEach((sm) => relatedMovies.add(sm))
    sameCategoryMovies.slice(0, 2).forEach((scm) => relatedMovies.add(scm))
  })

  return Array.from(relatedMovies)
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json({ success: false, error: "Search query is required" }, { status: 400 })
    }

    const searchTerm = query.toLowerCase()

    const scoredResults = movies
      .map((movie) => ({
        ...movie,
        score: calculateMovieScore(movie, searchTerm),
      }))
      .filter((movie) => movie.score > 0)
      .sort((a, b) => b.score - a.score)

    // Get primary search results (high scores)
    const primaryResults = scoredResults.filter((movie) => movie.score >= 30)

    const relatedMovies = findRelatedMovies(primaryResults, searchTerm, movies)

    // Combine results: primary results first, then related movies
    const combinedResults = [
      ...primaryResults,
      ...relatedMovies.slice(0, 8), // Limit related movies
    ].filter(
      (movie, index, self) => index === self.findIndex((m) => m.id === movie.id), // Remove duplicates
    )

    return NextResponse.json({
      success: true,
      data: combinedResults,
      total: combinedResults.length,
      query: query,
      primaryResults: primaryResults.length,
      relatedResults: relatedMovies.length,
    })
  } catch (error) {
    console.error("Error searching movies:", error)
    return NextResponse.json({ success: false, error: "Search failed" }, { status: 500 })
  }
}
