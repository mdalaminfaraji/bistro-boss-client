import React, { useContext, useState } from 'react';
import {AuthContext} from '../../Providers/AuthProviders';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useCart from '../../Hooks/useCart';
const FoodCard = ({item}) => {
  const [login, setLogin]=useState(false);
  const navigate=useNavigate();
  const location=useLocation();
  const [,refetch]=useCart();
 
    const {name, image,price, recipe, _id}=item;
   const {user}=useContext(AuthContext);
   console.log(user?.email);
    const handleAddToCart=(item)=>{
           if(user && user?.email){
            const cartItem={menuItemId:_id, name, image, price, email:user.email};

            fetch('http://localhost:5000/carts',{
              method:'POST',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify(cartItem)
            })
            .then(res=>res.json())
            .then(data=>{
              if(data.insertedId){
                refetch();//refetch cart to update the number of items inserted cart
                Swal.fire({
                  icon:'success',
                  title: 'Item added to cart',
                  showConfirmButton: false,
                  timer: 1500
                })
              
            }
           })}
           else{
            Swal.fire({
              title: 'Are you not Login user?',
              text: 'Please Login to order the food',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Login now'
            }).then((result) => {
              if (result.isConfirmed) {
              //  navigate('/login',{state:{from:location}});
              setLogin(true);
              }
            })
           }

    }

    if(login){
      return <Navigate to='/login' state={{from:location}} replace/>
    }

    return (
        <div className="card w-96 bg-base-100  shadow-xl">
        <figure><img src={image}alt="Shoes" /></figure>
        <p className='bg-slate-900 text-white absolute right-0 mr-4 mt-4 px-4'>${price}</p>
        <div className="card-body text-center">
          <h2 className="card-title text-center mx-auto">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions justify-center">
            <button onClick={()=>handleAddToCart(item)} className="btn btn-outline border-0 border-b-4 mt-4 bg-slate-100">Add to Cart</button>
          </div>
        </div>
      </div>
    );
};

export default FoodCard;