import type { MultiScreenImage } from "~/utils/models/models";
import type { FC } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ViewImageModal from "../ViewImageModal/ViewImageModal";
interface MultiTabsImageCarouselProps {
  images: MultiScreenImage[];
}
const carouselFade = {
  initial: { opacity: 0.5 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0.3, transition: { duration: 0.3 } },
};
const MultiTabsImageCarousel: FC<MultiTabsImageCarouselProps> = ({
  images,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [toogleViewImage, setToggleViewImage] = useState(false);
  return (
    <div className="flex flex-col gap-7 w-full lg:w-[800px] ">
      <div className="flex gap-5 justify-center flex-wrap">
        {images.map((img, index) => (
          <span
            className={`cursor-pointer mx-2 hover:scale-110 text-lg font-bold transition-all  ${
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
      <div className="h-[400px] lg:h-[600px] flex justify-center relative">
        <div className="absolute top-[2.5%] w-full flex justify-center z-10">
          <span
            className="flex gap-3 text-slate-50 text-shadow items-center hover:scale-110 transition-all cursor-pointer shadow-sm bg-[rgba(255,255,255,0.1)] backdrop-blur-sm  p-3 rounded-full "
            onClick={() => setToggleViewImage(true)}
          >
            View image
          </span>
        </div>
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
      <AnimatePresence>
        {toogleViewImage && (
          <ViewImageModal
            toggle={toogleViewImage}
            onCancel={() => {
              setToggleViewImage(false);
            }}
            image={images[currentImage]?.image}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiTabsImageCarousel;
