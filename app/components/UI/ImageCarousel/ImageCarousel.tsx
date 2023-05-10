import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import * as animation from "~/utils/FramerMotionVariants/animationVariants";
import NavigationImage from "../NavigationImage/NavigationImage";
import ViewImageModal from "../ViewImageModal/ViewImageModal";
import { debounce } from "lodash";
const ImageCarousel = ({
  images = [],
  containerClassName,
}: {
  images: string[];
  containerClassName?: string;
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [disableButtons, setDisabledButtons] = useState(false);
  const [usingNavigation, setUsingNavigation] = useState(false);
  const [nextImage, setNextImage] = useState(true);
  const [toogleViewImage, setToggleViewImage] = useState(false);
  const [offset, setOffset] = useState(40);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const resizeDebounce = debounce(() => {
      if (window.innerWidth >= 786) {
        setOffset(40);
      } else {
        setOffset(20);
      }
    }, 100);
    if (typeof window !== "undefined") {
      window.addEventListener("resize", resizeDebounce);
    }
    resizeDebounce();

    return () => {
      window.removeEventListener("resize", resizeDebounce);
    };
  }, []);

  const setContainerClassName = (index: number) => {
    return index === currentImage
      ? `calc(50% - ${offset}px)`
      : `calc(50% - ${offset}px ${currentImage < index ? "+" : "-"} ${
          Math.abs(currentImage - index) * (offset === 40 ? 110 : 60)
        }px)`;
  };
  return (
    <div
      className={`w-full h-full relative overflow-hidden bg-slate-50 ${containerClassName}`}
    >
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
          className="w-full h-full object-cover object-center  pointer-events-none  absolute left-0 top-0"
          key={images[currentImage]}
          src={images[currentImage]}
          alt="carouselImage"
        />
      </AnimatePresence>
      <div className="absolute top-[2.5%] w-full flex justify-center">
        <span
          className="flex gap-3 text-slate-50 text-shadow items-center hover:scale-110 transition-all cursor-pointer shadow-sm bg-[rgba(255,255,255,0.1)] backdrop-blur-sm  p-3 rounded-full "
          onClick={() => setToggleViewImage(true)}
        >
          View image
        </span>
      </div>
      <div
        ref={containerRef}
        className=" drop-shadow-md h-[120px] md:h-[180px]  absolute bottom-0 py-6 w-full  bg-[rgba(0,0,0,0.05)] justify-center flex gap-5"
      >
        {images.map((image, index) => (
          <NavigationImage
            onClick={() => {
              setUsingNavigation(true);
              setCurrentImage(index);
            }}
            containerStyle={{ left: setContainerClassName(index) }}
            containerClassName={`absolute top-[20%] `}
            key={index}
            image={image}
            selected={currentImage === index}
          />
        ))}
      </div>
      <span
        className={`${
          disableButtons && " pointer-events-none"
        } drop-shadow-xl  absolute opacity-60  top-1/2 right-[5%] cursor-pointer hover:opacity-100 transition-all hover:scale-[1.1]`}
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
        } drop-shadow-xl absolute opacity-60  top-1/2 left-[5%] transition-all cursor-pointer hover:opacity-100 hover:scale-[1.1]`}
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
