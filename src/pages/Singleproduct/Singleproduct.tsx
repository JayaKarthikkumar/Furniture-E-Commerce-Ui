import { Box, Breadcrumbs, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AsgaardSofaProduct from "../../components/ViewProduct/ViewProduct";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Products from "../../components/Product/Product";
import ProductDescription from "../../components/SofaDisc/SofaDisc";

export default function Singleproduct() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundColor: "#fdf6ee",
          px: 4,
          py: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Breadcrumbs separator=">" aria-label="breadcrumb "  sx={{
    "& .MuiBreadcrumbs-separator": { color: "black" }, 
  }}>
          <Typography
            sx={{
              cursor: "pointer",
              color: "gray",
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={() => navigate("/")}
          >
            Home
          </Typography>
          <Typography sx={{ color: "gray" }}>Shop</Typography>
          <Typography sx={{ fontWeight: 500, color: "black" }}>
            Asgaard sofa
          </Typography>
        </Breadcrumbs>
      </Box>

      <AsgaardSofaProduct />
      <ProductDescription image1={""} image2={""}/>
      <Products />
      <Footer />
    </>
  );
}
