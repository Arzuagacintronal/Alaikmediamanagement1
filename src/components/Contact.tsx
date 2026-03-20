import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call for static site
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form data:", data);
    
    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-32 relative bg-background noise-bg">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-10 md:p-16 rounded-[3rem] glass-card relative overflow-hidden"
        >
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(212,175,55,0.1)_0%,_transparent_70%)] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none mix-blend-screen" />
          
          <div className="grid md:grid-cols-2 gap-16 items-start relative z-10">
            <div className="flex flex-col items-start">
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 80, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-[1px] bg-gradient-gold mb-8"
              />
              <div className="overflow-hidden mb-6">
                <motion.h2
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  className="text-4xl md:text-5xl font-display font-medium leading-tight"
                >
                  Ready to elevate your <span className="text-gradient-gold italic">brand?</span>
                </motion.h2>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-muted-foreground mb-12 text-lg font-light leading-relaxed tracking-wide"
              >
                Drop us a line and let's discuss how we can transform your digital presence into a premium experience.
              </motion.p>
              
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6 }}
                href="mailto:alaikmediamanagement@outlook.com"
                className="inline-flex items-center gap-5 text-lg font-medium hover:text-primary transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500">
                  <Mail className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <span className="tracking-wide">alaikmediamanagement@outlook.com</span>
              </motion.a>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  {...form.register("name")}
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-4.5 rounded-2xl bg-white/[0.02] border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/70 focus:bg-white/[0.04] transition-all duration-300 font-light"
                />
                {form.formState.errors.name && (
                  <p className="text-destructive text-sm mt-2 ml-2 font-medium">{form.formState.errors.name.message}</p>
                )}
              </div>
              
              <div>
                <input
                  {...form.register("email")}
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-6 py-4.5 rounded-2xl bg-white/[0.02] border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/70 focus:bg-white/[0.04] transition-all duration-300 font-light"
                />
                {form.formState.errors.email && (
                  <p className="text-destructive text-sm mt-2 ml-2 font-medium">{form.formState.errors.email.message}</p>
                )}
              </div>
              
              <div>
                <textarea
                  {...form.register("message")}
                  placeholder="Tell us about your project..."
                  rows={4}
                  className="w-full px-6 py-4.5 rounded-2xl bg-white/[0.02] border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/70 focus:bg-white/[0.04] transition-all duration-300 resize-none font-light"
                />
                {form.formState.errors.message && (
                  <p className="text-destructive text-sm mt-2 ml-2 font-medium">{form.formState.errors.message.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 rounded-2xl font-medium tracking-wide flex items-center justify-center gap-3 bg-gradient-gold text-primary-foreground shadow-[0_10px_20px_-10px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_30px_-10px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Send Inquiry
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
