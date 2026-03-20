import { motion } from "framer-motion";

export function Footer() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <footer className="py-14 border-t border-white/5 bg-background relative z-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <motion.div variants={item} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <span className="font-display font-bold text-primary-foreground text-xs tracking-widest">AM</span>
            </div>
            <span className="font-display font-medium text-xl tracking-wide">
              Alaik <span className="text-gradient-gold italic">Media</span>
            </span>
          </motion.div>
          
          <motion.div variants={item} className="flex gap-8 text-sm font-medium tracking-wide text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors duration-300">Terms of Service</a>
          </motion.div>
          
          <motion.p variants={item} className="text-sm font-light tracking-wide text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Alaik Media Management.<br className="md:hidden" /> All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}

