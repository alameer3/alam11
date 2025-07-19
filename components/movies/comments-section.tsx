"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Star, MessageCircle, ThumbsUp, Reply } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Comment {
  id: string
  user: string
  avatar: string
  content: string
  rating: number
  date: string
  likes: number
}

interface CommentsSectionProps {
  movieId: string
}

// Mock data - في التطبيق الحقيقي، سيتم جلب البيانات من قاعدة البيانات
const comments: Comment[] = [
  {
    id: '1',
    user: 'أحمد محمد',
    avatar: 'https://via.placeholder.com/40x40/1e293b/ffffff?text=أم',
    content: 'فيلم رائع جداً! القصة مشوقة والأداء التمثيلي ممتاز. أنصح الجميع بمشاهدته.',
    rating: 5,
    date: '2024-01-10T14:30:00Z',
    likes: 12
  },
  {
    id: '2',
    user: 'فاطمة أحمد',
    avatar: 'https://via.placeholder.com/40x40/0f172a/ffffff?text=فا',
    content: 'من أفضل الأفلام التي شاهدتها هذا العام. المؤثرات البصرية مذهلة والموسيقى جميلة.',
    rating: 4,
    date: '2024-01-09T18:45:00Z',
    likes: 8
  },
  {
    id: '3',
    user: 'محمد علي',
    avatar: 'https://via.placeholder.com/40x40/374151/ffffff?text=مع',
    content: 'فيلم جيد ولكن كان يمكن أن يكون أفضل. النهاية كانت متوقعة نوعاً ما.',
    rating: 3,
    date: '2024-01-08T12:20:00Z',
    likes: 5
  }
]

export function CommentsSection({ movieId }: CommentsSectionProps) {
  const [newComment, setNewComment] = useState('')
  const [newRating, setNewRating] = useState(5)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Submit comment to backend
    console.log('New comment:', { content: newComment, rating: newRating })
    setNewComment('')
    setNewRating(5)
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">التعليقات والتقييمات</h2>
        <span className="text-sm text-muted-foreground">({comments.length})</span>
      </div>

      {/* Add Comment Form */}
      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">أضف تعليقك</h3>
        
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">التقييم</label>
            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setNewRating(i + 1)}
                  className="p-1"
                >
                  <Star
                    className={`h-5 w-5 ${
                      i < newRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">التعليق</label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="شاركنا رأيك في الفيلم..."
              className="w-full min-h-[100px] p-3 border border-input rounded-md bg-background resize-none"
              required
            />
          </div>

          <Button type="submit" disabled={!newComment.trim()}>
            إضافة التعليق
          </Button>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-card rounded-lg border p-6">
            <div className="flex items-start gap-4">
              <img
                src={comment.avatar}
                alt={comment.user}
                className="w-10 h-10 rounded-full"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{comment.user}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-1">
                        {renderStars(comment.rating)}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(comment.date)}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-3">{comment.content}</p>

                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ThumbsUp className="h-4 w-4 ml-1" />
                    مفيد ({comment.likes})
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Reply className="h-4 w-4 ml-1" />
                    رد
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {comments.length > 3 && (
        <div className="text-center">
          <Button variant="outline">
            عرض المزيد من التعليقات
          </Button>
        </div>
      )}
    </section>
  )
}