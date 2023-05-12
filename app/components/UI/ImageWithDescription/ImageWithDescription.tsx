import type { FeatureImage } from "~/utils/models/models";

const ImageWithDescription = ({
  images = [],
  containerClassName,
}: {
  images: FeatureImage[];
  containerClassName?: string;
}) => {
  return (
    <div className={`flex flex-col w-full gap-20 ${containerClassName}`}>
      <h2 className="text-center">Project details</h2>
      {images.map((image, index) => (
        <div
          className="flex gap-2 flex-col justify-center items-center md:items-start md:flex-row md:odd:flex-row-reverse "
          key={index}
        >
          <img
            className="md:w-fit h-fit w-screen  md:h-[800px] object-contain  object-center  outline outline-1 outline-indigo-300 rounded"
            src={image.image}
            alt="carouselImage"
          />
          <p className="p-4 flex-1 rounded  text-base">{image.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageWithDescription;
