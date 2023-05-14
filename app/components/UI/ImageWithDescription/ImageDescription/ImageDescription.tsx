import type { FeatureImage } from "./../../../../utils/models/models";
import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
const ImageDescription = ({ image }: { image: FeatureImage }) => {
  return (
    <div
      id={image.id}
      className="flex gap-2  p-5  flex-col justify-center items-center md:items-start lg:flex-row lg:odd:flex-row-reverse "
    >
      <img
        key={image.image}
        id={image.id}
        className=" lg:w-[50%]  w-screen h-fit object-cover max-h-[800px] object-left-top   outline outline-1 outline-indigo-300 rounded"
        src={image.image}
        alt="carouselImage"
      />
      <p
        className="p-4 flex-1 rounded  text-base  leading-loose"
        dangerouslySetInnerHTML={{
          __html: image.description.replace(/\n/g, "<br>"),
        }}
      ></p>
    </div>
  );
};

export default ImageDescription;
