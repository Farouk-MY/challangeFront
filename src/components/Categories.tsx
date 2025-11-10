import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { loadCategories } from "@/store/slices/productsSlice";
import { Watch, Sparkles, Shirt, Gem } from "lucide-react";

const categoryIcons: Record<string, any> = {
  electronics: Sparkles,
  jewelery: Gem,
  "men's clothing": Shirt,
  "women's clothing": Watch,
};

export function Categories() {
  const { t } = useLanguage();
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(loadCategories());
    }
  }, [dispatch, categories.length]);
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[100px] animate-pulse delay-700" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-orbitron font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="elegant-text">
              {t("exploreCategories")}
            </span>
          </motion.h2>
          <p className="text-muted-foreground text-xl font-inter max-w-2xl mx-auto">
            {t("categoriesSubtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => {
            const IconComponent = categoryIcons[category] || Sparkles;
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, type: "spring" }}
              >
                <Link to={`/products?category=${category}`}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card className="glass-strong group hover:glass border-border/30 hover:border-primary/50 transition-all hover:shadow-glow p-4 sm:p-6 lg:p-8 text-center cursor-pointer relative overflow-hidden elegant-border">
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity gradient-glow" />
                      
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="inline-block mb-3 sm:mb-4 p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all relative z-10"
                      >
                        <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
                      </motion.div>
                      <h3 className="font-orbitron font-bold text-sm sm:text-base group-hover:text-primary transition-colors relative z-10 capitalize">
                        {category}
                      </h3>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
