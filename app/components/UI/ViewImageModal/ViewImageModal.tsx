import Modal from "../Modal/Modal";
import type { FC, MouseEventHandler } from "react";
const ViewImageModal: FC<{ image: string; onCancel: MouseEventHandler }> = ({
  image,
  onCancel,
}) => {
  return (
    <Modal onCancel={onCancel} modalClassName="w-fit h-3/4">
      <img
        className="w-full h-full object-contain"
        src={image}
        alt="detailImage"
      />
    </Modal>
  );
};
export default ViewImageModal;
