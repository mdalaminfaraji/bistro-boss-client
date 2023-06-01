import React from 'react';

const FoodCard = ({item}) => {
    const {name, image,price, recipe}=item;
    const handleAddToCart=(item)=>{
           console.log(item);
    }
    return (
        <div className="card w-96 bg-base-100 mt-1 shadow-xl">
        <figure><img src={image}alt="Shoes" /></figure>
        <p className='bg-slate-900 text-white absolute right-0 mr-4 mt-4 px-4'>${price}</p>
        <div className="card-body text-center">
          <h2 className="card-title text-center mx-auto">Shoes!</h2>
          <p>{recipe}</p>
          <div className="card-actions justify-center">
            <button onClick={()=>handleAddToCart(item)} className="btn btn-outline border-0 border-b-4 mt-4 bg-slate-100">Add to Cart</button>
          </div>
        </div>
      </div>
    );
};

export default FoodCard;