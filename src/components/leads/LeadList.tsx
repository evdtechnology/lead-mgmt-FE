"use client";

import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Container,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeadForm from "./LeadForm";
import { AppDispatch, RootState } from "@/redux/store";
import { getLeadsAsync } from "@/redux/services/lead.service";
import moment from "moment";

export default function LeadList() {
  const dispatch = useDispatch<AppDispatch>(); // ✅ Ensure it's correctly typed
  const [open, setOpen] = useState(false);

  const { leadList, isLoading } = useSelector(
    (state: RootState) => state.leadReducer
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const header = [
    { id: 1, name: "S No." },
    { id: 2, name: "Name" },
    { id: 3, name: "Email" },
    { id: 4, name: "Status" },
    { id: 5, name: "Created Date" },
  ];

  useEffect(() => {
    dispatch(getLeadsAsync());
  }, [dispatch]);

  return (
    <Container sx={{ mt: 4 }}>
      {/* Header Section with Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Leads List
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add New
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              {header.map((item) => (
                <TableCell
                  key={item.id}
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  <Typography variant="h6">{item.name}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              // Show loading placeholders while data is being fetched
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress size={30} />
                </TableCell>
              </TableRow>
            ) : (
              leadList?.map((item, index) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:hover": { bgcolor: "#f5f5f5" } }}
                >
                  <TableCell>
                    <Typography variant="body1">{index + 1}.</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.status}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {moment.utc(item?.createdAt).format("DD-MM-YYYY")}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <LeadForm open={open} handleClose={handleClose} />
    </Container>
  );
}
