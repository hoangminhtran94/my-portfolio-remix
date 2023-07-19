import ProjectIcon from "../ProjectIcon/ProjectIcon";
import type { FC } from "react";
import { useRef, useEffect, useState } from "react";
import type { Technology, TechnologyGroup } from "~/utils/models/models";
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
  const [tr1Hover, setTr1Hover] = useState(false);
  const [tr2Hover, setTr2Hover] = useState(false);
  const [tr3Hover, setTr3Hover] = useState(false);
  const [tr4Hover, setTr4Hover] = useState(false);
  const [tr5Hover, setTr5Hover] = useState(false);
  const [tr6Hover, setTr6Hover] = useState(false);
  const [tr7Hover, setTr7Hover] = useState(false);
  const [tr8Hover, setTr8Hover] = useState(false);
  const [tr9Hover, setTr9Hover] = useState(false);
  const [tr10Hover, setTr10Hover] = useState(false);
  const [tr11Hover, setTr11Hover] = useState(false);
  const [tr12Hover, setTr12Hover] = useState(false);
  const [tr13Hover, setTr13Hover] = useState(false);
  const [tr14Hover, setTr14Hover] = useState(false);
  const [tr15Hover, setTr15Hover] = useState(false);
  const [tr16Hover, setTr16Hover] = useState(false);
  const [tr17Hover, setTr17Hover] = useState(false);
  const [tr18Hover, setTr18Hover] = useState(false);
  const [tr19Hover, setTr19Hover] = useState(false);
  const [tr20Hover, setTr20Hover] = useState(false);
  const [tr21Hover, setTr21Hover] = useState(false);
  const [tr22Hover, setTr22Hover] = useState(false);
  const [tr23Hover, setTr23Hover] = useState(false);
  const [tr24Hover, setTr24Hover] = useState(false);
  const [tr25Hover, setTr25Hover] = useState(false);
  const hoverClassName = [
    { condition: tr1Hover, className: "box-hover-card-tr-1" },
    { condition: tr2Hover, className: "box-hover-card-tr-2" },
    { condition: tr3Hover, className: "box-hover-card-tr-3" },
    { condition: tr4Hover, className: "box-hover-card-tr-4" },
    { condition: tr5Hover, className: "box-hover-card-tr-5" },
    { condition: tr6Hover, className: "box-hover-card-tr-6" },
    { condition: tr7Hover, className: "box-hover-card-tr-7" },
    { condition: tr8Hover, className: "box-hover-card-tr-8" },
    { condition: tr9Hover, className: "box-hover-card-tr-9" },
    { condition: tr10Hover, className: "box-hover-card-tr-10" },
    { condition: tr11Hover, className: "box-hover-card-tr-11" },
    { condition: tr12Hover, className: "box-hover-card-tr-12" },
    { condition: tr13Hover, className: "box-hover-card-tr-13" },
    { condition: tr14Hover, className: "box-hover-card-tr-14" },
    { condition: tr15Hover, className: "box-hover-card-tr-15" },
    { condition: tr16Hover, className: "box-hover-card-tr-16" },
    { condition: tr17Hover, className: "box-hover-card-tr-17" },
    { condition: tr18Hover, className: "box-hover-card-tr-18" },
    { condition: tr19Hover, className: "box-hover-card-tr-19" },
    { condition: tr20Hover, className: "box-hover-card-tr-20" },
    { condition: tr21Hover, className: "box-hover-card-tr-21" },
    { condition: tr22Hover, className: "box-hover-card-tr-22" },
    { condition: tr23Hover, className: "box-hover-card-tr-23" },
    { condition: tr24Hover, className: "box-hover-card-tr-24" },
    { condition: tr25Hover, className: "box-hover-card-tr-25" },
  ].find((item) => item.condition)?.className;

  return (
    <div
      style={{
        transform: isInView ? "none" : "translateX(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
      className="box-hover noselect !w-[40vw] mx-auto"
    >
      <div className="box-hover-canvas">
        <div
          onMouseEnter={() => {
            setTr1Hover(true);
          }}
          onMouseLeave={() => {
            setTr1Hover(false);
          }}
          className="tracker tr-1"
        ></div>
        <div
          onMouseEnter={() => {
            setTr2Hover(true);
          }}
          onMouseLeave={() => {
            setTr2Hover(false);
          }}
          className="tracker tr-2"
        ></div>
        <div
          onMouseEnter={() => {
            setTr3Hover(true);
          }}
          onMouseLeave={() => {
            setTr3Hover(false);
          }}
          className="tracker tr-3"
        ></div>
        <div
          onMouseEnter={() => {
            setTr4Hover(true);
          }}
          onMouseLeave={() => {
            setTr4Hover(false);
          }}
          className="tracker tr-4"
        ></div>
        <div
          onMouseEnter={() => {
            setTr5Hover(true);
          }}
          onMouseLeave={() => {
            setTr5Hover(false);
          }}
          className="tracker tr-5"
        ></div>
        <div
          onMouseEnter={() => {
            setTr6Hover(true);
          }}
          onMouseLeave={() => {
            setTr6Hover(false);
          }}
          className="tracker tr-6"
        ></div>
        <div
          onMouseEnter={() => {
            setTr7Hover(true);
          }}
          onMouseLeave={() => {
            setTr7Hover(false);
          }}
          className="tracker tr-7"
        ></div>
        <div
          onMouseEnter={() => {
            setTr8Hover(true);
          }}
          onMouseLeave={() => {
            setTr8Hover(false);
          }}
          className="tracker tr-8"
        ></div>
        <div
          onMouseEnter={() => {
            setTr9Hover(true);
          }}
          onMouseLeave={() => {
            setTr9Hover(false);
          }}
          className="tracker tr-9"
        ></div>
        <div
          onMouseEnter={() => {
            setTr10Hover(true);
          }}
          onMouseLeave={() => {
            setTr10Hover(false);
          }}
          className="tracker tr-10"
        ></div>
        <div
          onMouseEnter={() => {
            setTr11Hover(true);
          }}
          onMouseLeave={() => {
            setTr11Hover(false);
          }}
          className="tracker tr-11"
        ></div>
        <div
          onMouseEnter={() => {
            setTr12Hover(true);
          }}
          onMouseLeave={() => {
            setTr12Hover(false);
          }}
          className="tracker tr-12"
        ></div>
        <div
          onMouseEnter={() => {
            setTr13Hover(true);
          }}
          onMouseLeave={() => {
            setTr13Hover(false);
          }}
          className="tracker tr-13"
        ></div>
        <div
          onMouseEnter={() => {
            setTr14Hover(true);
          }}
          onMouseLeave={() => {
            setTr14Hover(false);
          }}
          className="tracker tr-14"
        ></div>
        <div
          onMouseEnter={() => {
            setTr15Hover(true);
          }}
          onMouseLeave={() => {
            setTr15Hover(false);
          }}
          className="tracker tr-15"
        ></div>
        <div
          onMouseEnter={() => {
            setTr16Hover(true);
          }}
          onMouseLeave={() => {
            setTr16Hover(false);
          }}
          className="tracker tr-16"
        ></div>
        <div
          onMouseEnter={() => {
            setTr17Hover(true);
          }}
          onMouseLeave={() => {
            setTr17Hover(false);
          }}
          className="tracker tr-17"
        ></div>
        <div
          onMouseEnter={() => {
            setTr18Hover(true);
          }}
          onMouseLeave={() => {
            setTr18Hover(false);
          }}
          className="tracker tr-18"
        ></div>
        <div
          onMouseEnter={() => {
            setTr19Hover(true);
          }}
          onMouseLeave={() => {
            setTr19Hover(false);
          }}
          className="tracker tr-19"
        ></div>
        <div
          onMouseEnter={() => {
            setTr20Hover(true);
          }}
          onMouseLeave={() => {
            setTr20Hover(false);
          }}
          className="tracker tr-20"
        ></div>
        <div
          onMouseEnter={() => {
            setTr21Hover(true);
          }}
          onMouseLeave={() => {
            setTr21Hover(false);
          }}
          className="tracker tr-21"
        ></div>
        <div
          onMouseEnter={() => {
            setTr22Hover(true);
          }}
          onMouseLeave={() => {
            setTr22Hover(false);
          }}
          className="tracker tr-22"
        ></div>
        <div
          onMouseEnter={() => {
            setTr23Hover(true);
          }}
          onMouseLeave={() => {
            setTr23Hover(false);
          }}
          className="tracker tr-23"
        ></div>
        <div
          onMouseEnter={() => {
            setTr24Hover(true);
          }}
          onMouseLeave={() => {
            setTr24Hover(false);
          }}
          className="tracker tr-24"
        ></div>
        <div
          onMouseEnter={() => {
            setTr25Hover(true);
          }}
          onMouseLeave={() => {
            setTr25Hover(false);
          }}
          className="tracker tr-25"
        ></div>
      </div>
      <div id="box-hover-card" className={`h-max ${hoverClassName}`}>
        <div
          ref={ref}
          className={`w-full h-fit overflow-scroll      rounded-xl 
                      p-[24px] lg:p-[48px]  
                      z-[888] shadow-lg flex flex-col items-center gap-[30px]`}
        >
          <h2 className="tracking-widest">{header}</h2>
          {skillGroups && skillGroups.length > 0 ? (
            skillGroups.map((data: any, index: number) => (
              <div
                key={data.id}
                className="w-[100%] md:w-[80%] flex flex-col gap-6"
              >
                <h3 className="tracking-widest">{data.category.name}</h3>
                <ul className="flex max-w-full flex-wrap  gap-10">
                  {data.technologies.map((tech: Technology) => (
                    <ProjectIcon key={tech.id} tech={tech} />
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
  );
};

export default SkillsDetail;
