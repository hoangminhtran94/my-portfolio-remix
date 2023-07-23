import type { SocialMedia } from "@prisma/client";
import ClickableInfo from "./ClickableInfo";
import ContactBox from "./ContactBox";
import TechnologyIcon from "../UI/TechnologyIcon/TechnologyIcon";
import { useMatches } from "@remix-run/react";
import InviewWrapper from "../UI/InviewWrapper/InviewWrapper";
import SocialMediaIcon from "../UI/SocialMediaIcon/SocialMediaIcon";

const ContactBoxes = () => {
  const matches = useMatches();

  const rootUser = matches[0].data.rootUser;
  return (
    <InviewWrapper
      mode="left-right"
      className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-10"
    >
      <ContactBox
        shadow="drop-shadow-purple-around"
        label="Phone number"
        extendedBg="big-sur"
      >
        <ClickableInfo info={rootUser.contactNumber} />
      </ContactBox>
      <ContactBox
        shadow="drop-shadow-blue-around"
        extendedBg="indigo-violet"
        label="Email"
      >
        <div className="flex flex-col z-5 relative">
          <ClickableInfo info={rootUser.username} />
          <ClickableInfo info={rootUser.secondaryEmail} />
        </div>
      </ContactBox>

      <ContactBox
        shadow="drop-shadow-yellow-around"
        extendedBg="gradient-orange"
        label="Social Media"
      >
        <div className="flex flex-wrap gap-5 z-10">
          {rootUser.socialMedias.map((sm: SocialMedia) => (
            <SocialMediaIcon key={sm.id} socialMedia={sm} />
          ))}
        </div>
      </ContactBox>
    </InviewWrapper>
  );
};

export default ContactBoxes;
