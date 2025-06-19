import { RegisterInterface } from "@/types/interface";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

const initialState = {
  registerUser: [] as RegisterInterface[],
};

export const RegisterSlice = createSlice({
  name: "registerUser",
  initialState,
  reducers: {
    registrations: (state, { payload }) => {
      state.registerUser.push(payload);
    },
  },
});

export const { registrations } = RegisterSlice.actions;

export function registerNewUser(data: RegisterInterface) {
  return async (dispatch: AppDispatch) => {
    try {
      const formData = new FormData();

      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirm_password", data.confirm_password);
      formData.append("mobile_number", data.mobile_number);

      if (data.foto instanceof File) {
        formData.append("foto", data.foto);
      }

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}, ini form data`);
      }

      const response = await fetch(`${import.meta.env.VITE_API_KEY}/register`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: formData,
      });
      console.log(response, "ini response register");

      const result = await response.json();

      console.log(result, "ini hasil store");

      // if (result?.status === 0) {
      //   return result;
      // }

      dispatch(registrations(result?.data));
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}

export default RegisterSlice.reducer;
