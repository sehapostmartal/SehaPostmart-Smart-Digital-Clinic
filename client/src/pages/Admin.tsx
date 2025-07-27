import React, { useState, useEffect } from 'react';

// This is the main component for the entire Admin Page
const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // IMPORTANT: This is a simple, hardcoded password.
    // For a real application, a proper authentication system is needed.
    if (password === 'dxn123') {
      setIsAuthenticated(true);
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  // If the user is not authenticated, show the login form
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center mb-6">لوحة التحكم - تسجيل الدخول</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="أدخل كلمة المرور"
            className="w-full px-4 py-2 border rounded-lg text-center"
          />
          <button
            onClick={handleLogin}
            className="w-full mt-4 bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700"
          >
            دخول
          </button>
        </div>
      </div>
    );
  }

  // If authenticated, show the actual Admin Panel
  return <AdminDashboard />;
};


// This is the new, complete AdminDashboard component
const AdminDashboard = () => {
  // State for the form
  const [name, setName] = useState('');
  const [category, setCategory] = useState('المكملات الغذائية');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [benefits, setBenefits] = useState('');
  const [usage, setUsage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for the product list
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    if (window.confirm('هل أنت متأكد من أنك تريد حذف هذا المنتج؟')) {
      try {
        await fetch(`/api/products/${productId}`, { method: 'DELETE' });
        alert('تم حذف المنتج بنجاح.');
        fetchProducts(); // Refresh the list
      } catch (error) {
        console.error('Failed to delete product:', error);
        alert('فشلت عملية الحذف.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category, price, description, benefits, usage, ingredients, imageUrl, isFeatured }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const newProduct = await response.json();
      alert(`تمت إضافة المنتج بنجاح! المنتج: ${newProduct.name}`);
      setName(''); setCategory('المكملات الغذائية'); setPrice(''); setDescription(''); setBenefits(''); setUsage(''); setIngredients(''); setImageUrl(''); setIsFeatured(false);
      fetchProducts(); // Refresh the list
    } catch (error) {
      console.error('Failed to add product:', error);
      alert('فشلت عملية إضافة المنتج.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">لوحة التحكم</h1>

      {/* Add Product Form */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-6">إضافة منتج جديد</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div><label className="block text-sm font-medium text-gray-700">اسم المنتج</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required /></div>
          <div><label className="block text-sm font-medium text-gray-700">التصنيف</label><select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2"><option>المكملات الغذائية</option><option>المشروبات الصحية</option><option>العناية الشخصية</option></select></div>
          <div><label className="block text-sm font-medium text-gray-700">السعر</label><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required /></div>
          <div><label className="block text-sm font-medium text-gray-700">الوصف</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea></div>
          <div><label className="block text-sm font-medium text-gray-700">الفوائد</label><textarea value={benefits} onChange={(e) => setBenefits(e.target.value)} rows={2} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea></div>
          <div><label className="block text-sm font-medium text-gray-700">طريقة الاستخدام</label><textarea value={usage} onChange={(e) => setUsage(e.target.value)} rows={2} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea></div>
          <div><label className="block text-sm font-medium text-gray-700">المكونات</label><textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} rows={2} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea></div>
          <div className="flex items-center">
            <input type="checkbox" id="isFeatured" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
            <label htmlFor="isFeatured" className="ml-2 block text-sm font-medium text-gray-900">تمييز كمنتج مقترح</label>
          </div>
          <div><label className="block text-sm font-medium text-gray-700">رابط الصورة</label><input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2" /></div>
          <div><button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400">{isSubmitting ? 'جاري الإضافة...' : 'إضافة المنتج'}</button></div>
        </form>
      </div>

      {/* Product List */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">قائمة المنتجات الحالية</h2>
        {isLoading ? <p>جاري تحميل المنتجات...</p> : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50"><tr><th className="p-2 text-right">الاسم</th><th className="p-2 text-right">التصنيف</th><th className="p-2 text-right">السعر</th><th className="p-2 text-center">مقترح</th><th className="p-2">إجراء</th></tr></thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b">
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">{product.category}</td>
                    <td className="p-2">${product.price}</td>
                    <td className="p-2 text-center">
                      {product.isFeatured ? (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">مميز</span>
                      ) : (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">عادي</span>
                      )}
                    </td>
                    <td className="p-2 text-center">
                      <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800 px-3 py-1 rounded border border-red-600 hover:bg-red-50">حذف</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;