import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PiArrowsLeftRightBold } from 'react-icons/pi';
import Loader from '../../loader/Loader';

export const RideBooking = () => {
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState()
    const { state } = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            setLoader(true)
            console.log(state)
            await axios.get(`https://sparkstoideas.daddy11.in/booking/get_venderbooking/${state._id}`)
                .then(res => {
                    console.log(res.data.result)
                    setData(res.data.result)
                    setLoader(false)
                })
                .catch(err => console.log(err))
        })()
    }, [])

    return (
        <>
            {loader && <Loader />}
            <div>
                <div className='p-8'>
                    <div className='flex items-center text-2xl font-semibold'>{state.pickupLocation}<PiArrowsLeftRightBold className='mx-2' />{state.dropLocation}</div>
                    <div className='flex items-center text-lg font-medium'>{state.date} | {state.time}</div>
                    <div className='flex items-center text-lg font-medium'>Price: ₹{state.price}</div>
                    <div className='flex items-center text-lg font-medium'>Available Seat: {state.availableSeat}</div>
                    <div className='p-4 border-t-2 border-gray-500 my-2'>
                        {data?.length == 0 ? <div className='bg-[#f3f3f1] p-6 text-center text-xl font-medium rounded-md'>No Inquiry Found</div> :
                            <>
                                <div className='my-2 underline underline-offset-2'>Total Inquiry {data?.length}</div>
                                <div className="relative overflow-x-auto">
                                    <table className="w-full text-sm text-left rtl:text-right bg-[#f3f3f1]">
                                        <thead className="text-xs text-gray-700 uppercase">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 border border-black">
                                                    Index
                                                </th>
                                                <th scope="col" className="px-6 py-3 border border-black">
                                                    profile
                                                </th>
                                                <th scope="col" className="px-6 py-3 border border-black">
                                                    firstName
                                                </th>
                                                <th scope="col" className="px-6 py-3 border border-black">
                                                    lastName
                                                </th>
                                                <th scope="col" className="px-6 py-3 border border-black">
                                                    email
                                                </th>
                                                <th scope="col" className="px-6 py-3 border border-black">
                                                    Phone number
                                                </th>
                                                <th scope="col" className="px-6 py-3 border border-black">
                                                    Chat
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.map((e, i) => {
                                                const ee = e.uid
                                                return (
                                                    <tr key={i} className="bg-[#f2f2f1] border-b dark:border-gray-700">
                                                        <th
                                                            scope="row"
                                                            className="px-6 border border-black py-4 font-medium text-gray-900 whitespace-nowrap"
                                                        >
                                                            {i + 1}
                                                        </th>
                                                        <td className="px-6 py-4 border border-black"><img className='w-12 h-12 rounded-full' src={ee.profile == null ? require("../../asset/user.jpg"):ee.profile} /></td>
                                                        <td className="px-6 py-4 border border-black">{ee.firstName}</td>
                                                        <td className="px-6 py-4 border border-black">{ee.lastName}</td>
                                                        <td className="px-6 py-4 border border-black">{ee.email}</td>
                                                        <td className="px-6 py-4 border border-black">{ee.phno}</td>
                                                        <td className="px-6 py-4 border border-black">
                                                            <button onClick={() => navigate("/user_chat/u_chat", { state: ee._id })} className='bg-green-600 py-1 px-4 rounded-md text-white font-medium'>Chat</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </>}
                    </div>
                </div>
            </div>
        </>
    )
}
