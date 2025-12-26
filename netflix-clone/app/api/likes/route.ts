import { type NextRequest, NextResponse } from "next/server"

// Mock likes storage (in production, use a database)
let likes: { userId: string; movieId: number }[] = []

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 })
  }

  const userLikes = likes.filter((like) => like.userId === userId)
  return NextResponse.json({ success: true, data: userLikes })
}

export async function POST(request: NextRequest) {
  try {
    const { userId, movieId } = await request.json()

    if (!userId || !movieId) {
      return NextResponse.json({ error: "User ID and Movie ID required" }, { status: 400 })
    }

    // Check if already liked
    const existingLike = likes.find((like) => like.userId === userId && like.movieId === movieId)
    if (existingLike) {
      return NextResponse.json({ error: "Movie already liked" }, { status: 400 })
    }

    likes.push({ userId, movieId })
    return NextResponse.json({ success: true, message: "Movie liked successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const movieId = searchParams.get("movieId")

  if (!userId || !movieId) {
    return NextResponse.json({ error: "User ID and Movie ID required" }, { status: 400 })
  }

  likes = likes.filter((like) => !(like.userId === userId && like.movieId === Number.parseInt(movieId)))
  return NextResponse.json({ success: true, message: "Like removed successfully" })
}
