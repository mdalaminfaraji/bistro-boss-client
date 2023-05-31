import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from "swiper/react";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
const Testimonial = () => {
    const [reviews, setReviews]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/reviews')
        .then(res=>res.json())
        .then(data=>setReviews(data));
    },[])
    return (
        <section className='my-20'>
            <SectionTitle
            subHeading="what our client Say"
            heading="testimonials"
            ></SectionTitle>
             <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        
     {
        reviews.map(item=><SwiperSlide key={item._id}>
            <div className='my-20 mx-20 flex flex-col items-center' >
                        <div >
                        <Rating 
                        style={{ maxWidth: 180 }}
                        value={item.rating}
                        readOnly
                         />
                        </div>
                <p className='w-1/2 py-4 text-center mx-auto'>{item.details}</p>
                <h3 className='text-2xl w-1/2 mx-auto text-center text-orange-400'>{item.name}</h3>
            </div>
        </SwiperSlide>)
     }
      </Swiper>
            
        </section>
    );
};

export default Testimonial;