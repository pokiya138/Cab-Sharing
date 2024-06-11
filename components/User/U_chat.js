import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useFetcher, useLocation } from 'react-router-dom';
import { selectUser } from '../../store/services/authSlice';

export const U_chat = () => {
    const { state } = useLocation()
    const [sender_id, setSender_id] = useState(JSON.parse(localStorage.getItem("session_uid") ?? localStorage.getItem("session_vid")))
    const [receiver_id, setReceiver_id] = useState(state)
    const [message, setMesage] = useState()
    const [loader, setLoader] = useState(true)
    const [data, setdata] = useState()
    const [a, setA] = useState(1)

    const chatRef = useRef()

    useEffect(() => {
        (async () => {
            const aa = { sender_id, receiver_id }
            if (localStorage.getItem("session_uid")) {
                await axios.post("https://sparkstoideas.daddy11.in/chat/getchatByUser", aa)
                    .then(res => {
                        // console.log(res.data)
                        setdata(res.data)
                        setLoader(false)
                    })
                    .catch(err => console.log(err))
            } if (localStorage.getItem("session_vid")) {
                await axios.post("https://sparkstoideas.daddy11.in/chat/getchatByVender", aa)
                    .then(res => {
                        // console.log(res.data)
                        setdata(res.data)
                        setLoader(false)
                    })
                    .catch(err => console.log(err))
            }
        })()
    })

    useEffect(() => {
        (async () => {
            const aa = { sender_id, receiver_id }
            await axios.post("http://sparkstoideas.daddy11.in/chat/readMessage", aa)
                .then(res => { })
                .catch(err => console.log(err))
        })()
    }, [data])

    const send = async (e) => {
        e.preventDefault()
        const aa = { sender_id, receiver_id, message }
        console.log(aa)
        setMesage("")
        if (message) {
            await axios.post("https://sparkstoideas.daddy11.in/chat/sendMessage", aa)
                .then(res => {
                    console.log(res)
                })
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        if (a == 1) {
            if (data) {
                chatRef.current.scrollIntoView({ behavior: "smooth" })
                setA(0)
            }
        }
    });

    const userimg = useSelector(selectUser)

    return (
        <>
            <div ref={chatRef} className='w-full h-full flex'>
                {loader ? <div className='w-full h-full grid place-items-center'> <img className='' src={require('../../asset/animation_loh2i593_small.gif')} /></div> :
                    <div className='w-full h-screen'>
                        <div className='bg-[#6EDA48] h-[8vh] flex items-center px-5 py-2'>
                            <img className='w-10 h-10 rounded-full object-cover' src={data?.info?.profile == null ? require("../../asset/user.jpg") : data.info.profile} />
                            <div className='font-medium pl-4 text-xl'>{data?.info?.firstName} {data?.info?.lastName}</div>
                        </div>
                        <div className='bg-[#f3f3f1]'>
                            <div className='h-[84vh] overflow-y-scroll'>
                                {data?.data.map((e, i) => {
                                    let yd = new Date()
                                    yd.setDate(yd.getDate() - 1);
                                    const yesterday = new Date(yd).toLocaleDateString()
                                    const lastdate = new Date(i == 0 ? "10/10/2010" : data.data[i - 1].createAt).toLocaleDateString()
                                    const date = new Date(e.createAt).toLocaleDateString()
                                    const time = new Date(e.createAt).toTimeString().slice(0, 5)
                                    return (
                                        <div key={i} className='p-1'>
                                            {lastdate == date ? null : <div className='text-center font-bold'>{new Date().toLocaleDateString() == date ? "Today" : yesterday == date ? "Yesterday" : date}</div>}
                                            {sender_id == e.sender_id ? <>
                                                <div className='flex justify-end'>
                                                    <div className='grid'>
                                                        <div className='flex items-center space-x-2'>
                                                            <div className='bg-[#6EDA48] font-medium py-2 px-4 rounded-md flex justify-center'>{e.message}</div>
                                                            <img className='w-6 h-6 rounded-full' src={userimg?.profile == null ? require('../../asset/user.jpg'):userimg.profile} />
                                                        </div>
                                                        <div className='ml-auto text-[#726d6d]'>{time}</div>
                                                    </div>
                                                </div>
                                            </> :
                                                <>
                                                    <div className='flex justify-normal'>
                                                        <div className='grid'>
                                                            <div className='flex items-center space-x-2'>
                                                                <img className='w-6 h-6 rounded-full' src={data?.info?.profile == null ? require('../../asset/user.jpg'):data.info.profile} />
                                                                <div className='bg-white font-medium py-2 px-4 rounded-md flex justify-center'>{e.message}</div>
                                                            </div>
                                                            <div className='text-[#726d6d]'>{time}</div>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    )
                                })}
                                {/* <div ref={messageRef} /> */}
                            </div>
                            <form onSubmit={send} className='p-1 h-[8vh] flex  rounded space-x-2'>
                                <input value={message} onChange={e => setMesage(e.target.value)} className='w-full bg-[#F2F2F2] p-2 rounded font-semibold' type='text' placeholder='type' />
                                <button className='bg-[#2fad46] p-2 font-semibold rounded-md'>Send</button>
                            </form>
                        </div>
                    </div>}
            </div>
        </>
    )
}
