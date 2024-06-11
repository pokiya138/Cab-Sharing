import React, { useState } from 'react'
import { BiShowAlt } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import img from '../../asset/Screenshot_2023-10-25_163132-transformed_auto_x2.jpg'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { toast } from 'react-toastify';

export const VRegister = () => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [visibale, setVisibale] = useState(false);

    const vendorSchema = Yup.object({
        firstName: Yup.string().min(2).required("Please Enter Your firstname"),
        lastName: Yup.string().min(2).required("Please Enter Your lastname"),
        phno: Yup.string().matches(/^[6-9]\d{9}$/, { message: "Please enter valid number.", excludeEmptyString: false }).required("Please enter your number"),
        email: Yup.string().email().required("Please enter your Email"),
        password: Yup
            .string()
            .min(6)
            // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/, {
            //     message: 'password should contain at least 1 lower case letter, 1 upper case letter, 1 digit and 1 symbol'
            // },)
            .required("Please enter your Password"),
        confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match")
    })

    const { values, touched, errors, handleSubmit, handleBlur, handleChange } = useFormik({
        initialValues: { firstName: "", lastName: "", phno: "", email: "", password: "", confirmpassword: "" },
        validationSchema: vendorSchema,
        onSubmit: async (data, action) => {
            delete data.confirmpassword
            setLoader(true)
            await axios.post("https://sparkstoideas.daddy11.in/vender/register", data)
                .then(res => {
                    console.log(res)
                    if (res.data.success == 1) {
                        navigate("/v_login")
                        setLoader(false)
                    }
                    else {
                        setLoader(false)
                        toast.error(res.data.message)
                    }
                })
                .catch(err => {
                    setLoader(false)
                    console.log(err)
                })
        }
    })
    console.log(errors)
    return (
        <>
            <div className='sm:p-8 w-full rounded-md'>
                <div style={{ backgroundImage: `url(${img})` }} className="bg-cover rounded-md bg-center w-full">
                    < div className='w-full rounded-md bg-[#00000036] grid place-items-center' >
                        <div className='w-full px-2 py-4 max-w-sm'>
                            <div className='p-4 w-full rounded-md  bg-[#ffffff8c] space-y-8'>
                                <div className='flex rounded-md w-full bg-white hover:cursor-pointer'>
                                    <div onClick={() => navigate('/register')} className='w-full text-center  font-medium p-2 rounded-md'>User</div>
                                    <div className='w-full text-center p-2 rounded-md font-medium text-white bg-[#6EDA48]'>Vendor</div>
                                </div>
                                <form onSubmit={handleSubmit} className='space-y-4'>
                                    <div className='grid'>
                                        <label className='font-medium text-sm'>First Name</label>
                                        <input className='p-3 w-full text-sm rounded-md' placeholder='First Name' type='text' name='firstName' value={values.firstName} onBlur={handleBlur} onChange={handleChange} />
                                        {errors.firstName && touched.firstName ? <p className='text-xs text-red-700'>{errors.firstName}</p> : null}
                                    </div>
                                    <div className='grid'>
                                        <label className='font-medium text-sm'>Last Name</label>
                                        <input className='p-3 w-full text-sm rounded-md' placeholder='Last Name' type='text' name='lastName' value={values.lastName} onBlur={handleBlur} onChange={handleChange} />
                                        {errors.lastName && touched.lastName ? <p className='text-xs text-red-700'>{errors.lastName}</p> : null}
                                    </div>
                                    <div className='grid'>
                                        <label className='font-medium text-sm'>Email</label>
                                        <input className='p-3 text-sm rounded-md' placeholder='Email' type='email' name='email' value={values.email} onBlur={handleBlur} onChange={handleChange} />
                                        {errors.email && touched.email ? <p className='text-xs text-red-700'>{errors.email}</p> : null}
                                    </div>
                                    <div className='grid'>
                                        <label className='font-medium text-sm'>Mobile No.</label>
                                        <input className='p-3 text-sm rounded-md' placeholder='Mobile No.' type='text' name='phno' value={values.phno} onBlur={handleBlur} onChange={handleChange} />
                                        {errors.phno && touched.phno ? <p className='text-xs text-red-700'>{errors.phno}</p> : null}
                                    </div>
                                    <div className='grid'>
                                        <label className='font-medium text-sm'>Password</label>
                                        <div className='flex w-full bg-white items-center rounded-md'>
                                            <input className='p-3 w-full text-sm rounded-md' placeholder='Password' type={visibale == true ? "text" : "password"} name='password' value={values.password} onBlur={handleBlur} onChange={handleChange} />
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
                                        {errors.password && touched.password ? <p className='text-xs text-red-700'>{errors.password}</p> : null}
                                    </div>
                                    <div className='grid'>
                                        <label className='font-medium text-sm'>Confirm Password</label>
                                        <div className='flex w-full bg-white items-center rounded-md'>
                                            <input className='p-3 w-full text-sm rounded-md' placeholder='Confirm Password' type={visibale == true ? "text" : "password"} name='confirmpassword' value={values.confirmpassword} onBlur={handleBlur} onChange={handleChange} />
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
                                        {errors.confirmpassword && touched.confirmpassword ? <p className='text-xs text-red-700'>{errors.confirmpassword}</p> : null}
                                    </div>
                                    <button type='submit' className='w-full p-2 text-lg rounded-md font-bold bg-[#6EDA48]'>Register</button>
                                </form>
                                <div className='text-sm font-semibold text-center'>Already have an account?<span onClick={() => navigate('/v_login')} className='text-[#6EDA48] hover:cursor-pointer'> Login</span></div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}
