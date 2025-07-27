import React, { useState, useEffect } from "react";
import { Product, Article } from "../../../shared/types"; // Adjust path if necessary

// This is the main component for the entire Admin Page
const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "dxn123") {
      setIsAuthenticated(true);
    } else {
      alert("كلمة المرور غير صحيحة");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center mb-6">
            لوحة التحكم - تسجيل الدخول
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
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

  return <AdminDashboard />;
};

// This is the new AdminDashboard component with Tabs
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">لوحة التحكم</h1>

      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("products")}
            className={`${activeTab === "products" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            إدارة المنتجات
          </button>
          <button
            onClick={() => setActiveTab("articles")}
            className={`${activeTab === "articles" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            إدارة المقالات
          </button>
        </nav>
      </div>

      <div>
        {activeTab === "products" && <ProductManager />}
        {activeTab === "articles" && <ArticleManager />}
      </div>
    </div>
  );
};

// Component for managing products
const ProductManager = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("المكملات الغذائية");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [benefits, setBenefits] = useState("");
  const [usage, setUsage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/products");
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

  const handleDelete = async (productId: number) => {
    if (window.confirm("هل أنت متأكد من أنك تريد حذف هذا المنتج؟")) {
      try {
        await fetch(`/api/products/${productId}`, { method: "DELETE" });
        alert("تم حذف المنتج بنجاح.");
        fetchProducts();
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("فشلت عملية الحذف.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          price,
          description,
          benefits,
          usage,
          ingredients,
          imageUrl,
          is_featured: isFeatured,
        }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      alert("تمت إضافة المنتج بنجاح!");
      setName("");
      setCategory("المكملات الغذائية");
      setPrice("");
      setDescription("");
      setBenefits("");
      setUsage("");
      setIngredients("");
      setImageUrl("");
      setIsFeatured(false);
      fetchProducts();
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("فشلت عملية إضافة المنتج.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">إضافة / تعديل منتج</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label>اسم المنتج</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border p-2 rounded-md"
              required
            />
          </div>
          <div>
            <label>التصنيف</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full border p-2 rounded-md"
            >
              <option>المكملات الغذائية</option>
              <option>المشروبات الصحية</option>
              <option>العناية الشخصية</option>
            </select>
          </div>
          <div>
            <label>السعر</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full border p-2 rounded-md"
              required
            />
          </div>
          <div>
            <label>الوصف</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="mt-1 block w-full border p-2 rounded-md"
            ></textarea>
          </div>
          <div>
            <label>الفوائد</label>
            <textarea
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              rows={2}
              className="mt-1 block w-full border p-2 rounded-md"
            ></textarea>
          </div>
          <div>
            <label>طريقة الاستخدام</label>
            <textarea
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              rows={2}
              className="mt-1 block w-full border p-2 rounded-md"
            ></textarea>
          </div>
          <div>
            <label>المكونات</label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows={2}
              className="mt-1 block w-full border p-2 rounded-md"
            ></textarea>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="isFeatured" className="ml-2">
              تمييز كمنتج مقترح
            </label>
          </div>
          <div>
            <label>رابط الصورة</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 block w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
            >
              {isSubmitting ? "جاري الإضافة..." : "إضافة المنتج"}
            </button>
          </div>
        </form>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">قائمة المنتجات</h2>
        <div className="overflow-y-auto h-96">
          {isLoading ? (
            <p>جاري التحميل...</p>
          ) : (
            <ul className="space-y-2">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center justify-between p-2 border-b"
                >
                  <span>
                    {product.name} {product.is_featured ? "⭐" : ""}
                  </span>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 text-sm"
                  >
                    حذف
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

// Component for managing articles
const ArticleManager = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("صحة عامة");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/articles");
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (articleId: number) => {
    if (window.confirm("هل أنت متأكد من أنك تريد حذف هذا المقال؟")) {
      try {
        await fetch(`/api/articles/${articleId}`, { method: "DELETE" });
        alert("تم حذف المقال بنجاح.");
        fetchArticles();
      } catch (error) {
        alert("فشلت عملية الحذف.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, content, imageUrl }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add article");
      }
      alert("تمت إضافة المقال بنجاح.");
      setTitle("");
      setCategory("صحة عامة");
      setContent("");
      setImageUrl("");
      fetchArticles();
    } catch (error) {
      console.error("Failed to add article:", error);
      alert(`فشلت عملية إضافة المقال: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">إضافة مقال جديد</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label>عنوان المقال</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border p-2 rounded-md"
              required
            />
          </div>
          <div>
            <label>التصنيف</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label>المحتوى</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="mt-1 block w-full border p-2 rounded-md"
              required
            ></textarea>
          </div>
          <div>
            <label>رابط الصورة</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 block w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isSubmitting ? "جاري الإضافة..." : "إضافة المقال"}
            </button>
          </div>
        </form>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">قائمة المقالات الحالية</h2>
        <div className="overflow-y-auto h-96">
          {isLoading ? (
            <p>جاري التحميل...</p>
          ) : (
            <ul className="space-y-2">
              {articles.map((article) => (
                <li
                  key={article.id}
                  className="flex items-center justify-between p-2 border-b"
                >
                  <span>{article.title}</span>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="text-red-600 text-sm"
                  >
                    حذف
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
