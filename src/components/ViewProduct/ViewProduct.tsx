import { useState } from "react";
import { Star, Plus, Minus, Facebook, Linkedin, Twitter } from "lucide-react";
import Sofa from "../../assets/Sofa.png";
import Sofa1 from "../../assets/Sofa1.png";
import Sofa2 from "../../assets/Sofa2.png";
import agardsofa from "../../assets/Asgaardsofa.png";
import rectanglebg from "../../assets/RectangleBG.png";
import AddToCart from "../../components/AddToCart/AddToCart";
import { useNavigate } from "react-router-dom";

export default function AsgaardSofaProduct() {
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("purple");
  const [quantity, setQuantity] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(agardsofa);
  const navigate = useNavigate();

  const thumbnailImages = [Sofa, Sofa1, Sofa2, agardsofa];

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  const colorOptions = [
    { name: "purple", color: "#8B5CF6" },
    { name: "black", color: "#000000" },
    { name: "gold", color: "#D97706" },
  ];

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-5 py-10 font-sans">
        <div className="grid grid-cols-[auto_1fr_1fr] gap-10 items-start">
          <div className="flex flex-col gap-4">
            {thumbnailImages.map((img, index) => (
              <div
                key={index}
                className="w-[90px] h-[90px] rounded-lg cursor-pointer flex items-center justify-center"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-[90px] h-[90px] object-contain"
                />
              </div>
            ))}
          </div>

          <div className="rounded-xl p-10 flex items-center justify-center min-h-[400px]">
            <div className="relative w-full h-full max-w-[550px] max-h-[500px]">
              <img
                src={rectanglebg}
                alt="Background"
                className="w-full h-full object-contain"
              />
              <img
                src={selectedImage}
                alt="Asgaard Sofa"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[80%] max-h-[80%] object-contain"
              />
            </div>
          </div>

          <div className="pl-5">
            <h1 className="text-[42px] font-normal text-black leading-tight mb-2">
              Asgaard sofa
            </h1>

            <p className="text-2xl text-gray-500 mb-5">Rs. 250,000.00</p>

            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                ))}
                <Star size={20} className="text-yellow-400 opacity-50" />
              </div>
              <span className="text-gray-500 text-sm ml-2 pl-2 border-l">
                5 Customer Review
              </span>
            </div>

            <p className="text-sm leading-6 text-gray-800 mb-8 max-w-[400px]">
              Setting the bar as one of the loudest speakers in its class, the
              Kilburn is a compact, stout-hearted hero with a well-balanced
              audio which boasts a clear midrange and extended highs for a sound.
            </p>

            <div className="mb-5">
              <p className="text-sm text-gray-500 mb-3">Size</p>
              <div className="flex gap-3">
                {["L", "XL", "XS"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded ${
                      selectedSize === size
                        ? "bg-yellow-700 text-white"
                        : "bg-gray-100 text-gray-800"
                    } text-sm min-w-[40px]`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-3">Color</p>
              <div className="flex gap-3">
                {colorOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => setSelectedColor(option.name)}
                    className={`w-[30px] h-[30px] rounded-full cursor-pointer`}
                    style={{
                      backgroundColor: option.color,
                      border:
                        selectedColor === option.name
                          ? "3px solid black"
                          : "1px solid #ddd",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-5 items-center mb-10">
              <div className="flex items-center border border-gray-300 rounded-lg p-2">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 text-gray-600"
                >
                  <Minus size={16} />
                </button>
                <span className="mx-4 text-lg min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 text-gray-600"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                className="px-6 py-3 border border-black rounded-lg text-black text-lg flex items-center gap-2"
                onClick={() => setIsDrawerOpen(true)}
              >
                Add To Cart
              </button>

              <button
                className="px-6 py-3 border border-black rounded-lg text-black text-lg flex items-center gap-2"
                onClick={() => navigate("/ProductComparision")}
              >
                <Plus size={16} />
                Compare
              </button>
            </div>

            <div className="border-t border-gray-200 pt-5 text-base leading-8">
              <div className="text-gray-500 mb-2">
                <span className="inline-block min-w-[80px]">SKU</span> :{" "}
                <span className="text-gray-800">SS001</span>
              </div>
              <div className="text-gray-500 mb-2">
                <span className="inline-block min-w-[80px]">Category</span> :{" "}
                <span className="text-gray-800">Sofas</span>
              </div>
              <div className="text-gray-500 mb-5">
                <span className="inline-block min-w-[80px]">Tags</span> :{" "}
                <span className="text-gray-800">Sofa, Chair, Home, Shop</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-gray-500">Share :</span>
                <div className="flex gap-3">
                  <Facebook size={20} className="text-black cursor-pointer" />
                  <Linkedin size={20} className="text-black cursor-pointer" />
                  <Twitter size={20} className="text-black cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddToCart open={isDrawerOpen} onClose={handleClose} />
    </>
  );
}
