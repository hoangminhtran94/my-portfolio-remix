import { useLocation } from "@remix-run/react";
const About = () => {
  const { pathname } = useLocation();
  return (
    <div key={pathname}>
      <h2>
        Hi, I'm Minh Hoang Tran, <br /> a Full Stack web developer with
        experience many frameworks and languages. (More details)
        <br />
        I've worked for Algonquin College - Data Analytics center for 8 months,
        where I used the latest technologies like React, Angular, VueJs, Svelte,
        Remix, NextJs, Firebase, AWS, Express, and Nodejs to develop dynamic web
        applications. I'm also skilled in mobile development with Java and React
        Native. I'm a problem solver who collaborates well with others, always
        looking for new challenges and opportunities to grow my skills and
        knowledge.
      </h2>
    </div>
  );
};
export default About;
