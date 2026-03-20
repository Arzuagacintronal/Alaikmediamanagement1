import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { type ReactNode, MouseEvent, useRef, useState } from "react";

const tiers = [
  {
    name: "Starter",
    price: "397",
    interval: "one-time",
    description: "Perfect for establishing your digital footprint.",
    features: [
      "Custom website build",
      "Mobile responsive design",
      "Basic SEO setup",
      "1 revision round",
      "$60/mo maintenance for updates & support"
    ],
    buttonText: "Start Building",
    highlight: false,
  },
  {
    name: "Premium",
    price: "597",
    interval: "/month",
    description: "The complete package for businesses ready to grow.",
    features: [
      "Everything in Starter",
      "Social media management",
      "12 posts per month (2 platforms)",
      "Monthly analytics report",
      "Content calendar",
      "Priority email support",
      "$60/mo maintenance included"
    ],
    buttonText: "Go Premium",
    highlight: true,
  },
];

const TiltCard = ({ children, className }: { children: ReactNode, className?: string }) => {
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-8 to 8 degrees max)
    const rotateX = -((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform,
        transition: "transform 0.1s ease-out",
        transformStyle: "preserve-3d"
      }}
    >
      {children}
    </div>
  );
};

export function Pricing() {
  return (
    <section id="pricing" className="py-32 relative bg-background">
      <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-display font-medium mb-6">
            Transparent, <span className="text-gradient-gold italic">Value-Driven</span> Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light tracking-wide">
            Choose the package that aligns with your business goals. No hidden fees, just undeniable results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-4xl mx-auto" style={{ perspective: "1000px" }}>
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative h-full z-${tier.highlight ? '10' : '0'}`}
            >
              <TiltCard
                className={`relative rounded-3xl h-full transition-all duration-300 group`}
              >
                {/* Gold gradient border wrapper for highlighted card */}
                {tier.highlight && (
                  <div className="absolute -inset-[2px] rounded-[1.6rem] bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/50 to-transparent opacity-80 blur-[2px] group-hover:blur-[4px] transition-all duration-500" style={{ transform: "translateZ(-1px)" }} />
                )}
                {tier.highlight && (
                  <div className="absolute -inset-[1px] rounded-[1.55rem] bg-gradient-to-b from-[#F9F0D0] via-[#D4AF37] to-[#8C6D1F]" style={{ transform: "translateZ(-1px)" }} />
                )}

                <div className={`relative h-full p-8 md:p-10 rounded-3xl ${
                  tier.highlight 
                    ? "bg-background m-[1px] shadow-[0_0_50px_-15px_rgba(212,175,55,0.3)]" 
                    : "glass-card border-white/5 hover:border-primary/30"
                }`}>
                {/* Hover shimmer effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/0 via-white/[0.05] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-gradient-gold text-primary-foreground text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-[0_5px_15px_rgba(212,175,55,0.4)]">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-3xl font-display font-medium mb-3 tracking-wide">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-8 h-10 font-light leading-relaxed">{tier.description}</p>
                
                <div className="flex items-baseline gap-2 mb-10 pb-10 border-b border-white/10 relative">
                  {tier.highlight && (
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  )}
                  <span className="text-5xl md:text-6xl font-display font-medium text-foreground tracking-tight">${tier.price}</span>
                  <span className="text-muted-foreground font-medium tracking-wide">{tier.interval}</span>
                </div>
                
                <ul className="space-y-5 mb-12 min-h-[320px]">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-4">
                      <div className={`mt-1 p-1 rounded-full shrink-0 ${tier.highlight ? "bg-primary/20" : "bg-white/5"}`}>
                        <Check className={`w-3.5 h-3.5 ${tier.highlight ? "text-primary" : "text-white/60"}`} />
                      </div>
                      <span className="text-[15px] text-foreground/80 leading-relaxed font-light">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href="#contact"
                  className={`w-full py-4.5 rounded-xl font-medium tracking-wide flex items-center justify-center gap-3 transition-all duration-500 relative overflow-hidden group/btn ${
                    tier.highlight
                      ? "bg-gradient-gold text-primary-foreground shadow-[0_10px_20px_-10px_rgba(212,175,55,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(212,175,55,0.7)]"
                      : "bg-white/[0.03] border border-white/10 text-foreground hover:bg-primary/10 hover:border-primary/50"
                  }`}
                >
                  <span className="relative z-10">{tier.buttonText}</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  {tier.highlight && (
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
                  )}
                </a>
              </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
