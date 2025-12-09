import { useEffect, useState, useRef } from "react";

const ContactForm: React.FC = () => {
  const [formLoaded, setFormLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeFormCrafts = async () => {
      try {
        if (typeof window !== 'undefined') {
          const win = window as any;

          // Initialize FormCrafts config
          win._fo = win._fo || [];
          win._fo.push({
            'c': 'uclin',
            'i': 'gggytfu',
            'm': 0,
            's': 0,
            'w': 540,
            't': 'rgba(197, 36, 51, 1)'
          });

          // Load script asynchronously
          const loadScript = () => {
            return new Promise<void>((resolve, reject) => {
              // Remove existing script if any
              const existingScript = document.querySelector('script[src*="formcrafts.com"]');
              if (existingScript) {
                existingScript.remove();
              }

              const script = document.createElement('script');
              script.type = 'text/javascript';
              script.async = true;
              script.defer = true;
              script.src = 'https://formcrafts.com/js/fc.js';
              
              script.onload = () => {
                setIsLoading(false);
                resolve();
              };
              
              script.onerror = () => {
                setIsLoading(false);
                reject(new Error('Failed to load FormCrafts'));
              };

              document.head.appendChild(script);
            });
          };

          // Check if FormCrafts is already loaded
          if (win.fc && typeof win.fc.render === 'function') {
            win.fc.render();
            setIsLoading(false);
            setFormLoaded(true);
          } else {
            await loadScript();
            win.fce = 1;
          }
        }
      } catch (error) {
        console.error('FormCrafts loading error:', error);
        setIsLoading(false);
      }
    };

    // Add small delay to prevent blocking initial render
    const timer = setTimeout(() => {
      initializeFormCrafts();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Monitor form loading
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const formElement = document.getElementById('uclin');
          if (formElement && formElement.children.length > 0) {
            setFormLoaded(true);
            setIsLoading(false);
          }
        }
      });
    });

    const formElement = document.getElementById('uclin');
    if (formElement) {
      observer.observe(formElement, { 
        childList: true, 
        subtree: true,
        attributes: false
      });
    }

    // Cleanup after 10 seconds if form doesn't load
    const timeout = setTimeout(() => {
      if (!formLoaded) {
        setIsLoading(false);
      }
    }, 10000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [formLoaded]);

  return (
    <div className="w-full" id='interest-form'>
      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-muted-foreground font-medium">Loading form...</span>
        </div>
      )}
      
      {/* Form container */}
      <div
        id='uclin'
        ref={formRef}
        className={`mx-auto w-full transition-opacity duration-300 ${formLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          minHeight: isLoading ? '0' : '400px',
          maxHeight: 'none',
          overflow: 'visible',
          position: 'relative',
          zIndex: 1
        }}
      />
      
      {/* Fallback content if form fails to load */}
      {!isLoading && !formLoaded && (
        <div className="text-center py-8 backdrop-blur-xl bg-card/40 border border-border/50 rounded-xl">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Contact Us Directly
          </h3>
          <p className="text-muted-foreground mb-6">
            Having trouble with the form? Reach out to us directly:
          </p>
          <div className="space-y-2 text-sm">
            <p className="text-foreground/80">
              📧 Email: support@edumate.com
            </p>
            <p className="text-foreground/80">
              📞 Phone: +91-XXXX-XXXXXX
            </p>
            <p className="text-foreground/80">
              💬 WhatsApp: +91-XXXX-XXXXXX
            </p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary-light transition-all duration-300 hover:scale-[1.02]"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactForm;