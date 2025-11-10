import { Link } from "react-router-dom";
import { ShoppingCart, Star, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useState } from "react";
import { QuickView } from "./QuickView";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const { t } = useLanguage();
  const [showQuickView, setShowQuickView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const inWishlist = wishlistItems.some(item => String(item.id) === String(product.id));

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card className="glass-strong group overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-glow relative neon-border">
          <Link to={`/product/${product.id}`}>
            <div className="relative overflow-hidden aspect-square bg-white">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Quick View Overlay */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm"
                  >
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowQuickView(true);
                      }}
                      className="bg-primary hover:bg-primary/90 shadow-glow font-semibold"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {t("quickView")}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Link>

          {/* Wishlist Button */}
          <motion.button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 z-10 p-2 rounded-full glass-strong border border-border/50 hover:border-secondary/50 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className={`h-4 w-4 transition-all ${
                inWishlist ? "fill-red-500 text-red-500" : "text-foreground"
              }`}
            />
          </motion.button>

        <div className="p-4 space-y-3">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-orbitron font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem]">
              {product.title}
            </h3>
          </Link>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="ml-1 text-sm font-medium">{product.rating.rate.toFixed(1)}</span>
            </div>
            <span className="text-xs text-muted-foreground">({product.rating.count})</span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold font-orbitron text-primary neon-text">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <Button
            onClick={(e) => {
              e.preventDefault();
              dispatch(addToCart({ product: { ...product, title: product.title, image: product.image }, quantity: 1 }));
            }}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-semibold group-hover:shadow-glow transition-all"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {t("addToCart")}
          </Button>
        </div>
      </Card>
    </motion.div>

    <QuickView
      product={product}
      open={showQuickView}
      onOpenChange={setShowQuickView}
    />
  </>
  );
}
