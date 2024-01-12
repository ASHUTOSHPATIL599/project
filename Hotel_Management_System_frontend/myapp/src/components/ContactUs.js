import HomePage from './Home'
import { Link } from 'react-router-dom'
const ContactUs = () => {
  return (
    <section className='contact section-padding'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h2 className='mb-4'>Contact With Us Here!!!!</h2>
          </div>
          <div className='col-lg-6 col-12'>
            <form
              className='custom-form contact-form row'
              action='#'
              method='post'
              role='form'>
              <div className='col-lg-6 col-6'>
                <label htmlFor='contact-name' className='form-label'>
                  Full Name
                </label>
                <input
                  type='text'
                  name='contact-name'
                  id='contact-name'
                  className='form-control'
                  placeholder='Your Name'
                  required=''
                />
              </div>
              <div className='col-lg-6 col-6'>
                <label htmlFor='contact-phone' className='form-label'>
                  Phone Number
                </label>
                <input
                  type='telephone'
                  name='contact-phone'
                  id='contact-phone'
                  pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                  className='form-control'
                  placeholder='123-456-7890'
                />
              </div>
              <div className='col-12'>
                <label htmlFor='contact-email' className='form-label'>
                  Email
                </label>
                <input
                  type='email'
                  name='contact-email'
                  id='contact-email'
                  pattern='[^ @]*@[^ @]*'
                  className='form-control'
                  placeholder='Your Email'
                  required=''
                />
                <label htmlFor='contact-message' className='form-label'>
                  Message
                </label>
                <textarea
                  className='form-control'
                  rows={5}
                  id='contact-message'
                  name='contact-message'
                  placeholder='Your Message'
                  defaultValue={''}
                />
              </div>
              <div className='col-lg-5 col-12 ms-auto'>
                <button type='submit' className='form-control btn btn-dark'>
                  Send
                </button>
              </div>
            </form>
          </div>
          <div className='col-lg-4 col-12 mx-auto mt-lg-5 mt-4'>
            <h5>Weekdays</h5>
            <div className='d-flex mb-lg-3'>
              <p>Monday to Friday</p>
              <p className='ms-5'>10:00 AM - 08:00 PM</p>
            </div>
            <h5>Weekends</h5>
            <div className='d-flex'>
              <p>Saturday and Sunday</p>
              <p className='ms-5'>11:00 AM - 11:00 PM</p>
            </div>
          </div>
          <div className='col-12'>
            <h4 className='mt-5 mb-4'>
              Shivajinagar, Pune, Maharashtra 411053
            </h4>
            <div className='google-map pt-3'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.9217348727975!2d73.82744911481345!3d18.532438587402115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf8a959a0e4b%3A0x9634475031078c60!2sJW%20Marriott%20Hotel%20Pune!5e0!3m2!1sen!2sin!4v1662793327340!5m2!1sen!2sin'
                width='100%'
                height={300}
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'
              />
            </div>
          </div>
        </div>
      </div>
      <footer className='site-footer section-padding'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <h4 className='text-white mb-4 me-5'>Hotel PARADISE Inn</h4>
            </div>
            <div className='col-lg-4 col-md-7 col-xs-12 tooplate-mt30'>
              <h6 className='text-white mb-lg-4 mb-3'>Location</h6>
              <p>Senapati Bapat Rd Shivajinagar, Pune, Maharashtra 411053</p>
              <a
                href='https://goo.gl/maps/wZVGLA7q64uC1s886'
                className='custom-btn btn btn-dark mt-2'>
                Directions
              </a>
            </div>
            <div className='col-lg-4 col-md-5 col-xs-12 tooplate-mt30'>
              <h6 className='text-white mb-lg-4 mb-3'>Opening Hours</h6>
              <p className='mb-2'>Monday - Friday</p>
              <p>10:00 AM - 08:00 PM</p>
              <p>
                Tel:{' '}
                <a href='tel: 010-02-0340' className='tel-link'>
                  010-02-0340
                </a>
              </p>
            </div>
          </div>
          {/* row ending */}
        </div>
        {/* container ending */}
      </footer>
    </section>
  )
}

export default ContactUs
