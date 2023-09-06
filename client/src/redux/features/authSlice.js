import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../api"

export const login = createAsyncThunk("auth/login", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
        console.log("tryyyyyyyy" + formValue)
        const response = await api.signIn(formValue)
        toast.success("Login Successfully")
        navigate("/")
        return response.data
    } catch (err) {
        console.log("erroerrrr")
        return rejectWithValue(err.response.data);
    }
})

export const register = createAsyncThunk("auth/register", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.signUp(formValue)
        toast.success("Register Successfully")
        navigate("/")
        return response.data
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
})




const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: "",
        loading: false,
    },

    reducers: {
        
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLogout: (state, action) => {
            localStorage.clear();
            state.user = null  
            
        }
    },
    
    extraReducers:{
        [login.pending]: (state, action) => {
            state.loading = true
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }))

            console.log(action.payload)

            state.user = action.payload

        },
        [login.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [register.pending]: (state, action) => {
            state.loading = true
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }))
            console.log('kkkkkkkkkkkkkkkkk')
            console.log(action.payload)
            state.user = action.payload

        },
        [register.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
    }

})

export const { setUser, setLogout } = authSlice.actions;
export default authSlice.reducer
