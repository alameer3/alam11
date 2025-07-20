'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  PaperAirplaneIcon,
  UserCircleIcon,
  EllipsisHorizontalIcon,
  PhoneIcon,
  VideoCameraIcon,
  PaperClipIcon,
  EmojiHappyIcon,
  MicrophoneIcon
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'voice';
  status: 'sent' | 'delivered' | 'read';
}

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: Date;
}

interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group';
  participants: ChatUser[];
  lastMessage?: Message;
  unreadCount: number;
}

export default function ChatSystem() {
  const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // بيانات تجريبية
  useEffect(() => {
    const mockChatRooms: ChatRoom[] = [
      {
        id: '1',
        name: 'أحمد محمد',
        type: 'direct',
        participants: [
          { id: '1', name: 'أحمد محمد', status: 'online' },
          { id: 'current', name: 'أنا', status: 'online' },
        ],
        lastMessage: {
          id: '1',
          senderId: '1',
          senderName: 'أحمد محمد',
          content: 'مرحباً! كيف حالك؟',
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          type: 'text',
          status: 'read',
        },
        unreadCount: 0,
      },
      {
        id: '2',
        name: 'سارة أحمد',
        type: 'direct',
        participants: [
          { id: '2', name: 'سارة أحمد', status: 'away' },
          { id: 'current', name: 'أنا', status: 'online' },
        ],
        lastMessage: {
          id: '2',
          senderId: 'current',
          senderName: 'أنا',
          content: 'شكراً لك!',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          type: 'text',
          status: 'delivered',
        },
        unreadCount: 2,
      },
      {
        id: '3',
        name: 'فريق العمل',
        type: 'group',
        participants: [
          { id: '1', name: 'أحمد محمد', status: 'online' },
          { id: '2', name: 'سارة أحمد', status: 'away' },
          { id: '3', name: 'محمد علي', status: 'offline' },
          { id: 'current', name: 'أنا', status: 'online' },
        ],
        lastMessage: {
          id: '3',
          senderId: '1',
          senderName: 'أحمد محمد',
          content: 'هل انتهى الجميع من المهمة؟',
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          type: 'text',
          status: 'read',
        },
        unreadCount: 5,
      },
    ];

    setChatRooms(mockChatRooms);
  }, []);

  // تحميل الرسائل عند اختيار محادثة
  useEffect(() => {
    if (selectedChat) {
      const mockMessages: Message[] = [
        {
          id: '1',
          senderId: selectedChat.participants[0].id,
          senderName: selectedChat.participants[0].name,
          content: 'مرحباً! كيف حالك؟',
          timestamp: new Date(Date.now() - 1000 * 60 * 10),
          type: 'text',
          status: 'read',
        },
        {
          id: '2',
          senderId: 'current',
          senderName: 'أنا',
          content: 'أهلاً! أنا بخير، شكراً لك. كيف حالك أنت؟',
          timestamp: new Date(Date.now() - 1000 * 60 * 8),
          type: 'text',
          status: 'read',
        },
        {
          id: '3',
          senderId: selectedChat.participants[0].id,
          senderName: selectedChat.participants[0].name,
          content: 'أنا أيضاً بخير، شكراً! هل انتهيت من المشروع؟',
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          type: 'text',
          status: 'read',
        },
        {
          id: '4',
          senderId: 'current',
          senderName: 'أنا',
          content: 'نعم، انتهيت منه أمس. هل تريد أن تراجع عليه؟',
          timestamp: new Date(Date.now() - 1000 * 60 * 2),
          type: 'text',
          status: 'delivered',
        },
      ];

      setMessages(mockMessages);
    }
  }, [selectedChat]);

  // التمرير إلى آخر رسالة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'current',
      senderName: 'أنا',
      content: newMessage,
      timestamp: new Date(),
      type: 'text',
      status: 'sent',
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // محاكاة استجابة
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedChat.participants[0].id,
        senderName: selectedChat.participants[0].name,
        content: 'شكراً لك! سأراجعه قريباً.',
        timestamp: new Date(),
        type: 'text',
        status: 'sent',
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedChat) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: 'current',
        senderName: 'أنا',
        content: `ملف: ${file.name}`,
        timestamp: new Date(),
        type: 'file',
        status: 'sent',
      };
      setMessages(prev => [...prev, message]);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredChatRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* قائمة المحادثات */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">المحادثات</h2>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <EllipsisHorizontalIcon className="h-5 w-5" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="البحث في المحادثات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-2.5">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChatRooms.map((room) => (
            <div
              key={room.id}
              onClick={() => setSelectedChat(room)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedChat?.id === room.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <UserCircleIcon className="h-8 w-8 text-gray-600" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(room.participants[0].status)}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {room.name}
                    </h3>
                    {room.lastMessage && (
                      <span className="text-xs text-gray-500">
                        {formatTime(room.lastMessage.timestamp)}
                      </span>
                    )}
                  </div>
                  
                  {room.lastMessage && (
                    <p className="text-sm text-gray-600 truncate">
                      {room.lastMessage.senderId === 'current' ? 'أنت: ' : ''}
                      {room.lastMessage.content}
                    </p>
                  )}
                  
                  {room.unreadCount > 0 && (
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">
                        {room.unreadCount} رسالة جديدة
                      </span>
                      <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                        {room.unreadCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* منطقة المحادثة */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <UserCircleIcon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(selectedChat.participants[0].status)}`} />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedChat.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedChat.participants[0].status === 'online' ? 'متصل الآن' :
                       selectedChat.participants[0].status === 'away' ? 'غير متاح' : 'غير متصل'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                    <PhoneIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                    <VideoCameraIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === 'current' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === 'current'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-medium">
                        {message.senderName}
                      </span>
                      <span className={`text-xs ${
                        message.senderId === 'current' ? 'text-blue-200' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                  <PaperClipIcon className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                  <EmojiHappyIcon className="h-5 w-5" />
                </button>
                
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="اكتب رسالة..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                  <MicrophoneIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <UserCircleIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                اختر محادثة للبدء
              </h3>
              <p className="text-gray-500">
                اختر من قائمة المحادثات على اليسار
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}