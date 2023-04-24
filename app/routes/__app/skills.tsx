import { useOutlet } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "@remix-run/react";

const MySkillsLayout = () => {
  const navigate = useNavigate();
  const outlet = useOutlet();
  const { pathname } = useLocation();
  const frontEnd = {
    hidden: { x: -100, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      y: 100,
      opacity: 0,

      transition: { duration: 0.5 },
    },
  };
  const backend = {
    hidden: { x: 100, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      y: -100,
      opacity: 0,

      transition: { duration: 0.5 },
    },
  };
  return (
    <div className="flex w-[1000px] mx-auto gap-[100px]">
      <div
        className="relative flex-1 h-[600px] border border-slate-100 rounded-lg overflow-hidden shadow-lg  flex justify-center items-center cursor-pointer gap-[16px] transition-all hover:scale-[1.1] hover:z-10"
        onClick={() => {
          navigate("front-end");
        }}
      >
        <div className=" absolute top-0 right-0 w-full h-full frontend-bg  " />
        <span className="z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={64}
            height={64}
            viewBox="0 0 64 64"
          >
            <g data-name="Web development" fill="#6d6c6c">
              <path
                d="M44 63H20a1 1 0 0 1 0-2h24a1 1 0 0 1 0 2zm9-60H11a1 1 0 0 0-1 1v7h44V4a1 1 0 0 0-1-1zM31 8H14a1 1 0 0 1 0-2h17a1 1 0 0 1 0 2zm6 1a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm6 0a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm6 0a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm-39 4v20a1 1 0 0 0 1 1h42a1 1 0 0 0 1-1V13zm5.83 13.45a1 1 0 0 1-.28 1.38.94.94 0 0 1-.55.17 1 1 0 0 1-.83-.45l-2-3a1 1 0 0 1 0-1.1l2-3a1 1 0 0 1 1.66 1.1L14.2 24zM21 20.38l-2 7.74a1 1 0 0 1-1 .75 1.07 1.07 0 0 1-.25 0 1 1 0 0 1-.75-1.25l2-7.74a1 1 0 0 1 1.94.5zm4.86 4.17-2 3A1 1 0 0 1 23 28a.94.94 0 0 1-.55-.17 1 1 0 0 1-.28-1.38L23.8 24l-1.63-2.45a1 1 0 1 1 1.66-1.1l2 3a1 1 0 0 1 0 1.1zM52 29a3 3 0 0 1-3 3H32a3 3 0 0 1-3-3V19a3 3 0 0 1 3-3h17a3 3 0 0 1 3 3z"
                fill="#6d6c6c"
              />
              <path
                d="M59 12v27H5V12a4.94 4.94 0 0 1 3-4.56V33a3 3 0 0 0 3 3h42a3 3 0 0 0 3-3V7.44A4.94 4.94 0 0 1 59 12ZM40.89 61H23.11l3.43-10h10.92l3.43 10z"
                fill="#6d6c6c"
              />
              <path
                d="M5 41v3a5 5 0 0 0 5 5h44a5 5 0 0 0 5-5v-3zm28 5h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2zm5.13-16h-5.72L35 27.44a1 1 0 0 1 .81-.3 1 1 0 0 1 .73.45zm10.64 0h-8.24l-1.28-1.93 3-3.64a1 1 0 0 1 .76-.36.85.85 0 0 1 .75.34z"
                fill="#6d6c6c"
              />
              <path
                d="M49 18H32a1 1 0 0 0-1 1v9.59L33.56 26a3 3 0 0 1 4.51.33l2.67-3.2A3 3 0 0 1 43 22.07a3 3 0 0 1 2.24 1l4.76 5.3V19a1 1 0 0 0-1-1Zm-13 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2Z"
                fill="#6d6c6c"
              />
            </g>
          </svg>
        </span>
        <h2 className="gradient-dark z-10">Front-end</h2>
      </div>
      <div
        className="relative flex-1 h-[600px] border border-slate-100 rounded-lg overflow-hidden shadow-lg  flex justify-center items-center cursor-pointer gap-[16px] transition-all hover:scale-[1.1] hover:z-10"
        onClick={() => {
          navigate("back-end");
        }}
      >
        <div className=" absolute top-0 right-0 w-full h-full backend-bg  shadow-lg rounded-lg " />
        <span className="z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={64}
            height={64}
            viewBox="0 0 48 48"
          >
            <g data-name="Layer 2">
              <path
                fill="#6d6c6c"
                d="M42,42H8a1,1,0,0,1-1-1V7A1,1,0,0,1,8,6H42a1,1,0,0,1,1,1V41A1,1,0,0,1,42,42ZM9,40H41V8H9Z"
              />
              <circle cx="12" cy="11" r="1" fill="#6d6c6c" />
              <circle cx="16" cy="11" r="1" fill="#6d6c6c" />
              <circle cx="20" cy="11" r="1" fill="#6d6c6c" />
              <path
                fill="#6d6c6c"
                d="M22 16H8a1 1 0 0 1 0-2H21.59l3.7-3.71A1 1 0 0 1 26 10H42a1 1 0 0 1 0 2H26.41l-3.7 3.71A1 1 0 0 1 22 16zM19.27 25h-.54A2.74 2.74 0 0 1 16 22.27V19a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3.27A2.74 2.74 0 0 1 19.27 25zM18 20v2.27a.73.73 0 0 0 .73.73h.54a.73.73 0 0 0 .73-.73V20zM22 34H16a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2z"
              />
              <path
                fill="#6d6c6c"
                d="M23,42H15a1,1,0,0,1-1-1V37a1,1,0,0,1,1-1,1,1,0,0,0,1-1V33a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v2a.93.93,0,0,0,.29.69A1,1,0,0,0,23,36a1,1,0,0,1,1,1v4A1,1,0,0,1,23,42Zm-7-2h6V37.83A3,3,0,0,1,20,35V34H18v1a3,3,0,0,1-2,2.83Z"
              />
              <path
                fill="#6d6c6c"
                d="M19 34a1 1 0 0 1-1-1V24a1 1 0 0 1 2 0v9A1 1 0 0 1 19 34zM33 18.8a6.54 6.54 0 0 0-.59-.3 1 1 0 0 0-1.41.91v4l-1 .5-1-.5v-4a1 1 0 0 0-1.41-.91A6 6 0 0 0 27 29.19V41a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V29.19A6 6 0 0 0 33 18.8zm0 7.84a4 4 0 0 1-1.4 1 1 1 0 0 0-.6.92V40H29V28.58a1 1 0 0 0-.6-.92 4 4 0 0 1-1.4-6.3V24a1 1 0 0 0 .55.89l2 1a1 1 0 0 0 .9 0l2-1A1 1 0 0 0 33 24V21.36a4 4 0 0 1 0 5.28z"
              />
              <rect
                width="3"
                height="28"
                x="38"
                y="12"
                fill="#6d6c6c"
                opacity=".5"
              />
              <path
                fill="#6d6c6c"
                d="M38 37h0a0 0 0 0 1 0 0v3a0 0 0 0 1 0 0H35a0 0 0 0 1 0 0v0A3 3 0 0 1 38 37zM31 38h0a0 0 0 0 1 0 0v2a0 0 0 0 1 0 0H29a0 0 0 0 1 0 0v0A2 2 0 0 1 31 38zM20 38h0a0 0 0 0 1 0 0v2a0 0 0 0 1 0 0H18a0 0 0 0 1 0 0v0A2 2 0 0 1 20 38zM20 21h0a0 0 0 0 1 0 0v2a0 0 0 0 1 0 0H18a0 0 0 0 1 0 0v0A2 2 0 0 1 20 21zM41 10H34a2 2 0 0 0 2-2h5z"
                opacity=".5"
              />
              <rect
                width="2"
                height="5"
                x="20"
                y="35"
                fill="#6d6c6c"
                opacity=".5"
              />
            </g>
          </svg>
        </span>
        <h2 className="gradient-dark z-10 ">Back-end</h2>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          className={` fixed w-screen h-screen top-0 left-0 ${
            pathname === "/skills/front-end" || pathname === "/skills/back-end"
              ? "z-[889]"
              : " -z-10 "
          }`}
          key={pathname + "modal"}
          variants={pathname === "/skills/front-end" ? frontEnd : backend}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MySkillsLayout;
