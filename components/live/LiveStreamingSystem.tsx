'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Video, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  Share, 
  Users, 
  Heart, 
  MessageSquare, 
  Settings,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Fullscreen,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
  Signal,
  SignalHigh,
  SignalMedium,
  SignalLow
} from 'lucide-react';

interface LiveStream {
  id: string;
  title: string;
  description: string;
  streamer: {
    name: string;
    avatar: string;
    followers: number;
  };
  viewers: number;
  likes: number;
  isLive: boolean;
  quality: 'low' | 'medium' | 'high' | 'ultra';
  category: string;
  tags: string[];
  thumbnail: string;
  streamUrl: string;
}

interface ChatMessage {
  id: string;
  user: {
    name: string;
    avatar: string;
    isModerator: boolean;
    isSubscriber: boolean;
  };
  message: string;
  timestamp: Date;
  type: 'message' | 'donation' | 'subscription' | 'moderation';
}

const mockLiveStreams: LiveStream[] = [
  {
    id: '1',
    title: 'بث مباشر: مشاهدة فيلم The Matrix مع التعليق',
    description: 'مشاهدة فيلم The Matrix مع التعليق المباشر والمناقشة مع المشاهدين',
    streamer: {
      name: 'أحمد محمد',
      avatar: '/avatars/ahmed.jpg',
      followers: 15420
    },
    viewers: 1247,
    likes: 892,
    isLive: true,
    quality: 'high',
    category: 'أفلام',
    tags: ['أفلام', 'خيال علمي', 'مشاهدة مباشرة'],
    thumbnail: '/thumbnails/matrix-live.jpg',
    streamUrl: 'https://stream.example.com/matrix-live'
  },
  {
    id: '2',
    title: 'مراجعة مسلسل Breaking Bad',
    description: 'مراجعة شاملة لمسلسل Breaking Bad مع تحليل الشخصيات والحبكة',
    streamer: {
      name: 'سارة أحمد',
      avatar: '/avatars/sara.jpg',
      followers: 8920
    },
    viewers: 567,
    likes: 234,
    isLive: true,
    quality: 'medium',
    category: 'مسلسلات',
    tags: ['مسلسلات', 'دراما', 'مراجعة'],
    thumbnail: '/thumbnails/breaking-bad-live.jpg',
    streamUrl: 'https://stream.example.com/breaking-bad-live'
  }
];

const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    user: {
      name: 'محمد علي',
      avatar: '/avatars/mohamed.jpg',
      isModerator: false,
      isSubscriber: true
    },
    message: 'الفيلم رائع جداً!',
    timestamp: new Date(),
    type: 'message'
  },
  {
    id: '2',
    user: {
      name: 'فاطمة أحمد',
      avatar: '/avatars/fatima.jpg',
      isModerator: true,
      isSubscriber: false
    },
    message: 'مرحباً بالجميع! 👋',
    timestamp: new Date(),
    type: 'message'
  },
  {
    id: '3',
    user: {
      name: 'أحمد محمد',
      avatar: '/avatars/ahmed.jpg',
      isModerator: false,
      isSubscriber: true
    },
    message: 'شكراً على المشاهدة! ❤️',
    timestamp: new Date(),
    type: 'message'
  }
];

