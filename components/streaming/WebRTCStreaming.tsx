'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { 
  Video, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  Users, 
  Eye, 
  Settings, 
  Play, 
  Square, 
  Monitor, 
  Wifi, 
  Signal, 
  Volume2,
  MessageSquare,
  Share2,
  Heart,
  Flag,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface StreamStats {
  viewers: number;
  likes: number;
  comments: number;
  shares: number;
  bitrate: number;
  fps: number;
  resolution: string;
  uptime: string;
}

interface Viewer {
  id: string;
  name: string;
  avatar: string;
  joinedAt: string;
  isModerator: boolean;
  isSubscriber: boolean;
}

interface ChatMessage {
  id: string;
  viewerId: string;
  viewerName: string;
  message: string;
  timestamp: string;
  isModerator: boolean;
}

export default function WebRTCStreaming() {
  const [isLive, setIsLive] = useState(false);
  const [streamTitle, setStreamTitle] = useState('My Live Stream');
  const [streamDescription, setStreamDescription] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [streamQuality, setStreamQuality] = useState('720p');
  const [bitrate, setBitrate] = useState(2500);
  const [fps, setFps] = useState(30);
  const [activeTab, setActiveTab] = useState('stream');
  
  const [streamStats, setStreamStats] = useState<StreamStats>({
    viewers: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    bitrate: 2500,
    fps: 30,
    resolution: '1280x720',
    uptime: '00:00:00'
  });

  const [viewers, setViewers] = useState<Viewer[]>([
    { id: '1', name: 'John Doe', avatar: '/avatars/john.jpg', joinedAt: '2 min ago', isModerator: false, isSubscriber: true },
    { id: '2', name: 'Jane Smith', avatar: '/avatars/jane.jpg', joinedAt: '5 min ago', isModerator: true, isSubscriber: false },
    { id: '3', name: 'Mike Johnson', avatar: '/avatars/mike.jpg', joinedAt: '1 min ago', isModerator: false, isSubscriber: false },
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', viewerId: '1', viewerName: 'John Doe', message: 'Great stream!', timestamp: '2:30 PM', isModerator: false },
    { id: '2', viewerId: '2', viewerName: 'Jane Smith', message: 'Welcome everyone!', timestamp: '2:31 PM', isModerator: true },
    { id: '3', viewerId: '3', viewerName: 'Mike Johnson', message: 'How are you doing?', timestamp: '2:32 PM', isModerator: false },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(true);
  const [showViewers, setShowViewers] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isLive) {
      startStream();
    } else {
      stopStream();
    }
  }, [isLive]);

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      streamRef.current = stream;
      
      // Simulate viewer count increase
      const interval = setInterval(() => {
        setStreamStats(prev => ({
          ...prev,
          viewers: prev.viewers + Math.floor(0.5 * 3),
          uptime: '00:05:30'
        }));
      }, 5000);
      
      return () => clearInterval(interval);
    } catch (error) {
      // // console.error('Error starting stream:', error);
    }
  };

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const toggleMute = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: new Date("2025-07-21T14:00:00Z").getTime().toString(),
        viewerId: 'streamer',
        viewerName: 'You',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString(),
        isModerator: true
      };
      
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleLike = () => {
    setStreamStats(prev => ({ ...prev, likes: prev.likes + 1 }));
  };

  const handleShare = () => {
    setStreamStats(prev => ({ ...prev, shares: prev.shares + 1 }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Live Streaming</h1>
          <p className="text-muted-foreground">Manage your live streams with WebRTC</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isLive ? "destructive" : "secondary"}>
            {isLive ? "LIVE" : "OFFLINE"}
          </Badge>
          <Button
            onClick={() => setIsLive(!isLive)}
            variant={isLive ? "destructive" : "default"}
            size="lg"
          >
            {isLive ? <Square className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isLive ? "End Stream" : "Go Live"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Stream Area */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Live Stream</CardTitle>
                  <CardDescription>Your current live stream</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={toggleMute}>
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" size="sm" onClick={toggleVideo}>
                    {isVideoEnabled ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Stream Settings</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Quality Settings</DropdownMenuItem>
                      <DropdownMenuItem>Audio Settings</DropdownMenuItem>
                      <DropdownMenuItem>Video Settings</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-96 bg-black rounded-lg"
                />
                {!isLive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                    <div className="text-center text-white">
                      <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-semibold">Stream Preview</p>
                      <p className="text-sm opacity-75">Click "Go Live" to start streaming</p>
                    </div>
                  </div>
                )}
                
                {isLive && (
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Badge variant="destructive" className="animate-pulse">
                      LIVE
                    </Badge>
                    <span className="text-white text-sm font-medium">
                      {streamStats.uptime}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Stream Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Stream Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Stream Title</Label>
                  <Input
                    id="title"
                    value={streamTitle}
                    onChange={(e) => setStreamTitle(e.target.value)}
                    placeholder="Enter stream title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quality">Stream Quality</Label>
                  <select
                    id="quality"
                    value={streamQuality}
                    onChange={(e) => setStreamQuality(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="480p">480p</option>
                    <option value="720p">720p</option>
                    <option value="1080p">1080p</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={streamDescription}
                  onChange={(e) => setStreamDescription(e.target.value)}
                  placeholder="Enter stream description"
                  className="w-full p-2 border rounded-md h-20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bitrate: {bitrate} kbps</Label>
                  <Slider
                    value={[bitrate]}
                    onValueChange={(value) => setBitrate(value[0])}
                    max={8000}
                    min={1000}
                    step={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label>FPS: {fps}</Label>
                  <Slider
                    value={[fps]}
                    onValueChange={(value) => setFps(value[0])}
                    max={60}
                    min={15}
                    step={5}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Stream Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Stream Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{streamStats.viewers}</div>
                  <div className="text-sm text-muted-foreground">Viewers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{streamStats.likes}</div>
                  <div className="text-sm text-muted-foreground">Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{streamStats.comments}</div>
                  <div className="text-sm text-muted-foreground">Comments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{streamStats.shares}</div>
                  <div className="text-sm text-muted-foreground">Shares</div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Bitrate</span>
                  <span>{streamStats.bitrate} kbps</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>FPS</span>
                  <span>{streamStats.fps}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Resolution</span>
                  <span>{streamStats.resolution}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={handleLike}>
                <Heart className="w-4 h-4 mr-2" />
                Like Stream
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Stream
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Pin Message
              </Button>
            </CardContent>
          </Card>

          {/* Viewers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Viewers ({viewers.length})
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowViewers(!showViewers)}
                >
                  {showViewers ? 'Hide' : 'Show'}
                </Button>
              </CardTitle>
            </CardHeader>
            {showViewers && (
              <CardContent className="space-y-2">
                {viewers.map((viewer) => (
                  <div key={viewer.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs">
                        {viewer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{viewer.name}</div>
                        <div className="text-xs text-muted-foreground">{viewer.joinedAt}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {viewer.isModerator && (
                        <Badge variant="secondary" className="text-xs">Mod</Badge>
                      )}
                      {viewer.isSubscriber && (
                        <Badge variant="default" className="text-xs">Sub</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>

          {/* Live Chat */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Live Chat
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChat(!showChat)}
                >
                  {showChat ? 'Hide' : 'Show'}
                </Button>
              </CardTitle>
            </CardHeader>
            {showChat && (
              <CardContent className="space-y-4">
                <div className="h-64 overflow-y-auto space-y-2">
                  {chatMessages.map((message) => (
                    <div key={message.id} className="text-sm">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${message.isModerator ? 'text-blue-600' : ''}`}>
                          {message.viewerName}
                        </span>
                        <span className="text-muted-foreground text-xs">{message.timestamp}</span>
                      </div>
                      <p className="text-muted-foreground">{message.message}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button size="sm" onClick={sendMessage}>Send</Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}