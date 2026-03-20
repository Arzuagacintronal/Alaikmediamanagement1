import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const portfolioItems = [
  {
    title: "The Sharp Edge Barbershop",
    category: "Barbershop & Grooming",
    tags: ["Website", "Booking System"],
    description: "Luxury haircut experience with seamless online booking and modern aesthetic.",
    image: `${BASE}images/barber-demo.png`,
  },
  {
    title: "Bella Cucina Italian Restaurant",
    category: "Food & Dining",
    tags: ["Website", "Menu", "Reservations"],
    description: "Elegant dining website showcasing culinary excellence with integrated reservations.",
    image: `${BASE}images/restaurant-demo.png`,
  },
  {
    title: "Prestige Properties Group",
    category: "Real Estate",
    tags: ["Website", "Listings"],
    description: "High-end real estate portfolio featuring immersive property listings and lead capture.",
    image: `${BASE}images/realestate-demo.png`,
  },
  {
    title: "Elite Performance Gym",
    category: "Health & Fitness",
    tags: ["Website", "Social Media"],
    description: "Modern gym platform with dynamic class scheduling and community engagement.",
    image: `${BASE}images/gym-demo.png`,
  }
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-32 relative bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-display font-medium mb-6">
                Our <span className="text-gradient-gold italic">Work</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl font-light tracking-wide">
                A curated selection of digital experiences we've crafted for ambitious brands.
              </p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
             <a href="#contact" className="inline-flex items-center gap-2 text-primary font-medium tracking-wide hover:text-[#F9F0D0] transition-colors group">
                Start your project <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
              className="group relative rounded-[2rem] glass-card overflow-hidden border-white/5 hover:border-primary/30 transition-all duration-500"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/50">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
                
                {/* Category Badge overlay */}
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-medium tracking-widest uppercase text-white/90">
                  {item.category}
                </div>
                
                {/* Diagonal Shine Sweep */}
                <div className="shine-sweep" />
              </div>

              <div className="p-8 relative z-10 bg-background/50 backdrop-blur-sm mt-[-80px] pt-10">
                <h3 className="text-2xl font-display font-medium mb-3 group-hover:text-primary transition-colors duration-300 tracking-wide">{item.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tIndex) => (
                    <span 
                      key={tIndex}
                      className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/5 text-xs font-light text-foreground/70 tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
