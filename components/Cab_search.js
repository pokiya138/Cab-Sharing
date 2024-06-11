import axios from "axios";
import React, { useEffect, useState } from "react";
import { PiArrowsLeftRightBold } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";

export const Cab_search = () => {
  const [res, setRes] = useState();
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data;
  console.log(res);

  useEffect(() => {
    (async () => {
      await axios
        .post("https://sparkstoideas.daddy11.in/ride/seachRide", {
          pickupLocation: data.from,
          dropLocation: data.to,
          date: data.formatdate,
        })
        .then((res) => {
          console.log(res);
          if (res.data.success == 1) {
            setRes(res.data.result);
            setLoader(false);
          } else {
            setLoader(false);
          }
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  const details = (e) => {
    const id = localStorage.getItem("session_uid");
    if (id) {
      navigate("/ride_details", { state: e });
    } else {
      toast.warning("You must login first!!");
    }
  };
  return (
    <>
      {loader && <Loader />}
      <div className="p-6 w-full max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl py-6 font-semibold">
            {new Date(location.state.date).toDateString()}
          </h1>
          <div className="text-[#A7A4A4]">
            <div className="flex items-center space-x-4">
              <span>{data.from}</span>
              <PiArrowsLeftRightBold />
              <span>{data.to}</span>
            </div>
            {res ? <div>{res.length} Rides Available</div> : null}
          </div>
        </div>
        {res ? (
          res.map((e, i) => {
            return (
              <div key={i} className="w-full max-w-4xl mx-auto">
                <div className="p-5">
                  <div className="bg-[#F2F2F2] flex rounded-lg">
                    <div className="flex w-full p-2">
                      <img
                        className="w-full max-w-[200px] h-36 object-contain object-center rounded-lg lg:ml-8"
                        src={e.carId.vehicleImg}
                      />
                      <div className="flex w-full justify-between items-center">
                        <div className="flex w-full md:max-w-[400px] lg:max-w-[350px] justify-between mx-auto px-10">
                          <div className="flex-row">
                            <div className="font-medium text-lg">
                              {e.carId.vehicleModel}
                            </div>
                            <span className="text-sm">
                              {e.vendorId.firstName}
                            </span>
                          </div>
                          <div className="flex-row">
                            <div className="font-medium text-lg">{e.time}</div>
                            <span className="text-sm">{e.pickupLocation}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[4px] my-6 bg-[#726d6d]"></div>
                    <div className="w-full max-w-max space-y-9 px-5 border-slate-400 flex">
                      <div className="grid place-items-center w-full py-2">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="font-medium text-center text-xl">
                              ₹{e.price}
                            </div>
                            <button
                              onClick={() => details(e)}
                              className="bg-[#6EDA48]  w-full max-w-[100px] p-2 mx-auto rounded-lg text-sm font-semibold"
                            >
                              View Details
                            </button>
                          </div>
                          <div className="text-center text-[#b9aeae]">
                            {e.availableSeat} Seat Available
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-3xl">No Ride Available</div>
        )}
      </div>
    </>
  );
};
