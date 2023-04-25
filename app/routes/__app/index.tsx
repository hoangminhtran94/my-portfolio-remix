import { useNavigate } from "react-router";
import { useEffect } from "react";
const WelcomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/about");
    }, 2000);
  }, [navigate]);
  return (
    <div>
      <h1>Welcome to my website</h1>
    </div>
  );
};
export default WelcomePage;
