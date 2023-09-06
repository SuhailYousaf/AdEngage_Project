import React from 'react'
import Navbar from '../Navbar/Navbar';
import Home from './Home';
// import Footer from './Footer';
// import Main from './Main';
import Main from '../Main/Main';
import { Outlet } from 'react-router-dom'



const HomeLayout = () => {
  return (
    <div>
      <Navbar />
      <Home/>
      <Main/>
      <Outlet/>
    </div>
  )
}

export default HomeLayout
