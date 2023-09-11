import Navbar from "./Navbar";
import React from "react";
import NameLogo from "../Assets/NameLogo.svg"
import Logout from "../Assets/Logout.svg"
import Notifications from "../Assets/Notifications.svg"
import inbox from "../Assets/inbox.svg"
import ThreadCard from "./ThreadCard";


const ForumPg = () => {
  return (
    <div>
        <Navbar/>
      <div className="flex justify-between ">
        {/* Profile Section */}
        <div className=" w-[278px] border border-2 flex flex-col mt-10 px-8 py-6 h-min ml-10 ">
            <div className="flex flex-row justify-start  p-1"> 
                <img  className="h-[25px] my-auto " src={NameLogo}></img>
                <p className="ml-4 text-xl">Name</p>
            </div>
            <div  className="flex flex-row mt-2 justify-start p-1">
                <img className="h-[25px] my-auto" src={inbox}></img>
                <p className="ml-4 text-xl">Inbox</p>
            </div>
            <div className="flex flex-row mt-2 justify-start p-1" >
                <img className="h-[25px] my-auto" src={Notifications}></img>
                <p className="ml-4 text-xl">Notifications</p>
            </div>
            <div className="flex flex-row mt-2 justify-start p-1">
                <img className="h-[25px] w-[25px] my-auto" src={Logout}></img>
                <p className="ml-4 text-xl">Logout</p>
            </div>

           
        
        </div>

        {/* Threads Section */}
        <div className="mt-10 ">
          <ThreadCard/>
        </div>

        {/* Start new thread */}
        <div className="col-span-1">
          <div className=" ">
            <button className="mt-10 bg-light-purple h-[53px] w-[201px] rounded-xl text-dark-purple">
              start new thread
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPg;
