import { useState } from "react";
import { Crown, Check, Star, Percent, UserCheck, Gift } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { InsertMembership } from "@shared/schema";

export default function Membership() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    membershipType: "gold"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const membershipMutation = useMutation({
    mutationFn: async (membershipData: InsertMembership) => {
      const response = await fetch('/api/memberships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(membershipData),
      });
      if (!response.ok) {
        throw new Error('Failed to submit membership');
      }
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitting(false);
      toast({
        title: "تم تسجيل طلب العضوية بنجاح",
        description: "سنتواصل معك قريباً لإتمام عملية التسجيل",
      });
      setFormData({ name: "", email: "", phone: "", membershipType: "gold" });
    },
    onError: () => {
      setIsSubmitting(false);
      toast({
        title: "خطأ في تسجيل العضوية",
        description: "حدث خطأ أثناء تسجيل العضوية. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const membershipData: InsertMembership = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      membershipType: formData.membershipType as "silver" | "gold" | "platinum",
    };

    membershipMutation.mutate(membershipData);
  };

  const membershipPlans = [
    {
      id: "silver",
      name: "العضوية الفضية",
      price: "49",
      duration: "شهريًا",
      color: "from-gray-400 to-gray-600",
      badge: "الأكثر شعبية",
      features: [
        "خصم 15% على جميع المنتجات",
        "استشارة ذكية مجانية شهريًا",
        "وصول للمقالات المتقدمة",
        "دعم عبر البريد الإلكتروني",
        "شحن مجاني للطلبات فوق $50"
      ]
    },
    {
      id: "gold",
      name: "العضوية الذهبية",
      price: "89",
      duration: "شهريًا",
      color: "from-yellow-400 to-yellow-600",
      badge: "الأفضل قيمة",
      features: [
        "خصم 25% على جميع المنتجات",
        "3 استشارات ذكية مجانية شهريًا",
        "وصول لجميع المحتوى المتقدم",
        "دعم أولوية عبر الواتساب",
        "شحن مجاني لجميع الطلبات",
        "منتجات حصرية للأعضاء",
        "استشارة شخصية ربع سنوية"
      ]
    },
    {
      id: "platinum",
      name: "العضوية البلاتينية",
      price: "149",
      duration: "شهريًا",
      color: "from-purple-400 to-purple-600",
      badge: "VIP",
      features: [
        "خصم 35% على جميع المنتجات",
        "استشارات ذكية غير محدودة",
        "وصول VIP لجميع المحتوى",
        "دعم مخصص 24/7",
        "شحن سريع مجاني",
        "منتجات حصرية وعينات مجانية",
        "استشارة شخصية شهرية",
        "دعوات لفعاليات خاصة"
      ]
    }
  ];

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Crown className="w-10 h-10 text-yellow-300" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">عضوية sehapostmart</h1>
              <p className="text-xl text-primary-100">
                انضم إلى عائلة sehapostmart واحصل على مزايا حصرية وخصومات مذهلة
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Overview */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-secondary-800 mb-8 text-center">لماذا تختار عضويتنا؟</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Percent className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-800 mb-2">خصومات حصرية</h3>
                  <p className="text-secondary-600">وفر حتى 35% على جميع منتجاتنا الطبيعية</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserCheck className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-800 mb-2">استشارات مجانية</h3>
                  <p className="text-secondary-600">احصل على استشارات صحية ذكية مجانية</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-800 mb-2">محتوى متقدم</h3>
                  <p className="text-secondary-600">وصول حصري للمقالات والدورات المتقدمة</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-800 mb-2">هدايا وعروض</h3>
                  <p className="text-secondary-600">عينات مجانية ومنتجات حصرية للأعضاء</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Membership Plans */}
        <section className="py-12 bg-secondary-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-secondary-800 mb-8 text-center">اختر خطة العضوية المناسبة لك</h2>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {membershipPlans.map((plan) => (
                  <Card key={plan.id} className={`relative overflow-hidden ${plan.id === 'gold' ? 'ring-2 ring-primary-500 transform scale-105' : ''}`}>
                    {plan.badge && (
                      <div className={`absolute top-0 right-0 bg-gradient-to-r ${plan.color} text-white px-4 py-2 text-sm font-semibold`}>
                        {plan.badge}
                      </div>
                    )}
                    <CardHeader className="text-center pt-8">
                      <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Crown className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <div className="text-4xl font-bold text-secondary-800">
                        ${plan.price}
                        <span className="text-lg font-normal text-secondary-500">/{plan.duration}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-secondary-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={`w-full ${plan.id === 'gold' ? 'bg-primary-600 hover:bg-primary-700' : 'bg-secondary-600 hover:bg-secondary-700'}`}
                        onClick={() => setFormData(prev => ({ ...prev, membershipType: plan.id }))}
                      >
                        اختر هذه الخطة
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Membership ID Section */}
        <section className="py-12 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">معرف العضوية الخاص بنا</h2>
              <div className="bg-white bg-opacity-10 rounded-2xl p-8 mb-8">
                <p className="text-xl mb-4">للانضمام إلى برنامج العضوية، استخدم المعرف التالي:</p>
                <div className="text-5xl font-bold text-yellow-300 mb-4">819026838</div>
                <p className="text-primary-100">احفظ هذا المعرف للرجوع إليه عند التسجيل</p>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">تسجيل عضوية جديدة</CardTitle>
                  <CardDescription className="text-center">
                    املأ النموذج أدناه لبدء عضويتك معنا
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="text-right"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="text-right"
                        placeholder="example@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="text-right"
                        placeholder="+963 xxx xxx xxx"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>نوع العضوية المختارة</Label>
                      <div className="space-y-3">
                        {membershipPlans.map((plan) => (
                          <label key={plan.id} className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-secondary-50">
                            <input
                              type="radio"
                              name="membershipType"
                              value={plan.id}
                              checked={formData.membershipType === plan.id}
                              onChange={handleInputChange}
                              className="text-primary-600"
                            />
                            <div className="flex-1">
                              <div className="font-semibold text-secondary-800">{plan.name}</div>
                              <div className="text-sm text-secondary-600">${plan.price}/{plan.duration}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-primary-600 hover:bg-primary-700 text-lg py-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          جاري التسجيل...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Crown className="w-5 h-5" />
                          سجل عضويتك الآن
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 bg-secondary-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-secondary-800 mb-4">لديك أسئلة حول العضوية؟</h2>
              <p className="text-xl text-secondary-600 mb-8">
                فريقنا جاهز لمساعدتك في اختيار العضوية المناسبة
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://wa.me/963951902860"
                  className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold inline-flex items-center justify-center gap-2"
                >
                  تواصل عبر الواتساب
                </a>
                <a 
                  href="mailto:sehapostmartall@gmail.com"
                  className="border-2 border-primary-500 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-500 hover:text-white transition-colors font-semibold"
                >
                  راسلنا عبر البريد الإلكتروني
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
