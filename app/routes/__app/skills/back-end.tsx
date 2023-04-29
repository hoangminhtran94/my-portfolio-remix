import React from "react";
import { useNavigate } from "@remix-run/react";
import * as Icons from "~/utils/icons/Backend";
import { AnimatePresence, motion } from "framer-motion";

const BackEndShowCase: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed w-[100vw] h-[100vh] top-0 right-0 flex justify-center items-center">
      <div
        className="fixed w-[100vw] h-[100vh] top-0 right-0"
        onClick={() => {
          navigate("..");
        }}
      />
      <div
        className=" bg-modal w-[80%] h-[60%] overflow-scroll  md:h-max 3xl:w-[40%]     rounded-xl 
        p-[24px] lg:p-[48px]  
        z-[888] shadow-lg  flex flex-col items-center gap-[16px]"
      >
        <h2>Backend skills</h2>
        <AnimatePresence>
          <motion.div
            key="backend-programming-languages"
            initial={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-[100%] md:w-[80%] flex flex-col gap-6"
          >
            <h3>Programming language</h3>
            <ul className="flex max-w-full flex-wrap  gap-10">
              <li>{Icons.JavaScript}</li>
              <li>{Icons.TypeScript}</li>
              <li>{Icons.Java}</li>
              <li>{Icons.Python}</li>
              <li>{Icons.PHP}</li>
            </ul>
          </motion.div>
          <motion.div
            key="backend-programming-frameworks"
            initial={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="w-[100%] md:w-[80%] flex flex-col gap-6"
          >
            <h3>Framwork</h3>
            <ul className="flex max-w-full flex-wrap  gap-10">
              <li>{Icons.NodeJs}</li>
              <li>{Icons.ExpressJs}</li>
              <li>{Icons.Deno}</li>
            </ul>
          </motion.div>
          <motion.div
            key="backend-services"
            initial={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="w-[100%] md:w-[80%] flex flex-col gap-6"
          >
            <h3>Service</h3>
            <ul className="flex flex-wrap  gap-10">
              <li>{Icons.FireBase}</li>
              <li>{Icons.AWS}</li>
              <li>{Icons.MongoDb}</li>
              <li>{Icons.Netlify}</li>
              <li>{Icons.Vercel}</li>
              <li>{Icons.PostgreSQL}</li>
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BackEndShowCase;
