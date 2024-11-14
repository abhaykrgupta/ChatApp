import { useAppStore } from "@/store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Plese setup profile to Access. ");
      navigate("/profile");
    }
  }, [userInfo]);
  return <div> Chat Page</div>;
};

export default Chat;
