import { useState } from "react" 
import { useNavigate,Link } from "react-router-dom"
import { toast } from "react-toastify"
import { signin } from "../slices/authSlice"
import { useDispatch } from "react-redux"
import axios from'axios' 
import config from "./Config"
import Signup from './signUp';


const SignInComponent=()=>{

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    const navigate = useNavigate();
    const dispatch=useDispatch();

    const signIn=()=>{
       if(email.length==0){
          toast.error("please Enter Your Email !") ;
       }
       else if(password.length==0){
          toast.error("please Enter Your Password !") ;
       }else{
           axios.post(config.URL+"/user/signin",{email,password})
                .then((response)=>{
                  console.log(response)
                  const result=response.data;
                  if(result ==null){
                    toast.error("Invalid Username Or Password !")
                  }else{
                    toast.success("Sign in successfull !!1")
                    // signin and send response data to store 
                    // user detail will be store by reducer in sessionStorage
                    dispatch(signin(result));

                   // navigate user to home
                   navigate('/')
                  }                
                })
                .catch((error)=>{
                    toast.error("internal server error")
                    console.log("error: "+ error)
                })
       }
    }
    return(
        <>
       <div style={styles.container}>
         <div className="mb-3">
           <lebel>Email Id :</lebel>
           <input onChange={(event)=>
            {setEmail(event.target.value)}
            } className="form-control" type='email' />
         </div>
         <div className="mb-3">
           <lebel>password :</lebel>
           <input onChange={(event)=>
            {setPassword(event.target.value)}
            } className="form-control" type='password' />
         </div>
         <div className="mb-3">
            <div>
            Dont have an account? <Link to='/Signup'>Signup here</Link>
            </div>
            <button onClick={signIn} style={styles.signinButton} className="btn">signin</button>
         </div>
         </div>
       </>
    )
}
const styles = {
    container: {
      width: 400,
      height: 300,
      padding: 20,
      position: 'relative',
      top: 150,
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

  export default SignInComponent