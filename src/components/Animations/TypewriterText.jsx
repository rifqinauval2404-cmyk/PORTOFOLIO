import { useState, useEffect, useRef } from 'react';

const TypewriterText = ({ text, delay = 50, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
            setDisplayedText(""); // Reset text when out of view
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      let index = 0;
      setDisplayedText(""); // Clear before typing
      const intervalId = setInterval(() => {
        if (index <= text.length) {
          // Use substring instead of charAt to handle empty state properly if needed, but charAt is fine too.
          setDisplayedText(text.slice(0, index));
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, delay);

      return () => clearInterval(intervalId);
    }
  }, [isVisible, text, delay]);

  return (
    <span ref={containerRef} className={`typewriter ${className}`}>
      {displayedText}
    </span>
  );
};

export default TypewriterText;
