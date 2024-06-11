import React, { useEffect, useRef, useState } from 'react'
import { Vehicle } from '../../Admin/Vehicle'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../../loader/Loader'

export const Myvehicel = () => {
    const [loader, setLoader] = useState(false)
    const [open, setopen] = useState(false)
    const [vehicleBrand, setVehicleBrand] = useState()
    const [vehicleModel, setVehicleModel] = useState()
    const [vehicleImg, setVehicleImg] = useState()
    const [vehicleNumber, setVehicleNumber] = useState()
    const [puc, setPuc] = useState()
    const [vehicleInsurance, setVehicleInsurance] = useState()
    const [vehicleRC, setVehicleRC] = useState()
    const inputRef1 = useRef()
    const inputRef2 = useRef()
    const inputRef3 = useRef()
    const inputRef4 = useRef()
    const [key, setKey] = useState()
    const vendorID = JSON.parse(localStorage.getItem("session_vid"))
    const brand = [
        {
            Brand: "Maruti Suzuki",
            Model: ["swift", "wagon R", "Ertiga"]
        },
        {
            Brand: "Hyundai",
            Model: ["i-20", "varna"]
        },
        {
            Brand: "BMW",
            Model: ["x3", "x5"]
        },
        {
            Brand: "Audi",
            Model: ["Q3", "Q5"]
        },
        {
            Brand: "Tata",
            Model: ["Nexon", "Safari", "Harrier"]
        },
        {
            Brand: "Toyota",
            Model: ["Fortuner", "Innova"]
        }
    ]

    useEffect(() => {
        if (key) {
            setVehicleBrand(brand[key].Brand)
        }
    }, [key])

    const data = new FormData()

    const upload = async () => {
        data.append("vehicleBrand", vehicleBrand)
        data.append("vehicleModel", vehicleModel)
        data.append("vehicleImg", vehicleImg)
        data.append("vehicleNumber", vehicleNumber)
        data.append("puc", puc)
        data.append("vehicleInsurance", vehicleInsurance)
        data.append("vehicleRC", vehicleRC)
        data.append("vendorID", vendorID)
        if (vehicleBrand && vehicleModel && vehicleImg && vehicleNumber && puc && vehicleInsurance && vehicleRC && vendorID) {
            setLoader(true)
            axios.post("https://sparkstoideas.daddy11.in/addVehicle/vehicleAdd", data)
                .then(res => {
                    console.log(res)
                    if (res.data.success == 1) {
                        toast.success(res.data.message)
                        window.location.reload()
                    } else {
                        setLoader(false)
                        toast.error("Fail to upload")
                    }
                })
                .catch(err => console.log(err))
        }
        else {
            toast.warning("Please Fill all details")
        }

    }
    return (
        <>
            {loader && <Loader />}
            <div className='p-10 flex max-h-max w-full space-x-4'>
                <div className='h-full w-full bg-[#f3f3f1] max-w-xs text-center rounded-md'>
                    <div onClick={() => setopen(false)} className={`p-4 ${!open && "bg-green-300"} cursor-pointer text-lg font-medium`}>My Vehicle</div>
                    <div onClick={() => setopen(true)} className={`p-4 ${open && "bg-green-300"} cursor-pointer text-lg font-medium`}>Add Vehicle</div>
                </div>
                {!open ?
                    <div className='bg-[#f3f3f1] p-4 w-full'>
                        <Vehicle />
                    </div>
                    :
                    <div className='bg-[#f3f3f1] p-4 w-full space-y-4'>
                        <div className='flex space-x-5'>
                            <div className='grid'>
                                <label>Vehicle Brand</label>
                                <select onChange={(e) => setKey(e.target.value)} className='max-w-max'>
                                    <option value={null} selected disabled={key}>select</option>
                                    {brand.map((a, i) => {
                                        return (
                                            <option value={i} key={i}>{a.Brand}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            {key && <div className='grid'>
                                <label>Vehicle Model</label>
                                <select value={vehicleModel} onChange={e => setVehicleModel(e.target.value)} className='max-w-max'>
                                    <option disabled={vehicleModel}>Select</option>
                                    {brand[key].Model.map((a, i) => {
                                        return (
                                            <option value={a} key={i}>{a}</option>
                                        )
                                    })}
                                </select>
                            </div>}
                        </div>
                        <div className='grid'>
                            <label>vehicleNumber</label>
                            <input value={vehicleNumber} onChange={e => setVehicleNumber(e.target.value)} type='text' className='border rounded-lg' />
                        </div>
                        <div className='space-y-8 my-8'>
                            <div className='flex w-full justify-around'>
                                <div>
                                    <div onClick={e => inputRef1.current.click()} className='border-2 p-2 cursor-pointer bg-gray-300 w-full h-48 rounded-lg max-w-sm grid place-items-center border-slate-700 border-dashed'>
                                        <input ref={inputRef1} onChange={e => setVehicleImg(e.target.files[0])} className='hidden' type='file' />
                                        {!vehicleImg ? <div className='max-w-xs text-center'>
                                            <p className='font-bold'>click to upload.</p>
                                            <p>(This is just a demo dropzone. Selected files are <span className='font-medium'>not</span> actually uploaded.)</p>
                                        </div> :
                                            <img className='w-full min-w-xs h-44 rounded-lg' src={URL.createObjectURL(vehicleImg)} />}
                                    </div>
                                    <div className='text-center font-medium'>Vehicle Image</div>
                                </div>
                                <div>
                                    <div onClick={e => inputRef2.current.click()} className='border-2 cursor-pointer bg-gray-300 w-full h-48 rounded-lg max-w-sm grid place-items-center border-slate-700 border-dashed'>
                                        <input ref={inputRef2} onChange={e => setPuc(e.target.files[0])} className='hidden' type='file' />
                                        {!puc ? < div className='max-w-xs text-center'>
                                            <p className='font-bold'>click to upload.</p>
                                            <p>(This is just a demo dropzone. Selected files are <span className='font-medium'>not</span> actually uploaded.)</p>
                                        </div> :
                                            <img className='w-full min-w-xs h-44 rounded-lg' src={URL.createObjectURL(puc)} />}
                                    </div>
                                    <div className='text-center font-medium'>PUC Image</div>
                                </div>
                            </div>
                            <div className='flex w-full justify-around'>
                                <div>
                                    <div onClick={e => inputRef3.current.click()} className='border-2 cursor-pointer bg-gray-300 w-full h-48 rounded-lg max-w-sm grid place-items-center border-slate-700 border-dashed'>
                                        <input ref={inputRef3} onChange={e => setVehicleInsurance(e.target.files[0])} className='hidden' type='file' />
                                        {!vehicleInsurance ? <div className='max-w-xs text-center'>
                                            <p className='font-bold'>click to upload.</p>
                                            <p>(This is just a demo dropzone. Selected files are <span className='font-medium'>not</span> actually uploaded.)</p>
                                        </div> :
                                            <img className='w-full min-w-xs h-44 rounded-lg' src={URL.createObjectURL(vehicleInsurance)} />}
                                    </div>
                                    <div className='text-center font-medium'>Vehicle Insurance</div>
                                </div>
                                <div>
                                    <div onClick={e => inputRef4.current.click()} className='border-2 cursor-pointer bg-gray-300 w-full h-48 rounded-lg max-w-sm grid place-items-center border-slate-700 border-dashed'>
                                        <input ref={inputRef4} onChange={e => setVehicleRC(e.target.files[0])} className='hidden' type='file' />
                                        {!vehicleRC ? <div className='max-w-xs text-center'>
                                            <p className='font-bold'>click to upload.</p>
                                            <p>(This is just a demo dropzone. Selected files are <span className='font-medium'>not</span> actually uploaded.)</p>
                                        </div> :
                                            <img className='w-full min-w-xs h-44 rounded-lg' src={URL.createObjectURL(vehicleRC)} />}
                                    </div>
                                    <div className='text-center font-medium'>Vehicle Rc </div>
                                </div>
                            </div>
                        </div>
                        <div className='text-center'>
                            <button onClick={upload} className='bg-green-400 font-medium p-4 w-full max-w-md rounded-md'>Upload</button>
                        </div>
                    </div>
                }
            </div >
        </>
    )
}