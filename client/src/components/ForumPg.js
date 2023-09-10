import Navbar from "./Navbar";
import React from "react";
import NameLogo from "../Assets/NameLogo.svg"
import Logout from "../Assets/Logout.svg"
import Notifications from "../Assets/Notifications.svg"
import inbox from "../Assets/inbox.svg"


const ForumPg = () => {
  return (
    <div>
        <Navbar/>
      <div className="grid grid-cols-3">
        {/* Profile Section */}
        <div className=" w-[278px] border border-2 grid grid-rows-4 mt-10 p-8 ml-8">
            <div className="flex flex-row"> 
                <img  className="h-[25px]" src={NameLogo}></img>
                <p className="ml-4 text-xl">Name</p>
            </div>
            <div  className="flex flex-row mt-2">
                <img className="h-[25px]" src={inbox}></img>
                <p className="ml-4 text-xl">Inbox</p>
            </div>
            <div className="flex flex-row mt-2" >
                <img className="h-[25px]" src={Notifications}></img>
                <p className="ml-4 text-xl">Notifications</p>
            </div>
            <div className="flex flex-row mt-2">
                <img className="h-[25px] " src={Logout}></img>
                <p className="ml-4 text-xl">Logout</p>
            </div>

           
        
        </div>

        {/* Threads Section */}
        <div>
          <h1>go</h1>
        </div>

        {/* Start new thread */}
        <div>
          <h1>go</h1>
        </div>
      </div>
    </div>
  );
};

export default ForumPg;
