import React, { useEffect, useState } from 'react';
import './Home.css';
import { MdOutlineImageSearch } from 'react-icons/md';
import { HiFilter } from 'react-icons/hi';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const Home = () => {

 


 
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className='home'>
      <div className='overlay'></div>
      <img src="https://images.unsplash.com/photo-1604940500627-d3f44d1d21c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Image description"  />
      <div className='homeContent container'>
        <div className='textDiv'>
          <span data-aos='fade-up' className='smallText'>
          Everything you need to create standout designs
          </span>
          <h1 data-aos='fade-up' className='homeTitle'>
          Your stories aren’t one-dimensional, neither is our content library
          </h1>
       
        
        </div>

        <Link to='/AddImage'>
<button className='btn' style={{ color: 'white' }}>Add New Image</button>
    </Link>
      </div>
    </section>
  );
};

// const DestinationInput = () => (
//   <div className='destinationInput'>
//     <label htmlFor='city'>Search For Images</label>
//     <div className='input flex'>
//       <input type='text' placeholder='Enter name here...' />
//       <MdOutlineImageSearch className='icon' />
//     </div>
//     <div className='searchOption flex'>
//     <HiFilter className='icon' />
//     <span>MORE FILTERS</span>
//   </div>
    
//   </div>
// );


// const MoreFilters = () => (
//   <div className='searchOption flex'>
//     <HiFilter className='icon' />
//     <span>MORE FILTERS</span>
//   </div>
// );

export default Home;




