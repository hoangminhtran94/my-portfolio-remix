import { motion } from "framer-motion";
import type { FC, MouseEventHandler, ComponentPropsWithoutRef } from "react";

interface ContactBoxProps {
  showContent: boolean;
  background: string;
  onClick: MouseEventHandler;
  label: string;
  labelClassName?: string;
}

const ContactBox: FC<ContactBoxProps & ComponentPropsWithoutRef<"div">> = ({
  showContent = false,
  background,
  label,
  onClick,
  labelClassName,
  children,
}) => {
  return (
    <div className="w-full h-full rounded-lg bg-indigo-500 hover:scale-105 transition-all  p-10 flex flex-col">
      {children}
    </div>
  );
};

export default ContactBox;

{
  /* <motion.div
      animate={{
        rotateY: showContent ? 180 : 0,
      }}
      transition={{ type: "spring", damping: 10, stiffness: 100 }}
      className={` relative   flex-1 flex flex-col px-3 items-center justify-center gap-2 border h-full  border-indigo-200`}
    >
      <div
        className={` cursor-pointer absolute w-full h-full    ${
          !showContent ? background : ""
        }  `}
        onClick={onClick}
      />
      {showContent ? (
        <motion.div
          className="flex flex-col items-center text-xl gap-2"
          animate={{ rotateY: 180 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
        >
          {children}
        </motion.div>
      ) : (
        <span
          onClick={onClick}
          className={`cursor-pointer z-10 text-4xl ${labelClassName}`}
        >
          {label}
        </span>
      )}
    </motion.div> */
}
