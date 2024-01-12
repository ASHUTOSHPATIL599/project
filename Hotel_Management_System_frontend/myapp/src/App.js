import { BrowserRouter, Routes, Route } from 'react-router-dom'

// this toastr container will be used to show the toast messages
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from './components/Home'
import Navbar from './components/Navbar'
import SignInComponent from './components/SignInComponent'
import SignUp from './components/signUp'
import ContactUs from './components/ContactUs'
import BookRoom from './components/BookRoom'
import AboutUs from './components/AboutUs'
import OrderMeal from './components/OrderMeal'
import OrderSlotForSport from './components/OrderSportSlot'
import Services from './components/Service'
import OrderHistory from './components/OrderHistory'
import Invoice from './components/Invoice'
import UpdateRoom from './components/UpdateRoom'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/AboutUs' element={<AboutUs />} />
        <Route path='/signin' element={<SignInComponent />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/BookRoom' element={<BookRoom />} />
        <Route path='/Services' element={<Services />} />
        <Route path='/OrderMeal' element={<OrderMeal />} />
        <Route path='/BookSlotForSport' element={<OrderSlotForSport />} />
        <Route path='/History' element={<OrderHistory />} />
        <Route path='/Invoice' element={<Invoice />} />
        <Route path='/UpdateRoom' element={<UpdateRoom />} />
      </Routes>

      {/* this container is used to show toast messages */}
      <ToastContainer position='top-center' autoClose={3000} />
    </BrowserRouter>
  )
}

export default App
