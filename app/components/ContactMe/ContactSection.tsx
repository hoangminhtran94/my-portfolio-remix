import ContactForm from "./ContactForm";

import ContactBoxes from "./ContactBoxes";
import Header from "~/components/UI/Header/Header";

import InviewWrapper from "../UI/InviewWrapper/InviewWrapper";
const Contact = () => {
  return (
    <InviewWrapper
      mode="fade"
      id="my-contact"
      className="text-white min-h-screen flex justify-center gap-5 xl:gap-10  flex-col"
    >
      <Header className="text-center">My Contacts</Header>
      <div className="flex 2xl:flex-row flex-col gap-5  xl:gap-10  ">
        <ContactBoxes />
        <ContactForm />
      </div>
    </InviewWrapper>
  );
};
export default Contact;
