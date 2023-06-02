import React from "react";
import { useMatches, useNavigate } from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";
import TechnologyIcon from "~/components/UI/TechnologyIcon/TechnologyIcon";
const FrontEndShowCase: React.FC = () => {
  const navigate = useNavigate();
  const matches = useMatches();
  const data = matches[2].data;

  return (
    <div className="fixed w-[100vw] h-[100vh] top-0 right-0 flex justify-center items-center ">
      <div
        className="fixed w-[100vw] h-[100vh] top-0 right-0"
        onClick={() => {
          navigate("..");
        }}
      />
      <AnimatePresence mode="wait">
        <div
          className=" bg-skills border border-indigo-200 w-[80%] h-[60%] overflow-scroll  md:h-max 3xl:w-[40%]     rounded-xl 
        p-[24px] lg:p-[48px]  
        z-[888] shadow-lg  flex flex-col items-center gap-[16px]"
        >
          <h2>Front-end</h2>
          {data && data.frontends?.length > 0 ? (
            [...data.frontends]
              .sort((a, b) => a.priority - b.priority)
              .map((data: any, index: number) => (
                <motion.div
                  key={data.id}
                  initial={{ opacity: 0, translateX: -100 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 * data.priority }}
                  className="w-[100%] md:w-[80%] flex flex-col gap-6"
                >
                  <h3>{data.category.name}</h3>
                  <ul className="flex max-w-full flex-wrap  gap-10">
                    {data.technologies.map((tech: any) => (
                      <li key={tech.id}>
                        <TechnologyIcon
                          className="!w-[60px] !h-[60px]"
                          icon={tech.icon}
                        />
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))
          ) : (
            <div>Not available</div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default FrontEndShowCase;
