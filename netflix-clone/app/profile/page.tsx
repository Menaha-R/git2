"use client"

import { useState, useEffect } from "react"
import { NetflixHeader } from "@/components/netflix-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Edit2, Save, X } from "lucide-react"

interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  preferences: {
    language: string
    autoplay: boolean
    quality: string
  }
  subscription: {
    plan: string
    status: string
    expiresAt: string
  }
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    // Fetch user profile
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/user/profile?userId=user1")
      const data = await response.json()
      if (data.success) {
        setProfile(data.data)
        setEditedProfile(data.data)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  const handleSave = async () => {
    if (!editedProfile) return

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProfile),
      })

      const data = await response.json()
      if (data.success) {
        setProfile(data.data)
        setIsEditing(false)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <NetflixHeader />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <NetflixHeader />
      <div className="pt-20 px-4 md:px-12 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2 bg-transparent">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            )}
          </div>

          <div className="grid gap-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={editedProfile?.name || ""}
                      onChange={(e) => setEditedProfile((prev) => (prev ? { ...prev, name: e.target.value } : null))}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editedProfile?.email || ""}
                    onChange={(e) => setEditedProfile((prev) => (prev ? { ...prev, email: e.target.value } : null))}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your viewing experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Autoplay</Label>
                    <p className="text-sm text-muted-foreground">Automatically play next episode</p>
                  </div>
                  <Switch
                    checked={editedProfile?.preferences.autoplay || false}
                    onCheckedChange={(checked) =>
                      setEditedProfile((prev) =>
                        prev
                          ? {
                              ...prev,
                              preferences: { ...prev.preferences, autoplay: checked },
                            }
                          : null,
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="quality">Video Quality</Label>
                  <select
                    id="quality"
                    value={editedProfile?.preferences.quality || "HD"}
                    onChange={(e) =>
                      setEditedProfile((prev) =>
                        prev
                          ? {
                              ...prev,
                              preferences: { ...prev.preferences, quality: e.target.value },
                            }
                          : null,
                      )
                    }
                    disabled={!isEditing}
                    className="mt-1 w-full p-2 border border-border rounded-md bg-background"
                  >
                    <option value="SD">Standard Definition</option>
                    <option value="HD">High Definition</option>
                    <option value="4K">4K Ultra HD</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Subscription */}
            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>Your current plan and billing information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Plan:</span>
                    <span className="font-semibold">{profile.subscription.plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span
                      className={`font-semibold ${
                        profile.subscription.status === "active" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {profile.subscription.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expires:</span>
                    <span>{profile.subscription.expiresAt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
