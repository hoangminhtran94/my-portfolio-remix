import { createPortal } from "react-dom";
import type { FC, ComponentPropsWithoutRef, MouseEventHandler } from "react";
import { motion } from "framer-motion";

const Modal: FC<
  ComponentPropsWithoutRef<"div"> & {
    modalClassName?: string;
    onCancel?: MouseEventHandler;
    toggle: boolean;
  }
> = ({ children, modalClassName, onCancel, toggle }) => {
  return (
    <>
      {toggle &&
        createPortal(
          <div className="z-50 fixed top-0 left-0 w-screen h-screen flex justify-center items-center ">
            <span
              onClick={onCancel}
              className="fixed right-[50px]   top-[50px] z-50   text-lg cursor-pointer hover:scale-110 transition-all"
            >
              X
            </span>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className=" absolute top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.8)]"
              onClick={onCancel}
            />
            <motion.div
              initial={{ opacity: 0.5, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`rounded-md bg-white z-10 ${modalClassName}`}
            >
              {children}
            </motion.div>
          </div>,
          document.getElementById("modal-hook")!
        )}
    </>
  );
};

export default Modal;
