import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { loadProducts } from "@/store/slices/productsSlice";
import { Skeleton } from "./ui/skeleton";

export function FeaturedProducts() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.products);
  const featuredProducts = items.slice(0, 8);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(loadProducts());
    }
  }, [dispatch, items.length]);

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
            <span className="elegant-text">
              Featured Products
            </span>
          </h2>
          <p className="text-muted-foreground text-lg font-inter">
            Handpicked premium tech for the ultimate experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="glass-strong rounded-xl p-4 space-y-4">
                <Skeleton className="w-full aspect-square rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/products"
            className="inline-block text-primary hover:text-primary/80 font-orbitron font-semibold text-lg hover:underline"
          >
            View All Products →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
