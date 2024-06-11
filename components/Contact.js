import React, { useEffect, useState } from 'react'
import { CiLocationOn } from 'react-icons/ci';
import { BiMobile } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { Loader } from '../loader/Loader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export const Contact = () => {
  const [firstName, setFirstname] = useState()
  const [lastName, setLastname] = useState()
  const [email, setEmail] = useState()
  const [phno, setPhon] = useState()
  const [message, setMessage] = useState()
  const [map, setMap] = useState(true)
  const navigate = useNavigate()

  const send = async () => {
    const data = { firstName, lastName, email, phno, message }
    if (firstName && lastName && email && phno && message) {
      await axios.post("https://sparkstoideas.daddy11.in/contact/sendContact", data)
        .then(res => {
          if (res.data.success == 1) {
            toast.success(res.data.message)
            setFirstname("")
            setLastname("")
            setEmail("")
            setPhon("")
            setMessage("")
          } else {
            toast.error(res.data.message)
            setFirstname("")
            setLastname("")
            setEmail("")
            setPhon("")
            setMessage("")
          }
        })
        .catch(err => console.log(err))
    } else {
      toast.warning('Please Enter the valid details.')
    }
  }


  useEffect(() => {
    setTimeout(() => {
      setMap(false)
    }, 2000);
  }, [])

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      <div className='h-[300px] bg-center bg-cover' style={{ backgroundImage: `url(${require('../asset/car-bg.png')})` }} >
        <div className='bg-[#00000094] text-white font-semibold text-4xl flex justify-center items-center w-full h-full'>
          Contact Us
        </div>
      </div>
      <div className='sm:flex mt-20 mb-10 w-full max-w-6xl mx-auto sm:space-x-4 sm:space-y-0 space-y-4 justify-around p-4'>
        <div className='w-full bg-[#F2F2F2] border-2 space-y-4 rounded-lg sm:max-w-[300px] p-4 items-center'>
          <div className=''>
            <CiLocationOn className='text-6xl mx-auto text-green-400' />
          </div>
          <div className=' text-center space-y-4'>
            <span className='text-center text-2xl font-semibold'>Address :</span>
            <div className='text-[#949494]'>406 Akshat Tower, Nr. Pakwan Hotel, Opp. Rajpath Club, Sarkhej - Gandhinagar Highway, Ahmedabad - 380054</div>
          </div>
        </div>
        <div className='w-full bg-[#F2F2F2] border-2 space-y-4 rounded-lg sm:max-w-[300px] p-4 items-center'>
          <div className=''>
            <BiMobile className='text-6xl mx-auto text-green-400' />
          </div>
          <div className=' text-center space-y-4'>
            <span className='text-center text-2xl font-semibold'>Mobile Number :</span>
            <div className='text-[#949494] text-center'>
              <div>+916354183770</div>
              <div>+916354183770</div>
            </div>
          </div>
        </div>
        <div className='w-full bg-[#F2F2F2] border-2 space-y-4 rounded-lg sm:max-w-[300px] p-4 items-center'>
          <div className=''>
            <AiOutlineMail className='text-6xl mx-auto text-green-400' />
          </div>
          <div className=' text-center space-y-4'>
            <span className='text-center text-2xl font-semibold'>Email :</span>
            <div className='text-[#949494]'>Info@anniecab.com</div>
          </div>
        </div>
      </div>

      {/* map */}

      <div className='flex justify-between max-w-6xl mx-auto p-4 space-y-20'>
        <div className='w-full sm:space-x-8 sm:flex justify-around'>
          <div className='sm:w-1/2 space-y-2'>
            <div className='text-2xl pb-4 font-medium'>Send us an Email</div>
            <div className='md:flex w-full md:space-x-3'>
              <div className='grid space-y-2 w-full'>
                <label className='font-semibold text-sm'>First Name</label>
                <input className='bg-[#F2F2F2] w-full rounded-md p-2' type='text' value={firstName} onChange={e => setFirstname(e.target.value)} />
              </div>
              <div className='grid space-y-2 w-full'>
                <label className='font-semibold text-sm'>Last Name</label>
                <input className='bg-[#F2F2F2] w-full rounded-md p-2' type='text' value={lastName} onChange={e => setLastname(e.target.value)} />
              </div>
            </div>
            <div className='grid w-full space-y-2'>
              <label className='font-semibold text-sm'>Email</label>
              <input type='email' className='bg-[#F2F2F2] w-full rounded-md p-2' value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className='grid w-full space-y-2'>
              <label className='font-semibold text-sm'>Mobile Number</label>
              <input type='text' className='bg-[#F2F2F2]  w-full rounded-md p-2' value={phno} onChange={e => setPhon(e.target.value)} />
            </div>
            <div className='grid w-full space-y-2'>
              <label className='font-semibold text-sm'>Comment or Message</label>
              <textarea type="textarea" className='bg-[#F2F2F2]  w-full rounded-md p-2' rows="3" value={message} onChange={e => setMessage(e.target.value)} />
            </div>
            <div className='text-center w-full'>
              <button onClick={send} className='bg-[#6EDA48] w-full my-5 py-1 px-6 rounded-md text-white text-lg'>Submit</button>
            </div>
          </div>
          <div className='sm:w-1/2 border'>
            {map ? <div className='w-full h-full grid place-items-center'>
              <div className=''>
                <img className='w-56' src={require('../asset/animation_loh2i593_small.gif')} />
              </div>
            </div> : <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  src="https://maps.google.com/maps?q=sparkstoideas&t=&z=12&ie=UTF8&iwloc=&output=embed"
                  frameBorder={0}
                  scrolling="no"
                  className='w-full h-full'
                />
                {/* <style
                  dangerouslySetInnerHTML={{
                    __html:
                      ".mapouter{position:relative;height:400px;width:430px;background:#fff;}"
                  }}
                /> */}
                <a
                  href="https://blooketjoin.org"
                  style={{
                    color: "#fff !important",
                    position: "absolute !important",
                    top: "0 !important",
                    zIndex: "0 !important"
                  }}
                >
                  blooket join
                </a>
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      ".gmap_canvas{overflow:hidden;height:482px;}.gmap_canvas iframe{position:relative;z-index:2}"
                  }}
                />
              </div>
            </div>}
          </div>
        </div>
      </div>
    </>
  )
}
