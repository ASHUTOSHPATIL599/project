import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import Config from './Config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {setCheckInNumber} from '../slices/authSlice'
import {setReceiptId} from '../slices/authSlice'

// Add this in your component file
require('react-dom')
window.React2 = require('react')

const BookRoom = () => {
  // const [roomId, setRoomId] = useState()
  const [idNumber, setIdNumber] = useState('')
  const [nationality, setNationality] = useState()
  const [bookingDate, setBookingDate] = useState()
  const [inDate, setInDate] = useState()
  const [outDate, setOutDate] = useState()
  const [roomtype, setRoomtype] = useState('')
  const [cost, setCost] = useState(0)

  console.log(window.React1 === window.React2)

  // to get state send by the previous screen using useNavigate
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch=useDispatch();
  const regNo=sessionStorage['regNo'];

  // grab the roomType,roomCost
  useEffect(() => {
    const {  roomType, roomCost } = location.state
    // setRoomId(roomId)
    setRoomtype(roomType)
    setCost(roomCost)
  }, [])

  function proceedBooking() {
    if (idNumber.length === 0) {
      toast.error('Enter the Id card Number')
    } else if (nationality.length === 0) {
      toast.error('Enter Nationality')
    } else if (inDate.length === 0) {
      toast.error('Select check In Date')
    } else if (outDate.length === 0) {
      toast.error('Select check out Date')
    } else {
      // make an api call to perform booking
      const body={
        idNumber,
        nationality,
        bookingDate,
        inDate,
        outDate,
        roomtype,
      }

      axios
        .post(Config.URL + `/Book/${regNo}`,body, {
          headers: {'Authorization': 'Bearer ' +sessionStorage['token'] }       
        })
        .then((response) => {
          // get the data returned by server
          const result = response.data
          console.log(response)
          // check if user's authentication is successfull
          if (result === 'false') {
            toast.error('invalid email or password')
          } else {
            toast.success('room booked Successfully !!')
            dispatch(setCheckInNumber(result))
            dispatch(setReceiptId(result))
            navigate('/Services')
          }
        })
        .catch((error) => {
          console.log(`error ${error}`)
        })
    }
  }
  return (
    <>
      <div>
        <h3 className='text-center my-5'>Enter booking details !!!</h3>
        <br />
        <div style={styles.container}>
          <div> Room Selected : {roomtype.replace('_', ' ')}</div>
          <div> Room Cost : {cost}</div>
          <br />
          <div className='mb-3'>
            <label>Enter Adhar/Pan Number</label>
            <input
              onChange={(event) => {
                setIdNumber(event.target.value)
              }}
              className='form-control'
              type='text'
            />
          </div>

          <div className='mb-3'>
            <label>Enter Nationality</label>
            <input
              onChange={(event) => {
                setNationality(event.target.value)
              }}
              className='form-control'
              type='text'
            />
          </div>

          <div className='mb-3'>
            <label>Booking Date: </label>
            <input
              onChange={(event) => {
                setBookingDate(event.target.value)
              }}
              className='form-control'
              type='date'
            />
          </div>

          <div className='mb-3'>
            <label>Check-In Date: </label>
            <input
              onChange={(event) => {
                setInDate(event.target.value)
              }}
              className='form-control'
              type='date'
            />
          </div>

          <div className='mb-3'>
            <label>Check-Out Date:</label>
            <input
              onChange={(event) => {
                setOutDate(event.target.value)
              }}
              className='form-control'
              type='date'
            />
          </div>
          <div className='mb-3' style={{ marginTop: 10 }}>
            <button onClick={proceedBooking} style={styles.signinButton}>
              Complete Booking
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
const styles = {
  container: {
    width: 500,
    height: 540,
    padding: 20,
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    borderColor: '#db0f62',
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: 'solid',
    boxShadow: '1px 1px 20px 5px #C9C9C9',
  },
  signinButton: {
    position: 'relative',
    width: '100%',
    height: 40,
    backgroundColor: '#db0f62',
    color: 'white',
    borderRadius: 5,
    border: 'none',
    marginTop: 10,
  },
}

export default BookRoom
