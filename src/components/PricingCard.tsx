import React from "react";
import { CheckCircle } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  benefits: string[];
  cta: string;
  highlight?: boolean;
  badge?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  originalPrice,
  benefits,
  cta,
  highlight = false,
  badge,
}) => {
  return (
    <div
      className={`relative flex flex-col rounded-3xl border bg-white p-8 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl ${
        highlight ? "border-blue-600 shadow-blue-100" : "border-gray-200"
      }`}
    >
      {badge && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white shadow-md">
            {badge}
          </span>
        </div>
      )}
      <h3 className="mb-2 text-center text-xl font-bold text-gray-900">
        {title}
      </h3>
      <div className="mb-4 flex items-center justify-center gap-2">
        {originalPrice && (
          <span className="text-md font-semibold text-gray-400 line-through">
            {originalPrice}
          </span>
        )}
        <span className="text-3xl font-extrabold text-gray-900">{price}</span>
      </div>
      <ul className="mb-6 flex flex-col gap-2 text-sm">
        {benefits.map((benefit, idx) => (
          <li key={idx} className="flex items-center gap-2 text-gray-700">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            {benefit}
          </li>
        ))}
      </ul>
      <button
        className={`mt-auto w-full rounded-xl px-4 py-3 text-base font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
          highlight
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-100 text-blue-700 hover:bg-blue-50"
        }`}
        onClick={() => window.open("https://wa.me/6282189251516", "_blank")}
      >
        {cta}
      </button>
    </div>
  );
};

export default PricingCard;
