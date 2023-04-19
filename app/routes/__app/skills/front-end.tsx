import React from "react";
import { useNavigate } from "@remix-run/react";
import * as Icons from "~/utils/icons/Frontend";
import { motion, AnimatePresence } from "framer-motion";

const FrontEndShowCase: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed w-[100vw] h-[100vh] top-0 right-0 flex justify-center items-center ">
      <div
        className="fixed w-[100vw] h-[100vh] top-0 right-0"
        onClick={() => {
          navigate("..");
        }}
      />
      <AnimatePresence mode="wait">
        <div className=" bg-modal w-[40%] h-[50%]  rounded-xl p-[48px]  z-[888] shadow-lg  flex flex-col items-center gap-[16px]">
          <h2>Front-end</h2>
          <motion.div
            key="frontend-programming-languages"
            initial={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-[80%] flex flex-col gap-6"
          >
            <h3>Programming language</h3>
            <ul className="flex max-w-full flex-wrap  gap-10">
              <li>{Icons.JavaScript}</li>
              <li>{Icons.TypeScript}</li>
              <li>{Icons.Java}</li>
              <li>{Icons.HTML}</li>
              <li>{Icons.CSS}</li>
            </ul>
          </motion.div>
          <motion.div
            key="frontend-programming-frameworks"
            initial={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="w-[80%] flex flex-col gap-6"
          >
            <h3>Frameworks</h3>
            <ul className="flex  flex-wrap  gap-10">
              <li>{Icons.React}</li>
              <li>{Icons.Angular}</li>
              <li>{Icons.Remix}</li>
              <li>{Icons.NextJs}</li>
              <li>{Icons.Svelte}</li>
              <li>{Icons.ReactNative}</li>
              <li>{Icons.VueJs}</li>
              <li>{Icons.Laravel}</li>
            </ul>
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default FrontEndShowCase;