export default function LiveStreamingSystem() {
  const [selectedStream, setSelectedStream] = useState<LiveStream | null>(null);
  const [isWatching, setIsWatching] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [showChat, setShowChat] = useState(true);
  const [streamQuality, setStreamQuality] = useState<'low' | 'medium' | 'high' | 'ultra'>('high');
  const [networkQuality, setNetworkQuality] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good');
  const [isLiked, setIsLiked] = useState(false);
  const [viewerCount, setViewerCount] = useState(1247);
  const [likeCount, setLikeCount] = useState(892);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // محاكاة تحديث عدد المشاهدين
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // تمرير إلى آخر رسالة في الشات
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleStartWatching = (stream: LiveStream) => {
    setSelectedStream(stream);
    setIsWatching(true);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      user: {
        name: 'أنت',
        avatar: '/avatars/user.jpg',
        isModerator: false,
        isSubscriber: true
      },
      message: chatMessage,
      timestamp: new Date(),
      type: 'message'
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatMessage('');
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleQualityChange = (quality: 'low' | 'medium' | 'high' | 'ultra') => {
    setStreamQuality(quality);
    // هنا يتم تغيير جودة البث
  };

  const getNetworkQualityIcon = () => {
    switch (networkQuality) {
      case 'excellent':
        return <SignalHigh className="w-4 h-4 text-green-500" />;
      case 'good':
        return <Signal className="w-4 h-4 text-blue-500" />;
      case 'fair':
        return <SignalMedium className="w-4 h-4 text-yellow-500" />;
      case 'poor':
        return <SignalLow className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
      <div className="max-w-7xl mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">البث المباشر</h1>
          <p className="text-slate-300 text-lg">شاهد البث المباشر وتفاعل مع المذيعين</p>
        </div>

        {!isWatching ? (
          // قائمة البث المباشر
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockLiveStreams.map((stream) => (
              <Card key={stream.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                <div className="relative">
                  <img 
                    src={stream.thumbnail} 
                    alt={stream.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    🔴 مباشر
                  </Badge>
                  <Badge className="absolute top-2 right-2 bg-black/50 text-white">
                    {stream.viewers.toLocaleString()} مشاهد
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-white text-lg">{stream.title}</CardTitle>
                  <CardDescription className="text-slate-300">
                    {stream.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={stream.streamer.avatar} />
                      <AvatarFallback>{stream.streamer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-semibold">{stream.streamer.name}</p>
                      <p className="text-slate-400 text-sm">
                        {stream.streamer.followers.toLocaleString()} متابع
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    {stream.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => handleStartWatching(stream)}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    شاهد الآن
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // واجهة المشاهدة
          <div className="grid lg:grid-cols-4 gap-6">
            {/* الفيديو الرئيسي */}
            <div className="lg:col-span-3">
              <Card className="bg-black">
                <div className="relative">
                  <video
                    ref={videoRef}
                    className="w-full h-96 lg:h-[600px] object-cover"
                    poster={selectedStream?.thumbnail}
                    controls
                  >
                    <source src={selectedStream?.streamUrl} type="video/mp4" />
                  </video>
                  
                  {/* معلومات البث */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Badge className="bg-red-500 text-white">
                      🔴 مباشر
                    </Badge>
                    <Badge variant="secondary">
                      {viewerCount.toLocaleString()} مشاهد
                    </Badge>
                    {getNetworkQualityIcon()}
                  </div>
                  
                  {/* أزرار التحكم */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                      <Fullscreen className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setShowChat(!showChat)}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedStream?.streamer.avatar} />
                        <AvatarFallback>{selectedStream?.streamer.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-white font-semibold">{selectedStream?.title}</h3>
                        <p className="text-slate-400">{selectedStream?.streamer.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant={isLiked ? "default" : "outline"}
                        onClick={handleLike}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        {likeCount}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 mb-4">{selectedStream?.description}</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Label className="text-white">الجودة:</Label>
                      <Select value={streamQuality} onValueChange={(value: any) => handleQualityChange(value)}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">منخفضة</SelectItem>
                          <SelectItem value="medium">متوسطة</SelectItem>
                          <SelectItem value="high">عالية</SelectItem>
                          <SelectItem value="ultra">فائقة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsWatching(false)}
                    >
                      خروج
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* الشات */}
            {showChat && (
              <div className="lg:col-span-1">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-white">المحادثة المباشرة</CardTitle>
                    <CardDescription className="text-slate-400">
                      {chatMessages.length} رسالة
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    <div 
                      ref={chatRef}
                      className="flex-1 overflow-y-auto space-y-3 mb-4"
                    >
                      {chatMessages.map((message) => (
                        <div key={message.id} className="flex items-start gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={message.user.avatar} />
                            <AvatarFallback>{message.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-semibold text-sm">
                                {message.user.name}
                              </span>
                              {message.user.isModerator && (
                                <Badge variant="secondary" className="text-xs">مشرف</Badge>
                              )}
                              {message.user.isSubscriber && (
                                <Badge className="bg-yellow-500 text-xs">مشترك</Badge>
                              )}
                            </div>
                            <p className="text-slate-300 text-sm">{message.message}</p>
                            <span className="text-slate-500 text-xs">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Input
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="اكتب رسالتك..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} size="sm">
                        إرسال
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}