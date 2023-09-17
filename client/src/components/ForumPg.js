import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import NameLogo from "../Assets/NameLogo.svg";
import Logout from "../Assets/Logout.svg";
import Notifications from "../Assets/Notifications.svg";
import axios from "axios";
import inbox from "../Assets/inbox.svg";
import ThreadModal from "./ThreadModal";
import ThreadCard from "./ThreadCard";

const ForumPg = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get("https://startery-project-backend.onrender.com/user", {
        headers: {
          AUTHORIZATION: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data.data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="">
      {loading ? (
        <div className="flex justify-center items-center mt-40">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="bg-mainBg h-screen">
          <Navbar />
          <div className="flex justify-between  ">
            {/* Profile Section */}
            <div className=" w-[278px] flex flex-col mt-10 px-8 py-6 h-min ml-10 bg-white rounded-xl drop-shadow-sm">
              <div className="flex flex-row justify-start  p-1">
                <img
                  className="h-[25px] my-auto "
                  src={NameLogo}
                  alt="Name logo"
                ></img>
                <p className="ml-4 text-xl">{userData.name}</p>
              </div>
              <div className="flex flex-row mt-2 justify-start p-1">
                <img
                  className="h-[25px] my-auto"
                  src={inbox}
                  alt="Inbox logo"
                ></img>
                <p className="ml-4 text-xl">Inbox</p>
              </div>
              <div className="flex flex-row mt-2 justify-start p-1">
                <img
                  className="h-[25px] my-auto"
                  src={Notifications}
                  alt="Notif logo"
                ></img>
                <p className="ml-4 text-xl">Notifications</p>
              </div>
              <div className="flex flex-row mt-2 justify-start p-1">
                <img
                  className="h-[25px] w-[25px] my-auto"
                  src={Logout}
                  alt="Logout logo"
                ></img>
                <p className="ml-4 text-xl">Logout</p>
              </div>
            </div>

            {/* Threads Section */}
            <div className="mt-10 bg-white  rounded-xl">
              <ThreadCard />
            </div>

            {/* Start new thread */}
            <div className="col-span-1">
              <div className=" ">
                <ThreadModal  />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumPg;
