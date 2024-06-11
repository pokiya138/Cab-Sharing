import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillTwitterSquare } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="shadow-sm grid space-y-4 bg-gray-200 shadow-black w-full px-10 py-2">
      <div className="w-full">
        <img
          className="w-full max-w-[180px] mx-auto"
          src={require("../asset/logo.png")}
        />
      </div>
      <div className="md:flex justify-between">
        <div className="w-full text-center space-y-4 p-4">
          <div className="font-bold text-lg">Useful Links</div>
          <ul className="grid font-medium">
            <li className="cursor-pointer" onClick={() => navigate("/")}>
              Home
            </li>
            <li className="cursor-pointer" onClick={() => navigate("/about")}>
              About
            </li>
            <li className="cursor-pointer" onClick={() => navigate("/contact")}>
              Contact
            </li>
          </ul>
        </div>
        <div className="w-full text-center space-y-4 p-4">
          <div className="font-bold text-lg">Contact Us</div>
          <ul className="font-medium">
            <li className="flex justify-center items-center">
              <span className="mx-2 text-green-400">
                <AiOutlineMail />
              </span>
              Info@anniecab.com
            </li>
            <li className="flex justify-center items-center">
              <span className="mx-2 text-green-400">
                <BsTelephone />
              </span>
              +91 9512613711
            </li>
            <li className="flex justify-center items-center">
              <span className="mx-2 text-green-400">
                <BsTelephone />
              </span>
              +91 6354183770
            </li>
          </ul>
          <ul className="flex justify-center space-x-4 text-3xl">
            <li>
              <FaFacebookSquare className="text-blue-600" />
            </li>
            <li>
              <FaInstagramSquare className="text-pink-600" />
            </li>
            <li>
              <AiFillTwitterSquare className="text-blue-500" />
            </li>
          </ul>
        </div>
        <div className="w-full p-4 space-x-2 text-center space-y-4">
          <div className="font-bold text-lg">Address</div>
          <div className="flex">
            <CiLocationOn className="text-5xl text-green-400" />
            <div className="">
              406 Akshat Tower, Nr. Pakwan Hotel, Opp. Rajpath Club, Sarkhej -
              Gandhinagar Highway, Ahmedabad - 380054
            </div>
          </div>
        </div>
      </div>
      <div className="font-bold w-full text-center text-base">
        <div className="w-full flex items-center justify-center space-x-2 cursor-pointer">
          <div>Terms & Conditions</div>
          <div className="w-[2px] h-5 bg-black"></div>
          <div>Privacy Policy</div>
        </div>
        <div className="w-full font-normal text-sm">
          Copyright Annie Cab All rights reserved
        </div>
      </div>
    </div>
  );
};
 