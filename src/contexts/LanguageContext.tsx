import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations = {
  en: {
    // Navigation
    home: "Home",
    products: "Products",
    categories: "Categories",
    about: "About Us",
    cart: "Cart",
    login: "Login",
    signup: "Sign Up",
    search: "Search products...",
    
    // Hero
    heroTitle: "Welcome to the Future of Shopping",
    heroSubtitle: "Discover cutting-edge technology and futuristic products",
    shopNow: "Shop Now",
    
    // Categories
    exploreCategories: "Explore Categories",
    categoriesSubtitle: "Discover cutting-edge technology across all categories",
    
    // Products
    allProducts: "All Products",
    discoverProducts: "futuristic tech products",
    featured: "Featured",
    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",
    highestRated: "Highest Rated",
    nameAZ: "Name: A-Z",
    sortBy: "Sort by",
    all: "All",
    previous: "Previous",
    next: "Next",
    addToCart: "Add to Cart",
    
    // Filters
    filters: "Filters",
    priceRange: "Price Range",
    rating: "Rating & Above",
    inStock: "In Stock Only",
    clearFilters: "Clear Filters",
    
    // Product Detail
    specifications: "Specifications",
    reviews: "Reviews",
    similarProducts: "Similar Products",
    
    // Cart
    shoppingCart: "Shopping Cart",
    yourCart: "Your shopping cart",
    emptyCart: "Your cart is empty",
    startShopping: "Start Shopping",
    remove: "Remove",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    shipping: "Shipping",
    tax: "Tax",
    total: "Total",
    checkout: "Checkout",
    free: "Free",
    
    // Auth
    signIn: "Sign In",
    signUp: "Sign Up",
    email: "Email",
    password: "Password",
    name: "Name",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    
    // Wishlist
    wishlist: "Wishlist",
    addToWishlist: "Add to Wishlist",
    removeFromWishlist: "Remove from Wishlist",
    
    // Quick View
    quickView: "Quick View",
    
    // Home Page
    welcome: "Welcome to Tomorrow",
    exploreProducts: "Explore Products",
    learnMore: "Learn More",
    shop: "Shop",
    support: "Support",
    helpCenter: "Help Center",
    returns: "Returns",
    contact: "Contact Us",
    company: "Company",
    careers: "Careers",
    privacy: "Privacy",
    terms: "Terms",
    allRights: "All rights reserved.",
    
    // Category Names
    vr: "VR Headsets",
    gaming: "Gaming",
    audio: "Audio",
    smart: "Smart Home",
    wearables: "Wearables",
    drones: "Drones",
    
    // Additional
    neonShop: "NeonShop",
    
    // Toast Messages
    addedToCart: "Added to cart!",
    removedFromCart: "Removed from cart",
    addedToWishlist: "Added to wishlist!",
    removedFromWishlist: "Removed from wishlist",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    products: "المنتجات",
    categories: "الفئات",
    about: "من نحن",
    cart: "السلة",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    search: "البحث عن المنتجات...",
    
    // Hero
    heroTitle: "مرحباً بك في مستقبل التسوق",
    heroSubtitle: "اكتشف التكنولوجيا المتطورة والمنتجات المستقبلية",
    shopNow: "تسوق الآن",
    
    // Categories
    exploreCategories: "استكشف الفئات",
    categoriesSubtitle: "اكتشف التكنولوجيا المتطورة عبر جميع الفئات",
    
    // Products
    allProducts: "جميع المنتجات",
    discoverProducts: "منتجات تقنية مستقبلية",
    featured: "مميز",
    priceLowToHigh: "السعر: من الأقل إلى الأعلى",
    priceHighToLow: "السعر: من الأعلى إلى الأقل",
    highestRated: "الأعلى تقييماً",
    nameAZ: "الاسم: أ-ي",
    sortBy: "ترتيب حسب",
    all: "الكل",
    previous: "السابق",
    next: "التالي",
    addToCart: "أضف للسلة",
    
    // Filters
    filters: "الفلاتر",
    priceRange: "نطاق السعر",
    rating: "التقييم وأعلى",
    inStock: "المتوفر فقط",
    clearFilters: "مسح الفلاتر",
    
    // Product Detail
    specifications: "المواصفات",
    reviews: "التقييمات",
    similarProducts: "منتجات مشابهة",
    
    // Cart
    shoppingCart: "سلة التسوق",
    yourCart: "سلة التسوق الخاصة بك",
    emptyCart: "سلتك فارغة",
    startShopping: "ابدأ التسوق",
    remove: "إزالة",
    orderSummary: "ملخص الطلب",
    subtotal: "المجموع الفرعي",
    shipping: "الشحن",
    tax: "الضريبة",
    total: "الإجمالي",
    checkout: "إتمام الشراء",
    free: "مجاني",
    
    // Auth
    signIn: "تسجيل الدخول",
    signUp: "إنشاء حساب",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    name: "الاسم",
    dontHaveAccount: "ليس لديك حساب؟",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    
    // Wishlist
    wishlist: "المفضلة",
    addToWishlist: "أضف للمفضلة",
    removeFromWishlist: "إزالة من المفضلة",
    
    // Quick View
    quickView: "عرض سريع",
    
    // Home Page
    welcome: "مرحباً بك في المستقبل",
    exploreProducts: "استكشف المنتجات",
    learnMore: "اعرف المزيد",
    shop: "المتجر",
    support: "الدعم",
    helpCenter: "مركز المساعدة",
    returns: "المرتجعات",
    contact: "اتصل بنا",
    company: "الشركة",
    careers: "الوظائف",
    privacy: "الخصوصية",
    terms: "الشروط",
    allRights: "جميع الحقوق محفوظة.",
    
    // Category Names
    vr: "نظارات الواقع الافتراضي",
    gaming: "ألعاب",
    audio: "صوتيات",
    smart: "المنزل الذكي",
    wearables: "الأجهزة القابلة للارتداء",
    drones: "طائرات بدون طيار",
    
    // Additional
    neonShop: "نيون شوب",
    
    // Toast Messages
    addedToCart: "تمت الإضافة للسلة!",
    removedFromCart: "تمت الإزالة من السلة",
    addedToWishlist: "تمت الإضافة للمفضلة!",
    removedFromWishlist: "تمت الإزالة من المفضلة",
  },
  fr: {
    // Navigation
    home: "Accueil",
    products: "Produits",
    categories: "Catégories",
    about: "À Propos",
    cart: "Panier",
    login: "Connexion",
    signup: "S'inscrire",
    search: "Rechercher des produits...",
    
    // Hero
    heroTitle: "Bienvenue dans le futur du shopping",
    heroSubtitle: "Découvrez la technologie de pointe et les produits futuristes",
    shopNow: "Acheter maintenant",
    
    // Categories
    exploreCategories: "Explorer les catégories",
    categoriesSubtitle: "Découvrez la technologie de pointe dans toutes les catégories",
    
    // Products
    allProducts: "Tous les produits",
    discoverProducts: "produits technologiques futuristes",
    featured: "En vedette",
    priceLowToHigh: "Prix: Croissant",
    priceHighToLow: "Prix: Décroissant",
    highestRated: "Mieux notés",
    nameAZ: "Nom: A-Z",
    sortBy: "Trier par",
    all: "Tous",
    previous: "Précédent",
    next: "Suivant",
    addToCart: "Ajouter au panier",
    
    // Filters
    filters: "Filtres",
    priceRange: "Fourchette de prix",
    rating: "Note minimale",
    inStock: "En stock uniquement",
    clearFilters: "Effacer les filtres",
    
    // Product Detail
    specifications: "Spécifications",
    reviews: "Avis",
    similarProducts: "Produits similaires",
    
    // Cart
    shoppingCart: "Panier",
    yourCart: "Votre panier",
    emptyCart: "Votre panier est vide",
    startShopping: "Commencer vos achats",
    remove: "Retirer",
    orderSummary: "Résumé de la commande",
    subtotal: "Sous-total",
    shipping: "Livraison",
    tax: "Taxe",
    total: "Total",
    checkout: "Commander",
    free: "Gratuit",
    
    // Auth
    signIn: "Se connecter",
    signUp: "S'inscrire",
    email: "Email",
    password: "Mot de passe",
    name: "Nom",
    dontHaveAccount: "Vous n'avez pas de compte?",
    alreadyHaveAccount: "Vous avez déjà un compte?",
    
    // Wishlist
    wishlist: "Favoris",
    addToWishlist: "Ajouter aux favoris",
    removeFromWishlist: "Retirer des favoris",
    
    // Quick View
    quickView: "Aperçu rapide",
    
    // Home Page
    welcome: "Bienvenue dans le futur",
    exploreProducts: "Explorer les produits",
    learnMore: "En savoir plus",
    shop: "Boutique",
    support: "Support",
    helpCenter: "Centre d'aide",
    returns: "Retours",
    contact: "Contactez-nous",
    company: "Entreprise",
    careers: "Carrières",
    privacy: "Confidentialité",
    terms: "Conditions",
    allRights: "Tous droits réservés.",
    
    // Category Names
    vr: "Casques VR",
    gaming: "Gaming",
    audio: "Audio",
    smart: "Maison intelligente",
    wearables: "Objets connectés",
    drones: "Drones",
    
    // Additional
    neonShop: "NeonShop",
    
    // Toast Messages
    addedToCart: "Ajouté au panier!",
    removedFromCart: "Retiré du panier",
    addedToWishlist: "Ajouté aux favoris!",
    removedFromWishlist: "Retiré des favoris",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
