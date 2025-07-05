import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const UniportalPage = () => {
  // Add SEO metadata
  useEffect(() => {
    document.title = "Uniportal - Spring/Fall USA";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Access our uniportal for seamless integration and services.");
    }
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', "uniportal, springfall usa, student portal");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow pt-28">
        {/* Full-screen iframe container */}
        <div className="w-full h-[calc(100vh-7rem)] relative">
          <iframe 
            src="https://springfall-usa.vercel.app/"
            className="w-full h-full border-0"
            title="Uniportal"
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
            loading="lazy"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UniportalPage; 