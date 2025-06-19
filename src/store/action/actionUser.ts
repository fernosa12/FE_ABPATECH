import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import Cookies from "js-cookie";

interface DashboardData {
  id: number;
  email: string;
  mobile_number: string;
  foto: string | null;
}
[];

const initialState = {
  dashboard: [] as DashboardData[],
};

export const DashboardSlice = createSlice({
  name: "dashboards",
  initialState,
  reducers: {
    setDashboard: (state, { payload }) => {
      state.dashboard = payload;
    },
  },
});

export const { setDashboard } = DashboardSlice.actions;

export function fetchDashboardData() {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_KEY}/dashboard`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const result = await response.json();

      dispatch(setDashboard(result.data));
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    }
  };
}

export default DashboardSlice.reducer;
