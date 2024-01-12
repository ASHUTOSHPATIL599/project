import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import Config from './Config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {setCheckInNumber} from '../slices/authSlice'
import {setReceiptId} from '../slices/authSlice'

const UpdateRoom = () => {
  // const [roomId, setRoomId] = useState()
 
  const [Id, setId] = useState()
  const [roomtype, setRoomtype] = useState()
  const [roomDescription, setRoomDescription] = useState()
  const [roomCount, setRoomCount] = useState()
  const [available, setavailable] = useState()
  const [cost, setcost] = useState()
  
    // grab the roomType,roomCost
    useEffect(() => {
    const {  room } = location.state
    setId(room.Id)
    setRoom(room)
    setRoomtype(room.roomtype)
    setRoomDescription(room.roomDescription)
    setRoomCount(room.roomCount)
    setavailable(room.available)
    setcost(room.cost)
    }, [])

  const[room,setRoom]=useState({});
  // to get state send by the previous screen using useNavigate
  const location = useLocation()
  const navigate = useNavigate()

  function confirmChanges() {
    if (Id === 0) {
      toast.error('Id can not be zero')
    } else if (roomtype.length === 0) {
      toast.error('Enter room type')
    } else if (roomDescription.length === 0) {
      toast.error('Enter room Description')
    } else if (cost.length === 0) {
      toast.error('Enter cost ')
    } else {
      // make an api call to perform booking
      const body={
        Id,
        roomtype,
        roomDescription,
        roomCount,
        available,
        cost,
      }

      axios
        .put(Config.URL + `/Home/update`,body, {
          headers: {'Authorization': 'Bearer ' +sessionStorage['token'] }       
        })
        .then((response) => {
          // get the data returned by server
          const result = response.data
          console.log(response)
          // check if user's authentication is successfull
          if (result === 'false') {
            toast.error('can Not Update details !')
          } else {
            toast.success('room details Updated Successfully !')
            navigate('/')
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
        <h4 className='text-center my-5'>Update Room details !!!</h4>
        <div style={styles.container}>
          <div className='mb-3'>
            <label>Room Id</label>
            <input
            value={room.Id}
              className='form-control'
              type='text' disabled='disabled'
            />
          </div>

          <div className='mb-3'>
            <label>Room Type </label>
            <input
              onChange={(event) => {
                setRoomtype(event.target.value.toUpperCase())
              }}
              defaultValue={room.roomtype}
              className='form-control'
              type='text'
            />
          </div>

          <div className='mb-3'>
            <label>Room Description: </label>
            <textarea rows={3} cols={5}
              onChange={(event) => {
                setRoomDescription(event.target.value)
              }}
              defaultValue={room.roomDescription}
              className='form-control'
              type='text'
            />
          </div>

          <div className='mb-3'>
            <label>Room Count: </label>
            <input
              onChange={(event) => {
                setRoomCount(event.target.value)
              }}
              defaultValue={room.roomCount}
              className='form-control'
              type='Number'
            />
          </div>

          <div className='mb-3'>
            <label>Is Available:</label>
            <input
              onChange={(event) => {
                setavailable(event.target.value)
              }}
              defaultValue={room.available}
              className='form-control'
              type='text'
            />
             </div>
            <div className='mb-3'>
            <label>Room Cost /night:</label>
            <input
              onChange={(event) => {
                setcost(event.target.value)
              }}
              defaultValue={room.cost}
              className='form-control'
              type='Number'
            />
          </div>
          <div className='mb-3' style={{ marginTop: 10 }}>
            <button onClick={confirmChanges} style={styles.signinButton}>
              confirm changes
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
    height: 620,
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

export default UpdateRoom
