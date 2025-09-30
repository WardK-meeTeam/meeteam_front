import { useState } from "react";

export default function StarRating({
   rating, 
   onChangeRating 
}: { 
  rating: number, 
  onChangeRating: (rating: number) => void 
}) {

  const [hoveredIndex, setHoveredIndex] = useState(-1);
  
  return (
    <div className="flex items-center">
      <div className="flex w-[110px] h-[22px] bg-[url('/images/star_icon_off.png')] bg-left">
        {
          Array.from({ length: 5 }).map((_, index) => {
            const isActive = hoveredIndex >= 0 ? index <= hoveredIndex : index < rating;
            
            return (
              <div 
                key={`star-${index}`}
                className={`w-[22px] h-[22px] bg-[url('/images/star_icon_on.png')] bg-left cursor-pointer transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => onChangeRating(index + 1)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              ></div>
            )
          })
        }
      </div>
      <div className="ml-3 text-xs font-medium text-black">
        {hoveredIndex >= 0 ? (hoveredIndex+1).toFixed(1) : rating.toFixed(1)} <span className="text-mtm-text-gray"> / 5</span>
      </div>
    </div>
  )
}