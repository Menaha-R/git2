import { type NextRequest, NextResponse } from "next/server"

// Mock user profiles (in a real app, this would be in a database)
const userProfiles: Record<string, any> = {
  user1: {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    preferences: {
      language: "en",
      autoplay: true,
      quality: "HD",
    },
    subscription: {
      plan: "Premium",
      status: "active",
      expiresAt: "2024-12-31",
    },
    watchHistory: [1, 2, 3],
    favoriteGenres: ["Action", "Drama", "Sci-Fi"],
  },
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId") || "user1"

    const profile = userProfiles[userId]

    if (!profile) {
      return NextResponse.json({ success: false, error: "User profile not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: profile,
    })
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch user profile" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId = "user1", ...updates } = body

    if (!userProfiles[userId]) {
      return NextResponse.json({ success: false, error: "User profile not found" }, { status: 404 })
    }

    // Update user profile
    userProfiles[userId] = {
      ...userProfiles[userId],
      ...updates,
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: userProfiles[userId],
    })
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ success: false, error: "Failed to update user profile" }, { status: 500 })
  }
}
