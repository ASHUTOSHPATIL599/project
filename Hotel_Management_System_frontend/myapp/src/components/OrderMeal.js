import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import config from './Config'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


const OrderMeal = () => {
  const [quantity, setQuantity] = useState()
  const [mealId, setMealId] = useState()
  const [mealPrice, setMealPrice] = useState()
  const [mealName, setMealName] = useState()
  const checkInNumber= sessionStorage["checkInNumber"]
  const recieptNumber= sessionStorage["receipId"]
	
    // to get state send by the previous screen using useNavigate
    const location = useLocation()
    const navigate = useNavigate();

    // grab the homeid
    useEffect(() => {
      const { mealId,mealPrice,mealName } = location.state
      setMealId(mealId)
      setMealPrice(mealPrice)
      setMealName(mealName)
    }, [])

  const completeOrder = () => {
    if (quantity === 0) {
      toast.error('add Quantity')
    }else {
  
      const body={
          checkInNumber,
          quantity
      }

      axios
        .post(config.URL + `/mealorderdetails/${mealId}/${recieptNumber}`
        ,body,
          {
            headers: {'Authorization': 'Bearer ' +sessionStorage['token'] }       
          }
           
        )
        .then((response) => {
          const result = response.data
          console.log(result);
          if (result !== 'error') {
            toast.success('Your Order placed Successfully !!!')
            navigate('/Services', { replace: true })
          } else {
            toast.error("Some Error Occured While completing Order")
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
           <lebel>Meal Id :</lebel>
           <input disabled='disabled' value={mealId}
            className="form-control" type='text' />
         </div>
         <div className="mb-3">
           <lebel>Meal Name :</lebel>
           <input disabled='disabled' value={mealName}
            className="form-control" type='text' />
         </div>
         <div className="mb-3">
           <lebel>Meal price :</lebel>
           <input disabled='disabled' value={mealPrice}
            className="form-control" type='text' />
         </div>
         <div className="mb-3">
           <lebel>select Quantity :</lebel>
           <input onChange={(event)=>
            {setQuantity(event.target.value)}
            } className="form-control" type='number' />
         </div>
         <div className="mb-3">

            <button onClick={completeOrder} style={styles.signinButton} className="btn">Confirm Order</button>
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

export default OrderMeal
