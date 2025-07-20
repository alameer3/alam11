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
  ChevronUp
} from 'lucide-react'

// Mock data for series detail
const seriesData = {
  id: 1,
  title: "Breaking Bad",
  originalTitle: "Breaking Bad",
  slug: "breaking-bad",
  description: "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family's financial future as he battles terminal lung cancer.",
  longDescription: "Breaking Bad follows the transformation of Walter White, a high school chemistry teacher, into a ruthless drug kingpin. After being diagnosed with terminal lung cancer, Walter partners with former student Jesse Pinkman to manufacture and sell methamphetamine to secure his family's financial future. As the series progresses, Walter's transformation from a mild-mannered teacher to a feared criminal mastermind known as 'Heisenberg' becomes increasingly dark and complex.",
  year: 2008,
  duration: "49 min",
  rating: 9.5,
  votes: 1850000,
  quality: "1080p",
  category: "Crime",
  status: "Completed",
  country: "United States",
  language: "English",
  director: "Vince Gilligan",
  cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn", "RJ Mitte", "Dean Norris"],
  genres: ["Crime", "Drama", "Thriller"],
  tags: ["drugs", "chemistry", "family", "transformation", "crime"],
  poster: "/api/placeholder/300/450",
  banner: "/api/placeholder/1200/400",
  trailer: "https://www.youtube.com/watch?v=HhesaQXLuRY",
  seasons: [
    {
      id: 1,
      number: 1,
      title: "Season 1",
      episodes: 7,
      year: 2008,
      episodes: [
        {
          id: 1,
          title: "Pilot",
          number: 1,
          duration: "58 min",
          description: "Walter White, a high school chemistry teacher, is diagnosed with terminal lung cancer. He teams up with former student Jesse Pinkman to manufacture and sell methamphetamine.",
          thumbnail: "/api/placeholder/300/200",
          views: 2500000,
          rating: 9.2
        },
        {
          id: 2,
          title: "Cat's in the Bag...",
          number: 2,
          duration: "48 min",
          description: "Walter and Jesse try to dispose of the bodies and clean up the RV, but things don't go as planned.",
          thumbnail: "/api/placeholder/300/200",
          views: 2100000,
          rating: 8.9
        },
        {
          id: 3,
          title: "...And the Bag's in the River",
          number: 3,
          duration: "48 min",
          description: "Walter and Jesse deal with the aftermath of their first cook and Walter's family begins to worry about his behavior.",
          thumbnail: "/api/placeholder/300/200",
          views: 1950000,
          rating: 8.7
        }
      ]
    },
    {
      id: 2,
      number: 2,
      title: "Season 2",
      episodes: 13,
      year: 2009,
      episodes: [
        {
          id: 4,
          title: "Seven Thirty-Seven",
          number: 1,
          duration: "47 min",
          description: "Walter and Jesse face new challenges as they expand their operation and deal with dangerous new players.",
          thumbnail: "/api/placeholder/300/200",
          views: 2200000,
          rating: 9.1
        },
        {
          id: 5,
          title: "Grilled",
          number: 2,
          duration: "45 min",
          description: "Walter and Jesse find themselves in a dangerous situation with Tuco Salamanca.",
          thumbnail: "/api/placeholder/300/200",
          views: 2050000,
          rating: 9.3
        }
      ]
    }
  ],
  relatedSeries: [
    {
      id: 2,
      title: "Better Call Saul",
      poster: "/api/placeholder/200/300",
      rating: 8.8,
      year: 2015
    },
    {
      id: 3,
      title: "El Camino",
      poster: "/api/placeholder/200/300",
      rating: 7.3,
      year: 2019
    },
    {
      id: 4,
      title: "Ozark",
      poster: "/api/placeholder/200/300",
      rating: 8.5,
      year: 2017
    }
  ]
}

