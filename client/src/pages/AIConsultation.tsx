import { useState } from "react";
import { Bot, Send, AlertCircle, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export default function AIConsultation() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    symptoms: "",
    medicalHistory: "",
    currentMedications: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "تم إرسال الاستشارة بنجاح",
        description: "سنقوم بمراجعة حالتك وإرسال التوصيات قريباً",
      });
    }, 2000);
  };

  if (submitted) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-secondary-800 mb-4">
                تم إرسال استشارتك بنجاح!
              </h1>
              <p className="text-xl text-secondary-600 mb-8">
                شكراً لك على ثقتك بنا. سيقوم فريقنا المتخصص بمراجعة حالتك وإرسال التوصيات المناسبة إلى بريدك الإلكتروني خلال 24-48 ساعة.
              </p>
              <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                <h3 className="font-semibold text-secondary-800 mb-2">الخطوات التالية:</h3>
                <ul className="text-right space-y-2 text-secondary-600">
                  <li>• ستتلقى رسالة تأكيد على بريدك الإلكتروني</li>
                  <li>• سيراجع خبراؤنا حالتك بعناية</li>
                  <li>• ستحصل على توصيات مخصصة ومفصلة</li>
                  <li>• يمكنك التواصل معنا لأي استفسارات إضافية</li>
                </ul>
              </div>
              <Button onClick={() => window.location.href = "/"} className="bg-primary-500 hover:bg-primary-600">
                العودة إلى الرئيسية
              </Button>
            </div>
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
        <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">الاستشارة الذكية</h1>
              <p className="text-xl text-purple-100">
                احصل على استشارة صحية مخصصة مدعومة بالذكاء الاصطناعي وخبرة أطبائنا المتخصصين
              </p>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-secondary-800 mb-8 text-center">كيف تعمل الاستشارة الذكية؟</h2>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-800 mb-2">املأ الاستمارة</h3>
                  <p className="text-secondary-600">قدم معلومات مفصلة عن حالتك الصحية وأعراضك</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-800 mb-2">تحليل ذكي</h3>
                  <p className="text-secondary-600">نظامنا الذكي وخبراؤنا يحللون حالتك بدقة</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-800 mb-2">توصيات مخصصة</h3>
                  <p className="text-secondary-600">احصل على توصيات صحية مخصصة لحالتك</p>
                </div>
              </div>

              <Alert className="mb-8">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  هذه الاستشارة لأغراض تعليمية وإرشادية فقط ولا تغني عن استشارة الطبيب المختص. في حالات الطوارئ، يرجى التوجه إلى أقرب مستشفى.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </section>

        {/* Consultation Form */}
        <section className="py-12 bg-secondary-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">استمارة الاستشارة الصحية</CardTitle>
                  <CardDescription className="text-center">
                    يرجى ملء جميع الحقول بدقة للحصول على أفضل النتائج
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">العمر</Label>
                      <Input
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="text-right"
                        placeholder="أدخل عمرك"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="symptoms">الأعراض والشكاوى الحالية *</Label>
                      <Textarea
                        id="symptoms"
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="text-right"
                        placeholder="اشرح الأعراض التي تعاني منها بالتفصيل..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medicalHistory">التاريخ المرضي</Label>
                      <Textarea
                        id="medicalHistory"
                        name="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={handleInputChange}
                        rows={3}
                        className="text-right"
                        placeholder="أذكر أي أمراض مزمنة أو عمليات جراحية سابقة..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentMedications">الأدوية الحالية</Label>
                      <Textarea
                        id="currentMedications"
                        name="currentMedications"
                        value={formData.currentMedications}
                        onChange={handleInputChange}
                        rows={3}
                        className="text-right"
                        placeholder="اذكر جميع الأدوية والمكملات التي تتناولها حالياً..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          جاري المعالجة...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          إرسال الاستشارة
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
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-secondary-800 mb-4">بحاجة إلى مساعدة فورية؟</h2>
              <p className="text-xl text-secondary-600 mb-8">
                فريقنا متاح للمساعدة والإجابة على استفساراتك
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
