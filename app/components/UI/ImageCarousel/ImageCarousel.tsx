import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import * as animation from "~/utils/FramerMotionVariants/animationVariants";
const ImageCarousel = ({ images = [] }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const [nextImage, setNextImage] = useState(true);
  const nextHandler = () => {
    if (currentImage === images.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage((prev) => prev + 1);
    }
    setNextImage(true);
  };
  const previousHandler = () => {
    if (currentImage === 0) {
      setCurrentImage(images.length - 1);
    } else {
      setCurrentImage((prev) => prev - 1);
    }
    setNextImage(false);
  };

  return (
    <div className="w-full h-full relative overflow-hidden">
      <AnimatePresence initial={false} custom={nextImage}>
        <motion.img
          variants={animation.imageNext}
          custom={nextImage}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full object-cover absolute left-0 top-0"
          key={images[currentImage]}
          src={images[currentImage]}
          alt="carouselImage"
        />
      </AnimatePresence>
      <span className="absolute right-0 cursor-pointer" onClick={nextHandler}>
        Next
      </span>
      <span className="absolute cursor-pointer" onClick={previousHandler}>
        Previous
      </span>
    </div>
  );
};

export default ImageCarousel;
