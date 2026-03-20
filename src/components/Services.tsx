import { motion } from "framer-motion";
import { Code2, Settings, Share2 } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Website Creation",
    description: "Custom-built, lightning-fast, and mobile-ready websites designed to convert visitors into loyal customers. Tailored perfectly to your brand.",
  },
  {
    icon: Settings,
    title: "Website Management",
    description: "Ongoing updates, impenetrable security, and 24/7 performance monitoring. We handle the tech so you can focus on your business.",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Strategic content creation, meticulous scheduling, and targeted growth strategy across the platforms that matter most to your audience.",
  }
];

export function Services() {
  return (
    <section id="services" className="py-32 relative bg-background noise-bg">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 flex flex-col items-center">
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-[1px] bg-gradient-gold mb-8"
          />
          <div className="overflow-hidden mb-6">
            <motion.h2 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="text-4xl md:text-6xl font-display font-medium"
            >
              Comprehensive <span className="text-gradient-gold italic">Digital Solutions</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto font-light tracking-wide"
          >
            Everything you need to establish, maintain, and scale your digital presence. Handled by experts.
          </motion.p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mt-10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
              className="group relative p-10 rounded-3xl glass-card hover:border-primary/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_-20px_rgba(212,175,55,0.2)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none" />
              
              {/* Thin gold decorative top line */}
              <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-20 h-20 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <service.icon className="w-10 h-10 text-primary relative z-10 group-hover:text-[#F9F0D0] transition-colors duration-500" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl font-display font-medium mb-5 text-foreground tracking-wide group-hover:text-primary transition-colors duration-300">{service.title}</h3>
              <p className="text-muted-foreground font-light leading-relaxed tracking-wide">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
