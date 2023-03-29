import { useLocation } from "@remix-run/react";
const About = () => {
  const { pathname } = useLocation();
  return (
    <div key={pathname}>
      <h2>I am a passionate web developer from Ottawa, Canada</h2>
    </div>
  );
};
export default About;
