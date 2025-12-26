import { type NextRequest, NextResponse } from "next/server"

// Mock user watchlist storage (in a real app, this would be in a database)
const userWatchlists: Record<string, number[]> = {
  user1: [1, 3, 5], // Mock user with some movies in watchlist
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || "user1" // Mock user ID

    const watchlist = userWatchlists[userId] || []

    return NextResponse.json({
      success: true,
      data: watchlist,
      total: watchlist.length,
    })
  } catch (error) {
    console.error("Error fetching watchlist:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch watchlist" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId = "user1", movieId } = body

    if (!movieId) {
      return NextResponse.json({ success: false, error: "Movie ID is required" }, { status: 400 })
    }

    if (!userWatchlists[userId]) {
      userWatchlists[userId] = []
    }

    // Add movie to watchlist if not already present
    if (!userWatchlists[userId].includes(movieId)) {
      userWatchlists[userId].push(movieId)
    }

    return NextResponse.json({
      success: true,
      message: "Movie added to watchlist",
      data: userWatchlists[userId],
    })
  } catch (error) {
    console.error("Error adding to watchlist:", error)
    return NextResponse.json({ success: false, error: "Failed to add to watchlist" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || "user1"
    const movieId = Number.parseInt(searchParams.get("movieId") || "0")

    if (!movieId) {
      return NextResponse.json({ success: false, error: "Movie ID is required" }, { status: 400 })
    }

    if (userWatchlists[userId]) {
      userWatchlists[userId] = userWatchlists[userId].filter((id) => id !== movieId)
    }

    return NextResponse.json({
      success: true,
      message: "Movie removed from watchlist",
      data: userWatchlists[userId] || [],
    })
  } catch (error) {
    console.error("Error removing from watchlist:", error)
    return NextResponse.json({ success: false, error: "Failed to remove from watchlist" }, { status: 500 })
  }
}
