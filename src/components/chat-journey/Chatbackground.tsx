import { memo } from "react";

/**
 * Premium Chat Backgrounds with Logo Integration
 * Using /favicon.ico from public folder
 */

// Option 1: Floating Logo Pattern (Subtle & Professional)
export const ChatBackgroundLogoFloat = memo(() => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Floating logos at different positions with blur and opacity */}
      <div className="absolute top-[10%] left-[5%] w-32 h-32 opacity-[0.03]">
        <img src="../../../public/favicon.ico" alt="" className="w-full h-full object-contain animate-float" />
      </div>
      
      <div className="absolute top-[60%] right-[8%] w-40 h-40 opacity-[0.04]">
        <img src="../../../public/favicon.ico" alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="absolute bottom-[15%] left-[15%] w-36 h-36 opacity-[0.03]">
        <img src="../../../public/favicon.ico" alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="absolute top-[35%] right-[25%] w-28 h-28 opacity-[0.02]">
        <img src="../../../public/favicon.ico" alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent" />
    </div>
  );
});

ChatBackgroundLogoFloat.displayName = "ChatBackgroundLogoFloat";

// Option 2: Logo Grid Pattern (Clean & Modern)
export const ChatBackgroundLogoGrid = memo(() => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Logo grid */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'url(/favicon.ico)',
          backgroundSize: '120px 120px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Gradient overlay to fade edges */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background" />
      
      {/* Subtle color wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
    </div>
  );
});

ChatBackgroundLogoGrid.displayName = "ChatBackgroundLogoGrid";

// Option 3: Large Watermark Logo (Corporate Style)
export const ChatBackgroundLogoWatermark = memo(() => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/4" />
      
      {/* Large centered watermark logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.02]">
        <img 
          src="../../../public/favicon.ico" 
          alt="" 
          className="w-full h-full object-contain"
          style={{ filter: 'blur(2px)' }}
        />
      </div>
      
      {/* Corner accent logos */}
      <div className="absolute top-8 right-8 w-16 h-16 opacity-[0.04]">
        <img src="../../../public/favicon.ico" alt="" className="w-full h-full object-contain" />
      </div>
      
      <div className="absolute bottom-8 left-8 w-16 h-16 opacity-[0.04]">
        <img src="../../../public/favicon.ico" alt="" className="w-full h-full object-contain" />
      </div>
    </div>
  );
});

ChatBackgroundLogoWatermark.displayName = "ChatBackgroundLogoWatermark";

