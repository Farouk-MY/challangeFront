import { Categories } from "@/components/Categories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { HeroCarousel } from "@/components/HeroCarousel";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { t } = useLanguage();

  return (
    <main>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Features Section */}
      <section className="py-20 glass relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Experience blazing speeds with our optimized technology",
              },
              {
                icon: Shield,
                title: "Secure & Safe",
                description: "Your data is protected with enterprise-grade security",
              },
              {
                icon: Sparkles,
                title: "Premium Quality",
                description: "Only the finest products make it to our catalog",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass-strong p-8 rounded-2xl elegant-border hover:scale-105 transition-transform group"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-orbitron font-bold mb-4 text-primary">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <Categories />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-animated opacity-20" />
        <div className="scan-line" />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-8">
              <span className="elegant-text">
                Ready to Step Into Tomorrow?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join thousands of tech enthusiasts who trust NeonShop for their futuristic needs
            </p>
            <Link to="/products">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 shadow-glow-strong font-orbitron text-xl px-12 py-8"
                >
                  {t("shopNow")}
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-16 glass-strong relative">
        <div className="scan-line" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                  <Zap className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-orbitron font-bold elegant-text">
                  NEONSHOP
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Your destination for cutting-edge technology and futuristic gadgets.
              </p>
            </div>
            <div>
              <h4 className="font-orbitron font-semibold mb-4 sm:mb-6 text-primary text-base sm:text-lg">{t("shop")}</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
                <li><Link to="/products" className="hover:text-primary transition-colors">{t("allProducts")}</Link></li>
                <li><Link to="/products?category=vr" className="hover:text-primary transition-colors">{t("vr")}</Link></li>
                <li><Link to="/products?category=gaming" className="hover:text-primary transition-colors">{t("gaming")}</Link></li>
                <li><Link to="/products?category=audio" className="hover:text-primary transition-colors">{t("audio")}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-orbitron font-semibold mb-4 sm:mb-6 text-primary text-base sm:text-lg">{t("support")}</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">{t("helpCenter")}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t("shipping")}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t("returns")}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t("contact")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-orbitron font-semibold mb-4 sm:mb-6 text-primary text-base sm:text-lg">{t("company")}</h4>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary transition-colors">{t("about")}</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t("careers")}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t("privacy")}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t("terms")}</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/30 text-center">
            <p className="text-sm sm:text-base text-muted-foreground">
              &copy; 2025 NeonShop. {t("allRights")}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
