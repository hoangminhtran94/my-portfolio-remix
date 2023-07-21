import type { SocialMedia } from "@prisma/client";
import ClickableInfo from "./ClickableInfo";
import ContactBox from "./ContactBox";
import TechnologyIcon from "../UI/TechnologyIcon/TechnologyIcon";
import { useMatches } from "@remix-run/react";
import InviewWrapper from "../UI/InviewWrapper/InviewWrapper";

const ContactBoxes = () => {
  const matches = useMatches();
  const rootUser = matches[0].data.rootUser;
  return (
    <InviewWrapper
      mode="left-right"
      className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-10"
    >
      <ContactBox label="Phone number" extendedBg="big-sur">
        <ClickableInfo info={rootUser.contactNumber} />
      </ContactBox>
      <ContactBox extendedBg="indigo-violet" label="Email">
        <div className="flex flex-col z-5 relative">
          <ClickableInfo info={rootUser.username} />
          <ClickableInfo info={rootUser.secondaryEmail} />
        </div>
      </ContactBox>

      <ContactBox extendedBg="gradient-orange" label="Social Media">
        <div className="flex flex-wrap gap-5">
          {rootUser.socialMedias.map((sm: SocialMedia) => (
            <span
              title={sm.name}
              key={sm.id}
              className="hover:scale-110 transition-all hover:animate-bouncing shadow-md p-3 bg-white rounded-full hover:bg-white cursor-pointer"
              onClick={() => {
                window.open(sm.link);
              }}
            >
              <TechnologyIcon
                className="!w-[30px] !h-[30px] xl:!w-[40px] xl:!h-[40px]"
                icon={sm.icon}
              />
            </span>
          ))}
        </div>
      </ContactBox>
    </InviewWrapper>
  );
};

export default ContactBoxes;
