import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import FeaturedImg from '../../../assets/home/featured.jpg';
import './Featured.css';

const Featured = () => {
    return (
        <div className='featured-item text-white pt-8 my-20 bg-fixed'>
            <SectionTitle
            subHeading="Check it out"
            heading="From our Menu"
            ></SectionTitle>
            <div className='md:flex justify-center items-center pb-20 pt-12 px-36 bg-slate-500 bg-opacity-60'>
                <div >
                    <img src={FeaturedImg} alt=''/>
                </div>
                <div className='md:ml-10'>
                    <p>Aug 20, 2029</p>
                    <p className='uppercase'>Where can i get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil veniam eligendi vero atque laboriosam sint sed dicta incidunt officia quo. Non assumenda eum id sit explicabo aliquam harum quo numquam ullam magnam consequuntur ut ratione rem, veniam nesciunt voluptates maxime?</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4 text-white">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;