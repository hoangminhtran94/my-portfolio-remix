import { useMatches } from "@remix-run/react";

const AboutEdit = () => {
  const matches = useMatches();
  const rootUser = matches[0].data.rootUser;
  return (
    <div>
      <h1>Edit About</h1>
      <div className="relative w-[275px] h-[275px] md:w-[400px] md:h-[400px] ">
        <img
          className="w-full h-full object-cover resize-none  rounded-full shadow-lg "
          src={rootUser.profileImage}
          alt="main-banner"
        />
      </div>
    </div>
  );
};

export default AboutEdit;
