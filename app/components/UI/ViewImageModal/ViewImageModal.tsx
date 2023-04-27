import Modal from "../Modal/Modal";
import type { FC, MouseEventHandler } from "react";
const ViewImageModal: FC<{
  image: string;
  onCancel: MouseEventHandler;
  toggle: boolean;
}> = ({ image, onCancel, toggle }) => {
  return (
    <Modal
      onCancel={onCancel}
      modalClassName="w-fit h-3/4 relative"
      toggle={toggle}
    >
      <div className="absolute top-[-5%] w-full flex justify-center">
        <span
          onClick={onCancel}
          className="text-slate-500 drop-shadow-md  text-lg cursor-pointer hover:scale-110 transition-all"
        >
          Go back
        </span>
      </div>
      <img
        className=" pointer-events-none w-full h-full object-contain rounded-md  drop-shadow-xl "
        src={image}
        alt="detailImage"
      />
    </Modal>
  );
};
export default ViewImageModal;