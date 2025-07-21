'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Shuffle,
  Repeat,
  Heart,
  Share2,
  Download,
  List,
  Music,
  Headphones,
  Radio,
  Mic,
  Settings,
  Clock,
  TrendingUp,
  Users,
  Star
} from 'lucide-react';

interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  url: string;
  isLiked: boolean;
  isPlaying: boolean;
  quality: 'low' | 'medium' | 'high' | 'lossless';
  bitrate: number;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: AudioTrack[];
  cover: string;
  isPublic: boolean;
  createdAt: Date;
}

interface AudioStats {
  totalTracks: number;
  totalPlaytime: number;
  favoriteTracks: number;
  playlists: number;
  averageBitrate: number;
  streamingQuality: string;
}

export default function AudioStreaming() {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>({
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Echo',
    album: 'Nightfall',
    duration: 245, // 4:05
    cover: '/api/placeholder/300/300',
    url: 'https://example.com/track1.mp3',
    isLiked: true,
    isPlaying: true,
    quality: 'high',
    bitrate: 320
  });

  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: '1',
      name: 'Chill Vibes',
      description: 'Relaxing tunes for your downtime',
      tracks: [],
      cover: '/api/placeholder/300/300',
      isPublic: true,
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Workout Mix',
      description: 'High energy tracks for your workout',
      tracks: [],
      cover: '/api/placeholder/300/300',
      isPublic: false,
      createdAt: new Date('2024-01-20')
    }
  ]);

  const [queue, setQueue] = useState<AudioTrack[]>([
    {
      id: '2',
      title: 'Electric Soul',
      artist: 'Neon Pulse',
      album: 'Digital Dreams',
      duration: 198,
      cover: '/api/placeholder/300/300',
      url: 'https://example.com/track2.mp3',
      isLiked: false,
      isPlaying: false,
      quality: 'high',
      bitrate: 320
    },
    {
      id: '3',
      title: 'Ocean Waves',
      artist: 'Ambient Flow',
      album: 'Nature Sounds',
      duration: 320,
      cover: '/api/placeholder/300/300',
      url: 'https://example.com/track3.mp3',
      isLiked: true,
      isPlaying: false,
      quality: 'lossless',
      bitrate: 1411
    }
  ]);

  const [audioSettings, setAudioSettings] = useState({
    volume: 75,
    isMuted: false,
    isShuffled: false,
    repeatMode: 'none', // none, one, all
    crossfade: 3,
    equalizer: {
      bass: 0,
      mid: 0,
      treble: 0,
      sub: 0
    },
    quality: 'high',
    crossfadeEnabled: true,
    normalization: true,
    gaplessPlayback: true
  });

  const [stats, setStats] = useState<AudioStats>({
    totalTracks: 1247,
    totalPlaytime: 45678, // minutes
    favoriteTracks: 89,
    playlists: 12,
    averageBitrate: 256,
    streamingQuality: 'High Quality'
  });

  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (currentTrack) {
      setCurrentTrack({ ...currentTrack, isPlaying: !isPlaying });
    }
  };

  const toggleLike = () => {
    if (currentTrack) {
      setCurrentTrack({ ...currentTrack, isLiked: !currentTrack.isLiked });
    }
  };

  const skipTrack = (direction: 'next' | 'prev') => {
    // Simulate track switching
    // // console.log(`Skipping ${direction} track`);
  };

  const toggleShuffle = () => {
    setAudioSettings(prev => ({ ...prev, isShuffled: !prev.isShuffled }));
  };

  const toggleRepeat = () => {
    const modes = ['none', 'one', 'all'];
    const currentIndex = modes.indexOf(audioSettings.repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setAudioSettings(prev => ({ ...prev, repeatMode: modes[nextIndex] as any }));
  };

  const getRepeatIcon = () => {
    switch (audioSettings.repeatMode) {
      case 'one':
        return <Repeat className="h-5 w-5 text-blue-500" />;
      case 'all':
        return <Repeat className="h-5 w-5 text-green-500" />;
      default:
        return <Repeat className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Audio Streaming</h1>
          <p className="text-muted-foreground">
            High-quality audio streaming with advanced controls and analytics
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Music className="h-4 w-4" />
          Upload Audio
        </Button>
      </div>

      <Tabs defaultValue="player" className="space-y-4">
        <TabsList>
          <TabsTrigger value="player">Player</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="queue">Queue</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="player" className="space-y-4">
          {/* Now Playing Card */}
          <Card>
            <CardHeader>
              <CardTitle>Now Playing</CardTitle>
              <CardDescription>
                {currentTrack?.artist} • {currentTrack?.album}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={currentTrack?.cover}
                    alt={currentTrack?.title}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
                    {isPlaying ? (
                      <Pause className="h-8 w-8 text-white" />
                    ) : (
                      <Play className="h-8 w-8 text-white" />
                    )}
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{currentTrack?.title}</h3>
                    <p className="text-muted-foreground">{currentTrack?.artist}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline">{currentTrack?.quality}</Badge>
                      <Badge variant="outline">{currentTrack?.bitrate} kbps</Badge>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(currentTrack?.duration || 0)}</span>
                    </div>
                    <Progress 
                      value={(currentTime / (currentTrack?.duration || 1)) * 100} 
                      className="h-2" 
                    />
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => skipTrack('prev')}
                      >
                        <SkipBack className="h-4 w-4" />
                      </Button>
                      <Button
                        size="lg"
                        onClick={togglePlay}
                        className="rounded-full w-12 h-12"
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => skipTrack('next')}
                      >
                        <SkipForward className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleShuffle}
                        className={audioSettings.isShuffled ? 'bg-blue-100' : ''}
                      >
                        <Shuffle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleRepeat}
                      >
                        {getRepeatIcon()}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleLike}
                      >
                        <Heart className={`h-4 w-4 ${currentTrack?.isLiked ? 'text-red-500 fill-current' : ''}`} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAudioSettings(prev => ({ ...prev, isMuted: !prev.isMuted }))}
                    >
                      {audioSettings.isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <Slider
                      value={[audioSettings.volume]}
                      onValueChange={(value) => setAudioSettings(prev => ({ ...prev, volume: value[0] }))}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm w-12">{audioSettings.volume}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tracks</CardTitle>
                <Music className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalTracks.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  In your library
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Playtime</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{Math.round(stats.totalPlaytime / 60)}h</div>
                <p className="text-xs text-muted-foreground">
                  {stats.totalPlaytime} minutes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Favorites</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.favoriteTracks}</div>
                <p className="text-xs text-muted-foreground">
                  Liked tracks
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quality</CardTitle>
                <Headphones className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averageBitrate}</div>
                <p className="text-xs text-muted-foreground">
                  kbps average
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="playlists" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Your Playlists</h3>
            <Button>Create Playlist</Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {playlists.map((playlist) => (
              <Card key={playlist.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={playlist.cover}
                      alt={playlist.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{playlist.name}</h4>
                      <p className="text-sm text-muted-foreground">{playlist.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant={playlist.isPublic ? "default" : "secondary"}>
                          {playlist.isPublic ? 'Public' : 'Private'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {playlist.tracks.length} tracks
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="queue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Queue</CardTitle>
              <CardDescription>
                Upcoming tracks in your queue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {queue.map((track, index) => (
                  <div key={track.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-muted-foreground w-8">{index + 1}</span>
                      <img
                        src={track.cover}
                        alt={track.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <h4 className="font-medium">{track.title}</h4>
                        <p className="text-sm text-muted-foreground">{track.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {formatTime(track.duration)}
                      </span>
                      <Button variant="outline" size="sm">
                        <Heart className={`h-4 w-4 ${track.isLiked ? 'text-red-500 fill-current' : ''}`} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Listening Habits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Daily Average</span>
                  <span className="font-medium">2.5 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Weekly Total</span>
                  <span className="font-medium">17.8 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Monthly Total</span>
                  <span className="font-medium">76.2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Favorite Genre</span>
                  <span className="font-medium">Electronic</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Streaming Quality</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Average Bitrate</span>
                  <span className="font-medium">{stats.averageBitrate} kbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Lossless Streams</span>
                  <span className="font-medium">23%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">High Quality</span>
                  <span className="font-medium">67%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Standard</span>
                  <span className="font-medium">10%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Top Artists</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Luna Echo</span>
                  <span className="font-medium">45 plays</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Neon Pulse</span>
                  <span className="font-medium">32 plays</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Ambient Flow</span>
                  <span className="font-medium">28 plays</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Digital Dreams</span>
                  <span className="font-medium">22 plays</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audio Settings</CardTitle>
              <CardDescription>
                Configure your audio streaming preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Crossfade</label>
                    <p className="text-xs text-muted-foreground">
                      Smooth transition between tracks
                    </p>
                  </div>
                  <Switch
                    checked={audioSettings.crossfadeEnabled}
                    onCheckedChange={(checked) => setAudioSettings(prev => ({ ...prev, crossfadeEnabled: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Audio Normalization</label>
                    <p className="text-xs text-muted-foreground">
                      Normalize volume levels across tracks
                    </p>
                  </div>
                  <Switch
                    checked={audioSettings.normalization}
                    onCheckedChange={(checked) => setAudioSettings(prev => ({ ...prev, normalization: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Gapless Playback</label>
                    <p className="text-xs text-muted-foreground">
                      Remove silence between tracks
                    </p>
                  </div>
                  <Switch
                    checked={audioSettings.gaplessPlayback}
                    onCheckedChange={(checked) => setAudioSettings(prev => ({ ...prev, gaplessPlayback: checked }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Crossfade Duration</label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Slider
                      value={[audioSettings.crossfade]}
                      onValueChange={(value) => setAudioSettings(prev => ({ ...prev, crossfade: value[0] }))}
                      max={10}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-12">{audioSettings.crossfade}s</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Equalizer</label>
                  <div className="grid grid-cols-4 gap-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-xs">Bass</label>
                      <Slider
                        value={[audioSettings.equalizer.bass]}
                        onValueChange={(value) => setAudioSettings(prev => ({ 
                          ...prev, 
                          equalizer: { ...prev.equalizer, bass: value[0] }
                        }))}
                        min={-12}
                        max={12}
                        step={1}
                        orientation="vertical"
                        className="h-24"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs">Mid</label>
                      <Slider
                        value={[audioSettings.equalizer.mid]}
                        onValueChange={(value) => setAudioSettings(prev => ({ 
                          ...prev, 
                          equalizer: { ...prev.equalizer, mid: value[0] }
                        }))}
                        min={-12}
                        max={12}
                        step={1}
                        orientation="vertical"
                        className="h-24"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs">Treble</label>
                      <Slider
                        value={[audioSettings.equalizer.treble]}
                        onValueChange={(value) => setAudioSettings(prev => ({ 
                          ...prev, 
                          equalizer: { ...prev.equalizer, treble: value[0] }
                        }))}
                        min={-12}
                        max={12}
                        step={1}
                        orientation="vertical"
                        className="h-24"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs">Sub</label>
                      <Slider
                        value={[audioSettings.equalizer.sub]}
                        onValueChange={(value) => setAudioSettings(prev => ({ 
                          ...prev, 
                          equalizer: { ...prev.equalizer, sub: value[0] }
                        }))}
                        min={-12}
                        max={12}
                        step={1}
                        orientation="vertical"
                        className="h-24"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Streaming Quality</label>
                  <select 
                    className="mt-2 w-full p-2 border rounded-md"
                    value={audioSettings.quality}
                    onChange={(e) => setAudioSettings(prev => ({ ...prev, quality: e.target.value as any }))}
                  >
                    <option value="low">Low (96 kbps)</option>
                    <option value="medium">Medium (160 kbps)</option>
                    <option value="high">High (320 kbps)</option>
                    <option value="lossless">Lossless (1411 kbps)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}