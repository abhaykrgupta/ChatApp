import { useAppStore } from "@/store";
import React from "react";

const Profile = () => {
  const { userInfo } = useAppStore();
  return (
    <div>
      {" "}
      Profile Page
      <div>Email: {userInfo.email}</div>
    </div>
  );
};

export default Profile;
