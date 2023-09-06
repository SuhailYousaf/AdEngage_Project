import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBCardGroup } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { LuSubtitles } from 'react-icons/lu';
import { BsClipboardCheck } from 'react-icons/bs';

const UserCard = ({ imageFile,  description, title, tags, _id, name }) => {
  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + '...';
    }
    return str;
  };

  return (
    <MDBCardGroup>
    <MDBCard className='h-50 mt-1 d-sm-flex agent-card' >
    <MDBCardImage src={imageFile} alt={title} position='top' className='card-image' />
    <div className='top-left'>{name}</div>
    <div className='text-start tag-card'>
      {tags.map((item, index) => (
        <span key={index}>#{item} </span>
      ))}
    </div>
    <MDBCardBody>
      <MDBCardTitle className='text-start' style={{ fontSize: '24px' }}>
        <LuSubtitles style={{ fontSize: '24px' }} />title: {title}
      </MDBCardTitle>
      
      <MDBCardText className='text-start'> {excerpt(description)}</MDBCardText>
      <div className='text-start'>
        <Link to={`/getImage/${_id}`} className='btn flex' style={{ fontSize: '18px' }}>
          DETAILS <BsClipboardCheck style={{ fontSize: '24px' }} />
        </Link>
      </div>
    </MDBCardBody>
  </MDBCard>
  
    </MDBCardGroup>
  );
};

export default UserCard;
