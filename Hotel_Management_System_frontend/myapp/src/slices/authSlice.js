import { createSlice } from '@reduxjs/toolkit'

// create an auth slice to maintain the user signin status
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // user is not logged in
    status: sessionStorage['status'],
    role:'ROLE_USER',
    regNo:-1,
    checkInNumber:-1,
    receipId:-1
  },
  reducers: {
    signin: (state, action) => {
      // the user is now signed in
      state.status = true
      state.role= action.payload['role']
      
      // get the token from response and save it in sessionStorage
      // const token = result.data.token
      sessionStorage['token'] = action.payload['token']
      sessionStorage['role'] = action.payload['role']
      sessionStorage['regNo'] = action.payload['regNo']
      sessionStorage['status']=true;
    },
    signout: (state, action) => {
      // the user is signed out
      state.status = false

      // remove the user token and name from sessionStorage
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('role')
      sessionStorage.removeItem('regNo')
      sessionStorage.removeItem('checkInNumber')
      sessionStorage.removeItem('receipId')
      sessionStorage['status']=false;
    },

    setCheckInNumber: (state, action) => {
        // set check im Number
        sessionStorage["checkInNumber"]=action.payload['book']['Id'];
       
     },    
     setReceiptId: (state, action) =>{
      sessionStorage["receipId"]=action.payload['receipId']
     },
  },
})

// export the reducer for authSlice
export default authSlice.reducer

// export the actions
export const { signin, signout , setCheckInNumber ,setReceiptId} = authSlice.actions
