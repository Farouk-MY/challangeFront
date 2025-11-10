import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Heart, X } from "lucide-react";
import { Product } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface QuickViewProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickView({ product, open, onOpenChange }: QuickViewProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const { t } = useLanguage();

  if (!product) return null;

  const inWishlist = wishlistItems.some(item => String(item.id) === String(product.id));

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
    onOpenChange(false);
  };

  const handleWishlistToggle = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl glass-strong border-primary/30 p-0 overflow-hidden">
        <div className="absolute top-4 right-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="rounded-full glass hover:bg-destructive/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-lg overflow-hidden neon-border bg-white"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-8"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col space-y-4"
          >
            <DialogHeader>
              <DialogTitle className="text-3xl font-orbitron font-bold neon-text line-clamp-2">
                {product.title}
              </DialogTitle>
            </DialogHeader>

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating.rate)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
              </span>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
              {product.description}
            </p>

            <div className="flex items-baseline space-x-3">
              <span className="text-4xl font-bold font-orbitron text-primary neon-text">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <p className="text-sm text-accent">
              ✓ In Stock
            </p>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg h-12"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {t("addToCart")}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleWishlistToggle}
                className="h-12 w-12 neon-border"
              >
                <Heart
                  className={`h-5 w-5 ${
                    inWishlist ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
            </div>

            {/* Category */}
            <div className="glass rounded-lg p-4 border border-border/30">
              <h4 className="font-semibold text-sm text-primary mb-2">
                Category
              </h4>
              <span className="text-sm font-medium capitalize">{product.category}</span>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
