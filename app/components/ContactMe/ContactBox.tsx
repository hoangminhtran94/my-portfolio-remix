import type { FC, ComponentPropsWithoutRef } from "react";

interface ContactBoxProps {
  label: string;
  extendedBg?: string;
}

const ContactBox: FC<ContactBoxProps & ComponentPropsWithoutRef<"div">> = ({
  label,
  extendedBg = "frost",
  children,
}) => {
  return (
    <div className="ag-courses_item tracking-widest border border-slate-500   ">
      <div className="ag-courses-item_link ">
        <div className={`ag-courses-item_bg ${extendedBg}`}></div>
        <h2 className=" relative z-5">{label}</h2>
        {children}
      </div>
    </div>
  );
};

export default ContactBox;
