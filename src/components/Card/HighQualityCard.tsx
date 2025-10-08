import { Trophy, CheckCircle, Truck, Headphones } from "lucide-react";

const HighQualityCard = () => {
  const features = [
    {
      icon: <Trophy size={48} className="text-gray-700" />,
      title: "High Quality",
      subtitle: "crafted from top materials",
    },
    {
      icon: <CheckCircle size={48} className="text-gray-700" />,
      title: "Warranty Protection",
      subtitle: "Over 2 years",
    },
    {
      icon: <Truck size={48} className="text-gray-700" />,
      title: "Free Shipping",
      subtitle: "Order over 150 $",
    },
    {
      icon: <Headphones size={48} className="text-gray-700" />,
      title: "24 / 7 Support",
      subtitle: "Dedicated support",
    },
  ];

  return (
    <div className="w-full px-6 py-10 font-sans">
      <div className="max-w-8xl mx-auto bg-[#fef7ed]  p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="text-gray-700 font-semibold text-lg leading-snug mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-snug">
                  {feature.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighQualityCard;
