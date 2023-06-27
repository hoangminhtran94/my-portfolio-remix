import { AnimatePresence, motion } from "framer-motion";
import type { FC } from "react";
import TechnologyIcon from "../TechnologyIcon/TechnologyIcon";
import type { TechnologyGroup } from "~/utils/models/models";

interface SkillsDetailProps {
  skillGroups: TechnologyGroup[];
}

const SkillsDetail: FC<SkillsDetailProps> = ({ skillGroups }) => {
  return (
    <AnimatePresence mode="wait">
      <div
        className=" bg-skills border border-indigo-200 w-full h-fit overflow-scroll      rounded-xl 
    p-[24px] lg:p-[48px]  
    z-[888] shadow-lg  flex flex-col items-center gap-[16px]"
      >
        <h2>Front-end</h2>
        {skillGroups && skillGroups.length > 0 ? (
          [...skillGroups]
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
  );
};

export default SkillsDetail;
