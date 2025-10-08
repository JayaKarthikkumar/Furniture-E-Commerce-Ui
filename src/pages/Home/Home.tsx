import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  CardMedia,
  Card,
  CardContent,
} from "@mui/material";
import Layout from "../../components/Layout/Layout";
import bgImg from "../../assets/bg.jpg";
import diningImg from "../../assets/dining.png";
import livingImg from "../../assets/living.png";
import bedroomImg from "../../assets/bedroom.png";

import share1 from "../../assets/share1.png";
import share2 from "../../assets/share2.png";
import share3 from "../../assets/share3.png";
import share4 from "../../assets/share4.png";
import share5 from "../../assets/share5.png";
import share6 from "../../assets/share6.png";
import share7 from "../../assets/share7.png";
import share8 from "../../assets/share8.png";
import Products from "../../components/Product/Product";
import RoomInspirationUI from "../../components/RoomHomePage/RoomPage";

const categories = [
  { label: "Dining", image: diningImg },
  { label: "Living", image: livingImg },
  { label: "Bedroom", image: bedroomImg },
];

const Home: React.FC = () => {
  return (
    <>
      <Layout>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "650px",
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image={bgImg}
            alt="Hero Banner"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              top: "50%",
              right: "10%",
              transform: "translateY(-50%)",
              maxWidth: 400,
              borderRadius: "12px",
              transition: "transform 0.4s ease",
              "&:hover": {
                transform: "translateY(-50%) scale(1.05)",
              },
            }}
          >
            <Card
              sx={{
                borderRadius: "8px",
                boxShadow: 4,
                bgcolor: "#fdf6ec",
                width: { xs: "100%", sm: "400px", md: "500px" },
                height: "auto",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ letterSpacing: 2, color: "text.secondary", mb: 1 }}
                >
                  New Arrival
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#B88E2F", mb: 2 }}
                >
                  Discover Our <br /> New Collection
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  tellus, luctus nec ullamcorper mattis.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#B88E2F",
                    color: "#fff",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    borderRadius: 0,
                    "&:hover": {
                      bgcolor: "#a47d29",
                    },
                  }}
                >
                  BUY NOW
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Container sx={{ py: 6 }}>
          <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
            Browse The Range
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            mb={4}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {categories.map((cat, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: 2,
                    bgcolor: "white",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={cat.image}
                    alt={cat.label}
                    sx={{
                      width: "100%",
                      height: 300,
                      objectFit: "cover",
                      borderRadius: 3,
                    }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ mt: 2, textAlign: "center" }}
                >
                  {cat.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Products />
        <RoomInspirationUI />
        <Box sx={{ py: 6, bgcolor: "#fafafa", textAlign: "center" }}>
          <Typography variant="h5" fontWeight={700}>
            Share your setup with
          </Typography>
          <Typography variant="h4" fontWeight={700} color="primary" mb={4}>
            #FuniroFurniture
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridAutoRows: "200px",
              gap: 2,
              width: "100%",
            }}
          >
            <Box
              sx={{
                gridRow: "span 2",
                gridColumn: "span 1",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                image={share1}
                alt="Share 1"
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>

            <Box
              sx={{
                gridRow: "span 1",
                gridColumn: "span 1",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                image={share2}
                alt="Share 2"
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>

            <Box
              sx={{
                gridRow: "span 2",
                gridColumn: "span 1",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                image={share3}
                alt="Share 3"
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>

            <Box
              sx={{
                gridRow: "span 2",
                gridColumn: "span 1",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                image={share4}
                alt="Share 4"
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>

            <Box
              sx={{
                gridRow: "span 1",
                gridColumn: "span 1",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                image={share5}
                alt="Share 5"
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>

            <Box
              sx={{
                gridRow: "span 1",
                gridColumn: "span 2",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                image={share6}
                alt="Share 6"
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>

            <Box
              sx={{
                gridRow: "span 1",
                gridColumn: "span 1",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                image={share7}
                alt="Share 7"
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>

            <Box
              sx={{
                gridRow: "span 1",
                gridColumn: "span 1",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                image={share8}
                alt="Share 8"
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
};

export default Home;