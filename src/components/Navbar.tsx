import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/60 backdrop-blur-xl border-b border-primary/20 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-500">
            <span className="font-display font-bold text-primary-foreground text-sm tracking-widest">AM</span>
          </div>
          <span className="font-display font-medium text-2xl tracking-wide text-foreground">
            Alaik <span className="text-gradient-gold italic">Media</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full text-sm font-medium tracking-wide bg-white/[0.03] border border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary transition-all duration-500 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            Get Started
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground p-2 hover:text-primary transition-colors duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-primary/20 md:hidden flex flex-col px-6 py-6 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-4 text-lg font-display tracking-wide text-muted-foreground border-b border-white/5 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-8 px-6 py-4 text-center rounded-xl bg-gradient-gold text-primary-foreground font-medium tracking-wide shadow-lg shadow-primary/20"
            >
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
