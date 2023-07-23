import { useState } from "react";
import TechnologyIcon from "../TechnologyIcon/TechnologyIcon";
import type { SocialMedia } from "@prisma/client";

const SocialMediaIcon = ({ socialMedia }: { socialMedia: SocialMedia }) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <span
      title={socialMedia.name}
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
      style={
        isHovering
          ? {
              backgroundColor: socialMedia.bgColor!,
            }
          : {}
      }
      className="hover:scale-110 transition-all hover:animate-bouncing shadow-md p-3 rounded-full bg-white cursor-pointer"
      onClick={() => {
        window.open(socialMedia.link);
      }}
    >
      <TechnologyIcon
        className="!w-[30px] !h-[30px] xl:!w-[40px] xl:!h-[40px]"
        icon={socialMedia.icon}
      />
    </span>
  );
};
export default SocialMediaIcon;
