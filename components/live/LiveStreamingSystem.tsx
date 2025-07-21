'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  VideoCameraIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
  PlayIcon,
  PauseIcon,
  Cog6ToothIcon,
  SignalIcon,
  WifiIcon
} from '@heroicons/react/24/outline';

interface LiveStream {
  id: string;
  title: string;
  description: string;
  streamerId: string;
  streamerName: string;
  streamerAvatar?: string;
  isLive: boolean;
  viewerCount: number;
  startedAt: Date;
  quality: 'low' | 'medium' | 'high' | 'auto';
  category: string;
  tags: string[];
}

interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'donation' | 'subscription';
  amount?: number;
}

interface StreamStats {
  bitrate: number;
  fps: number;
  resolution: string;
  droppedFrames: number;
  latency: number;
  quality: string;
}

export default function LiveStreamingSystem() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [streamQuality, setStreamQuality] = useState<'low' | 'medium' | 'high' | 'auto'>('auto');
  const [viewerCount, setViewerCount] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newChatMessage, setNewChatMessage] = useState('');
  const [streamStats, setStreamStats] = useState<StreamStats>({
    bitrate: 0,
    fps: 0,
    resolution: '0x0',
    droppedFrames: 0,
    latency: 0,
    quality: 'unknown',
  });
  const [showChat, setShowChat] = useState(true);
  const [showStats, setShowStats] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // محاكاة إحصائيات البث
  useEffect(() => {
    if (isStreaming) {
      const interval = setInterval(() => {
        setStreamStats({
          bitrate: 0.5 * 5000 + 1000,
          fps: 0.5 * 10 + 25,
          resolution: '1920x1080',
          droppedFrames: Math.floor(0.5 * 5),
          latency: 0.5 * 100 + 50,
          quality: ['excellent', 'good', 'fair', 'poor'][Math.floor(0.5 * 4)],
        });
        
        setViewerCount(prev => prev + Math.floor(0.5 * 3) - 1);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isStreaming]);

  // التمرير إلى آخر رسالة في الدردشة
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 },
        },
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      streamRef.current = stream;
      setIsStreaming(true);
      setViewerCount(Math.floor(0.5 * 100) + 50);

      // محاكاة بدء البث
      // console.log('بدء البث المباشر...');
    } catch (error) {
      // console.error('خطأ في بدء البث:', error);
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

    setIsStreaming(false);
    setViewerCount(0);
    // console.log('إيقاف البث المباشر');
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

  const sendChatMessage = () => {
    if (!newChatMessage.trim()) return;

    const message: ChatMessage = {
      id: new Date("2025-07-21T14:00:00Z").getTime().toString(),
      userId: 'current',
      username: 'أنا',
      message: newChatMessage,
      timestamp: new Date(),
      type: 'text',
    };

    setChatMessages(prev => [...prev, message]);
    setNewChatMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent':
        return 'text-green-500';
      case 'good':
        return 'text-blue-500';
      case 'fair':
        return 'text-yellow-500';
      case 'poor':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* منطقة البث الرئيسية */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-black bg-opacity-50 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">مباشر</span>
            </div>
            <span className="text-gray-300 text-sm">
              {viewerCount} مشاهد
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg">
              <ShareIcon className="h-5 w-5" />
            </button>
            <button className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg">
              <EllipsisHorizontalIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Video Area */}
        <div className="flex-1 relative bg-black">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          
          {!isStreaming && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <VideoCameraIcon className="mx-auto h-16 w-16 mb-4 text-gray-400" />
                <h3 className="text-xl font-medium mb-2">ليس هناك بث مباشر</h3>
                <p className="text-gray-400">ابدأ البث لرؤية الفيديو هنا</p>
              </div>
            </div>
          )}

          {/* Stream Controls */}
          {isStreaming && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between bg-black bg-opacity-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMute}
                    className={`p-3 rounded-full ${
                      isMuted ? 'bg-red-600' : 'bg-gray-600'
                    } text-white hover:bg-opacity-80`}
                  >
                    <MicrophoneIcon className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={toggleVideo}
                    className={`p-3 rounded-full ${
                      !isVideoEnabled ? 'bg-red-600' : 'bg-gray-600'
                    } text-white hover:bg-opacity-80`}
                  >
                    <VideoCameraIcon className="h-5 w-5" />
                  </button>
                  
                  <select
                    value={streamQuality}
                    onChange={(e) => setStreamQuality(e.target.value as any)}
                    className="px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600"
                  >
                    <option value="auto">تلقائي</option>
                    <option value="low">منخفض</option>
                    <option value="medium">متوسط</option>
                    <option value="high">عالي</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowStats(!showStats)}
                    className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg"
                  >
                    <Cog6ToothIcon className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={isStreaming ? stopStream : startStream}
                    className={`px-6 py-2 rounded-lg font-medium ${
                      isStreaming
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-green-600 hover:bg-green-700'
                    } text-white`}
                  >
                    {isStreaming ? 'إيقاف البث' : 'بدء البث'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stream Stats */}
        {showStats && isStreaming && (
          <div className="bg-black bg-opacity-75 p-4">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-white text-sm">
              <div>
                <span className="text-gray-400">Bitrate:</span>
                <span className="ml-2">{Math.round(streamStats.bitrate)} kbps</span>
              </div>
              <div>
                <span className="text-gray-400">FPS:</span>
                <span className="ml-2">{Math.round(streamStats.fps)}</span>
              </div>
              <div>
                <span className="text-gray-400">Resolution:</span>
                <span className="ml-2">{streamStats.resolution}</span>
              </div>
              <div>
                <span className="text-gray-400">Dropped Frames:</span>
                <span className="ml-2">{streamStats.droppedFrames}</span>
              </div>
              <div>
                <span className="text-gray-400">Latency:</span>
                <span className="ml-2">{Math.round(streamStats.latency)}ms</span>
              </div>
              <div>
                <span className="text-gray-400">Quality:</span>
                <span className={`ml-2 ${getQualityColor(streamStats.quality)}`}>
                  {streamStats.quality}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Panel */}
      {showChat && (
        <div className="w-80 bg-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-medium">الدردشة المباشرة</h3>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((message) => (
              <div key={message.id} className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {message.username.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium text-sm">
                      {message.username}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mt-1">{message.message}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newChatMessage}
                onChange={(e) => setNewChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                placeholder="اكتب رسالة..."
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={sendChatMessage}
                disabled={!newChatMessage.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                إرسال
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="absolute top-4 right-4 p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          <ChatBubbleLeftIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}