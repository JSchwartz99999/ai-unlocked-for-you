import React from 'react';

const Brand: React.FC = () => {
  return (
    <div className="flex items-center">
      <a
        href="/"
        className="flex items-center transition-opacity duration-150 hover:opacity-80"
        aria-label="AI Academy Home"
      >
        <div className="w-10 h-10 rounded-full bg-gradient flex items-center justify-center shadow-md">
          <span className="text-[var(--text-inverse)] font-bold text-sm">AI</span>
        </div>
        <span className="ml-4 text-xl font-semibold text-[var(--text-primary)]">
          AI Academy
        </span>
      </a>
    </div>
  );
};

export default Brand;
