import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleLinkClick = (link: string) => {
    try {
      switch (link) {
        case "Home":
          navigate("/home");
          break;
        case "Shop":
          navigate("/shop");
          break;
        case "Contact":
          navigate("/contact");
          break;
        case "Blog":
          navigate("/blog");
          break;
        case "Checkout":
          navigate("/checkout");
          break;
        case "Single Product":
          navigate("/singleproduct");
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const links = ["Home", "Shop", "Contact", "Blog", "Checkout", "Single Product"];

  const handleSubscribe = () => {
    if (email.trim()) {
      console.log("Subscribed with email:", email);
      setEmail("");
    }
  };

  return (
    <div className="bg-white pb-7 mt-16 font-sans">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-black mb-12">Funiro.</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              400 University Drive Suite 200 Coral Gables,
              <br />
              FL 33134 USA
            </p>
          </div>

          <div>
            <h4 className="text-base font-medium text-gray-400 mb-12">Links</h4>
            <div className="flex flex-col gap-8">
              {links.map((link) => (
                <button
                  key={link}
                  onClick={() => handleLinkClick(link)}
                  className="text-base font-medium text-black text-left hover:text-blue-600 hover:underline transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-base font-medium text-gray-400 mb-12">Help</h4>
            <div className="flex flex-col gap-8">
              {["Payment Options", "Returns", "Privacy Policies"].map((help) => (
                <div
                  key={help}
                  onClick={() => {
                    if (help === "Privacy Policies") {
                      navigate("/privacy-policy");
                    }
                  }}
                  className={`text-base font-medium text-black ${
                    help === "Privacy Policies"
                      ? "cursor-pointer hover:text-blue-600 hover:underline"
                      : ""
                  }`}
                >
                  {help}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-base font-medium text-gray-400 mb-12">Newsletter</h4>
            <div className="flex gap-2 border-b border-black">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email Address"
                className="flex-1 py-3 text-sm text-gray-400 bg-transparent outline-none placeholder:text-gray-400"
              />
              <button
                onClick={handleSubscribe}
                className="py-3 text-sm font-medium uppercase text-black hover:text-gray-600 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200 my-12" />

        <div className="text-left">
          <p className="text-base text-black m-0">2023 furino. All rights reverved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
