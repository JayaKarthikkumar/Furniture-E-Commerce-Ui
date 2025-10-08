import HighQualityCard from "../../components/Card/HighQualityCard";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { Box, CardMedia, Typography, Breadcrumbs, Link } from "@mui/material";
import Shopbanner from "../../assets/Banner.jpg";
import logo from "../../assets/logo.png";
import BillingDetails from "../../components/Billing/Billing";

const Checkout = () => {
  return (
    <>
      <Navbar />
      <Box width="100%" display="flex" justifyContent="center">
      <Box position="relative" width="100%" maxWidth="1600px" height="300px">
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
            Checkout
          </Typography>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              color: "black",
              "& .MuiBreadcrumbs-separator": { color: "black" },
              "& a": { color: "black", textDecoration: "none" },
            }}
          >
            <Link href="/home">Home</Link>
            <Typography color="black">Checkout</Typography>
          </Breadcrumbs>
        </Box>
      </Box>
    </Box>
      <BillingDetails/>
      <HighQualityCard />
      <Footer />
    </>
  );
};

export default Checkout;