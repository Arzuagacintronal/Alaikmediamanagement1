import { motion } from "framer-motion";
import { TrendingUp, CircleDollarSign, Zap, HeartHandshake } from "lucide-react";

const reasons = [
  {
    icon: TrendingUp,
    title: "Results-Driven",
    description: "We don't just build pretty things. We build systems designed to increase conversions and ROI.",
  },
  {
    icon: CircleDollarSign,
    title: "Transparent Pricing",
    description: "Know exactly what you're paying for. No surprise fees or confusing technical jargon.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Time is money. We deploy high-quality assets rapidly without cutting corners.",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated Support",
    description: "Consider us an extension of your team. We're always here when you need us.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-32 relative overflow-hidden bg-background">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/3">
            <div className="flex flex-col items-start">
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 80, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-[1px] bg-gradient-gold mb-8"
              />
              <div className="overflow-hidden mb-8">
                <motion.h2
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-tight"
                >
                  Why Partner With <span className="text-gradient-gold italic">Alaik Media?</span>
                </motion.h2>
              </div>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-muted-foreground text-lg mb-10 leading-relaxed font-light tracking-wide"
              >
                We understand that choosing an agency is a massive decision. Here's why businesses trust us to handle their digital presence with unparalleled precision.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="w-16 h-[1px] bg-gradient-to-r from-primary to-transparent mb-10 origin-left"
              />
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.8 }}
                href="#contact"
                className="inline-flex items-center gap-3 text-primary font-medium tracking-wide hover:text-[#F9F0D0] transition-colors duration-300 group"
              >
                Let's discuss your project 
                <TrendingUp className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" strokeWidth={1.5} />
              </motion.a>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="p-8 rounded-3xl glass-card hover:bg-white/[0.03] hover:border-primary/20 transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 border border-primary/10">
                  <reason.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-display font-medium mb-4 tracking-wide group-hover:text-primary transition-colors duration-300">{reason.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed font-light">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
