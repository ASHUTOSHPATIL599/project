import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signout } from '../slices/authSlice';

const Navbar = () => {

  const signInStatus=useSelector(state=>state.authSlice.status)
  const dispatch =useDispatch();
  const navigate=useNavigate();

  return (
    <nav
      style={{ backgroundColor: '#db0f62' }}
      className='navbar navbar-expand-lg navbar-dark '>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          Hotel Paradise Inn
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id="navbarSupportedContent">
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link active' aria-current='page' to='/'>
                Home
              </Link>
            </li>


            {/* Conditional rendering i.e show services only if user is Logged in */}
            {
              signInStatus &&
                  <li className='nav-item'>
                    <Link
                      className='nav-link active'
                      aria-current='page'
                      to='/Services'>
                      Services
                    </Link>
                  </li>
            }
            

            <li className='nav-item'>
              <Link
                className='nav-link active'
                aria-current='page'
                to='/AboutUs'>
                About Us
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className='nav-link active'
                aria-current='page'
                to='/ContactUs'>
                Contact Us
              </Link>
            </li>
   
     {/* Conditional rendering i.e show order history only if user is Logged in */}
           {
            signInStatus &&
              <li className='nav-item'>
                <Link
                  className='nav-link active'
                  aria-current='page'
                  to='/History'>
                  Order History
                </Link>
             </li>
           }
          
          {
            signInStatus &&
            <li className='nav-item ml-auto'>
              <Link
                className='nav-link active'
                aria-current='page'
                to='/invoice'>
                Invoice
              </Link>
            </li>

           }

          
   
          {/* to toggle signin And SignOut */}
           {
             !signInStatus &&
                <li className='nav-item'>
                    <Link
                      className='nav-link active'
                      aria-current='page'
                      to='/signin'>
                      Signin
                    </Link>
                </li>
            }
               {/* if user is signed in then render signout button */}
            {
               signInStatus && (
             
                <button
                  style={{ textDecoration: 'none', color: 'white' }}
                  onClick={() => {
                    // go to signin page
                    navigate('/signin')

                    // send the action to let the user signout
                    dispatch(signout())
                  }}
                  className='btn btn-link'
                  aria-current='page'>
                  Signout
                </button>
                )
               }
        
          </ul>

          
        </div>
      </div>
    </nav>
  )
}

export default Navbar
