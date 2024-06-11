import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PiArrowsLeftRightBold } from 'react-icons/pi';
import Loader from '../../loader/Loader';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

export const Ride_Inquiry = () => {
    const [data, setdata] = useState()
    const id = JSON.parse(localStorage.getItem('session_uid'))
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            await axios.get(`https://sparkstoideas.daddy11.in/booking/get_booking/${id}`)
                .then(res => setdata(res.data.populatedData))
                .catch(err => console.log(err))
        })()
    }, [])
    console.log(data)
    return (
        <>
            {!data && <Loader />}
            <div className='w-full max-w-6xl mx-auto md:p-10'>
                <div className='text-xl justify-center sm:justify-normal flex items-center font-bold p-4'>
                    <div className='flax items-center'>Total Ride Inquiry : <span className='text-slate-300'>{data?.length}</span></div>
                </div>
                <div className='h-[2px] bg-slate-300'></div>
                <div className='my-6 md:p-4 flex flex-wrap justify-center w-full'>
                    {data?.reverse().map((e, i) => {
                        console.log(e)
                        const ee = e.rideid
                        return (
                            <div key={i} className='border-2 rounded-lg shadow-lg w-full max-w-md m-4'>
                                <div className='p-4 grid'>
                                    <div className='text-right text-[#726d6d] text-sm font-medium'>{ee.date} | {ee.time}</div>
                                    <div className='flex items-center'>
                                        <div className='w-full max-w-max'>
                                            <img className='w-16 h-16 rounded-full object-cover object-center mx-auto' src={ee.carId.vehicleImg} />
                                            <h2 className='text-center'>{ee.carId.vehicleModel}</h2>
                                        </div>
                                        <div className='w-full grid justify-center space-y-2'>
                                            <h2 className='text-xl font-bold flex items-center'> {ee.vendorId.firstName} {ee.vendorId.lastName}</h2>
                                            {/* <h2 className='text-xl font-bold flex items-center'><FaUser className='mr-2 text-gray-400' /> {ee.vendorId.firstName} {ee.vendorId.lastName}</h2> */}
                                            {/* <h2 className='font-semibold flex items-center'><FaPhoneAlt className='mr-2 text-gray-400' />{ee.vendorId.phno}</h2> */}
                                            <h2 className='font-semibold flex items-center'>{ee.vendorId.phno}</h2>
                                        </div>
                                        <div className='w-full max-w-max'>
                                            <button onClick={() => navigate('/user_chat', { state: ee.vendorId._id })} className='bg-green-600 px-4 py-1 rounded-md text-white'>Chat</button>
                                        </div>
                                    </div>
                                </div>
                                <div className='h-[1px] bg-slate-200'></div>
                                <div className='p-4 flex w-full'>
                                    <div className='w-full gird text-center'>
                                        <div className='text-[#726d6d]'>
                                            FROM
                                        </div>
                                        <div className='font-medium'>
                                            {ee.pickupLocation}
                                        </div>
                                    </div>
                                    <PiArrowsLeftRightBold className='text-5xl' />
                                    <div className='w-full gird text-center'>
                                        <div className='text-[#726d6d]'>
                                            TO
                                        </div>
                                        <div className='font-medium'>
                                            {ee.dropLocation}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div >
        </>
    )
}
