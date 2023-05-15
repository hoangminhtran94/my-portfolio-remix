import type { FeatureImage } from "~/utils/models/models";
import ImageDescription from "./ImageDescription/ImageDescription";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
const ImageWithDescription = ({
  images = [],
  containerClassName,
}: {
  images: FeatureImage[];
  containerClassName?: string;
}) => {
  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { delay: 1.2, duration: 0.5 } }}
      className={`flex flex-col container lg:gap-5  relative ${containerClassName}`}
    >
      <div className="w-full h-full absolute top-0 left-0 project-2-bg -z-20 "></div>
      <h1 className="text-center">Project details</h1>
      {images.map((image, index) => (
        <ImageDescription key={image.id} image={image} />
      ))}
    </motion.div>
  );
};

export default ImageWithDescription;
