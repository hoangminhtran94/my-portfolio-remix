import { useNavigate } from "react-router";
import { useEffect } from "react";
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
