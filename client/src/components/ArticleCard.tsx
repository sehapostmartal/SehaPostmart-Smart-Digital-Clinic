import { Link } from "wouter";
import { Calendar, Clock } from "lucide-react";
import type { Article } from "@shared/schema";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-secondary-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className={`absolute top-4 right-4 ${getCategoryColor(article.category)} text-white px-3 py-1 rounded-full text-sm`}>
          {article.category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-secondary-500 mb-3">
          <Calendar className="w-4 h-4 ml-2" />
          <span>{formatDate(article.createdAt instanceof Date ? article.createdAt.toISOString() : article.createdAt || new Date().toISOString())}</span>
          <span className="mx-2">•</span>
          <Clock className="w-4 h-4 ml-1" />
          <span>{article.readTime}</span>
        </div>
        <h3 className="text-xl font-bold text-secondary-800 mb-3 group-hover:text-primary-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-secondary-600 mb-4 line-clamp-3">{article.excerpt}</p>
        <Link 
          href={`/blog/${article.id}`}
          className="text-primary-600 font-semibold hover:text-primary-700 transition-colors inline-flex items-center"
        >
          اقرأ المزيد
          <span className="mr-2">←</span>
        </Link>
      </div>
    </article>
  );
}
