import { useRef, Children, cloneElement, isValidElement } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const Dock = ({ children, className }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={className}
      style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { mouseX });
        }
        return child;
      })}
    </motion.div>
  );
};

export const DockItem = ({ children, className, mouseX, onClick, href }) => {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate scale based on mouse distance
  const scaleSync = useTransform(distance, [-150, 0, 150], [1, 1.4, 1]);
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 150, damping: 12 });

  // Calculate dynamic margin to push adjacent items away (mimics width expansion)
  const marginSync = useTransform(distance, [-150, 0, 150], [0, 12, 0]);
  const margin = useSpring(marginSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      onClick={onClick}
      style={{ 
        scale, 
        margin: margin, // Push neighbors
        transformOrigin: "center",
        display: "inline-block", // Ensure transform works
        willChange: "transform, margin" // Performance
      }}
    >
      {children}
    </motion.a>
  );
};
