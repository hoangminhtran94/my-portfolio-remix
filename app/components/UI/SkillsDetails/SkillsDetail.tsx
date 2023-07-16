import { AnimatePresence, motion } from "framer-motion";
import type { FC } from "react";
import { useRef, useEffect, useState } from "react";
import TechnologyIcon from "../TechnologyIcon/TechnologyIcon";
import type { TechnologyGroup } from "~/utils/models/models";
import { useInView } from "framer-motion";
interface SkillsDetailProps {
  skillGroups: TechnologyGroup[];
  header: string;
}

const SkillsDetail: FC<SkillsDetailProps> = ({ skillGroups, header }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const [height, setHeight] = useState<number | undefined>();
  useEffect(() => {
    const resizeListener = () => {
      setHeight(ref.current?.offsetHeight);
    };
    window.addEventListener("resize", resizeListener);
    resizeListener();
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);
  return (
    <div ref={ref} style={{ height }} className="box-hover noselect">
      <div className="box-hover-canvas">
        <div className="tracker tr-1"></div>
        <div className="tracker tr-2"></div>
        <div className="tracker tr-3"></div>
        <div className="tracker tr-4"></div>
        <div className="tracker tr-5"></div>
        <div className="tracker tr-6"></div>
        <div className="tracker tr-7"></div>
        <div className="tracker tr-8"></div>
        <div className="tracker tr-9"></div>
        <div className="tracker tr-10"></div>
        <div className="tracker tr-11"></div>
        <div className="tracker tr-12"></div>
        <div className="tracker tr-13"></div>
        <div className="tracker tr-14"></div>
        <div className="tracker tr-15"></div>
        <div className="tracker tr-16"></div>
        <div className="tracker tr-17"></div>
        <div className="tracker tr-18"></div>
        <div className="tracker tr-19"></div>
        <div className="tracker tr-20"></div>
        <div className="tracker tr-21"></div>
        <div className="tracker tr-22"></div>
        <div className="tracker tr-23"></div>
        <div className="tracker tr-24"></div>
        <div className="tracker tr-25"></div>
        <div ref={ref} id="box-hover-card">
          <div
            className="border border-blue-800 w-full min-h-full overflow-scroll      rounded-xl 
    p-[24px] lg:p-[48px]  
    z-[888] shadow-lg flex flex-col items-center gap-[16px]"
          >
            <h2>{header}</h2>
            {skillGroups && skillGroups.length > 0 ? (
              skillGroups.map((data: any, index: number) => (
                <div
                  key={data.id}
                  style={{
                    transform: isInView ? "none" : "translateX(-200px)",
                    opacity: isInView ? 1 : 0,
                    transition:
                      "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                  }}
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
                </div>
              ))
            ) : (
              <div>Not available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsDetail;
