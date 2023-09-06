import React, { useEffect, useState } from 'react';
import './Main.css';
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import Aos from 'aos';
import 'aos/dist/aos.css';
import UserCard from './UserCard';
import { getImages } from '../../redux/features/imageSlice';
import { searchImages } from '../../redux/features/imageSlice';
import { useNavigate } from 'react-router-dom';
import { MDBIcon } from 'mdb-react-ui-kit';

const Main = () => {
  const { images, loading } = useSelector((state) => ({ ...state.image }));
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchImages(search));
      navigate(`/images/search?searchQuery=${search}`);
      setSearch('');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    dispatch(getImages());
  }, []);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section data-aos='fade-up' className='main container section'>
      <div className='secTitle'>
        <h3 className='title'>Explore popular and handpicked visuals</h3>

        <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
          <input
            type='text'
            className='form-control'
            placeholder='Search Tour'
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Add this onChange handler
          />
          <div style={{ marginTop: '5px', marginLeft: '5px' }}>
            <MDBIcon fas icon='search' />
          </div>
        </form>
      </div>
      <div data-aos='fade-up'>
        <MDBRow className='mt-5'>
          {images.length === 0 && (
            <MDBTypography className='text-center mb-0' tag='h2'>
              No Images Found
            </MDBTypography>
          )}
          <MDBCol>
            <MDBContainer>
              <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                {/* Increased spacing using g-4 */}
                {images.map((item, index) => (
                  <UserCard key={index} {...item} />
                ))}
              </MDBRow>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </div>
    </section>
  );
};

export default Main;
