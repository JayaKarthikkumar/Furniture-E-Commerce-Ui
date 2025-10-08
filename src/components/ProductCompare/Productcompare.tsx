import { useState } from "react";
import { Star, ChevronDown } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  rating: number;
  reviews: number;
  img: string;
  general: string[];
  product: string[];
  dimensions: string[];
  warranty: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Asgaard Sofa",
    price: "Rs. 250,000.00",
    rating: 4.7,
    reviews: 204,
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    general: [
      "1 sectional sofa",
      "TFCBLIGRBL6SRHS",
      "Solid Wood",
      "L-shaped",
      "Fabric + Cotton",
      "Bright Grey & Lion",
    ],
    product: ["Foam", "Bright Grey & Lion", "No", "280 KG", "India"],
    dimensions: [
      "265.32 cm",
      "76 cm",
      "167.76 cm",
      "45 KG",
      "41.52 cm",
      "5.46 cm",
    ],
    warranty: [
      "1 Year Manufacturing Warranty",
      "For Warranty Claims or Any Product Related Issues Please Email at operations@trevifurniture.com",
      "Warranty Against Manufacturing Defect",
      "The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.",
      "1 Year",
    ],
  },
  {
    id: 2,
    name: "Outdoor Sofa Set",
    price: "Rs. 224,000.00",
    rating: 4.2,
    reviews: 145,
    img: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400&h=300&fit=crop",
    general: [
      "1 Three Seater, 2 Single Seater",
      "DTUBLIGRBL568",
      "Solid Wood",
      "L-shaped",
      "Fabric + Cotton",
      "Bright Grey & Lion",
    ],
    product: ["Matte", "Bright Grey & Lion", "Yes", "300 KG", "India"],
    dimensions: [
      "265.32 cm",
      "76 cm",
      "167.76 cm",
      "65 KG",
      "41.52 cm",
      "5.46 cm",
    ],
    warranty: [
      "1.2 Year Manufacturing Warranty",
      "For Warranty Claims or Any Product Related Issues Please Email at support@xyz.com",
      "Warranty of the product is limited to manufacturing defects only.",
      "The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.",
      "3 Months",
    ],
  },
  {
    id: 3,
    name: "Luxury Recliner",
    price: "Rs. 180,000.00",
    rating: 4.5,
    reviews: 320,
    img: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&h=300&fit=crop",
    general: [
      "1 Recliner Sofa",
      "LUXRECL123",
      "Solid Wood + Steel",
      "Single",
      "Leather",
      "Brown",
    ],
    product: ["Foam + Spring", "Glossy Finish", "Yes", "200 KG", "India"],
    dimensions: ["100 cm", "110 cm", "90 cm", "40 KG", "50 cm", "8 cm"],
    warranty: [
      "2 Year Manufacturing Warranty",
      "For Warranty Claims or Any Product Related Issues Please Email at support@luxury.com",
      "Warranty covers frame and recliner mechanism",
      "Does not cover leather wear & tear",
      "2 Years",
    ],
  },
];

const specLabels = {
  general: [
    "Sales Package",
    "Model Number",
    "Secondary Material",
    "Configuration",
    "Upholstery Material",
    "Upholstery Color",
  ],
  product: [
    "Filling Material",
    "Finish Type",
    "Adjustable Headrest",
    "Maximum Load Capacity",
    "Origin of Manufacture",
  ],
  dimensions: ["Width", "Height", "Depth", "Weight", "Seat Height", "Leg Height"],
  warranty: [
    "Warranty Summary",
    "Warranty Service Type",
    "Covered in Warranty",
    "Not Covered in Warranty",
    "Domestic Warranty",
  ],
};

