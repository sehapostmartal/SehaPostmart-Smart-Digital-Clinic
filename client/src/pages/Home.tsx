import { Link } from "wouter";
import { ArrowLeft, Leaf, BriefcaseMedical, Bot, Crown, Percent, UserCheck, Star } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ArticleCard from "@/components/ArticleCard";
import { sampleProducts, sampleArticles } from "@/data/sampleData";

export default function Home() {
  const featuredProducts = sampleProducts.slice(0, 6);
  const latestArticles = sampleArticles.slice(0, 3);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pl-8 text-center lg:text-right">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                العيادة الرقمية الذكية
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-primary-100 leading-relaxed">
                منصة صحية شاملة تقدم المنتجات الطبيعية والاستشارات الذكية لحياة صحية أفضل
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={scrollToServices}
                  className="bg-white text-primary-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-50 transition-colors shadow-lg"
                >
                  استكشف خدماتنا
                </button>
                <a 
                  href="https://wa.me/963951902860" 
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary-700 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <FaWhatsapp />
                  تواصل معنا
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Digital healthcare technology" 
                className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-800 mb-4">خدماتنا الأساسية</h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              نقدم مجموعة شاملة من الخدمات الصحية المتطورة لضمان رفاهيتك وصحتك
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/products" className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Leaf className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-secondary-800 mb-4">المنتجات الطبيعية</h3>
              <p className="text-secondary-600 mb-6 leading-relaxed">
                مكملات غذائية ومنتجات طبيعية عالية الجودة لدعم صحتك بشكل طبيعي وآمن
              </p>
              <span className="text-primary-600 font-semibold hover:text-primary-700 transition-colors inline-flex items-center">
                استكشف المنتجات <ArrowLeft className="mr-2 w-4 h-4" />
              </span>
            </Link>

            <Link href="/blog" className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BriefcaseMedical className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-secondary-800 mb-4">المحتوى المعرفي</h3>
              <p className="text-secondary-600 mb-6 leading-relaxed">
                مقالات وموارد تعليمية موثوقة من خبراء الصحة لتوسيع معرفتك الطبية
              </p>
              <span className="text-blue-600 font-semibold hover:text-blue-700 transition-colors inline-flex items-center">
                اقرأ المقالات <ArrowLeft className="mr-2 w-4 h-4" />
              </span>
            </Link>

            <Link href="/consultation" className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-secondary-800 mb-4">الاستشارات الذكية</h3>
              <p className="text-secondary-600 mb-6 leading-relaxed">
                استشارات صحية ذكية مدعومة بالذكاء الاصطناعي للحصول على توجيهات مخصصة
              </p>
              <span className="text-purple-600 font-semibold hover:text-purple-700 transition-colors inline-flex items-center">
                احصل على استشارة <ArrowLeft className="mr-2 w-4 h-4" />
              </span>
            </Link>

            <Link href="/membership" className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Crown className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-secondary-800 mb-4">فرصة العضوية</h3>
              <p className="text-secondary-600 mb-6 leading-relaxed">
                انضم إلى برنامج العضوية المميز واحصل على خصومات وخدمات حصرية
              </p>
              <span className="text-orange-600 font-semibold hover:text-orange-700 transition-colors inline-flex items-center">
                انضم الآن <ArrowLeft className="mr-2 w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-800 mb-4">المنتجات المميزة</h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              اكتشف مجموعتنا المختارة من أفضل المنتجات الطبيعية لصحة أفضل
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/products"
              className="bg-primary-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-600 transition-colors shadow-lg inline-flex items-center gap-2"
            >
              عرض جميع المنتجات
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-800 mb-4">أحدث المقالات الصحية</h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              اطلع على آخر المعلومات والنصائح الصحية من خبرائنا المتخصصين
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/blog"
              className="bg-primary-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-600 transition-colors shadow-lg inline-flex items-center gap-2"
            >
              عرض جميع المقالات
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Crown className="text-4xl text-yellow-300" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              انضم إلى عضويتنا المميزة
            </h2>
            <p className="text-xl lg:text-2xl mb-8 text-primary-100 leading-relaxed max-w-3xl mx-auto">
              احصل على خصومات حصرية، استشارات مجانية، ومحتوى صحي متقدم مع عضويتنا الذهبية
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Percent className="text-2xl text-yellow-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">خصومات حصرية</h3>
                <p className="text-primary-100">خصم يصل إلى 30% على جميع المنتجات</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="text-2xl text-yellow-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">استشارات مجانية</h3>
                <p className="text-primary-100">3 استشارات ذكية مجانية شهريًا</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-2xl text-yellow-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">محتوى متقدم</h3>
                <p className="text-primary-100">وصول حصري للمقالات والدورات المتقدمة</p>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 rounded-2xl p-8 mb-8">
              <div className="text-center">
                <p className="text-lg mb-2">معرف العضوية:</p>
                <p className="text-3xl font-bold text-yellow-300">819026838</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/membership"
                className="bg-white text-primary-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-50 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Crown />
                اشترك الآن
              </Link>
              <Link 
                href="/membership"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary-700 transition-colors"
              >
                تعرف على المزيد
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
