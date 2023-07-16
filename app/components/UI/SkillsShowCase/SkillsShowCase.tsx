import type { FC } from "react";
import SkillsDetail from "../SkillsDetails/SkillsDetail";
import type { TechnologyGroup } from "~/utils/models/models";

interface SkillShowCaseProps {
  skillsData: { frontends: TechnologyGroup[]; backends: TechnologyGroup[] };
}

const SkillShowCase: FC<SkillShowCaseProps> = ({ skillsData }) => {
  return (
    <div className="flex text-white flex-col gap-14 snap-center">
      <h1>My skills</h1>
      <SkillsDetail header="Frontend" skillGroups={skillsData?.frontends} />
      <SkillsDetail header="Backend" skillGroups={skillsData?.backends} />
    </div>
  );
};

export default SkillShowCase;
