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
    <div className="box-container noselect">
      <div className="canvas">
        <div className="tracker tr-1"></div>
        <div className="tracker tr-2"></div>
        <div className="tracker tr-3"></div>
        <div className="tracker tr-4"></div>
        <div className="tracker tr-5"></div>
        <div className="tracker tr-6"></div>
        <div className="tracker tr-7"></div>
        <div className="tracker tr-8"></div>
        <div className="tracker tr-9"></div>
        <div className="tracker tr-10"></div>
        <div className="tracker tr-11"></div>
        <div className="tracker tr-12"></div>
        <div className="tracker tr-13"></div>
        <div className="tracker tr-14"></div>
        <div className="tracker tr-15"></div>
        <div className="tracker tr-16"></div>
        <div className="tracker tr-17"></div>
        <div className="tracker tr-18"></div>
        <div className="tracker tr-19"></div>
        <div className="tracker tr-20"></div>
        <div className="tracker tr-21"></div>
        <div className="tracker tr-22"></div>
        <div className="tracker tr-23"></div>
        <div className="tracker tr-24"></div>
        <div className="tracker tr-25"></div>
        <div id="card">
          <p id="prompt">HOVER OVER :D</p>
          <div className="title">
            look mom,
            <br />
            no JS
          </div>
        </div>
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
