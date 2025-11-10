import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import { motion } from "framer-motion";

const Cart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const shippingCost = totalPrice > 500 ? 0 : 29.99;
  const total = totalPrice + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
          <h2 className="text-3xl font-orbitron font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Start shopping to add items to your cart
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-primary hover:bg-primary/90 glow">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-orbitron font-bold mb-8"
        >
          <span className="elegant-text">
            Shopping Cart
          </span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-strong border-border/50 p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full sm:w-24 md:w-32 h-32 sm:h-24 md:h-32 object-cover rounded-lg mx-auto sm:mx-0"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.id}`}
                        className="font-orbitron font-semibold text-lg md:text-xl hover:text-primary transition-colors"
                      >
                        {item.title}
                      </Link>
                      <p className="text-muted-foreground mt-2">
                        ${item.price} each
                      </p>

                      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center glass border border-border/50 rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex items-center gap-3 sm:gap-4 sm:ml-auto">
                          <span className="text-xl md:text-2xl font-bold font-orbitron text-primary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <Card className="glass-strong border-border/50 p-6 space-y-4">
              <h2 className="text-2xl font-orbitron font-bold">Order Summary</h2>

              <div className="space-y-3 py-4 border-y border-border/30">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? (
                      <span className="text-green-500">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                {totalPrice < 500 && (
                  <p className="text-sm text-muted-foreground">
                    Add ${(500 - totalPrice).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              <div className="flex justify-between text-xl font-orbitron font-bold">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>

              <Link to="/checkout" className="block">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-orbitron text-lg shadow-glow-strong"
                >
                  Proceed to Checkout
                </Button>
              </Link>

              <Link to="/products">
                <Button variant="outline" className="w-full glass border-border/50">
                  Continue Shopping
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
