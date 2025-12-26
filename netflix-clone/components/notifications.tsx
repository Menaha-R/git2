"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning"
  timestamp: Date
  actionType: "watch" | "browse" | "watchlist" | "search"
  actionData?: {
    movieId?: string
    category?: string
    searchQuery?: string
  }
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "New Episodes Available",
        message: "Stranger Things Season 5 - Episode 1 is now available",
        type: "info",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        actionType: "watch",
        actionData: { movieId: "1" },
      },
      {
        id: "2",
        title: "Added to My List",
        message: "The Crown has been added to your watchlist",
        type: "success",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        actionType: "watchlist",
      },
      {
        id: "3",
        title: "Trending Now",
        message: "Wednesday is trending #1 in your area",
        type: "info",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        actionType: "search",
        actionData: { searchQuery: "Wednesday" },
      },
      {
        id: "4",
        title: "New Movies Added",
        message: "Check out the latest blockbusters in Movies",
        type: "info",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
        actionType: "browse",
        actionData: { category: "movies" },
      },
    ]
    setNotifications(mockNotifications)
  }, [])

  const handleNotificationClick = (notification: Notification) => {
    switch (notification.actionType) {
      case "watch":
        if (notification.actionData?.movieId) {
          router.push(`/watch/${notification.actionData.movieId}`)
        }
        break
      case "browse":
        if (notification.actionData?.category === "movies") {
          router.push("/movies")
        } else if (notification.actionData?.category === "tv-shows") {
          router.push("/tv-shows")
        } else {
          router.push("/new-popular")
        }
        break
      case "watchlist":
        router.push("/watchlist")
        break
      case "search":
        if (notification.actionData?.searchQuery) {
          router.push(`/search?q=${encodeURIComponent(notification.actionData.searchQuery)}`)
        }
        break
    }
    setShowNotifications(false)
  }

  const removeNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return "Just now"
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="relative text-white hover:text-gray-300"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </Button>

      {showNotifications && (
        <div className="absolute right-0 top-full mt-2 w-80 z-50">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-0">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-white font-semibold">Notifications</h3>
              </div>

              {notifications.length === 0 ? (
                <div className="p-4 text-gray-400 text-center">No new notifications</div>
              ) : (
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 border-b border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm">{notification.title}</h4>
                          <p className="text-gray-400 text-sm mt-1">{notification.message}</p>
                          <p className="text-gray-500 text-xs mt-2">{formatTime(notification.timestamp)}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white p-1"
                          onClick={(e) => removeNotification(notification.id, e)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
