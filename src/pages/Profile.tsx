import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { updateProfile, logout } from '@/store/slices/authSlice';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { User, Package, Heart, LogOut, Edit } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, orders, isAuthenticated } = useAppSelector((state) => state.auth);
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
  });

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="glass-strong p-8 text-center">
          <h2 className="text-2xl font-orbitron font-bold mb-4">Please login to view your profile</h2>
          <Link to="/login">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Login
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleSave = () => {
    dispatch(updateProfile(formData));
    setIsEditing(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <main className="min-h-screen py-12 bg-gradient-to-b from-background via-background/95 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Profile Header */}
          <div className="glass-strong border-border/50 rounded-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="p-4 rounded-full bg-primary/10 border-2 border-primary/20">
                <User className="h-20 w-20 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-orbitron font-bold mb-2">
                  <span className="elegant-text">{user.name}</span>
                </h1>
                <p className="text-muted-foreground text-lg">{user.email}</p>
                <p className="text-sm text-muted-foreground mt-1">Member since {new Date().getFullYear()}</p>
              </div>
              <Button variant="outline" onClick={handleLogout} className="elegant-border" size="lg">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="glass border border-border/50 p-1 w-full md:w-auto">
              <TabsTrigger value="profile" className="flex-1 md:flex-none">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex-1 md:flex-none">
                <Package className="h-4 w-4 mr-2" />
                Orders {orders.length > 0 && `(${orders.length})`}
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex-1 md:flex-none">
                <Heart className="h-4 w-4 mr-2" />
                Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass-strong border-border/50 p-8 hover:border-primary/30 transition-all">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-orbitron font-bold elegant-text">Personal Information</h2>
                      <p className="text-sm text-muted-foreground mt-1">Manage your account details</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                      className="elegant-border"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>

                <div className="space-y-6">
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                      className="glass border-border/50 mt-2"
                    />
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <Input
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      className="glass border-border/50 mt-2"
                    />
                  </div>
                  <div>
                    <Label>Shipping Address</Label>
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      disabled={!isEditing}
                      className="glass border-border/50 mt-2"
                    />
                  </div>

                  {isEditing && (
                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 shadow-glow" size="lg">
                      Save Changes
                    </Button>
                  )}
                </div>
              </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="orders">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass-strong border-border/50 p-8 hover:border-primary/30 transition-all">
                  <div className="mb-6">
                    <h2 className="text-2xl font-orbitron font-bold elegant-text">Order History</h2>
                    <p className="text-sm text-muted-foreground mt-1">Track your past orders</p>
                  </div>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No orders yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="glass border border-border/50 p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-semibold">Order #{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</p>
                            <span
                              className={`text-sm px-3 py-1 rounded-full ${
                                order.status === 'delivered'
                                  ? 'bg-green-500/20 text-green-500'
                                  : order.status === 'shipped'
                                  ? 'bg-blue-500/20 text-blue-500'
                                  : 'bg-yellow-500/20 text-yellow-500'
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                              <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded" />
                              <div className="flex-1">
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity} × ${item.price}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="wishlist">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="glass-strong border-border/50 p-8 hover:border-primary/30 transition-all">
                  <div className="mb-6">
                    <h2 className="text-2xl font-orbitron font-bold elegant-text">My Wishlist</h2>
                    <p className="text-sm text-muted-foreground mt-1">Your favorite items</p>
                  </div>
                {wishlist.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No items in wishlist</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item) => (
                      <Link to={`/product/${item.id}`} key={item.id}>
                        <Card className="glass border-border/50 hover:border-primary transition-all overflow-hidden">
                          <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                          <div className="p-4">
                            <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
                            <p className="text-2xl font-bold text-primary">${item.price}</p>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </main>
  );
};

export default Profile;
