import axios from 'axios'
import React, { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router-dom'

export const Ride_Details = () => {
    const [opencontact, setOpencontact] = useState(false)
    const [show, setShow] = useState(false)
    const location = useLocation()
    const data = location.state
    console.log(location)

    const userid = JSON.parse(localStorage.getItem('session_uid'))

    const navigate = useNavigate()

    const book = async () => {
        setShow(true)
        await axios.post('https://sparkstoideas.daddy11.in/booking/booking', { uid: userid, rideid: data._id })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className='my-5'>
                <img className='rounded-lg mx-auto w-full max-w-md h-64 object-contain' src={data.carId.vehicleImg} />
            </div>
            <div className='flex items-center justify-between mx-auto w-full max-w-6xl'>
                <div className=''>
                    <div className='text-2xl font-semibold'>{data.carId.vehicleModel}</div>
                    <div className='text-sm font-medium'>Automatic</div>
                    {/* <div>Alto 800</div> */}
                </div>
                <div>
                    <button className='bg-[#6EDA48] px-4 py-1 rounded-md  font-medium'>+ Add Review</button>
                </div>
            </div>
            <div className='flex my-10 items-center justify-between mx-auto w-full max-w-6xl'>
                <div>
                    <div className='text-lg font-medium'>Driver Name</div>
                    <div>{data.vendorId.firstName} {data.vendorId.lastName}</div>
                </div>
                <div>
                    <div className='text-lg font-medium'>Vehicle Number</div>
                    <div>{data.carId.vehicleNumber}</div>
                </div>
                <div>
                    <div className='text-lg font-medium'>Vehicle </div>
                    <div>{data.carId.vehicleModel}</div>
                </div>
                <div>
                    <div className='text-lg font-medium'>Seat Availability</div>
                    <div>{data.availableSeat}</div>
                </div>
                <div>
                    <div className='text-lg font-medium'>Fare</div>
                    <div>₹{data.price}</div>
                </div>
            </div>
            <div className='flex justify-between my-10 items-center mx-auto w-full max-w-6xl'>
                <div className='grid'>
                    <div className='text-xl font-medium'>
                        Pickup Location
                    </div>
                    <div>
                        {data.pickupLocation}
                    </div>
                </div>
                <div className='grid'>
                    <div className='text-xl font-medium'>
                        Ride Date
                    </div>
                    <div>
                        {data.date}
                    </div>
                </div>
                <div className='grid'>
                    <div className='text-xl font-medium'>
                        Ride Time
                    </div>
                    <div>
                        {data.time}
                    </div>
                </div>
                <div className='grid'>
                    <div className='text-xl font-medium'>
                        Drop Location
                    </div>
                    <div>
                        {data.dropLocation}
                    </div>
                </div>

            </div>
            <div className='flex my-10 items-center justify-around mx-auto w-full max-w-6xl'>
                <button onClick={() => setOpencontact(true)} className='bg-[#6EDA48] px-20 py-1 rounded-md text-white font-medium'>View Contact</button>
            </div>
            {/* review */}
            {opencontact && <div className='w-full h-screen fixed grid place-items-center top-0 bg-[#0000009d]'>
                <div className='p-2 w-full max-w-lg bg-white'>
                    <div onClick={() => setOpencontact(false)} className='flex justify-end'>
                        <AiFillCloseCircle className='text-xl cursor-pointer' />
                    </div>
                    <div className='p-8 space-y-6 text-center'>
                        <div className='text-lg flex justify-center font-semibold'>Ride Details</div>
                        <img className='w-20 h-20 rounded-full object-cover mx-auto' src={data.vendorId.profile == null ? require("../asset/user.jpg") : data.vendorId.profile} />
                        <div className='flex justify-between'>
                            <div>
                                <div className='font-medium'>Driver Name</div>
                                <div className='text-sm'>{data.vendorId.firstName} {data.vendorId.lastName}</div>
                            </div>
                            <div>
                                <div className='font-medium'>Car Name</div>
                                <div className='text-sm'>{data.carId.vehicleModel}</div>
                            </div>
                            <div>
                                <div className='font-medium'>Time</div>
                                <div className='text-sm'>{data.time}</div>
                            </div>
                        </div>
                        <div className='flex justify-around'>
                            <div>
                                <div className='font-medium'>Fare Price</div>
                                <div className='text-sm'>₹{data.price}</div>
                            </div>
                            <div>
                                <div className='font-medium'>Contact Number</div>
                                <div className='text-sm'>+91 {!show ? "xxxxxxxxxx" : data.vendorId.phno}</div>
                            </div>
                        </div>
                        <div className='flex justify-between w-full'>
                            {show ?
                                <button onClick={() => navigate("/user_chat/u_chat", { state: data.vendorId._id })} className='bg-[#216cdd] w-2/3 mx-auto py-1 rounded-md text-white font-medium'>Chat Now</button> :
                                <button onClick={book} className='bg-[#6EDA48] w-2/3 mx-auto py-1 rounded-md text-white font-medium'>Show Contact</button>}
                        </div>
                    </div>
                </div>
            </div>}

        </>
    )
}
