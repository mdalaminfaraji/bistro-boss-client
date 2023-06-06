import React, { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthProviders';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
    const captchaRef=useRef(null);
    const [disabled, setDisabled]=useState(true);
    const navigate=useNavigate();
    const location=useLocation();
    console.log(location);
    const from=location.state?.from?.pathname || "/";

    const {signIn}=useContext(AuthContext);
    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[])
    const handleLogin=(e)=>{
      e.preventDefault();
      const form=e.target;
      const email=form.email.value;
      const password=form.password.value;
      const user={email, password}
      console.log(user);
      signIn(email, password)
      .then(result=>{
        const user=result.user;
        console.log(user);
        Swal.fire({
            title: 'Login successful',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          });
          navigate(from, { replace: true });
      })
      .catch(error=>{
        console.log(error.message);
      })
    }

    const handlevalidateCaptcha=(e)=>{
             const user_captcha_value=e.target.value;
             if (validateCaptcha(user_captcha_value)==true) {
               setDisabled(false);
            }
       
            else {
               setDisabled(true);
            }
    }
    return (
            <>
            <Helmet>
               <title>Bistro Boss | Login</title>
                
           </Helmet>

                    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center md:w-1/2 lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card  md:w-1/2 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
           <LoadCanvasTemplate/>
          </label>
          <input type="text"onBlur={handlevalidateCaptcha}  name='captcha' placeholder="type the captcha above" className="input input-bordered" />
          
        </div>
        <div className="form-control mt-6">
        {/* TODO:make button disabled for captcha */}
         <input disabled={false} type="submit" value="Submit"  className='btn btn-primary'/>
        </div>
      </form>
      <p>New Here? <Link to="/signup">Create an  account</Link></p>
      <SocialLogin></SocialLogin>
    </div>
  </div>
</div>
            </>
    );
};

export default Login;