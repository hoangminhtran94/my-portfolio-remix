import type { FeatureImage } from "~/utils/models/models";

const ImageWithDescription = ({
  images = [],
  containerClassName,
}: {
  images: FeatureImage[];
  containerClassName?: string;
}) => {
  return (
    <div
      className={`flex flex-col w-full gap-5 lg:gap-20 ${containerClassName}`}
    >
      <h2 className="text-center">Project details</h2>
      {images.map((image, index) => (
        <div
          className="flex gap-2 flex-col justify-center items-center md:items-start lg:flex-row lg:odd:flex-row-reverse "
          key={index}
        >
          <img
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
      ))}
    </div>
  );
};

export default ImageWithDescription;
