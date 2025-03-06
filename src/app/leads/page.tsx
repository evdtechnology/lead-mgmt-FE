"use client";

// import { useRouter } from "next/navigation";
import { Box, Card, CardContent, Typography } from "@mui/material";
import LeadList from "@/components/leads/LeadList";

export default function AddLeadPage() {
  // const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        p: 4,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 900, p: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
            Lead Management
          </Typography>

          {/* Add New Lead */}
          {/* <Button
            onClick={() => router.back()}
            variant="contained"
            sx={{
              display: "block",
              width: "100%",
              mb: 2,
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            Add New
          </Button> */}

          {/* Get All Lead List */}
          <LeadList />

        </CardContent>
      </Card>
    </Box>
  );
}
