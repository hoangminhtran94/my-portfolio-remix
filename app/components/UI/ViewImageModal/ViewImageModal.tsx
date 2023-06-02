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
      modalClassName="w-fit max-w-[90vw] !h-screen sm:!h-[90%] !bg-transparent relative"
      toggle={toggle}
    >
      <img
        className=" pointer-events-none w-full h-full object-contain rounded-md  drop-shadow-xl "
        src={image}
        alt="detailImage"
      />
    </Modal>
  );
};
export default ViewImageModal;
