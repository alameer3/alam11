'use client';

import { useState } from 'react';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  Video, 
  Search,
  Plus,
  Minus,
  Send,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  Download,
  Eye
} from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  notHelpful: number;
}

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

interface HelpArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  views: number;
  helpful: number;
  createdAt: string;
}

export default function SupportSystem() {
  const [activeTab, setActiveTab] = useState<'faq' | 'tickets' | 'articles' | 'contact'>('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'كيف يمكنني إنشاء حساب جديد؟',
      answer: 'يمكنك إنشاء حساب جديد من خلال الضغط على زر "تسجيل" في أعلى الصفحة، ثم ملء النموذج بالمعلومات المطلوبة والضغط على "إنشاء حساب".',
      category: 'account',
      helpful: 45,
      notHelpful: 2
    },
    {
      id: '2',
      question: 'كيف يمكنني تحميل فيلم أو مسلسل؟',
      answer: 'بعد تسجيل الدخول، اذهب إلى صفحة الفيلم أو المسلسل المطلوب، ثم اضغط على زر "تحميل" واختر الجودة المناسبة.',
      category: 'download',
      helpful: 78,
      notHelpful: 5
    },
    {
      id: '3',
      question: 'ما هي الجودات المتاحة للمشاهدة؟',
      answer: 'نوفر جودات متعددة: 480p، 720p، 1080p، و4K حسب توفر المحتوى وسرعة الإنترنت لديك.',
      category: 'quality',
      helpful: 32,
      notHelpful: 1
    },
    {
      id: '4',
      question: 'كيف يمكنني إضافة محتوى إلى المفضلة؟',
      answer: 'اضغط على أيقونة القلب بجانب أي فيلم أو مسلسل لإضافته إلى قائمة المفضلة الخاصة بك.',
      category: 'favorites',
      helpful: 56,
      notHelpful: 3
    },
    {
      id: '5',
      question: 'هل المحتوى متاح للتحميل؟',
      answer: 'نعم، معظم المحتوى متاح للتحميل للمستخدمين المسجلين. يمكنك تحميل الأفلام والمسلسلات بجودات مختلفة.',
      category: 'download',
      helpful: 89,
      notHelpful: 7
    }
  ];

  const supportTickets: SupportTicket[] = [
    {
      id: 'T001',
      title: 'مشكلة في تشغيل الفيديو',
      description: 'لا يمكنني تشغيل أي فيديو، تظهر رسالة خطأ عند الضغط على زر التشغيل.',
      status: 'open',
      priority: 'high',
      category: 'technical',
      createdAt: '2024-01-15 10:30',
      updatedAt: '2024-01-15 10:30'
    },
    {
      id: 'T002',
      title: 'مشكلة في تسجيل الدخول',
      description: 'نسيت كلمة المرور ولا يمكنني إعادة تعيينها.',
      status: 'in_progress',
      priority: 'medium',
      category: 'account',
      createdAt: '2024-01-14 15:45',
      updatedAt: '2024-01-15 09:20',
      assignedTo: 'أحمد محمد'
    },
    {
      id: 'T003',
      title: 'طلب إضافة محتوى جديد',
      description: 'أود طلب إضافة مسلسل جديد إلى المكتبة.',
      status: 'resolved',
      priority: 'low',
      category: 'content',
      createdAt: '2024-01-10 12:00',
      updatedAt: '2024-01-12 14:30',
      assignedTo: 'سارة أحمد'
    }
  ];

  const helpArticles: HelpArticle[] = [
    {
      id: 'A001',
      title: 'دليل استخدام منصة أكوام',
      content: 'دليل شامل لاستخدام جميع ميزات منصة أكوام...',
      category: 'guide',
      tags: ['دليل', 'استخدام', 'مبتدئ'],
      views: 1250,
      helpful: 89,
      createdAt: '2024-01-01'
    },
    {
      id: 'A002',
      title: 'حل مشاكل التشغيل الشائعة',
      content: 'قائمة بأهم المشاكل التي تواجه المستخدمين وحلولها...',
      category: 'troubleshooting',
      tags: ['مشاكل', 'تشغيل', 'حلول'],
      views: 890,
      helpful: 67,
      createdAt: '2024-01-05'
    },
    {
      id: 'A003',
      title: 'تحسين جودة المشاهدة',
      content: 'نصائح لتحسين جودة المشاهدة وسرعة التحميل...',
      category: 'quality',
      tags: ['جودة', 'تحسين', 'سرعة'],
      views: 650,
      helpful: 45,
      createdAt: '2024-01-08'
    }
  ];

  const categories = [
    { id: 'all', label: 'الكل', count: faqs.length },
    { id: 'account', label: 'الحساب', count: faqs.filter(f => f.category === 'account').length },
    { id: 'download', label: 'التحميل', count: faqs.filter(f => f.category === 'download').length },
    { id: 'quality', label: 'الجودة', count: faqs.filter(f => f.category === 'quality').length },
    { id: 'favorites', label: 'المفضلة', count: faqs.filter(f => f.category === 'favorites').length }
  ];

  const getStatusColor = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPriorityColor = (priority: SupportTicket['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          مركز المساعدة والدعم
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          نحن هنا لمساعدتك في حل أي مشكلة أو استفسار
        </p>
      </div>

      {/* تبويبات المساعدة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { id: 'faq', label: 'الأسئلة الشائعة', icon: HelpCircle },
          { id: 'tickets', label: 'تذاكر الدعم', icon: MessageCircle },
          { id: 'articles', label: 'مقالات المساعدة', icon: FileText },
          { id: 'contact', label: 'اتصل بنا', icon: Phone }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                activeTab === tab.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex flex-col items-center space-y-2 space-y-reverse">
                <Icon className={`w-6 h-6 ${
                  activeTab === tab.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  activeTab === tab.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* محتوى التبويبات */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {activeTab === 'faq' && (
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center space-x-4 space-x-reverse mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث في الأسئلة الشائعة..."
                    className="w-full pl-10 rtl:pr-10 rtl:pl-3 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* فلاتر الفئات */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* قائمة الأسئلة */}
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full p-4 text-right flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                    {expandedFAQ === faq.id ? (
                      <Minus className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  
                  {expandedFAQ === faq.id && (
                    <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-400 mt-3 mb-4">
                        {faq.answer}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <button className="flex items-center space-x-1 space-x-reverse text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                            <ThumbsUp className="w-4 h-4" />
                            <span>مفيد ({faq.helpful})</span>
                          </button>
                          <button className="flex items-center space-x-1 space-x-reverse text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                            <ThumbsDown className="w-4 h-4" />
                            <span>غير مفيد ({faq.notHelpful})</span>
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                تذاكر الدعم
              </h3>
              <button className="btn-primary text-sm">
                <Plus className="w-4 h-4 ml-1" />
                تذكرة جديدة
              </button>
            </div>

            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 space-x-reverse mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {ticket.title}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status === 'open' ? 'مفتوح' : 
                           ticket.status === 'in_progress' ? 'قيد المعالجة' :
                           ticket.status === 'resolved' ? 'تم الحل' : 'مغلق'}
                        </span>
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(ticket.priority)}`} />
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {ticket.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-500 dark:text-gray-400">
                        <span>#{ticket.id}</span>
                        <span>•</span>
                        <span>{ticket.category}</span>
                        <span>•</span>
                        <span>{ticket.createdAt}</span>
                        {ticket.assignedTo && (
                          <>
                            <span>•</span>
                            <span>مُسند إلى: {ticket.assignedTo}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="btn-secondary text-xs">
                        عرض التفاصيل
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              مقالات المساعدة
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpArticles.map((article) => (
                <div key={article.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {article.title}
                    </h4>
                    <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
                    {article.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Eye className="w-3 h-3" />
                      <span>{article.views}</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{article.helpful}</span>
                    </div>
                    <span>{article.createdAt}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* معلومات الاتصال */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  معلومات الاتصال
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">البريد الإلكتروني</h4>
                      <p className="text-gray-600 dark:text-gray-400">support@𝐘𝐄𝐌𝐄𝐍_𝐅𝐋𝐈𝐗.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                      <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">الهاتف</h4>
                      <p className="text-gray-600 dark:text-gray-400">+966 50 123 4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <MessageCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">الدردشة المباشرة</h4>
                      <p className="text-gray-600 dark:text-gray-400">متاحة من 9 صباحاً إلى 6 مساءً</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* نموذج الاتصال */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  أرسل لنا رسالة
                </h3>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الاسم
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="أدخل اسمك"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      className="input"
                      placeholder="أدخل بريدك الإلكتروني"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الموضوع
                    </label>
                    <select className="input">
                      <option>اختر الموضوع</option>
                      <option>مشكلة تقنية</option>
                      <option>استفسار عام</option>
                      <option>اقتراح</option>
                      <option>شكوى</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      الرسالة
                    </label>
                    <textarea
                      rows={4}
                      className="input"
                      placeholder="اكتب رسالتك هنا..."
                    />
                  </div>
                  
                  <button type="submit" className="btn-primary w-full">
                    <Send className="w-4 h-4 ml-1" />
                    إرسال الرسالة
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}