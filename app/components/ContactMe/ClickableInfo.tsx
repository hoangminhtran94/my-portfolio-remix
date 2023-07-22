import type { FC } from "react";
import { toast } from "react-toastify";

interface ClickableInfoProps {
  info: string;
}

const ClickableInfo: FC<ClickableInfoProps> = ({ info }) => {
  const copyHandler = (info: string) => {
    navigator.clipboard.writeText(info).then(() =>
      toast.info("Copied to clipboard", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    );
  };

  return (
    <p
      onClick={() => {
        copyHandler(info);
      }}
      className="expand-info py-3 relative z-5 cursor-pointer text-base drop-shadow-white-around-sm"
    >
      {info}
    </p>
  );
};

export default ClickableInfo;
