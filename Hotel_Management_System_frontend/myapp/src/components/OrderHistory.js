import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import config from './Config'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


const OrderHistory = () => {
  const [mealOrders, setMealOrders] = useState([])
  const [sportOrders, setSportOrders] = useState([])
  const recieptNumber =sessionStorage["receipId"];
	
    // to get state send by the previous screen using useNavigate
    const location = useLocation()
    const navigate = useNavigate();

    // grab the homeid
    useEffect(() => {
      fetchMealOrdersDetails()
      fetchSportOrdersDetails()
    }, [])

  const fetchMealOrdersDetails = () => {
      axios.get(config.URL +`/bill/mealOrders/${recieptNumber} `,
      {
        headers: {'Authorization': 'Bearer ' +sessionStorage['token'] }       
      }
      )
         .then((response) => {
          const result = response.data
          console.log(result);
          if (result !== 'error') {
            setMealOrders(result)
          } else {
            toast.error("Some Error Occured While getting Orders")
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  

  const fetchSportOrdersDetails = () => {
      axios.get(config.URL +`/bill/sportOrders/${recieptNumber} `,
      {
        headers: {'Authorization': 'Bearer ' +sessionStorage['token'] }       
      }
      
      )
          .then((response) => {
          const result = response.data
          console.log(result);
          if (result !== 'error') {
            setSportOrders(result)
          } else {
            toast.error("Some Error Occured While getting Orders")
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
   const backToPreviousPage=()=>{
    navigate(-1);
   }

  return (
         <> <div className='container'>
            <h2 className='text-center my-3'> Your Order History </h2>      
            <table class="table table-striped table-dark table-sm  table-responsive">
            <thead>
                <tr>
                    <th scope="col">checkIn Number</th>
                    <th scope="col">Type</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Time</th>
                </tr>
            </thead>
            <tbody>
                {mealOrders.length!=0 && mealOrders.map((mealOrder)=>{
                    return(
                      <>
                        <tr>
                            <td>{mealOrder.checkInNumber}</td>
                            <td>meal order</td>
                            <td>{mealOrder.mealDetails.mealName}</td>
                            <td>{mealOrder.mealDetails.mealPrice}</td>
                            <td>{mealOrder.orderTime.substring(0,19).replace("T","  ")}</td>
                            </tr>
                      </>
                    )
                 })
                } 
                 {sportOrders.length!=0 && sportOrders.map((sportOrder)=>{
                    return(
                      <>
                        <tr>
                            <td>{sportOrder.checkInNumber}</td>
                            <td>Sport order</td>
                            <td>{sportOrder.sportDetails.sportName}</td>
                            <td>{sportOrder.sportDetails.sportPrice}</td>
                            <td>{sportOrder.orderTime.substring(0,19).replace("T","  ")}</td>
                            </tr>
                      </>
                    )
                 })
                }             
            </tbody>
        </table> 
        <div className="mb-3">
            <button onClick={backToPreviousPage} className='btn btn-dark' >back</button>
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

export default OrderHistory
