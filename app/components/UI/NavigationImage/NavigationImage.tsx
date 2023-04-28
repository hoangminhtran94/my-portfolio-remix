import type { FC, PointerEventHandler } from "react";

const NavigationImage: FC<{
  containerClassName?: string;
  image: string;
  containerStyle?: { [key: string]: any };
  selected: boolean;
  className?: string;
  onClick?: PointerEventHandler<HTMLImageElement>;
}> = ({
  image,
  selected,
  onClick,
  className = "",
  containerClassName = "",
  containerStyle,
}) => {
  return (
    <div
      style={containerStyle}
      className={`w-[40px] md:w-[80px] h-[60px]  md:h-[100px] cursor-pointer ${containerClassName}`}
    >
      <img
        src={image}
        onClick={onClick}
        className={`border-[3px] border-white rounded-md w-full h-full object-cover ${
          selected
            ? "backdrop-filter-none scale-[1.3] shadow-white drop-shadow-xl drop"
            : "opacity-70 hover:opacity-70 hover:scale-[1.1]"
        } ${className}`}
        alt="navigationImage"
      />
    </div>
  );
};

export default NavigationImage;
