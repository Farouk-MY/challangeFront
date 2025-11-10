import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, ChevronLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toggleWishlist } from "@/store/slices/wishlistSlice";
import { loadProductById, loadProductsByCategory } from "@/store/slices/productsSlice";
import { ProductCard } from "@/components/ProductCard";
import { motion } from "framer-motion";
import { generateMockReviews, generateMockImages } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentProduct: product, loading, items } = useAppSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews] = useState(() => generateMockReviews(Number(id)));
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(loadProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setImages(generateMockImages(product.image));
      if (product.category) {
        dispatch(loadProductsByCategory(product.category));
      }
    }
  }, [product, dispatch]);

  if (loading || !product) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <Skeleton className="w-32 h-10 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Skeleton className="w-full aspect-square rounded-xl mb-4" />
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="w-full aspect-square rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const similarProducts = items
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const stock = 50; // Mock stock

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link to="/products">
          <Button variant="ghost" className="mb-8 hover:bg-primary/10">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="glass-strong border-border/50 overflow-hidden mb-4">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full aspect-square object-contain p-4 sm:p-8 bg-white"
              />
            </Card>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`glass border-2 rounded-lg overflow-hidden transition-all ${
                    selectedImage === idx
                      ? "border-primary glow"
                      : "border-border/50 hover:border-primary/50"
                  }`}
                >
                  <img src={img} alt="" className="w-full aspect-square object-contain p-2 sm:p-4 bg-white" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <span className="inline-block bg-accent text-accent-foreground text-sm font-bold px-4 py-1 rounded-full">
              {product.category.toUpperCase()}
            </span>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold">
              {product.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 sm:h-5 w-4 sm:w-5 ${
                      i < Math.floor(product.rating.rate)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-base sm:text-lg font-semibold">{product.rating.rate}</span>
              <span className="text-sm sm:text-base text-muted-foreground">({product.rating.count} reviews)</span>
            </div>

            <div className="flex items-baseline space-x-4">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold font-orbitron text-primary">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Reviews */}
            <Card className="glass border-border/50 p-6">
              <h3 className="font-orbitron font-bold text-xl mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-border/30 pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-semibold">{review.user}</span>
                      </div>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-accent text-accent" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-1">{review.comment}</p>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Stock */}
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span>In Stock</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center glass border border-border/50 rounded-lg w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex-1 sm:flex-none"
                >
                  -
                </Button>
                <span className="w-16 sm:w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                  disabled={quantity >= stock}
                  className="flex-1 sm:flex-none"
                >
                  +
                </Button>
              </div>

              <Button
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-orbitron text-base sm:text-lg shadow-glow-strong"
                onClick={() => dispatch(addToCart({ product: { ...product, image: product.image, title: product.title }, quantity }))}
              >
                <ShoppingCart className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                Add to Cart
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => dispatch(toggleWishlist(product))}
                className="glass border-border/50 hover:border-primary sm:w-auto"
              >
                <Heart className="h-4 sm:h-5 w-4 sm:w-5" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-orbitron font-bold mb-8">
              <span className="elegant-text">
                Similar Products
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
