import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import * as animation from "~/utils/FramerMotionVariants/animationVariants";
import NavigationImage from "../NavigationImage/NavigationImage";
import ViewImageModal from "../ViewImageModal/ViewImageModal";
const ImageCarousel = ({ images = [] }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [disableButtons, setDisabledButtons] = useState(false);
  const [usingNavigation, setUsingNavigation] = useState(false);
  const [nextImage, setNextImage] = useState(true);
  const [toogleViewImage, setToggleViewImage] = useState(false);
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
    <div className="w-full h-full relative overflow-hidden bg-slate-50">
      <AnimatePresence>
        {toogleViewImage && (
          <ViewImageModal
            toggle={toogleViewImage}
            onCancel={() => {
              setToggleViewImage(false);
            }}
            image={images[currentImage]}
          />
        )}
      </AnimatePresence>

      <AnimatePresence
        initial={false}
        mode="sync"
        custom={{ usingNavigation, next: nextImage }}
      >
        <motion.img
          onClick={() => setToggleViewImage(true)}
          variants={animation.imageNext}
          onAnimationStart={() => {
            setDisabledButtons(true);
          }}
          custom={{ usingNavigation, next: nextImage }}
          initial="initial"
          animate="animate"
          exit="exit"
          onAnimationComplete={() => {
            setDisabledButtons(false);
            if (usingNavigation) {
              setUsingNavigation(false);
            }
          }}
          className="w-full h-full object-cover object-left   absolute left-0 top-0"
          key={images[currentImage]}
          src={images[currentImage]}
          alt="carouselImage"
        />
      </AnimatePresence>
      <div className=" drop-shadow-md absolute bottom-0 py-6 w-full bg-[rgba(0,0,0,0.05)] justify-center flex gap-5">
        {images.map((image, index) => {
          if (
            index === currentImage - 1 ||
            index === currentImage + 1 ||
            index === currentImage
          ) {
            return (
              <NavigationImage
                onClick={() => {
                  setUsingNavigation(true);
                  setCurrentImage(index);
                }}
                key={index}
                image={image}
                selected={currentImage === index}
              />
            );
          }
        })}
      </div>
      <span
        className={`${
          disableButtons && " pointer-events-none"
        } drop-shadow-xl  absolute opacity-60  top-1/2 right-[5%] cursor-pointer hover:opacity-100 hover:scale-[1.1]`}
        onClick={nextHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#c2c2c2"
          className="w-[40px]"
          viewBox="0 0 512 512"
        >
          <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1c-4.2-4.5-10.1-7.1-16.3-7.1C266 128 256 138 256 150.3V208H160c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h96v57.7c0 12.3 10 22.3 22.3 22.3c6.2 0 12.1-2.6 16.3-7.1l99.9-107.1c3.5-3.8 5.5-8.7 5.5-13.8s-2-10.1-5.5-13.8L294.6 135.1z" />
        </svg>
      </span>
      <span
        className={`${
          disableButtons && " pointer-events-none"
        } drop-shadow-xl absolute opacity-60  top-1/2 left-[5%] cursor-pointer hover:opacity-100 hover:scale-[1.1]`}
        onClick={previousHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#c2c2c2"
          className="w-[40px]"
          viewBox="0 0 512 512"
        >
          <path d="M48 256a208 208 0 1 1 416 0A208 208 0 1 1 48 256zm464 0A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9c4.2 4.5 10.1 7.1 16.3 7.1c12.3 0 22.3-10 22.3-22.3V304h96c17.7 0 32-14.3 32-32V240c0-17.7-14.3-32-32-32H256V150.3c0-12.3-10-22.3-22.3-22.3c-6.2 0-12.1 2.6-16.3 7.1L117.5 242.2c-3.5 3.8-5.5 8.7-5.5 13.8s2 10.1 5.5 13.8l99.9 107.1z" />
        </svg>
      </span>
    </div>
  );
};

export default ImageCarousel;
