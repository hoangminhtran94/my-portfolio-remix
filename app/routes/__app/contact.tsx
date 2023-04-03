import { useLocation } from "@remix-run/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const { pathname } = useLocation();
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [showLinkedln, setShowLinkedlin] = useState(false);
  return (
    <AnimatePresence>
      <div
        className="h-[900px] shadow-lg rounded-md grid grid-cols-4   bg-[rgb(255,255,255,0.5)]"
        key={pathname}
      >
        <motion.div
          onClick={() => {
            setShowPhone((prev) => !prev);
          }}
          animate={{
            rotateY: showPhone ? 180 : 0,
          }}
          className={`relative flex flex-col px-3 items-center justify-center gap-2 border h-full  border-slate-200`}
        >
          <div
            className={`absolute w-full h-full    ${
              !showPhone ? "phone-bg" : ""
            } `}
          />
          {showPhone ? (
            <motion.div
              className="flex flex-col items-center text-3xl gap-2"
              animate={{ rotateY: 180 }}
            >
              <span>Contact me now</span>
              <span>+1 (613)-805-9623</span>
            </motion.div>
          ) : (
            <span className=" z-10 text-4xl">Phone number</span>
          )}
        </motion.div>

        <motion.div
          onClick={() => {
            setShowEmail((prev) => !prev);
          }}
          animate={{
            rotateY: showEmail ? 180 : 0,
          }}
          className={`relative flex flex-col px-3 items-center justify-center gap-2 border h-full  border-slate-200`}
        >
          <div
            className={`absolute w-full h-full    ${
              !showEmail ? "email-bg" : ""
            } `}
          />
          {showEmail ? (
            <motion.div
              className="flex flex-col items-center text-2xl gap-2"
              animate={{ rotateY: 180 }}
            >
              <span>Email me now</span>
              <span>hoang.minhtran94@gmail.com</span>
              <span>tran0450@algonquinlive.com</span>
            </motion.div>
          ) : (
            <span className=" z-10 text-4xl">Email</span>
          )}
        </motion.div>

        <motion.div
          onClick={() => {
            setShowSocial((prev) => !prev);
          }}
          animate={{
            rotateY: showSocial ? 180 : 0,
          }}
          className={`relative flex flex-col px-3 items-center justify-center gap-2 border h-full  border-slate-200`}
        >
          <div
            className={`absolute w-full h-full    ${
              !showSocial ? "social-media-bg" : ""
            } `}
          />
          {showSocial ? (
            <motion.div
              className="flex flex-col items-center text-2xl gap-2"
              animate={{ rotateY: 180 }}
            >
              <span>Chat with me on</span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  window.open("https://www.facebook.com/minhhoang.tran.353/");
                }}
              >
                <svg
                  className="hover:scale-[1.1]"
                  width={40}
                  height={40}
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Ebene 1"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="#1877f2"
                    d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"
                  />
                  <path
                    fill="#fff"
                    d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"
                  />
                </svg>
              </span>
            </motion.div>
          ) : (
            <span className=" text-white z-10 text-4xl">Social Media</span>
          )}
        </motion.div>

        <motion.div
          onClick={() => {
            setShowLinkedlin((prev) => !prev);
          }}
          animate={{
            rotateY: showLinkedln ? 180 : 0,
          }}
          className={`relative flex flex-col px-3 items-center justify-center gap-2 border h-full  border-slate-200`}
        >
          <div
            className={`absolute w-full h-full    ${
              !showLinkedln ? "linkedin-bg" : ""
            } `}
          />
          {showLinkedln ? (
            <motion.div
              className="flex flex-col items-center text-2xl gap-2"
              animate={{ rotateY: 180 }}
            >
              <span>Connect with me on</span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  window.open("https://www.facebook.com/minhhoang.tran.353/");
                }}
              >
                <svg
                  className="hover:scale-[1.1]"
                  width={40}
                  height={40}
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="Ebene 1"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="#1877f2"
                    d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"
                  />
                  <path
                    fill="#fff"
                    d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"
                  />
                </svg>
              </span>
            </motion.div>
          ) : (
            <span className=" z-10 text-4xl">Linkedln</span>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default Contact;
