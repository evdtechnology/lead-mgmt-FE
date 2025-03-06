import AxiosClient from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createLeadAsync = createAsyncThunk(
  "/leads/createLeadAsync",
  async (data: object, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/api/leads/create",
      method: "post",
      data,
    })
);

export const getLeadsAsync = createAsyncThunk(
  "/leads/getLeadsAsync",
  async (_, toolkit) =>
    AxiosClient({
      toolkit,
      url: "/api/leads",
      method: "get"
    })
);
