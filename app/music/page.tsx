'use client';

import { useState } from 'react';
import { Music, Mic, Headphones, Play, Pause, Heart, Download, Share2, Clock, Star, Filter, Grid, List, Search } from 'lucide-react';

interface MusicItem {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: string;
  genre: string;
  type: 'song' | 'album' | 'playlist' | 'podcast';
  rating: number;
  cover: string;
  isLiked: boolean;
  isDownloaded: boolean;
}

const mockMusicData: MusicItem[] = [
  {
    id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    duration: '5:55',
    genre: 'Rock',
    type: 'song',
    rating: 4.9,
    cover: '/api/placeholder/300/300',
    isLiked: true,
    isDownloaded: false
  },
  {
    id: '2',
    title: 'The Joe Rogan Experience',
    artist: 'Joe Rogan',
    duration: '2:45:30',
    genre: 'Talk Show',
    type: 'podcast',
    rating: 4.7,
    cover: '/api/placeholder/300/300',
    isLiked: false,
    isDownloaded: true
  },
  {
    id: '3',
    title: 'Dark Side of the Moon',
    artist: 'Pink Floyd',
    album: 'Dark Side of the Moon',
    duration: '42:50',
    genre: 'Progressive Rock',
    type: 'album',
    rating: 4.8,
    cover: '/api/placeholder/300/300',
    isLiked: true,
    isDownloaded: false
  },
  {
    id: '4',
    title: 'My Playlist #1',
    artist: 'Various Artists',
    duration: '1:23:45',
    genre: 'Mixed',
    type: 'playlist',
    rating: 4.5,
    cover: '/api/placeholder/300/300',
    isLiked: false,
    isDownloaded: false
  },
  {
    id: '5',
    title: 'The Daily',
    artist: 'The New York Times',
    duration: '25:30',
    genre: 'News',
    type: 'podcast',
    rating: 4.6,
    cover: '/api/placeholder/300/300',
    isLiked: true,
    isDownloaded: true
  },
  {
    id: '6',
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    duration: '6:30',
    genre: 'Rock',
    type: 'song',
    rating: 4.8,
    cover: '/api/placeholder/300/300',
    isLiked: false,
    isDownloaded: false
  },
  {
    id: '7',
    title: 'Serial',
    artist: 'Sarah Koenig',
    duration: '45:20',
    genre: 'True Crime',
    type: 'podcast',
    rating: 4.9,
    cover: '/api/placeholder/300/300',
    isLiked: true,
    isDownloaded: false
  },
  {
    id: '8',
    title: 'Abbey Road',
    artist: 'The Beatles',
    album: 'Abbey Road',
    duration: '47:23',
    genre: 'Rock',
    type: 'album',
    rating: 4.9,
    cover: '/api/placeholder/300/300',
    isLiked: true,
    isDownloaded: false
  }
];

const genres = ['All', 'Rock', 'Pop', 'Jazz', 'Classical', 'Hip Hop', 'Electronic', 'Country', 'Talk Show', 'News', 'True Crime', 'Comedy'];
const types = ['All', 'song', 'album', 'playlist', 'podcast'];
const sortOptions = ['Latest', 'Popular', 'Rating', 'Duration', 'Title', 'Artist'];

export default function MusicPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [playingItem, setPlayingItem] = useState<string | null>(null);

  const filteredMusic = mockMusicData.filter(item => {
    const matchesGenre = selectedGenre === 'All' || item.genre === selectedGenre;
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.album && item.album.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesGenre && matchesType && matchesSearch;
  });

  const sortedMusic = [...filteredMusic].sort((a, b) => {
    switch (sortBy) {
      case 'Latest':
        return b.id.localeCompare(a.id);
      case 'Popular':
        return b.rating - a.rating;
      case 'Rating':
        return b.rating - a.rating;
      case 'Duration':
        return a.duration.localeCompare(b.duration);
      case 'Title':
        return a.title.localeCompare(b.title);
      case 'Artist':
        return a.artist.localeCompare(b.artist);
      default:
        return 0;
    }
  });

  const togglePlay = (id: string) => {
    setPlayingItem(playingItem === id ? null : id);
  };

  const toggleLike = (id: string) => {
    // Handle like toggle
    // console.log('Toggle like for:', id);
  };

  const toggleDownload = (id: string) => {
    // Handle download toggle
    // console.log('Toggle download for:', id);
  };

  const shareItem = (id: string) => {
    // Handle share
    // console.log('Share item:', id);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'song':
        return <Music className="w-4 h-4" />;
      case 'album':
        return <Headphones className="w-4 h-4" />;
      case 'playlist':
        return <Play className="w-4 h-4" />;
      case 'podcast':
        return <Mic className="w-4 h-4" />;
      default:
        return <Music className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'song':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'album':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'playlist':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'podcast':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Music className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Music & Podcasts
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Discover and enjoy your favorite music and podcasts
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search music and podcasts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {sortedMusic.length} of {mockMusicData.length} items
          </p>
        </div>

        {/* Music Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedMusic.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Cover Image */}
                <div className="relative aspect-square">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => togglePlay(item.id)}
                      className="bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full transition-colors"
                    >
                      {playingItem === item.id ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6 ml-1" />
                      )}
                    </button>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                      {item.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {item.artist}
                  </p>
                  {item.album && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                      {item.album}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleLike(item.id)}
                        className={`p-2 rounded-full transition-colors ${
                          item.isLiked
                            ? 'text-red-500 hover:text-red-600'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${item.isLiked ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => toggleDownload(item.id)}
                        className={`p-2 rounded-full transition-colors ${
                          item.isDownloaded
                            ? 'text-green-500 hover:text-green-600'
                            : 'text-gray-400 hover:text-green-500'
                        }`}
                      >
                        <Download className={`w-4 h-4 ${item.isDownloaded ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <button
                      onClick={() => shareItem(item.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Artist
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {sortedMusic.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={item.cover}
                            alt={item.title}
                            className="w-10 h-10 rounded mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.title}
                            </div>
                            {item.album && (
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {item.album}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {item.artist}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                          {getTypeIcon(item.type)}
                          <span className="ml-1">{item.type}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {item.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {item.rating}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => togglePlay(item.id)}
                            className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                          >
                            {playingItem === item.id ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => toggleLike(item.id)}
                            className={`${
                              item.isLiked
                                ? 'text-red-500 hover:text-red-600'
                                : 'text-gray-400 hover:text-red-500'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${item.isLiked ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => toggleDownload(item.id)}
                            className={`${
                              item.isDownloaded
                                ? 'text-green-500 hover:text-green-600'
                                : 'text-gray-400 hover:text-green-500'
                            }`}
                          >
                            <Download className={`w-4 h-4 ${item.isDownloaded ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => shareItem(item.id)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}