import ProjectIcon from "../ProjectIcon/ProjectIcon";
import type { FC } from "react";
import { useRef, useEffect, useState } from "react";
import type { Technology, TechnologyGroup } from "~/utils/models/models";
import SkillGroup from "~/components/SkillsPage/SkillGroup";
import { useInView } from "framer-motion";
interface SkillsDetailProps {
  skillGroups: TechnologyGroup[];
  header: string;
  once?: boolean;
}

const SkillsDetail: FC<SkillsDetailProps> = ({
  skillGroups,
  header,
  once = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once });

  return (
    <div
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateX(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
      className={`w-full h-fit   rounded-xl 
                      z-[888]  flex flex-col items-center gap-[50px]`}
    >
      <h2 className="tracking-widest">{header}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 w-full gap-10">
        {skillGroups && skillGroups.length > 0 ? (
          skillGroups.map((data: TechnologyGroup, index: number) => (
            <SkillGroup key={data.id} skillGroup={data} />
          ))
        ) : (
          <div>Not available</div>
        )}
      </div>
    </div>
  );
};

export default SkillsDetail;
