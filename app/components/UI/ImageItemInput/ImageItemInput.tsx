import type {
  FC,
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  ChangeEvent,
} from "react";

import { useRef } from "react";
import type { FeatureImage, MultiScreenImage } from "~/utils/models/models";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import Input from "../Input/Input";

interface ImageItemInputProps {
  image: FeatureImage;
  itemIndex: number;
  defaultPriority: string;
  onPriorityChange: ChangeEventHandler<HTMLSelectElement>;
  onShowInChange: ChangeEventHandler<HTMLSelectElement>;
  priorityList: any[];
  onDescriptionBlur: FocusEventHandler<HTMLTextAreaElement>;
  onDeleteImageGroup: MouseEventHandler<HTMLButtonElement>;
  onAddNewImages: (newImages: MultiScreenImage[]) => void;
  onEachImageDataChange: (
    e: ChangeEvent<HTMLInputElement>,
    currentImageIndex: number
  ) => void;
  onDeleteImage: (currentImageIndex: number) => void;
  onGroupLabelChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageItemInput: FC<ImageItemInputProps> = ({
  image,
  itemIndex,
  defaultPriority,
  priorityList,
  onPriorityChange,
  onShowInChange,
  onDescriptionBlur,
  onDeleteImageGroup,
  onAddNewImages,
  onEachImageDataChange,
  onDeleteImage,
  onGroupLabelChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col  gap-4 p-2 border-[3px] border-indigo-300">
      <Input
        label="Group label"
        onChange={onGroupLabelChange}
        defaultValue={image.label}
      />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label>Group Priority</label>
          <select
            name={"priority" + itemIndex}
            className="rounded border-solid border p-2 border-slate-200 focus:outline-slate-400"
            defaultValue={defaultPriority}
            onChange={onPriorityChange}
          >
            {priorityList.map((_, secondindex) => (
              <option key={secondindex} value={secondindex + 1}>
                {secondindex + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label>Show in</label>
          <select
            name={"showIn" + itemIndex}
            className="rounded border-solid border p-2 border-slate-200 focus:outline-slate-400"
            defaultValue={image.showIn ?? "both"}
            onChange={onShowInChange}
          >
            <option value="both">Both</option>
            <option value="carousel">Carousel</option>
            <option value="detail">Detail page</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-3 border rounded border-indigo-400">
        <h3 className="text-center">Group images</h3>
        <div className=" grid grid-cols-3 gap-2">
          {image.multiScreenImages?.map((image, index) => (
            <div key={index} className="flex flex-col gap-2 overflow-hidden">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <label>Image Priority</label>
                  <input
                    defaultValue={image.priority}
                    className="input"
                    type="number"
                    name="priority"
                    onChange={(e) => {
                      onEachImageDataChange(e, index);
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Label</label>
                  <input
                    defaultValue={image.label}
                    className="input"
                    type="text"
                    name="label"
                    onChange={(e) => {
                      onEachImageDataChange(e, index);
                    }}
                  />
                </div>
              </div>
              <div
                className="w-full h-[200px] relative rounded-lg overflow-hidden"
                onClick={() => {
                  onDeleteImage(index);
                }}
              >
                <div className=" absolute left-0 top-0  z-10  w-full h-full justify-center items-center bg-[rgba(0,0,0,0.3)] opacity-0 cursor-pointer  hover:opacity-100  flex">
                  <svg
                    className=" w-6"
                    fill="red"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                  </svg>
                </div>
                <img
                  className="  w-full h-full  object-cover"
                  src={image.image}
                  alt={image.image}
                />
              </div>
            </div>
          ))}
          <div
            onClick={() => {
              inputRef.current?.click();
            }}
            className="cursor-pointer  hover:outline-2 hover:outline hover:outline-slate-400  border rounded-lg border-slate-200  w-full h-full min-h-[334px] "
          >
            <div className="w-full h-full flex justify-center items-center hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6"
                fill="#9c9c9c"
                viewBox="0 0 384 512"
              >
                <path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm96 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm69.2 46.9c-3-4.3-7.9-6.9-13.2-6.9s-10.2 2.6-13.2 6.9l-41.3 59.7-11.9-19.1c-2.9-4.7-8.1-7.5-13.6-7.5s-10.6 2.8-13.6 7.5l-40 64c-3.1 4.9-3.2 11.1-.4 16.2s8.2 8.2 14 8.2h48 32 40 72c6 0 11.4-3.3 14.2-8.6s2.4-11.6-1-16.5l-72-104z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <TextArea
        name={"description" + itemIndex}
        className="w-full h-full flex-1"
        placeholder="Image description"
        defaultValue={image.description}
        onBlur={onDescriptionBlur}
      />
      <Button className="btn-alert" type="button" onClick={onDeleteImageGroup}>
        Delete this group
      </Button>
      <input
        multiple={true}
        ref={inputRef}
        id="image-input"
        type="file"
        className="hidden"
        accept={".jpg,.jpeg,.png,.avif,.webp"}
        onChange={(event) => {
          const files = event.target.files!;
          let objectUrls: {
            image: string;
            file: File | null;
            priority: string;
            label: string;
          }[] = [];

          for (let i = 0; i < files.length; i++) {
            objectUrls.push({
              image: URL.createObjectURL(files[i]),
              file: files[i],
              priority: "1",
              label: "",
            });
          }
          onAddNewImages(objectUrls);
        }}
      />
    </div>
  );
};

export default ImageItemInput;
