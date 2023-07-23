import type { MultiScreenImage } from "~/utils/models/models";
import type { FC } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ViewImageModal from "../ViewImageModal/ViewImageModal";
import InviewWrapper from "../InviewWrapper/InviewWrapper";

interface MultiTabsImageCarouselProps {
  images: MultiScreenImage[];
  index: number;
}
const carouselFade = {
  initial: { opacity: 0.5 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0.3, transition: { duration: 0.3 } },
};
const MultiTabsImageCarousel: FC<MultiTabsImageCarouselProps> = ({
  images,
  index,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [toogleViewImage, setToggleViewImage] = useState(false);
  return (
    <InviewWrapper
      mode={index % 2 === 1 ? "left-right" : "right-left"}
      loadedState={true}
      once={true}
      className="flex flex-col mt-5 xl:mt-0 gap-7 w-full lg:w-[800px] "
    >
      <div className="flex gap-5 justify-center flex-wrap !text-white">
        {images.map((img, index) => (
          <span
            className={`cursor-pointer mx-2 hover:scale-110 text-sm xl:text-md font-bold transition-all  ${
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
    </InviewWrapper>
  );
};

export default MultiTabsImageCarousel;
