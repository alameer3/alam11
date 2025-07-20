'use client'

import { useState } from 'react'
import { 
  Play, 
  Heart, 
  Bookmark, 
  Share2, 
  Star, 
  Calendar, 
  Clock, 
  Users, 
  Eye,
  Download,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Tv
} from 'lucide-react'

// Mock data for show detail
const showData = {
  id: 1,
  title: "The Tonight Show Starring Jimmy Fallon",
  originalTitle: "The Tonight Show Starring Jimmy Fallon",
  slug: "the-tonight-show",
  description: "Jimmy Fallon hosts the iconic Tonight Show, featuring celebrity interviews, comedy sketches, and musical performances.",
  longDescription: "The Tonight Show Starring Jimmy Fallon is an American late-night talk show hosted by Jimmy Fallon. The show features celebrity interviews, comedy sketches, and musical performances. It airs weeknights at 11:35 PM ET on NBC. The show has become known for its viral segments, musical parodies, and innovative games that often go viral on social media platforms.",
  year: 2014,
  duration: "60 min",
  rating: 8.2,
  votes: 45000,
  quality: "1080p",
  category: "Talk Show",
  type: "Late Night",
  status: "Ongoing",
  country: "United States",
  language: "English",
  host: "Jimmy Fallon",
  cast: ["Jimmy Fallon", "The Roots", "Higgins", "Steve Higgins"],
  genres: ["Talk Show", "Comedy", "Entertainment"],
  tags: ["late night", "comedy", "interviews", "music", "celebrities"],
  poster: "/api/placeholder/300/450",
  banner: "/api/placeholder/1200/400",
  trailer: "https://www.youtube.com/watch?v=example",
  episodes: [
    {
      id: 1,
      title: "Episode 1 - Tom Hanks & Lady Gaga",
      number: 1,
      date: "2024-01-15",
      duration: "60 min",
      description: "Tom Hanks discusses his new movie and Lady Gaga performs her latest hit single.",
      thumbnail: "/api/placeholder/300/200",
      views: 850000,
      rating: 8.5,
      guests: ["Tom Hanks", "Lady Gaga"]
    },
    {
      id: 2,
      title: "Episode 2 - Ryan Reynolds & Taylor Swift",
      number: 2,
      date: "2024-01-16",
      duration: "60 min",
      description: "Ryan Reynolds promotes his new film and Taylor Swift performs an acoustic set.",
      thumbnail: "/api/placeholder/300/200",
      views: 920000,
      rating: 8.8,
      guests: ["Ryan Reynolds", "Taylor Swift"]
    },
    {
      id: 3,
      title: "Episode 3 - Chris Hemsworth & Ed Sheeran",
      number: 3,
      date: "2024-01-17",
      duration: "60 min",
      description: "Chris Hemsworth talks about his latest action movie and Ed Sheeran performs live.",
      thumbnail: "/api/placeholder/300/200",
      views: 780000,
      rating: 8.3,
      guests: ["Chris Hemsworth", "Ed Sheeran"]
    },
    {
      id: 4,
      title: "Episode 4 - Jennifer Lawrence & The Weeknd",
      number: 4,
      date: "2024-01-18",
      duration: "60 min",
      description: "Jennifer Lawrence discusses her new project and The Weeknd performs his latest single.",
      thumbnail: "/api/placeholder/300/200",
      views: 890000,
      rating: 8.6,
      guests: ["Jennifer Lawrence", "The Weeknd"]
    },
    {
      id: 5,
      title: "Episode 5 - Leonardo DiCaprio & Adele",
      number: 5,
      date: "2024-01-19",
      duration: "60 min",
      description: "Leonardo DiCaprio talks about environmental activism and Adele performs a special acoustic set.",
      thumbnail: "/api/placeholder/300/200",
      views: 950000,
      rating: 9.1,
      guests: ["Leonardo DiCaprio", "Adele"]
    }
  ],
  relatedShows: [
    {
      id: 2,
      title: "The Late Show with Stephen Colbert",
      poster: "/api/placeholder/200/300",
      rating: 8.0,
      year: 2015
    },
    {
      id: 3,
      title: "Jimmy Kimmel Live!",
      poster: "/api/placeholder/200/300",
      rating: 7.8,
      year: 2003
    },
    {
      id: 4,
      title: "The Daily Show",
      poster: "/api/placeholder/200/300",
      rating: 8.5,
      year: 1996
    }
  ]
}

