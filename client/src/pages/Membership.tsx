import React from 'react';
import { FaUserPlus, FaGlobe, FaHandshake, FaPercent } from 'react-icons/fa';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Membership = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
          انضم إلى فريقنا في رحلة الصحة والثراء
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          أنت لا تشتري منتجات فحسب، بل تستثمر في صحتك وتفتح الباب لفرصة عمل عالمية يمكنك إدارتها من أي مكان في العالم.
        </p>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">لماذا تنضم عبر فريقنا؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaPercent className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">خصم فوري ودائم</h3>
              <p className="text-gray-600">احصل على خصم 15% إلى 25% على جميع المنتجات مدى الحياة.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaGlobe className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">فرصة عمل عالمية</h3>
              <p className="text-gray-600">ابدأ مشروعك الخاص من المنزل بدون أي مخاطرة أو رأس مال.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaHandshake className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">دعم ومتابعة شخصية</h3>
              <p className="text-gray-600">سأقوم بإرشادك ومتابعتك خطوة بخطوة لضمان نجاحك.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaUserPlus className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">عضوية مجانية مدى الحياة</h3>
              <p className="text-gray-600">التسجيل مجاني بالكامل وعضويتك صالحة مدى الحياة.</p>
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">كيف تعمل العضوية؟ (3 خطوات بسيطة)</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <div className="text-center">
                  <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-2">1</div>
                  <h4 className="font-semibold">أرسل بياناتك</h4>
                  <p>املأ النموذج البسيط في الأسفل.</p>
              </div>
              <div className="text-gray-300 text-2xl hidden md:block">→</div>
              <div className="text-center">
                  <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-2">2</div>
                  <h4 className="font-semibold">نقوم بتسجيلك</h4>
                  <p>نتواصل معك عبر واتساب لإتمام التسجيل.</p>
              </div>
              <div className="text-gray-300 text-2xl hidden md:block">→</div>
              <div className="text-center">
                  <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-2">3</div>
                  <h4 className="font-semibold">ابدأ رحلتك</h4>
                  <p>استلم رقم عضويتك وابدأ بالشراء بالخصم.</p>
              </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-inner">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">نموذج طلب الانضمام</h2>
          <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
            <div className="mb-4 text-right">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">الاسم الكامل</label>
              <input type="text" id="name" name="name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
            </div>
            <div className="mb-4 text-right">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">البريد الإلكتروني</label>
              <input type="email" id="email" name="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
            </div>
            <div className="mb-4 text-right">
              <label htmlFor="country" className="block text-gray-700 font-semibold mb-2">الدولة المقيم بها</label>
              <input type="text" id="country" name="country" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
            </div>
            <div className="mb-6 text-right">
              <label htmlFor="whatsapp" className="block text-gray-700 font-semibold mb-2">رقم الواتس اب (مع رمز الدولة)</label>
              <input type="tel" id="whatsapp" name="whatsapp" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
            </div>
            <button type="submit" className="w-full bg-green-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-800 transition-colors text-xl">
              أرسل طلب الانضمام الآن
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Membership;