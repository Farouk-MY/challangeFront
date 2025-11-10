import { useLocation, Link, Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle2, Package } from 'lucide-react';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderId, total } = location.state || {};

  if (!orderId) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <Card className="glass-strong border-border/50 p-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mb-6"
            >
              <CheckCircle2 className="h-24 w-24 text-green-500 mx-auto" />
            </motion.div>

            <h1 className="text-4xl font-orbitron font-bold mb-4">
              <span className="elegant-text">Order Confirmed!</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              Thank you for your purchase. Your order has been successfully placed.
            </p>

            <Card className="glass border-border/50 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Package className="h-6 w-6 text-primary" />
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Order Number</p>
                    <p className="font-orbitron font-bold">#{orderId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-2xl font-bold text-primary">${total?.toFixed(2)}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-left">
                You will receive a confirmation email with order details and tracking information shortly.
              </p>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/profile">
                <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  View Orders
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="elegant-border w-full sm:w-auto">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </main>
  );
};

export default OrderConfirmation;
