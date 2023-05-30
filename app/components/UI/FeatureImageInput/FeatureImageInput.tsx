import type { FC, ChangeEvent } from "react";
import { useState, useEffect } from "react";
import type { ComponentPropsWithoutRef } from "react";
import Button from "../Button/Button";
import type { FeatureImage, MultiScreenImage } from "~/utils/models/models";
import ImageItemInput from "../ImageItemInput/ImageItemInput";
interface FeatureImageInputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  defaultImages?: FeatureImage[];
  getImages?: (image: FeatureImage[]) => void;
}
const FeatureImageInput: FC<FeatureImageInputProps> = ({
  label,
  defaultImages = [],
  getImages,
}) => {
  const [images, setImages] = useState<FeatureImage[]>(defaultImages);

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
  const deleteImageGroupHandler = (index: number) => {
    setImages((prev) => {
      const images = [...prev];
      images.splice(index, 1);
      return images;
    });
  };

  useEffect(() => {
    if (getImages) {
      getImages(images);
    }
  }, [images]);
  const addNewImageHandler = (newImages: MultiScreenImage[], index: number) => {
    setImages((prev) => {
      const copied = [...prev];
      const oldImagesState = copied[index].multiScreenImages;
      copied[index].multiScreenImages = [...oldImagesState!, ...newImages];
      return copied;
    });
  };

  const addNewImageGroupHandler = () => {
    setImages((prev) => [
      ...prev,
      {
        image: "",
        multiScreenImages: [],
        label: "",
        priority: "1",
        description: "",
        showIn: "both",
      },
    ]);
  };
  const eachImageDataChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    imageIndex: number
  ) => {
    setImages((prev) => {
      const copied = [...prev];
      const currentImageGroup = copied[index];
      const currentImage = currentImageGroup.multiScreenImages![imageIndex];
      (currentImage as any)[e.target.name] = e.target.value;
      return copied;
    });
  };
  const deleteIndivisualImage = (index: number, imageIndex: number) => {
    setImages((prev) => {
      const copied = [...prev];
      const currentImageGroup = copied[index];
      const currentImages = currentImageGroup.multiScreenImages;
      currentImages?.splice(imageIndex, 1);
      return copied;
    });
  };
  const groupLabelChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setImages((prev) => {
      const copied = [...prev];
      const currentImageGroup = copied[index];
      currentImageGroup.label = e.target.value;
      return copied;
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="image-input">{label}</label>
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
              onGroupLabelChange={(e) => {
                groupLabelChangeHandler(e, index);
              }}
              onDeleteImageGroup={() => {
                deleteImageGroupHandler(index);
              }}
              onAddNewImages={(newImages) => {
                addNewImageHandler(newImages, index);
              }}
              onEachImageDataChange={(e, imageIndex) => {
                eachImageDataChangeHandler(e, index, imageIndex);
              }}
              onDeleteImage={(imageIndex) => {
                deleteIndivisualImage(index, imageIndex);
              }}
            />
          ))}
      </div>
      <Button className="mt-5" type="button" onClick={addNewImageGroupHandler}>
        Add new image group
      </Button>
    </div>
  );
};

export default FeatureImageInput;
