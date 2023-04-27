import { useLocation } from "@remix-run/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMatches } from "@remix-run/react";
import { SocialMedia } from "~/utils/models/models";
import TechnologyIcon from "~/components/UI/TechnologyIcon/TechnologyIcon";

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
        className="h-[600px] 2xl:h-[900px] w-full shadow-lg rounded-md flex md:flex-row flex-col  bg-[rgb(255,255,255,0.5)]"
        key={pathname}
      >
        <motion.div
          animate={{
            rotateY: showPhone ? 180 : 0,
          }}
          className={`relative flex-1 flex flex-col px-3 items-center justify-center gap-2 border h-full  border-slate-200`}
        >
          <div
            className={` cursor-pointer absolute w-full h-full    ${
              !showPhone ? "phone-bg" : ""
            }  `}
            onClick={() => {
              setShowPhone((prev) => !prev);
            }}
          />
          {showPhone ? (
            <motion.div
              className="flex flex-col items-center text-xl gap-2"
              animate={{ rotateY: 180 }}
            >
              <h3>Contact me now</h3>
              <span>{rootUser.contactNumber}</span>
            </motion.div>
          ) : (
            <span className=" z-10 text-4xl">Phone number</span>
          )}
        </motion.div>

        <motion.div
          animate={{
            rotateY: showEmail ? 180 : 0,
          }}
          className={`relative flex flex-1 flex-col px-3 items-center justify-center gap-2 border h-full  border-slate-200`}
        >
          <div
            onClick={() => {
              setShowEmail((prev) => !prev);
            }}
            className={`absolute w-full h-full    ${
              !showEmail ? "email-bg" : ""
            } `}
          />
          {showEmail ? (
            <motion.div
              className="flex flex-col items-center text-xl gap-2"
              animate={{ rotateY: 180 }}
            >
              <h3>Email me now</h3>
              <span>{rootUser.username}</span>
              <span>{rootUser.secondaryEmail}</span>
            </motion.div>
          ) : (
            <span className=" z-10 text-4xl">Email</span>
          )}
        </motion.div>

        <motion.div
          animate={{
            rotateY: showSocial ? 180 : 0,
          }}
          className={`relative flex-1 flex flex-col px-3 items-center justify-center gap-2 border h-full  border-slate-200`}
        >
          <div
            onClick={() => {
              setShowSocial((prev) => !prev);
            }}
            className={`absolute w-full h-full    ${
              !showSocial ? "social-media-bg" : ""
            } `}
          />
          {showSocial ? (
            <motion.div
              className="flex flex-col items-center text-2xl gap-2"
              animate={{ rotateY: 180 }}
            >
              <span>Chat with me on</span>
              <div className="flex gap-5">
                {rootUser.socialMedias.map((sm: SocialMedia) => (
                  <span
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
            </motion.div>
          ) : (
            <span className=" text-white z-10 text-4xl">Social Media</span>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default Contact;
