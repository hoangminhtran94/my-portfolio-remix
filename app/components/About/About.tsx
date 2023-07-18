import type { MetaFunction } from "@remix-run/node";
import { Link, useLocation, useMatches } from "@remix-run/react";
import { motion, useInView } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { PageContext } from "~/store/page-context";

const About = () => {
  const { pathname } = useLocation();
  const [loaded, setLoaded] = useState(false);
  const matches = useMatches();
  const rootUser = matches[0].data.rootUser;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const { onChangePage } = useContext(PageContext);
  useEffect(() => {
    if (isInView) {
      onChangePage("about");
    }
  }, [isInView]);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      id="about"
      ref={ref}
      style={
        loaded
          ? {
              transform: isInView ? "none" : "translateY(-200px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }
          : {}
      }
      className=" text-white drop-shadow-sm min-h-screen  text-justify  items-center font-extrabold flex gap-4  "
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
          <motion.h2
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-[36px] md:text-[60px]  tracking-widest"
          >
            {rootUser.firstLineAbout}
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-[20px] leading-loose md:text-[30px] tracking-widest"
            dangerouslySetInnerHTML={{
              __html: rootUser.secondLineAbout?.replace(/\n/g, "<br>"),
            }}
          ></motion.h3>

          <motion.h3
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="text-[20px] leading-loose md:text-[30px] tracking-widest"
            dangerouslySetInnerHTML={{
              __html: rootUser.thirdLineAbout?.replace(/\n/g, "<br>"),
            }}
          ></motion.h3>
        </div>
      </div>
    </div>
  );
};
export default About;

export const meta: MetaFunction = () => {
  return { title: "About me" };
};
