import type { FC, ChangeEvent } from "react";
import { useRef, useState, useEffect } from "react";
import type { ComponentPropsWithoutRef } from "react";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import type { FeatureImage } from "~/utils/models/models";
import ImageItemInput from "../ImageItemInput/ImageItemInput";
interface FeatureImageInputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  defaultImages?: FeatureImage[];
  getImages?: (
    image: {
      image?: string;
      file: File | null;
      priority: string;
      description: string;
      showIn: "carousel" | "detail" | "both";
    }[]
  ) => void;
}
const FeatureImageInput: FC<FeatureImageInputProps> = ({
  label,
  defaultImages = [],
  getImages,
  ...otherProps
}) => {
  const [images, setImages] = useState<FeatureImage[]>(
    defaultImages.map((image) => ({ ...image, file: null }))
  );

  const priorityChangeHandler = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    setImages((prev) => {
      const copied = [...prev];
      const currentImage = copied[index];
      const updatedImage = {
        ...currentImage,
        priority: e.target.value,
      };
      copied[index] = updatedImage;

      return copied;
    });
  };

  const showInChangeHandler = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    setImages((prev) => {
      const copied = [...prev];
      const currentImage = copied[index];
      const updatedImage = {
        ...currentImage,
        showIn: e.target.value as "both" | "carousel" | "detail",
      };
      copied[index] = updatedImage;

      return copied;
    });
  };

  const descriptionBlurHandler = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    setImages((prev) => {
      const copied = [...prev];
      const currentImage = copied[index];
      const updatedImage = {
        ...currentImage,
        description: e.target.value,
      };
      copied[index] = updatedImage;

      return copied;
    });
  };
  const deleteImageHandler = (index: number) => {
    setImages((prev) => {
      const images = [...prev];
      images.splice(index, 1);
      return images;
    });
  };

  // useEffect(() => {
  //   if (getImages) {
  //     getImages(images);
  //   }
  // }, [images]);

  const addNewImageHandler = () => {
    setImages((prev) => {
      const copied = [...prev];
      copied.push({
        image: "",
        multiScreenImages: [],
        label: "",
        priority: "1",
        description: "",
        showIn: "both",
      });
      return copied;
    });
  };
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="image-input">{label}</label>
      <Button type="button" onClick={addNewImageHandler}>
        Add new image
      </Button>

      <div className="flex flex-col lg:justify-start justify-center gap-3">
        {images.length > 0 &&
          [...images].map((image, index) => (
            <ImageItemInput
              image={image}
              key={image.image}
              itemIndex={index}
              defaultPriority={
                defaultImages.length === 0
                  ? (index + 1).toString()
                  : image.priority
              }
              onPriorityChange={(e) => {
                priorityChangeHandler(e, index);
              }}
              onShowInChange={(e) => {
                showInChangeHandler(e, index);
              }}
              priorityList={images}
              onDescriptionBlur={(e) => {
                descriptionBlurHandler(e, index);
              }}
              onDeleteImage={() => {
                deleteImageHandler(index);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default FeatureImageInput;
