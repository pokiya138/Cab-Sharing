import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PiArrowsLeftRightBold } from 'react-icons/pi';
import Loader from '../../loader/Loader';
import { useNavigate } from 'react-router-dom';

export const Vender_Ride_inquiry = () => {
    const [data, setdata] = useState()
    const navigate = useNavigate()
    const id = JSON.parse(localStorage.getItem('session_vid'))
    useEffect(() => {
        (async () => {
            await axios.get(`https://sparkstoideas.daddy11.in/ride/venderInquiry/${id}`)
                .then(res => {
                    console.log(res)
                    setdata(res.data.result)
                })
                .catch(err => console.log(err))
        })()
    }, [])
    console.log(data)
    return (
        <>
            {!data && <Loader />}
            <div className='w-full max-w-6xl mx-auto md:p-10'>
                <div className='text-xl justify-center sm:justify-normal flex items-center font-bold p-4'>
                    <div className='flax items-center'>Total Your Ride: <span className='text-slate-300'>{data?.length}</span></div>
                </div>
                <div className='h-[2px] bg-slate-300'></div>
                <div className='my-6 md:p-4 flex flex-wrap justify-center w-full'>
                    {data?.reverse().map((e, i) => {
                        const ee = e.carId
                        return (
                            <div key={i} onClick={() => navigate("/ride_book", { state: e })} className='border-2 rounded-lg shadow-lg w-full max-w-md m-4'>
                                <div className='p-4 grid'>
                                    <div className='text-right text-[#726d6d] text-sm font-medium'>{e.date}</div>
                                    <div className='flex items-center'>
                                        <img className='w-16 h-16 rounded-full object-cover' src={ee.vehicleImg} />
                                        <div className='grid'>
                                            <h2 className='text-lg w-full px-10 font-semibold'>{ee.vehicleModel}</h2>
                                            <h2 className='text-sm w-full px-10 font-medium'>{ee.vehicleNumber}</h2>
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
                                            {e.pickupLocation}
                                        </div>
                                    </div>
                                    <PiArrowsLeftRightBold className='text-5xl' />
                                    <div className='w-full gird text-center'>
                                        <div className='text-[#726d6d]'>
                                            TO
                                        </div>
                                        <div className='font-medium'>
                                            {e.dropLocation}
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