export default function ShowDetailPage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedEpisodes, setExpandedEpisodes] = useState(false)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const toggleEpisodes = () => {
    setExpandedEpisodes(!expandedEpisodes)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${showData.banner})`
          }}
        />
        <div className="relative z-10 h-full flex items-end p-6 md:p-12">
          <div className="flex flex-col md:flex-row gap-6 w-full max-w-7xl mx-auto">
            <div className="flex-shrink-0">
              <img 
                src={showData.poster} 
                alt={showData.title}
                className="w-48 h-72 md:w-64 md:h-96 rounded-lg shadow-2xl"
              />
            </div>
            <div className="flex-1 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-300">{showData.year}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-300">{showData.duration}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-300">{showData.quality}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-300">{showData.status}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{showData.title}</h1>
              <p className="text-lg text-gray-300 mb-6 max-w-3xl">{showData.description}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{showData.rating}</span>
                  <span className="text-gray-400">({showData.votes.toLocaleString()})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">1.2M views</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {showData.genres.map(genre => (
                  <span key={genre} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors">
                  <Play className="w-5 h-5" />
                  Watch Latest
                </button>
                <button 
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
                    liked ? 'bg-red-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                  {liked ? 'Liked' : 'Like'}
                </button>
                <button 
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
                    bookmarked ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
                  {bookmarked ? 'Saved' : 'Save'}
                </button>
                <button className="flex items-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {['overview', 'episodes', 'cast', 'reviews', 'related'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-300 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold mb-4">About the Show</h3>
                <p className="text-gray-300 leading-relaxed mb-6">{showData.longDescription}</p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Show Details</h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex justify-between">
                        <span>Host:</span>
                        <span>{showData.host}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span>{showData.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span>{showData.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Country:</span>
                        <span>{showData.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Language:</span>
                        <span>{showData.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="text-green-400">{showData.status}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Cast & Crew</h4>
                    <div className="space-y-1 text-sm text-gray-300">
                      {showData.cast.map(member => (
                        <div key={member}>{member}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Show Info</h3>
                <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">Started: {showData.year}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">Duration: {showData.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tv className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">Episodes: {showData.episodes.length}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-300">Rating: {showData.rating}/10</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'episodes' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">
                  Latest Episodes ({showData.episodes.length})
                </h3>
                <button
                  onClick={toggleEpisodes}
                  className="flex items-center gap-2 text-gray-400 hover:text-white"
                >
                  {expandedEpisodes ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Collapse
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Expand
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4">
                {showData.episodes.slice(0, expandedEpisodes ? undefined : 3).map(episode => (
                  <div key={episode.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <img 
                        src={episode.thumbnail} 
                        alt={episode.title}
                        className="w-32 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold mb-1">{episode.title}</h4>
                            <p className="text-gray-400 text-sm mb-2">{episode.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                              <span>{episode.date}</span>
                              <span>•</span>
                              <span>{episode.duration}</span>
                              <span>•</span>
                              <span>{episode.views.toLocaleString()} views</span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400" />
                                <span>{episode.rating}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {episode.guests.map(guest => (
                                <span key={guest} className="px-2 py-1 bg-gray-700 rounded text-xs">
                                  {guest}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="p-2 bg-red-600 hover:bg-red-700 rounded">
                              <Play className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'cast' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Cast & Crew</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {showData.cast.map((member, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{member}</h4>
                        <p className="text-gray-400 text-sm">
                          {member === showData.host ? 'Host' : 'Cast Member'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Reviews</h3>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium">
                  Write Review
                </button>
              </div>
              
              <div className="space-y-6">
                {[1, 2, 3].map(review => (
                  <div key={review} className="bg-gray-800 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold">User{review}</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map(star => (
                                <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <span className="text-gray-400 text-sm">1 week ago</span>
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-white">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Jimmy Fallon is absolutely hilarious! The show is always entertaining with great celebrity interviews and amazing musical performances. The games and sketches are so much fun to watch.
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <button className="flex items-center gap-1 text-gray-400 hover:text-white">
                        <ThumbsUp className="w-4 h-4" />
                        <span>18</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-white">
                        <ThumbsDown className="w-4 h-4" />
                        <span>1</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-white">
                        <MessageCircle className="w-4 h-4" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'related' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Related Shows</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {showData.relatedShows.map(show => (
                  <div key={show.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors">
                    <img 
                      src={show.poster} 
                      alt={show.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold mb-1">{show.title}</h4>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>{show.year}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span>{show.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}