import { useRef, useState, useLayoutEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useIsomorphicLayoutEffect } from 'framer-motion';

export function ParallaxCarousel({ products }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const x = useMotionValue(0);

  // Calculate carousel width on mount
useIsomorphicLayoutEffect(() => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      const offsetWidth = containerRef.current.offsetWidth;
      setCarouselWidth(scrollWidth - offsetWidth);
    }
  }, [products]);

  return (
    <div className="overflow-hidden w-full">
    <motion.div
      ref={containerRef}
      drag="x"
      style={{ x }}
      dragConstraints={{ left: -carouselWidth, right: 0 }}
      className="relative flex w-full gap-2"
    >
      {products.map((product) => (
        <div
          key={product.productId}
          className="basis-[72%] md:basis-[28%] shrink-0 aspect-[4/6]  relative overflow-hidden"
        >
          <ParallaxImage imageUrl={product.productAsset?.preview} x={x} />
        </div>
      ))}
    </motion.div>
    </div>
  );
}

function ParallaxImage({ imageUrl, x }: { imageUrl: string; x: MotionValue<number> }) {
  const parallax = useTransform(x, (val) => {
    // move image slower than scroll for parallax effect
    const offset = val * 0.2; // tweak factor to taste
    return `center ${offset}px`;
  });

  return (
    <motion.img
      src={imageUrl}
      alt=""
      style={{ objectPosition: parallax }}
      className="w-full h-full object-cover"
    />
  );
}