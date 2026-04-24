import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RotatingText = ({
  texts = ['Build', 'Create', 'Innovate', 'Grow'],
  rotationInterval = 2500,
  loop = true,
  auto = true,
  className = '',
  animatePresenceMode = 'wait',
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!auto) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (!loop && prev === texts.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return (prev + 1) % texts.length;
      });
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [auto, loop, rotationInterval, texts.length]);

  return (
    <span 
      className={className} 
      style={{ 
        display: 'inline-block', 
        position: 'relative', 
        overflow: 'hidden', 
        verticalAlign: 'bottom',
        minWidth: 'min-content' 
      }}
    >
      <AnimatePresence mode={animatePresenceMode}>
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0, filter: 'blur(10px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }}
          style={{ 
            display: 'inline-block', 
            whiteSpace: 'nowrap', 
            position: 'absolute', 
            left: 0, 
            top: 0 
          }}
        >
          {texts[index]}
        </motion.span>
        <span style={{ visibility: 'hidden', whiteSpace: 'nowrap', display: 'inline-block' }}>
          {texts[index]}
        </span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingText;
