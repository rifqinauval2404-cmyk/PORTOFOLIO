import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollReveal = ({
  children,
  className = '',
  baseOpacity = 0.1,
  enableBlur = false,
  baseRotation = 0,
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 50%'],
  });

  const text = typeof children === 'string' ? children : React.Children.toArray(children).join('');
  const words = text.split(' ');

  return (
    <span ref={containerRef} className={`scroll-reveal-container ${className}`} style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            baseOpacity={baseOpacity}
            enableBlur={enableBlur}
            baseRotation={baseRotation}
          >
            {word}
          </Word>
        );
      })}
    </span>
  );
};

const Word = ({ children, progress, range, baseOpacity, enableBlur, baseRotation }) => {
  const opacity = useTransform(progress, range, [baseOpacity, 1]);
  const blurValue = useTransform(progress, range, [enableBlur ? 15 : 0, 0]);
  const rotateValue = useTransform(progress, range, [baseRotation, 0]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  return (
    <span style={{ display: 'inline-block', position: 'relative', marginRight: '0.25em', marginTop: '0.1em' }}>
      <span style={{ position: 'absolute', opacity: 0 }}>{children}</span>
      <motion.span
        style={{
          display: 'inline-block',
          opacity,
          filter: enableBlur ? filter : 'none',
          rotate: baseRotation ? rotateValue : 0,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default ScrollReveal;
