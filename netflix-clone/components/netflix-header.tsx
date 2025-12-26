"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Search, User, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
import { NotificationBell } from "@/components/notifications"

export function NetflixHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isSearchOpen) {
      setSearchQuery("")
    }
  }

  const isActiveLink = (path: string) => {
    return pathname === path
  }

  const handleSignOut = () => {
    logout()
    router.push("/login")
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        <div className="flex items-center space-x-8">
          <div className="text-primary text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>
            NETFLIX
          </div>
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => router.push("/")}
              className={`transition-colors ${
                isActiveLink("/") ? "text-foreground font-semibold" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => router.push("/tv-shows")}
              className={`transition-colors ${
                isActiveLink("/tv-shows") ? "text-foreground font-semibold" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              TV Shows
            </button>
            <button
              onClick={() => router.push("/movies")}
              className={`transition-colors ${
                isActiveLink("/movies") ? "text-foreground font-semibold" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => router.push("/tamil-movies")}
              className={`transition-colors ${
                isActiveLink("/tamil-movies")
                  ? "text-foreground font-semibold"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Tamil Movies
            </button>
            <button
              onClick={() => router.push("/new-popular")}
              className={`transition-colors ${
                isActiveLink("/new-popular")
                  ? "text-foreground font-semibold"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              New & Popular
            </button>
            <button
              onClick={() => router.push("/watchlist")}
              className={`transition-colors ${
                isActiveLink("/watchlist")
                  ? "text-foreground font-semibold"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              My List
            </button>
            {user?.role === "admin" && (
              <button
                onClick={() => router.push("/admin")}
                className={`transition-colors ${
                  isActiveLink("/admin") ? "text-foreground font-semibold" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                Admin
              </button>
            )}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies, shows..."
                  className="bg-black/80 text-white px-4 py-2 rounded-l border border-gray-600 focus:outline-none focus:border-netflix-red w-64"
                  autoFocus
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-muted-foreground border border-l-0 border-gray-600 rounded-l-none"
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  onClick={toggleSearch}
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-muted-foreground ml-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              </form>
            ) : (
              <Button
                onClick={toggleSearch}
                variant="ghost"
                size="icon"
                className="text-foreground hover:text-muted-foreground"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>

          <NotificationBell />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 text-foreground hover:text-muted-foreground">
                {user?.avatar ? (
                  <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded" />
                ) : (
                  <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-2 py-1.5 text-sm text-muted-foreground">{user?.name || "User"}</div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/watchlist")}>My List</DropdownMenuItem>
              <DropdownMenuItem>Account Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
