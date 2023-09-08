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
  const [selectedColor, setSelectedColor] = useState('');
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

  const handleColorChange = (color) => {
    // Ensure the color value is in lowercase
    const lowercaseColor = color.toLowerCase();
    console.log('Selected color:', lowercaseColor); // Debug: Check selected color
    setSelectedColor(lowercaseColor);
  
    // Dispatch the searchImages action with both search query and selected color
    dispatch(searchImages({ searchQuery: search, selectedColor: lowercaseColor }));
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
  if (!images) {
    // Handle the case where images are undefined
    return <div>Loading...</div>;
  }
   
  
   const filteredImages = images
   .filter((item) =>
     item.title.toLowerCase().includes(search.toLowerCase())
  )
  .filter((item) =>
     selectedColor ? (item.colour ? item.colour.toLowerCase() === selectedColor : false) : true
  );

  console.log("Selected Color:", selectedColor);
  console.log("Filtered Images:", filteredImages);



  const pageCount = Math.ceil(filteredImages.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

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
    <br></br>
    <div className="color-filter">
    <h4>Choose Your Colour</h4>
    <label className="color-radio-label1">
      <input
        type="radio"
        name="color"
        value="red"
        checked={selectedColor === 'red'}
        onChange={() => handleColorChange('red')}
        className="color-radio-input"
      />
    </label>
    <label className="color-radio-label2">
      <input
        type="radio"
        name="color"
        value="green"
        checked={selectedColor === 'green'}
        onChange={() => handleColorChange('green')}
        className="color-radio-input"
      />
    </label>
    <label className="color-radio-label3">
      <input
        type="radio"
        name="color"
        value="blue"
        checked={selectedColor === 'blue'}
        onChange={() => handleColorChange('blue')}
        className="color-radio-input"
      />
    </label>
    <label className="color-radio-label4">
      <input
        type="radio"
        name="color"
        value="yellow"
        checked={selectedColor === 'yellow'}
        onChange={() => handleColorChange('yellow')}
        className="color-radio-input"
      />
    </label>
  </div>
  

  
    
    
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











