import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Room from "../../assets/Roomimg.png";
import Room1 from "../../assets/RoomImg1.png";
import NextButton from "../../assets/NextButton.png";

const rooms = [
  {
    id: 1,
    number: "01",
    category: "Bed Room",
    title: "Inner Peace",
    description: "Modern minimalist bedroom with gallery wall",
  },
  {
    id: 2,
    number: "02",
    category: "Living Room",
    title: "Cozy Corner",
    description: "Bright and airy living space",
  },
  {
    id: 3,
    number: "03",
    category: "Kitchen",
    title: "Modern Chef",
    description: "Contemporary kitchen design",
  },
];

export default function RoomInspirationUI() {
  const [currentRoom, setCurrentRoom] = useState(0);

  const handleNext = () => {
    setCurrentRoom((prev) => (prev + 1) % rooms.length);
  };

  const handlePrev = () => {
    setCurrentRoom((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  return (
    <div className="min-h-screen bg-[#FCF8F3] flex items-center px-5">
      <div className="max-w-[1200px] mx-auto w-full py-8">
        <div className="flex items-center justify-between gap-8 min-h-[600px]">
          <div className="flex-shrink-0 w-[320px]">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                50+ Beautiful rooms
                <br />
                inspiration
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-8">
                Our designer already made a lot of beautiful
                <br />
                prototype of rooms that inspire you
              </p>
              <button className="bg-[#B88E2F] text-white px-8 py-4 text-lg font-medium hover:bg-[#a47d29] transition-colors">
                Explore More
              </button>
            </div>
          </div>

          <div className="flex-1 max-w-[400px] mx-8">
            <div className="relative w-full h-[500px] overflow-hidden shadow-2xl bg-gradient-to-br from-gray-200 to-gray-400">
              <img
                src={Room}
                alt="Room"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-white/30 backdrop-blur px-3 py-1 text-sm font-bold text-white">
                    {rooms[currentRoom].number}
                  </span>
                  <span className="text-sm text-white/90">
                    {rooms[currentRoom].category}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold m-0">
                    {rooms[currentRoom].title}
                  </h2>
                  <button
                    onClick={handleNext}
                    className="bg-[#B88E2F] text-white p-3 shadow-lg hover:bg-[#a47d29] transition-colors"
                  >
                    <ArrowRight size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 relative">
            <img
              src={NextButton}
              alt="Next"
              onClick={handleNext}
              className="absolute top-[160px] right-0 translate-x-1/2 w-12 h-12 cursor-pointer z-10"
            />
            <div className="w-64 h-96 overflow-hidden shadow-xl bg-white relative">
              <img
                src={Room1}
                alt="Room1"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-center items-center mt-6 gap-3">
              {rooms.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentRoom(index)}
                  className={`w-3.5 h-3.5 rounded-full transition-transform ${
                    index === currentRoom
                      ? "bg-[#B88E2F] scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
