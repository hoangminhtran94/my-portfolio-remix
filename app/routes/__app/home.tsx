import { useNavigate, useMatches } from "@remix-run/react";
import { useEffect } from "react";

export default function Index() {
  const navigate = useNavigate();
  const matches = useMatches();
  const rootUser = matches[0].data.rootUser;
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
          className="w-[400px] h-[400px] object-cover  rounded-full shadow-lg "
          src={rootUser.profileImage}
          alt="main-banner"
        />
      </div>
    </div>
  );
}
