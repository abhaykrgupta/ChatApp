import React, { useState } from "react";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [image, setImage] = useState();
  const [hovered, setHovered] = useState();
  const [selectedColor, setSelectedColor] = useState(0);

  //validate profile
  const validateProfile = () => {
    if (!firstName) {
      toast.error("First Name is required.");
      return false;
    }
    if (!lastName) {
      toast.error("Last Name is required.");
      return false;
    }
    return true;
  };

  //save changes api with backend
  const savedChanged = async () => {
    if (validateProfile()) {
      alert("Success");
    }
  };

  return (
    <div className="bg-[#121318] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div
            className="h-32 w-32 md:h-48 md:w-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:h-48  md:w-48  text-5xl border border-white/30 flex justify-center items-center rounded-full  ${getColor(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {/* Delete or edit option inside this profile ** hovered overly */}
            {hovered && (
              <div className="absolute inset-0 flex justify-center items-center  bg-black/50 ring-fuchsia-50 rounded-full  ">
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
          </div>
          {/* <input type="text" /> */}
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="First Name"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, index) => (
                <div
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300
              ${selectedColor === index ? "outline outline-white/50" : " "} `}
                  key={index}
                  onClick={() => {
                    setSelectedColor(index);
                  }}
                >
                  {" "}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button className="h-12 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
          onClick={savedChanged}
          >
            {" "}
            Save Changes{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
