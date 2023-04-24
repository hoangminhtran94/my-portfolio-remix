import { useMatches } from "@remix-run/react";
const MyProfile = () => {
  const matches = useMatches();
  const userData = matches[0].data.userData;

  return (
    <div className=" shadow-md border border-slate-100 rounded-lg gap-9 flex p-8  justify-center items-start">
      <img
        className="w-[200px] max-h-[200px] object-cover  rounded-full shadow-lg "
        src="images/main-banner-image.jpg"
        alt="main-banner"
      />
      <div className="flex flex-col gap-4">
        <h4>
          <strong>Name:</strong> {userData.name}
        </h4>
        <h4>
          <strong>Username:</strong> {userData.username}
        </h4>
        <h4>
          <strong>Secondary email:</strong> {userData.username}
        </h4>
        <h4>
          <strong>Phone number:</strong> {userData.username}
        </h4>
        <h4>
          <strong>Social media:</strong> {userData.username}
        </h4>
        <h4>
          <strong>:</strong> {userData.username}
        </h4>
      </div>
    </div>
  );
};

export default MyProfile;
