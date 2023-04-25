import { Link, useLocation, useMatches } from "@remix-run/react";
const About = () => {
  const { pathname } = useLocation();
  const matches = useMatches();
  const rootUser = matches[0].data.rootUser;
  return (
    <div
      className="text-slate-600 drop-shadow-md flex flex-col gap-4  "
      key={pathname}
    >
      <div className="flex gap-10 items-center">
        <img
          className="w-[400px] h-[400px] object-cover  rounded-full shadow-lg "
          src={rootUser.profileImage}
          alt="main-banner"
        />
        <div className="flex flex-col gap-4 leading-relaxed">
          <h2 className="text-[60px]">Hi,</h2>
          <h3 className="text-[30px]">
            I'm
            <strong> Minh Hoang Tran</strong> , a Full Stack web developer with
            experience many frameworks and languages.
          </h3>

          <h3 className="text-[30px]">
            I am working for Algonquin College - Data Analytics center for 8
            months, where I used the latest technologies like React, Angular,
            VueJs, Svelte, Remix, NextJs, Firebase, AWS, Express, and Nodejs to
            develop dynamic web applications.
          </h3>
        </div>
      </div>

      <div className="flex  mt-10 text-xl  ">
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
      </div>
    </div>
  );
};
export default About;
