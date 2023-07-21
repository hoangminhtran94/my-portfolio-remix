import { useMatches } from "@remix-run/react";
import Button from "~/components/UI/Button/Button";
import TechnologyIcon from "~/components/UI/TechnologyIcon/TechnologyIcon";
import type { SocialMedia } from "~/utils/models/models";
const MyProfile = () => {
  const matches = useMatches();
  const userData = matches[0].data.user;
  if (!userData) {
    return <div>Not available</div>;
  }
  return (
    <div className=" shadow-md border bg-white  border-slate-100 rounded-lg gap-9 flex p-8 flex-col items-center">
      <h2 className=" font-bold">{userData.name}</h2>
      <img
        className="w-[200px] h-[200px] object-cover  rounded-full shadow-lg "
        src={userData.profileImage}
        alt="main-banner"
      />
      <div className="flex flex-col gap-4">
        <h4>
          <strong>Username:</strong> {userData.username}
        </h4>
        <h4>
          <strong>Secondary email:</strong> {userData.secondaryEmail}
        </h4>
        <h4>
          <strong>Phone number:</strong> {userData.contactNumber}
        </h4>
        <h4>
          <strong>Social media:</strong>{" "}
          <div className="mt-2 flex gap-2">
            {userData.socialMedias.map((icon: SocialMedia) => (
              <TechnologyIcon key={icon.id} icon={icon.icon} />
            ))}
          </div>
        </h4>
      </div>
      <Button className="w-full" to={"edit-profile"}>
        Edit
      </Button>
    </div>
  );
};

export default MyProfile;
