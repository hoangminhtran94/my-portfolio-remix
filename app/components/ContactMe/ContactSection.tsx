import { useContext, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

import ContactForm from "./ContactForm";

import ContactBoxes from "./ContactBoxes";
import Header from "~/components/UI/Header/Header";
import { PageContext } from "~/store/page-context";

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const { onChangePage } = useContext(PageContext);

  useEffect(() => {
    if (isInView) {
      onChangePage("my-contact");
    }
  }, [isInView]);
  return (
    <div
      ref={ref}
      id="my-contact"
      className="text-white min-h-screen flex justify-center flex-col"
    >
      <Header className="text-center">My Contacts</Header>
      <div className="flex 2xl:flex-row flex-col gap-2 mt-[60px] ">
        <ContactBoxes />
        <ContactForm />
      </div>
    </div>
  );
};
export default Contact;
