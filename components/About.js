import React, { useEffect } from "react";

export const About = () => {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div
        className="h-[300px] bg-center bg-cover"
        style={{ backgroundImage: `url(${require("../asset/car-bg.png")})` }}
      >
        <div className="bg-[#00000094] text-white font-semibold text-4xl flex justify-center items-center w-full h-full">
          About Us
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto space-x-4 space-y-4 justify-around p-4">
        <h1 className="text-3xl font-bold">Trusted Cab Services in India</h1>
        <div className="sm:flex sm:flex-row-reverse grid place-items-center">
          <div></div>
          <div className="flex place-items-center">
            <img
              className="w-full max-w-md"
              src={require("../asset/Group 4.png")}
            />
          </div>
          <div className="bg-[#6EDA48] hidden sm:flex w-1 mx-2 h-52 rounded-full"></div>
          <div className="w-full">
            <div className="space-y-4">
              <p className="text-[#726d6d]">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
              </p>
              <button className="bg-[#6EDA48] px-4 py-2 font-medium rounded-md">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ backgroundImage: `url(${require("../asset/group-50.png")})` }}
        className="w-full bg-cover bg h-[300px] max-w-6xl mx-auto my-10"
      ></div>
      
      <div className="my-6">
        <div className="text-2xl font-semibold text-center">How It Works</div>
        <div className="mx-auto h-[2px] rounded-md w-24 bg-green-300"></div>
      </div>
      <div className="sm:flex w-full max-w-6xl mx-auto sm:space-x-4 sm:space-y-0 space-y-4 justify-around p-4">
        <div className="w-full  space-y-4 rounded-lg sm:max-w-[300px] p-4 items-center grid">
          <div className="bg-[#6EDA48] rounded-full max-w-max p-3 mx-auto">
            <img src={require("../asset/touch.png")} />
          </div>
          <span className="text-center text-lg font-bold">
            Book In Just 2 Tabs{" "}
          </span>
          <div className="text-[#726d6d] text-center">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.{" "}
          </div>
        </div>
        <div className="w-full  space-y-4 rounded-lg sm:max-w-[300px] p-4 items-center grid">
          <div className="bg-[#6EDA48] rounded-full max-w-max p-3 mx-auto">
            <img src={require("../asset/truck.png")} />
          </div>
          <span className="text-center text-lg font-bold">Get a Driver</span>
          <div className="text-[#726d6d] text-center">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.{" "}
          </div>
        </div>
      </div>
      <div className="sm:flex w-full max-w-6xl mx-auto sm:space-x-4 sm:space-y-0 space-y-4 justify-around p-4">
        <div className="w-full  space-y-4 rounded-lg sm:max-w-[300px] p-4 items-center grid">
          <div className="bg-[#6EDA48] rounded-full max-w-max p-3 mx-auto">
            <img src={require("../asset/location.png")} />
          </div>
          <span className="text-center text-lg font-bold">
            Track Your Driver
          </span>
          <div className="text-[#726d6d] text-center">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.{" "}
          </div>
        </div>
        <div className="w-full  space-y-4 rounded-lg sm:max-w-[300px] p-4 items-center grid">
          <div className="bg-[#6EDA48] rounded-full max-w-max p-3 mx-auto">
            <img className="w-20" src={require("../asset/home.png")} />
          </div>
          <span className="text-center text-lg font-bold">Arrive Safely</span>
          <div className="text-[#726d6d] text-center">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.{" "}
          </div>
        </div>
      </div>
    </>
  );
};
