import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { MdOutlineDirectionsBike } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import axios from "axios";
import { user_data, selectUser } from "../store/services/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [authdata, setAuthdata] = useState();
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = JSON.parse(localStorage.getItem("session_uid"));

  useEffect(() => {
    if (id) {
      (async () => {
        setLoader(true);
        await axios
          .get(`https://sparkstoideas.daddy11.in/user/userdata/${id}`)
          .then((res) => {
            // console.log(res)
            if (res.data.success == 1) {
              if (res.data.data.LoginStatus == 0) {
                setLoader(false);
                setAuthdata(res.data.data);
              } else {
                toast.error("Something Went to Wrong");
                navigate("/login");
                localStorage.clear();
                window.location.reload();
              }
            } else {
              toast.error("Something Went to Wrong");
              navigate("/login");
              localStorage.clear();
              window.location.reload();
            }
          })
          // if page not found internet err
          .catch((err) => console.log(err));
        // catch
      })();
    }
  }, []);

  const vendor = JSON.parse(localStorage.getItem("session_vid"));

  useEffect(() => {
    if (vendor) {
      (async () => {
        setLoader(false);
        await axios
          .get(`https://sparkstoideas.daddy11.in/vender/getVender/${vendor}`)
          .then((res) => {
            // console.log(res)
            if (res.data.success == 1) {
              if (res.data.data.LoginStatus == 0) {
                setLoader(false);
                setAuthdata(res.data.data);
              } else {
                toast.error("Something Went to Wrong");
                navigate("/login");
                localStorage.clear();
                window.location.reload();
              }
            } else {
              toast.error("Something Went to Wrong");
              navigate("/login");
              localStorage.clear();
              window.location.reload();
            }
          })
          // if page not found internet err //
          .catch((err) => console.log(err));
        // catch //
      })();
    }
  }, []);

  useEffect(() => {
    if (authdata) {
      dispatch(user_data(authdata));
    }
  }, [authdata]);

  const data = useSelector(selectUser);
  // console.log(data)
  if (vendor) {
    return (
      <>
        {loader && <Loader />}
        <div className="flex justify-between shadow-md items-center px-5">
          <img
            onClick={() => navigate("/")}
            className="w-full max-w-[100px] sm:max-w-[150px]"
            src={require("../asset/logo.png")}
            alt="logo"
          />
          <ul className="hidden sm:flex space-x-10">
            <li
              onClick={() => navigate("/")}
              className=" font-bold hover:cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => navigate("/about")}
              className=" font-bold hover:cursor-pointer"
            >
              About us
            </li>
            <li
              onClick={() => navigate("/contact")}
              className=" font-bold hover:cursor-pointer"
            >
              Contact
            </li>
          </ul>
          <div className=" sm:flex">
            <div>
              <button
                onPointerMove={() => setOpen(true)}
                onMouseOut={() => setOpen(false)}
                className="bg-[#6EDA48] w-full min-w-[130px] py-1 px-2 flex items-center text-lg font-semibold rounded-lg"
              >
                <img
                  className="w-8 h-8 mr-2 rounded-full"
                  src={
                    data?.profile == null
                      ? require("../asset/user.jpg")
                      : data?.profile
                  }
                />
                <span className="w-full">{data?.firstName}</span>
              </button>
              {open && (
                <div
                  onPointerMove={() => setOpen(true)}
                  onMouseOut={() => setOpen(false)}
                  className="absolute bg-white px-1 py-2 -ml-8 rounded-lg"
                >
                  <ul className="items-center">
                    <li
                      onClick={() => {
                        navigate("/editprofile");
                      }}
                      className="border-b-2 text-sm font-medium flex items-center p-1 hover:cursor-pointer"
                    >
                      <AiOutlineUser className="mx-2" />
                      Edit Profile
                    </li>
                    <li
                      onClick={() => {
                        navigate("/changepassword");
                      }}
                      className="border-b-2 text-sm font-medium flex items-center p-1 hover:cursor-pointer"
                    >
                      <CiLock className="mx-2" />
                      Change Password
                    </li>
                    <li
                      onClick={() => {
                        navigate("/v_ride_inquiry");
                      }}
                      className="border-b-2 text-sm font-medium flex items-center p-1 hover:cursor-pointer"
                    >
                      <MdOutlineDirectionsBike className="mx-2" />
                      Ride Inquiry
                    </li>
                    <li
                      onClick={() => {
                        navigate("/add_ride");
                      }}
                      className="border-b-2 text-sm font-medium flex items-center p-1 hover:cursor-pointer"
                    >
                      <MdOutlineDirectionsBike className="mx-2" />
                      Add Ride
                    </li>
                    <li
                      onClick={() => {
                        navigate("/my_vehicel", {
                          state: JSON.parse(
                            localStorage.getItem("session_vid")
                          ),
                        });
                      }}
                      className="border-b-2 text-sm font-medium flex items-center p-1 hover:cursor-pointer"
                    >
                      <MdOutlineDirectionsBike className="mx-2" />
                      My vehicle
                    </li>
                    <li
                      onClick={() => {
                        localStorage.clear();
                        navigate("/");
                        window.location.reload();
                      }}
                      className=" text-sm font-medium flex items-center p-1 hover:cursor-pointer"
                    >
                      <TbLogout className="mx-2" />
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="text-2xl hidden">&#8801;</div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {id && loader ? (
          <Loader />
        ) : (
          <div className="flex justify-between shadow-md items-center px-5">
            <img
              onClick={() => navigate("/")}
              className="w-full max-w-[100px] sm:max-w-[150px]"
              src={require("../asset/logo.png")}
              alt="logo"
            />
            <ul className="hidden sm:flex space-x-10">
              <li
                onClick={() => navigate("/")}
                className=" font-bold hover:cursor-pointer"
              >
                Home
              </li>
              <li
                onClick={() => navigate("/about")}
                className=" font-bold hover:cursor-pointer"
              >
                About us
              </li>
              <li
                onClick={() => navigate("/contact")}
                className=" font-bold hover:cursor-pointer"
              >
                Contact
              </li>
            </ul>
            <div className=" sm:flex">
              {id ? (
                <>
                  <div>
                    <button
                      onPointerMove={() => setOpen(true)}
                      onMouseOut={() => setOpen(false)}
                      className="bg-[#6EDA48] w-full min-w-[130px] py-1 px-2 flex items-center text-lg font-semibold rounded-lg"
                    >
                      <img
                        className="w-8 h-8 mr-2 rounded-full"
                        src={
                          data?.profile == null
                            ? require("../asset/user.jpg")
                            : data?.profile
                        }
                      />
                      <span className="w-full">{data?.firstName}</span>
                    </button>
                    {open && (
                      <div
                        onPointerMove={() => setOpen(true)}
                        onMouseOut={() => setOpen(false)}
                        className="absolute bg-white px-1 py-2 -ml-8 rounded-lg"
                      >
                        <ul className="items-center">
                          <li
                            onClick={() => {
                              navigate("/editprofile");
                            }}
                            className="border-b-2 text-sm font-medium flex items-center p-1 hover:cursor-pointer"
                          >
                            <AiOutlineUser className="mx-2" />
                            Edit Profile
                          </li>
                          <li
                            onClick={() => {
                              navigate("/changepassword");
                            }}
                            className="border-b-2 text-sm font-medium flex items-center p-1 hover:cursor-pointer"
                          >
                            <CiLock className="mx-2" />
                            Change Password
                          </li>
                          <li
                            onClick={() => {
                              navigate("/ride_inquiry");
                            }}
                            className="border-b-2 text-sm font-medium flex items-center p-1 hover:cursor-pointer"
                          >
                            <MdOutlineDirectionsBike className="mx-2" />
                            Ride Inquiry
                          </li>
                          <li
                            onClick={() => {
                              localStorage.clear();
                              navigate("/");
                              window.location.reload();
                            }}
                            className=" text-sm font-medium flex items-center p-1 hover:cursor-pointer"
                          >
                            <TbLogout className="mx-2" />
                            Logout
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="space-x-3">
                  <button
                    onClick={() => navigate("/login")}
                    className="border-2 font-bold hover:cursor-pointer px-6 border-slate-800 rounded-md"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="border-2 font-bold hover:cursor-pointer px-6 border-slate-800 rounded-md"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
            <div className="text-2xl hidden">&#8801;</div>
          </div>
        )}
      </>
    );
  }
};
