import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import config from './Config'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


const OrderSlotForSport = () => {
  const [duration, setDuration] = useState()
  const [sportId, setSportId] = useState()
  const [sportPrice, setSportPrice] = useState()
  const [sportName, setSportName] = useState()
  const checkInNumber= sessionStorage["checkInNumber"]
  const recieptNumber= sessionStorage["receipId"]
	
    // to get state send by the previous screen using useNavigate
    const location = useLocation()
    const navigate = useNavigate();

    // grab the homeid
    useEffect(() => {
      const { sportId,sportPrice,sportName } = location.state
      setSportId(sportId)
      setSportPrice(sportPrice)
      setSportName(sportName)
    }, [])

  const completeOrder = () => {
    if (duration === 0) {
      toast.error('add Sport Duration')
    }else {

      const body= {
        checkInNumber,
        duration
       }

      axios
        .post(config.URL + `/sportorderdetails/${sportId}/${recieptNumber}`,
          body,
           {
            headers: {'Authorization': 'Bearer ' +sessionStorage['token'] }       
          }
        )
        .then((response) => {
          const result = response.data
          console.log(result);
          if (result !== 'error') {
            toast.success('Slot for Sport Activity Booked !!!')
            navigate('/Services', { replace: true })
          } else {
            toast.error("Some Error Occured While Booking")
          }
        })
        .catch((error) => {
          toast.error("make sure u have booked room")
          console.log(error)
          navigate('/', { replace: true })
        })
    }
  }

  return (
    <>
    <h3 className='text-center my-5'> Enter Your Order Details !</h3>
    <div style={styles.container}>
         <div className="mb-3">
           <lebel>Activity Id :</lebel>
           <input disabled='disabled' value={sportId}
            className="form-control" type='text' />
         </div>
         <div className="mb-3">
           <lebel>Sport Name :</lebel>
           <input disabled='disabled' value={sportName}
            className="form-control" type='text' />
         </div>
         <div className="mb-3">
           <lebel>cost per hour :</lebel>
           <input disabled='disabled' value={sportPrice}
            className="form-control" type='text' />
         </div>
         <div className="mb-3">
           <lebel>select duration In Hour :</lebel>
           <input onChange={(event)=>
            {setDuration(event.target.value)}
            } className="form-control" type='number' />
         </div>
         <div className="mb-3">

            <button onClick={completeOrder} style={styles.signinButton} className="btn">Book Slot</button>
         </div>
         </div> 
         </>       
  )
}

const styles = {
    container: {
      width: 400,
      height: 400,
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

export default OrderSlotForSport
