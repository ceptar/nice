// @ts-nocheck
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCard, ProductCardSkeleton } from '~/src/components/product-card/product-card';
import { ProductLink } from '~/src/components/product-link/product-link';

interface FramerCarouselProps {
    featuredProducts?: any[];
    // categorySlug: string;
    // title?: string;
    // description?: JSX.Element | string;
    // productCount?: number;
    // className?: string;
}

function FramerCarousel(props: FramerCarouselProps){
    const { featuredProducts = [] } = props;
  const [activeItem, setActiveItem] = useState(featuredProducts[0]);
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [carousel]);

//  cursor-grab active:cursor-grabbing snap-x snap-mandatory

  return (
    <div className='w-full overflow-hidden'>
      <motion.div
        ref={carousel}
        drag='x'
        // whileDrag={{ scale: 0.95 }}
        dragElastic={0.2}
        dragConstraints={{ right: 0, left: -width }}
        dragTransition={{ bounceDamping: 30 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className='flex will-change-transform '
      >


{featuredProducts.map((product) => (
            <motion.div className='flex min-w-[40vw] h-full p-2'>
<div className='flex flex-col w-full h-full'>
              <ProductLink
                              key={product.productId}
                              productSlug={product.slug!}
                              data-oid="1dgt013"
                          >
                              <ProductCard
                                  name={product.productName!}
                                  imageUrl={product.productAsset?.preview}
                                  price={product.priceWithTax}
                                  currencyCode={product.currencyCode}
                                  //   discountedPrice={product.priceData?.formatted?.discountedPrice}
                                  //   ribbon={product.ribbon ?? undefined}
                                  data-oid=".69b_9o"

                              />
                          </ProductLink>
        </div>
</motion.div>
)
      )}
      </motion.div>
    </div>
  );
}

export default FramerCarousel;