export default function ProductComparisonPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="max-w-[1200px] mx-auto p-5 sm:p-10 font-sans bg-white">
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr_1fr_1fr] gap-8 mb-10 items-start">
        <div>
          <h2 className="text-2xl font-bold text-black mb-2 leading-tight">
            Go to Product page for more Products
          </h2>
          <button className="text-gray-600 underline text-sm cursor-pointer bg-none border-none p-0">
            View More
          </button>
        </div>
        {products.slice(0, 2).map((p, idx) => (
          <div key={idx} className="text-center">
            <div className="w-full h-[200px] rounded-lg mb-4 p-5 flex items-center justify-center">
              <img
                src={p.img}
                alt={p.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <h3 className="text-xl font-bold mb-1 text-black">{p.name}</h3>
            <p className="text-lg text-black mb-2">{p.price}</p>
            <div className="flex items-center gap-2 justify-center">
              <span className="text-base font-bold">{p.rating}</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(p.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-yellow-400 opacity-50"
                    }
                  />
                ))}
              </div>
              <span className="text-gray-500 text-sm border-l border-gray-300 pl-2">
                {p.reviews} Review
              </span>
            </div>
          </div>
        ))}
        <div className="text-center relative">
          <h3 className="text-xl font-bold mb-4 text-black">Add A Product</h3>
          {selectedProduct ? (
            <div>
              <div className="w-full h-[200px] rounded-lg mb-4 p-5 flex items-center justify-center">
                <img
                  src={selectedProduct.img}
                  alt={selectedProduct.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-1 text-black">{selectedProduct.name}</h3>
              <p className="text-lg text-black mb-2">{selectedProduct.price}</p>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-base font-bold">{selectedProduct.rating}</span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(selectedProduct.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-yellow-400 opacity-50"
                      }
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-sm border-l border-gray-300 pl-2">
                  {selectedProduct.reviews} Review
                </span>
              </div>
            </div>
          ) : (
            <div className="relative w-full">
              <button
                className="w-full px-4 py-3 bg-[#B8860B] text-white rounded cursor-pointer text-sm flex justify-between items-center"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Choose a Product
                <ChevronDown size={16} />
              </button>
              {dropdownOpen && (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded shadow-md z-10">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(p);
                        setDropdownOpen(false);
                      }}
                    >
                      {p.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr_1fr_1fr] gap-8 border border-gray-300 rounded-lg p-5 overflow-x-auto">
        <div>
          <h2 className="text-2xl font-bold text-black mb-5 h-[56px] flex items-end">General</h2>
          {specLabels.general.map((spec, i) => (
            <p key={i} className="text-base text-black font-medium mb-5 h-[56px] flex items-center border-b border-gray-200">
              {spec}
            </p>
          ))}
          <h2 className="text-2xl font-bold text-black mb-5 h-[56px] flex items-end mt-5">Product</h2>
          {specLabels.product.map((spec, i) => (
            <p key={i} className="text-base text-black font-medium mb-5 h-[56px] flex items-center border-b border-gray-200">
              {spec}
            </p>
          ))}
          <h2 className="text-2xl font-bold text-black mb-5 h-[56px] flex items-end mt-5">Dimensions</h2>
          {specLabels.dimensions.map((spec, i) => (
            <p key={i} className="text-base text-black font-medium mb-5 h-[56px] flex items-center border-b border-gray-200">
              {spec}
            </p>
          ))}
          <h2 className="text-2xl font-bold text-black mb-5 h-[56px] flex items-end mt-5">Warranty</h2>
          {specLabels.warranty.map((spec, i) => (
            <p key={i} className="text-base text-black font-medium mb-5 h-[56px] flex items-center border-b border-gray-200">
              {spec}
            </p>
          ))}
        </div>
        {[products[0], products[1], selectedProduct].map(
          (p, colIdx) =>
            p && (
              <div key={colIdx}>
                <div className="h-[56px]" />
                {p.general.map((val, i) => (
                  <p
                    key={i}
                    className="text-base text-black mb-5 h-[56px] flex items-center border-b border-gray-200"
                  >
                    {val}
                  </p>
                ))}
                <div className="h-[56px] mt-5" />
                {p.product.map((val, i) => (
                  <p
                    key={i}
                    className="text-base text-black mb-5 h-[56px] flex items-center border-b border-gray-200"
                  >
                    {val}
                  </p>
                ))}
                <div className="h-[56px] mt-5" />
                {p.dimensions.map((val, i) => (
                  <p
                    key={i}
                    className="text-base text-black mb-5 h-[56px] flex items-center border-b border-gray-200"
                  >
                    {val}
                  </p>
                ))}
                <div className="h-[56px] mt-5" />
                {p.warranty.map((val, i) => (
                  <p
                    key={i}
                    className="text-base text-black mb-5 h-[56px] flex items-center border-b border-gray-200"
                  >
                    {val}
                  </p>
                ))}
                <button className="w-[200px] px-6 py-3 bg-[#B8860B] text-white rounded font-medium mt-5">
                  Add To Cart
                </button>
              </div>
            )
        )}
      </div>
    </div>
  );
}