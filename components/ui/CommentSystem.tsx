'use client';

import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageCircle, User, Calendar } from 'lucide-react';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  rating: number;
  likes: number;
  dislikes: number;
  createdAt: string;
  replies?: Comment[];
}

interface CommentSystemProps {
  contentId: string;
  contentType: 'movie' | 'series' | 'show';
}

export default function CommentSystem({ contentId, contentType }: CommentSystemProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: {
        name: 'أحمد محمد',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
      },
      content: 'فيلم رائع جداً! التمثيل والإخراج ممتازان. أنصح الجميع بمشاهدته.',
      rating: 5,
      likes: 12,
      dislikes: 1,
      createdAt: '2024-01-15T10:30:00Z',
      replies: [
        {
          id: '1-1',
          user: {
            name: 'سارة أحمد',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
          },
          content: 'أوافقك الرأي تماماً!',
          rating: 0,
          likes: 3,
          dislikes: 0,
          createdAt: '2024-01-15T11:00:00Z'
        }
      ]
    },
    {
      id: '2',
      user: {
        name: 'محمد علي',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
      },
      content: 'القصة جيدة لكن الإيقاع بطيء بعض الشيء.',
      rating: 3,
      likes: 5,
      dislikes: 2,
      createdAt: '2024-01-14T15:45:00Z'
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitComment = () => {
    if (!newComment.trim() || rating === 0) return;

    const comment: Comment = {
      id: new Date("2025-07-21T14:00:00Z").getTime().toString(),
      user: {
        name: 'المستخدم الحالي',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'
      },
      content: newComment,
      rating,
      likes: 0,
      dislikes: 0,
      createdAt: new Date().toISOString()
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setRating(0);
  };

  const handleLike = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  const handleDislike = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, dislikes: comment.dislikes + 1 }
        : comment
    ));
  };

  const handleReply = (commentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: `${commentId}-${new Date("2025-07-21T14:00:00Z").getTime()}`,
      user: {
        name: 'المستخدم الحالي',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face'
      },
      content: replyContent,
      rating: 0,
      likes: 0,
      dislikes: 0,
      createdAt: new Date().toISOString()
    };

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...(comment.replies || []), reply] }
        : comment
    ));

    setReplyContent('');
    setShowReplyForm(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-8 mt-4' : 'mb-6'}`}>
      <div className="flex items-start space-x-3 space-x-reverse">
        <img
          src={comment.user.avatar}
          alt={comment.user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 space-x-reverse mb-2">
            <span className="font-semibold text-gray-900 dark:text-white">
              {comment.user.name}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(comment.createdAt)}
            </span>
          </div>
          
          {comment.rating > 0 && (
            <div className="flex items-center space-x-1 space-x-reverse mb-2">
              {renderStars(comment.rating)}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                ({comment.rating}/5)
              </span>
            </div>
          )}
          
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            {comment.content}
          </p>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={() => handleLike(comment.id)}
              className="flex items-center space-x-1 space-x-reverse text-sm text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{comment.likes}</span>
            </button>
            
            <button
              onClick={() => handleDislike(comment.id)}
              className="flex items-center space-x-1 space-x-reverse text-sm text-gray-500 hover:text-red-600 dark:hover:text-red-400"
            >
              <ThumbsDown className="w-4 h-4" />
              <span>{comment.dislikes}</span>
            </button>
            
            {!isReply && (
              <button
                onClick={() => setShowReplyForm(comment.id)}
                className="flex items-center space-x-1 space-x-reverse text-sm text-gray-500 hover:text-green-600 dark:hover:text-green-400"
              >
                <MessageCircle className="w-4 h-4" />
                <span>رد</span>
              </button>
            )}
          </div>
          
          {showReplyForm === comment.id && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="اكتب ردك هنا..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                rows={3}
              />
              <div className="flex items-center space-x-2 space-x-reverse mt-3">
                <button
                  onClick={() => handleReply(comment.id)}
                  className="btn-primary text-sm"
                >
                  إرسال الرد
                </button>
                <button
                  onClick={() => setShowReplyForm(null)}
                  className="btn-secondary text-sm"
                >
                  إلغاء
                </button>
              </div>
            </div>
          )}
          
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map(reply => renderComment(reply, true))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          التعليقات والتقييمات
        </h3>
        
        {/* إضافة تعليق جديد */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            أضف تعليقك
          </h4>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              التقييم
            </label>
            <div className="flex items-center space-x-1 space-x-reverse">
              {Array.from({ length: 5 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      i < rating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300 hover:text-yellow-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                ({rating}/5)
              </span>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              التعليق
            </label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="اكتب تعليقك هنا..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              rows={4}
            />
          </div>
          
          <button
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || rating === 0}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            إرسال التعليق
          </button>
        </div>
        
        {/* قائمة التعليقات */}
        <div className="space-y-6">
          {comments.map(comment => renderComment(comment))}
        </div>
      </div>
    </div>
  );
}