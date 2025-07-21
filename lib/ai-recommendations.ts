import OpenAI from 'openai';
import { prisma } from '@/lib/prisma';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface UserBehavior {
  userId: string;
  watchHistory: string[];
  likes: string[];
  dislikes: string[];
  searchHistory: string[];
  watchTime: Record<string, number>;
  categories: Record<string, number>;
}

interface ContentItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  duration: number;
  rating: number;
  viewCount: number;
  language: string;
}

interface RecommendationResult {
  contentId: string;
  score: number;
  reason: string;
  category: string;
}

export class AIRecommendationEngine {
  private userBehaviorCache: Map<string, UserBehavior> = new Map();

  // تحليل سلوك المستخدم
  async analyzeUserBehavior(userId: string): Promise<UserBehavior> {
    const cached = this.userBehaviorCache.get(userId);
    if (cached) return cached;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        watchHistory: {
          include: { content: true },
          orderBy: { watchedAt: 'desc' },
          take: 100,
        },
        likes: {
          include: { content: true },
        },
        dislikes: {
          include: { content: true },
        },
        searches: {
          orderBy: { searchedAt: 'desc' },
          take: 50,
        },
      },
    });

    if (!user) {
      throw new Error('المستخدم غير موجود');
    }

    const behavior: UserBehavior = {
      userId,
      watchHistory: user.watchHistory.map(h => h.contentId),
      likes: user.likes.map(l => l.contentId),
      dislikes: user.dislikes.map(d => d.contentId),
      searchHistory: user.searches.map(s => s.query),
      watchTime: {},
      categories: {},
    };

    // حساب وقت المشاهدة لكل محتوى
    for (const history of user.watchHistory) {
      const contentId = history.contentId;
      behavior.watchTime[contentId] = (behavior.watchTime[contentId] || 0) + history.watchDuration;
    }

    // حساب تفضيلات الفئات
    for (const history of user.watchHistory) {
      const category = history.content.category;
      behavior.categories[category] = (behavior.categories[category] || 0) + 1;
    }

    this.userBehaviorCache.set(userId, behavior);
    return behavior;
  }

  // توليد توصيات باستخدام OpenAI
  async generateAIRecommendations(
    userId: string,
    limit: number = 10
  ): Promise<RecommendationResult[]> {
    try {
      const behavior = await this.analyzeUserBehavior(userId);
      
      // الحصول على المحتوى المتاح
      const availableContent = await prisma.content.findMany({
        where: {
          status: 'published',
          id: {
            notIn: [...behavior.likes, ...behavior.dislikes],
          },
        },
        take: 100,
      });

      // تحليل سلوك المستخدم باستخدام AI
      const analysis = await this.analyzeUserBehaviorWithAI(behavior);
      
      // توليد توصيات مخصصة
      const recommendations = await this.generatePersonalizedRecommendations(
        behavior,
        availableContent,
        analysis,
        limit
      );

      return recommendations;
    } catch (error) {
      // console.error('خطأ في توليد التوصيات:', error);
      return this.generateFallbackRecommendations(userId, limit);
    }
  }

  // تحليل سلوك المستخدم باستخدام OpenAI
  private async analyzeUserBehaviorWithAI(behavior: UserBehavior): Promise<any> {
    const prompt = `
      تحليل سلوك المستخدم في منصة بث الفيديوهات:
      
      تاريخ المشاهدة: ${behavior.watchHistory.slice(0, 10).join(', ')}
      المحتوى المُعجب به: ${behavior.likes.slice(0, 10).join(', ')}
      المحتوى غير المُعجب به: ${behavior.dislikes.slice(0, 10).join(', ')}
      تاريخ البحث: ${behavior.searchHistory.slice(0, 10).join(', ')}
      الفئات المفضلة: ${Object.entries(behavior.categories)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([category, count]) => `${category}: ${count}`)
        .join(', ')}
      
      قم بتحليل هذا السلوك وتحديد:
      1. أنواع المحتوى المفضلة
      2. الفئات المفضلة
      3. أنماط المشاهدة
      4. التفضيلات اللغوية
      5. مدة المحتوى المفضلة
      
      أعد النتيجة كـ JSON.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'أنت محلل سلوك مستخدمين متخصص في منصات البث. قم بتحليل البيانات وتقديم رؤى مفيدة.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    const analysis = completion.choices[0]?.message?.content;
    return analysis ? JSON.parse(analysis) : {};
  }

  // توليد توصيات مخصصة
  private async generatePersonalizedRecommendations(
    behavior: UserBehavior,
    availableContent: any[],
    analysis: any,
    limit: number
  ): Promise<RecommendationResult[]> {
    const prompt = `
      بناءً على تحليل سلوك المستخدم التالي:
      
      التحليل: ${JSON.stringify(analysis)}
      
      والمحتوى المتاح:
      ${availableContent.slice(0, 20).map(content => 
        `- ${content.title} (${content.category}): ${content.description}`
      ).join('\n')}
      
      قم بتوليد قائمة من ${limit} توصية مخصصة للمستخدم.
      لكل توصية، حدد:
      - contentId: معرف المحتوى
      - score: درجة التوصية (0-1)
      - reason: سبب التوصية
      - category: فئة المحتوى
      
      أعد النتيجة كـ JSON array.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'أنت نظام توصيات متقدم لمنصة بث الفيديوهات. قم بتوليد توصيات مخصصة بناءً على سلوك المستخدم.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const recommendations = completion.choices[0]?.message?.content;
    return recommendations ? JSON.parse(recommendations) : [];
  }

  // توليد توصيات احتياطية
  private async generateFallbackRecommendations(
    userId: string,
    limit: number
  ): Promise<RecommendationResult[]> {
    const popularContent = await prisma.content.findMany({
      where: { status: 'published' },
      orderBy: { viewCount: 'desc' },
      take: limit,
    });

    return popularContent.map((content, index) => ({
      contentId: content.id,
      score: 0.8 - (index * 0.05),
      reason: 'محتوى شائع',
      category: content.category,
    }));
  }

  // تحسين التوصيات بناءً على التفاعل
  async improveRecommendations(
    userId: string,
    contentId: string,
    action: 'like' | 'dislike' | 'watch' | 'skip'
  ): Promise<void> {
    try {
      // تحديث سلوك المستخدم
      await this.updateUserBehavior(userId, contentId, action);
      
      // مسح الكاش للسلوك المحدث
      this.userBehaviorCache.delete(userId);
      
      // تحديث نموذج التوصيات
      await this.updateRecommendationModel(userId, contentId, action);
    } catch (error) {
      // console.error('خطأ في تحسين التوصيات:', error);
    }
  }

  // تحديث سلوك المستخدم
  private async updateUserBehavior(
    userId: string,
    contentId: string,
    action: 'like' | 'dislike' | 'watch' | 'skip'
  ): Promise<void> {
    switch (action) {
      case 'like':
        await prisma.userLike.upsert({
          where: { userId_contentId: { userId, contentId } },
          update: {},
          create: { userId, contentId },
        });
        break;
      case 'dislike':
        await prisma.userDislike.upsert({
          where: { userId_contentId: { userId, contentId } },
          update: {},
          create: { userId, contentId },
        });
        break;
      case 'watch':
        await prisma.watchHistory.create({
          data: {
            userId,
            contentId,
            watchDuration: 0, // سيتم تحديثه لاحقاً
            watchedAt: new Date(),
          },
        });
        break;
    }
  }

  // تحديث نموذج التوصيات
  private async updateRecommendationModel(
    userId: string,
    contentId: string,
    action: 'like' | 'dislike' | 'watch' | 'skip'
  ): Promise<void> {
    // هنا يمكن إضافة منطق تحديث النموذج
    // مثل تحديث أوزان الخوارزمية أو إعادة تدريب النموذج
    // console.log(`تحديث نموذج التوصيات: ${userId} -> ${contentId} -> ${action}`);
  }

  // الحصول على توصيات في الوقت الفعلي
  async getRealTimeRecommendations(
    userId: string,
    currentContentId?: string
  ): Promise<RecommendationResult[]> {
    const recommendations = await this.generateAIRecommendations(userId, 5);
    
    // إزالة المحتوى الحالي من التوصيات
    if (currentContentId) {
      return recommendations.filter(r => r.contentId !== currentContentId);
    }
    
    return recommendations;
  }

  // تحليل اتجاهات المحتوى
  async analyzeContentTrends(): Promise<any> {
    const trends = await prisma.content.groupBy({
      by: ['category'],
      _count: { id: true },
      _avg: { rating: true, viewCount: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10,
    });

    return trends.map(trend => ({
      category: trend.category,
      count: trend._count.id,
      avgRating: trend._avg.rating,
      avgViews: trend._avg.viewCount,
    }));
  }
}

// تصدير مثيل واحد من المحرك
export const recommendationEngine = new AIRecommendationEngine();