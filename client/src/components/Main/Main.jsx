import React, { useEffect, useState } from 'react';
import './Main.css';
import { MDBCol, MDBContainer, MDBRow, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import Aos from 'aos';
import 'aos/dist/aos.css';
import UserCard from './UserCard';
import { getImages, searchImages } from '../../redux/features/imageSlice';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const Main = () => {
  const { images, loading } = useSelector((state) => ({ ...state.image }));
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(0); // State to manage the current page
  const navigate = useNavigate();
  const itemsPerPage = 5; // Number of items to display per page

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      // Dispatch the searchImages action with the search query
      dispatch(searchImages(search));
      setSearch('');
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

  // Create a filteredImages array based on the search input
  const filteredImages = images.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate the number of pages needed
  const pageCount = Math.ceil(filteredImages.length / itemsPerPage);

  // Function to handle page change
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  // Create a slice of images for the current page
  const displayedImages = filteredImages.slice(
    pageNumber * itemsPerPage,
    (pageNumber + 1) * itemsPerPage
  );

  return (
    <section data-aos='fade-up' className='main container section'>
      <div className='secTitle'>
        <h3 className='title'>Explore popular and handpicked visuals</h3>
      </div>

      <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
        <input
          type='text'
          className='form-control'
          placeholder='Search Image'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div style={{ marginTop: '5px', marginLeft: '5px' }}>
          <MDBIcon fas icon='search' />
        </div>
      </form>

      <div data-aos='fade-up'>
        <MDBRow className='mt-5'>
          {displayedImages.length === 0 && (
            <MDBTypography className='text-center mb-0' tag='h2'>
              No Images Found
            </MDBTypography>
          )}
          <MDBCol>
            <MDBContainer>
              <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
                {displayedImages.map((item, index) => (
                  <UserCard key={index} {...item} />
                ))}
              </MDBRow>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </div>

      <div className='pagination'>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'pagination-container'}
          pageClassName={'pagination-page'}
          activeClassName={'pagination-active'}
        />
      </div>
    </section>
  );
};

export default Main;
