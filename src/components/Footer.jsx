import React from "react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import logo from "../assets/footer-logo.svg";
import googlePlay from "../assets/google-play.svg";
import appStore from "../assets/app-store.svg";
import { FOOTER, FOOTERCATEGOR } from "../static";
import { RiFacebookCircleLine } from "react-icons/ri";
import { FiYoutube } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="container mt-16 py-8">
      <div className="box-content bg-[#111111]  text-white grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-3 max-md:py-3 justify-between  flex-wrap md:flex-nowrap items-center  rounded-xl  md:p-8 lg:p-12 lg:rounded-xl  lg:w-auto 
      lg:max-w-screen-xl  lg:bg-[#111111] "
      >
        <div className=" text-center md:text-left ">
          <img src={logo} alt="Logo" className="w-12 sm:w-14 md:w-16 mb-6 mx-auto md:mx-0 cursor-pointer" />
          <div className="flex flex-col gap-3 items-center md:items-start">
            <img src={googlePlay} alt="Google Play" className="w-28 sm:w-32 md:w-36 cursor-pointer" />
            <img src={appStore} alt="App Store" className="w-28 sm:w-32 md:w-36 cursor-pointer" />
          </div>
        </div>

        <div className=" text-center md:text-left ">
          <h3 className="text-base sm:text-lg font-semibold mb-4">About Us</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            {
              FOOTER?.map((item) => (
                <li key={item.id} className="flex items-center gap-2 justify-center md:justify-start cursor-pointer hover:text-red-500">
                  <span className="text-2xl text-[#C61F1F]">
                    <item.icon />
                  </span>
                  {item.title}
                </li>
              ))
            }

          </ul>
        </div>

        <div className="p-4 text-center md:text-left ">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            {
              FOOTERCATEGOR.map((item) => (
                <li key={item.id} className="flex items-center gap-2 justify-center md:justify-start cursor-pointer hover:text-red-500">
                  <span className="text-2xl text-[#C61F1F]">
                    <item.iconM />
                  </span>
                  {item.title}
                </li>

              ))
            }
          </ul>
        </div>

        <div className=" text-center md:text-left ">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Contact us</h3>
          <p className="flex items-center gap-2 justify-center md:justify-start text-red-500 text-sm sm:text-base md:text-lg">
            <FiPhone /> +998 (95) 897-33-38
          </p>
          <h3 className="text-base sm:text-lg font-semibold mt-6 mb-4">Social media</h3>
          <div className="flex gap-4 text-lg sm:text-xl md:text-2xl justify-center md:justify-start">
            <FaInstagram className="cursor-pointer text-[#C61F1F]" />
            <RiFacebookCircleLine className="cursor-pointer text-[#C61F1F]" />
            <FiYoutube className="cursor-pointer text-[#C61F1F]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;