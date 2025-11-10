import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Search, Zap, Heart, Menu, LogOut, Package, UserCircle, Store, ShoppingBag, Home, Phone, Info, HelpCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setSearchQuery } from "@/store/slices/productsSlice";
import { logout } from "@/store/slices/authSlice";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Header() {
  const { t } = useLanguage();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const user = useAppSelector((state) => state.auth.user);
  
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchInput));
    navigate("/products");
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-lg">
      {/* Top Bar */}
      <div className="border-b border-border/30 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between text-xs md:text-sm">
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="hidden md:flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-primary" />
                Free shipping on orders over $50
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/contact" className="hover:text-primary transition-colors hidden sm:flex items-center gap-1">
                <Phone className="h-3 w-3" />
                Contact
              </Link>
              <Link to="/faq" className="hover:text-primary transition-colors hidden sm:flex items-center gap-1">
                <HelpCircle className="h-3 w-3" />
                Help
              </Link>
              <ThemeToggle />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 shrink-0 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <Zap className="h-6 w-6 md:h-7 md:w-7 text-primary-foreground animate-pulse" />
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl md:text-2xl font-orbitron font-bold elegant-text block leading-none">
                NEONSHOP
              </span>
              <span className="text-[10px] text-muted-foreground tracking-widest">FUTURE TECH</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/">
              <Button variant="ghost" className="font-medium hover:bg-primary/10 transition-colors">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium bg-transparent hover:bg-primary/10">
                    <Store className="h-4 w-4 mr-2" />
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] bg-background/95 backdrop-blur-xl border border-border/50">
                      <div className="grid grid-cols-2 gap-3">
                        <Link to="/products" className="group">
                          <div className="rounded-lg p-4 hover:bg-primary/10 transition-all border border-border/30 hover:border-primary/50 hover:shadow-lg">
                            <ShoppingBag className="h-8 w-8 mb-2 text-primary group-hover:scale-110 transition-transform" />
                            <h3 className="font-orbitron font-bold mb-1">All Products</h3>
                            <p className="text-xs text-muted-foreground">Browse entire catalog</p>
                          </div>
                        </Link>
                        <Link to="/products?category=electronics" className="group">
                          <div className="rounded-lg p-4 hover:bg-primary/10 transition-all border border-border/30 hover:border-primary/50 hover:shadow-lg">
                            <Zap className="h-8 w-8 mb-2 text-primary group-hover:scale-110 transition-transform" />
                            <h3 className="font-orbitron font-bold mb-1">Electronics</h3>
                            <p className="text-xs text-muted-foreground">Latest tech gadgets</p>
                          </div>
                        </Link>
                        <Link to="/products?category=jewelery" className="group">
                          <div className="rounded-lg p-4 hover:bg-primary/10 transition-all border border-border/30 hover:border-primary/50 hover:shadow-lg">
                            <Sparkles className="h-8 w-8 mb-2 text-primary group-hover:scale-110 transition-transform" />
                            <h3 className="font-orbitron font-bold mb-1">Jewelry</h3>
                            <p className="text-xs text-muted-foreground">Premium accessories</p>
                          </div>
                        </Link>
                        <Link to="/products" className="group">
                          <div className="rounded-lg p-4 hover:bg-primary/10 transition-all border border-border/30 hover:border-primary/50 hover:shadow-lg">
                            <Package className="h-8 w-8 mb-2 text-primary group-hover:scale-110 transition-transform" />
                            <h3 className="font-orbitron font-bold mb-1">New Arrivals</h3>
                            <p className="text-xs text-muted-foreground">Just added items</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link to="/about">
              <Button variant="ghost" className="font-medium hover:bg-primary/10 transition-colors">
                <Info className="h-4 w-4 mr-2" />
                About
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button variant="ghost" className="font-medium hover:bg-primary/10 transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </Link>
          </nav>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md lg:max-w-lg mx-4">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
              <Input
                type="search"
                placeholder={t("searchProducts")}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-12 pr-4 h-11 rounded-full glass border-2 border-border/50 focus:border-primary/50 focus:shadow-glow transition-all"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full h-9 px-4"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 hover:scale-110 transition-all">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full p-0 flex items-center justify-center text-[10px] shadow-glow animate-pulse">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 hover:scale-110 transition-all">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full p-0 flex items-center justify-center text-[10px] shadow-glow animate-pulse">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 hover:bg-primary/10 transition-all hover:shadow-lg ml-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="hidden lg:block font-medium">{user.name?.split(' ')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 bg-background/95 backdrop-blur-xl border-border/50 shadow-xl">
                  <DropdownMenuLabel className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                        <User className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold elegant-text">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer hover:bg-primary/10 transition-colors py-3">
                    <UserCircle className="mr-3 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">My Profile</p>
                      <p className="text-xs text-muted-foreground">View and edit profile</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer hover:bg-primary/10 transition-colors py-3">
                    <Package className="mr-3 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">My Orders</p>
                      <p className="text-xs text-muted-foreground">Track your orders</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer hover:bg-primary/10 transition-colors py-3">
                    <Heart className="mr-3 h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Wishlist</p>
                      <p className="text-xs text-muted-foreground">{wishlistItems.length} items saved</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive hover:bg-destructive/10 transition-colors py-3">
                    <LogOut className="mr-3 h-5 w-5" />
                    <span className="font-medium">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button className="ml-2 shadow-glow hover:shadow-glow-strong transition-all hover:scale-105">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] bg-background/95 backdrop-blur-xl border-l border-border/50">
              <div className="flex flex-col gap-6 mt-8">
                {/* Logo in Mobile Menu */}
                <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-xl blur-md opacity-50" />
                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                      <Zap className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div>
                    <span className="text-xl font-orbitron font-bold elegant-text block leading-none">
                      NEONSHOP
                    </span>
                    <span className="text-[10px] text-muted-foreground tracking-widest">FUTURE TECH</span>
                  </div>
                </div>

                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="w-full">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder={t("searchProducts")}
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="pl-11 rounded-full glass border-2 border-border/50"
                    />
                  </div>
                </form>

                {/* User Info */}
                {user && (
                  <div className="p-4 rounded-xl glass-strong border border-border/50 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                        <User className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-orbitron font-bold text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-2">
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-base hover:bg-primary/10 transition-all hover:shadow-md">
                      <Home className="mr-3 h-5 w-5 text-primary" />
                      Home
                    </Button>
                  </Link>
                  <Link to="/products" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-base hover:bg-primary/10 transition-all hover:shadow-md">
                      <Store className="mr-3 h-5 w-5 text-primary" />
                      Products
                    </Button>
                  </Link>
                  <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-base hover:bg-primary/10 transition-all hover:shadow-md">
                      <Info className="mr-3 h-5 w-5 text-primary" />
                      About
                    </Button>
                  </Link>
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-base hover:bg-primary/10 transition-all hover:shadow-md">
                      <Phone className="mr-3 h-5 w-5 text-primary" />
                      Contact
                    </Button>
                  </Link>
                  <div className="my-2 border-t border-border/50" />
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-base hover:bg-primary/10 transition-all hover:shadow-md">
                      <Heart className="mr-3 h-5 w-5 text-primary" />
                      Wishlist
                      {wishlistItems.length > 0 && (
                        <Badge className="ml-auto">
                          {wishlistItems.length}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                  <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-base hover:bg-primary/10 transition-all hover:shadow-md">
                      <ShoppingCart className="mr-3 h-5 w-5 text-primary" />
                      Cart
                      {cartCount > 0 && (
                        <Badge className="ml-auto">
                          {cartCount}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                  {user ? (
                    <>
                      <div className="my-2 border-t border-border/50" />
                      <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start text-base hover:bg-primary/10 transition-all hover:shadow-md">
                          <UserCircle className="mr-3 h-5 w-5 text-primary" />
                          My Profile
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-base text-destructive hover:text-destructive hover:bg-destructive/10 transition-all hover:shadow-md"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="my-2 border-t border-border/50" />
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full justify-start text-base shadow-glow">
                          <User className="mr-3 h-5 w-5" />
                          Sign In
                        </Button>
                      </Link>
                    </>
                  )}
                </nav>

                {/* Mobile Theme & Language */}
                <div className="pt-4 border-t border-border/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Appearance</span>
                    <ThemeToggle />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Language</span>
                    <LanguageSelector />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
