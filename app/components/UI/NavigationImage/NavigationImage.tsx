import type { FC, PointerEventHandler } from "react";

const NavigationImage: FC<{
  image: string;
  selected: boolean;
  onClick?: PointerEventHandler<HTMLImageElement>;
}> = ({ image, selected, onClick }) => {
  return (
    <div className=" w-[40px] h-[60px] md:w-[80px] md:h-[100px] cursor-pointer">
      <img
        src={image}
        onClick={onClick}
        className={` border-[3px] border-white rounded-md w-full h-full object-cover ${
          selected
            ? "backdrop-filter-none scale-[1.3] shadow-white drop-shadow-xl drop"
            : "opacity-70 hover:opacity-70 hover:scale-[1.1]"
        }`}
        alt="navigationImage"
      />
    </div>
  );
};

export default NavigationImage;
