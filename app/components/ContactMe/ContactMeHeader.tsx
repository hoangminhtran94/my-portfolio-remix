import { Link } from "@remix-run/react";

const ContactMeHeader = () => {
  return (
    <div>
      <h1>Contact Me</h1>
      <Link to="/contact/contact-now">Contact me now</Link>
    </div>
  );
};

export default ContactMeHeader;
