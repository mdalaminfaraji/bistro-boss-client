import React from 'react';
import { useForm } from "react-hook-form";
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const img_hosting_token=import.meta.env.VITE_Image_upload_token;

const AddItem = () => {
    const [axiosSecure]=useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const img_hosting_url=`https://api.imgbb.com/1/upload?key=${img_hosting_token}`
   
const onSubmit = data => {
    console.log(data);
    const formData=new FormData();
    formData.append('image',data.image[0]);
    fetch(img_hosting_url, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(imgResponse=>{
       if(imgResponse.success){
        const imgUrl=imgResponse.data.display_url;
          const {name, price, category, recipe}=data;
          const newItem={name, price:parseFloat(price) ,category, recipe, image:imgUrl};
          console.log(newItem);
          axiosSecure.post('/menu', newItem)
          .then(data=>{
              console.log('after processing', data.data);
              if(data.data.insertedId){
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Item added successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
              }
          })
       }
    })
};

   
    return (
        <div className='w-full px-10 '>
           <SectionTitle subHeading="What's new" heading="Add an item"></SectionTitle>
           <form onSubmit={handleSubmit(onSubmit)}>
           <div className="form-control w-full mb-4">
            <label className="label">
                <span className="label-text">Recipe Name*</span>
            </label>
            <input type="text" placeholder="Recipe Name" {...register("name", { required: true, maxLength: 80 })} className="input input-bordered w-full " />
            
            </div>
            <div className='flex my-4'>
            <div className="form-control w-full ">
                <label className="label">
                    <span className="label-text">Category*</span>
                </label>
                <select defaultValue="Pick one" {...register("category", { required: true })} className="select select-bordered">
                    <option disabled>Pick one</option>
                    <option>Pizza</option>
                    <option>Soup</option>
                    <option>Salad</option>
                    <option>Desert</option>
                    <option>Drinks</option>
                </select>
               
            </div>
            <div className="form-control w-full ml-4 ">
            <label className="label">
                <span className="label-text">Price*</span>
            </label>
            <input type="Number" {...register("price", { required: true })} placeholder="Price" className="input input-bordered w-full " />
            
            </div>
            </div>
            <div className="form-control ">
            <label className="label">
                <span className="label-text">Recipe Detail</span>
             
            </label>
            <textarea className="textarea textarea-bordered h-24" placeholder="Recipe details" {...register("recipe", { required: true })}></textarea>
            
            </div>
            <div className="form-control w-full my-4">
            <label className="label">
                <span className="label-text">Item Image*</span>
            </label>
            <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
           
            </div>
            <input type="submit" value="Add Item"  className='btn btn-sm mt-4'/>
           </form>
        </div>
    );
};

export default AddItem;