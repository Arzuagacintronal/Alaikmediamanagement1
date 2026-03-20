import React from 'react';

const items = [
  "Website Design", "·", 
  "Social Media Management", "·", 
  "Brand Strategy", "·", 
  "SEO Optimization", "·", 
  "Content Creation", "·", 
  "Analytics & Reporting", "·"
];

export function Marquee() {
  return (
    <div className="w-full bg-secondary py-4 overflow-hidden border-y border-white/5 relative z-20">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* We duplicate the items a few times to ensure seamless scrolling */}
        {[...Array(6)].map((_, arrayIndex) => (
          <div key={arrayIndex} className="flex items-center shrink-0">
            {items.map((item, index) => (
              <span
                key={`${arrayIndex}-${index}`}
                className={`mx-6 text-sm md:text-base uppercase tracking-[0.2em] font-medium ${
                  item === "·" ? "text-primary" : index % 4 === 0 ? "text-primary/90" : "text-white/80"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
