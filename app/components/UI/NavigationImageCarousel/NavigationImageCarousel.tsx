import type { MultiScreenImage } from "~/utils/models/models";
import type { FC } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
interface NavigationImageCarouselProps {
  images: MultiScreenImage[];
}
const carouselFade = {
  initial: { opacity: 0.5 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0.3, transition: { duration: 0.3 } },
};
const NavigationImageCarousel: FC<NavigationImageCarouselProps> = ({
  images,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <div className="flex flex-col gap-7 w-full lg:w-[800px] ">
      <div className="flex gap-10 justify-center flex-wrap">
        {images.map((img, index) => (
          <span
            className={`cursor-pointer hover:scale-110 text-lg font-bold transition-all  ${
              index === currentImage ? "carousel-active" : " opacity-60"
            }`}
            key={img?.image}
            onClick={() => {
              setCurrentImage(index);
            }}
          >
            {img?.label}
          </span>
        ))}
      </div>
      <div className="h-[400px] lg:h-[600px] flex justify-center">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            variants={carouselFade}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-fit  object-contain  "
            key={images[currentImage]?.image}
            src={images[currentImage]?.image}
            alt="carouselImage"
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NavigationImageCarousel;
