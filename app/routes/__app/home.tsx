import MainPageBanner from "~/components/MainPage/MainPageContent";
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
    <div className="flex flex-col gap-8 ">
      <MainPageBanner />
    </div>
  );
}
