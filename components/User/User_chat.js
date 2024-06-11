import React, { useEffect, useRef } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { U_chat } from './U_chat'

export const User_chat = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className=''>
                <div className='h-[200px]' style={{ backgroundImage: `url(${require('../../asset/user.png')})` }} >
                    <div className='bg-[#00000094] text-white font-semibold text-4xl flex justify-center items-center w-full h-full'>
                        Chats
                    </div>
                </div>
                <U_chat />
                {/* <div ref={chatRef} className='w-full flex my-2 border'>
                    <div className='p-2 max-w-[300px] border h-screen overflow-y-auto'>
                        <div onClick={() => navigate('/user_chat/u_chat')} className='grid rounded-md p-2 my-2 w-full hover:cursor-pointer'>
                            <div className='flex items-center w-full'>
                                <img className='w-12 h-10 mr-2 rounded-full object-cover' src={require('../../asset/2020_5$largeimg_574736406.jpeg')} />
                                <div className='w-full'>
                                    <div className='flex items-center'>
                                        <h2 className='font-medium'>Prince Khant</h2>
                                        <div className='ml-auto text-sm text-gray-300'>Today</div>
                                    </div>
                                    <div className='text-xs w-full text-gray-300'>It is a long established fact that a reader .</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <U_chat />
                    </div>
                </div> */}
            </div>
        </>
    )
}
