import { Link } from 'react-router-dom'
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import URL from './Config'
import { useNavigate } from 'react-router-dom';
import Config from './Config';

const Signup = () => {

  const[fname,setFname]=useState('');
  const[lname,setLname]=useState('');
  const[idCardNumber,setIdCardNumber]=useState('');
  const[phone,setPhone]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[confirmPassword,setConfirmPassword]=useState('');


  // this function is used to navigate from one component to another programmatically
  // userNavigate() returns a function reference
  const navigate=useNavigate()

  const signup=()=>{
    // check if user has entered details or not
    if(fname.length===0){
      toast.error("Enter the first name");
    }
    else if(lname.length===0){
      toast.error("Enter the last Name");
    }
    else if(idCardNumber.length===0){
        toast.error("Enter the last Name");
    }
    else if(phone.length===0){
      toast.error("Enter the phone");
    }
    else if(email.length===0){
      toast.error("Enter the email");
    }
    else if(password.length===0){
      toast.error("Enter the password");
    }
    else if(confirmPassword.length===0){
      toast.error("confirm Password");
    }
    else if(confirmPassword !=password){
      toast.error("password does not match");
    }
    else{
      // make an api call to check wether use exists or not
      console.log(fname)
      axios.post(Config.URL+'/user/signup',{
        fname,
        lname,
        idCardNumber,
        phone,
        email,
        password        
      }).then((response)=>{
         // get the data returned by server
         const result = response.data

         // check if user's authentication is successfull
         if (result['status'] === 'error') {
           toast.error('invalid email or password')
         } else {
           toast.success('successfully registered a new user')

           // navigate to the singin page
           navigate('/SignInComponent')
           }
      }).catch((error)=>{ console.log(`error ${error}`)
    })
    }
  }
  return (
    <div style={{ marginTop: 100 }}>
      <div style={styles.container}>
        <div className='mb-3'>
          <label>First Name</label>
          <input onChange={(event)=>
            {setFname(event.target.value)}
            } className='form-control' type='text' />
        </div>

        <div className='mb-3'>
          <label>Last Name</label>
          <input onChange={(event)=>
            {setLname(event.target.value)}
            } className='form-control' type='text' />
        </div>

        <div className='mb-3'>
          <label>Adhar/Pan Number</label>
          <input onChange={(event)=>
            {setIdCardNumber(event.target.value)}
            } className='form-control' type='text' />
        </div>

        <div className='mb-3'>
          <label>Phone Number</label>
          <input onChange={(event)=>
            {setPhone(event.target.value)}
            } className='form-control' type='tel' />
        </div>

        <div className='mb-3'>
          <label>Email</label>
          <input onChange={(event)=>
            {setEmail(event.target.value)}
            } className='form-control' type='email' />
        </div>

        <div className='mb-3'>
          <label>Password</label>
          <input onChange={(event)=>
            {setPassword(event.target.value)}
            } className='form-control' type='password' />
        </div>

        <div className='mb-3'>
          <label>Confirm Password</label>
          <input onChange={(event)=>
            {setConfirmPassword(event.target.value)}
            } className='form-control' type='password' />
        </div>

        <div className='mb-3' style={{ marginTop: 10 }}>
          <div>
            Already have an account? <Link to='/signin'>Signin here</Link>
          </div>
          <button onClick={signup} style={styles.signinButton}>Signup</button>
        </div>
      </div>
    </div>
  )
 }

 const styles = {
  container: {
    width: 500,
    height: 670,
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

export default Signup
