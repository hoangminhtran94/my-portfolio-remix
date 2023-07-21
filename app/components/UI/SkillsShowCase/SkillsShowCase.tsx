import { type FC } from "react";
import SkillsDetail from "../SkillsDetails/SkillsDetail";
import type { TechnologyGroup } from "~/utils/models/models";
import Header from "../Header/Header";
import InviewWrapper from "../InviewWrapper/InviewWrapper";

interface SkillShowCaseProps {
  skillsData: { frontends: TechnologyGroup[]; backends: TechnologyGroup[] };
}

const SkillShowCase: FC<SkillShowCaseProps> = ({ skillsData }) => {
  return (
    <InviewWrapper
      mode="fade"
      id="my-skills"
      className="flex text-white flex-col justify-center gap-10 snap-center min-h-screen"
    >
      <Header className="text-center">My skills</Header>
      <SkillsDetail
        header="Front-end technologies"
        skillGroups={skillsData?.frontends}
      />
      <SkillsDetail
        header="Back-end technologies"
        skillGroups={skillsData?.backends}
      />
    </InviewWrapper>
  );
};

export default SkillShowCase;
