import InviewWrapper from "../../InviewWrapper/InviewWrapper";
import MultiTabsImageCarousel from "../../MultiTabsImageCarousel/MultiTabsImageCarousel";
import type { FeatureImage } from "./../../../../utils/models/models";
const ImageDescription = ({
  image,
  index,
}: {
  image: FeatureImage;
  index: number;
}) => {
  return (
    <div
      id={image.id}
      className="flex gap-5 xl:p-5  tracking-wider  flex-col justify-center items-center 2xl:items-start 2xl:flex-row-reverse 2xl:odd:flex-row "
    >
      {image.multiScreenImages!.length > 0 && (
        <MultiTabsImageCarousel
          index={index}
          images={image.multiScreenImages!}
        />
      )}

      <InviewWrapper
        mode={index % 2 === 1 ? "right-left" : "left-right"}
        loadedState={true}
        once={true}
        className="lg:p-4 flex-1 gap-3 flex flex-col items-center text-justify lg:items-start rounded text-sm  lg:text-base   !leading-[40px]"
      >
        <h3 className=" tracking-widest font-extrabold !drop-shadow-yellow-around ">
          {image.label}
        </h3>
        <div
          dangerouslySetInnerHTML={{
            __html: image.description.replace(/\n/g, "<br>"),
          }}
        ></div>
      </InviewWrapper>
    </div>
  );
};

export default ImageDescription;
