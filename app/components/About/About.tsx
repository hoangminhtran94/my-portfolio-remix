import { useLocation, useMatches } from "@remix-run/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

import InviewWrapper from "../UI/InviewWrapper/InviewWrapper";
const About = () => {
  const { pathname } = useLocation();
  const [loaded, setLoaded] = useState(false);
  const matches = useMatches();
  const rootUser = matches[0].data.rootUser;

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <InviewWrapper
      loadedState={loaded}
      id="about"
      mode="top-bottom"
      className=" text-white drop-shadow-sm min-h-screen mt-[80px]  3xl:mt-0 items-center font-extrabold flex gap-4  "
      key={pathname}
    >
      <div className="flex flex-col 3xl:flex-row gap-14 items-center md:py-9">
        <div className="w-[275px] h-[275px] md:w-[400px] md:h-[400px] ">
          <motion.img
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="w-full h-full object-cover resize-none  rounded-full shadow-lg "
            src={rootUser.profileImage}
            alt="main-banner"
          />
        </div>

        <div className="flex flex-1  flex-col gap-4 leading-relaxed">
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-[36px] md:text-[60px] text-slate drop-shadow-white-around-sm h-[160px]  sm:h-[120px] md:h-[200px] xl:h-auto  tracking-widest"
          >
            <Typewriter words={[rootUser.firstLineAbout]} loop={true} cursor />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-[20px] leading-loose md:text-[30px] drop-shadow-white-around-sm  text-slate tracking-widest"
            dangerouslySetInnerHTML={{
              __html: rootUser.secondLineAbout?.replace(/\n/g, "<br>"),
            }}
          ></motion.h3>

          <motion.h3
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="text-[20px] leading-loose drop-shadow-white-around-sm  text-slate md:text-[30px] tracking-widest"
            dangerouslySetInnerHTML={{
              __html: rootUser.thirdLineAbout?.replace(/\n/g, "<br>"),
            }}
          ></motion.h3>
        </div>
      </div>
    </InviewWrapper>
  );
};
export default About;
