import { createPortal } from "react-dom";
import type { FC, ComponentPropsWithoutRef, MouseEventHandler } from "react";

const Modal: FC<
  ComponentPropsWithoutRef<"div"> & {
    modalClassName?: string;
    onCancel?: MouseEventHandler;
  }
> = ({ children, modalClassName, onCancel }) => {
  return createPortal(
    <div className="z-50 fixed top-0 left-0 w-screen h-screen flex justify-center items-center ">
      <div
        className=" absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.1)]"
        onClick={onCancel}
      />
      <div className={`rounded-md bg-white z-10 ${modalClassName}`}>
        {children}
      </div>
    </div>,
    document.getElementById("modal-hook")!
  );
};

export default Modal;
