import { useState } from "react";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sampleArticles } from "@/data/sampleData";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "جميع الفئات" },
    { value: "المناعة", label: "المناعة" },
    { value: "التركيز", label: "التركيز" },
    { value: "التغذية", label: "التغذية" },
  ];

  const featuredArticle = sampleArticles.find(article => article.featured === "true") || sampleArticles[0];
  
  const filteredArticles = sampleArticles
    .filter(article => article.id !== featuredArticle.id)
    .filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">المدونة الصحية</h1>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                اكتشف أحدث المقالات والنصائح الصحية من خبرائنا المتخصصين
              </p>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-secondary-800 mb-8 text-center">المقال المميز</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl overflow-hidden shadow-lg">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="p-8 lg:p-12">
                    <div className="inline-block bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      {featuredArticle.category}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-secondary-800 mb-4">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-secondary-600 mb-6 leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-secondary-500 mb-6">
                      <span>{featuredArticle.readTime}</span>
                    </div>
                    <a 
                      href={`/blog/${featuredArticle.id}`}
                      className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold inline-flex items-center gap-2"
                    >
                      اقرأ المقال كاملاً
                      <span>←</span>
                    </a>
                  </div>
                  <div className="lg:p-8">
                    <img 
                      src={featuredArticle.imageUrl} 
                      alt={featuredArticle.title}
                      className="w-full h-64 lg:h-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-secondary-50 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-4xl mx-auto">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="ابحث في المقالات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 text-right"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-secondary-600 font-medium">الفئة:</span>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 bg-secondary-50">
          <div className="container mx-auto px-4">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-secondary-800 mb-2">لم نجد مقالات مطابقة</h3>
                <p className="text-secondary-600">جرب تغيير كلمات البحث أو الفئة المختارة</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800">
                    المقالات ({filteredArticles.length} مقال)
                  </h2>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
