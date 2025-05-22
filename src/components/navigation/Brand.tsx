
import React from 'react';

const Brand: React.FC = () => {
  return (
    <div className="flex items-center">
      <a href="/" className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gradient animate-gradient flex items-center justify-center">
          <span className="text-white font-bold">AI</span>
        </div>
        <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">AIacademy</span>
      </a>
    </div>
  );
};

export default Brand;
