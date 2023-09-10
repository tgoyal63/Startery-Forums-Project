import React from "react";
import { useEffect, useState, useContext } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import logo from "../Assets/logo.svg"




const Navbar = () => {
        const [nav, setNav] = useState(false);
        const handleClick = () => setNav(!nav);
  return (
    <div className="w-screen h-[80px] z-10 bg-zinc-100 drop-shadow-lg">
    <div className="px-2 flex justify-between items-center w-full h-full">
      <div className="flex items-center">
        <img src={logo} className="h-[25px] ml-4 md:h-[45px] " alt=""/>
         
        
      </div>
      </div>
  </div>
  );
};

export default Navbar;
