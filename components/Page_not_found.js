import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Page_not_found = () => {
    const navigate = useNavigate()
    const id = sessionStorage.getItem("session_id")

    const aa = () => {
        if (id) {
            navigate("/admin")
        } else {
            navigate("/")
        }
    }
    return (
        <div className='fixed z-10 bg-white top-0 w-full h-screen grid place-items-center'>
            <div className='space-y-6'>
                <div className='text-5xl font-extrabold'>404 Page Not Found</div>
                <div className='text-center'>
                    <button onClick={aa} className='bg-green-600 p-2 text-xl text-white font-medium rounded-md'>Home Page</button>
                </div>
            </div>
        </div>
    )
}
