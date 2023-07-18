import { Form, useLocation } from "@remix-run/react";
import { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useMatches } from "@remix-run/react";
import type { SocialMedia } from "~/utils/models/models";
import ContactBox from "~/components/ContactMe/ContactBox";
import TechnologyIcon from "~/components/UI/TechnologyIcon/TechnologyIcon";
import type { MetaFunction } from "@remix-run/node";
import Input from "~/components/UI/Input/Input";
import TextArea from "~/components/UI/TextArea/TextArea";
import Button from "~/components/UI/Button/Button";
import Header from "~/components/UI/Header/Header";
import { PageContext } from "~/store/page-context";

const Contact = () => {
  const { pathname } = useLocation();
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const matches = useMatches();
  const rootUser = matches[0].data.rootUser;
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
      <div className="flex gap-2 mt-[60px] " key={pathname}>
        <div className="flex-1 grid grid-cols-2 gap-4">
          <ContactBox
            showContent={showPhone}
            onClick={() => {
              setShowPhone((prev) => !prev);
            }}
            label="Phone number"
            extendedBg="big-sur"
            background="phone-bg"
          >
            <span className="relative z-5 ">{rootUser.contactNumber}</span>
          </ContactBox>
          <ContactBox
            showContent={showEmail}
            onClick={() => {
              setShowEmail((prev) => !prev);
            }}
            extendedBg="indigo-violet"
            label="Email"
            background="email-bg"
          >
            <ul className="flex flex-col gap-3 z-5 relative">
              <li>{rootUser.username}</li>
              <li>{rootUser.secondaryEmail}</li>
            </ul>
          </ContactBox>

          <ContactBox
            showContent={showSocial}
            onClick={() => {
              setShowSocial((prev) => !prev);
            }}
            extendedBg="gradient-orange"
            label="Social Media"
            labelClassName="text-white"
            background="social-media-bg"
          >
            <div className="flex gap-5">
              {rootUser.socialMedias.map((sm: SocialMedia) => (
                <span
                  title={sm.name}
                  key={sm.id}
                  className="hover:scale-110 transition-all cursor-pointer"
                  onClick={() => {
                    window.open(sm.link);
                  }}
                >
                  <TechnologyIcon icon={sm.icon} />
                </span>
              ))}
            </div>
          </ContactBox>
        </div>
        <div className="flex-1 ">
          <Form className="w-full h-full p-5 flex flex-col gap-3 bg-indigo-700 rounded-md">
            <h2>Contact me now</h2>
            <Input className="!bg-transparent" label="Title" />
            <Input className="!bg-transparent" label="Email" />
            <TextArea textAreaClassName="!bg-transparent" label="Description" />
            <Button className="hover:!bg-indigo-600">Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Contact;

export const meta: MetaFunction = () => {
  return { title: "My Contacts" };
};
