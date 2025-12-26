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
    videoSrc: "https://www.youtube.com/embed/b9EkMc79ZSU",
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
    videoSrc: "https://www.youtube.com/embed/JWtnJjn6ng0",
  },
  {
    id: 3,
    title: "Wednesday",
    description:
      "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends at Nevermore Academy.",
    image: "/wednesday-addams-poster.png",
    year: "2022",
    rating: "TV-14",
    genre: ["Comedy", "Crime", "Family"],
    duration: "45m",
    category: "trending",
    videoSrc: "https://www.youtube.com/embed/Di310WS8zLk",
  },
  {
    id: 4,
    title: "Ozark",
    description:
      "A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.",
    image: "/ozark-inspired-poster.png",
    year: "2022",
    rating: "TV-MA",
    genre: ["Crime", "Drama", "Thriller"],
    duration: "60m",
    category: "trending",
    videoSrc: "https://www.youtube.com/embed/5hAXVqrljbs",
  },
  {
    id: 5,
    title: "The Witcher",
    description:
      "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    image: "/witcher-inspired-poster.png",
    year: "2023",
    rating: "TV-MA",
    genre: ["Action", "Adventure", "Drama"],
    duration: "60m",
    category: "trending",
    videoSrc: "https://www.youtube.com/embed/ndl1W4ltcmg",
  },
  {
    id: 6,
    title: "Bridgerton",
    description:
      "Wealth, lust, and betrayal set against the backdrop of Regency-era England, seen through the eyes of the powerful Bridgerton family.",
    image: "/bridgerton-inspired-poster.png",
    year: "2022",
    rating: "TV-MA",
    genre: ["Drama", "Romance"],
    duration: "60m",
    category: "trending",
    videoSrc: "https://www.youtube.com/embed/gpv7ayf_tyE",
  },
  {
    id: 7,
    title: "Extraction",
    description:
      "A black-market mercenary who has nothing to lose is hired to rescue the kidnapped son of an imprisoned international crime lord.",
    image: "/generic-action-movie-poster.png",
    year: "2023",
    rating: "R",
    genre: ["Action", "Thriller"],
    duration: "116m",
    category: "action",
    videoSrc: "https://www.youtube.com/embed/L6P3nI6VnlY",
  },
  {
    id: 8,
    title: "Red Notice",
    description: "An Interpol agent tracks the world's most wanted art thief.",
    image: "/red-notice-inspired-poster.png",
    year: "2021",
    rating: "PG-13",
    genre: ["Action", "Comedy", "Thriller"],
    duration: "118m",
    category: "action",
    videoSrc: "https://www.youtube.com/embed/Pj0wz7zu3Ms",
  },
  {
    id: 9,
    title: "6 Underground",
    description:
      "Six individuals from all around the globe, each the very best at what they do, have been chosen not only for their skill, but for a unique desire to delete their pasts to change the future.",
    image: "/6-underground-poster.png",
    year: "2019",
    rating: "R",
    genre: ["Action", "Thriller"],
    duration: "128m",
    category: "action",
    videoSrc: "https://www.youtube.com/embed/YLE85olJjp8",
  },
  {
    id: 10,
    title: "The Gray Man",
    description:
      "When the CIA's most skilled operative-whose true identity is known to none-accidentally uncovers dark agency secrets, a psychopathic former colleague puts a bounty on his head.",
    image: "/the-gray-man-poster.png",
    year: "2022",
    rating: "PG-13",
    genre: ["Action", "Thriller"],
    duration: "129m",
    category: "action",
    videoSrc: "https://www.youtube.com/embed/BmllggGO4pM",
  },
  {
    id: 11,
    title: "Army of the Dead",
    description:
      "Following a zombie outbreak in Las Vegas, a group of mercenaries take the ultimate gamble, venturing into the quarantine zone to pull off the greatest heist ever attempted.",
    image: "/army-of-the-dead-poster.png",
    year: "2021",
    rating: "R",
    genre: ["Action", "Crime", "Horror"],
    duration: "148m",
    category: "action",
    videoSrc: "https://www.youtube.com/embed/tI1JGPhYBS8",
  },
  {
    id: 12,
    title: "Thunder Force",
    description:
      "In a world where supervillains are commonplace, two estranged childhood best friends reunite after one devises a treatment that gives them powers to protect their city.",
    image: "/thunder-force-poster.png",
    year: "2021",
    rating: "PG-13",
    genre: ["Action", "Adventure", "Comedy"],
    duration: "106m",
    category: "action",
    videoSrc: "https://www.youtube.com/embed/1HdnPpIG0Y8",
  },
  {
    id: 13,
    title: "Murder Mystery",
    description:
      "A New York cop and his wife go on a European vacation to reinvigorate the spark in their marriage, but end up getting framed and on the run for the death of an elderly billionaire.",
    image: "/murder-mystery-poster.png",
    year: "2023",
    rating: "PG-13",
    genre: ["Action", "Comedy", "Crime"],
    duration: "97m",
    category: "comedy",
    videoSrc: "https://www.youtube.com/embed/DaOJqOzpsU4",
  },
  {
    id: 15,
    title: "Enola Holmes",
    description:
      "When Enola Holmes-Sherlock's teen sister-discovers her mother missing, she sets off to find her, becoming a super-sleuth in her own right.",
    image: "/enola-holmes-poster.png",
    year: "2022",
    rating: "PG-13",
    genre: ["Adventure", "Crime", "Drama"],
    duration: "123m",
    category: "comedy",
    videoSrc: "https://www.youtube.com/embed/3t1g2pa355k",
  },
  {
    id: 16,
    title: "The Half of It",
    description: "A shy student helps the sweet jock woo the girl they both like.",
    image: "/the-half-of-it-poster.png",
    year: "2020",
    rating: "PG-13",
    genre: ["Comedy", "Drama", "Romance"],
    duration: "104m",
    category: "comedy",
    videoSrc: "https://www.youtube.com/embed/B-yhF7IScUE",
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
    videoSrc: "https://www.youtube.com/embed/f_vbAtFSEc0",
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
    videoSrc: "https://www.youtube.com/embed/sOEg_YZQsTI",
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
    videoSrc: "https://www.youtube.com/embed/OKBMCL-frPU",
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
    videoSrc: "https://www.youtube.com/embed/xZQR6Z1TElY",
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
    videoSrc: "https://www.youtube.com/embed/UTiXQcrLlv4",
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
    videoSrc: "https://www.youtube.com/embed/JKa05nyUmuQ",
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
    videoSrc: "https://www.youtube.com/embed/pKctjlxbFDQ",
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
    videoSrc: "https://www.youtube.com/embed/VkkyaodksT4",
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
    videoSrc: "https://www.youtube.com/embed/P663vdap0LM",
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
    videoSrc: "https://www.youtube.com/embed/My9NyQNyFGE",
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
    videoSrc: "https://www.youtube.com/embed/TXABmWgKhEU",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const limit = searchParams.get("limit")

    let filteredMovies = movies

    // Filter by category
    if (category) {
      filteredMovies = movies.filter((movie) => movie.category === category)
    }

    // Filter by search term
    if (search) {
      const searchTerm = search.toLowerCase()
      filteredMovies = filteredMovies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchTerm) ||
          movie.description.toLowerCase().includes(searchTerm) ||
          movie.genre.some((g) => g.toLowerCase().includes(searchTerm)),
      )
    }

    // Limit results
    if (limit) {
      const limitNum = Number.parseInt(limit)
      filteredMovies = filteredMovies.slice(0, limitNum)
    }

    return NextResponse.json({
      success: true,
      data: filteredMovies,
      total: filteredMovies.length,
    })
  } catch (error) {
    console.error("Error fetching movies:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch movies" }, { status: 500 })
  }
}
