
import { useParams, Link } from "wouter";
import { ArrowRight, Calendar, Clock, Share2, Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getArticles, getArticleById } from "@/services/supabase";
import type { Article } from "@shared/schema";

export default function Article() {
  const params = useParams();
  const articleId = params.id;
  
  const { data: article, isLoading, error } = useQuery<Article>({
    queryKey: ['article', articleId],
    queryFn: () => getArticleById(articleId!),
    enabled: !!articleId
  });

  const { data: allArticles } = useQuery<Article[]>({
    queryKey: ['articles'],
    queryFn: getArticles
  });

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>جاري تحميل المقال... | sehapostmart</title>
          <meta name="description" content="جاري تحميل المقال من sehapostmart - عيادتك الذكية الرقمية" />
        </Helmet>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-secondary-600">جاري تحميل المقال...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  if (error || !article) {
    return (
      <>
        <Helmet>
          <title>المقال غير موجود | sehapostmart</title>
          <meta name="description" content="لم نتمكن من العثور على المقال المطلوب في sehapostmart" />
        </Helmet>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-secondary-800 mb-2">المقال غير موجود</h2>
            <p className="text-secondary-600 mb-6">لم نتمكن من العثور على المقال المطلوب</p>
            <Link href="/blog" className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              العودة إلى المدونة
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const relatedArticles = (allArticles || [])
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'المناعة':
        return 'bg-primary-500';
      case 'التركيز':
        return 'bg-blue-500';
      case 'التغذية':
        return 'bg-purple-500';
      default:
        return 'bg-primary-500';
    }
  };

  // Create SEO-friendly meta description
  const metaDescription = article.excerpt && article.excerpt.length > 0 
    ? article.excerpt.substring(0, 160).replace(/\s+/g, ' ').trim() + '...'
    : `اقرأ المزيد عن ${article.title} في sehapostmart - عيادتك الذكية الرقمية`;

  // Mock full content - in a real app, this would come from the database
  const fullContent = `
    <p class="text-lg leading-relaxed mb-6">${article.excerpt}</p>
    
    <h2 class="text-2xl font-bold text-secondary-800 mb-4 mt-8">مقدمة</h2>
    <p class="leading-relaxed mb-6">في عالم اليوم المليء بالتحديات الصحية والبيئية، أصبح البحث عن الحلول الطبيعية والآمنة أولوية قصوى للكثيرين. هذا المقال يستكشف الموضوع بعمق ويقدم رؤى قيمة من خبراء الصحة.</p>
    
    <h2 class="text-2xl font-bold text-secondary-800 mb-4 mt-8">الفوائد الرئيسية</h2>
    <ul class="list-disc list-inside space-y-2 mb-6 text-secondary-700">
      <li>تحسين الصحة العامة والرفاهية</li>
      <li>دعم وظائف الجسم الطبيعية</li>
      <li>تعزيز المناعة والقدرة على مقاومة الأمراض</li>
      <li>تحسين جودة الحياة اليومية</li>
    </ul>
    
    <h2 class="text-2xl font-bold text-secondary-800 mb-4 mt-8">نصائح عملية</h2>
    <p class="leading-relaxed mb-6">من المهم اتباع نهج متوازن ومدروس عند تطبيق هذه المعلومات في حياتك اليومية. ننصح بالتشاور مع أخصائي الصحة قبل إجراء أي تغييرات كبيرة في نمط الحياة أو النظام الغذائي.</p>
    
    <h2 class="text-2xl font-bold text-secondary-800 mb-4 mt-8">خلاصة</h2>
    <p class="leading-relaxed mb-6">في الختام، الاهتمام بالصحة الطبيعية واتباع نمط حياة صحي يمكن أن يحدث فرقاً كبيراً في جودة الحياة. نحن في sehapostmart ملتزمون بتقديم أفضل المنتجات والمعلومات لدعم رحلتك نحو صحة أفضل.</p>
  `;

  return (
    <>
      <Helmet>
        <title>{article.title} | sehapostmart - عيادتك الذكية الرقمية</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${article.category}, صحة, طبيعي, sehapostmart, ${article.title}`} />
        <meta name="author" content="sehapostmart" />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={article.imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://sehapostmart.com/blog/${article.id}`} />
        <meta property="og:site_name" content="sehapostmart" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={article.imageUrl} />
        
        {/* Article specific meta tags */}
        <meta property="article:published_time" content={article.createdAt instanceof Date ? article.createdAt.toISOString() : article.createdAt || new Date().toISOString()} />
        <meta property="article:section" content={article.category} />
        <meta property="article:tag" content={article.category} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://sehapostmart.com/blog/${article.id}`} />
      </Helmet>
      
      <Header />
      
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-reverse space-x-2 text-sm">
              <Link href="/" className="text-secondary-500 hover:text-primary-600">الرئيسية</Link>
              <span className="text-secondary-300">←</span>
              <Link href="/blog" className="text-secondary-500 hover:text-primary-600">المدونة</Link>
              <span className="text-secondary-300">←</span>
              <span className="text-secondary-800 font-medium">{article.title}</span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <Badge className={`${getCategoryColor(article.category)} text-white mb-4`}>
                  {article.category}
                </Badge>
                <h1 className="text-3xl lg:text-4xl font-bold text-secondary-800 mb-6 leading-tight">
                  {article.title}
                </h1>
                
                <div className="flex items-center justify-center space-x-reverse space-x-6 text-secondary-500 mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{formatDate(article.createdAt instanceof Date ? article.createdAt.toISOString() : article.createdAt || new Date().toISOString())}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-4 mb-8">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    حفظ
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    مشاركة
                  </Button>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl mb-12">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-64 lg:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-secondary-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: fullContent }}
                />
              </div>
              
              {/* Contact CTA */}
              <div className="mt-12 p-8 bg-primary-50 rounded-2xl text-center">
                <h3 className="text-2xl font-bold text-secondary-800 mb-4">
                  هل لديك أسئلة حول هذا الموضوع؟
                </h3>
                <p className="text-secondary-600 mb-6">
                  فريقنا من الخبراء جاهز لمساعدتك والإجابة على استفساراتك
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/consultation"
                    className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold"
                  >
                    احصل على استشارة
                  </Link>
                  <a 
                    href="https://wa.me/963951902860"
                    className="border-2 border-primary-500 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-500 hover:text-white transition-colors font-semibold"
                  >
                    تواصل عبر الواتساب
                  </a>
                </div>
              </div>

              {/* SEO Call-to-Action */}
              <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
                <h4 className="text-xl font-bold text-green-800 mb-3">
                  هل وجدت هذا المقال مفيداً؟
                </h4>
                <p className="text-green-700 mb-4">
                  يمكنك الحصول على المنتجات المذكورة بخصم خاص باستخدام كود العضوية <strong>819026838</strong> عند الشراء من أي فرع لـ DXN.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link 
                    href="/membership"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold text-center"
                  >
                    سجل عضويتك المجانية الآن
                  </Link>
                  <Link 
                    href="/products"
                    className="border-2 border-green-600 text-green-700 px-6 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors font-semibold text-center"
                  >
                    تصفح المنتجات
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-12 bg-secondary-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-secondary-800 mb-8 text-center">مقالات ذات صلة</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {relatedArticles.map((relatedArticle) => (
                  <ArticleCard key={relatedArticle.id} article={relatedArticle} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </>
  );
}
