import { useRef, type FC, useContext, useEffect } from "react";
import SkillsDetail from "../SkillsDetails/SkillsDetail";
import type { TechnologyGroup } from "~/utils/models/models";
import Header from "../Header/Header";
import { useInView } from "framer-motion";
import { PageContext } from "~/store/page-context";

interface SkillShowCaseProps {
  skillsData: { frontends: TechnologyGroup[]; backends: TechnologyGroup[] };
}

const SkillShowCase: FC<SkillShowCaseProps> = ({ skillsData }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const { onChangePage } = useContext(PageContext);
  useEffect(() => {
    if (isInView) {
      onChangePage("my-skills");
    }
  }, [isInView]);
  return (
    <div
      ref={ref}
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
    </div>
  );
};

export default SkillShowCase;
