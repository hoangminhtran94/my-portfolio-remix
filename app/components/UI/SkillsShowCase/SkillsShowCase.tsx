import type { FC } from "react";
import { useState } from "react";
import SkillBox from "../SkillsBox/SkillsBox";
import SkillsDetail from "../SkillsDetails/SkillsDetail";
import type { TechnologyGroup } from "~/utils/models/models";

interface SkillShowCaseProps {
  skillsData: { frontends: TechnologyGroup[]; backends: TechnologyGroup[] };
}

const SkillShowCase: FC<SkillShowCaseProps> = ({ skillsData }) => {
  const [currentDisplaySkills, setCurrentDisplaySkills] = useState<
    string | null
  >(null);
  return (
    <div className="flex min-h-[1000px] flex-col  md:flex-row  md:items-center flex-1    gap-14  2xl:gap-[100px] snap-center">
      {!currentDisplaySkills ? (
        <>
          <SkillBox
            onClick={() => {
              setCurrentDisplaySkills("frontend");
            }}
          />
          <SkillBox
            onClick={() => {
              setCurrentDisplaySkills("backend");
            }}
          />
        </>
      ) : (
        <SkillsDetail
          skillGroups={
            currentDisplaySkills === "frontend"
              ? skillsData.frontends
              : skillsData.backends
          }
        />
      )}
    </div>
  );
};

export default SkillShowCase;
