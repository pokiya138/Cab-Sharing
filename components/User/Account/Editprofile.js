import React, { useRef, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai';
import { useEffect } from 'react';
import axios from 'axios';
import Loader from '../../../loader/Loader';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/services/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Editprofile = () => {
    const [firstName, setFirstname] = useState()
    const [lastName, setLastname] = useState()
    const [phon, setPhon] = useState()
    const [email, setEmail] = useState()
    const [address, setAddress] = useState()
    const [profile, setProfile] = useState()
    const [loader, setLoader] = useState(false)
    const inputRef = useRef()
    const navigate = useNavigate()
    const formdata = new FormData()
    const [a, setA] = useState(0)

    const data = useSelector(selectUser)

    useEffect(() => {
        if (a == 0) {
            setLoader(true)
            setFirstname(data?.firstName)
            setLastname(data?.lastName)
            setPhon(data?.phno)
            setEmail(data?.email)
            setAddress(data?.address)
            if (data) {
                setLoader(false)
                setA(1)
            }
        }
    })

    useEffect(() => {
        if (localStorage.getItem("session_vid")) {
            if (profile) {
                (async () => {
                    setLoader(true)
                    formdata.append("venderProfile", profile)
                    if (formdata) {
                        await axios.post(`https://sparkstoideas.daddy11.in/vender/venderProfile/${data._id}`, formdata)
                            .then(res => {
                                if (res.data.success == 1) {
                                    setLoader(false)
                                    toast.success(res.data.message)
                                } else {
                                    setLoader(false)
                                    toast.error(res.data.message)
                                }
                            })
                            .catch(err => console.log(err))
                    }
                })()
            }
        }
        if (localStorage.getItem("session_uid")) {
            if (profile) {
                (async () => {
                    setLoader(true)
                    formdata.append("profile", profile)
                    if (formdata) {
                        await axios.post(`https://sparkstoideas.daddy11.in/user/profileUpdate/${data._id}`, formdata)
                            .then(res => {
                                if (res.data.success == 1) {
                                    setLoader(false)
                                    toast.success(res.data.message)
                                } else {
                                    setLoader(false)
                                    toast.error(res.data.message)
                                }
                            })
                            .catch(err => console.log(err))
                    }
                })()
            }
        }
    }, [profile])

    const update = async (e) => {
        e.preventDefault()
        const updatedata = { firstName, lastName, email, address }
        if (localStorage.getItem("session_vid")) {
            await axios.patch(`https://sparkstoideas.daddy11.in/vender/update/${data._id}`, updatedata)
                .then(res => {
                    if (res.data.success == 1) {
                        toast.success(res.data.message)
                    }
                    else {
                        toast.warning(res.data.message)
                    }
                })
                .catch(err => console.log(err))
        }
        if (localStorage.getItem("session_uid")) {
            await axios.patch(`https://sparkstoideas.daddy11.in/user/updateUser/${data._id}`, updatedata)
                .then(res => {
                    if (res.data.success == 1) {
                        toast.success(res.data.message)
                    }
                    else {
                        toast.warning(res.data.message)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            {loader && <Loader />}
            <div className='w-full max-w-md sm:border-2 border-slate-300 rounded-md p-6 mx-auto my-10'>
                <form onSubmit={update} className='space-y-8'>
                    <div onClick={() => inputRef.current.click()} className='flex w-full justify-center items-end'>
                        <input ref={inputRef} onChange={(e) => setProfile(e.target.files[0])} className='hidden' type='file' />
                        <img className='w-20 h-20  rounded-full' src={data?.profile == null ? require('../../../asset/user.jpg') : data?.profile} />
                        <AiOutlineCamera className='-ml-6 rounded-full bg-green-400' />
                    </div>
                    <div className='space-y-2'>
                        <div className='grid'>
                            <label className='text-sm font-medium'>First Name</label>
                            <input className='bg-[#F2F2F2] p-2 rounded-md text-sm text-[#413d3d]' type='text' onChange={e => setFirstname(e.target.value)} value={firstName} />
                        </div>
                        <div className='grid'>
                            <label className='text-sm font-medium'>Last Name</label>
                            <input className='bg-[#F2F2F2] p-2 rounded-md text-sm text-[#413d3d]' type='text' value={lastName} onChange={e => setLastname(e.target.value)} />
                        </div>
                        <div className='grid'>
                            <label className='text-sm font-medium'>Mobile Number</label>
                            <input className='bg-[#726d6d] cursor-not-allowed p-2 rounded-md text-sm text-[#413d3d]' type='text' value={phon} disabled />
                        </div>
                        <div className='grid'>
                            <label className='text-sm font-medium'>Email</label>
                            <input className='bg-[#F2F2F2] p-2 rounded-md text-sm text-[#413d3d]' type='text' value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='grid'>
                            <label className='text-sm font-medium'>Address</label>
                            <input className='bg-[#F2F2F2] p-2 rounded-md text-sm text-[#413d3d]' type='text' value={address} onChange={e => setAddress(e.target.value)} />
                        </div>
                    </div>
                    <button className='bg-[#6EDA48] w-full py-2 font-bold rounded-md'>Save</button>
                </form>
            </div>
        </>
    )
}
