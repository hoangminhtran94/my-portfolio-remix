import type { FeatureImage } from "~/utils/models/models";
import ImageDescription from "./ImageDescription/ImageDescription";

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
      className={`flex flex-col lg:gap-5  drop-shadow-white-around-xs relative ${containerClassName}`}
    >
      <h1 className="text-center tracking-widest">Project details</h1>
      {images.map((image, index) => (
        <ImageDescription index={index} key={image.id} image={image} />
      ))}
    </motion.div>
  );
};

export default ImageWithDescription;
