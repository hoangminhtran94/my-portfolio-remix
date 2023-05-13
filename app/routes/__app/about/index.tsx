import type { MetaFunction } from "@remix-run/node";
import { Link, useLocation, useMatches } from "@remix-run/react";
import { motion } from "framer-motion";
const About = () => {
  const { pathname } = useLocation();
  const matches = useMatches();
  const rootUser = matches[0].data.rootUser;

  return (
    <div
      className=" text-stone-600 drop-shadow-sm  text-justif self-center  font-extrabold flex flex-col gap-4  "
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
            className="text-[36px] md:text-[60px]"
          >
            {rootUser.firstLineAbout}
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-[20px] leading-loose md:text-[30px]"
            dangerouslySetInnerHTML={{
              __html: rootUser.secondLineAbout?.replace(/\n/g, "<br>"),
            }}
          ></motion.h3>

          <motion.h3
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="text-[20px] leading-loose md:text-[30px]"
            dangerouslySetInnerHTML={{
              __html: rootUser.thirdLineAbout?.replace(/\n/g, "<br>"),
            }}
          ></motion.h3>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="flex flex-col xl:flex-row gap-6  mt-10 text-md md:text-xl"
      >
        <Link
          to="/my-project"
          className=" hover:bg-indigo-200 flex items-center justify-center gap-3  flex-1 hover:z-10   hover:scale-110 bol  transition-all p-3    text-slate-800  relative "
        >
          See more about my projects
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 448 512"
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </Link>
        <Link
          to="/skills"
          className="hover:bg-amber-200  flex items-center gap-3 hover:z-10 justify-center  flex-1   hover:scale-110  transition-all p-3    text-slate-800  relative "
        >
          See more about my skills
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 448 512"
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </Link>
        <Link
          to="/contact"
          className="hover:bg-orange-200  flex items-center justify-center gap-3 hover:z-10  flex-1  hover:scale-110  transition-all p-3    text-slate-800  relative "
        >
          Contact me
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 448 512"
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
};
export default About;

export const meta: MetaFunction = () => {
  return { title: "About me" };
};
