
// Utility to generate sitemap data
export const generateSitemap = () => {
  const baseUrl = 'https://aiacademy.example.com';
  
  const pages = [
    {
      url: '/',
      changefreq: 'daily',
      priority: '1.0',
      lastmod: new Date().toISOString(),
    },
    // Add more pages as they're created
  ];

  return pages.map(page => ({
    ...page,
    url: `${baseUrl}${page.url}`,
  }));
};

// SEO utility functions
export const seoUtils = {
  generateMetaTitle: (title: string, siteName = 'AIacademy') => {
    return title.includes(siteName) ? title : `${title} | ${siteName}`;
  },
  
  generateMetaDescription: (description: string, maxLength = 160) => {
    return description.length > maxLength 
      ? `${description.substring(0, maxLength - 3)}...`
      : description;
  },
  
  generateStructuredData: (type: string, data: Record<string, any>) => {
    return {
      '@context': 'https://schema.org',
      '@type': type,
      ...data,
    };
  },
};
