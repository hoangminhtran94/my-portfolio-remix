import type { FC, MouseEventHandler } from "react";

interface SkillBoxProps {
  label?: string;
  onClick: MouseEventHandler;
}
const SkillBox: FC<SkillBoxProps> = ({ label, onClick }) => {
  return (
    <div className="card flex-1 h-[500px]" onClick={onClick}>
      <div className="imgbox">
        <div className="img"></div>
      </div>
      <div className="details">
        <h2 className="title">John Doe</h2>
        <span className="caption">Developer</span>
      </div>
    </div>
  );
};
export default SkillBox;
