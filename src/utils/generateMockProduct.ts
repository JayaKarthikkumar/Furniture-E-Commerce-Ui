export const generateMockProducts = (startId: number, count: number) => {
  const productNames = [
    "Syltherine",
    "Leviosa",
    "Lolito",
    "Respira",
    "Grifo",
    "Muggo",
    "Pingky",
    "Potty",
    "Aesthetic",
    "Comfort",
    "Elegance",
    "Simplicity",
    "Vintage",
    "Modern",
    "Luxury",
    "Classic",
    "Nordic",
    "Urban",
    "Rustic",
    "Contemporary",
  ];

  const descriptions = [
    "Stylish cafe chair",
    "Luxury big sofa",
    "Outdoor bar table and stool",
    "Night lamp",
    "Small mug",
    "Cute bed set",
    "Minimalist flower pot",
    "Modern chair design",
    "Ergonomic office chair",
    "Premium dining set",
    "Minimalist table",
    "Classic wooden chair",
    "Contemporary sofa",
    "Premium bed frame",
    "Traditional cabinet",
  ];

  const products = [];
  for (let i = 0; i < count; i++) {
    const id = startId + i;
    const hasDiscount = Math.random() > 0.6;
    const isNew = Math.random() > 0.7;
    const basePrice = Math.floor(Math.random() * 15000000) + 500000;
    const discountPercent = hasDiscount
      ? Math.floor(Math.random() * 50) + 10
      : 0;
    const originalPrice = hasDiscount
      ? basePrice + (basePrice * discountPercent) / 100
      : null;

    products.push({
      id,
      name: productNames[Math.floor(Math.random() * productNames.length)],
      description:
        descriptions[Math.floor(Math.random() * descriptions.length)],
      price: `Rp ${basePrice.toLocaleString("id-ID")}`,
      originalPrice: originalPrice
        ? `Rp ${originalPrice.toLocaleString("id-ID")}`
        : null,
      discount: hasDiscount ? `-${discountPercent}%` : null,
      isNew,
      image: `https://picsum.photos/280/200?random=${id}`,
    });
  }
  return products;
};
