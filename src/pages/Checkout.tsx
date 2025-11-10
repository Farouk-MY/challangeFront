import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addOrder } from '@/store/slices/authSlice';
import { clearCart } from '@/store/slices/cartSlice';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { motion } from 'framer-motion';
import { CreditCard, Truck, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.auth.user);
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + (price * quantity);
  }, 0);
  const shipping = deliveryMethod === 'express' ? 15.99 : deliveryMethod === 'standard' ? 5.99 : 0;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Mock order creation
    dispatch(
      addOrder({
        total,
        status: 'pending',
        items: cart,
      })
    );

    // Clear cart
    dispatch(clearCart());

    // Navigate to confirmation
    navigate('/order-confirmation', { state: { orderId: Date.now().toString(), total } });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="glass-strong p-8 text-center">
          <h2 className="text-2xl font-orbitron font-bold mb-4">Your cart is empty</h2>
          <Button onClick={() => navigate('/products')} className="bg-primary hover:bg-primary/90">
            Continue Shopping
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-12 bg-gradient-to-b from-background via-background/95 to-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-2">
              <span className="elegant-text">Secure Checkout</span>
            </h1>
            <p className="text-muted-foreground">Complete your order in just a few steps</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Address */}
                <Card className="glass-strong border-border/50 p-6 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-orbitron font-bold">Shipping Address</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label>Full Name</Label>
                      <Input
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="glass border-border/50 mt-2"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="glass border-border/50 mt-2"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Address</Label>
                      <Input
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="glass border-border/50 mt-2"
                      />
                    </div>
                    <div>
                      <Label>City</Label>
                      <Input
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="glass border-border/50 mt-2"
                      />
                    </div>
                    <div>
                      <Label>ZIP Code</Label>
                      <Input
                        required
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="glass border-border/50 mt-2"
                      />
                    </div>
                  </div>
                </Card>

                {/* Delivery Method */}
                <Card className="glass-strong border-border/50 p-6 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-orbitron font-bold">Delivery Method</h2>
                  </div>
                  <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                    <div className="flex items-center space-x-3 glass border border-border/50 p-4 rounded-lg mb-3">
                      <RadioGroupItem value="free" id="free" />
                      <Label htmlFor="free" className="flex-1 cursor-pointer">
                        <p className="font-semibold">Free Shipping</p>
                        <p className="text-sm text-muted-foreground">7-14 business days</p>
                      </Label>
                      <span className="font-bold">FREE</span>
                    </div>
                    <div className="flex items-center space-x-3 glass border border-border/50 p-4 rounded-lg mb-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="flex-1 cursor-pointer">
                        <p className="font-semibold">Standard Shipping</p>
                        <p className="text-sm text-muted-foreground">3-5 business days</p>
                      </Label>
                      <span className="font-bold">$5.99</span>
                    </div>
                    <div className="flex items-center space-x-3 glass border border-border/50 p-4 rounded-lg">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="flex-1 cursor-pointer">
                        <p className="font-semibold">Express Shipping</p>
                        <p className="text-sm text-muted-foreground">1-2 business days</p>
                      </Label>
                      <span className="font-bold">$15.99</span>
                    </div>
                  </RadioGroup>
                </Card>

                {/* Payment Method */}
                <Card className="glass-strong border-border/50 p-6 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-orbitron font-bold">Payment Method</h2>
                  </div>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6">
                    <div className="flex items-center space-x-3 glass border border-border/50 p-4 rounded-lg mb-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="cursor-pointer">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-3 glass border border-border/50 p-4 rounded-lg">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="cursor-pointer">PayPal</Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <Label>Card Number</Label>
                        <Input
                          required
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          className="glass border-border/50 mt-2"
                        />
                      </div>
                      <div>
                        <Label>Cardholder Name</Label>
                        <Input
                          required
                          value={formData.cardName}
                          onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                          className="glass border-border/50 mt-2"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Expiry Date</Label>
                          <Input
                            required
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                            className="glass border-border/50 mt-2"
                          />
                        </div>
                        <div>
                          <Label>CVV</Label>
                          <Input
                            required
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                            className="glass border-border/50 mt-2"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="glass-strong border-border/50 p-4 sm:p-6 lg:sticky lg:top-24 shadow-xl">
                  <h2 className="text-xl sm:text-2xl font-orbitron font-bold mb-6 elegant-text">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3 sm:gap-4">
                        <img src={item.image} alt={item.title} className="w-12 sm:w-16 h-12 sm:h-16 object-cover rounded flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-xs sm:text-sm line-clamp-2">{item.title}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-sm sm:text-base flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 py-4 border-y border-border/30">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-semibold">${shipping.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-lg sm:text-xl font-orbitron font-bold mt-4 mb-6">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 shadow-glow text-base sm:text-lg font-semibold py-4 sm:py-6">
                    <CreditCard className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                    Place Order
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    🔒 Your payment information is secure and encrypted
                  </p>
                </Card>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
};

export default Checkout;
