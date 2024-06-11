import React, { useEffect, useState } from 'react'
import { BiShowAlt } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import img from '../../asset/Screenshot_2023-10-25_163132-transformed_auto_x2.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Loader from '../../loader/Loader'
export const VLogin = () => {
    const [info, setInfo] = useState()
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()
    const [visibale, setVisibale] = useState(false);

    useEffect(() => {
        if (info) {
            if (info.data.success == 1) {
                localStorage.setItem("session_vid", JSON.stringify(info.data.Id))
                navigate("/")
                window.location.reload()
            }
            else {
                setLoader(false)
                toast.error(info.data.message)
            }
        }
    }, [info])

    const loginSchema = Yup.object({
        phone: Yup.string().matches(/^[6-9]\d{9}$/, { message: "Please enter valid number.", excludeEmptyString: false }).required("Please enter your number"),
        password: Yup.string().required("Please enter your password")
    })

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: { phone: "", password: "" },
        validationSchema: loginSchema,
        onSubmit: async (data, action) => {
            console.log(data)
            setLoader(true)
            await axios.post("https://sparkstoideas.daddy11.in/vender/login", { phno: data.phone, password: data.password })
                .then(res => setInfo(res))
                .catch(err => console.log(err))
            action.resetForm()
        }
    })
    return (
        <>
            {loader && <Loader />}
            <div className='sm:p-8 w-full rounded-md'>
                <div style={{ backgroundImage: `url(${img})` }} className="bg-cover rounded-md bg-center w-full">
                    < div className='w-full rounded-md bg-[#00000036] grid place-items-center h-[500px]' >
                        <div className='w-full max-w-sm px-3'>
                            <div className='p-4 w-full rounded-md  bg-[#ffffff8c] space-y-8'>
                                <div className='flex rounded-md w-full bg-white hover:cursor-pointer'>
                                    <div onClick={() => navigate("/login")} className='w-full  text-center  font-medium p-2 rounded-md'>User</div>
                                    <div className='w-full bg-[#6EDA48] text-white text-center p-2 rounded-md font-medium'>Vendor</div>
                                </div>
                                <form onSubmit={handleSubmit} autoComplete='off' className='space-y-4'>
                                    <div className='grid'>
                                        <label className='font-medium text-sm'>Mobile No.</label>
                                        <input className='p-3 text-sm rounded-md border-none focus:border-white' placeholder='Enter your number' name='phone' value={values.phone} onChange={handleChange} onBlur={handleBlur} autoComplete='off' />
                                        {errors.phone && touched.phone ? <p className='text-red-700 text-sm'>{errors.phone}</p> : null}
                                    </div>
                                    <div className='grid'>
                                        <label className='font-medium text-sm'>Password</label>
                                        <div className='flex w-full bg-white items-center rounded-md'>
                                            <input className='p-3 w-full border-none text-sm rounded-md' placeholder='Enter your password' name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} autoComplete='off' type={visibale == true ? "text" : "password"} />
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
                                        {errors.password && touched.password ? <p className='text-red-700 text-sm'>{errors.password}</p> : null}
                                        <span className='ml-auto text-sm font-semibold'>Forgot Password?</span>
                                    </div>
                                    <input type='submit' className='w-full p-2 text-lg rounded-md font-bold bg-[#6EDA48]' value="Login"></input>
                                </form>
                                <div className='text-sm font-semibold text-center'>Don’t have an account?<span onClick={() => navigate('/v_register')} className='text-[#6EDA48] hover:cursor-pointer'> Register</span></div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}
