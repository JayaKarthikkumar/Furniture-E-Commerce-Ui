import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  img: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.img}  
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" fontWeight={600}>
          {product.name}
        </Typography>
        <Box display="flex" gap={1}>
          <Typography variant="body1" color="primary">
            {product.price}
          </Typography>
          {product.oldPrice && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              {product.oldPrice}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
