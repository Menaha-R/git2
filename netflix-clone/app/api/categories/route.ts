import { type NextRequest, NextResponse } from "next/server"

const categories = [
  {
    id: "trending",
    name: "Trending Now",
    description: "Popular movies and shows right now",
  },
  {
    id: "action",
    name: "Action & Adventure",
    description: "High-octane thrills and adventures",
  },
  {
    id: "comedy",
    name: "Comedy Movies",
    description: "Laugh-out-loud entertainment",
  },
  {
    id: "drama",
    name: "Drama",
    description: "Compelling stories and characters",
  },
  {
    id: "horror",
    name: "Horror",
    description: "Spine-chilling scares",
  },
  {
    id: "romance",
    name: "Romance",
    description: "Love stories and romantic comedies",
  },
  {
    id: "sci-fi",
    name: "Sci-Fi & Fantasy",
    description: "Futuristic and fantastical adventures",
  },
  {
    id: "documentary",
    name: "Documentaries",
    description: "Real stories and educational content",
  },
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: categories,
      total: categories.length,
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch categories" }, { status: 500 })
  }
}
