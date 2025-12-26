"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Upload, Film, Users, Crown, Plus } from "lucide-react"

export default function AdminDashboard() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [licenseRequests, setLicenseRequests] = useState([
    { id: 1, studio: "Warner Bros", content: "The Batman", status: "pending", cost: "$2.5M" },
    { id: 2, studio: "Disney", content: "Marvel Collection", status: "approved", cost: "$15M" },
    { id: 3, studio: "Sony Pictures", content: "Spider-Man Trilogy", status: "negotiating", cost: "$8M" },
  ])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
          setTimeout(() => setUploadProgress(0), 2000)
        }
      }, 200)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-500 mb-2">Content Management Dashboard</h1>
          <p className="text-gray-400">Manage your streaming platform's content acquisition and licensing</p>
        </div>

        <Tabs defaultValue="licensing" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="licensing" className="data-[state=active]:bg-red-600">
              <Crown className="w-4 h-4 mr-2" />
              Content Licensing
            </TabsTrigger>
            <TabsTrigger value="distributors" className="data-[state=active]:bg-red-600">
              <Users className="w-4 h-4 mr-2" />
              Distributor Partners
            </TabsTrigger>
            <TabsTrigger value="public-domain" className="data-[state=active]:bg-red-600">
              <Upload className="w-4 h-4 mr-2" />
              Public Domain Films
            </TabsTrigger>
            <TabsTrigger value="original" className="data-[state=active]:bg-red-600">
              <Film className="w-4 h-4 mr-2" />
              Original Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="licensing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-red-500">New License Request</CardTitle>
                  <CardDescription>Submit a request to license content from major studios</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="studio">Studio/Distributor</Label>
                    <Input
                      id="studio"
                      placeholder="e.g., Warner Bros, Disney, Netflix"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content Title</Label>
                    <Input id="content" placeholder="Movie or series title" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div>
                    <Label htmlFor="budget">Licensing Budget</Label>
                    <Input id="budget" placeholder="$0.00" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div>
                    <Label htmlFor="terms">Licensing Terms</Label>
                    <Textarea
                      id="terms"
                      placeholder="Duration, territories, exclusivity..."
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700">Submit License Request</Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Active License Requests</CardTitle>
                  <CardDescription>Track your content licensing negotiations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {licenseRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div>
                          <h4 className="font-semibold">{request.content}</h4>
                          <p className="text-sm text-gray-400">{request.studio}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={request.status === "approved" ? "default" : "secondary"}>
                            {request.status}
                          </Badge>
                          <p className="text-sm text-gray-400 mt-1">{request.cost}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="distributors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Lionsgate", content: "2,500+ titles", status: "Active Partnership" },
                { name: "A24 Films", content: "150+ indie films", status: "Negotiating" },
                { name: "Magnolia Pictures", content: "800+ documentaries", status: "Active Partnership" },
                { name: "IFC Films", content: "1,200+ titles", status: "Pending" },
              ].map((distributor, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg">{distributor.name}</CardTitle>
                    <CardDescription>{distributor.content}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant={distributor.status === "Active Partnership" ? "default" : "secondary"}>
                      {distributor.status}
                    </Badge>
                    <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">Manage Partnership</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="public-domain" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-red-500">Upload Public Domain Films</CardTitle>
                <CardDescription>Add copyright-free movies and documentaries to your platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                  <h3 className="text-lg font-semibold mb-2">Upload Video Files</h3>
                  <p className="text-gray-400 mb-4">Drag and drop your public domain films here</p>
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="bg-gray-800 border-gray-700"
                  />
                  {uploadProgress > 0 && (
                    <div className="mt-4">
                      <div className="bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-400 mt-2">{uploadProgress}% uploaded</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Movie Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Night of the Living Dead"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Release Year</Label>
                    <Input id="year" placeholder="e.g., 1968" className="bg-gray-800 border-gray-700" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Movie synopsis..." className="bg-gray-800 border-gray-700" />
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Platform
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="original" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-red-500">Original Content Production</CardTitle>
                  <CardDescription>Manage your original series and movies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="project-title">Project Title</Label>
                    <Input
                      id="project-title"
                      placeholder="Your original series/movie"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div>
                    <Label htmlFor="genre">Genre</Label>
                    <Input
                      id="genre"
                      placeholder="Drama, Comedy, Thriller..."
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget">Production Budget</Label>
                    <Input id="budget" placeholder="$0.00" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div>
                    <Label htmlFor="synopsis">Synopsis</Label>
                    <Textarea
                      id="synopsis"
                      placeholder="Brief description of your original content..."
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700">Start Production</Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Production Pipeline</CardTitle>
                  <CardDescription>Track your original content projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Dark Waters", status: "In Production", progress: 65 },
                      { title: "City Lights", status: "Post-Production", progress: 90 },
                      { title: "The Last Stand", status: "Pre-Production", progress: 25 },
                    ].map((project, index) => (
                      <div key={index} className="p-3 bg-gray-800 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold">{project.title}</h4>
                          <Badge variant="secondary">{project.status}</Badge>
                        </div>
                        <div className="bg-gray-700 rounded-full h-2">
                          <div className="bg-red-600 h-2 rounded-full" style={{ width: `${project.progress}%` }} />
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{project.progress}% complete</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
