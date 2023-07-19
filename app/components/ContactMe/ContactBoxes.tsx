import type { SocialMedia } from "@prisma/client";
import ClickableInfo from "./ClickableInfo";
import ContactBox from "./ContactBox";
import TechnologyIcon from "../UI/TechnologyIcon/TechnologyIcon";
import { useMatches } from "@remix-run/react";
import { useRef } from "react";
import { useInView } from "framer-motion";

const ContactBoxes = () => {
  const matches = useMatches();
  const rootUser = matches[0].data.rootUser;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  return (
    <div
      style={{
        transform: isInView ? "none" : "translateX(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
      }}
      ref={ref}
      className="flex-1 grid grid-cols-2 gap-4"
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
        <div className="flex gap-5">
          {rootUser.socialMedias.map((sm: SocialMedia) => (
            <span
              title={sm.name}
              key={sm.id}
              className="hover:scale-110 transition-all hover:animate-bouncing shadow-md p-3 bg-white rounded-full hover:bg-white cursor-pointer"
              onClick={() => {
                window.open(sm.link);
              }}
            >
              <TechnologyIcon icon={sm.icon} />
            </span>
          ))}
        </div>
      </ContactBox>
    </div>
  );
};

export default ContactBoxes;
