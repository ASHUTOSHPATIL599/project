import config from './Config'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
import hotelImage1 from "./foodImages/hotel1.jpg"; // Adjust the path as needed
import hotelImage2 from "./foodImages/hotel2.jpg"; // Adjust the path as needed
import hotelImage3 from "./foodImages/hotel3.jpg"; // Adjust the path as needed
const HomePage=()=>{

  const [roomList, setRoomList] = useState([])
  const signinStatus=useSelector(state=>state.authSlice.status)
  const role=useSelector(state=>state.authSlice.role);
  var x=1;
  var y=2;

  const navigate=useNavigate();
  // load the room details as soon as the component gets loaded successfully
  useEffect(() => {
    loadAllRoomDetails()
  }, [])

   // load all rooms 
   const loadAllRoomDetails = () => {
    axios
      .get(config.URL + '/Home'
      )
      .then((response) => {
        const result = response.data
        console.log(result)
        if (result.lenght !=0) {
            setRoomList(result)
        } else {
          toast.error(result['error'])
        }
      })
  }
 
  const bookRoom=(Id,type,cost)=>{
      // pass the room id which you want to edit
      if(signinStatus){
        navigate("/BookRoom" ,{state:{roomId:Id,roomType:type,roomCost:cost}}) ;
      }else{
        navigate('/signin')
      }
    
  }

  const update =(room)=>{
    navigate("/UpdateRoom" ,{state:{room:room}}) ;
  }

    return(
        <>
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-interval="500">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div style={style.corousel}  className="carousel-inner">
                <div className="carousel-item active">
                <img src={hotelImage1}className="d-block w-100 img-fluid" alt="image loading..." />
                <div className="carousel-caption d-none d-md-block">
                    <h2 style={style.heading}>Welcome to Hotel Paradise Inn</h2>
                    <p style={style.heading}>Our Excellency, at your service !!!</p>
                </div>
                </div>
                <div className="carousel-item ">
                <img src={hotelImage2} className="d-block w-100 img-responsive" alt="loading..." />
                <div className="carousel-caption d-none d-md-block">
                <h2 style={style.heading}>Welcome to Hotel Paradise Inn</h2>
                    <p style={style.heading}>Our Excellency, at your service !!!</p>
                </div>
                </div>
                <div className="carousel-item">
                <img src={hotelImage3}  className="d-block w-100 img-responsive" alt="loading..." />
                <div className="carousel-caption d-none d-md-block">
                <h2 style={style.heading}>Welcome to Hotel Paradise Inn</h2>
                    <p style={style.heading}>Our Excellency, at your service !!!</p>
                </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            </div>

        {/*---------------- Courousel End here----------------------------------- */}
       
    {/*  order-md= specifies order in which content shown in medium devices  */}
    <div className="container">
        {roomList.map((room)=>{
            const roomPath=config.URL+`/Home/${room.Id}/images`
            x=x==1?2:1;
            y=y==2?1:2;
            return(
                <>
                 <div className="row featurette d-flex justify-content-center align-items-center">
                    <div className={`col-md-7 my-5 order-md-${x}`}>
                    <h4 className="featurette-heading">Room Type : {room.roomtype.replace("_"," ")}<br/><br/>Description: <span
                            className="text-muted">{room.roomDescription}</span></h4>
                    <p className="lead">Rooms Available: {room.roomCount} </p>
                    <p className="lead">Rooms cost: {room.cost} /night</p>
                    <button onClick={()=>bookRoom(room.Id,room.roomtype,room.cost)} type="button" class="btn btn-primary btn-sm">Book Now</button> &nbsp; &nbsp; &nbsp;
                    {
                        signinStatus && role=="ROLE_ADMIN" &&
                        <button onClick={()=>update(room)} type="button" class="btn btn-primary btn-sm">Update details</button>
                    }
                   
                    </div>
                    <div className={`col-md-5 order-md-${y} my-4`}>
                    <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto img-responsive" width="500"
                    height="500" src={roomPath} />
 
 
                    </div>                  
              </div>
             </>
            )
        })}
     </div>  
        </>
    )
}
const style={
    corousel:{
       height:350
    },
    heading:{
        fontWeight:800,
        fontFamily:"Monospace",
        textShadow:"4px 4px black",
        color:"white"
    }
}
export default HomePage