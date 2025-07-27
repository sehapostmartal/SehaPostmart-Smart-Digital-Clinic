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
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-green-800 mb-6">لوحة التحكم</h1>
            <p>مرحباً بك في لوحة التحكم. من هنا يمكنك إدارة محتوى الموقع.</p>
            {/* The form to add products will go here in the next step */}
        </div>
    );
};

export default AdminPage;