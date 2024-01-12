import config from './Config'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Services = () => {
  const [mealDetails, setMealDeatils] = useState([])
  const [sportDetails, setSportDeatils] = useState([])

  const navigate = useNavigate()
  // load the meal details as soon as the component gets loaded successfully
  useEffect(() => {
    loadAllMealDetails()
    loadSportDetails()
  }, [])

  // load all meals
  const loadAllMealDetails = () => {
    axios.get(config.URL +'/mealdetails',
    {
      headers: {'Authorization': 'Bearer ' +sessionStorage['token'] }       
    }
    
    ).then((response) => {
      const result = response.data
      console.log(result)
      if (result.lenght != 0) {
        setMealDeatils(result)
      } else {
        toast.error(result=='error')
      }
    })
  }

    // load all sport Activity
    const loadSportDetails = () => {
    axios.get(config.URL +'/sportdetails',
    {
      headers: {'Authorization': 'Bearer ' +sessionStorage['token'] }       
    }
    ).then((response) => {
      const result = response.data
      console.log(result)
      if (result.lenght != 0) {
        setSportDeatils(result)
      } else {
        toast.error(result=='error')
      }
    })
  }
  const orderMeal = (Id,mealName,mealPrice) => {
    // pass the meal id and receipt id to Order Component
    navigate('/OrderMeal', {
      state: { mealId: Id,mealName:mealName,mealPrice:mealPrice},
    })
  }

  const bookSlotForSport = (Id,sportName,sportPrice) => {
    // pass the meal id and receipt id to Order Component
    navigate('/BookSlotForSport', {
      state: { sportId: Id,sportName:sportName,sportPrice:sportPrice},
    })
  }

  return (
    <main>
      <section className='menu section-padding'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <h2 className='text-center mb-lg-5 mb-4 my-5'>Breakfast Menus</h2>
            </div>
      
              {mealDetails.map((meal)=>{
                return(
                  <>
                        <div className='col-lg-4 col-md-6 col-12'>
              <div className='menu-thumb'>
                <img
                  src={`Images/image${meal.Id}.jpg`}
                  className='img-fluid menu-image'
                  alt=''
                />
                <div className='menu-info d-flex flex-wrap align-items-center'>
                  <h4 className='mb-0'>{meal.mealName}</h4><br/>
                  <span className='price-tag bg-white shadow-lg ms-4'>
                    <small>Category: {meal.mealCategory}</small>
                  </span><br/>
                  <span className='price-tag bg-white shadow-lg ms-4'>
                    <small>{meal.mealDescription}</small>
                  </span><br/>
                  <span className='price-tag bg-white shadow-lg ms-4'>
                    <small>price:{" "+meal.mealPrice} </small>
                  </span>
                  <div className='d-flex flex-wrap align-items-center w-100 mt-2'>
                    <h6 className='reviews-text mb-0 me-3'>rating :{(4+(Math.random())).toFixed(1)}</h6>
                    <button type='button' onClick={()=>orderMeal(meal.Id,meal.mealName,meal.mealPrice)} class='btn btn-primary btn-sm'>
                      Order Now
                    </button>
                  </div>
                  <br/><br/>
                  </div>
                  </div>
                  </div><br/>
                  </>
                )
              })}
              <div className='col-12'>
                 <h2 className='text-center mb-lg-5 mb-4 my-3'>sport Activities</h2>
             </div> 

             {sportDetails.map((sport)=>{
                return(
                  <>
                        <div className='col-lg-4 col-md-6 col-12'>
              <div className='menu-thumb'>
                <img
                  src={`Images/sport/image${sport.Id}.jpg`}
                  className='img-fluid menu-image'
                  alt=''
                />
                <div className='menu-info d-flex flex-wrap align-items-center'>
                  <h4 className='mb-0'>{sport.sportName}</h4>
                  <span className='price-tag bg-white shadow-lg ms-4'><br/>
                    <small>{sport.sportDesc}</small>
                  </span>
                  <span className='price-tag bg-white shadow-lg ms-4'>
                    <small>cost: {sport.sportPrice} /Hr</small>
                  </span>
                  <div className='d-flex flex-wrap align-items-center w-100 mt-2'>
                    <h6 className='reviews-text mb-0 me-3'>rating:{(4+(Math.random())).toFixed(1)}/</h6>
                    <button onClick={()=>bookSlotForSport(sport.Id,sport.sportName,sport.sportPrice)} type='button' class='btn btn-primary btn-sm'>
                      Book slot
                    </button>
                  </div>
                  </div>
                  </div>
                  </div>
                  </>
                )
              })}         
         </div>
        </div>
      </section>
    </main>
  )
}
export default Services
