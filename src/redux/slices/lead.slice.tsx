import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createLeadAsync, getLeadsAsync } from "../services/lead.service";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}

interface ILead {
    isSubmitting: boolean;
    isLoading: boolean;
    leadList: Lead[];
}

const initialState: ILead = {
    isSubmitting: false,
    isLoading: false,
    leadList: []
};

const leadSlice = createSlice({
    name: "lead",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create lead ----------
        builder.addMatcher(isAnyOf(createLeadAsync.pending), (state) => {
            state.isSubmitting = true;
        });
        builder.addMatcher(isAnyOf(createLeadAsync.fulfilled), (state) => {
            state.isSubmitting = false;
        });
        builder.addMatcher(isAnyOf(createLeadAsync.rejected), (state) => {
            state.isSubmitting = false;
        });
        // Create lead ----------
        builder.addMatcher(isAnyOf(getLeadsAsync.pending), (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(isAnyOf(getLeadsAsync.fulfilled), (state,{payload}) => {
            state.isLoading = false;
            state.leadList = payload as Lead[];
        });
        builder.addMatcher(isAnyOf(getLeadsAsync.rejected), (state) => {
            state.isLoading = false;
            state.leadList = [];
        });
        // =================
    }
});
export default leadSlice.reducer;