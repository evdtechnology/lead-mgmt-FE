"use client";

import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import { LEAD_STATUSES } from "@/utils/enums";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { createLeadAsync, getLeadsAsync } from "@/redux/services/lead.service";
import toast from "react-hot-toast";

interface LeadFormProps {
  open: boolean;
  handleClose: () => void;
}

export default function LeadForm({ open, handleClose }: LeadFormProps) {
  const dispatch = useDispatch<AppDispatch>(); // ✅ Ensure it's correctly typed
  const [form, setForm] = useState({ name: "", email: "", status: "" });
  const [error, setError] = useState(false);

  const {isSubmitting} = useSelector((state: RootState) => state.leadReducer);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.name === "" || form.email === "" || form.status === "") {
      setError(true);
    } else {
      setError(false);
      console.log(form, "form data");
      dispatch(createLeadAsync(form)).then((res) => {
        if (!('error' in res)) {
          toast.success('Lead created successfully');
          dispatch(getLeadsAsync());
          handleClose();
          setForm({ name: "", email: "", status: "" })
        }
      })
    }
  };

  useEffect(()=>{
    setForm({ name: "", email: "", status: "" })
  },[])

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          padding: 4,
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        textAlign="center"
        fontWeight={600}
        variant="h5"
      >
        {"Add New Lead"}
      </DialogTitle>
      <Divider sx={{ borderBottom: "2px solid black" }} />
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ my: 2 }}>
            <TextField
              size="small"
              label="Name"
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={error && form.name === ""}
              helperText={error && form.name === "" ? "Name is required" : ""}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              type="email"
              size="small"
              label="Email"
              fullWidth
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={error && form.email === ""}
              helperText={error && form.email === "" ? "Email is required" : ""}
            />
          </Box>
          <Box>
            <Autocomplete
              size="small"
              options={LEAD_STATUSES}
              value={form.status}
              onChange={(_, value) => setForm({ ...form, status: value || "" })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Status"
                  error={error && form.status === ""}
                  helperText={
                    error && form.status === "" ? "Status is required" : ""
                  }
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
          <Button variant="contained" type="submit" color="primary">
            {isSubmitting ? 
            <CircularProgress size={24} sx={{color: "white"}}/> :
            "Submit" }
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