// Option 4: Logo with Orbs (Dynamic & Premium)
export const ChatBackgroundLogoOrbs = memo(() => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Animated gradient orbs */}
      <div 
        className="absolute top-0 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"
      />
      <div 
        className="absolute top-1/4 -right-40 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '3s' }}
      />
      
      {/* Subtle logo overlays */}
      <div className="absolute top-[20%] right-[10%] w-24 h-24 opacity-[0.03]">
        <img src="../../../public/favicon.ico" alt="" className="w-full h-full object-contain" />
      </div>
      
      <div className="absolute bottom-[25%] left-[12%] w-28 h-28 opacity-[0.04]">
        <img src="../../../public/favicon.ico" alt="" className="w-full h-full object-contain" />
      </div>
      
      {/* Gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
    </div>
  );
});

ChatBackgroundLogoOrbs.displayName = "ChatBackgroundLogoOrbs";

// Option 5: Scattered Logos with Depth (Most Creative)
export const ChatBackgroundLogoScattered = memo(() => {
  const logos = [
    { top: '8%', left: '12%', size: 'w-20 h-20', opacity: 0.2, delay: '0s', blur: false },
    { top: '25%', right: '15%', size: 'w-32 h-32', opacity: 0.1, delay: '1s', blur: true },
    { top: '45%', left: '8%', size: 'w-24 h-24', opacity: 0.15, delay: '2s', blur: false },
    { top: '18%', left: '60%', size: 'w-28 h-28', opacity: 0.1, delay: '0.5s', blur: true },
    { bottom: '20%', right: '10%', size: 'w-36 h-36', opacity: 0.2, delay: '1.5s', blur: true },
    { bottom: '35%', left: '20%', size: 'w-20 h-20', opacity: 0.2, delay: '3s', blur: false },
    { top: '70%', right: '35%', size: 'w-24 h-24', opacity: 0.15, delay: '2.5s', blur: false },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/6" />
      
       {/* Layered wave shapes */}
      <div className="absolute inset-0 opacity-30">
        <svg className="absolute bottom-0 left-0 w-full h-64" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="hsl(var(--primary) / 0.1)" 
            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,122.7C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <svg className="absolute bottom-0 left-0 w-full h-48" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="hsl(var(--accent) / 0.05)" 
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,186.7C960,171,1056,149,1152,154.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
      
      {/* Scattered logos */}
      {logos.map((logo, index) => (
        <div
          key={index}
          className={`absolute ${logo.size}`}
          style={{
            top: logo.top,
            bottom: logo.bottom,
            left: logo.left,
            right: logo.right,
            opacity: logo.opacity,
            animationDelay: logo.delay,
          }}
        >
          <img
            src="../../../public/favicon.ico"
            alt=""
            className="w-full h-full object-contain animate-float"
            style={{ filter: logo.blur ? 'blur(3px)' : 'none' }}
          />
        </div>
      ))}
      
      {/* Multiple gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/50" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />
    </div>
  );
});

ChatBackgroundLogoScattered.displayName = "ChatBackgroundLogoScattered";

// Option 6: Logo Diagonal Pattern (Bold & Modern)
export const ChatBackgroundLogoDiagonal = memo(() => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Diagonal stripe of logos */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ transform: 'rotate(-15deg) scale(1.5)' }}>
        <div className="flex flex-col gap-32">
          {[...Array(8)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-32 justify-center">
              {[...Array(8)].map((_, colIndex) => (
                <img
                  key={colIndex}
                  src="../../../public/favicon.ico"
                  alt=""
                  className="w-16 h-16 object-contain"
                  style={{
                    opacity: Math.random() * 0.5 + 0.5, // Varying opacity
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/3" />
    </div>
  );
});

ChatBackgroundLogoDiagonal.displayName = "ChatBackgroundLogoDiagonal";

// Option 7: Logo Corner Accent (Minimal & Professional)
export const ChatBackgroundLogoCorners = memo(() => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/4" />
      
      {/* Large corner logos with heavy blur */}
      <div className="absolute -top-32 -left-32 w-80 h-80 opacity-[0.04]">
        <img 
          src="../../../public/favicon.ico" 
          alt="" 
          className="w-full h-full object-contain"
          style={{ filter: 'blur(40px)' }}
        />
      </div>
      
      <div className="absolute -bottom-32 -right-32 w-80 h-80 opacity-[0.04]">
        <img 
          src="../../../public/favicon.ico" 
          alt="" 
          className="w-full h-full object-contain"
          style={{ filter: 'blur(40px)' }}
        />
      </div>
      
      {/* Small accent logos */}
      <div className="absolute top-[30%] right-[8%] w-20 h-20 opacity-[0.03]">
        <img src="../../../public/favicon.ico" alt="" className="w-full h-full object-contain animate-float" />
      </div>
      
      <div className="absolute bottom-[30%] left-[8%] w-20 h-20 opacity-[0.03]">
        <img src="../../../public/favicon.ico" alt="" className="w-full h-full object-contain animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-transparent to-background/40" />
    </div>
  );
});

ChatBackgroundLogoCorners.displayName = "ChatBackgroundLogoCorners";

// Option 8: Logo Path Trail (Most Unique)
export const ChatBackgroundLogoPath = memo(() => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Curved path of logos simulating a journey */}
      <div className="absolute inset-0">
        {/* Path curve coordinates */}
        {[
          { x: '10%', y: '80%', size: 'w-16 h-16', opacity: 0.02 },
          { x: '18%', y: '65%', size: 'w-18 h-18', opacity: 0.025 },
          { x: '28%', y: '52%', size: 'w-20 h-20', opacity: 0.03 },
          { x: '40%', y: '42%', size: 'w-22 h-22', opacity: 0.035 },
          { x: '54%', y: '35%', size: 'w-24 h-24', opacity: 0.04 },
          { x: '68%', y: '32%', size: 'w-22 h-22', opacity: 0.035 },
          { x: '80%', y: '25%', size: 'w-20 h-20', opacity: 0.03 },
          { x: '88%', y: '15%', size: 'w-18 h-18', opacity: 0.025 },
        ].map((point, index) => (
          <div
            key={index}
            className={`absolute ${point.size}`}
            style={{
              left: point.x,
              top: point.y,
              opacity: point.opacity,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <img
              src="../../../public/favicon.ico"
              alt=""
              className="w-full h-full object-contain"
              style={{ filter: 'blur(1px)' }}
            />
          </div>
        ))}
      </div>
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/30" />
    </div>
  );
});

ChatBackgroundLogoPath.displayName = "ChatBackgroundLogoPath";

// RECOMMENDED: Best for loan aggregator - professional with brand presence
export const ChatBackgroundLogoRecommended = ChatBackgroundLogoFloat;

// Export all options
// export {
//   ChatBackgroundLogoFloat,
//   ChatBackgroundLogoGrid,
//   ChatBackgroundLogoWatermark,
//   ChatBackgroundLogoOrbs,
//   ChatBackgroundLogoScattered,
//   ChatBackgroundLogoDiagonal,
//   ChatBackgroundLogoCorners,
//   ChatBackgroundLogoPath,
// };