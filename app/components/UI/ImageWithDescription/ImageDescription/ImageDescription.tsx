import MultiTabsImageCarousel from "../../MultiTabsImageCarousel/MultiTabsImageCarousel";
import type { FeatureImage } from "./../../../../utils/models/models";

const ImageDescription = ({ image }: { image: FeatureImage }) => {
  return (
    <div
      id={image.id}
      className="flex gap-2 p-5  flex-col justify-center items-center 2xl:items-start 2xl:flex-row 2xl:odd:flex-row-reverse "
    >
      <MultiTabsImageCarousel images={image.multiScreenImages!} />

      <div className="lg:p-4 flex-1 gap-3 flex flex-col items-center text-justify lg:items-start rounded text-sm  lg:text-base   !leading-[40px]">
        <h3>{image.label}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: image.description.replace(/\n/g, "<br>"),
          }}
        ></div>
      </div>
    </div>
  );
};

export default ImageDescription;
