import React from "react";
import SofaDisc from '../../assets/SofaDisc.png';

interface ProductDescriptionProps {
  title?: string;
  description1?: string;
  description2?: string;
  image1: string;
  image2: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  title = "Description",
  description1 = `Embodying the raw, wayward spirit of rock ’n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.`,
  description2 = `Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.`,
}) => {
  return (
    <div className="max-w-[1200px] mx-auto px-5 py-10">
      <div className="flex justify-center gap-10 mb-5">
        <span className="font-bold text-lg">{title}</span>
        <span className="text-lg text-gray-600">Additional Information</span>
        <span className="text-lg text-gray-600">Reviews [5]</span>
      </div>

      <div className="text-center max-w-[800px] mx-auto">
        <p className="text-gray-600 leading-relaxed mb-4">{description1}</p>
        <p className="text-gray-600 leading-relaxed">{description2}</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-10">
        <div className="rounded-xl p-4">
          <img src={SofaDisc} alt="Product 1" className="w-full rounded-lg" />
        </div>
        <div className="rounded-xl p-4">
          <img src={SofaDisc} alt="Product 2" className="w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
