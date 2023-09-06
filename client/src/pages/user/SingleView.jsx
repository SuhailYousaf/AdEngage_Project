import React, { useEffect } from "react";
import './SingleView.css';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getImage } from "../../redux/features/imageSlice";


const SingleView = () => {
  const dispatch=useDispatch()
  const { image } = useSelector((state) => ({ ...state.image }));
  const { images, loading } = useSelector((state) => ({ ...state.image }));

  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      dispatch(getImage(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
   
    <div className="Single" style={{ marginTop: '150px', overflowX: 'hidden' }}>
      <div className="details">
        <div className="big-img">
          <img src={image.imageFile} alt="" />
        </div>

        <div className="box">
          <div className="row">
            <h2>Title:{image.title}</h2>
            <h6>CreatorId:{image.Creator}</h6>
            <h7>createdAt:{image.createdAt}</h7>
          </div>

          <h3>#{image.tags}</h3> 
          <p>Description:{image.description}</p>

    
        </div>
      </div>
  </div>

  )
}

export default SingleView
