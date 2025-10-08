import { Box, Breadcrumbs, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HighQualityCard from "../../components/Card/HighQualityCard";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Shopbanner from "../../assets/Banner.jpg";
import logo from "../../assets/logo.png";
import ProductComparisonPage from "../../components/ProductCompare/Productcompare";

export default function ProductComparision() {
  return (
    <>
      <Navbar />
      <Box position="relative" width="100%" height="300px">
        <CardMedia
          component="img"
          image={Shopbanner}
          alt="Hero Banner"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            color: "black",
            textAlign: "center",
            background: "rgba(0,0,0,0.4)",
          }}
        >
          <Box>
            <img src={logo} alt="Logo" style={{ height: 40 }} />
          </Box>
          <Typography variant="h3" fontWeight="bold" mt={1}>
            Product Comparison
          </Typography>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              color: "black",
              "& .MuiBreadcrumbs-separator": { color: "black" },
              "& a": { color: "black", textDecoration: "none" },
            }}
          >
            <Link to="/home">Home</Link>
            <Typography color="black">Comparison</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      <ProductComparisonPage/>
      <HighQualityCard />
      <Footer />
    </>
  );
}
