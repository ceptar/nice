import { motion, useTransform, MotionValue } from "framer-motion";

export function ParallaxImage({
  imageUrl,
  x
}: {
  imageUrl: string;
  x: MotionValue<number>; // from parent drag
}) {
  // Create a scaled transform for parallax (image moves half as fast as slide)
  const parallaxX = useTransform(x, (latestX) => latestX * 0.5);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.img
        src={imageUrl}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ x: parallaxX }}
        alt=""
      />
    </div>
  );
}