import { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  children: React.ReactNode;
  speed?: number;
  onComplete?: () => void;
}

const TypewriterText = ({ children, speed = 15, onComplete }: TypewriterTextProps) => {
  const [displayedContent, setDisplayedContent] = useState<React.ReactNode>(null);
  const [isComplete, setIsComplete] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // If already animated, just show the full content
    if (hasAnimated.current) {
      setDisplayedContent(children);
      setIsComplete(true);
      return;
    }

    // Extract text content from children
    const extractText = (node: React.ReactNode): string => {
      if (typeof node === 'string') return node;
      if (typeof node === 'number') return String(node);
      if (!node) return '';
      if (Array.isArray(node)) return node.map(extractText).join('');
      if (typeof node === 'object' && 'props' in node) {
        return extractText((node as React.ReactElement).props.children);
      }
      return '';
    };

    const fullText = extractText(children);
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex += 2; // Reveal 2 characters at a time for speed
      
      if (currentIndex >= fullText.length) {
        clearInterval(interval);
        setDisplayedContent(children);
        setIsComplete(true);
        hasAnimated.current = true;
        onComplete?.();
      } else {
        // For simple text, show partial text
        // For complex JSX, just show the whole thing after animation
        setDisplayedContent(
          <span>
            {fullText.slice(0, currentIndex)}
            <span className="animate-pulse">|</span>
          </span>
        );
      }
    }, speed);

    return () => clearInterval(interval);
  }, [children, speed, onComplete]);

  // If complete, render original children to preserve JSX structure
  if (isComplete) {
    return <>{children}</>;
  }

  return <div ref={contentRef}>{displayedContent}</div>;
};

export default TypewriterText;