export default function SeriesDetailPage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedSeason, setSelectedSeason] = useState(1)
  const [expandedEpisodes, setExpandedEpisodes] = useState<number[]>([])
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const toggleEpisodes = (seasonId: number) => {
    setExpandedEpisodes(prev => 
      prev.includes(seasonId) 
        ? prev.filter(id => id !== seasonId)
        : [...prev, seasonId]
    )
  }

  const currentSeason = seriesData.seasons.find(s => s.number === selectedSeason)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${seriesData.banner})`
          }}
        />
        <div className="relative z-10 h-full flex items-end p-6 md:p-12">
          <div className="flex flex-col md:flex-row gap-6 w-full max-w-7xl mx-auto">
            <div className="flex-shrink-0">
              <img 
                src={seriesData.poster} 
                alt={seriesData.title}
                className="w-48 h-72 md:w-64 md:h-96 rounded-lg shadow-2xl"
              />
            </div>
            <div className="flex-1 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-300">{seriesData.year}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-300">{seriesData.duration}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-300">{seriesData.quality}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-300">{seriesData.status}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{seriesData.title}</h1>
              <p className="text-lg text-gray-300 mb-6 max-w-3xl">{seriesData.description}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{seriesData.rating}</span>
                  <span className="text-gray-400">({seriesData.votes.toLocaleString()})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">2.5M views</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {seriesData.genres.map(genre => (
                  <span key={genre} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors">
                  <Play className="w-5 h-5" />
                  Watch Now
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
                <h3 className="text-xl font-semibold mb-4">Synopsis</h3>
                <p className="text-gray-300 leading-relaxed mb-6">{seriesData.longDescription}</p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Details</h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex justify-between">
                        <span>Director:</span>
                        <span>{seriesData.director}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Country:</span>
                        <span>{seriesData.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Language:</span>
                        <span>{seriesData.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="text-green-400">{seriesData.status}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Cast</h4>
                    <div className="space-y-1 text-sm text-gray-300">
                      {seriesData.cast.map(actor => (
                        <div key={actor}>{actor}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Series Info</h3>
                <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">Released: {seriesData.year}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">Duration: {seriesData.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">Seasons: {seriesData.seasons.length}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-300">Rating: {seriesData.rating}/10</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'episodes' && (
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {seriesData.seasons.map(season => (
                  <button
                    key={season.id}
                    onClick={() => setSelectedSeason(season.number)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedSeason === season.number
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Season {season.number}
                  </button>
                ))}
              </div>

              {currentSeason && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">
                      {currentSeason.title} ({currentSeason.episodes.length} Episodes)
                    </h3>
                    <button
                      onClick={() => toggleEpisodes(currentSeason.id)}
                      className="flex items-center gap-2 text-gray-400 hover:text-white"
                    >
                      {expandedEpisodes.includes(currentSeason.id) ? (
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
                    {currentSeason.episodes.map(episode => (
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
                                <h4 className="font-semibold mb-1">
                                  {episode.number}. {episode.title}
                                </h4>
                                <p className="text-gray-400 text-sm mb-2">{episode.description}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                  <span>{episode.duration}</span>
                                  <span>•</span>
                                  <span>{episode.views.toLocaleString()} views</span>
                                  <span>•</span>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-400" />
                                    <span>{episode.rating}</span>
                                  </div>
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
            </div>
          )}

          {activeTab === 'cast' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Cast & Crew</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {seriesData.cast.map((actor, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{actor}</h4>
                        <p className="text-gray-400 text-sm">Actor</p>
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
                            <span className="text-gray-400 text-sm">2 days ago</span>
                          </div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-white">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-gray-300 mb-4">
                      This is an amazing series! The character development is incredible and the story keeps you on the edge of your seat. Bryan Cranston's performance is absolutely outstanding.
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <button className="flex items-center gap-1 text-gray-400 hover:text-white">
                        <ThumbsUp className="w-4 h-4" />
                        <span>24</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-400 hover:text-white">
                        <ThumbsDown className="w-4 h-4" />
                        <span>2</span>
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
              <h3 className="text-xl font-semibold mb-6">Related Series</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {seriesData.relatedSeries.map(series => (
                  <div key={series.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors">
                    <img 
                      src={series.poster} 
                      alt={series.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold mb-1">{series.title}</h4>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>{series.year}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span>{series.rating}</span>
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