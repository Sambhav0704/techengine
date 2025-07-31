import React from 'react';

const SimpleApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">TECH-ENGINE</h1>
        <p className="text-xl text-gray-600 mb-8">HR Hiring Platform</p>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome!</h2>
            <p className="text-gray-600 mb-6">
              This is a simple test page to verify the app is working correctly.
            </p>
            
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-[#805da3] text-white rounded-lg hover:bg-[#6d4d8c] transition-colors">
                Student Login
              </button>
              <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                HR Login
              </button>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>If you can see this page, the basic app structure is working.</p>
            <p>Check the browser console for any error messages.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleApp; 