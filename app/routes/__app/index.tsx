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
    <div className="w-full">
      <h1 className="text-center"> Welcome to my website</h1>
    </div>
  );
};
export default WelcomePage;
