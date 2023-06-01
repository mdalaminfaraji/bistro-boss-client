import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../Providers/AuthProviders';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const SignUp = () => {
    const navigate=useNavigate();
    const {createUser, updateUserProfile}=useContext(AuthContext);
    const { register,reset, handleSubmit,  formState: { errors } } = useForm();
    const onSubmit = data =>{ 
        console.log(data);
        createUser(data.email, data.password)
        .then(result=>{
            const loggedUser=result.user;
            console.log(loggedUser);
            updateUserProfile(data.name, data.photoURL)
            .then(()=>{
                console.log('user profile info updated');
                reset();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'User created successfully',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/');
            })
            .catch(error=>console.log(error));
        })
        .catch(error=>{
            console.log(error.message);
        })


    };

    return (
        <>

         <Helmet>
               <title>Bistro Boss | SignUP</title>
                
           </Helmet>

                  <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Sign Up now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Enter your name" {...register("name",  { required: true })}  name='name' className="input input-bordered" />
          {errors.name && <span className='text-red-600'>Name is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo Url</span>
          </label>
          <input type="text" placeholder="photo url" {...register("photoURL",  { required: true })} className="input input-bordered" />
          {errors.photoURL && <span className='text-red-600'>Name is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' {...register("email",{ required: true })} placeholder="email" className="input input-bordered" />
          {errors.email && <span className='text-red-600'>Email is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' {...register("password",  {
             required: true,
             minLength:6,
              maxLength: 20,
              pattern:/(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]/
              })} placeholder="password" className="input input-bordered" />
               {errors.password?.type === 'required' && <p role="alert">password is required</p>}
          {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters</p>}
          {errors.password?.type === 'maxLength' && <p className='text-red-500'>Password must be less than 20 characters</p>}
          {errors.password?.type === 'pattern' && <p className='text-red-500'>Password must be Uppercase and lowercase and digit include</p>}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
            <input type="submit" value="SignUp" className="btn btn-primary"></input> 
       
        </div>
      </form>
      <p><small>Already have an account? <Link to='/login'>please Login</Link></small></p>
    </div>
  </div>
</div>


        </>
    );
};

export default SignUp;