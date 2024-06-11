import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../../loader/Loader'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const AddRide = () => {
  const [loader, setLoader] = useState(false)
  const [pickupLocation, setPickupLocation] = useState()
  const [dropLocation, setDropLocation] = useState()
  const [date, setDate] = useState()
  const [time, setTime] = useState()
  const [availableSeat, setAvailableSeat] = useState()
  const [price, setPrice] = useState()
  const [carId, setCarId] = useState()
  const [car, setCar] = useState()
  const set = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const navigate = useNavigate()

  const vendorId = JSON.parse(localStorage.getItem("session_vid"))

  useEffect(() => {
    setLoader(true)
    axios.post("https://sparkstoideas.daddy11.in/addVehicle/getVehicleId", { vendorID: vendorId })
      .then(res => {
        setLoader(false)
        console.log(res.data.result)
        setCar(res.data.result)
      })
      .catch(err => console.log(err))
  }, [])

  const upload = () => {

    const data = { pickupLocation, dropLocation, date, time, availableSeat, price, carId, vendorId }
    console.log(data);
    if (pickupLocation && dropLocation && date && time && availableSeat && price && carId && vendorId) {
      setLoader(true)
      axios.post("https://sparkstoideas.daddy11.in/ride/addRide", data)
        .then(res => {
          setLoader(false)
          toast.success("Ride Successfully Add")
          navigate("/v_ride_inquiry")
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
      <div className='grid place-items-center py-4'>
        <div className='bg-[#f3f3f1] space-y-4 w-full max-w-md shadow-md p-4 rounded-md'>
          <div className='space-x-4 w-full flex'>
            <input value={pickupLocation} onChange={e => setPickupLocation(e.target.value.toLocaleLowerCase())} className='rounded-md w-full' type='text' placeholder='From' />
            <input value={dropLocation} onChange={e => setDropLocation(e.target.value.toLocaleLowerCase())} className='rounded-md w-full' type='text' placeholder='To' />
          </div>
          <div className='space-x-4 flex'>
            <input value={date} onChange={e => setDate(e.target.value)} className='rounded-md w-full' type='date' placeholder='Date' />
            <input value={time} onChange={e => setTime(e.target.value)} className='rounded-md w-full' type='time' placeholder='Time' />
          </div>
          <div className='space-x-4 flex'>
            <input value={price} onChange={e => setPrice(e.target.value)} className='rounded-md w-full' type='text' placeholder='Price' />
            <select onChange={e => setAvailableSeat(e.target.value)} className='rounded-md w-full'>
              <option>Available Set</option>
              {
                set.map((e, i) => {
                  return (
                    <option key={i} value={e}>{e}</option>
                  )
                })
              }
            </select>
          </div>
          <select onChange={e => setCarId(e.target.value)} className='rounded-md w-full'>
            {car?.length == 0 ? <option disabled>No car Added</option> : <option disabled={carId}>Select Car</option>}
            {
              car?.length > 0 && car.map((e, i) => {
                return (
                  <option key={i} value={e._id}>{`${e.vehicleBrand}-${e.vehicleModel}`}</option>
                )
              })
            }
          </select>
          <button onClick={upload} className='w-full bg-green-500 rounded-md py-1'>Upload</button>
        </div>
      </div>  
    </>
  )
}
