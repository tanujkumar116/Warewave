import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchUserOrders=createAsyncThunk("orders/fetchUserOrders",async(__dirname,{rejectWithValue})=>{
    try {
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`,
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})
export const fetchOrderDetails=createAsyncThunk("orders/fetchOrderDetails",async(orderid,{rejectWithValue})=>{
    try {
        const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderid}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`,
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})
const orderSlice=createSlice({
    name:"order",
    initialState:{
        orders:[],
        totalOrders:0,
        orderDetails:null,
        loading:false,
        erorr:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUserOrders.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchUserOrders.fulfilled,(state,action)=>{
            state.loading=false;
            state.orders=action.payload;
        })
        .addCase(fetchUserOrders.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message;
        })
        //singleorder
        .addCase(fetchOrderDetails.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchOrderDetails.fulfilled,(state,action)=>{
            state.loading=false;
            state.orderDetails=action.payload;
        })
        .addCase(fetchOrderDetails.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message;
        })
    }
})
export default orderSlice.reducer
