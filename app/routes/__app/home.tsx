import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";

export default function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/my-project");
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [navigate]);
  return (
    <div className="flex w-full gap-12 justify-center items-center text-slate-600">
      <div>
        <h3>Hello</h3>
        <h1>My name is Minh Hoang Tran</h1>
        <h2>I am a fullstack website and mobile developer</h2>
      </div>

      <div>
        <img
          className="w-[400px] max-h-[400px] object-cover  rounded-full shadow-lg "
          src="images/main-banner-image.jpg"
          alt="main-banner"
        />
      </div>
    </div>
  );
}
