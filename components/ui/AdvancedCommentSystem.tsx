'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  MessageSquare, 
  Star, 
  Heart, 
  ThumbsUp, 
  ThumbsDown,
  Reply,
  Flag,
  Edit,
  Trash2,
  MoreVertical,
  Send,
  User,
  Crown,
  Shield,
  Award,
  TrendingUp,
  Clock,
  Eye,
  Filter,
  SortAsc,
  SortDesc,
  Smile,
  Frown,
  Meh,
  Zap,
  Brain,
  Sparkles
} from 'lucide-react';

interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  userRole: 'user' | 'moderator' | 'admin' | 'vip';
  content: string;
  rating: number;
  timestamp: string;
  likes: number;
  dislikes: number;
  replies: Comment[];
  isEdited: boolean;
  isVerified: boolean;
  isTopComment: boolean;
  sentiment: 'positive' | 'negative' | 'neutral';
  tags: string[];
  helpfulCount: number;
  reportCount: number;
}

interface AdvancedCommentSystemProps {
  contentId: string;
  contentType: 'movie' | 'series' | 'show' | 'mix';
  onCommentSubmit?: (comment: Omit<Comment, 'id' | 'timestamp' | 'likes' | 'dislikes' | 'replies' | 'isEdited' | 'isVerified' | 'isTopComment' | 'sentiment' | 'tags' | 'helpfulCount' | 'reportCount'>) => void;
  onRatingSubmit?: (rating: number) => void;
  onCommentLike?: (commentId: string, action: 'like' | 'dislike') => void;
  onCommentReply?: (commentId: string, reply: string) => void;
  onCommentReport?: (commentId: string, reason: string) => void;
  showRating?: boolean;
  showSentiment?: boolean;
  enableModeration?: boolean;
  maxComments?: number;
}

