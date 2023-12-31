import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import * as api from "../api"


export const createImage = createAsyncThunk("image/createImage", async ({ updatedImageData, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.createImage(updatedImageData)
        toast.success("Image added  Successfully")
        navigate("/")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const getImages = createAsyncThunk("image/getImages", async (_, { rejectWithValue }) => {
    try {
        const response = await api.getImages()  
        console.log("response.data"+response.data)
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const getImage = createAsyncThunk(
    "image/getImage",
    async (id, { rejectWithValue }) => {
      try {
        console.log("innerSIngle")
        const response = await api.getImage(id);
        console.log("response"+response.data)
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  // export const searchImages = createAsyncThunk(
  //   "image/searchImages",
  //   async (searchQuery, { rejectWithValue }) => {
  //     try {
  //       const response = await api.getImagesBySearch(searchQuery);
  //       return response.data;
  //     } catch (err) {
  //       return rejectWithValue(err.response.data);
  //     }
  //   }
  // );
  // export const searchImages = createAsyncThunk(
  //   'image/searchImages',
  //   async ({ searchQuery, selectedColor }, { rejectWithValue }) => {
  //     try {
  //       // Debug: Log the payload before making the API request
  //       console.log('Search Query in Action:', searchQuery);
  //       console.log('Selected Color in Action:', selectedColor);
  
  //       // Rest of the code...
  //     } catch (err) {
  //       return rejectWithValue(err.response.data);
  //     }
  //   }
  // );

  export const searchImages = createAsyncThunk(
    "image/searchImages",
    async ({ searchQuery, selectedColor }, { rejectWithValue }) => {
      try {
        // Make an API request to fetch images based on both search query and color

              console.log('Search Query in Action:', searchQuery);
              console.log('Selected Color in Action:', selectedColor);
        const response = await api.getImagesBySearchAndColor(
          searchQuery,
          selectedColor
        );
       

        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  



const imageSlice = createSlice({
    name: 'image',
    initialState: {
      image: {},
      images: [], // Initialize as an empty array
      userImages: [],
      error: "",
      selectedColor: "",
      loading: false,
    },
    
    extraReducers: {
        [createImage.pending]: (state, action) => {
            state.loading = true
        },
        [createImage.fulfilled]: (state, action) => {
            state.loading = false
            state.images.push(action.payload);
        },
        [createImage.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [getImages.pending]: (state, action) => {
            state.loading = true
        },
        [getImages.fulfilled]: (state, action) => {
          state.loading = false;
          state.images = action.payload; // Update images with new data
        },
        [getImages.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [getImage.pending]: (state, action) => {
            state.loading = true
        },
        [getImage.fulfilled]: (state, action) => {
            state.loading = false
            state.image=action.payload;
        },
        [getImage.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [searchImages.pending]: (state, action) => {
            state.loading = true;
          },
          [searchImages.fulfilled]: (state, action) => {
            state.loading = false;
            state.images = action.payload; // Update images with search results
          },
          [searchImages.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          },
       
    },
})


 export default imageSlice.reducer
