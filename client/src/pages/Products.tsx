import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Product } from "@shared/schema";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    }
  });

  const categories = [
    { value: "all", label: "جميع الفئات" },
    { value: "مكملات غذائية", label: "مكملات غذائية" },
    { value: "مشروبات صحية", label: "مشروبات صحية" },
    { value: "العناية الشخصية", label: "العناية الشخصية" },
  ];

  const filteredProducts = (products || []).filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-secondary-600">جاري تحميل المنتجات...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-secondary-800 mb-2">خطأ في تحميل المنتجات</h2>
            <p className="text-secondary-600 mb-6">حدث خطأ أثناء تحميل المنتجات. يرجى المحاولة مرة أخرى.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">المنتجات الطبيعية</h1>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                اكتشف مجموعتنا الواسعة من المنتجات الطبيعية عالية الجودة لصحة أفضل
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="ابحث في المنتجات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 text-right"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <Filter className="text-secondary-600 w-5 h-5" />
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

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-secondary-800 mb-2">لم نجد منتجات مطابقة</h3>
                <p className="text-secondary-600">جرب تغيير كلمات البحث أو الفئة المختارة</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-secondary-800">
                    النتائج ({filteredProducts.length} منتج)
                  </h2>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
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
