import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim";

const WelcomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let timeout = setTimeout(() => {
      navigate("/about");
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [navigate]);
  return (
    <div className="w-full self-center flex items-center h-[500px]">
      <h1 className="text-center w-full"> Welcome to my website</h1>
    </div>
  );
};
export default WelcomePage;
