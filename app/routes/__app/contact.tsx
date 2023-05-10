import { useLocation } from "@remix-run/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMatches } from "@remix-run/react";
import type { SocialMedia } from "~/utils/models/models";
import ContactBox from "~/components/ContactMe/ContactBox";
import TechnologyIcon from "~/components/UI/TechnologyIcon/TechnologyIcon";
import type { MetaFunction } from "@remix-run/node";

const Contact = () => {
  const { pathname } = useLocation();
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const matches = useMatches();
  const rootUser = matches[0].data.rootUser;
  return (
    <AnimatePresence>
      <div
        className="h-[600px]  2xl:h-[900px] w-full shadow-lg rounded-md flex md:flex-row flex-col  bg-[rgb(255,255,255,0.5)]"
        key={pathname}
      >
        <ContactBox
          showContent={showPhone}
          onClick={() => {
            setShowPhone((prev) => !prev);
          }}
          label="Phone number"
          background="phone-bg"
        >
          <h3>Contact me now</h3>
          <span>{rootUser.contactNumber}</span>
        </ContactBox>
        <ContactBox
          showContent={showEmail}
          onClick={() => {
            setShowEmail((prev) => !prev);
          }}
          label="Email"
          background="email-bg"
        >
          <h3>Email me now</h3>
          <span>{rootUser.username}</span>
          <span>{rootUser.secondaryEmail}</span>
        </ContactBox>

        <ContactBox
          showContent={showSocial}
          onClick={() => {
            setShowSocial((prev) => !prev);
          }}
          label="Social Media"
          labelClassName="text-white"
          background="social-media-bg"
        >
          <span>Chat with me on</span>
          <div className="flex gap-5">
            {rootUser.socialMedias.map((sm: SocialMedia) => (
              <span
                title={sm.name}
                key={sm.id}
                className="hover:scale-110 transition-all cursor-pointer"
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
    </AnimatePresence>
  );
};
export default Contact;

export const meta: MetaFunction = () => {
  return { title: "My Contacts" };
};
