import axios from 'axios';
import React, { useState } from 'react'
import { BiShowAlt } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectUser } from '../../../store/services/authSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../loader/Loader';

export const Changepassword = () => {
    const [password, setPassword] = useState()
    const [newPassword, setNewpassword] = useState()
    const [confirmnewpassword, setConfirmnewpassword] = useState()
    const [visibale, setVisibale] = useState(false);
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()

    const userdata = useSelector(selectUser)

    console.log(userdata?._id)
    const updatepassword = async () => {
        if (localStorage.getItem("session_vid")) {
            if (newPassword && confirmnewpassword) {
                if (newPassword == confirmnewpassword) {
                    setLoader(true)
                    const data = { password, newPassword }
                    axios.post(`https://sparkstoideas.daddy11.in/vender/updatePassword/${userdata._id}`, data)
                        .then(res => {
                            if (res.data.success == 1) {
                                setPassword("")
                                setNewpassword("")
                                setConfirmnewpassword("")
                                setLoader(false)
                                toast.success(res.data.message)
                            } else {
                                setLoader(false)
                                toast.error(res.data.message)
                            }
                        })
                        .catch(err => console.log(err))
                } else {
                    toast.warning("Please Enter Newpassword and Confirmpassword Are Same")
                }
            } else {
                toast.warning("Please Enter Details")
            }
        }
        if (localStorage.getItem("session_uid")) {
            if (newPassword && confirmnewpassword) {
                if (newPassword == confirmnewpassword) {
                    setLoader(true)
                    const data = { password, newPassword }
                    axios.patch(`https://sparkstoideas.daddy11.in/user/updatePassword/${userdata._id}`, data)
                        .then(res => {
                            if (res.data.success == 1) {
                                setPassword("")
                                setNewpassword("")
                                setConfirmnewpassword("")
                                setLoader(false)
                                toast.success(res.data.message)
                            } else {
                                setLoader(false)
                                toast.error(res.data.message)
                            }
                        })
                        .catch(err => console.log(err))
                } else {
                    toast.warning("Please Enter Newpassword and Confirmpassword Are Same")
                }
            } else {
                toast.warning("Please Enter Details")
            }
        }
    }
    return (
        <>
            {loader && <Loader />}
            <div className='w-full max-w-md sm:border-2 border-slate-300 rounded-md p-8 mx-auto my-10'>
                <div className='space-y-10'>
                    <div className='flex w-full justify-center text-lg font-bold'>
                        Change Password
                    </div>
                    <div className='space-y-2'>
                        <div className='grid'>
                            <div className='grid space-y-1 w-full'>
                                <label className='text-sm font-medium'>Old Password</label>
                                <div className='flex bg-[#F2F2F2] items-center rounded-md'>
                                    <input className='bg-[#F2F2F2] p-2 rounded-md text-sm w-full' placeholder='Enter Old Password' type={visibale == true ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} />
                                    {visibale ? (
                                        <BiShowAlt
                                            className="text-lg mx-2 cursor-pointer"
                                            onClick={() => setVisibale(false)}
                                        />
                                    ) : (
                                        <BiHide
                                            className="text-lg mx-2 cursor-pointer"
                                            onClick={() => setVisibale(true)}
                                        />
                                    )}
                                </div>

                            </div>
                        </div>
                        <div className='grid'>
                            <div className='grid space-y-1 w-full'>
                                <label className='text-sm font-medium'>New Password</label>
                                <div className='flex bg-[#F2F2F2] items-center rounded-md'>
                                    <input className='bg-[#F2F2F2] p-2 rounded-md text-sm w-full' placeholder='Enter New Password' type={visibale == true ? "text" : "password"} value={newPassword} onChange={e => setNewpassword(e.target.value)} />
                                    {visibale ? (
                                        <BiShowAlt
                                            className="text-lg mx-2 cursor-pointer"
                                            onClick={() => setVisibale(false)}
                                        />
                                    ) : (
                                        <BiHide
                                            className="text-lg mx-2 cursor-pointer"
                                            onClick={() => setVisibale(true)}
                                        />
                                    )}
                                </div>

                            </div>
                        </div>
                        <div className='grid'>
                            <div className='grid space-y-1 w-full'>
                                <label className='text-sm font-medium'>Confirm New Password</label>
                                <div className='flex bg-[#F2F2F2] items-center rounded-md'>
                                    <input className='bg-[#F2F2F2] p-2 rounded-md text-sm w-full' placeholder='Confirm New Password' type={visibale == true ? "text" : "password"} value={confirmnewpassword} onChange={e => setConfirmnewpassword(e.target.value)} />
                                    {visibale ? (
                                        <BiShowAlt
                                            className="text-lg mx-2 cursor-pointer"
                                            onClick={() => setVisibale(false)}
                                        />
                                    ) : (
                                        <BiHide
                                            className="text-lg mx-2 cursor-pointer"
                                            onClick={() => setVisibale(true)}
                                        />
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                    <button onClick={updatepassword} className='bg-[#6EDA48] w-full py-2 font-bold rounded-md'>Save</button>
                </div>
            </div>
        </>
    )
}
