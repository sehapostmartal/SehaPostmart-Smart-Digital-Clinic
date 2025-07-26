import { Link } from "wouter";
import { FaWhatsapp } from "react-icons/fa";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleWhatsAppOrder = () => {
    const message = `مرحبا، أود طلب منتج: ${product.name}`;
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
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className={`absolute top-4 right-4 ${getCategoryColor(product.category)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
          {product.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-secondary-800 mb-2">{product.name}</h3>
        <p className="text-secondary-600 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary-600 font-bold text-lg">${product.price}</span>
          <div className="flex gap-2">
            <Link 
              href={`/products/${product.id}`}
              className="bg-secondary-100 text-secondary-700 px-4 py-2 rounded-lg hover:bg-secondary-200 transition-colors font-semibold text-sm"
            >
              التفاصيل
            </Link>
            <button 
              onClick={handleWhatsAppOrder}
              className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-semibold text-sm flex items-center gap-1"
            >
              <FaWhatsapp />
              اطلب الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