export default function AdvancedCommentSystem({
  contentId,
  contentType,
  onCommentSubmit,
  onRatingSubmit,
  onCommentLike,
  onCommentReply,
  onCommentReport,
  showRating = true,
  showSentiment = true,
  enableModeration = true,
  maxComments = 50
}: AdvancedCommentSystemProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'top' | 'controversial'>('newest');
  const [filterBy, setFilterBy] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // بيانات تجريبية للتعليقات
  const mockComments: Comment[] = [
    {
      id: '1',
      userId: 'user1',
      username: 'أحمد محمد',
      userAvatar: '/api/placeholder/40/40',
      userRole: 'vip',
      content: 'فيلم رائع جداً! المؤثرات البصرية مذهلة والقصة مشوقة. أنصح الجميع بمشاهدته.',
      rating: 5,
      timestamp: 'منذ ساعتين',
      likes: 45,
      dislikes: 2,
      replies: [
        {
          id: '1-1',
          userId: 'user2',
          username: 'سارة أحمد',
          userAvatar: '/api/placeholder/40/40',
          userRole: 'user',
          content: 'أوافقك الرأي تماماً! المشاهد الأخيرة كانت مذهلة.',
          rating: 0,
          timestamp: 'منذ ساعة',
          likes: 12,
          dislikes: 0,
          replies: [],
          isEdited: false,
          isVerified: false,
          isTopComment: false,
          sentiment: 'positive',
          tags: [],
          helpfulCount: 8,
          reportCount: 0
        }
      ],
      isEdited: false,
      isVerified: true,
      isTopComment: true,
      sentiment: 'positive',
      tags: ['مشجع', 'مفيد'],
      helpfulCount: 32,
      reportCount: 0
    },
    {
      id: '2',
      userId: 'user3',
      username: 'محمد علي',
      userAvatar: '/api/placeholder/40/40',
      userRole: 'moderator',
      content: 'القصة جيدة لكن الإيقاع بطيء في بعض الأجزاء. التقييم العام: 7/10',
      rating: 3,
      timestamp: 'منذ 4 ساعات',
      likes: 23,
      dislikes: 8,
      replies: [],
      isEdited: true,
      isVerified: true,
      isTopComment: false,
      sentiment: 'neutral',
      tags: ['ناقد', 'محايد'],
      helpfulCount: 15,
      reportCount: 1
    },
    {
      id: '3',
      userId: 'user4',
      username: 'فاطمة حسن',
      userAvatar: '/api/placeholder/40/40',
      userRole: 'user',
      content: 'لم يعجبني الفيلم أبداً. القصة ضعيفة والممثلون سيئون. لا أنصح به.',
      rating: 1,
      timestamp: 'منذ 6 ساعات',
      likes: 5,
      dislikes: 18,
      replies: [],
      isEdited: false,
      isVerified: false,
      isTopComment: false,
      sentiment: 'negative',
      tags: ['ناقد'],
      helpfulCount: 3,
      reportCount: 2
    }
  ];

  // تحميل التعليقات
  const loadComments = useCallback(async () => {
    try {
      // محاكاة تحميل التعليقات من الخادم
      await new Promise(resolve => setTimeout(resolve, 500));
      setComments(mockComments);
    } catch (error) {
      // // console.error('Error loading comments:', error);
    }
  }, []);

  // إرسال تعليق جديد
  const submitComment = useCallback(async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const comment: Omit<Comment, 'id' | 'timestamp' | 'likes' | 'dislikes' | 'replies' | 'isEdited' | 'isVerified' | 'isTopComment' | 'sentiment' | 'tags' | 'helpfulCount' | 'reportCount'> = {
        userId: 'current-user',
        username: 'أنا',
        userAvatar: '/api/placeholder/40/40',
        userRole: 'user',
        content: newComment,
        rating: newRating
      };
      
      if (onCommentSubmit) {
        onCommentSubmit(comment);
      }
      
      // إضافة التعليق محلياً
      const newCommentObj: Comment = {
        ...comment,
        id: new Date("2025-07-21T14:00:00Z").getTime().toString(),
        timestamp: 'الآن',
        likes: 0,
        dislikes: 0,
        replies: [],
        isEdited: false,
        isVerified: false,
        isTopComment: false,
        sentiment: 'neutral',
        tags: [],
        helpfulCount: 0,
        reportCount: 0
      };
      
      setComments(prev => [newCommentObj, ...prev]);
      setNewComment('');
      setNewRating(0);
      
    } catch (error) {
      // // console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [newComment, newRating, onCommentSubmit]);

  // إرسال تقييم
  const submitRating = useCallback(async () => {
    if (newRating === 0) return;
    
    try {
      if (onRatingSubmit) {
        onRatingSubmit(newRating);
      }
      
      // إظهار رسالة نجاح
      alert(`تم إرسال تقييمك: ${newRating}/5 نجوم`);
      
    } catch (error) {
      // // console.error('Error submitting rating:', error);
    }
  }, [newRating, onRatingSubmit]);

  // إعجاب/عدم إعجاب
  const handleLike = useCallback((commentId: string, action: 'like' | 'dislike') => {
    setComments(prev => 
      prev.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: action === 'like' ? comment.likes + 1 : comment.likes,
            dislikes: action === 'dislike' ? comment.dislikes + 1 : comment.dislikes
          };
        }
        return comment;
      })
    );
    
    if (onCommentLike) {
      onCommentLike(commentId, action);
    }
  }, [onCommentLike]);

  // الرد على تعليق
  const handleReply = useCallback((commentId: string, replyContent: string) => {
    if (!replyContent.trim()) return;
    
    const newReply: Comment = {
      id: `${commentId}-${new Date("2025-07-21T14:00:00Z").getTime()}`,
      userId: 'current-user',
      username: 'أنا',
      userAvatar: '/api/placeholder/40/40',
      userRole: 'user',
      content: replyContent,
      rating: 0,
      timestamp: 'الآن',
      likes: 0,
      dislikes: 0,
      replies: [],
      isEdited: false,
      isVerified: false,
      isTopComment: false,
      sentiment: 'neutral',
      tags: [],
      helpfulCount: 0,
      reportCount: 0
    };
    
    setComments(prev => 
      prev.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply]
          };
        }
        return comment;
      })
    );
    
    if (onCommentReply) {
      onCommentReply(commentId, replyContent);
    }
    
    setReplyingTo(null);
  }, [onCommentReply]);

  // ترتيب التعليقات
  const sortedComments = useMemo(() => {
    let sorted = [...comments];
    
    switch (sortBy) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        break;
      case 'top':
        sorted.sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes));
        break;
      case 'controversial':
        sorted.sort((a, b) => Math.min(a.likes, a.dislikes) - Math.min(b.likes, b.dislikes));
        break;
    }
    
    // فلترة حسب المشاعر
    if (filterBy !== 'all') {
      sorted = sorted.filter(comment => comment.sentiment === filterBy);
    }
    
    return sorted.slice(0, maxComments);
  }, [comments, sortBy, filterBy, maxComments]);

  // تحليل المشاعر
  const sentimentAnalysis = useMemo(() => {
    const positive = comments.filter(c => c.sentiment === 'positive').length;
    const negative = comments.filter(c => c.sentiment === 'negative').length;
    const neutral = comments.filter(c => c.sentiment === 'neutral').length;
    const total = comments.length;
    
    return {
      positive: total > 0 ? (positive / total) * 100 : 0,
      negative: total > 0 ? (negative / total) * 100 : 0,
      neutral: total > 0 ? (neutral / total) * 100 : 0,
      total
    };
  }, [comments]);

  // تحميل البيانات
  useEffect(() => {
    loadComments();
  }, [loadComments]);

  return (
    <div className="w-full">
      {/* رأس النظام */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3 space-x-reverse">
          <MessageSquare className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-bold text-white">التعليقات والتقييمات</h2>
          <Sparkles className="w-4 h-4 text-yellow-400" />
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-400">
          <span>{comments.length} تعليق</span>
          <span>•</span>
          <span>{sentimentAnalysis.total} تقييم</span>
        </div>
      </div>

      {/* تحليل المشاعر */}
      {showSentiment && (
        <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
          <h3 className="text-white font-semibold mb-3">تحليل المشاعر</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Smile className="w-5 h-5 text-green-400 ml-2" />
                <span className="text-green-400 font-semibold">
                  {sentimentAnalysis.positive.toFixed(1)}%
                </span>
              </div>
              <span className="text-gray-300 text-sm">إيجابي</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Meh className="w-5 h-5 text-yellow-400 ml-2" />
                <span className="text-yellow-400 font-semibold">
                  {sentimentAnalysis.neutral.toFixed(1)}%
                </span>
              </div>
              <span className="text-gray-300 text-sm">محايد</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Frown className="w-5 h-5 text-red-400 ml-2" />
                <span className="text-red-400 font-semibold">
                  {sentimentAnalysis.negative.toFixed(1)}%
                </span>
              </div>
              <span className="text-gray-300 text-sm">سلبي</span>
            </div>
          </div>
        </div>
      )}

      {/* إضافة تعليق جديد */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
        <h3 className="text-white font-semibold mb-4">أضف تعليقك</h3>
        
        {/* التقييم */}
        {showRating && (
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2">تقييمك</label>
            <div className="flex items-center space-x-2 space-x-reverse">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setNewRating(star)}
                  className={`text-2xl transition-colors ${
                    star <= newRating ? 'text-yellow-400' : 'text-gray-400'
                  }`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
              <span className="text-gray-300 text-sm mr-2">
                {newRating > 0 ? `${newRating}/5` : 'اختر التقييم'}
              </span>
            </div>
          </div>
        )}
        
        {/* نص التعليق */}
        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="اكتب تعليقك هنا..."
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none"
            rows={4}
          />
        </div>
        
        {/* أزرار الإرسال */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            {showRating && newRating > 0 && (
              <button
                onClick={submitRating}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm transition-colors"
              >
                إرسال التقييم
              </button>
            )}
          </div>
          
          <button
            onClick={submitComment}
            disabled={isSubmitting || !newComment.trim()}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال التعليق'}</span>
          </button>
        </div>
      </div>

      {/* فلاتر وترتيب */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 space-x-reverse">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
          >
            <option value="newest">الأحدث</option>
            <option value="oldest">الأقدم</option>
            <option value="top">الأفضل</option>
            <option value="controversial">المثير للجدل</option>
          </select>
          
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as any)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
          >
            <option value="all">الكل</option>
            <option value="positive">إيجابي</option>
            <option value="negative">سلبي</option>
            <option value="neutral">محايد</option>
          </select>
        </div>
        
        <div className="text-sm text-gray-400">
          {sortedComments.length} من {comments.length} تعليق
        </div>
      </div>

      {/* قائمة التعليقات */}
      <div className="space-y-4">
        {sortedComments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            {/* رأس التعليق */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <img
                  src={comment.userAvatar}
                  alt={comment.username}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-white font-semibold">{comment.username}</span>
                    {comment.userRole === 'vip' && <Crown className="w-4 h-4 text-yellow-400" />}
                    {comment.userRole === 'moderator' && <Shield className="w-4 h-4 text-blue-400" />}
                    {comment.userRole === 'admin' && <Award className="w-4 h-4 text-purple-400" />}
                    {comment.isVerified && <span className="text-blue-400 text-xs">✓ موثق</span>}
                    {comment.isTopComment && <TrendingUp className="w-4 h-4 text-green-400" />}
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{comment.timestamp}</span>
                    {comment.isEdited && <span>• تم التعديل</span>}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                {comment.rating > 0 && (
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                    <span className="text-sm text-gray-300">{comment.rating}/5</span>
                  </div>
                )}
                <button className="text-gray-400 hover:text-white transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* محتوى التعليق */}
            <div className="mb-3">
              <p className="text-gray-300 leading-relaxed">{comment.content}</p>
            </div>
            
            {/* علامات المشاعر */}
            {showSentiment && (
              <div className="flex items-center space-x-2 space-x-reverse mb-3">
                {comment.sentiment === 'positive' && <Smile className="w-4 h-4 text-green-400" />}
                {comment.sentiment === 'negative' && <Frown className="w-4 h-4 text-red-400" />}
                {comment.sentiment === 'neutral' && <Meh className="w-4 h-4 text-yellow-400" />}
                <span className="text-xs text-gray-400">
                  {comment.sentiment === 'positive' ? 'إيجابي' :
                   comment.sentiment === 'negative' ? 'سلبي' : 'محايد'}
                </span>
              </div>
            )}
            
            {/* أزرار التفاعل */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                <button
                  onClick={() => handleLike(comment.id, 'like')}
                  className="flex items-center space-x-1 space-x-reverse text-gray-400 hover:text-green-400 transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{comment.likes}</span>
                </button>
                
                <button
                  onClick={() => handleLike(comment.id, 'dislike')}
                  className="flex items-center space-x-1 space-x-reverse text-gray-400 hover:text-red-400 transition-colors"
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span className="text-sm">{comment.dislikes}</span>
                </button>
                
                <button
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="flex items-center space-x-1 space-x-reverse text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Reply className="w-4 h-4" />
                  <span className="text-sm">رد</span>
                </button>
                
                {comment.helpfulCount > 0 && (
                  <span className="text-xs text-gray-500">
                    {comment.helpfulCount} مفيد
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                {comment.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* نموذج الرد */}
            {replyingTo === comment.id && (
              <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                <textarea
                  placeholder="اكتب ردك..."
                  className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white placeholder-gray-400 resize-none"
                  rows={2}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      const target = e.target as HTMLTextAreaElement;
                      handleReply(comment.id, target.value);
                    }
                  }}
                />
                <div className="flex items-center justify-end space-x-2 space-x-reverse mt-2">
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={(e) => {
                      const target = e.target as HTMLButtonElement;
                      const textarea = target.parentElement?.previousElementSibling as HTMLTextAreaElement;
                      if (textarea) {
                        handleReply(comment.id, textarea.value);
                      }
                    }}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                  >
                    إرسال
                  </button>
                </div>
              </div>
            )}
            
            {/* الردود */}
            {comment.replies.length > 0 && (
              <div className="mt-4">
                <button
                  onClick={() => setShowReplies(prev => ({ ...prev, [comment.id]: !prev[comment.id] }))}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  {showReplies[comment.id] ? 'إخفاء الردود' : `عرض ${comment.replies.length} رد`}
                </button>
                
                {showReplies[comment.id] && (
                  <div className="mt-3 space-y-3 pr-4 border-r-2 border-gray-600">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center space-x-2 space-x-reverse mb-2">
                          <img
                            src={reply.userAvatar}
                            alt={reply.username}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-white text-sm font-medium">{reply.username}</span>
                          <span className="text-gray-400 text-xs">{reply.timestamp}</span>
                        </div>
                        <p className="text-gray-300 text-sm">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* رسالة إذا لم توجد تعليقات */}
      {sortedComments.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">
            لا توجد تعليقات حالياً
          </h3>
          <p className="text-gray-400">
            كن أول من يعلق على هذا المحتوى!
          </p>
        </div>
      )}
    </div>
  );
}