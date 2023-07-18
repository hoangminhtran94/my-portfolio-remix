import { motion } from "framer-motion";
import type { FC, MouseEventHandler, ComponentPropsWithoutRef } from "react";

interface ContactBoxProps {
  showContent: boolean;
  background: string;
  onClick: MouseEventHandler;
  label: string;
  extendedBg?: string;
  labelClassName?: string;
}

const ContactBox: FC<ContactBoxProps & ComponentPropsWithoutRef<"div">> = ({
  showContent = false,
  background,
  label,
  onClick,
  labelClassName,
  extendedBg = "frost",
  children,
}) => {
  return (
    <div className="ag-courses_item tracking-widest  ">
      <div className="ag-courses-item_link ">
        <div className={`ag-courses-item_bg ${extendedBg}`}></div>
        <h2 className=" relative z-5">{label}</h2>
        {children}
      </div>
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
