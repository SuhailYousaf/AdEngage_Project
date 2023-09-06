import React, { useState, useEffect } from 'react'
import { MDBCard, MDBCardBody, MDBCardFooter, MDBValidation, MDBBtn, MDBSpinner } from 'mdb-react-ui-kit'
import ChipInput from "material-ui-chip-input"
import FileBase from "react-file-base64"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createImage } from '../../redux/features/imageSlice'



const initialState = {
    title: "",
    description: "",
    tags:[],
}

const AddImage = () => {
    const [imageData, setImageData] = useState(initialState)
    const { error, loading } = useSelector((state) => ({ ...state.image }))
    const { user } = useSelector((state) => ({ ...state.auth }))

    const { title, description, tags } = imageData
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (title && description && tags) {
            const updatedImageData = { ...imageData, name: user?.name }
            dispatch(createImage({ updatedImageData, navigate, toast }))
            handleClear()
        }

    }
    const onInputChange = (e) => {
        const { name, value } = e.target
        setImageData({ ...imageData, [name]: value })
    }


    const handleAddTag = (tag) => {

        setImageData({ ...imageData, tags: [...imageData.tags, tag] })
    }


    const handleDeleteTag = (deleteTag) => {
        setImageData({ ...imageData, tags: imageData.tags.filter((tag) => tag !== deleteTag) })


    }



    const handleClear = () => {
        setImageData({ title: "", description: "", tags: [] })
    }


    return (
        <div style={{ color: "black",margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px" }} className='container'>


            <MDBCard alignment='center' >
            <h5 style={{ color: "black" }}>Add Image</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} className='row g-3' noValidate>
                        <div className='col-md-12'>
                            <input
                                placeholder='title'
                                type='text'
                                value={title}
                                name='title'
                                onChange={onInputChange}
                                className='form-control'
                                required
                                invalid
                                validation="please provide title"



                            />

                        </div>
                        <div className='col-md-12'>
                            <textarea
                                placeholder='description'
                                type='text'
                                style={{ height: "100px" }}
                                value={description}
                                name='description'
                                onChange={onInputChange}
                                className='form-control'
                                required
                                invalid
                                validation="please provide title"
                            />

                        </div>

                        <div className='col-md-12'>
                            <ChipInput
                                name="tags"
                                varient="outlined"
                                placeholder='Enter tag'
                                fullWidth
                                value={tags}
                                onAdd={(tag) => handleAddTag(tag)}
                                onDelete={(tag) => handleDeleteTag(tag)}

                            />
                        </div>

                        <div  style={{ color: "black" }} className='d-flex justify-content-start'>
                            <FileBase  style={{ color: "black" }} type='file' multiple={false} onDone={(({ base64 }) => setImageData({ ...imageData, imageFile: base64 }))} />
                        </div>
                        <div className='col-12'>
                            <MDBBtn style={{ width: "100%" }}>Submit</MDBBtn>
                            <MDBBtn style={{ width: "100%" }} className='mt-2' color='danger' onClick={handleClear}>Clear</MDBBtn>
                        </div>

                    </MDBValidation>
                </MDBCardBody>

            </MDBCard>


        </div>
    )
}

export default AddImage