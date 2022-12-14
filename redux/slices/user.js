import { createSlice } from "@reduxjs/toolkit";
//import { AppDispatch, RootState } from "..";

import axios, { AxiosRequestConfig } from "axios";



const initialState = {
  isLoading: true,
  isAuthenticated: false,
  userData: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.userData = payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
  },
});

//export const userSelector = (RootState) => state.user;

export const { getUser, getUserSuccess } = userSlice.actions;

export default userSlice.reducer;

export const getCurrentUser = () => {
  return async (AppDispatch) => {
    dispatch(getUser());
    try {
      const response = await axiosInstance.get("/v1/me");
      storeData("@userData", JSON.stringify(response.data));
      storeData("@userid", response.data.id);
      getUserSuccess(response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error);
    }
  };
};