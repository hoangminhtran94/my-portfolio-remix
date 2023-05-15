import type { FeatureImage } from "./../../../../utils/models/models";

const ImageDescription = ({ image }: { image: FeatureImage }) => {
  return (
    <div
      id={image.id}
      className="flex gap-2 p-5  flex-col justify-center items-center md:items-start lg:flex-row lg:odd:flex-row-reverse "
    >
      <img
        key={image.image}
        id={image.id}
        className=" lg:w-[50%]  w-screen h-fit object-cover max-h-[800px] object-left-top   outline outline-1 outline-indigo-300 rounded"
        src={image.image}
        alt="carouselImage"
      />
      <div
        className="lg:p-4 flex-1 gap-3 flex flex-col items-center text-justify lg:items-start rounded text-sm  lg:text-base   !leading-[40px]"
        dangerouslySetInnerHTML={{
          __html: image.description.replace(/\n/g, "<br>"),
        }}
      ></div>
    </div>
  );
};

export default ImageDescription;
