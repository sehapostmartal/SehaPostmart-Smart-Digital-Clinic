import React, { useState } from 'react';

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


// This component is the actual dashboard shown after successful login
const AdminDashboard = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('المكملات الغذائية'); // Default category
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [benefits, setBenefits] = useState('');
  const [usage, setUsage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          category,
          price,
          description,
          benefits,
          usage,
          ingredients,
          imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const newProduct = await response.json();
      alert(`تمت إضافة المنتج بنجاح! المنتج: ${newProduct.name}`);
      
      // Clear the form for the next entry
      setName('');
      setCategory('المكملات الغذائية');
      setPrice('');
      setDescription('');
      setBenefits('');
      setUsage('');
      setIngredients('');
      setImageUrl('');

    } catch (error) {
      console.error('Failed to add product:', error);
      alert('فشلت عملية إضافة المنتج. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">لوحة التحكم</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">إضافة منتج جديد</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">اسم المنتج</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">التصنيف</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
              <option>المكملات الغذائية</option>
              <option>المشروبات الصحية</option>
              <option>العناية الشخصية</option>
            </select>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">السعر</label>
            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">الوصف</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"></textarea>
          </div>

          <div>
            <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">الفوائد</label>
            <textarea id="benefits" value={benefits} onChange={(e) => setBenefits(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"></textarea>
          </div>

          <div>
            <label htmlFor="usage" className="block text-sm font-medium text-gray-700">طريقة الاستخدام</label>
            <textarea id="usage" value={usage} onChange={(e) => setUsage(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"></textarea>
          </div>

          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">المكونات</label>
            <textarea id="ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"></textarea>
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">رابط الصورة</label>
            <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" />
          </div>

          <div>
            <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400">
              {isSubmitting ? 'جاري الإضافة...' : 'إضافة المنتج'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;