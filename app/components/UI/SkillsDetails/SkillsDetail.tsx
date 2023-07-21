import type { FC } from "react";

import type { TechnologyGroup } from "~/utils/models/models";
import SkillGroup from "~/components/SkillsPage/SkillGroup";

import InviewWrapper from "../InviewWrapper/InviewWrapper";

interface SkillsDetailProps {
  skillGroups: TechnologyGroup[];
  header: string;
}

const SkillsDetail: FC<SkillsDetailProps> = ({ skillGroups, header }) => {
  return (
    <InviewWrapper
      mode="left-right"
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
    </InviewWrapper>
  );
};

export default SkillsDetail;
