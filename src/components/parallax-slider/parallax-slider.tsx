import React, { useRef } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { CustomEase } from "gsap/CustomEase";

import styles from './parallax-slider.module.scss';

// Only register CustomEase plugin
gsap.registerPlugin(useGSAP,CustomEase);
CustomEase.create('in-out-smooth', 'M0,0 C0.8,0 0.2,1 1,1');

export function ParallaxSlider({ collections }: { collections: { collection: { id: string, name: string, slug: string, featuredAsset?: { source: string } } }[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const state = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    current: 0,
    target: 0,
    progress: 0,
  });

  const { contextSafe } = useGSAP({ 
    scope: sliderRef,
    dependencies: [] 
  });

  // Setup animations
  useGSAP(() => {
    if (!sliderRef.current || !containerRef.current) return;

    const slider = sliderRef.current;
    const container = containerRef.current;
    const items = container.querySelectorAll(`.${styles.slider__item}`);
    
    // Initial setup
    gsap.set(items, { autoAlpha: 1 });
    
    // Create animation context
    const updateScroll = () => {
      const { current, target } = state.current;
      const ease = 0.075;
      
      state.current.current = gsap.utils.interpolate(current, target, ease);
      
      gsap.set(container, {
        x: state.current.current
      });

      items.forEach((item: Element) => {
        const img = item.querySelector(`.${styles.slider__item_img}`) as HTMLElement;
        if (img) {
          const bounds = item.getBoundingClientRect();
          const normalizedPosition = (bounds.left - state.current.current) / bounds.width;
          const parallaxOffset = normalizedPosition * 100;
          
          gsap.set(img, {
            x: parallaxOffset,
            scale: 1.2
          });
        }
      });

      if (progressRef.current) {
        const totalScroll = -(container.scrollWidth - window.innerWidth);
        const progress = gsap.utils.clamp(
          0,
          1,
          Math.abs(state.current.current) / Math.abs(totalScroll)
        );
        gsap.set(progressRef.current, { scaleX: progress });
      }
    };

    // Start animation loop
    gsap.ticker.add(updateScroll);

    // Cleanup
    return () => {
      gsap.ticker.remove(updateScroll);
    };
  }, { scope: sliderRef });

  // Event handlers wrapped in contextSafe
  const onWheel = contextSafe((e: WheelEvent) => {
    e.preventDefault();
    const containerWidth = containerRef.current!.scrollWidth;
    const maxScroll = -(containerWidth - window.innerWidth);
    state.current.target = gsap.utils.clamp(
      maxScroll,
      0,
      state.current.target - e.deltaY * 2
    );
  });

  const onMouseDown = contextSafe((e: MouseEvent) => {
    state.current.isDown = true;
    state.current.startX = e.pageX - containerRef.current!.offsetLeft;
    state.current.scrollLeft = state.current.target;
    sliderRef.current!.style.cursor = 'grabbing';
  });

  const onMouseUp = contextSafe(() => {
    state.current.isDown = false;
    sliderRef.current!.style.cursor = 'grab';
  });

  const onMouseMove = contextSafe((e: MouseEvent) => {
    if (!state.current.isDown) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current!.offsetLeft;
    const walk = (x - state.current.startX) * 2;
    state.current.target = state.current.scrollLeft + walk;
  });

  // Add event listeners
  useGSAP(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener('wheel', onWheel, { passive: false });
    slider.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      slider.removeEventListener('wheel', onWheel);
      slider.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, { scope: sliderRef });

  return (
    <div className={styles.slider} ref={sliderRef}>
      <div className={styles.slider__container} ref={containerRef}>
        {collections.map(({ collection }) => (
          <div key={collection.id} className={styles.slider__item}>
            <div className={styles.slider__item_img_wrap}>
              <img
                src={collection.featuredAsset?.source}
                alt={collection.name}
                className={styles.slider__item_img}
              />
            </div>
            <div className={styles.slider__item_content}>
              <h3 className={styles.slider__item_heading}>{collection.name}</h3>
              <a
                href={`/products/${collection.slug}`}
                className={styles.slider__item_button}
              >
                Shop Collection
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.slider__progress_wrap}>
        <div className={styles.slider__progress} ref={progressRef} />
      </div>
    </div>
  );
}