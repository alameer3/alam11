'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare,
  Send,
  Phone,
  Video,
  Mic,
  Paperclip,
  Smile,
  MoreVertical,
  Search,
  Filter,
  Settings,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Eye,
  Edit,
  Trash2,
  Download,
  Share,
  Archive,
  Block,
  Ban
} from 'lucide-react';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'voice' | 'video';
  isRead: boolean;
  isEdited: boolean;
  reactions: Reaction[];
}

interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

interface ChatSession {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'online' | 'offline' | 'away' | 'busy';
  isTyping: boolean;
  messages: ChatMessage[];
}

interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  category: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export default function LiveChat() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [selectedTab, setSelectedTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load chat data
    setChatSessions([
      {
        id: '1',
        participantId: 'user1',
        participantName: 'أحمد محمد',
        participantAvatar: '/avatars/ahmed.jpg',
        lastMessage: 'شكراً لك على المساعدة!',
        lastMessageTime: '2024-01-20T10:30:00',
        unreadCount: 2,
        status: 'online',
        isTyping: false,
        messages: [
          {
            id: '1',
            senderId: 'user1',
            senderName: 'أحمد محمد',
            senderAvatar: '/avatars/ahmed.jpg',
            content: 'مرحباً، كيف يمكنني مساعدتك؟',
            timestamp: '2024-01-20T10:25:00',
            type: 'text',
            isRead: true,
            isEdited: false,
            reactions: []
          },
          {
            id: '2',
            senderId: 'current',
            senderName: 'أنا',
            senderAvatar: '/avatars/me.jpg',
            content: 'أحتاج مساعدة في تسجيل الدخول',
            timestamp: '2024-01-20T10:28:00',
            type: 'text',
            isRead: true,
            isEdited: false,
            reactions: []
          },
          {
            id: '3',
            senderId: 'user1',
            senderName: 'أحمد محمد',
            senderAvatar: '/avatars/ahmed.jpg',
            content: 'شكراً لك على المساعدة!',
            timestamp: '2024-01-20T10:30:00',
            type: 'text',
            isRead: false,
            isEdited: false,
            reactions: []
          }
        ]
      },
      {
        id: '2',
        participantId: 'user2',
        participantName: 'سارة أحمد',
        participantAvatar: '/avatars/sara.jpg',
        lastMessage: 'هل يمكنني الحصول على خصم؟',
        lastMessageTime: '2024-01-20T09:15:00',
        unreadCount: 0,
        status: 'away',
        isTyping: true,
        messages: []
      }
    ]);

    setSupportTickets([
      {
        id: '1',
        userId: 'user1',
        userName: 'أحمد محمد',
        subject: 'مشكلة في تسجيل الدخول',
        description: 'لا يمكنني تسجيل الدخول إلى حسابي',
        priority: 'medium',
        status: 'in_progress',
        category: 'technical',
        assignedTo: 'فاطمة حسن',
        createdAt: '2024-01-20T09:00:00',
        updatedAt: '2024-01-20T10:30:00',
        messages: []
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'سارة أحمد',
        subject: 'طلب خصم على الاشتراك',
        description: 'أريد خصم على الاشتراك السنوي',
        priority: 'low',
        status: 'open',
        category: 'billing',
        createdAt: '2024-01-20T08:30:00',
        updatedAt: '2024-01-20T08:30:00',
        messages: []
      }
    ]);
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: ChatMessage = {
      id: new Date("2025-07-21T14:00:00Z").getTime().toString(),
      senderId: 'current',
      senderName: 'أنا',
      senderAvatar: '/avatars/me.jpg',
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text',
      isRead: false,
      isEdited: false,
      reactions: []
    };

    setChatSessions(prev => prev.map(chat => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          messages: [...chat.messages, message],
          lastMessage: newMessage,
          lastMessageTime: new Date().toISOString()
        };
      }
      return chat;
    }));

    setNewMessage('');
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColorTicket = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">الدردشة المباشرة</h1>
          <p className="text-gray-600">إدارة الدردشات ودعم العملاء</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            الإعدادات
          </Button>
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            دردشة جديدة
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الدردشات النشطة</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {chatSessions.filter(chat => chat.status === 'online').length}
            </div>
            <p className="text-xs text-muted-foreground">+3 من اليوم</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">التذاكر المفتوحة</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {supportTickets.filter(ticket => ticket.status === 'open').length}
            </div>
            <p className="text-xs text-muted-foreground">+2 من اليوم</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط الاستجابة</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3 د</div>
            <p className="text-xs text-muted-foreground">-0.5 د من أمس</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">رضا العملاء</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">+0.2 من الشهر الماضي</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat List */}
        <div className="lg:col-span-1">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chats">الدردشات</TabsTrigger>
              <TabsTrigger value="support">الدعم</TabsTrigger>
            </TabsList>

            {/* Chats Tab */}
            <TabsContent value="chats" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>الدردشات</CardTitle>
                  <CardDescription>المحادثات النشطة</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {chatSessions.map((chat) => (
                      <div
                        key={chat.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedChat?.id === chat.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedChat(chat)}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={chat.participantAvatar} />
                            <AvatarFallback>{chat.participantName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(chat.status)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm truncate">{chat.participantName}</h4>
                            <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                          {chat.isTyping && (
                            <p className="text-xs text-blue-600">يكتب...</p>
                          )}
                        </div>
                        {chat.unreadCount > 0 && (
                          <Badge variant="default" className="text-xs">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Support Tab */}
            <TabsContent value="support" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>تذاكر الدعم</CardTitle>
                  <CardDescription>طلبات دعم العملاء</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {supportTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedTicket?.id === ticket.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{ticket.subject}</h4>
                            <p className="text-xs text-gray-500">{ticket.userName}</p>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            <Badge className={getPriorityColor(ticket.priority)}>
                              {ticket.priority}
                            </Badge>
                            <Badge className={getStatusColorTicket(ticket.status)}>
                              {ticket.status === 'open' ? 'مفتوح' : 
                               ticket.status === 'in_progress' ? 'قيد المعالجة' : 
                               ticket.status === 'resolved' ? 'محلول' : 'مغلق'}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2 truncate">{ticket.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{ticket.createdAt}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={selectedChat.participantAvatar} />
                          <AvatarFallback>{selectedChat.participantName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(selectedChat.status)}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{selectedChat.participantName}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedChat.status === 'online' ? 'متصل' : 
                           selectedChat.status === 'away' ? 'غائب' : 
                           selectedChat.status === 'busy' ? 'مشغول' : 'غير متصل'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === 'current' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.senderId === 'current' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={message.senderAvatar} />
                          <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className={`rounded-lg px-3 py-2 ${
                          message.senderId === 'current' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderId === 'current' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-end space-x-2">
                    <div className="flex-1">
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="اكتب رسالتك..."
                        className="min-h-[60px] resize-none"
                      />
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button size="sm" onClick={sendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">اختر محادثة</h3>
                  <p className="text-gray-500">اختر محادثة من القائمة لبدء الدردشة</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}