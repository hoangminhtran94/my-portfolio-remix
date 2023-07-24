import ProjectIcon from "../UI/ProjectIcon/ProjectIcon";
import { useRef, type FC } from "react";
import type { Technology, TechnologyGroup } from "~/utils/models/models";
import { useSpring, animated, config } from "react-spring";
interface SkillGroupProps {
  skillGroup: TechnologyGroup;
  once?: boolean;
}

const SkillGroup: FC<SkillGroupProps> = ({
  skillGroup,

  once = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const calc = (x: number, y: number) => [
    -(
      250 - Math.abs(y - (ref.current?.getBoundingClientRect().top as number))
    ) / 500,
    (250 -
      Math.abs(x - (ref.current?.getBoundingClientRect().left as number))) /
      500,
    1,
  ];
  const trans = (x: number, y: number, s: number) =>
    `perspective(1000px) rotateX(${x * 30}deg) rotateY(${
      y * 30
    }deg) scale(${s})`;
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { tension: 300, friction: 10 },
  }));

  return (
    <animated.div
      ref={ref}
      className="box-hover"
      onMouseMove={({ clientX: x, clientY: y }) => {
        set({ xys: calc(x, y) });
      }}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{
        transform: props.xys.to(trans),
      }}
    >
      <div id="box-hover-card" className={`!h-full`}>
        <div
          className={`w-full  overflow-scroll h-full     rounded-xl 
                      p-[24px] lg:p-[36px]  
                      z-[888] shadow-lg flex flex-col items-center gap-[50px]`}
        >
          <div className=" w-full gap-10">
            {skillGroup ? (
              <div className="w-[100%] flex flex-col gap-6">
                <h3 className="tracking-widest drop-shadow-white-around-sm">
                  {skillGroup.category.name}
                </h3>
                <div className="flex max-w-full flex-wrap  gap-5">
                  {skillGroup.technologies.map((tech: Technology) => (
                    <ProjectIcon key={tech.id} tech={tech} />
                  ))}
                </div>
              </div>
            ) : (
              <div>Not available</div>
            )}
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default SkillGroup;
