import { Link } from "wouter";
import { FaClinicMedical, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaWhatsapp, FaEnvelope, FaIdCard } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-secondary-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-reverse space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                <FaClinicMedical className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">sehapostmart</h3>
                <p className="text-secondary-300 font-inter">Smart Digital Clinic</p>
              </div>
            </div>
            <p className="text-secondary-300 leading-relaxed mb-6 max-w-md">
              منصة صحية شاملة تقدم أفضل المنتجات الطبيعية والاستشارات الذكية لحياة صحية أفضل. نحن ملتزمون بتقديم حلول صحية موثوقة ومبتكرة.
            </p>
            <div className="flex space-x-reverse space-x-4">
              <a href="#" className="w-10 h-10 bg-secondary-700 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-700 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-700 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-700 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-secondary-300 hover:text-primary-400 transition-colors">المنتجات</Link></li>
              <li><Link href="/blog" className="text-secondary-300 hover:text-primary-400 transition-colors">المدونة</Link></li>
              <li><Link href="/consultation" className="text-secondary-300 hover:text-primary-400 transition-colors">الاستشارة الذكية</Link></li>
              <li><Link href="/membership" className="text-secondary-300 hover:text-primary-400 transition-colors">العضوية</Link></li>
              <li><a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">من نحن</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">سياسة الخصوصية</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">تواصل معنا</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-reverse space-x-3">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaWhatsapp className="text-sm" />
                </div>
                <div>
                  <p className="text-secondary-300 text-sm">واتساب</p>
                  <a href="https://wa.me/963951902860" className="text-white hover:text-primary-400 transition-colors font-inter">+963951902860</a>
                </div>
              </div>
              <div className="flex items-center space-x-reverse space-x-3">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-sm" />
                </div>
                <div>
                  <p className="text-secondary-300 text-sm">البريد الإلكتروني</p>
                  <a href="mailto:sehapostmartall@gmail.com" className="text-white hover:text-primary-400 transition-colors font-inter text-sm">sehapostmartall@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center space-x-reverse space-x-3">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaIdCard className="text-sm" />
                </div>
                <div>
                  <p className="text-secondary-300 text-sm">معرف العضوية</p>
                  <p className="text-white font-inter">819026838</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-secondary-700 pt-8 text-center">
          <p className="text-secondary-400 font-inter">
            © 2024 sehapostmart - Smart Digital Clinic. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
