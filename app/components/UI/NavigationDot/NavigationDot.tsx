import type { FC, PointerEventHandler } from "react";
const NavigtionDot: FC<{
  selected: boolean;
  onClick: PointerEventHandler<HTMLSpanElement>;
}> = ({ selected = false, onClick }) => {
  return (
    <span
      onClick={onClick}
      className={`cursor-pointer rounded-full w-4 h-4  border  ${
        selected ? "bg-slate-400 border-slate-400" : "bg-white border-slate-200"
      }`}
    />
  );
};

export default NavigtionDot;
