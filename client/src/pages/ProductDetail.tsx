import { useParams, Link } from "wouter";
import { ArrowRight, Heart, Share2, Users, MapPin, Gift } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id;
  
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['/api/products', productId],
    queryFn: async () => {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      return response.json();
    }
  });

  const { data: allProducts } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    }
  });
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-secondary-600">جاري تحميل المنتج...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-secondary-800 mb-2">المنتج غير موجود</h2>
            <p className="text-secondary-600 mb-6">لم نتمكن من العثور على المنتج المطلوب</p>
            <Link href="/products" className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              العودة إلى المنتجات
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const relatedProducts = (allProducts || [])
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleWhatsAppOrder = () => {
    const message = `مرحبا، أود طلب منتج: ${product.name}\nالسعر: $${product.price}`;
    const whatsappUrl = `https://wa.me/963951902860?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'مكملات غذائية':
        return 'bg-primary-500';
      case 'مشروبات صحية':
        return 'bg-blue-500';
      case 'العناية الشخصية':
        return 'bg-pink-500';
      default:
        return 'bg-primary-500';
    }
  };

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-reverse space-x-2 text-sm">
              <Link href="/" className="text-secondary-500 hover:text-primary-600">الرئيسية</Link>
              <span className="text-secondary-300">←</span>
              <Link href="/products" className="text-secondary-500 hover:text-primary-600">المنتجات</Link>
              <span className="text-secondary-300">←</span>
              <span className="text-secondary-800 font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-2xl">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full aspect-square object-cover"
                  />
                  <Badge className={`absolute top-4 right-4 ${getCategoryColor(product.category)} text-white`}>
                    {product.category}
                  </Badge>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-secondary-800 mb-4">
                    {product.name}
                  </h1>
                  <p className="text-xl text-secondary-600 leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <div className="text-3xl font-bold text-primary-600 mb-6">
                    ${product.price}
                  </div>
                </div>

                {/* Membership Discount Section */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 border-2 border-primary-200 rounded-2xl p-6 mb-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Gift className="w-6 h-6 text-primary-600" />
                      <h3 className="text-2xl font-bold text-primary-800">وفر أكثر واحصل على خصم الأعضاء!</h3>
                      <Gift className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Option 1: Direct Purchase */}
                    <div className="bg-white rounded-xl p-6 border border-primary-200 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                        <h4 className="text-lg font-bold text-secondary-800">الشراء المباشر (بدون تسجيل)</h4>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-secondary-700">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">اذهب إلى أقرب فرع DXN</span>
                        </div>
                        
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                          <p className="text-sm text-secondary-700 mb-2">اعطهم رقم العضوية العالمي:</p>
                          <div className="text-center">
                            <span className="text-3xl font-bold text-blue-600 bg-white px-4 py-2 rounded-lg border-2 border-blue-300">819026838</span>
                          </div>
                          <p className="text-xs text-center text-secondary-600 mt-2">هذا الرقم يمنحك خصم فوري</p>
                        </div>
                      </div>
                    </div>

                    {/* Option 2: Join Our Team */}
                    <div className="bg-white rounded-xl p-6 border-2 border-primary-300 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-primary-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                        الأفضل
                      </div>
                      
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                        <h4 className="text-lg font-bold text-secondary-800">انضم لفريقنا (مُوصى به)</h4>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-secondary-700">
                          <Users className="w-4 h-4 text-primary-500" />
                          <span className="text-sm">احصل على رقم عضوية خاص بك</span>
                        </div>
                        
                        <ul className="text-sm text-secondary-600 space-y-1 pr-4">
                          <li>• خصومات دائمة على جميع المنتجات</li>
                          <li>• دعم شخصي مني مباشرة</li>
                          <li>• رقم عضوية خاص بك</li>
                        </ul>
                        
                        <Link href="/membership">
                          <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold">
                            سجل عضويتك المجانية الآن
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleWhatsAppOrder}
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg flex items-center justify-center gap-2 flex-1"
                  >
                    <FaWhatsapp className="text-xl" />
                    اطلب عبر الواتساب
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="border-secondary-300">
                      <Heart className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="border-secondary-300">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-primary-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-secondary-800 mb-3">للطلب والاستفسار:</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <FaWhatsapp className="text-green-500" />
                      واتساب: +963951902860
                    </p>
                    <p>البريد الإلكتروني: sehapostmartall@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="benefits" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="benefits">الفوائد</TabsTrigger>
                <TabsTrigger value="usage">طريقة الاستخدام</TabsTrigger>
                <TabsTrigger value="ingredients">المكونات</TabsTrigger>
              </TabsList>
              
              <TabsContent value="benefits" className="mt-8">
                <div className="bg-secondary-50 p-8 rounded-xl">
                  <h3 className="text-2xl font-bold text-secondary-800 mb-4">فوائد {product.name}</h3>
                  <div className="prose prose-lg max-w-none text-secondary-700">
                    {product.benefits ? (
                      <p className="leading-relaxed">{product.benefits}</p>
                    ) : (
                      <p className="leading-relaxed">
                        يوفر هذا المنتج فوائد صحية متعددة ويساهم في تحسين الصحة العامة والرفاهية. 
                        للحصول على معلومات مفصلة حول الفوائد، يرجى التواصل معنا.
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="usage" className="mt-8">
                <div className="bg-secondary-50 p-8 rounded-xl">
                  <h3 className="text-2xl font-bold text-secondary-800 mb-4">طريقة الاستخدام</h3>
                  <div className="prose prose-lg max-w-none text-secondary-700">
                    {product.usage ? (
                      <p className="leading-relaxed">{product.usage}</p>
                    ) : (
                      <p className="leading-relaxed">
                        يُنصح باتباع التعليمات المدونة على العبوة أو استشارة أخصائي الصحة قبل الاستخدام. 
                        للحصول على إرشادات مفصلة، يرجى التواصل معنا.
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="ingredients" className="mt-8">
                <div className="bg-secondary-50 p-8 rounded-xl">
                  <h3 className="text-2xl font-bold text-secondary-800 mb-4">المكونات</h3>
                  <div className="prose prose-lg max-w-none text-secondary-700">
                    {product.ingredients ? (
                      <p className="leading-relaxed">{product.ingredients}</p>
                    ) : (
                      <p className="leading-relaxed">
                        يحتوي هذا المنتج على مكونات طبيعية عالية الجودة. 
                        للحصول على قائمة مفصلة بالمكونات، يرجى التواصل معنا أو مراجعة ملصق المنتج.
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 bg-secondary-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-secondary-800 mb-8 text-center">منتجات ذات صلة</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
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
